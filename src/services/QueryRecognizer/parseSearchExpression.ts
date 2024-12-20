import { CharStreams, CommonTokenStream } from "antlr4ts";

import { QueryRecognizerLexer } from "(src)/services/QueryRecognizer/QueryRecognizerLexer";
import { QueryRecognizerParser } from "(src)/services/QueryRecognizer/QueryRecognizerParser";
import { SearchErrorListener } from "(src)/services/QueryRecognizer/SearchErrorListener";
import { SearchVisitor } from "(src)/services/QueryRecognizer/SearchVisitor";
import { SearchData } from "(src)/helpers/headers";
import { Logger } from "(src)/helpers/Logger";

const logger = new Logger("parseSearchExpression");

export function parseSearchExpression(input: string): SearchData {
	const inputStream = CharStreams.fromString(input);
	const lexer = new QueryRecognizerLexer(inputStream);
	const tokenStream = new CommonTokenStream(lexer);
	const parser = new QueryRecognizerParser(tokenStream);
	parser.removeErrorListeners();
	parser.addErrorListener(new SearchErrorListener());
	const tree = parser.search();
	const visitor = new SearchVisitor();
	const result = visitor.visit(tree);
	logger.info(`input: <${input}>, result: <${result}>`);

	return visitor.data;
}
