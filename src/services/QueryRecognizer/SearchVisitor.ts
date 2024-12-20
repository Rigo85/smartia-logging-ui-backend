import { ErrorNode } from "antlr4ts/tree/ErrorNode";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";

import {
	SearchContext,
	SearchPrimaryContext,
	FieldSearchContext,
	ExpressionContext,
	OrExpressionContext,
	AndExpressionContext,
	NotExpressionContext,
	PrimaryContext
} from "(src)/services/QueryRecognizer/QueryRecognizerParser";
import { QueryRecognizerVisitor } from "(src)/services/QueryRecognizer/QueryRecognizerVisitor";
import { SearchData } from "(src)/helpers/headers";
import { escapeSolrQuery } from "(src)/helpers/utils";
// import { Logger } from "(src)/helpers/Logger";

// const logger = new Logger("SearchVisitor");

export class SearchVisitor implements QueryRecognizerVisitor<any> {
	private searchData: SearchData = {query: [], filters: []};

	get data(): SearchData {
		return this.searchData;
	}

	visit(tree: ParseTree): any {
		return tree.accept(this);
	}

	visitSearch(ctx: SearchContext): any {
		return ctx.searchPrimary().map(searchPrimary => this.visit(searchPrimary)).join(" ");
	}

	visitSearchPrimary(ctx: SearchPrimaryContext): any {
		let result;

		if (ctx.fieldSearch()) {
			return this.visit(ctx.fieldSearch() as ParseTree);
		} else if (ctx.PHRASE()) {
			const phrase = ctx.PHRASE()?.text.replace(/"(.+)"|'(.+)'/, "$1$2") ?? "";
			result = `${ctx.NOT() ? "-data_exact:" : "data_exact:"}${escapeSolrQuery(phrase)}`;
			this.searchData.query.push(result);
			return result;
		} else if (ctx.WORD()) {
			console.info(`SEARCH PRIMARY: ${ctx.WORD()?.text}`);
			result = `${ctx.NOT() ? "-data_exact:" : "data_exact:"}${ctx.WORD()?.text}`;
			this.searchData.query.push(result);
			return result;
		} else if (ctx.LPAREN()) {
			result = `${ctx.NOT() ? "-data_exact:" : "data_exact:"}(${this.visit(ctx.expression() as ParseTree)})`;
			this.searchData.query.push(result);
			return result;
		}
	}

	visitFieldSearch(ctx: FieldSearchContext): any {
		const fieldName = ctx.FIELD_NAME()?.text || "";

		let result;
		if (ctx.LPAREN() && ctx.expression()) {
			result = `${fieldName}:(${this.visit(ctx.expression() as ParseTree)})`;
		} else if (ctx.PHRASE()) {
			const phrase = ctx.PHRASE()?.text.replace(/"(.+)"|'(.+)'/, "$1$2") ?? "";
			result = `${fieldName}:${escapeSolrQuery(phrase)}`;
		} else if (ctx.WORD()) {
			result = `${fieldName}:${ctx.WORD()?.text}`;
		} else {
			console.warn(`Invalid FieldSearch: ${fieldName} - ${ctx.text}`);
		}

		if (result && ["appname", "-appname", "hostname", "-hostname", "timestamp", "-timestamp"].includes(fieldName)) {
			this.searchData.filters.push(result);
		} else if (result && ["data", "-data", "data_exact", "-data_exact"].includes(fieldName)) {
			this.searchData.query.push(result);
		} else {
			console.warn(`Invalid FieldName: ${fieldName} - ${ctx.text}`);
		}

		return result;
	}

	visitExpression(ctx: ExpressionContext): any {
		return this.visit(ctx.orExpression());
	}

	visitOrExpression(ctx: OrExpressionContext): any {
		return ctx.andExpression().map(andExpr => this.visit(andExpr)).join(" OR ");
	}

	visitAndExpression(ctx: AndExpressionContext): any {
		return ctx.notExpression().map(notExpr => this.visit(notExpr)).join(" AND ");
	}

	visitNotExpression(ctx: NotExpressionContext): any {
		return `${ctx.NOT() ? "-" : ""}${this.visit(ctx.primary())}`;
	}

	visitPrimary(ctx: PrimaryContext): any {
		if (ctx.expression()) {
			return `(${this.visit(ctx.expression() as ParseTree)})`;
		} else if (ctx.PHRASE()) {
			const phrase = ctx.PHRASE()?.text.replace(/"(.+)"|'(.+)'/, "$1$2");
			return phrase ? escapeSolrQuery(phrase) : phrase;
		} else if (ctx.WORD()) {
			return ctx.WORD()?.text;
		} else {
			console.info(`PRIMARY: ${ctx.text}`);
		}
	}

	visitChildren(node: RuleNode): any {
	}

	visitErrorNode(node: ErrorNode): any {
	}

	visitTerminal(node: TerminalNode): any {
	}
}