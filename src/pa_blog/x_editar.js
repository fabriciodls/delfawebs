import axios from 'axios'

export default (componente) => {
    componente.editando = componente.paraEditar

    if (componente.articulo.imagen.url && componente.articulo.imagen.url.includes('http')) {
        componente.articulo.imagen.activo = true
    } else {
        componente.articulo.imagen.activo = false
    }

    if (componente.articulo.video.url && componente.articulo.video.url.includes('http') && componente.articulo.video.poster && componente.articulo.video.poster.includes('http')) {
        componente.articulo.video.activo = true
    } else {
        componente.articulo.video.activo = false
    }

    if (componente.articulo.boton.texto && componente.articulo.boton.accion) {
        componente.articulo.boton.activo = true
    } else {
        componente.articulo.boton.activo = false
    }

    if (componente.parrafoPrevio) {
        componente.articulo.parrafos.push({
            idEnc: 'ultimo',
            texto: componente.parrafoPrevio
        })
    }

    // Compatibilidad de formatos fecha hora
    componente.articulo.inicio = `${componente.articulo.inicio}T00:00:00`
    componente.articulo.fin = `${componente.articulo.fin}T00:00:00`

    axios
    .post(`${process.env.API_URL}dfs60022`,{
        frontUser: componente.$store.state.usuario,
        proyectoEnc: componente.$store.state.proyecto.idEnc,
        idEnc: componente.paraEditar,
        frontBlog: componente.articulo
    },{
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        crossDomain: true,
        withCredentials: true
    })
    .then(response => {
        componente.editando = false
        componente.paraEditar = false
        if (!response.data) {
            componente.error = 'No hay retorno de login'
        } else if (!response.data.ErrorSDT) {
            componente.error = 'No hay retorno del error'
        } else if (response.data.ErrorSDT.ErrorCode === 0) {

            componente.error = null
            componente.articulo = {
                idEnc: null,
                activo: true,
                pagina: '/',
                titulo: '',
                inicio: componente.ahora,
                fin: '2030-01-01',
                imagen: {
                    activo: false,
                    url: null
                },
                video: {
                    activo: false,
                    url: null,
                    poster: null,
                    tipo: 'video/mp4'
                },
                boton: {
                    activo: false,
                    texto: null,
                    tipo: 1,
                    accion: null
                },
                parrafos: []
            }
            componente.parrafoPrevio = null

            // Cargando los datos que ha cambiado
            componente.articulos = response.data.frontBlogs
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
        componente.editando = false
        componente.paraEditar = false
        componente.error = error
    })
}
