<template>
  <div class="login-container">
    <div class="pic-container">
      <img src="/login-pic.jpg" />
    </div>
    <div class="form-container">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'PureBlog-Admin'
    }
  }
}
</script>

<style lang="scss">
.login-container {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  // background: #f0f2f5;
  & > div {
    width: 50%;
    height: 100%;
    float: left;
  }
  .pic-container img {
    width: 100%;
    height: 100%;
  }
  .form-container {
    display: flex;
    align-items: center;
    justify-content: center;
    & > div {
      width: 60%;
    }
  }
}
.login-el-message {
  left: 75%;
}
</style>
