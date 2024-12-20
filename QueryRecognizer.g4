grammar QueryRecognizer;

search
	: searchPrimary (searchPrimary)* EOF
	;

searchPrimary
	: NOT? (LPAREN expression RPAREN | PHRASE | WORD )
	| fieldSearch
	;

fieldSearch
	: FIELD_NAME COLON ((LPAREN expression RPAREN) | PHRASE | WORD)
	;

expression
	: orExpression
	;

orExpression
	: andExpression (OR? andExpression)*
	;

andExpression
	: notExpression (AND notExpression)*
	;

notExpression
	: NOT? primary
	;

primary
	: LPAREN expression RPAREN
	| PHRASE
	| WORD
	;

PHRASE
    : '"' (~["\\] | '\\' .)* '"'
    | '\'' (~['\\] | '\\' .)* '\''
    ;

FIELD_NAME
    : 'appname'
    | '-appname'
    | 'hostname'
    | '-hostname'
    | 'timestamp'
    | '-timestamp'
    | 'data'
    | '-data'
    | 'data_exact'
    | '-data_exact'
	;

LPAREN
	: '('
	;

RPAREN
	: ')'
	;

COLON
	: ':'
	;

NOT
	: '-' | 'NOT' | 'not'
	;

OR
	: 'OR' | 'or'
	;

AND
	: 'AND' | 'and'
	;

WORD
	: ~['" \t\r\n:()-] ~['" \t\r\n:()]+
	;

WS
	: [ \t\n\r]+ -> skip
	;
