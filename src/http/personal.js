import axios from "./http"
function getUserInfo (params){
	return axios.post(url,params)
	
}
function uploadPicture(params){
	return axios.post(
			url,
			params,
			{
				headers:"Content-Type: multipart/form-data"
			}
		)
}
export default {
	getUserInfo,
	uploadPicture
}