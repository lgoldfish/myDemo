var cheerio = require("cheerio");

var $ = cheerio.load("<p id='box'>html css javascript</p>");

var p = $("p");

console.log(p.html());

p.attr("class","laowang");

console.log($.html());


