import axios from "axios";//引入axios库
import qs from "qs";//引入qs库
/**
根据环境变量区分接口的默认地址
*/
// axios.defaults.baseUrl='http://localhost:3000'
// switch(process.env.NODE_ENV){
// 	case "production":
// 	axios.defaults.baseUrl="http://www.baidu.com";
// 	break;
// 	case "test":
// 	axios.defaults.baseUrl="http://xxxxxxxxx";
// 	break;
// 	default:
// 	axios.defaults.baseUrl="http://11111111111111"
// 	break;
// }
/*
*设置超时时间
*/
axios.defaults.timeout=10000;

/*
*设置跨域是否允许携带凭证
*/
axios.defaults.withCredentials=true;//不设置的话cookie传不过去

/*
*设置请求传递数据的格式，常见有x-www.form-urlencoded
*/
axios.defaults.headers["content-Type"]="application/x-www.form-urlencoded"


/*
*将要传递的参数转化为上述格式 xxx=xxx&zzz=xxx（只对post有效）
*/
axios.defaults.transformRequest=data=>qs.stringify(data)


/*
*设置请求拦截器
TOKEN校验（JWT）
*/
axios.interceptors.request.use(config=>{//成功的拦截
	//获取本地存储的token
	// let token=localStorage.getItem('token')
	// token?config.headers.Authorization=token:""

	return config

},error=>{//失败的拦截
return Promise.reject(error)
})

/*
*axios处理服务器返回状态码（一般也不用配）
*/
axios.defaults.validateStatus=status=>{
	 //=>自定义成功失败规则：RESOLVE / REJECT（默认规则：状态码以2开头算作成功）
	return /^(2|3)\d{2}$/.test(status);
}

/*
*设置响应拦截器
*/
axios.interceptors.response.use(response=>{
	console.log('--')
	console.log(response)
	return response.data //将响应主体返回（可以配可以不配）
},error=>{
	let {response}=error;
	if(response) {//服务器返回结果
		switch(response.status){
			case 401://当前请求需要用户验证（一般是未登录）
			//做路由跳转或者弹窗
			break;
			case 403://服务器理解请求，但是拒绝处理（一般是token过期，session过期）
			break;
			case 404://找不到页面
			//做提示（服务器开小差等）
			break;
		}

	}else {//服务器连结果都没有返回（可能情况，服务器崩了，客户端断网）
		if(!window.navigator.onLine){//如果断网了
		//这里可以跳转到断网提示页面，有网络时再跳回原来页面
		return

		}
		return Promise.reject(error)

	}


})

export default axios;



