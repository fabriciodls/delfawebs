import axios from 'axios'

export default entrada => new Promise ((resolve, reject) => {
    componente.subiendoImg = true
    componente.imagen.archivo = componente.imagen.archivo.split(',')[1]
    axios
    .post(`${process.env.API_URL}dfs60004`, entrada,{
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        crossDomain: true,
        withCredentials: true
    })
    .then(response => {
        if (!response.data) {
            reject('No hay retorno de login')
        } else if (!response.data.ErrorSDT) {
            reject('No hay retorno del error')
        } else if (response.data.ErrorSDT.ErrorCode === 0) {

            resolve(response.data.url)

        } else {
            reject(response.data.ErrorSDT.ErrorDescription)
        }

    })
    .catch(error => {
        reject(error)
    })
})
