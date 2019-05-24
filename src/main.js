/*
    🌞 Main App
*/

import Vue from 'vue'
Vue.config.productionTip = false

// Estilos
import '@/app/style.css'

// Router, Vuex, PWA
import router from './router'
import store from './store'
import './sw'

// 👆 Touch
// import VueTouch from 'vue-touch'
// Vue.use(VueTouch)

// ✨ iniciando aplicación
import App from '@/app'
// import App from '@/layout/ingresos'

// 👀 Registrar evento clic del usuario
// import actividad from '@/actividad'

new Vue({
    router,
    store,
    render: h => h(App),
    mounted () {
        // 👤 Usuario logueado
        // if (localStorage.getItem('dfsUsr')) {
        //     this.$store.commit('ingresar', JSON.parse(localStorage.getItem('dfsUsr')))
        // }

        // 📐 Redimención del sitio
		window.addEventListener('resize', () => {
			this.$store.commit('cambiarAcncho')
        }, true)

        // 📜 Scroll
		window.addEventListener('scroll', () => {
			this.$store.commit('cambiarScrollY')
        })

        // 🕗 Reloj
        // this.$store.commit('setearHora')
        // setInterval(() => {
        //     this.$store.commit('setearHora')
        // }, 3000)

        // let objeto = []
        // let texto = ''
        // actividad(this, objeto, texto)
        // document.querySelector('body').addEventListener('click', (e) => {
        //     if (e.path) {
        //         e.path.forEach(i => {
        //             if (i.tagName && i.tagName !== 'HTML' && i.tagName !== 'BODY') {
        //                 objeto.push(i.className ? `${i.tagName}.${i.className}`: i.tagName)
        //                 if (i.tagName === 'SPAN' || i.tagName === 'H2') {
        //                     texto = i.innerHTML
        //                 } else if (i.tagName === 'BUTTON') {
        //                     texto = i.textContent
        //                 }
        //             }
        //         })
        //     }
        //     objeto.reverse()
        //     actividad(this, objeto, texto)
        //     objeto = []
        // })

        // 📱 PWA
        window.addEventListener('beforeinstallprompt', e => {
            e.userChoice.then(choiceResult => {

                console.log(`resultado de usuario ${choiceResult.outcome}`);

                if(choiceResult.outcome === 'dismissed') {
                    console.log('El usuario canceló la instalación de la pantalla de inicio')
                }
                else {
                    console.log('Usuario agregó a la pantalla de inicio')
                }
            })
        })

        // // 📱🍎 Detects if device is on iOS
        // const isIos = () => {
        // const userAgent = window.navigator.userAgent.toLowerCase();
        //     return /iphone|ipad|ipod/.test( userAgent );
        // }

        // // Detects if device is in standalone mode
        // const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

        // // Checks if should display install popup notification:
        // if (isIos() && !isInStandaloneMode()) {
        //     // this.setState({ showInstallMessage: true });
        //     let iosPrompt = document.querySelector(".ios-prompt");
        //     iosPrompt.style.display = "block";
        //     iosPrompt.addEventListener("click", () => {
        //         iosPrompt.style.display = "none";
        //     });
        // }
	}
}).$mount('#app')
