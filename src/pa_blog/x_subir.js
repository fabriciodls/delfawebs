import axios from 'axios'

export default (componente) => {
    componente.subiendoImg = true
    componente.imagen.archivo = componente.imagen.archivo.split(',')[1]
    axios
    .post(`${process.env.API_URL}dfs60004`,{
        frontUser: componente.$store.state.usuario,
        imagen: componente.imagen,
    },{
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        crossDomain: true,
        withCredentials: true
    })
    .then(response => {
        componente.subiendoImg = false
        if (!response.data) {
            componente.error = 'No hay retorno de login'
        } else if (!response.data.ErrorSDT) {
            componente.error = 'No hay retorno del error'
        } else if (response.data.ErrorSDT.ErrorCode === 0) {

            componente.articulo.imagen.url = response.data.url
            componente.error = null

        } else {
            componente.error = response.data.ErrorSDT.ErrorDescription
        }

    })
    .catch(error => {
        componente.subiendoImg = false
        componente.error = error
    })
}
