// Generated from QueryRecognizer.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { QueryRecognizerListener } from "./QueryRecognizerListener";
import { QueryRecognizerVisitor } from "./QueryRecognizerVisitor";


export class QueryRecognizerParser extends Parser {
	public static readonly PHRASE = 1;
	public static readonly FIELD_NAME = 2;
	public static readonly LPAREN = 3;
	public static readonly RPAREN = 4;
	public static readonly COLON = 5;
	public static readonly NOT = 6;
	public static readonly OR = 7;
	public static readonly AND = 8;
	public static readonly WORD = 9;
	public static readonly WS = 10;
	public static readonly RULE_search = 0;
	public static readonly RULE_searchPrimary = 1;
	public static readonly RULE_fieldSearch = 2;
	public static readonly RULE_expression = 3;
	public static readonly RULE_orExpression = 4;
	public static readonly RULE_andExpression = 5;
	public static readonly RULE_notExpression = 6;
	public static readonly RULE_primary = 7;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"search", "searchPrimary", "fieldSearch", "expression", "orExpression", 
		"andExpression", "notExpression", "primary",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, "'('", "')'", "':'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "PHRASE", "FIELD_NAME", "LPAREN", "RPAREN", "COLON", "NOT", 
		"OR", "AND", "WORD", "WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(QueryRecognizerParser._LITERAL_NAMES, QueryRecognizerParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return QueryRecognizerParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "QueryRecognizer.g4"; }

