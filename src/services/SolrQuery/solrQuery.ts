import axios from "axios";
import { strict as assert } from "assert";
import * as process from "node:process";
import * as dotenv from "dotenv";

import { Logger } from "(src)/helpers/Logger";
import { DateFilter, LogDocument, LogFilter, MessageLog, SolrResponse } from "(src)/helpers/headers";
import { DateRecognition } from "(src)/services/date-recognition";
import { parseSearchExpression } from "(src)/services/QueryRecognizer/parseSearchExpression";
import { getTimestampRange, getUTCDate } from "(src)/helpers/utils";

dotenv.config({path: ".env"});

const solrSelectUrl = process.env.SOLR_SELECT_URL;
assert.ok(solrSelectUrl, "The 'SOLR_SELECT_URL' environment variable is required.");
const solrUsername = process.env.SOLR_USERNAME;
assert.ok(solrUsername, "The 'SOLR_USERNAME' environment variable is required.");
const solrPassword = process.env.SOLR_PASSWORD;
assert.ok(solrPassword, "The 'SOLR_PASSWORD' environment variable is required.");

const logger = new Logger("Solr Query");
const dr = new DateRecognition();

export async function getLogs({data}: { data: LogFilter }): Promise<MessageLog[]> {
	// logger.info("getLogs", data || {});

	try {
		let input = data?.inputFilter?.trim() || "";

		const _hostnameFilter: string = data?.hostnameFilter?.trim() || "";
		if (_hostnameFilter && _hostnameFilter !== "All Hostnames") {
			input = input ? `${input} hostname:${_hostnameFilter}` : `hostname:${_hostnameFilter}`;
		}

		const dateFilter: DateFilter = dr.dateRecognition(data?.queryString ?? "", data?.offset);
		if (dateFilter?.dates.length) {
			const [startRange, endRange] = getTimestampRange(dateFilter);
			const timeRange = `timestamp:"[${startRange} TO ${endRange}]"`;
			input = input ? `${input} ${timeRange}` : `${timeRange}`;
		}

		logger.info(`filterInput: "${input}" dateFilter: "${JSON.stringify(dateFilter)}" hostnameFilter: "${_hostnameFilter}" input: "${input}"`);
		const {query, filters} = input ? parseSearchExpression(input) : {query: [], filters: []};

		if (data?.id) {
			filters.push(`id:[* TO ${data.id}]`);
		}

		if (!query.length) {
			query.push("data_exact:*");
		}

		const resultados = await searchSolr(query, filters, 0, 100);

		return resultados.map((log: LogDocument) => ({
			id: parseInt(log.id, 10),
			dateTime: new Date(log.timestamp).toISOString(),
			data: log.data,
			source: log.source,
			hostname: log.hostname,
			appName: log.appname
		})).reverse();
	} catch (error) {
		logger.error("getLogs", error);

		return [];
	}
}

async function searchSolr(query: string[], filters: string[], start: number = 0, limit: number = 10): Promise<LogDocument[]> {
	try {
		const params: Record<string, any> = {
			q: query.join(" OR "),
			fq: filters.join(" AND "),
			rows: limit,
			wt: "json",
			sort: "timestamp desc, id desc"
		};

		logger.info("Enviando consulta a Solr con params:", JSON.stringify(params));

		const response = await axios.get<SolrResponse<LogDocument>>(solrSelectUrl, {
			params,
			auth: {
				username: solrUsername,
				password: solrPassword
			}
		});

		if (response?.data?.response?.numFound > 0) {
			return response.data.response.docs;
		} else {
			return [];
		}
	} catch (error) {
		logger.error(`searchSolr: message: "${error.message}" data: ${JSON.stringify(error.response?.data || "{}")}`);

		return [];
	}
}


//
// // Uso:
// const term = 'adapter*';
// const escapedTerm = escapeSolrSpecialChars(term);
// const query = `appname:"${escapedTerm}"`;
// const fechaInicio = '2024-01-01T00:00:00Z';
// const fechaFin = '2024-12-31T23:59:59Z';
// const query = `timestamp:[${fechaInicio} TO ${fechaFin}]`;

// const phrase = "VgwCommon Info: ------------------------>>>>";
// const phrase = "(*VgwCommon Info: * OR *------->*)";
// const phrase = "*";
// const phrase = "";

// (async () => {
// 	// const query = "*:*" // Buscar tod0
// 	// const query = "-(generic karl)";
// 	// const query = "(\{\"input\"\:\{\"text\"\:\"\"\}\})*"; // no funciona
// 	// const query = "VgwCommon Info: ------------------------>>>>"; //
// 	// const query = '\{\\"input\\"\:\{\\"text\\"\:\\"\\"\}\}'
// 	const query = `data_exact:${escapeSolrQuery(phrase)} data_exact:Matias`;
// 	const filtros = {
// 		// appname: "(*service* generic-*)",
// 		// appname: "(*service*)",
// 		// appname: "(generic-nlp-adapter* supporting-services*)",
// 		"-appname": "(generic-nlp-adapter* OR supporting-services*)",
// 		// "-appname": "*nlp-adapter*",
// 		// hostname: "dokku*"
// 		hostname: "dokku-smartia-services*"
// 		// timestamp:"[2024-12-16T04:00:00Z TO 2024-12-16T05:00:00Z]"
//
// 		// Puedes agregar más filtros según tus necesidades
// 	};
// 	const resultados = await searchSolr(query, filtros, 20);
//
// 	console.log("Resultados de la búsqueda:", resultados);
// })();

