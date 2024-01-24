import { Pool } from "pg";
import * as dotenv from "dotenv";

import { Logger } from "digevo-logger";
import { DateRecognition } from "(src)/services/date-recognition";
import { DateFilter } from "(src)/services/date-filter";

dotenv.config({path: ".env"});

const logger = new Logger("DB Service");

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error("The environment variable 'DATABASE_URL' is not defined.");
}

const pool = new Pool({
	connectionString: databaseUrl,
	// ssl: process.env.NODE_ENV === "production" ? {rejectUnauthorized: false} : false
	ssl: false
});

const dr = new DateRecognition();

export interface MessageLog {
	id: number;
	dateTime: string;
	data: string;
	source: string;
	hostname: string;
	appName: string;
}

interface DbLog {
	id: number;
	timestamp: Date;
	data: string;
	source: string;
	hostname: string;
	appname: string;
}

// interface DateFilter {
// 	dates: string[];
// 	typeName: string;
// }

export interface LogFilter {
	hostnameFilter?: string;
	inputFilter?: string;
	queryString?: string;
	dateFilter?: DateFilter;
	direction?: "UP" | "DOWN";
	startId?: number;
	endId?: number;
}

async function executeQuery(query: string, values: any[]): Promise<any> {
	try {
		const {rows} = await pool.query(query, values);

		return rows;
	} catch (error) {
		logger.error("executeQuery", error);

		return undefined;
	}
}

export async function getHostnames(): Promise<string[]> {
	// logger.info("getHostnames");

	try {
		const query = "SELECT DISTINCT(hostname) FROM smartia_logs l WHERE l.hostname <> ''";
		const rows = await executeQuery(query, []);

		return rows || [];
	} catch (error) {
		logger.error("getHostnames", error);

		return [];
	}
}

export async function getLogs({data}: { data: LogFilter }): Promise<MessageLog[]> {
	// logger.info("getLogs", data || {});

	try {
		const _hostnameFilter: string = data?.hostnameFilter?.trim();
		const hostnameFilter = (_hostnameFilter || "") === "All Hostnames" ? undefined : _hostnameFilter;
		const filterInput: string = data?.inputFilter?.trim();
		const dateFilter: DateFilter = dr.dateRecognition(data?.queryString ?? "");

		const conditionals: string[] = [];
		let queryValues: string[] = [];
		const inputValues: { input: string; condition: () => string; value: string | string[] }[] = [
			{
				input: hostnameFilter,
				condition: () => `hostname = $${conditionals.length + 1}`,
				value: hostnameFilter
			},
			{
				input: filterInput,
				condition: () => `(tsvector_multilingual @@ websearch_to_tsquery('multilingual', $${conditionals.length + 1}) or appname ilike concat('%',$${conditionals.length + 1},'%'))`,
				value: filterInput
			},
			{
				input: dateFilter?.dates ? "dateFilter" : undefined,
				condition: () => `timestamp >= $${conditionals.length + 1} and timestamp < $${conditionals.length + 2}`,
				value: getTimestampRange(dateFilter)
			}
		];

		for (const inputValue of inputValues) {
			if (inputValue.input) {
				queryValues = queryValues.concat(inputValue.value);
				conditionals.push(inputValue.condition());
			}
		}

		let queryConditional = "";
		if (conditionals.length) {
			queryConditional = `where ${conditionals.join(" and ")}`;
		}

		const query = `with data as (select * from smartia_logs l ${queryConditional} order by l.timestamp desc, l.id desc limit 100) select * from data d order by d.timestamp, d.id`;

		// logger.info(JSON.stringify({query, values: queryValues}));

		const rows = await executeQuery(query, queryValues) as DbLog[];

		const logsData: MessageLog[] = [];
		const _rows = rows || [];
		for (const row of _rows) {
			logsData.push({
				id: row.id,
				dateTime: getUTCDate(row.timestamp),
				data: row.data,
				source: row.source,
				hostname: row.hostname,
				appName: row.appname
			});
		}

		return logsData;
	} catch (error) {
		logger.error("getLogs", error);

		return [];
	}
}

function getUTCDate(date: Date) {
	return date.getFullYear() + "-" +
		String(date.getMonth() + 1).padStart(2, "0") + "-" +
		String(date.getDate()).padStart(2, "0") + "T" +
		String(date.getHours()).padStart(2, "0") + ":" +
		String(date.getMinutes()).padStart(2, "0") + ":" +
		String(date.getSeconds()).padStart(2, "0") + "Z";
}

function getTimestampRange(dateFilter: DateFilter): string[] {
	if (!dateFilter?.dates || !dateFilter?.dates?.length) return undefined;

	logger.info(JSON.stringify(dateFilter));
	const dateStr = dateFilter.dates[0].toISOString();

	const date = new Date(dateStr);
	let startDate, endDate;

	// Determinar el rango de tiempo basado en los componentes de la fecha
	if (date.getUTCSeconds() === 0) {
		if (date.getUTCMinutes() === 0) {
			if (date.getUTCHours() === 0 && ["datetimeV2.date", "datetimeV2.daterange"].includes(dateFilter.typeName)) {
				// Rango de _todo el día
				startDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
				endDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1));
			} else {
				// Rango de toda la hora
				startDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours()));
				endDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours() + 1));
			}
		} else {
			// Rango de _todo el minuto
			startDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes()));
			endDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes() + 1));
		}
	} else {
		// Exactamente el segundo específico
		startDate = date;
		endDate = new Date(date.getTime() + 1000); // Añadir un segundo
	}

	// Formatear las fechas para PostgreSQL
	const startStr = startDate.toISOString();
	const endStr = endDate.toISOString();

	return [startStr, endStr];
}






