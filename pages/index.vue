<template>
  <v-layout row wrap>
    <v-flex md9>
      <v-layout row wrap>
        <v-flex v-for="(blog,index) in blogs" :key="index" :class="{md6:isMd6(index)}">
          <v-card hover :to="'/blogs/'+blog._id">
            <v-img v-if="blog.cover" :src="blog.cover">
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
                  <div>{{blog.content}}</div>
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
        <v-flex md12>
          <div class="text-xs-center">
            <v-pagination :value=1 :length="4"></v-pagination>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex md3>
      <RightMenu />
    </v-flex>
  </v-layout>
</template>

<script>
import RightMenu from '~/components/RightMenu'
export default {
  // async asyncData({ app }) {
  //   const { data } = await app.$axios.$get('/blogs')
  //   console.log(data)
  //   return { blogs: data }
  // },
  name: 'index',
  components: { RightMenu },
  data() {
    return {
      blogs: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.getAllBlogs()
    },
    async getAllBlogs() {
      let res = await this.$axios.$get('/blogs')
      this.blogs = res.data
    },
    isMd6(index) {
      if (
        !this.blogs[index].cover &&
        (!this.blogs[index + 1].cover || index + 1 != this.blogs.length)
      ) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-title {
  height: 40px;
  overflow: hidden;
}
.overview {
  height: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>