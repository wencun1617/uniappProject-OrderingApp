/*引入json-server*/
const jsonServer = require('json-server');

/*引如db.js输出包*/
const mockData = require("./mock/mockData.js");

//console.log(mockData.data);

/*搭建一个server*/
const server = jsonServer.create();

/*将db路由关联到server*/
const router = jsonServer.router(mockData.data);

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(router);


//自定义输出
router.render = function(request, response,next) {
	
	let db = router.db 
	let data = db.get('login').value()
	if(request.url=="/login"){
		response.jsonp(data);
		return;
	}

	response.json({
		code: 0,
		msg: "Scuccess",
		// len:response.locals.data.length,
		len:30,
		data: response.locals.data
	});
}

/*监听端口*/
server.listen(8080, function() {
	console.log("json Server Start on 8080!");
});