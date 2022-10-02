const baseUrl = "http://127.0.0.1:8000/api";

const locations = `${baseUrl}/getCountries`
axios.get(locations).then(response => console.log(response.data))