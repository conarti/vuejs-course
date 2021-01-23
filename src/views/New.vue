<template>
  <form class="card" @submit.prevent="addTask">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model.trim="title">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="deadline">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model.trim="text"></textarea>
    </div>

    <button class="btn primary" :disabled="isBtnDisabled">Создать</button>
  </form>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    const title = ref('')
    const deadline = ref('')
    const text = ref('')

    const isBtnDisabled = computed(() => {
      return !(title.value.length > 3 && deadline.value.length && text.value.length > 3)
    })

    const addTask = () => {
      store.dispatch('addTask', { title, deadline, text })
      router.push('/')
    }

    return {
      title,
      deadline,
      text,
      isBtnDisabled,
      addTask
    }
  }
}
</script>
