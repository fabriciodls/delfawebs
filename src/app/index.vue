<template>
    <main>
        <header>
            <button v-if="ancho <= 900" aria-label="Menú" class="menu" @click="menu = true">
                <i aria-hidden="true" class="more_horiz"/>
            </button>
            <h1 v-show="ancho <= 900">{{titulo}}</h1>
            <div v-if="ancho > 900 || menu" class="cortina" @click="menu = false"></div>
            <nav v-if="ancho > 900 || menu">
                <router-link v-for="r in routes" :key="r.path" :to="r.path" draggable="false">{{r.name}}</router-link>
            </nav>
            <button v-if="usuario" class="usuario">
                <i aria-hidden="true" class="person"/>
                {{usuario}} | salir
            </button>
        </header>
        <login v-if="!usuario"/>
        <router-view v-else/>
        <footer v-if="cargado">
            <a href="http://delfasoft.com" target="_blank" rel="noopener noreferrer" draggable="false">
                delfasoft © 2019 versión {{version}}
            </a>
        </footer>
    </main>
</template>

<script>
import routes from '@/routes'

export default {
    name: 'app',

    components: {
        login: () => import ('./login')
    },

    data: () => ({
        menu: false,
        cargado: false,
        routes
    }),

    watch: {
        titulo () {
            this.menu = false
        }
    },

    computed: {
        ancho () {
            return this.$store.state.ancho            
        },

        titulo () {
            return this.$route.name
        },

        usuario () {
            return this.$store.state.usuario.nombre
        },

        version () {
            return process.env.VUE_APP_VERSION
        }
    },

    mounted () {
        setTimeout(() => {
            this.cargado = true
        }, 2000)
    }
}
</script>
