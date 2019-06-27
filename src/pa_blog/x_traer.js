import axios from 'axios'

export default (componente) => {
    axios
    .post(`${process.env.API_URL}dfs60020`,{
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

            if (componente.hayMas && response.data.frontListBlog.length > 0) {
                componente.articulos = componente.articulos.concat(response.data.frontListBlog)
            } else {
                componente.articulos = response.data.frontListBlog
            }
            componente.hayMas = response.data.hayMas
            componente.ultimo = response.data.ultimoEnc
            
        } else {
            componente.error = response.data.ErrorSDT.ErrorDescription
        }

    })
    .catch(error => {
        componente.cargando = false
        componente.error = error
    })
}
