var http = require("http");
var fs = require("fs");
var cheerio = require("cheerio");
var sd = require("silly-datetime");
var path = require("path");

http.get("http://www.mm131.com/",function(res){

	var result1 = "";
	res.on("data",function(chunk){

		result1 += chunk; 
	})

	res.on("end",function(){
		// console.log(result1.toString());

		var $ = cheerio.load(result1);

		var a = $("dd+dd a");

		// console.log(a);

		a.each(function(key,value){

			// console.log($(value).attr("href"));

			http.get($(value).attr("href"),(res2)=>{

				var result2 = "";
				res2.on("data",(chunk)=>{
					result2 += chunk; 
				})

				res2.on("end",function(){

					// console.log(result2.toString());

					var $$ = cheerio.load(result2);

					var img = $$(".content-pic img");



					img.each(function(key,value){

						console.log($(value).attr("src"));

						http.get($(value).attr("src"),function(res3){

							var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
							var ran = Math.floor(Math.random()*10000+ 8999 );
							var extname = path.extname($(value).attr("src"))


							var writeStream = fs.createWriteStream(path.join(__dirname,"./uploads/",ttt+ran+extname))	
							res3	
								.pipe(writeStream)
								.on("close",function(){
									console.log("下载完毕 ")
								})
						})
					})
				})
			})
		})

	})
})