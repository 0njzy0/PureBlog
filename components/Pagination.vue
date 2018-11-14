<template>
  <v-pagination :value="page" :length="length" :total-visible="7" @input="handlePage"></v-pagination>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['path', 'page', 'limit', 'total'],
  computed: {
    length() {
      if (this.limit >= this.total) {
        return 1
      } else {
        if (this.total % this.limit == 0) {
          return parseInt(this.total / this.limit)
        } else {
          return parseInt(this.total / this.limit + 1)
        }
      }
    }
  },
  methods: {
    handlePage(page) {
      this.$router.push({ path: this.path, query: { page } })
    }
  }
}
</script>
