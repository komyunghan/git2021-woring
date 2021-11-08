

const Reset = createGlobalStyle`
* {
	box-sizing: border-box;
}
html, body, div, span, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
abbr, address, cite, code,
del, dfn, em, img, ins, kbd, q, samp,
small, strong, sub, sup, var,
b, i,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, figcaption, figure,
footer, header, hgroup, menu, nav, section, summary,
time, mark, audio, video {font-family:"Spoqa Han Sans", sans-serif; margin:0; padding:0; border:0; outline:0; font-size:100%; vertical-align:baseline; background:transparent; box-sizing: border-box; }
body { line-height:1; font-family:'Spoqa Han Sans', sans-serif, Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue;}
article,aside,details,figcaption,figure,
footer,header,hgroup,menu,nav,section { display:block; }
ul { list-style:none; }
blockquote, q { quotes:none; }
blockquote:before, blockquote:after,
q:before, q:after { content:''; content:none; }
a { margin:0; padding:0; font-size:100%; text-decoration: none; color: #000; vertical-align:baseline; background:transparent; box-sizing: border-box; }
a:active, a:hover, a:focus { text-decoration: none; color: none; }
ins { background-color:#ff9; color:#000; text-decoration:none; }
mark { background-color:#ff9; color:#000; font-style:italic; font-weight:bold; }
del { text-decoration: line-through; }
abbr[title], dfn[title] { border-bottom:1px dotted; cursor:help; }
table { width: 100%; border-collapse:collapse; border-spacing:0; }
table th { font-weight: 400; }
hr { display:block; height:1px; border:0; border-top:1px solid #cccccc; margin:1em 0; padding:0; }
input, select { vertical-align:middle; box-sizing: border-box; }
textarea { box-sizing: border-box; }
input, button:focus {outline: 0;}
`;
export default Reset;