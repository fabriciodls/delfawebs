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

        /**
         * borrar
         */
        componente.articulos.push({
            idEnc: '1',
            activo: true,
            pagina: '/',
            titulo: 'Análisis test 23',
            inicio: '26/8/92 12:00',
            fin: '5/5/30 12:00',
            imagen: {
                activo: false,
                url: null
            },
            video: {
                activo: false,
                url: null,
                poster: 'https://pbs.twimg.com/media/D510Oj4WkAASIGE.jpg',
                tipo: 'video/mp4'
            },
            boton: {
                activo: false,
                texto: 'Ver Más',
                tipo: 1,
                accion: '/'
            },
            parrafos: []
        }) /***/
            
        } else {
            componente.error = response.data.ErrorSDT.ErrorDescription
        }

    })
    .catch(error => {
        componente.cargando = false
        componente.error = error
    })
}