	// @Override
	public get ruleNames(): string[] { return QueryRecognizerParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return QueryRecognizerParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(QueryRecognizerParser._ATN, this);
	}
	// @RuleVersion(0)
	public search(): SearchContext {
		let _localctx: SearchContext = new SearchContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, QueryRecognizerParser.RULE_search);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 16;
			this.searchPrimary();
			this.state = 20;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << QueryRecognizerParser.PHRASE) | (1 << QueryRecognizerParser.FIELD_NAME) | (1 << QueryRecognizerParser.LPAREN) | (1 << QueryRecognizerParser.NOT) | (1 << QueryRecognizerParser.WORD))) !== 0)) {
				{
				{
				this.state = 17;
				this.searchPrimary();
				}
				}
				this.state = 22;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 23;
			this.match(QueryRecognizerParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public searchPrimary(): SearchPrimaryContext {
		let _localctx: SearchPrimaryContext = new SearchPrimaryContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, QueryRecognizerParser.RULE_searchPrimary);
		let _la: number;
		try {
			this.state = 37;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QueryRecognizerParser.PHRASE:
			case QueryRecognizerParser.LPAREN:
			case QueryRecognizerParser.NOT:
			case QueryRecognizerParser.WORD:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 26;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === QueryRecognizerParser.NOT) {
					{
					this.state = 25;
					this.match(QueryRecognizerParser.NOT);
					}
				}

				this.state = 34;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case QueryRecognizerParser.LPAREN:
					{
					this.state = 28;
					this.match(QueryRecognizerParser.LPAREN);
					this.state = 29;
					this.expression();
					this.state = 30;
					this.match(QueryRecognizerParser.RPAREN);
					}
					break;
				case QueryRecognizerParser.PHRASE:
					{
					this.state = 32;
					this.match(QueryRecognizerParser.PHRASE);
					}
					break;
				case QueryRecognizerParser.WORD:
					{
					this.state = 33;
					this.match(QueryRecognizerParser.WORD);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;
			case QueryRecognizerParser.FIELD_NAME:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 36;
				this.fieldSearch();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fieldSearch(): FieldSearchContext {
		let _localctx: FieldSearchContext = new FieldSearchContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, QueryRecognizerParser.RULE_fieldSearch);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 39;
			this.match(QueryRecognizerParser.FIELD_NAME);
			this.state = 40;
			this.match(QueryRecognizerParser.COLON);
			this.state = 47;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QueryRecognizerParser.LPAREN:
				{
				{
				this.state = 41;
				this.match(QueryRecognizerParser.LPAREN);
				this.state = 42;
				this.expression();
				this.state = 43;
				this.match(QueryRecognizerParser.RPAREN);
				}
				}
				break;
			case QueryRecognizerParser.PHRASE:
				{
				this.state = 45;
				this.match(QueryRecognizerParser.PHRASE);
				}
				break;
			case QueryRecognizerParser.WORD:
				{
				this.state = 46;
				this.match(QueryRecognizerParser.WORD);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expression(): ExpressionContext {
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, QueryRecognizerParser.RULE_expression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 49;
			this.orExpression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public orExpression(): OrExpressionContext {
		let _localctx: OrExpressionContext = new OrExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, QueryRecognizerParser.RULE_orExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 51;
			this.andExpression();
			this.state = 58;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << QueryRecognizerParser.PHRASE) | (1 << QueryRecognizerParser.LPAREN) | (1 << QueryRecognizerParser.NOT) | (1 << QueryRecognizerParser.OR) | (1 << QueryRecognizerParser.WORD))) !== 0)) {
				{
				{
				this.state = 53;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === QueryRecognizerParser.OR) {
					{
					this.state = 52;
					this.match(QueryRecognizerParser.OR);
					}
				}

				this.state = 55;
				this.andExpression();
				}
				}
				this.state = 60;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public andExpression(): AndExpressionContext {
		let _localctx: AndExpressionContext = new AndExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, QueryRecognizerParser.RULE_andExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 61;
			this.notExpression();
			this.state = 66;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === QueryRecognizerParser.AND) {
				{
				{
				this.state = 62;
				this.match(QueryRecognizerParser.AND);
				this.state = 63;
				this.notExpression();
				}
				}
				this.state = 68;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public notExpression(): NotExpressionContext {
		let _localctx: NotExpressionContext = new NotExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, QueryRecognizerParser.RULE_notExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 70;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === QueryRecognizerParser.NOT) {
				{
				this.state = 69;
				this.match(QueryRecognizerParser.NOT);
				}
			}

			this.state = 72;
			this.primary();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public primary(): PrimaryContext {
		let _localctx: PrimaryContext = new PrimaryContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, QueryRecognizerParser.RULE_primary);
		try {
			this.state = 80;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case QueryRecognizerParser.LPAREN:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 74;
				this.match(QueryRecognizerParser.LPAREN);
				this.state = 75;
				this.expression();
				this.state = 76;
				this.match(QueryRecognizerParser.RPAREN);
				}
				break;
			case QueryRecognizerParser.PHRASE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 78;
				this.match(QueryRecognizerParser.PHRASE);
				}
				break;
			case QueryRecognizerParser.WORD:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 79;
				this.match(QueryRecognizerParser.WORD);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\fU\x04\x02\t" +
		"\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07\t" +
		"\x07\x04\b\t\b\x04\t\t\t\x03\x02\x03\x02\x07\x02\x15\n\x02\f\x02\x0E\x02" +
		"\x18\v\x02\x03\x02\x03\x02\x03\x03\x05\x03\x1D\n\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x05\x03%\n\x03\x03\x03\x05\x03(\n\x03\x03" +
		"\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x05\x042" +
		"\n\x04\x03\x05\x03\x05\x03\x06\x03\x06\x05\x068\n\x06\x03\x06\x07\x06" +
		";\n\x06\f\x06\x0E\x06>\v\x06\x03\x07\x03\x07\x03\x07\x07\x07C\n\x07\f" +
		"\x07\x0E\x07F\v\x07\x03\b\x05\bI\n\b\x03\b\x03\b\x03\t\x03\t\x03\t\x03" +
		"\t\x03\t\x03\t\x05\tS\n\t\x03\t\x02\x02\x02\n\x02\x02\x04\x02\x06\x02" +
		"\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x02\x02\x02Y\x02\x12\x03\x02\x02\x02" +
		"\x04\'\x03\x02\x02\x02\x06)\x03\x02\x02\x02\b3\x03\x02\x02\x02\n5\x03" +
		"\x02\x02\x02\f?\x03\x02\x02\x02\x0EH\x03\x02\x02\x02\x10R\x03\x02\x02" +
		"\x02\x12\x16\x05\x04\x03\x02\x13\x15\x05\x04\x03\x02\x14\x13\x03\x02\x02" +
		"\x02\x15\x18\x03\x02\x02\x02\x16\x14\x03\x02\x02\x02\x16\x17\x03\x02\x02" +
		"\x02\x17\x19\x03\x02\x02\x02\x18\x16\x03\x02\x02\x02\x19\x1A\x07\x02\x02" +
		"\x03\x1A\x03\x03\x02\x02\x02\x1B\x1D\x07\b\x02\x02\x1C\x1B\x03\x02\x02" +
		"\x02\x1C\x1D\x03\x02\x02\x02\x1D$\x03\x02\x02\x02\x1E\x1F\x07\x05\x02" +
		"\x02\x1F \x05\b\x05\x02 !\x07\x06\x02\x02!%\x03\x02\x02\x02\"%\x07\x03" +
		"\x02\x02#%\x07\v\x02\x02$\x1E\x03\x02\x02\x02$\"\x03\x02\x02\x02$#\x03" +
		"\x02\x02\x02%(\x03\x02\x02\x02&(\x05\x06\x04\x02\'\x1C\x03\x02\x02\x02" +
		"\'&\x03\x02\x02\x02(\x05\x03\x02\x02\x02)*\x07\x04\x02\x02*1\x07\x07\x02" +
		"\x02+,\x07\x05\x02\x02,-\x05\b\x05\x02-.\x07\x06\x02\x02.2\x03\x02\x02" +
		"\x02/2\x07\x03\x02\x0202\x07\v\x02\x021+\x03\x02\x02\x021/\x03\x02\x02" +
		"\x0210\x03\x02\x02\x022\x07\x03\x02\x02\x0234\x05\n\x06\x024\t\x03\x02" +
		"\x02\x025<\x05\f\x07\x0268\x07\t\x02\x0276\x03\x02\x02\x0278\x03\x02\x02" +
		"\x0289\x03\x02\x02\x029;\x05\f\x07\x02:7\x03\x02\x02\x02;>\x03\x02\x02" +
		"\x02<:\x03\x02\x02\x02<=\x03\x02\x02\x02=\v\x03\x02\x02\x02><\x03\x02" +
		"\x02\x02?D\x05\x0E\b\x02@A\x07\n\x02\x02AC\x05\x0E\b\x02B@\x03\x02\x02" +
		"\x02CF\x03\x02\x02\x02DB\x03\x02\x02\x02DE\x03\x02\x02\x02E\r\x03\x02" +
		"\x02\x02FD\x03\x02\x02\x02GI\x07\b\x02\x02HG\x03\x02\x02\x02HI\x03\x02" +
		"\x02\x02IJ\x03\x02\x02\x02JK\x05\x10\t\x02K\x0F\x03\x02\x02\x02LM\x07" +
		"\x05\x02\x02MN\x05\b\x05\x02NO\x07\x06\x02\x02OS\x03\x02\x02\x02PS\x07" +
		"\x03\x02\x02QS\x07\v\x02\x02RL\x03\x02\x02\x02RP\x03\x02\x02\x02RQ\x03" +
		"\x02\x02\x02S\x11\x03\x02\x02\x02\f\x16\x1C$\'17<DHR";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!QueryRecognizerParser.__ATN) {
			QueryRecognizerParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(QueryRecognizerParser._serializedATN));
		}

		return QueryRecognizerParser.__ATN;
	}

}

