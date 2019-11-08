const axios = require('axios');

const ApiService = {

    //endpoint: "http://18.228.33.23:8090/api/",
    endpoint: process.env.NODE_ENV === 'development' ? "http://localhost:5000/api/" : "http://api.guarany.nacaointerativa.com.br/api/",

    get(url, data = {}, headers = {}) {
        return axios.get(this.endpoint + url, data, headers);
    },

    post(url, data, headers = {}) {
        return axios.post(this.endpoint + url, data, headers);
    },

    put(url, data, headers = {}) {
        return axios.put(this.endpoint + url, data, headers);
    },

    getLogged() {
        if (localStorage.user == undefined)
            return null;
        return this.parseJwt(localStorage.user);
    },

    setLogged(user) {
        localStorage.user = user;
        axios.defaults.headers = {
            'UserId': ApiService.getLogged() == null ? null : ApiService.getLogged().UserId.toString(),
        }
        EventBus.$emit('login');
    },

    logout() {
        delete localStorage.user;
    },

    isLogged() {
        return localStorage.user != undefined;
    },

    parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        let parsedJson = JSON.parse(jsonPayload);
        if (new Date() >= new Date(parsedJson.expires)) return null;
        return parsedJson;
    },

    getEndpoint() {
        return this.endpoint;
    },
};

/*axios.defaults.headers = {
    'UserId': ApiService.getLogged() == null ? null : ApiService.getLogged().UserId.toString(),
}*/

export default ApiService;