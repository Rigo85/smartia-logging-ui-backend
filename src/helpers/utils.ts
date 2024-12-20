import { DateFilter } from "(src)/helpers/headers";

export function getUTCDate(date: Date) {
	return date.getFullYear() + "-" +
		String(date.getMonth() + 1).padStart(2, "0") + "-" +
		String(date.getDate()).padStart(2, "0") + "T" +
		String(date.getHours()).padStart(2, "0") + ":" +
		String(date.getMinutes()).padStart(2, "0") + ":" +
		String(date.getSeconds()).padStart(2, "0") + "Z";
}

export function getTimestampRange(dateFilter: DateFilter): string[] {
	if (!dateFilter?.dates || !dateFilter?.dates?.length) return undefined;

	// logger.info(JSON.stringify(dateFilter));
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
			// Rango de todo el minuto
			startDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes()));
			endDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes() + 1));
		}
	} else {
		// Exactamente el segundo específico
		startDate = date;
		endDate = new Date(date.getTime() + 1000); // Añadir un segundo
	}

	// Formatear las fechas para PostgresSQL
	const startStr = startDate.toISOString().split(".")[0] + "Z";
	const endStr = endDate.toISOString().split(".")[0] + "Z";

	return [startStr, endStr];
}

export function escapeSolrQuery(query: string): string {
	// Caracteres especiales según la sintaxis de consultas de Lucene/Solr:
	// + - && || ! ( ) { } [ ] ^ " ~ * ? : \ /

	query = query.replace(/\sAND\s/g, "__AND__");
	query = query.replace(/\sOR\s/g, "__OR__");

	const specialCharsPattern = /(\+|-|&&|\|\||!|{|}|[|]|\^|"|~|:|\\|\/|\s)/g;

	query = query.replace(specialCharsPattern, "\\$1");

	query = query.replace(/__AND__/g, " AND ");
	query = query.replace(/__OR__/g, " OR ");

	return query;
}
