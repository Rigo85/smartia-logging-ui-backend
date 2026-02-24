import { DateFilter } from "(src)/helpers/headers";

export function getUTCDate(date: Date) {
	return date.getFullYear() + "-" +
		String(date.getMonth() + 1).padStart(2, "0") + "-" +
		String(date.getDate()).padStart(2, "0") + "T" +
		String(date.getHours()).padStart(2, "0") + ":" +
		String(date.getMinutes()).padStart(2, "0") + ":" +
		String(date.getSeconds()).padStart(2, "0") + "Z";
}

export function getTimestampRange(dateFilter: DateFilter): number[] {
	if (!dateFilter?.dates || !dateFilter?.dates?.length) return undefined;

	const typeName = dateFilter.typeName;

	// Rangos explícitos (daterange, datetimerange, timerange): el resolver ya devolvió
	// dos fechas [start, end], ambas con el offset del cliente aplicado. Usarlas directamente.
	if (dateFilter.dates.length >= 2) {
		return [dateFilter.dates[0].getTime(), dateFilter.dates[1].getTime()];
	}

	// Punto único en el tiempo: inferir granularidad del rango
	const date = new Date(dateFilter.dates[0].toISOString());

	if (["datetimeV2.date", "datetimeV2.daterange"].includes(typeName)) {
		// El offset ya fue aplicado: dates[0] representa la medianoche local en UTC.
		// El rango es exactamente 24h a partir de ahí.
		return [date.getTime(), date.getTime() + 24 * 60 * 60 * 1000];
	}

	if (date.getUTCSeconds() === 0) {
		if (date.getUTCMinutes() === 0) {
			// Rango de toda la hora
			const startDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours()));
			const endDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours() + 1));
			return [startDate.getTime(), endDate.getTime()];
		}
		// Rango de todo el minuto
		const startDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes()));
		const endDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes() + 1));
		return [startDate.getTime(), endDate.getTime()];
	}

	// Exactamente el segundo específico
	return [date.getTime(), date.getTime() + 1000];
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
