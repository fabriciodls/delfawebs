import axios from 'axios'

export default (componente) => {
    axios
    .post(`${process.env.API_URL}dfs60020`,{
        frontUser: componente.$store.state.usuario,
        proyectoEnc: componente.$store.state.proyecto.idEnc,
        filtrar: componente.hayMas,
        desdeEnc: componente.ultimo
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

            if (componente.hayMas && response.data.frontBlogs.length > 0) {
                componente.articulos = componente.articulos.concat(response.data.frontBlogs)
            } else {
                componente.articulos = response.data.frontBlogs
            }
            componente.hayMas = response.data.hayMas
            componente.ultimo = response.data.ultimoEnc
            componente.error = null

            componente.articulos.forEach(ar => {
                ar.inicio = ar.inicio.split('T')[0].split('-').reverse().join('/')
                ar.fin = ar.fin.split('T')[0].split('-').reverse().join('/')
            })
            
        } else {
            componente.error = response.data.ErrorSDT.ErrorDescription
        }

    })
    .catch(error => {
        componente.cargando = false
        componente.error = error
    })
}
