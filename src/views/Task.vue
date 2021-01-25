<template>
  <h3 class="text-white center" v-if="isInvalidID">
    Задачи с id = <strong>{{ id }}</strong> нет.
  </h3>
  <div class="card" v-else>
    <h2>{{ task.title }}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="task.status" /></p>
    <p><strong>Дедлайн</strong>: {{ task.deadline.toLocaleDateString() }}</p>
    <p><strong>Описание</strong>: {{ task.text }}</p>
    <div>
      <button class="btn" @click="setStatus(id, 'pending')">Взять в работу</button>
      <button class="btn primary" @click="setStatus(id, 'done')">Завершить</button>
      <button class="btn danger" @click="setStatus(id, 'cancelled')">Отменить</button>
    </div>
  </div>
</template>

<script>
import AppStatus from '@/components/AppStatus'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  setup() {
    const route = useRoute()
    const store = useStore()

    const id = route.params.id

    const isInvalidID = computed(() => store.state.tasks.findIndex(task => task.id === id) === -1)

    const setStatus = (id, status) => store.dispatch('setStatus',{ id, status })
    const task = computed(() => {
      const idx = store.state.tasks.findIndex(task => task.id === id)
      return store.state.tasks[idx]
    })

    return { id, setStatus, task, isInvalidID }
  },
  components: { AppStatus }
}
</script>
