<template>
    <article>
        <h2>Escriba aquí los artículos</h2>

        <!-- Dinámica de la carga -->
        <barra v-if="cargando" />
        <span v-else-if="error" class="error">{{error}}</span>

        <!-- Botón de agregar -->
        <button v-if="!estado.paraAgregar && !cargando" class="agregar" @click="estado.paraAgregar = true" :disabled="estado.paraEditar ? 'disabled': null">
            <span>Agregar</span>
            <i aria-hidden="true" class="add"/>
        </button>

        <ul>
            <!-- Agregar -->
            <o-editando v-if="estado.paraAgregar"
                :estado="estado" @confirmar="agregar" @cancelar="cancelar()"/>

            <!-- Sin Artículos -->
            <li v-if="(!articulos || articulos.length === 0) && !cargando">
                <span class="nohay">(No hay articulos)</span>
            </li>

            <!-- Lista de artículos -->
            <component v-for="a in articulos" :key="a.idEnc" 
                :is="estado.paraEditar === a.idEnc && !estado.editando ? 'o-editando': 'o-articulo'" 
                :entrada="a" :estado="estado" 
                @editar="prepararEditar(a)" @borrar="borrar(a)"
                @confirmar="confirmarEdicion" @cancelar="cancelar()"/>
        </ul>
    </article>
</template>

<script>
import x_traer from './x_traer'
import x_agregar from './x_agregar'
import x_editar from './x_editar'
import x_borrar from './x_borrar'

export default {
    name: 'blog',

    components: {
        barra: () => import('@/assets/barra'),
        spinnerCircular: () => import('@/assets/spinnerCircular'),
        'o-editando': () => import('./o_editando'),
        'o-articulo': () => import('./o_articulo')
    },

    data: () => ({
        cargando: true,
        error: null,
        articulos: [],
        hayMas: false,
        ultimo: '',

        // Para editar o agregar
        estado: {
            paraAgregar: false,
            paraEditar: null,
            editando: false,
            borrando: null,
        }
    }),

    created () {
        x_traer (this)
    },

    methods: {
        cancelar () {
            this.estado.paraEditar = false
            this.estado.paraAgregar = false
        },

        agregar (a) {
            x_agregar (this, a)
        },

        prepararEditar (a) {
            // this.articulo = {
            //     idEnc: a.idEnc,
            //     activo: a.activo,
            //     pagina: a.pagina,
            //     titulo: a.titulo,
            //     inicio: a.inicio.split('/').reverse().join('-'),
            //     fin: a.fin.split('/').reverse().join('-'),
            //     imagen: a.imagen,
            //     video: a.video,
            //     boton: a.boton,
            //     parrafos: a.parrafos
            // }
            this.estado.paraEditar = a.idEnc
        },

        confirmarEdicion (a) {
            x_editar (this, a)
        },

        borrar (a) {
            this.estado.borrando = a.idEnc
            let confirmado = confirm(`¿Desea borrar ${a.titulo}?`)
            if (confirmado) {
                x_borrar (this, a.titulo)
            } else {
                this.estado.borrando = null
            }
        },
    }
}
</script>

<style scoped>
    /* article {
        max-width: 80vw;
    } */

    ul {
        padding: 0;
    }

    li {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        border-bottom: 2px solid #ccc;
        margin-bottom: .5em;
    }

    .nohay {
        max-width: 100%;
        width: 100%;
        padding: 1.5em;
        color: #555;
        text-align: center;
    }
</style>