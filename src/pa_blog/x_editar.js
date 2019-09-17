import axios from 'axios'

export default (componente, articulo) => {
    componente.estado.editando = componente.estado.paraEditar

    if (articulo.imagen.url && articulo.imagen.url.includes('http')) {
        articulo.imagen.activo = true
    } else {
        articulo.imagen.activo = false
    }

    if (articulo.imagenAlternativa.url && articulo.imagenAlternativa.url.includes('http')) {
        articulo.imagenAlternativa.activo = true
    } else {
        articulo.imagenAlternativa.activo = false
    }

    if (articulo.imagenAlternativa2.url && articulo.imagenAlternativa2.url.includes('http')) {
        articulo.imagenAlternativa2.activo = true
    } else {
        articulo.imagenAlternativa2.activo = false
    }

    if (articulo.video.url && articulo.video.url.includes('http') && articulo.video.poster && articulo.video.poster.includes('http')) {
        articulo.video.activo = true
    } else {
        articulo.video.activo = false
    }

    if (articulo.boton.texto && articulo.boton.accion) {
        articulo.boton.activo = true
    } else {
        articulo.boton.activo = false
    }

    // Compatibilidad de formatos fecha hora
    articulo.inicio = `${articulo.inicio}T00:00:00`
    articulo.fin = `${articulo.fin}T00:00:00`

    axios
    .post(`${process.env.API_URL}dfs60022`,{
        frontUser: componente.$store.state.usuario,
        proyectoEnc: componente.$store.state.proyecto.idEnc,
        idEnc: componente.estado.paraEditar,
        frontBlog: articulo
    },{
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        crossDomain: true,
        withCredentials: true
    })
    .then(response => {
        componente.estado.editando = false
        componente.estado.paraEditar = false
        if (!response.data) {
            componente.error = 'No hay retorno de login'
        } else if (!response.data.ErrorSDT) {
            componente.error = 'No hay retorno del error'
        } else if (response.data.ErrorSDT.ErrorCode === 0) {

            componente.error = null

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
        componente.estado.editando = false
        componente.estado.paraEditar = false
        componente.error = error
    })
}
