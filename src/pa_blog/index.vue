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
                :entrada="articulo" :estado="estado"
                @confirmar="agregar" @cancelar="cancelar()"/>

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
            <!-- <component :is="'o-articulo'" :entrada="articulos[0]"></component> -->
        </ul>
    </article>
</template>

<script>
import x_traer from './x_traer'
import x_subir from './x_subir'
import x_guardar from './x_guardar'
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

        // para subir imagen
        imagen: {
            archivo: null,
            ext: '',
            nombre: '',
            orientacion: 0
        },
        subiendoImg: false,

        // Para editar o agregar
        estado: {
            paraAgregar: false,
            paraEditar: null,
            editando: false,
            borrando: null,
        },

        articulo: {
            idEnc: null,
            activo: true,
            pagina: '/',
            titulo: '',
            inicio: null,
            fin: null,
            imagen: {
                activo: false,
                url: null
            },
            video: {
                activo: false,
                url: null,
                poster: null,
                tipo: 'video/mp4'
            },
            boton: {
                activo: false,
                texto: null,
                tipo: 1,
                accion: null
            },
            parrafos: []
        },
        parrafoPrevio: null
    }),

    created () {
        x_traer (this)
    },

    methods: {
        cargarImagen (ev) {
            const file = ev.target.files[0]
            const reader = new FileReader()

            reader.onloadend = () => {
                this.imagen.archivo = reader.result
                this.imagen.ext = file.name.split('.').reverse()[0]
                this.imagen.nombre = file.name
                x_subir (this)
            }

            if (file) {
                reader.readAsDataURL(file)
            }
        },

        agregarParrafo (e) {
            e.preventDefault()
            const ahora = new Date()
            this.articulo.parrafos.push({
                idEnc: `e${ahora.getHours()}${ahora.getMinutes()}${ahora.getSeconds()}${ahora.getMilliseconds()}`,
                texto: this.parrafoPrevio
            })
            this.parrafoPrevio = ''
        },

        borrarParrafo () {
            this.articulo.parrafos.forEach((p,i) => {
                if (!p.texto || p.texto.length === 0) {
                    this.articulo.parrafos.splice(i, 1)
                }
            })
        },

        cancelar () {
            this.estado.paraEditar = false
            this.estado.paraAgregar = false

            this.imagen = {
                archivo: null,
                ext: '',
                nombre: '',
                orientacion: 0
            }

            this.articulo = {
                idEnc: null,
                activo: true,
                pagina: '/',
                titulo: '',
                inicio: this.ahora,
                fin: '2030-01-01',
                imagen: {
                    activo: false,
                    url: null
                },
                video: {
                    activo: false,
                    url: null,
                    poster: null,
                    tipo: 'video/mp4'
                },
                boton: {
                    activo: false,
                    texto: null,
                    tipo: 1,
                    accion: null
                },
                parrafos: []
            }
            this.parrafoPrevio = null
        },

        agregar (a) {
            this.articulo = a
            x_guardar (this)
        },

        prepararEditar (a) {
            this.articulo = {
                idEnc: a.idEnc,
                activo: a.activo,
                pagina: a.pagina,
                titulo: a.titulo,
                inicio: a.inicio.split('/').reverse().join('-'),
                fin: a.fin.split('/').reverse().join('-'),
                imagen: a.imagen,
                video: a.video,
                boton: a.boton,
                parrafos: a.parrafos
            }
            this.estado.paraEditar = a.idEnc
        },

        confirmarEdicion (a) {
            this.articulo = a
            x_editar (this)
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