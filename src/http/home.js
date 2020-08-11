import axios from "./http"
function login (){
	return axios.get('/api/login')
}
function getList (){
	return axios.get('/api/getGoodsList')
}
export default {
	login,
	getList
}