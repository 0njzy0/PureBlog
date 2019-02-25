<template>
  <v-pagination v-if="length > 1" :value="page" :length="length" :total-visible="7" @input="handlePage" />
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    path: {
      type: String,
      required: true
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 8
    },
    total: {
      type: Number,
      default: 0
    }
  },
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
      if (page == 1) {
        this.$router.push({ path: this.path })
      } else {
        this.$router.push({ path: this.path, query: { page } })
      }
    }
  }
}
</script>
