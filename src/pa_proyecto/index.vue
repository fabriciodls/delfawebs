<template>
    <article>
        <h2>Lista de proyectos</h2>
        <barra v-if="cargando"/>
        <ul v-else>
            <li v-for="p in proyectos" :key="p">
                <img src="" alt="">
                <span>Nombre del proyecto</span>
                <button>Administrar</button>
            </li>
        </ul>
        <span v-if="error" class="error">{{error}}</span>
    </article>
</template>

<script>
import traerProyectos from './traerProyectos'

export default {
    name: 'proyecto',

    data: () => ({
        cargando: true,
        proyectos: [],
        error: null
    }),
    
    components: {
        barra: () => import ('@/assets/barra')
    },

    created () {
        traerProyectos (this)
    }
}
</script>

<style scoped>
    article {
        margin: 2em 10%;
        padding: 2em;
        box-shadow: 0 0 .5em 0 #33333355;
        border-radius: .5em;
    }

    h2 {
        font-weight: 100;
        color: #333;
    }
</style>

