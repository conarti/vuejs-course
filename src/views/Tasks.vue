<template>
  <AppLoader v-if="isLoad"/>
  <h1 class="text-white center" v-else-if="!tasks.length">Задач пока нет</h1>
  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ count }}</h3>
    <div class="card" v-for="task in tasks" :key="task.id">
      <h2 class="card-title">
        {{ task.title }}
        <AppStatus :type="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{ task.deadline.toLocaleDateString() }}
          </small>
        </strong>
      </p>
      <router-link custom :to="'/task/' + task.id" v-slot="{ navigate }">
        <button class="btn primary" @click="navigate">Посмотреть</button>
      </router-link>
    </div>
  </template>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import AppStatus from '@/components/AppStatus'
import AppLoader from '@/components/AppLoader'
import { useLoader } from '@/use/loader'

export default {
  setup() {
    const store = useStore()
    const { tasks, isLoad } = useLoader()

    return {
      count: computed(() => store.getters.activeCount),
      tasks,
      isLoad
    }
  },
  components: { AppStatus, AppLoader }
}
</script>
