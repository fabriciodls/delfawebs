import axios from 'axios'

export default (componente) => {
    axios
    .post(`${process.env.API_URL}dfs60010`,{
        proyectoEnc: componente.$store.state.proyecto.idEnc
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

            componente.version = response.data.FrontDisForm.version
            if (response.data.FrontDisForm && response.data.FrontDisForm.campos) {
                componente.campos = response.data.FrontDisForm.campos
            }
            
        } else {
            componente.error = response.data.ErrorSDT.ErrorDescription
        }

    })
    .catch(error => {
        componente.cargando = false
        componente.error = error
    })
}
