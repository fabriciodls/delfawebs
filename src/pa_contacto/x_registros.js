import axios from 'axios'

export default (componente) => {
    axios
    .post(`${process.env.API_URL}dfs60013`,{
        frontUser: componente.$store.state.usuario,
        proyectoEnc: componente.$store.state.proyecto.idEnc,
        filtrar: componente.hayMas,
        desdeVersionEnc: componente.ultimaVersionEnc,
        desdeRegistroEnc: componente.ultimoRegistroEnc
    },{
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        crossDomain: true,
        withCredentials: true
    })
    .then(response => {
        componente.cargandoRegistros = false
        if (!response.data) {
            componente.errorRegistros = 'No hay retorno de login'
        } else if (!response.data.ErrorSDT) {
            componente.errorRegistros = 'No hay retorno del error'
        } else if (response.data.ErrorSDT.ErrorCode === 0) {

            // Formateo fecha hora
            response.data.frontRegistrosContacto.forEach(rg => {
                rg.registros.forEach(ritem => {
                    let fecha = ritem.fechaHora.split('T')[0].split('-').reverse().join('/')
                    let hora = ritem.fechaHora.split('T')[1]
                    ritem.fechaHora = `${fecha} ${hora}`
                })
            })

            // grabo las tablas correspondientes
            if (!componente.hayMas) {
                componente.versiones = response.data.frontRegistrosContacto
            } else {

                // Recorro la última tabla por si hay que completar
                componente.versiones.forEach(ver => {
                    if (ver.idEnc === componente.ultimaVersionEnc) {
                        // Agrego los registros pendientes
                        response.data.frontRegistrosContacto.forEach(fr => {
                            if (ver.idEnc === fr.idEnc) {
                                ver.registros = ver.registros.concat(fr.registros)
                            }
                        })
                        // Quito este de la respuesta
                        response.data.frontRegistrosContacto.splice(0, 1)
                    }
                })

                // Agrego otras tablas si existen
                if (response.data.frontRegistrosContacto.length > 0) {
                    componente.versiones = componente.versiones.concat(response.data.frontRegistrosContacto)
                }
            }

            // Actualizo las condiciones
            componente.hayMas = response.data.hayMas
            componente.ultimaVersionEnc = response.data.ultimaVersionEnc
            componente.ultimoRegistroEnc = response.data.ultimoRegistroEnc
            
        } else {
            componente.errorRegistros = response.data.ErrorSDT.ErrorDescription
        }

    })
    .catch(error => {
        componente.cargandoRegistros = false
        componente.errorRegistros = error
    })
}