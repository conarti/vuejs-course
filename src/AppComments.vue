<template>
  <AppCommentsList
      v-if="comments"
      :comments-data="comments"
  />
  <AppLoader v-if="isLoading" />
  <p v-if="!comments && !isLoading">
    <app-button color="primary" @action="loadComments">Загрузить комментарии</app-button>
  </p>
</template>

<script>
import AppCommentsList from '@/ui-components/comments/AppCommentsList'
import AppLoader from '@/ui-components/AppLoader'
import AppButton from '@/ui-components/AppButton'
import axios from 'axios'

export default {
  data() {
    return {
      comments: null,
      isLoading: false
    }
  },
  methods: {
    loadComments() {
      this.isLoading = true
      setTimeout(async () => {
        try {
          const { data } = await axios.get('https://jsonplaceholder.typicode.com/comments?_limit=42')
          this.comments = data
        } catch (e) {
          console.error(e.message)
        }
        this.isLoading = false
      }, 1000)
    }
  },
  components: { AppLoader, AppCommentsList, AppButton }
}
</script>

<style scoped>
  p {
    display: flex;
    justify-content: center;
  }
</style>
