<template>
    <article>
        <h2>Formulario de contacto</h2>
        <span>Versión {{version}}</span>
        <hr>
        <div v-for="(c, index) in campos" :key="index" class="campo">
            <input type="text" v-model="c.titulo" :disabled="editando && !cargandoFormulario ? null: 'disabled'" placeholder="Título" aria-label="Título del campo">
            <select v-model="c.tipo" :disabled="editando && !cargandoFormulario ? null: 'disabled'" title="Tipo" aria-label="Tipo de campo">
                <option value="t">Texto</option>
                <option value="e">Email</option>
                <option value="p">Teléfono</option>
                <option value="n">Número</option>
                <option value="f">Fecha</option>
                <option value="h">Hora</option>
            </select>
            <button v-if="editando && !cargandoFormulario" class="borrar" @click="borrar(index)" title="Borrar" aria-label="Borrar">
                <i aria-hidden="true" class="delete"/>
            </button>
        </div>
        <barra v-if="cargandoFormulario"/>
        <span v-else-if="error" class="error">{{error}}</span>
        <div v-else class="botonera">
            <button v-if="editando" class="agregar" @click="agregar()" aria-label="Agregar">
                <i aria-hidden="true" class="add"/>
                <span>Agregar</span>
            </button>
            <button v-else class="editar" @click="editando = true" aria-label="Editar">
                <span>Editar</span>
                <i aria-hidden="true" class="edit"/>
            </button>
            <button v-if="editando" class="editar" @click="guardar()" aria-label="Guardar">
                <span>Guardar</span>
                <i aria-hidden="true" class="done"/>
            </button>
            <button v-if="editando" class="editar" @click="cancelar()" aria-label="Cancelar">
                <span>Cancelar</span>
                <i aria-hidden="true" class="close"/>
            </button>
        </div>
        <hr v-if="!cargandoFormulario">
        <h2 v-if="!cargandoFormulario">Registro</h2>
        <table v-for="v in versiones" :key="v.idEnc">
            <tr>
                <th :colspan="2 + v.columnas.length">
                    <span>versión {{v.version}}</span>
                </th>
            </tr>
            <tr>
                <th>Fecha</th> <th>Hora</th>
                <th v-for="(c, ic) in v.columnas" :key="`${v.idEnc}c${ic}`">{{c}}</th>
            </tr>
            <tr v-for="(r, ir) in v.registros" :key="`${v.idEnc}r${ir}`">
                <td>{{r.fecha}}</td> <td>{{r.hora}}</td>
                <td v-for="(d, id) in r.datos" :key="`${v.idEnc}r${ir}cd${id}`">{{d}}</td>
            </tr>
        </table>
        <barra v-if="cargandoRegistros"/>
        <span v-else-if="errorRegistros" class="error">{{errorRegistros}}</span>
        <button v-if="hayMas" class="accion">Ver más</button>
    </article>
</template>

<script>
import x_traer from './x_traer'
import x_guardar from './x_guardar'
import x_registros from './x_registros'

export default {
    name: 'contacto',

    components: {
        barra: () => import ('@/assets/barra')
    },

    data: () => ({
        cargandoFormulario: true,
        campos: [],
        version: 0,
        error: null,
        editando: false,
        cargandoRegistros: true,
        versiones: [],
        hayMas: false,
        ultimaVersionEnc: null,
        ultimoRegistroEnc: null,
        errorRegistros: null
    }),

    created () {
        x_traer (this)
        x_registros (this)
    },

    methods: {
        agregar () {
            let d = new Date()
            this.campos = this.campos.concat({
                idEnc: `nuevo_${d}`,
                titulo: null,
                tipo: 't'
            })
        },

        borrar (index) {
            this.campos.splice(index, 1);
        },

        guardar () {
            this.editando = false
            x_guardar (this)
        },

        cancelar () {
            this.cargandoFormulario = true
            this.editando = false
            x_traer (this)
        },

        traerRegistros () {
            x_registros (this)
        }
    }
}
</script>

<style scoped>
    article {
        width: 700px;
    }

    div {
        display: flex;
        flex-wrap: wrap;
        margin: .5em 0;
        animation: bajar .3s ease;
    }

    @keyframes bajar {
        from {
            transform: translateY(-1em);
            opacity: 0;
        }
    }

    input,
    select {
        padding: .5em;
        width: 20em;
        font-size: 1em;
        max-width: 50vw;
        transition: all .3s ease;
    }

    input {
        border: none;
        background-color: transparent;
        width: 100%;
    }

    input:hover,
    input:focus {
        color: var(--primary-color);
    }

    select {
        border-bottom: 1px solid #aaa;
    }

    select:hover,
    select:focus {
        border-bottom: 1px solid var(--primary-color);
    }

    input:disabled,
    input:disabled:hover,
    input:disabled:focus {
        background-color: transparent;
        color: #333;
    }

    select:disabled,
    select:disabled:hover,
    select:disabled:focus {
        border-top: 1px solid transparent;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
        background-color: transparent;
        color: #333;
        border-bottom: 1px solid #aaa;  
        box-shadow: -15px 0 0 0 #fff inset;      
    }

    .borrar {
        width: 40px;
        background-color: transparent;
        border: none;
    }

    .borrar i {
        color: #444;
        transition: all .3s ease;
    }

    .borrar:hover i,
    .borrar:focus i {
        color: var(--primary-color);
    }

    .borrar:active i {
        color: #000;
    }

    .botonera {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
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

    .agregar {
        margin: 0 auto 0 0;
    }

    th {
        text-align: left;
        font-weight: 200;
        vertical-align: bottom;
        padding: .3em .5em;
        border-bottom: 1px solid #ddd;
    }

    table {
        border-collapse: collapse;
        border-bottom: 1px solid #eee;
        margin-bottom: 1em;
    }

    th, td {
        border-left: 1px solid #eee;
    }


    tr {
        border-right: 1px solid #eee;
    }

    td {
        padding: .5em;
    }

    tr:nth-child(1) {
        border-right: none;
    }

    tr:nth-child(1) th {
        border-left: none;
    }

    tr:nth-child(2n) {
        background-color: #f8f8f8;
    }
</style>