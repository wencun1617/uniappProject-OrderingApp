//mockData.js
let Mock = require('mockjs');
var Random = Mock.Random;
var res={};
function buildStudentData(){
		let data = [];
		for (var i = 1; i <= 30; i++) {
			data.push(
				Mock.mock({
					'id':i,
					'name': '@cname',
					'gender|1': ['男', '女'],
					'pic': Random.image("200x200", Random.color())
				})
			);
		}
		res['students'] = data
}

function buildProductData() {
	let data=[];
	for(var i = 1; i <= 30; i++) {
		data.push(
			Mock.mock({
				'id': i,
				'cataId':/[1-4]{1}/,
				'productId': /P[0-9]{5}/,
				'name':'@cword(2,5)',
				'desc':'@ctitle(6,8)',
				"price":"@float(10,90,1,1)",
				'pic':"@image(200x200,@color,@word)",
				'unit|1': ['公斤', '包','根']
			})
		);
	}
	res['products'] =data;
}


function buildLoginData(){
	var data=[];			
	var LoginSucess =Mock.mock(	
	    {	
	        "code": 0,	
	        "msg":'登录成功！',	
	        "count":1,	
	        "authority|1":['ROLE_STUDENT','ROLE_TEACHER','ROLE_ADMIN'],
			"name":'@cname'	
	    });		    	
	  data.push(LoginSucess);	
	  
	  var LoginFailed =Mock.mock(	
	    {	
	        "code":991,	
	        'msg|1':['密码错误','用户不存在','未授权的访问'],	
	        "count":0,
	        "data":{}	
	    });		    	
	   data.push(LoginFailed);
	
	   //0-1随机数	
	   var idx=Math.floor(Math.random()*2);	
	   res["login"]=data[idx];
}		

function buildData(){	
	buildStudentData()
	buildProductData()
	buildLoginData()
	return res;
}
		
		
module.exports={
	data:buildData()
}
