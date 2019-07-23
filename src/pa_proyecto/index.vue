<template>
    <article>
        <h2>Lista de proyectos</h2>
        <barra v-if="cargando"/>
        <span v-else-if="error" class="error">{{error}}</span>
        <ul v-else>
            <li v-if="!proyectos || proyectos.length === 0">
                <span class="nohay">(No hay proyectos)</span>
            </li>
            <li v-for="p in proyectos" :key="p.proyectoEnc" :class="p.proyectoEnc === proyectoSeleccionado ? 'sel': null">
                <barra v-if="editando === p.proyectoEnc || borrando === p.proyectoEnc"/>

                <!-- Imagen -->
                <input v-else-if="p.proyectoEnc === paraEditar" type="file" accept="image/*" aria-label="Logo del proyecto" cleanOrientation="true"
                    @change="cargar" :style="{
                    backgroundImage: logo 
                        ? `url(${logo})` 
                        : null
                    }" @keyup.enter="editar(p.proyectoEnc)"/>
                <img v-else :src="p.imagen" :alt="`Logo de ${p.nombre}`" draggable="false">

                <!-- Nombre -->
                <input v-if="p.proyectoEnc === paraEditar && editando !== p.proyectoEnc" type="text" 
                    v-model="nombre" @keyup.enter="editar(p.proyectoEnc)">
                <span v-else-if="editando !== p.proyectoEnc && borrando !== p.proyectoEnc">{{p.nombre}}</span>

                <!-- Aceptar Edición -->
                <button v-if="p.proyectoEnc === paraEditar  && editando !== p.proyectoEnc" aria-label="Aceptar cambios"
                    @click="editar(p.proyectoEnc)">
                    <i aria-hidden="true" class="done"/>
                </button>

                <!-- Editar -->
                <button v-else-if="borrando !== p.proyectoEnc" aria-label="Editar"
                    @click="paraEditar = p.proyectoEnc; nombre = p.nombre; logo = p.imagen">
                    <i aria-hidden="true" class="edit"/>
                </button>

                <!-- Cancelar Edición -->
                <button v-if="p.proyectoEnc === paraEditar" aria-label="Rechazar los cambios"
                    @click="paraEditar = null; nombre = null; logo = null">
                    <i aria-hidden="true" class="close"/>
                </button>

                <!-- Borrar -->
                <button v-else-if="borrando !== p.proyectoEnc" aria-label="Editar"
                    @click="borrar(p.proyectoEnc, p.nombre)">
                    <i aria-hidden="true" class="delete"/>
                </button>

                <!-- Seleccionar -->
                <button v-if="p.proyectoEnc !== paraEditar && borrando !== p.proyectoEnc" aria-label="Seleccionar el proyecto" 
                @click="selecciona(p)">
                    <i aria-hidden="true" class="play_arrow"/>
                </button>
            </li>
            <li v-if="paraAgregar">
                <barra v-if="agregando"/>
                <input v-else type="file" accept="image/*" aria-label="Logo del proyecto" cleanOrientation="true"
                    @change="cargar" :style="{
                    backgroundImage: logo 
                        ? `url(${logo})` 
                        : null
                }"/>
                <input v-if="!agregando" type="text" v-model="nombre">

                <button v-if="!agregando" aria-label="Aceptar cambios"
                    @click="agregar()">
                    <i aria-hidden="true" class="done"/>
                </button>

                <button v-if="!agregando" aria-label="Rechazar los cambios"
                    @click="paraAgregar = false; nombre = null; logo = null">
                    <i aria-hidden="true" class="close"/>
                </button>
            </li>
        </ul>
        <button v-if="!paraAgregar && !paraEditar && !cargando" class="agregar" @click="paraAgregar = true">
            <span>Agregar</span>
            <i aria-hidden="true" class="add"/>
        </button>
    </article>
</template>

<script>
import x_traer from './x_traer'
import x_editar from './x_editar'
import x_agregar from './x_agregar'
import x_borrar from './x_borrar'

export default {
    name: 'proyecto',

    data: () => ({
        cargando: true,
        proyectos: [],
        error: null,
        paraAgregar: false,
        agregando: false,
        paraEditar: null,
        editando: null,
        borrando: null,
        nombre: null,
        logo: null
    }),
    
    components: {
        barra: () => import ('@/assets/barra')
    },

    computed: {
        proyectoSeleccionado () {
            return this.$store.state.proyecto.idEnc
        }
    },

    created () {
        if (this.$store.state.usuario.admin) {
            x_traer (this)
        } else {
            this.$router.push('/blog')
        }
    },

    methods: {
        selecciona (p) {
            this.$store.commit('seleccionarProyecto', {
                idEnc: p.proyectoEnc, 
                nobre: p.nombre,
                logo: p.imagen
            })
        },

        editar (idEnc) {
            this.editando = idEnc
            x_editar (this)
        },

        borrar (idEnc, nombre) {
            let confirmado = confirm(`¿Desea borrar ${nombre}?`)
            if (confirmado) {
                this.borrando = idEnc
                x_borrar (this, nombre)
            }
        },

        agregar () {
            x_agregar (this)
        },

        cargar (ev) {
            const file = ev.target.files[0]
            const reader = new FileReader()

            reader.onloadend = () => {
                this.logo = reader.result
            }

            if (file) {
                reader.readAsDataURL(file)
            }
        },
    }
}
</script>

<style scoped>
    article {
        width: 700px;
    }

    ul {
        padding: 0;
        margin: 2em 0;
    }

    li {
        display: flex;
        align-items: center;
        padding: .5em 1em;
        transition: all .3s ease;
    }

    li span {
        padding: 1em;
        margin-right: auto;
        color: #333;
        font-size: 1.2em;
    }

    li input[type=text] {
        margin: 0 auto 0 1em;
        padding: .5em;
        font-size: 1em;
    }

    li:nth-child(2n - 1) {
        background-color: #f9f9f9;
    }

    li button {
        border: none;
        padding: .5em;
        background-color: transparent;
    }

    li i {
        font-size: 30px;
        color: #444;
        transition: all .3s ease;
    }

    li button:hover i {
        color: var(--primary-color);
    }

    .sel {
        box-shadow: 0 0 0 2px var(--primary-color) inset;
    }

    .accion {
        margin-right: auto;
    }

    input[type="file"] {
        width: 60px;
        height: 60px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        cursor: pointer;
        border: 1px solid #aaa;
    }

    input::-webkit-file-upload-button {
        visibility: hidden;
    }
</style>

