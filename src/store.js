/*
    📦 Store
*/

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        ancho: window.innerWidth,
        scrollY: window.scrollY,
        // ahora: null,
        usuario: {
            ok: false,
            nombre: null,
            idEnc: null,
            key: null,
        },
        proyecto: {
            idEnc: null,
            nombre: null,
            logo: null,
        }
    },
    
    mutations: {
        cambiarAcncho (state) {
            state.ancho = window.innerWidth
        },

        cambiarScrollY (state) {
            state.scrollY = window.scrollY
        },

        ingresar (state, usuario) {
            state.usuario = usuario
            localStorage.setItem('dfsUsr', JSON.stringify(usuario))
        },

        seleccionarProyecto (state, proyecto) {
            state.proyecto = proyecto
            localStorage.setItem('dfsPrj', JSON.stringify(proyecto))
        }

        // setearHora (state) {
        //     let d = new Date()
        //     let c = d.getMinutes()
        //     c += d.getHours() * 100
        //     c += d.getDate() * 10000
        //     c += (d.getMonth() + 1) * 1000000
        //     c += d.getFullYear() * 100000000
        //     state.ahora = c
        // }
    },
    actions: {

    }
})
