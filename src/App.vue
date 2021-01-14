<template>
  <div class="container column">
    <AppForm
        :input="inputValue"
        :value-type="type"
        @form="change"
    />
    <AppContent />
  </div>
  <div class="container">
    <AppComments />
  </div>
</template>

<script>
import AppForm from '@/AppForm'
import AppContent from '@/AppContent'
import AppComments from '@/AppComments'

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
          this.editContent(type, value)
          break
      }
      this.inputValue = ''
      this.type = 'title'
    },
    editContent(type, value) {
      const sections = this.content.sections

      if (canEdit(type)) {
        editSection(type, value)
      } else {
        addSection(type, value)
      }

      function getEditableSection() {
        const sectionIdx = sections.findIndex(item => !(item.hasOwnProperty('title') && item.hasOwnProperty('text')))
        if (sectionIdx >= 0) {
          return sections[sectionIdx]
        }
      }

      function canEdit(type) {
        const target = getEditableSection(sections)
        if (target) {
          const property = type === 'subtitle' ? 'title' : 'text'
          return !target.hasOwnProperty(property)
        } else {
          return false
        }
      }

      function editSection(type, value) {
        const target = getEditableSection(sections)
        switch(type) {
          case 'subtitle':
            target.title = value
            break
          case 'text':
            target.text = value
            break
        }
      }

      function addSection(type, value) {
        const newSection = {}
        switch (type) {
          case 'subtitle':
            newSection.title = value
            break
          case 'text':
            newSection.text = value
            break
        }
        newSection.id = generateID()
        sections.push(newSection)
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

function generateID() {
  return Math.random().toString(36).substr(2, 9)
}
</script>
