import axios from "./http"
function login (){
	return axios.get('/api/getUserList')

}
export default {
	login
}