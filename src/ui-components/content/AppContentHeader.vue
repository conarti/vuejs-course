<template>
  <h1 v-if="content.title">
    {{ content.title }}
  </h1>
</template>

<script>
export default {
  inject: ['content']
}
</script>

<style scoped>
  h1 {
    margin: 0;
  }
</style>
