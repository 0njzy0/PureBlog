<template>
  <v-layout column nowrap>
    <v-flex v-for="(user, index) in users" :key="index" style="flex-grow:0">
      <v-card color="primary" dark>
        <v-card-text class="headline font-weight-bold" style="min-height:100px">
          {{ user.introduction }}
        </v-card-text>
        <v-card-actions>
          <v-list-tile class="grow">
            <v-list-tile-avatar color="grey darken-3">
              <v-img class="elevation-6" :src="user.avatar" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ user.name.toUpperCase() }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  async asyncData({ app, store, query, error }) {
    try {
      const { data } = await app.$axios.$get(`/statistic/userInfo`)
      return {
        users: data
      }
    } catch (e) {
      error({ statusCode: 404, message: `获取用户信息失败:${e.message}` })
    }
  }
}
</script>
