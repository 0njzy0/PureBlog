const md6Mixin = {
  methods: {
    isMd6(index, blog) {
      let length = this.blogs.length
      if (this.flag == undefined) {
        this.flag = true
      }
      if (length == 1) {
        blog.isMd6 = false
        return false
      } else if (length == 2) {
        if (!this.blogs[0].cover && !this.blogs[1].cover) {
          blog.isMd6 = true
          return true
        } else {
          blog.isMd6 = false
          return false
        }
      } else if (index + 1 != length) {
        if (
          this.flag &&
          !this.blogs[index].cover &&
          !this.blogs[index + 1].cover
        ) {
          this.flag = false
          blog.isMd6 = true
          return true
        } else if (
          !this.flag &&
          !this.blogs[index].cover &&
          !this.blogs[index - 1].cover
        ) {
          this.flag = true
          blog.isMd6 = true
          return true
        } else {
          blog.isMd6 = false
          return false
        }
      } else {
        if (!this.flag) {
          blog.isMd6 = true
          return true
        } else {
          blog.isMd6 = false
          return false
        }
      }
    }
  }
}

module.exports = md6Mixin