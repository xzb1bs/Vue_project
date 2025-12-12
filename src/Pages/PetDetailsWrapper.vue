<template>
  <div>
    <AppHeader />
    <section class="container">
      <router-view />
    </section>
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}
</style>

