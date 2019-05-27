<template>
    <article>
        <i aria-hidden="true" class="person"/>
        <label>
            <span>Email</span>
            <input ref="email" v-model="email" @keypress.enter="ingresar()"
                type="email" placeholder="Ingrese su Email" autocomplete="off" spellcheck="false">
        </label>
        <label>
            <span>Contraseña</span>
            <input v-model="pass" @keypress.enter="ingresar()"
                :type="visible ? 'text': 'password'" placeholder="Ingrese contraseña" autocomplete="off" spellcheck="false">
            <button :alt="`${visible ? 'ocultar': 'mostrar'} contraseña`"
                :title="`${visible ? 'ocultar': 'mostrar'} contraseña`"
                @click="mostrarOcultarPass()" class="visible">
                <i :class="`visibility${visible ? '': '_off'}`" aria-hidden="false"/>
            </button>
        </label>
        <span class="error" v-if="error">{{error}}</span>
        <!-- <button class="olvido" @click="olvido()">Olvidé mi contraseña</button> -->
        <section>
            <!-- <button class="accion" @click="registrarme()">Registrarme</button> -->
            <button class="accion" @click="ingresar()">Ingresar</button>
        </section>
    </article>
</template>

<script>
import loginIngresar from './loginIngresar'

export default {
    name: 'login',

    data: () => ({
        visible: false,
        email: null,
        pass: null,
        error: null
    }),

    mounted () {
        this.$refs.email.focus()
    },

    methods: {
        mostrarOcultarPass () {
            this.visible = this.visible ? false: true
        },

        // registrarme () {
        //     this.$emit('registrarme')
        // },

        ingresar () {
            if (navigator.onLine) {
                loginIngresar (this)
            } else {
                this.error = 'Debe estar conectado a internet para ingresar'
            }
        },

        // olvido () {
        //     this.$emit('olvido')
        // }
    }
}
</script>

<style scoped>
    article {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 500px;
        max-width: 90vw;
        align-self: center;
    }

    .person {
        color: #fff;
        padding: .5em;
        font-size: 3em;
        background-color: #999;
        border-radius: 50%;
        margin: .5em;
    }

    label {
        display: flex;
        flex-direction: column;
        margin: .5em 0;
    }

    label * {
        font-size: 1em;
    }

    label span {
        padding: .5em 0;
        color: #444;
    }

    input {
        padding: .5em;
        border: 1px solid #ccc;
        border-radius: 5px;
        transition: all .3s ease;
        width: 17em;
        max-width: 80vw;
    }

    input:hover,
    input:focus {
        border: 1px solid var(--primary-color);
        box-shadow: 0 0 0 2px var(--primary-color);
    }

    .visible {
        padding: 0;
        border-radius: 50%;
        font-size: 24px;
        display: flex;
        align-self: flex-end;
        margin: -1.2em .5em 0 0;
        background-color: transparent;
        border: none;
        color: #444;
    }

    .visibility::after {
        content: 'visibility';
    }

    .visibility_off::after {
        content: 'visibility_off'
    }

    .visible:hover i,
    .visible:focus i {
        color: var(--primary-color);
    }
</style>