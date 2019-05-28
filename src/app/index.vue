<template>
    <main>
        <header>
            <button v-if="ancho <= 900" aria-label="Menú" class="menu" @click="menu = true">
                <i aria-hidden="true" class="more_horiz"/>
            </button>
            <img v-if="proyecto && proyecto.logo" :src="proyecto.logo" alt="Logo del proyecto" class="logo" draggable="false">
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

        <!-- Cuerpo del sistema -->
        <login v-if="!usuario"/>
        <sin-proyecto v-else-if="(!proyecto || !proyecto.idEnc) && route !== '/'"/>
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
        login: () => import ('./login'),
        sinProyecto: () => import ('./sinProyecto')
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

        route () {
            return this.$route.path
        },

        titulo () {
            return this.$route.name
        },

        usuario () {
            return this.$store.state.usuario.nombre
        },

        proyecto () {
            return this.$store.state.proyecto
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
