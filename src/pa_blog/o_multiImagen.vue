<template>
    <div>
        <button v-for="(url, index) in imagenes" :key="index" title="Borrar"
            :style="{backgroundImage: `url(${url})`}" @click="borrar(index)" aria-label="imagen subida">
            <i class="delete icono" aria-hidden="true"/>
        </button>
        <spinner-circular v-if="cargando"/>
        <input v-else type="file" accept="image/*" aria-label="Subir una de varias imágenes" cleanOrientation="true" title="Subir otra imagen"
            @change="cargar"/>
    </div>
</template>

<script>
import x_subir from './x_subir'
export default {
    name: 'OImagenes',

    components: {
        spinnerCircular: () => import('@/assets/spinnerCircular')
    },

    props: {
        entrada: {type: Array}
    },

    data: () => ({
        imagenes: [],
        cargando: false,
        error: null
    }),

    created () {
        this.entrada.forEach(en => {
            console.log(en)
            this.imagenes.push(en)
        })
    },

    methods: {
        async cargar (ev) {
            try {
                this.cargando = true
                const url = await x_subir({
                    frontUser: this.$store.state.usuario,
                    file: ev.target.files[0]
                })
                this.imagenes.push(url)
                this.$emit('cambia', this.imagenes)
            }
            catch (error) {
                this.error = error
            }
            this.cargando = false
        },

        borrar (index) {
            this.imagenes.splice(index, 1)
            this.$emit('cambia', this.imagenes)
        }
    }
}
</script>

<style scoped>
    div {
        display: flex;
    }

    button {
        width: 60px;
        height: 60px;
        border-radius: .5em;
        object-fit: cover;
        margin: .5em;
        background-size: cover;
        background-position: center;
        padding: 0;
        background-color: #eee;
        border: none;
        display: flex;
        justify-content: center;
    }

    button i {
        color: transparent;
        margin: auto;
        padding: .2em;
        border-radius: 50%;
    }

    button:hover i {
        color: var(--primary-color);
        background-color: #fff;
        box-shadow: 0 0 .5em .5em #ffffffcc;
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
</style>