<template>
  <div class="container column">
    <AppForm @form="change" />
    <AppContent />
  </div>
  <AppComments />
</template>

<script>
import AppForm from '@/AppForm'
import AppContent from '@/AppContent'
import AppComments from '@/AppComments'
import { editContent } from './functions'

export default {
  data() {
    return {
      inputValue: '',
      type: 'title',
      content: {
        title: 'Evan You',
        link: 'https://pbs.twimg.com/profile_images/1206997998900850688/cTXTQiHm_400x400.jpg',
        sections: [
          {
            title: 'About',
            text:
                'Husband, father of two, independent open source developer. Creator / project lead of @vuejs and connoisseur of sushi.',
            id: 'qwkewqlskdadiwpqo'
          },
          {
            title: 'Vue.js',
            text: 'Progressive JavaScript framework for building modern web interfaces. Created by @youyuxi, maintained by http://vuejs.org/v2/guide/team.',
            id: 'sadasldsakdlas'
          },
          {
            title: 'Nuxt.js',
            text: 'The Intuitive Web Framework for building modern apps & websites with Vue.js.',
            id: 'pwqpeqwowoeqi'
          }
        ]
      },
    }
  },
  methods: {
    change(value, type) {
      switch(type) {
        case 'title':
          this.content.title = value
          break
        case 'avatar':
          this.content.link = value
          break
        default:
          editContent(type, value, this.content.sections)
          break
      }
    }
  },
  provide() {
    return {
      content: this.content
    }
  },
  components: { AppForm, AppContent, AppComments }
}
</script>
