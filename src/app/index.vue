<template>
    <main>
        <header>
            <button v-if="ancho <= 900" aria-label="Menú" class="menu" @click="menu = true">
                <i aria-hidden="true" class="icono"/>
            </button>
            <img v-if="proyecto && proyecto.logo" :src="proyecto.logo" alt="Logo del proyecto" class="logo" draggable="false">
            <h1 v-show="ancho <= 900">{{titulo}}</h1>
            <div v-if="ancho > 900 || menu" class="cortina" @click="menu = false"></div>
            <nav v-if="ancho > 900 || menu">
                <router-link v-for="r in routes" :key="r.path" v-show="!r.admin || usuario.admin" :to="r.path" draggable="false">{{r.name}}</router-link>
            </nav>
            <button v-if="usuario.nombre" class="usuario" @click="salir()">
                <i aria-hidden="true" class="person icono"/>
                {{usuario.nombre}} | salir
            </button>
        </header>

        <!-- Cuerpo del sistema -->
        <login v-if="!usuario.ok" class="contenido"/>
        <sin-proyecto v-else-if="(!proyecto || !proyecto.idEnc) && route !== '/'" class="contenido"/>
        <router-view class="contenido" v-else/>

        <!-- Pié de página -->
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
            return this.$store.state.usuario
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
    },

    methods: {
        salir () {
            this.$store.commit('ingresar', {
                ok: false,
                nombre: null,
                idEnc: null,
                key: null,
                admin: false
            })
            this.$store.commit('seleccionarProyecto', {
                idEnc: null, 
                nobre: null,
                logo: null
            })
        }
    }
}
</script>
