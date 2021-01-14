<template>
  <div class="card card-w70" :class="isNull ? 'text' : 'content'" :style="isNeedGap ? '' : 'row-gap: 0px;'">
    <AppContentHeader class="header"/>
    <AppContentAvatar class="avatar"/>
    <div class="sections">
      <AppContentSection
          v-for="item in content.sections"
          :title="item.title"
          :text="item.text"
          :key="item.id"
          :id="item.id"
      />
    </div>
    <AppContentNull v-if="isNull" />
  </div>
</template>

<script>
import AppContentHeader from '@/ui-components/content/AppContentHeader'
import AppContentAvatar from '@/ui-components/content/AppContentAvatar'
import AppContentSection from '@/ui-components/content/AppContentSection'
import AppContentNull from '@/ui-components/content/AppContentNull'

export default {
  inject: ['content'],
  computed: {
    isNull() {
      return !this.content.title && !this.content.link && !this.content.sections.length
    },
    isNeedGap() {
      return this.content.title || this.content.link
    }
  },
  components: { AppContentHeader, AppContentAvatar, AppContentSection, AppContentNull }
}
</script>

<style scoped>
  .text {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header {
    grid-area: header;
    justify-self: start;
    align-self: center;
  }
  .avatar {
    grid-area: avatar;
    justify-self: end;
    align-self: center;
  }
  .sections {
    grid-area: sections;
  }
  .content {
    display: grid;
    grid-template-areas: 'header avatar' 'line line' 'sections sections';
    row-gap: 25px;
  }
</style>
