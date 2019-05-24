import axios from 'axios'

export default (componente) => {
    axios
    .post(`${process.env.API_URL}dfs60000`,{
        // frontUser: componente.$store.state.usuario,
        // producto: componente.producto, // Encriptado
        // box: componente.box
    },{
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        crossDomain: true,
        withCredentials: true
    })
    .then(response => {
        componente.cargando = false
        if (!response.data) {
            componente.error = 'No hay retorno de login'
        } else if (!response.data.error) {
            componente.error = 'No hay retorno del error'
        } else if (response.data.ErrorSDT.error === 0) {

           componente.proyectos = response.data.proyectos

        // } else if (response.data.ErrorSDT.error <= 4) {
        //     logout (componente)
        } else {
            componente.error = response.data.ErrorSDT.ErrorDescription
        }

    })
    .catch(error => {
        componente.cargando = false
        componente.error = error
    })
}
