<template>
  <div class="avatar" v-if="content.link">
    <img alt="" :src="content.link">
  </div>
</template>

<script>
export default {
  inject: ['content']
}
</script>

<style scoped>
.avatar {
  display: flex;
  justify-content: center;
}

.avatar img {
  width: 150px;
  height: auto;
  border-radius: 10px;
}
</style>
