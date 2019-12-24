/*
    Renderiza un archivo de imagen
*/
import axios from '@/axios'

export default ({file, frontUser}) => new Promise ((resolve, reject) => {
    const reader = new FileReader()

    reader.onloadend = () => {
        const imagen = {
            archivo: reader.result.split(',')[1],
            ext: file.name.split('.').reverse()[0],
            nombre: file.name
        } 
        axios
        .post(`${process.env.API_URL}dfs60004`, {
            frontUser, imagen,
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
    }

    if (file) {
        reader.readAsDataURL(file)
    } else {
        reject('file no funciona')
    }
})