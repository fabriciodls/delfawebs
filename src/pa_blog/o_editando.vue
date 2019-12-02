<template>
    <li class="editando">
        <div>
            <input v-model="articulo.titulo" type="text" aria-label="Titulo del artículo" title="Titulo del artículo" placeholder="Titulo del artículo">
            <select v-model="articulo.pagina">
                <option value="/">Home</option>
                <option value="/blog">Blog</option>
                <option value="/personas">Atletas</option>
                <option value="/puntajes">Marcas</option>
                <option value="/eventos">Eventos</option>
                <option value="/startups">StartUps</option>
                <option value="/asesoramiento">Asesoramiento</option>
            </select>
            <span>Orden: </span>
            <input v-model="articulo.orden" type="number" min="0" 
                style="width: 3em;" aria-label="Orden de prioridad" title="Orden de prioridad" placeholder="Orden de prioridad">
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
            <input v-model="articulo.imagen.url" type="url" aria-label="Url de la imágen" 
                title="Url de la imágen" placeholder="url de la imágen">

            <!-- Imagen alternativa -->
            <button v-if="!articulo.imagenAlternativa.activo" @click="articulo.imagenAlternativa.activo = true">
                <i class="add icono"/>
            </button>
            <input v-if="articulo.imagenAlternativa.activo && !subiendoImg" type="file" accept="image/*" aria-label="Logo del proyecto" cleanOrientation="true"
                @change="cargarImagenAlternativa" :style="{
                backgroundImage: articulo.imagenAlternativa.url
                    ? `url(${articulo.imagenAlternativa.url})` 
                    : null
            }"/>
            <input v-if="articulo.imagenAlternativa.activo" v-model="articulo.imagenAlternativa.url" type="url" aria-label="Url de la imágen" 
                title="Url de la imágen" placeholder="url de la imágen">

            <!-- Imagen alternativa 2 -->
            <button v-if="!articulo.imagenAlternativa2.activo" @click="articulo.imagenAlternativa2.activo = true">
                <i class="add icono"/>
            </button>
            <input v-if="articulo.imagenAlternativa2.activo && !subiendoImg" type="file" accept="image/*" aria-label="Logo del proyecto" cleanOrientation="true"
                @change="cargarImagenAlternativa2" :style="{
                backgroundImage: articulo.imagenAlternativa2.url
                    ? `url(${articulo.imagenAlternativa2.url})` 
                    : null
            }"/>
            <input v-if="articulo.imagenAlternativa2.activo" v-model="articulo.imagenAlternativa2.url" type="url" aria-label="Url de la imágen" 
                title="Url de la imágen" placeholder="url de la imágen">
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
            
            <!-- <ckeditor v-for="p in articulo.parrafos" :key="p.idEnc" v-model="p.texto" :editor="editor" :config="editorConfig"></ckeditor> -->
            <ckeditor v-model="parrafoPrevio" :editor="editor" :config="editorConfig"></ckeditor>
            
            <!-- <textarea v-for="p in articulo.parrafos" :key="p.idEnc" v-model="p.texto" rows="5" @keyup="borrarParrafo()"></textarea>
            <textarea v-model="parrafoPrevio" rows="5" @keypress.enter="agregarParrafo"></textarea> -->
        </div>

        <!-- Confirmando Edición -->
        <div class="botonera">
            <button @click="confirmar()" aria-label="Guardar">
                <span>Guardar</span>
                <i aria-hidden="true" class="done icono"/>
            </button>
            <button @click="cancelar()" aria-label="Cancelar">
                <span>Cancelar</span>
                <i aria-hidden="true" class="close icono"/>
            </button>
        </div>
    </li>
</template>

<script>
import x_subir from './x_subir'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
    name: 'o-editando',

    components: {
        spinnerCircular: () => import('@/assets/spinnerCircular')
    },

    props: {
        entrada: {
            type: Object,
            default: null
        }
    },

    data: () => ({
        // para subir imagen
        imagen: {
            archivo: null,
            ext: '',
            nombre: '',
            orientacion: 0
        },
        subiendoImg: false,
        imagenAlternativa: false,
        imagenAlternativa2: false,

        // Para editar o agregar
        ahora: null,
        articulo: {
            idEnc: null,
            orden: 0,
            activo: true,
            pagina: '/',
            titulo: '',
            inicio: null,
            fin: null,
            imagen: {
                activo: false,
                url: null
            },
            imagenAlternativa: {
                activo: false,
                url: null
            },
            imagenAlternativa2: {
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
        parrafoPrevio: null,
        editor: ClassicEditor,
        editorConfig: {
            // The configuration of the editor.
        }
    }),

    created () {
        if (this.entrada) {
            this.articulo = this.entrada
            this.parrafoPrevio = this.entrada.parrafos.map(parrafo => {
                return parrafo.texto
            }).join('')
        }
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
                x_subir (this, (url) => {
                    this.articulo.imagen.url = url
                })
            }

            if (file) {
                reader.readAsDataURL(file)
            }
        },

        cargarImagenAlternativa (ev) {
            const file = ev.target.files[0]
            const reader = new FileReader()

            reader.onloadend = () => {
                this.imagen.archivo = reader.result
                this.imagen.ext = file.name.split('.').reverse()[0]
                this.imagen.nombre = file.name
                x_subir (this, (url) => {
                    this.articulo.imagenAlternativa.url = url
                })
            }

            if (file) {
                reader.readAsDataURL(file)
            }
        },

        cargarImagenAlternativa2 (ev) {
            const file = ev.target.files[0]
            const reader = new FileReader()

            reader.onloadend = () => {
                this.imagen.archivo = reader.result
                this.imagen.ext = file.name.split('.').reverse()[0]
                this.imagen.nombre = file.name
                x_subir (this, (url) => {
                    this.articulo.imagenAlternativa2.url = url
                })
            }

            if (file) {
                reader.readAsDataURL(file)
            }
        },

        confirmar () {
            this.articulo.parrafos = []
            if (this.parrafoPrevio) {
                this.articulo.parrafos.push({
                    idEnc: 'ultimo',
                    texto: this.parrafoPrevio
                })
            }
            this.$emit('confirmar', this.articulo)
        },

        cancelar () {
            this.$emit('cancelar')
        }
    }
}
</script>

<style scoped>
    li {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
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

    div {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    li > *,
    div > * {
        margin: 0 .5em .5em 0;
    }

    .done {
        color: green;
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

    button {
        display: flex;
        align-items: flex-end;
        background-color: transparent;
        border: none;
        font-size: 1em;
        color: #333;
        padding: .5em;
    }

    i {
        color: #444;
        margin-left: 5px;
        transition: all .3s ease;
    }

    button:hover i,
    button:focus i {
        color: var(--primary-color);
    }

    button:disabled {
        cursor: default;
    }

    button:disabled i {
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
</style>