export class SearchContext extends ParserRuleContext {
	public searchPrimary(): SearchPrimaryContext[];
	public searchPrimary(i: number): SearchPrimaryContext;
	public searchPrimary(i?: number): SearchPrimaryContext | SearchPrimaryContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SearchPrimaryContext);
		} else {
			return this.getRuleContext(i, SearchPrimaryContext);
		}
	}
	public EOF(): TerminalNode { return this.getToken(QueryRecognizerParser.EOF, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QueryRecognizerParser.RULE_search; }
	// @Override
	public enterRule(listener: QueryRecognizerListener): void {
		if (listener.enterSearch) {
			listener.enterSearch(this);
		}
	}
	// @Override
	public exitRule(listener: QueryRecognizerListener): void {
		if (listener.exitSearch) {
			listener.exitSearch(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryRecognizerVisitor<Result>): Result {
		if (visitor.visitSearch) {
			return visitor.visitSearch(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SearchPrimaryContext extends ParserRuleContext {
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(QueryRecognizerParser.LPAREN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(QueryRecognizerParser.RPAREN, 0); }
	public PHRASE(): TerminalNode | undefined { return this.tryGetToken(QueryRecognizerParser.PHRASE, 0); }
	public WORD(): TerminalNode | undefined { return this.tryGetToken(QueryRecognizerParser.WORD, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(QueryRecognizerParser.NOT, 0); }
	public fieldSearch(): FieldSearchContext | undefined {
		return this.tryGetRuleContext(0, FieldSearchContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QueryRecognizerParser.RULE_searchPrimary; }
	// @Override
	public enterRule(listener: QueryRecognizerListener): void {
		if (listener.enterSearchPrimary) {
			listener.enterSearchPrimary(this);
		}
	}
	// @Override
	public exitRule(listener: QueryRecognizerListener): void {
		if (listener.exitSearchPrimary) {
			listener.exitSearchPrimary(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryRecognizerVisitor<Result>): Result {
		if (visitor.visitSearchPrimary) {
			return visitor.visitSearchPrimary(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FieldSearchContext extends ParserRuleContext {
	public FIELD_NAME(): TerminalNode { return this.getToken(QueryRecognizerParser.FIELD_NAME, 0); }
	public COLON(): TerminalNode { return this.getToken(QueryRecognizerParser.COLON, 0); }
	public PHRASE(): TerminalNode | undefined { return this.tryGetToken(QueryRecognizerParser.PHRASE, 0); }
	public WORD(): TerminalNode | undefined { return this.tryGetToken(QueryRecognizerParser.WORD, 0); }
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(QueryRecognizerParser.LPAREN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(QueryRecognizerParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QueryRecognizerParser.RULE_fieldSearch; }
	// @Override
	public enterRule(listener: QueryRecognizerListener): void {
		if (listener.enterFieldSearch) {
			listener.enterFieldSearch(this);
		}
	}
	// @Override
	public exitRule(listener: QueryRecognizerListener): void {
		if (listener.exitFieldSearch) {
			listener.exitFieldSearch(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryRecognizerVisitor<Result>): Result {
		if (visitor.visitFieldSearch) {
			return visitor.visitFieldSearch(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	public orExpression(): OrExpressionContext {
		return this.getRuleContext(0, OrExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QueryRecognizerParser.RULE_expression; }
	// @Override
	public enterRule(listener: QueryRecognizerListener): void {
		if (listener.enterExpression) {
			listener.enterExpression(this);
		}
	}
	// @Override
	public exitRule(listener: QueryRecognizerListener): void {
		if (listener.exitExpression) {
			listener.exitExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryRecognizerVisitor<Result>): Result {
		if (visitor.visitExpression) {
			return visitor.visitExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OrExpressionContext extends ParserRuleContext {
	public andExpression(): AndExpressionContext[];
	public andExpression(i: number): AndExpressionContext;
	public andExpression(i?: number): AndExpressionContext | AndExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AndExpressionContext);
		} else {
			return this.getRuleContext(i, AndExpressionContext);
		}
	}
	public OR(): TerminalNode[];
	public OR(i: number): TerminalNode;
	public OR(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(QueryRecognizerParser.OR);
		} else {
			return this.getToken(QueryRecognizerParser.OR, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QueryRecognizerParser.RULE_orExpression; }
	// @Override
	public enterRule(listener: QueryRecognizerListener): void {
		if (listener.enterOrExpression) {
			listener.enterOrExpression(this);
		}
	}
	// @Override
	public exitRule(listener: QueryRecognizerListener): void {
		if (listener.exitOrExpression) {
			listener.exitOrExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryRecognizerVisitor<Result>): Result {
		if (visitor.visitOrExpression) {
			return visitor.visitOrExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AndExpressionContext extends ParserRuleContext {
	public notExpression(): NotExpressionContext[];
	public notExpression(i: number): NotExpressionContext;
	public notExpression(i?: number): NotExpressionContext | NotExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NotExpressionContext);
		} else {
			return this.getRuleContext(i, NotExpressionContext);
		}
	}
	public AND(): TerminalNode[];
	public AND(i: number): TerminalNode;
	public AND(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(QueryRecognizerParser.AND);
		} else {
			return this.getToken(QueryRecognizerParser.AND, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QueryRecognizerParser.RULE_andExpression; }
	// @Override
	public enterRule(listener: QueryRecognizerListener): void {
		if (listener.enterAndExpression) {
			listener.enterAndExpression(this);
		}
	}
	// @Override
	public exitRule(listener: QueryRecognizerListener): void {
		if (listener.exitAndExpression) {
			listener.exitAndExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryRecognizerVisitor<Result>): Result {
		if (visitor.visitAndExpression) {
			return visitor.visitAndExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NotExpressionContext extends ParserRuleContext {
	public primary(): PrimaryContext {
		return this.getRuleContext(0, PrimaryContext);
	}
	public NOT(): TerminalNode | undefined { return this.tryGetToken(QueryRecognizerParser.NOT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QueryRecognizerParser.RULE_notExpression; }
	// @Override
	public enterRule(listener: QueryRecognizerListener): void {
		if (listener.enterNotExpression) {
			listener.enterNotExpression(this);
		}
	}
	// @Override
	public exitRule(listener: QueryRecognizerListener): void {
		if (listener.exitNotExpression) {
			listener.exitNotExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryRecognizerVisitor<Result>): Result {
		if (visitor.visitNotExpression) {
			return visitor.visitNotExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrimaryContext extends ParserRuleContext {
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(QueryRecognizerParser.LPAREN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(QueryRecognizerParser.RPAREN, 0); }
	public PHRASE(): TerminalNode | undefined { return this.tryGetToken(QueryRecognizerParser.PHRASE, 0); }
	public WORD(): TerminalNode | undefined { return this.tryGetToken(QueryRecognizerParser.WORD, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return QueryRecognizerParser.RULE_primary; }
	// @Override
	public enterRule(listener: QueryRecognizerListener): void {
		if (listener.enterPrimary) {
			listener.enterPrimary(this);
		}
	}
	// @Override
	public exitRule(listener: QueryRecognizerListener): void {
		if (listener.exitPrimary) {
			listener.exitPrimary(this);
		}
	}
	// @Override
	public accept<Result>(visitor: QueryRecognizerVisitor<Result>): Result {
		if (visitor.visitPrimary) {
			return visitor.visitPrimary(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


