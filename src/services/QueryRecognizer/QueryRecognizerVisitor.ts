// Generated from QueryRecognizer.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { SearchContext } from "./QueryRecognizerParser";
import { SearchPrimaryContext } from "./QueryRecognizerParser";
import { FieldSearchContext } from "./QueryRecognizerParser";
import { ExpressionContext } from "./QueryRecognizerParser";
import { OrExpressionContext } from "./QueryRecognizerParser";
import { AndExpressionContext } from "./QueryRecognizerParser";
import { NotExpressionContext } from "./QueryRecognizerParser";
import { PrimaryContext } from "./QueryRecognizerParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `QueryRecognizerParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface QueryRecognizerVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `QueryRecognizerParser.search`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSearch?: (ctx: SearchContext) => Result;

	/**
	 * Visit a parse tree produced by `QueryRecognizerParser.searchPrimary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSearchPrimary?: (ctx: SearchPrimaryContext) => Result;

	/**
	 * Visit a parse tree produced by `QueryRecognizerParser.fieldSearch`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFieldSearch?: (ctx: FieldSearchContext) => Result;

	/**
	 * Visit a parse tree produced by `QueryRecognizerParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `QueryRecognizerParser.orExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrExpression?: (ctx: OrExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `QueryRecognizerParser.andExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAndExpression?: (ctx: AndExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `QueryRecognizerParser.notExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNotExpression?: (ctx: NotExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `QueryRecognizerParser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimary?: (ctx: PrimaryContext) => Result;
}

