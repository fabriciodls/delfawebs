/*
    🚦 Router
*/

import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
    mode: process.env.ROUTER_MODE ? 'history': null,
    routes
})

router.afterEach((to,) => {
    window.scrollTo(0,0)
    if (to.name) {
        document.querySelector('title').innerHTML = `${to.name} | delfa-webs`
    }
})

export default router
