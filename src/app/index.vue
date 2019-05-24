<template>
    <main>
        <header>
            <h1>{{titulo}}</h1>
            <span>{{usuario}}</span>
        </header>
        <router-view/>
        <footer></footer>
    </main>
</template>

<script>
export default {
    name: 'app',

    computed: {
        titulo () {
            return this.$route.name
        },

        usuario () {
            return this.$store.state.usuario
        }
    }
}
</script>
