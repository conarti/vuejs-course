<template>
  <form class="card card-w30" @submit.prevent="$emit('form', value, type); resetForm()">

    <div class="form-control">
      <label for="type">Тип блока</label>
      <select id="type" v-model="type">
        <option value="title">Заголовок</option>
        <option value="avatar">Аватар</option>
        <option value="subtitle">Подзаголовок</option>
        <option value="text">Текст</option>
      </select>
    </div>

    <div class="form-control">
      <label for="value">Значение</label>
      <textarea id="value" rows="3" v-model.trim="value" />
    </div>

    <app-button
      color="primary"
      :disabled="isBtnDisabled"
    >{{ btnName }}</app-button>
    <app-button
      v-if="btnName === 'Изменить'"
      color="danger"
      @click.prevent="deleteHeaderOrAvatar"
    ><span class="icon"></span></app-button>

    <br />
    <small>
      Примечание: текст/подзаголовок всегда добавляется сначала к первому незаполненному блоку, если таковой есть.
      <br />
      <strong>
        1 блок = 1 подзаголовок + 1 текст
        <br />
        Аватар и заголовок - уникальны
      </strong>
    </small>
  </form>
</template>

<script>
import AppButton from '@/ui-components/AppButton'

export default {
  emits: ['form'],
  inject: ['content'],
  data() {
    return {
      value: '',
      type: 'title'
    }
  },
  methods: {
    resetForm() {
      this.value = ''
      this.type = 'title'
    },
    deleteHeaderOrAvatar() {
      if (this.type === 'title') {
        this.content.title = ''
      } else {
        this.content.link = ''
      }
    }
  },
  computed: {
    isBtnDisabled() {
      return this.value.length < 4
    },
    btnName() {
      if (
          this.type === 'title' && this.content.title ||
          this.type === 'avatar' && this.content.link
      ) {
        return 'Изменить'
      } else {
        return 'Добавить'
      }
    }
  },
  components: { AppButton }
}
</script>

<style scoped>
  @font-face {
    font-family: 'FaSolid';
    src: url('~@/assets/fa-solid-900.woff') format('woff');
  }
  .icon {
    font-family: FaSolid;
  }
  .btn {
    margin-bottom: 30px;
  }
</style>
