import axios from 'axios'

export default (componente) => {
    componente.agregando = true
    componente.error = null
    axios
    .post(`${process.env.API_URL}dfs60001`,{
        frontUser: componente.$store.state.usuario,
        nombre: componente.nombre,
        url: componente.url,
        logo: componente.logo
    },{
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        crossDomain: true,
        withCredentials: true
    })
    .then(response => {
        componente.agregando = false
        componente.paraAgregar = false
        if (!response.data) {
            componente.error = 'No hay retorno del servicio'
        } else if (!response.data.ErrorSDT) {
            componente.error = 'No hay retorno del ErrorSDT'
        } else if (response.data.ErrorSDT.ErrorCode === 0) {

            componente.error = null
            componente.proyectos = response.data.frontProyectos
            componente.nombre = null
            componente.url = null
            componente.logo = null

        // } else if (response.data.ErrorSDT.ErrorCode <= 4) {
            // logout (componente)
        } else {
            componente.error = response.data.ErrorSDT.ErrorDescription
        }

    })
    .catch(error => {
        componente.agregando = false
        componente.paraAgregar = false
        componente.error = error
    })
}