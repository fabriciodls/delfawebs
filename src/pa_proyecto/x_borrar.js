import axios from 'axios'

export default (componente, nombre) => {
    axios
    .post(`${process.env.API_URL}dfs60003`,{
        frontUser: componente.$store.state.usuario,
        idEnc: componente.borrando
    },{
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        crossDomain: true,
        withCredentials: true
    })
    .then(response => {
        componente.borrando = null
        if (!response.data) {
            componente.error = 'No hay retorno del servicio'
        } else if (!response.data.ErrorSDT) {
            componente.error = 'No hay retorno del ErrorSDT'
        } else if (response.data.ErrorSDT.ErrorCode === 0) {

            componente.error = null
            componente.proyectos = response.data.frontProyectos
            alert(`${nombre} fué borrado`)

        // } else if (response.data.ErrorSDT.ErrorCode <= 4) {
            // logout (componente)
        } else {
            componente.error = response.data.ErrorSDT.ErrorDescription
        }

    })
    .catch(error => {
        componente.borrando = null
        componente.error = error
    })
}