<template>
    <article>
        <h3>Blog</h3>

        <barra v-if="cargando" />

        <ul>
            <li v-for="a in articulos" :key="a.idEnc">
                <i :class="a.activo ? 'done': 'close'" aria-hidden="true"/>
                
                <span>{{a.titulo}}</span>
                <img v-if="a.imagen" :src="a.vista" :alt="`imagen en ${a.titulo}`" title="Imagen">
                <div v-else class="vacio" title="Imagen"></div>
                <img v-if="a.video" :src="a.poster" :alt="`video en ${a.titulo}`" title="Video">
                <div v-else class="vacio" title="Video"></div>
                <div class="dividido">
                    <span title="desde">{{a.inicio}}</span>
                    <hr>
                    <span title="hasta">{{a.fin}}</span>
                </div>
                <div class="dividido">
                    <span>{{a.tipo === 1 ? 'link interno': 'link externo'}}</span>
                    <hr>
                    <span>{{a.texto}}</span>
                </div>
                <button aria-label="Editar" @click="paraEditar = a.idEnc">
                    <i class="edit" aria-hidden="true"/>
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
export default {
    name: 'blog',

    components: {
        barra: () => import('@/assets/barra')
    },

    data: () => ({
        cargando: false,
        paraAgregar: false,
        paraEditar: null,
        error: null,
        articulos: [
            {
                idEnc: '1',
                activo: true,
                pagina: '/',
                titulo: 'Análisis test 23',
                inicio: '26/8/92 12:00',
                fin: '5/5/30 12:00',
                imagen: false,
                vista: 'https://pbs.twimg.com/media/D510Oj4WkAASIGE.jpg',
                video: true,
                poster: 'https://pbs.twimg.com/media/D510Oj4WkAASIGE.jpg',
                boton: true,
                tipo: 1,
                texto: 'Ver más'
            }
        ],
    })
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

    li > * {
        margin: 0 .5em .5em 0;
    }

    .done {
        color: green;
    }

    li span {
        display: block;
        width: 150px;
        max-width: 150px;
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
</style>