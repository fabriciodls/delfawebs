import axios from 'axios'

export default (componente, nombre) => {
    axios
    .post(`${process.env.API_URL}dfs60023`,{
        frontUser: componente.$store.state.usuario,
        proyectoEnc: componente.$store.state.proyecto.idEnc,
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
            alert(`${nombre} fué borrado`)
            componente.articulos = response.data.frontBlogs
            componente.hayMas = response.data.hayMas
            componente.ultimo = response.data.ultimoEnc
            componente.error = null

            componente.articulos.forEach(ar => {
                ar.inicio = ar.inicio.split('T')[0].split('-').reverse().join('/')
                ar.fin = ar.fin.split('T')[0].split('-').reverse().join('/')
            })

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