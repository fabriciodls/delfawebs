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

    .editando {
        flex-direction: column;
        align-items: flex-start;
    }

    .editando div {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    li > *,
    .editando div > * {
        margin: 0 .5em .5em 0;
    }

    .done {
        color: green;
    }

    .titulo {
        display: block;
        width: 150px;
        max-width: 150px;
        overflow-x: hidden;
    }

    .pagina {
        display: block;
        width: 55px;
        max-width: 55px;
        overflow-x: hidden;
    }

    img {
        width: 60px;
        height: 60px;
        border-radius: .5em;
        object-fit: cover;
    }

    .vacio {
        width: 60px;
        height: 60px;
        border-radius: .5em;
        background-color: #ccc;
    }

    input[type="file"] {
        background-position: center;
        background-size: cover;
        display: flex;
        width: 60px;
        height: 60px;
        border-radius: .5em;
        background-color: #ccc;
        border: none;
        cursor: pointer;
    }

    input::-webkit-file-upload-button {
        visibility: hidden;
    }

    .dividido {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .dividido span {
        text-align: center;
        max-width: 120px;
        width: 120px;
    }

    hr {
        margin: .3em 0;
    }

    li button {
        border: none;
        background-color: transparent;
    }

    li i {
        color: #444;
        transition: all .3s ease;
    }

    li button:hover i {
        color: var(--primary-color);
    }

    li button:disabled {
        cursor: default;
    }

    li button:disabled i {
        color: #aaa;
    }

    input,
    select,
    textarea {
        padding: .5em;
        border: 1px solid #aaa;
        font-size: 1em;
        width: 12em;
    }
    
    textarea {
        width: 100%;
        padding: .5em;
    }

    input:hover,
    input:focus,
    select:hover,
    select:focus,
    textarea:hover,
    textarea:focus {
        border: 1px solid var(--primary-color);
    }

    .botonera {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
    }

    .botonera * {
        width: auto;
    }

    .editar {
        display: flex;
        align-items: flex-end;
        background-color: transparent;
        border: none;
        font-size: 1em;
        color: #333;
        padding: .5em;
    }

    .editar i {
        margin-left: 5px;
        transition: all .3s ease;
    }

    .editar:hover i,
    .editar:focus i {
        color: var(--primary-color);
    }

    .editar:disabled i {
        color: #aaa;
    }
</style>