export interface SolrResponse<T> {
	responseHeader: {
		status: number;
		// eslint-disable-next-line @typescript-eslint/naming-convention
		QTime: number;
		params: Record<string, any>;
	};
	response: {
		numFound: number;
		start: number;
		docs: T[];
	};
}

// Definir la interfaz para los documentos según tu esquema
export interface LogDocument {
	id: string;
	timestamp: string; // ISO 8601
	data: string;
	appname: string;
	hostname: string;
	source: string;
	// Si usas campos de copia como _text_, añádelos aquí
	// _text_?: string;
}

export interface SearchData {
	query: string[];
	filters: string[];
}

export interface DateFilter {
	dates: Date[];
	typeName: string;
}

export interface DateTimeRange {
	timex: string;
	type: string;
	start: string;
	end: string;
}

export interface DateTime {
	timex: string;
	type: string;
	value: string;
}

export type DateTimeResolver = (resolutionValues: DateTime[], typeName: string) => DateFilter;
export type DateTimeRangeResolver = (resolutionValues: DateTimeRange[], typeName: string) => DateFilter;

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

export interface LogFilter {
	hostnameFilter?: string;
	inputFilter?: string;
	queryString?: string;
	offset?: number;
	dateFilter?: DateFilter;
	direction?: "UP" | "DOWN";
	startId?: number;
	endId?: number;
	id?: number;
}
