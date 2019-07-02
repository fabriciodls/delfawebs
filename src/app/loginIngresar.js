import axios from 'axios'

export default (componente) => {
    componente.cargando = true
    axios
    .post(`${process.env.API_URL}dfs50001`,{
        email: componente.email,
        pass: componente.pass
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
            componente.error = 'No hay retorno del ErrorSDT'
        } else if (response.data.ErrorSDT.ErrorCode === 0) {
            if (!response.data.frontUser.admin) {
                componente.$store.commit('seleccionarProyecto', {
                    idEnc: response.data.frontProyectos[0].proyectoEnc, 
                    nobre: response.data.frontProyectos[0].nombre,
                    logo: response.data.frontProyectos[0].imagen
                })
            }
            componente.$store.commit('ingresar', response.data.frontUser)
            componente.$emit('cerrar')
        } else {
            componente.error = response.data.ErrorSDT.ErrorDescription
        }
    })
    .catch(error => {
        componente.cargando = false
        componente.error = error
    })
}