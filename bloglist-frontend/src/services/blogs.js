import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
	this.token = `bearer ${newToken}`
}

const create = async (newObject) => {
	const config = {
		headers: { 'Authorization': this.token }

	}
	const response = await axios.post(baseUrl, newObject, config)
	return response.data
	
}

export default { getAll, create, setToken}