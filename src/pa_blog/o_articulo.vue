<template>
    <li>
        <i :class="entrada.activo ? 'done icono': 'close icono'" aria-hidden="true"/>
        <span class="titulo">{{entrada.titulo}}</span>
        <span class="pagina">{{entrada.pagina}}</span>

        <div class="dividido">
            <span title="Desde">{{entrada.inicio}}</span>
            <hr>
            <span title="Hasta">{{entrada.fin}}</span>
        </div>

        <img v-if="entrada.imagen.url" :src="entrada.imagen.url" :alt="`imagen en ${entrada.titulo}`" title="Imagen">
        <div v-else class="vacio" title="Imagen"></div>

        <img v-if="entrada.video.poster" :src="entrada.video.poster" :alt="`video en ${entrada.titulo}`" title="Video">
        <div v-else class="vacio" title="Video"></div>

        <div class="dividido">
            <span>{{ entrada.boton.tipo === 1 ? 'link interno'
                    :entrada.boton.tipo === 2 ? 'link externo'
                    : 'Sin botón'}}</span>
            <hr>
            <span>{{entrada.boton.texto}}</span>
        </div>

        <barra v-if="estado.borrando === entrada.idEnc || estado.editando === entrada.idEnc" style="width: 80px;"/>

        <div v-if="!estado.editando && !estado.borrando" style="margin-left:auto;">
            <button aria-label="Editar" 
                @click="editar()" :disabled="estado.paraAgregar || estado.paraEditar ? 'disabled': null">
                <i class="edit icono" aria-hidden="true"/>
            </button>
            <button aria-label="Borrar"
                @click="borrar()" :disabled="estado.paraAgregar || estado.paraEditar ? 'disabled': null">
                <i class="delete icono" aria-hidden="true"/>
            </button>
        </div>
    </li>
</template>

<script>
export default {
    name: 'o-articulo',

    components: {
        barra: () => import ('@/assets/barra')
    },
    
    props: {
        entrada: {
            type: Object,
            default: null
        },

        estado: {
            type: Object,
            default: () => ({})
        }
    },

    methods: {
        editar () {
            this.$emit('editar')
        },

        borrar () {
            this.$emit('borrar')
        }
    }
}
</script>

<style scoped>
    li {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        border-bottom: 2px solid #ccc;
        margin-bottom: .5em;
    }

    li > *{
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

    button {
        border: none;
        background-color: transparent;
    }

    i {
        color: #444;
        transition: all .3s ease;
    }

    button:hover i {
        color: var(--primary-color);
    }

    button:disabled {
        cursor: default;
    }

    button:disabled i {
        color: #aaa;
    }
</style>