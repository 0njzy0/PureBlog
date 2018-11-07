<template>
  <v-layout row wrap fill-height align-center>
    <v-flex md12 style="text-align:center">
      <h1 class="display-3 primary--text mb-4" v-if="error.statusCode === 404">页面不存在</h1>
      <h1 v-else>应用发生错误异常</h1>
      <p>{{error.message}}</p>
      <v-btn to='/'>首页</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['error']
}
</script>