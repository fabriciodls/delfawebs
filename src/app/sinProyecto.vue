<template>
    <article>
        <h2>Sin proyecto</h2>
        <hr>
        <p>
            Para trabajar en esta area se debe tener instanciado un proyecto
        </p>
        <router-link to="/" class="accion" draggable="false">ir a Proyectos</router-link>
    </article>
</template>

<script>
export default {
    name: 'sin-proyecto'
}
</script>

<style scoped>
    article {
        width: 700px;
        align-self: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>