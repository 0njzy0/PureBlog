<template>
  <div class="blog-card">
    <v-card hover :to="`/blogs/${blog._id}`">
      <v-img v-if="blog.cover" :src="blog.cover">
      </v-img>
      <v-card-title primary-title class="py-2">
        <v-layout column>
          <v-flex>
            <div class="px-1 my-1 body-1 grey--text">
              <v-layout>
                <v-avatar :size="20">
                  <img :src="blog.author.avatar" alt="avatar">
                </v-avatar>
                <span class="ml-1">{{blog.author.name}}</span>
                <v-spacer></v-spacer>
              </v-layout>
            </div>
          </v-flex>
          <v-flex>
            <h3 :class="{title:true,'card-blog-title':true,'md6-title':blog.isMd6}">{{blog.title}}</h3>
          </v-flex>
          <v-flex>
            <div :class="{'body-1':true,'card-blog-overview':true,'md6-overview':blog.isMd6}">{{blog.content}}</div>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-actions class="pt-0 px-3">
        <div class="caption grey--text text--lighten-1">
          <v-layout>
            <v-icon size="18" color="grey lighten-1">mdi-timer</v-icon><span class="mx-1">{{$formatTime(blog.createTime)}}</span>
            <v-icon size="18" color="grey lighten-1">mdi-heart-outline</v-icon><span class="mx-1">{{blog.likes.length}}</span>
            <v-icon size="18" color="grey lighten-1">mdi-eye-outline</v-icon><span class="mx-1">{{blog.views}}</span>
          </v-layout>
        </div>
        <v-spacer></v-spacer>
        <v-btn flat small color="primary" style="min-width:0" class="px-1">
          阅读全文
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'BlogCard',
  props: ['blog']
}
</script>

<style lang="scss">
.blog-card {
  .card-blog-title {
    max-height: 40px;
    overflow: hidden;
  }

  .card-blog-overview {
    max-height: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (min-width: 960px) {
    .md6-title {
      height: 40px;
    }
    .md6-overview {
      height: 80px;
    }
  }
}
</style>

