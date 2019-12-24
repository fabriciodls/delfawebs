/*
    Configuración de axios
*/

import axios from 'axios'

axios.defaults.headers = {'Content-Type': 'application/json;charset=UTF-8'}
axios.defaults.crossDomain = true
axios.defaults.withCredentials = true

export default axios