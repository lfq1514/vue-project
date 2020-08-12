import axios from "./http"
function login (){
	return axios.get('/api/login')
}
function getList (data){
	return axios.get('/api/getGoodsList',{params:{start:data.start,limit:data.limit}})
}
export default {
	login,
	getList
}