<template>
  <header class="container header">
    <div class="logo">
      <img src="/qamqorlyq.ico" alt="Logo" class="logo-icon">
      Qamqorlyq</div>
    <nav class="nav">
      <router-link to="/">Главная</router-link>
      <router-link to="/pets">Все питомцы</router-link>
      <a class="cta" href="#">Войти</a>
    </nav>
  </header>
</template>

<script setup>
</script>
<style>
.logo {
display: flex;
align-items: center;
font-weight: 700;
font-size: 22px;
gap: 8px;
}
.logo-icon {
width: 28px;
height: 28px;
object-fit: contain;
}
</style>
