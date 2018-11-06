<template>
  <v-layout row wrap>
    <v-flex md9>
      <v-card v-if='blog'>
        <v-img v-if="blog.cover" :src="blog.cover" aspect-ratio="2.75">
        </v-img>
        <v-card-title primary-title class="pb-1">
          <v-layout column>
            <v-flex>
              <div class="body-1 font-weight-thin">
                <span>{{blog.createTime}}</span> | <span>{{blog.author.name}}</span>
              </div>
            </v-flex>
            <v-flex>
              <h3 class="title">{{blog.title}}</h3>
            </v-flex>
            <v-flex>
              <div>
                {{blog.content}}
              </div>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-actions class="pt-0">
          <v-btn-toggle>
            <v-btn flat disabled class="mx-0">
              <v-icon size="10">mdi-eye</v-icon><span class="ml-1">{{blog.views}}</span>
            </v-btn>
            <v-btn flat disabled class="mx-0">
              <v-icon size="10">mdi-thumb-up</v-icon><span class="ml-1">{{blog.likes.length}}</span>
            </v-btn>
          </v-btn-toggle>
          <v-spacer></v-spacer>
          <v-avatar :size="20">
            <img :src="blog.author.avatar" alt="avatar">
          </v-avatar>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex md3>
      <RightMenu />
    </v-flex>
  </v-layout>
</template>

<script>
import RightMenu from '~/components/RightMenu'
export default {
  components: {
    RightMenu
  },
  data() {
    return {
      blog: null
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.getBlogById()
    },
    async getBlogById() {
      const id = this.$route.params.id
      const res = await this.$axios.$get('/blogs/' + id)
      this.blog = res.data
    }
  }
}
</script>