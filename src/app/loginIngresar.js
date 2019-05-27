import axios from 'axios'

export default (componente) => {
    axios
    .post(`${process.env.API_URL}dfs50001`,{
        email: componente.email,
        pass: componente.pass
    },{
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        crossDomain: true,
        withCredentials: true
    })
    .then(response => {
        if (!response.data) {
            componente.error = 'No hay retorno de login'
        } else if (!response.data.ErrorSDT) {
            componente.error = 'No hay retorno del ErrorSDT'
        } else if (response.data.ErrorSDT.ErrorCode === 0) {
            componente.$store.commit('ingresar', response.data.frontUser)
            componente.$emit('cerrar')
        } else {
            componente.error = response.data.ErrorSDT.ErrorDescription
        }
    })
    .catch(error => console.log(error))
}