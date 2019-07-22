<template>
    <article>
        <h2>Escriba aquí los artículos</h2>

        <!-- Dinámica de la carga -->
        <barra v-if="cargando" />
        <span v-else-if="error" class="error">{{error}}</span>

        <!-- Botón de agregar -->
        <button v-if="!paraAgregar && !cargando" class="agregar" @click="paraAgregar = true" :disabled="paraEditar ? 'disabled': null">
            <span>Agregar</span>
            <i aria-hidden="true" class="add"/>
        </button>

        <ul>
            <!-- Agregar -->
            <li v-if="paraAgregar" class="editando">
                <div>
                    <input v-model="articulo.titulo" type="text" aria-label="Titulo del artículo" title="Titulo del artículo" placeholder="Titulo del artículo">
                    <select v-model="articulo.pagina">
                        <option value="/">Home</option>
                        <option value="/blog">Blog</option>
                    </select>
                </div>
                <div>
                    <input v-model="articulo.inicio" type="date" :min="ahora" :max="articulo.fin || '2030-01-01'" aria-label="inicio" title="inicio" placeholder="inicio">
                    <input v-model="articulo.fin" type="date" :min="articulo.inicio || ahora" max="2030-01-01" aria-label="Fin" title="Fin" placeholder="Fin">
                </div>

                <div>
                    <spinner-circular v-if="subiendoImg"/>
                    <input v-else type="file" accept="image/*" aria-label="Logo del proyecto" cleanOrientation="true"
                        @change="cargarImagen" :style="{
                        backgroundImage: articulo.imagen.url
                            ? `url(${articulo.imagen.url})` 
                            : null
                    }"/>
                    <input v-model="articulo.imagen.url" type="url" aria-label="Url de la imágen" title="Url de la imágen" placeholder="url de la imágen">
                </div>
                <div>
                    <img v-if="articulo.video.poster" :src="articulo.video.poster" alt="Video para el nuevo Artículo">
                    <div v-else class="vacio" title="Imagen"></div>
                    <input v-model="articulo.video.url" type="url" aria-label="Url del video" title="Url del video" placeholder="url del video">
                    <input v-model="articulo.video.poster" type="url" aria-label="Url del poster del video" title="Url del poster del video" placeholder="url del poster">
                </div>
                <div>
                    <input v-model="articulo.boton.texto" type="text" aria-label="Texto del botón" title="Texto del botón" placeholder="Texto del botón">
                    <select v-model.number="articulo.boton.tipo" aria-lavel="Tipo de acción" title="Tipo de acción">
                        <option :value="1">Link interno</option>
                        <option :value="2">Link externo</option>
                    </select>
                    <input v-model="articulo.boton.accion" type="text" aria-label="Link del botón" title="Link del botón" placeholder="Link del botón">
                    <textarea v-for="p in articulo.parrafos" :key="p.idEnc" v-model="p.texto" rows="5" @keyup="borrarParrafo()"></textarea>
                    <textarea v-model="parrafoPrevio" rows="5" @keypress.enter="agregarParrafo"></textarea>
                </div>
                <div class="botonera">
                    <button v-if="paraAgregar || paraEditar" class="editar" @click="guardar()" aria-label="Guardar">
                        <span>Guardar</span>
                        <i aria-hidden="true" class="done"/>
                    </button>
                    <button v-if="paraAgregar || paraEditar" class="editar" @click="cancelar()" aria-label="Cancelar">
                        <span>Cancelar</span>
                        <i aria-hidden="true" class="close"/>
                    </button>
                </div>
            </li>

            <!-- Sin Artículos -->
            <li v-if="(!articulos || articulos.length === 0) && !cargando">
                <span class="nohay">(No hay articulos)</span>
            </li>

            <!-- Lista de artículos -->
            <li v-for="a in articulos" :key="a.idEnc" :class="paraEditar === a.idEnc && !editando ? 'editando': null">
                <i v-if="paraEditar !== a.idEnc || editando" :class="a.activo ? 'done': 'close'" aria-hidden="true"/>
                
                <div v-if="paraEditar === a.idEnc && !editando">
                    <input v-model="articulo.titulo" type="text" aria-label="Titulo del artículo" title="Titulo del artículo" placeholder="Titulo del artículo">
                    <select v-model="articulo.pagina">
                        <option value="/">Home</option>
                        <option value="/blog">Blog</option>
                    </select>
                </div>
                <span v-else class="titulo">{{a.titulo}}</span>
                <span v-if="paraEditar !== a.idEnc || editando" class="pagina">{{a.pagina}}</span>

                <div v-if="paraEditar === a.idEnc && !editando">
                    <input v-model="articulo.inicio" type="date" :min="ahora" :max="articulo.fin || '2030-01-01'" aria-label="inicio" title="inicio" placeholder="inicio">
                    <input v-model="articulo.fin" type="date" :min="articulo.inicio || ahora" max="2030-01-01" aria-label="Fin" title="Fin" placeholder="Fin">
                </div>
                <div v-else class="dividido">
                    <span title="Desde">{{a.inicio}}</span>
                    <hr>
                    <span title="Hasta">{{a.fin}}</span>
                </div>

                <div v-if="paraEditar === a.idEnc && !editando">
                    <spinner-circular v-if="subiendoImg"/>
                    <input v-else type="file" accept="image/*" aria-label="Logo del proyecto" cleanOrientation="true"
                        @change="cargarImagen" :style="{
                        backgroundImage: articulo.imagen.url
                            ? `url(${articulo.imagen.url})` 
                            : null
                    }"/>
                    <input v-model="articulo.imagen.url" type="url" aria-label="Url de la imágen" title="Url de la imágen" placeholder="url de la imágen">
                </div>
                <img v-else-if="a.imagen.url" :src="a.imagen.url" :alt="`imagen en ${a.titulo}`" title="Imagen">
                <div v-else class="vacio" title="Imagen"></div>

                <div v-if="paraEditar === a.idEnc && !editando">
                    <img v-if="articulo.video.poster" :src="articulo.video.poster" alt="Video para el nuevo Artículo">
                    <div v-else class="vacio" title="Imagen"></div>
                    <input v-model="articulo.video.url" type="url" aria-label="Url del video" title="Url del video" placeholder="url del video">
                    <input v-model="articulo.video.poster" type="url" aria-label="Url del poster del video" title="Url del poster del video" placeholder="url del poster">
                </div>
                <img v-else-if="a.video.poster" :src="a.video.poster" :alt="`video en ${a.titulo}`" title="Video">
                <div v-else class="vacio" title="Video"></div>

                <div v-if="paraEditar === a.idEnc && !editando">
                    <input v-model="articulo.boton.texto" type="text" aria-label="Texto del botón" title="Texto del botón" placeholder="Texto del botón">
                    <select v-model.number="articulo.boton.tipo" aria-lavel="Tipo de acción" title="Tipo de acción">
                        <option :value="1">Link interno</option>
                        <option :value="2">Link externo</option>
                    </select>
                    <input v-model="articulo.boton.accion" type="text" aria-label="Link del botón" title="Link del botón" placeholder="Link del botón">
                    <textarea v-for="p in articulo.parrafos" :key="p.idEnc" v-model="p.texto" rows="5" @keyup="borrarParrafo()"></textarea>
                    <textarea v-model="parrafoPrevio" rows="5" @keypress.enter="agregarParrafo"></textarea>
                </div>
                <div v-else class="dividido">
                    <span>{{ a.boton.tipo === 1 ? 'link interno'
                            :a.boton.tipo === 2 ? 'link externo'
                            : 'Sin botón'}}</span>
                    <hr>
                    <span>{{a.boton.texto}}</span>
                </div>

                <barra v-if="borrando === a.idEnc || editando === a.idEnc" style="width: 80px;"/>

                <!-- Confirmando Edición -->
                <div v-if="paraEditar === a.idEnc && !editando" class="botonera">
                    <button class="editar" @click="editar ()" aria-label="Guardar">
                        <span>Guardar</span>
                        <i aria-hidden="true" class="done"/>
                    </button>
                    <button class="editar" @click="cancelar()" aria-label="Cancelar">
                        <span>Cancelar</span>
                        <i aria-hidden="true" class="close"/>
                    </button>
                </div>
                <button v-else-if="!editando && !borrando" style="margin-left:auto;" aria-label="Editar" 
                    @click="prepararEditar(a)" :disabled="paraAgregar || paraEditar ? 'disabled': null">
                    <i class="edit" aria-hidden="true"/>
                </button>
                <button v-if="!editando && !borrando && paraEditar !== a.idEnc" aria-label="Borrar" 
                    @click="borrar(a.idEnc, a.titulo)" :disabled="paraAgregar || paraEditar ? 'disabled': null">
                    <i class="delete" aria-hidden="true"/>
                </button>
            </li>
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
        spinnerCircular: () => import('@/assets/spinnerCircular')
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
        paraAgregar: false,
        paraEditar: null,
        editando: false,
        borrando: null,
        ahora: null,
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
        const ahora = new Date()
        this.ahora = `${ahora.getFullYear()}-${
            ahora.getMonth() >= 9 ? '': '0'
        }${ahora.getMonth() + 1}-${
            ahora.getDate() >= 10 ? '': '0'
        }${ahora.getDate()}`
        this.articulo.inicio = this.ahora
        this.articulo.fin = '2030-01-01'
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
            this.paraEditar = false
            this.paraAgregar = false

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

        guardar () {
            x_guardar (this)
        },

        prepararEditar (a) {
            this.paraEditar = a.idEnc
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
        },

        editar () {
            x_editar (this)
        },

        borrar (idEnc, nombre) {
            this.borrando = idEnc
            let confirmado = confirm(`¿Desea borrar ${nombre}?`)
            if (confirmado) {
                x_borrar (this, nombre)
            } else {
                this.borrando = null
            }
        },
    }
}
</script>

<style scoped>
    article {
        max-width: 80vw;
    }

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