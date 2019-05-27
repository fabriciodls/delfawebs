import axios from 'axios'

export default (componente) => {
    axios
    .post(`${process.env.API_URL}dfs60000`,{
        frontUser: componente.$store.state.usuario
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
        } else if (!response.data.ErrorSDT) {
            componente.error = 'No hay retorno del error'
        } else if (response.data.ErrorSDT.ErrorCode === 0) {

            componente.proyectos = response.data.frontProyectos
            if (!componente.$store.state.proyecto.idEnc && response.data.frontProyectos && response.data.frontProyectos[0]) {
                componente.$store.commit('seleccionarProyecto',{
                    idEnc: response.data.frontProyectos[0].proyectoEnc,
                    nombre: response.data.frontProyectos[0].nombre
                })
            }

        // } else if (response.data.ErrorSDT.ErrorCode <= 4) {
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
