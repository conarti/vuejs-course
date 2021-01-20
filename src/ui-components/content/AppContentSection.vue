<template>
  <div class="editable-section">
    <h2
        v-if="title"
        :contenteditable="isEditMode"
        :class="{'edit-mode': isEditMode}"
        ref="title"
    >{{ title }}</h2>
    <div class="buttons-group">
      <app-button
          @action="toggleMode"
          :color="isEditMode ? 'primary' : ''"
      ><span class="icon"></span></app-button>
      <app-button
          v-if="isEditMode"
          @action="moveSection('up')"
          :disabled="isUpDisabled"
      ><span class="icon"></span></app-button>
      <app-button
          v-if="isEditMode"
          @action="moveSection('down')"
          :disabled="isDownDisabled"
      ><span class="icon"></span></app-button>
      <app-button
          v-if="isEditMode"
          color="danger"
          @action="deleteSection"
      ><span class="icon"></span></app-button>
    </div>
    <hr />
    <p
        v-if="text"
        :contenteditable="isEditMode"
        :class="{'edit-mode': isEditMode}"
        ref="text"
    >{{ text }}</p>
  </div>
</template>

<script>
import AppButton from '@/ui-components/AppButton'

export default {
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    text: {
      type: String,
      required: false,
      default: ''
    },
    id: String
  },
  inject: ['content'],
  data() {
    return {
      isEditMode: false
    }
  },
  methods: {
    toggleMode() {

      if (this.isEditMode) {
        this.updateData()
      }
      this.isEditMode = !this.isEditMode
    },
    updateData() {
      const section = this.section
      let title, text

      if (this.$refs.title) {
        title = this.$refs.title.innerText.trim()
        section.title = title
      }

      if (this.$refs.text) {
        text = this.$refs.text.innerText.trim()
        section.text = text
      }

      if (section.hasOwnProperty('title') && !title.length) {
        delete section.title
      }
      if (section.hasOwnProperty('text') && !text.length) {
        delete section.text
      }
      if (!section.hasOwnProperty('text') && !section.hasOwnProperty('title')) {
        this.deleteSection()
      }
    },
    moveSection(type) {
      const { sections } = this.content
      switch(type) {
        case 'up':
          if (!this.isUpDisabled) {
            sections.splice(this.sectionIdx - 1, 0, sections.splice(this.sectionIdx, 1)[0])
          }
          break
        case 'down':
          if (!this.isDownDisabled) {
            sections.splice(this.sectionIdx + 1, 0, sections.splice(this.sectionIdx, 1)[0])
          }
          break
      }
    },
    deleteSection() {
      this.content.sections.splice(this.sectionIdx, 1)
    }
  },
  computed: {
    sectionIdx() {
      const { sections } = this.content
      return sections.findIndex(item => item.id === this.id)
    },
    section() {
      return this.content.sections[this.sectionIdx]
    },
    isUpDisabled() {
      return this.sectionIdx === 0
    },
    isDownDisabled() {
      return this.sectionIdx === this.content.sections.length - 1
    }
  },
  components: { AppButton }
}
</script>

<style scoped lang="scss">
  @font-face {
    font-family: 'FaSolid';
    src: url('~@/assets/fa-solid-900.woff') format('woff');
  }
  .icon {
    font-family: FaSolid;
  }
  .editable-section {
    display: grid;
    grid-template-areas: 'title edit' 'line line' 'text text';
    margin-bottom: 25px;
  }
  .editable-section:last-child {
    margin: 0;
  }
  h2 {
    grid-area: title;
    align-self: end;
    justify-self: start;
    margin: 0;
    padding: 0;
    border: 2px solid rgba(66, 185, 131, 0);
  }
  .buttons-group {
    grid-area: edit;
    justify-self: end;
    align-self: center;
  }
  .btn {
    padding: .65rem .75rem;
  }
  .btn:last-child {
    margin: 0;
  }
  hr {
    grid-area: line;
    opacity: .25;
    margin: 10px 0;
  }
  p {
    grid-area: text;
    margin: 0;
    border: 2px solid rgba(66, 185, 131, 0);
  }
  .edit-mode {
    border: 2px solid rgba(#e53935, .25);
    background: rgba(#e53935, .15);
    transition: border .25s, background-color .25s;
    border-radius: 5px;
  }
  .edit-mode:focus {
    border: 2px solid rgba(#e53935, 1);
    border-radius: 5px;
    outline: none;
  }
</style>
