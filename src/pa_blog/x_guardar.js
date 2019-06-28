import axios from 'axios'

export default (componente) => {
    componente.agregando = true

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

    if (componente.articulo.parrafoPervio) {
        componente.articulo.parrafos.push({
            idEnc: 'ultimo',
            texto: componente.articulo.parrafoPervio
        })
    }

    axios
    .post(`${process.env.API_URL}dfs60021`,{
        frontUser: componente.$store.state.usuario,
        proyectoEnc: componente.$store.state.proyecto.idEnc,
        frontBlog: componente.articulo
    },{
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        crossDomain: true,
        withCredentials: true
    })
    .then(response => {
        componente.agregando = false
        if (!response.data) {
            componente.error = 'No hay retorno de login'
        } else if (!response.data.ErrorSDT) {
            componente.error = 'No hay retorno del error'
        } else if (response.data.ErrorSDT.ErrorCode === 0) {

            componente.error = null
            componente.version = response.data.FrontDisForm.version
            componente.cargando = true
            componente.recargar
            
        } else {
            componente.error = response.data.ErrorSDT.ErrorDescription
        }

    })
    .catch(error => {
        componente.agregando = false
        componente.error = error
    })
}
