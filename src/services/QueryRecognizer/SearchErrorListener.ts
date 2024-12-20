import { ANTLRErrorListener, Recognizer, RecognitionException, Token } from "antlr4ts";

import { Logger } from "(src)/helpers/Logger";

const logger = new Logger("SearchErrorListener");

export class SearchErrorListener implements ANTLRErrorListener<any> {
	syntaxError<T extends Token>(
		recognizer: Recognizer<T, any>,
		offendingSymbol: T | undefined,
		line: number,
		charPositionInLine: number,
		msg: string,
		e: RecognitionException | undefined
	): void {
		logger.error(`Syntax error on line ${line}, position ${charPositionInLine}: ${msg}`);
	}

	reportAmbiguity(
		recognizer: Recognizer<any, any>,
		dfa: any,
		startIndex: number,
		stopIndex: number,
		exact: boolean,
		ambigAlts: any,
		configs: any
	): void {
		// Implementa según sea necesario
	}

	reportAttemptingFullContext(
		recognizer: Recognizer<any, any>,
		dfa: any,
		startIndex: number,
		stopIndex: number,
		conflictingAlts: any,
		configs: any
	): void {
		// Implementa según sea necesario
	}

	reportContextSensitivity(
		recognizer: Recognizer<any, any>,
		dfa: any,
		startIndex: number,
		stopIndex: number,
		prediction: number,
		configs: any
	): void {
		// Implementa según sea necesario
	}
}
