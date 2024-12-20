// Generated from QueryRecognizer.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { SearchContext } from "./QueryRecognizerParser";
import { SearchPrimaryContext } from "./QueryRecognizerParser";
import { FieldSearchContext } from "./QueryRecognizerParser";
import { ExpressionContext } from "./QueryRecognizerParser";
import { OrExpressionContext } from "./QueryRecognizerParser";
import { AndExpressionContext } from "./QueryRecognizerParser";
import { NotExpressionContext } from "./QueryRecognizerParser";
import { PrimaryContext } from "./QueryRecognizerParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `QueryRecognizerParser`.
 */
export interface QueryRecognizerListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `QueryRecognizerParser.search`.
	 * @param ctx the parse tree
	 */
	enterSearch?: (ctx: SearchContext) => void;
	/**
	 * Exit a parse tree produced by `QueryRecognizerParser.search`.
	 * @param ctx the parse tree
	 */
	exitSearch?: (ctx: SearchContext) => void;

	/**
	 * Enter a parse tree produced by `QueryRecognizerParser.searchPrimary`.
	 * @param ctx the parse tree
	 */
	enterSearchPrimary?: (ctx: SearchPrimaryContext) => void;
	/**
	 * Exit a parse tree produced by `QueryRecognizerParser.searchPrimary`.
	 * @param ctx the parse tree
	 */
	exitSearchPrimary?: (ctx: SearchPrimaryContext) => void;

	/**
	 * Enter a parse tree produced by `QueryRecognizerParser.fieldSearch`.
	 * @param ctx the parse tree
	 */
	enterFieldSearch?: (ctx: FieldSearchContext) => void;
	/**
	 * Exit a parse tree produced by `QueryRecognizerParser.fieldSearch`.
	 * @param ctx the parse tree
	 */
	exitFieldSearch?: (ctx: FieldSearchContext) => void;

	/**
	 * Enter a parse tree produced by `QueryRecognizerParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `QueryRecognizerParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `QueryRecognizerParser.orExpression`.
	 * @param ctx the parse tree
	 */
	enterOrExpression?: (ctx: OrExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `QueryRecognizerParser.orExpression`.
	 * @param ctx the parse tree
	 */
	exitOrExpression?: (ctx: OrExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `QueryRecognizerParser.andExpression`.
	 * @param ctx the parse tree
	 */
	enterAndExpression?: (ctx: AndExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `QueryRecognizerParser.andExpression`.
	 * @param ctx the parse tree
	 */
	exitAndExpression?: (ctx: AndExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `QueryRecognizerParser.notExpression`.
	 * @param ctx the parse tree
	 */
	enterNotExpression?: (ctx: NotExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `QueryRecognizerParser.notExpression`.
	 * @param ctx the parse tree
	 */
	exitNotExpression?: (ctx: NotExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `QueryRecognizerParser.primary`.
	 * @param ctx the parse tree
	 */
	enterPrimary?: (ctx: PrimaryContext) => void;
	/**
	 * Exit a parse tree produced by `QueryRecognizerParser.primary`.
	 * @param ctx the parse tree
	 */
	exitPrimary?: (ctx: PrimaryContext) => void;
}

