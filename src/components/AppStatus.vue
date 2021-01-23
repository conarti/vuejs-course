<template>
  <span class="badge" :class="modifier">{{ title }}</span>
</template>

<script>
import { ref, computed } from 'vue'
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'done',
      validator(value) {
        return ['active', 'done', 'cancelled', 'pending'].includes(value)
      }
    }
  },
  setup(props) {
    const title = ref('')

    const modifier = computed(() => {
      switch(props.type) {
        case 'active':
          title.value = 'Активен'
          return 'primary'
        case 'cancelled':
          title.value = 'Отменён'
          return 'danger'
        case 'pending':
          title.value = 'Выполняется'
          return 'warning'
        default:
          title.value = 'Завершен'
          return ''
      }
    })

    return { title, modifier }
  }
}
</script>
