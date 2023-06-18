<template>
  <div class="content">
    <DrawerComponent @changePage="handleChangePage" />
    <div v-if="selectedPage === 'services'" class="right-section">
      <ServicesComponent />
    </div>
    <div v-if="selectedPage === 'users'" class="right-section"></div>
    <div v-if="selectedPage === 'companies'" class="right-section"></div>
  </div>
</template>

<script lang="ts">

import ServicesComponent from '@/components/Services.vue';

export default {
  name: 'HomeComponent',

  components: {
    ServicesComponent,
  },

  data() {
    return {
      selectedPage: 'services'
    }
  },

  methods: {
    handleChangePage(page: string) {
      this.selectedPage = page
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
}

.content {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  background-color: #f8f8f8;
}

.right-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #f8f8f8;
}
</style>
