import { useStore } from 'vuex'
import { computed } from 'vue'

export function useLoader() {
  const store = useStore()
  return {
    tasks: computed(() => store.state.tasks),
    isLoad: computed(() => store.state.isLoading)
  }
}
