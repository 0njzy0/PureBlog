<template>
  <el-container class="admin-layout">
    <el-header>
      <div class="header">
        <div class="logo">PureBlog-Admin</div>
        <div class="nav">
          <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            :router="true"
            background-color="#001429"
            text-color="#fff"
            active-text-color="#409EFF"
            style="padding: 0 20px;"
            @select="handleSelect"
          >
            <template v-for="menu in menus">
              <el-menu-item v-if="!menu.children" :key="menu.index" :index="menu.url || menu.index">
                {{ menu.name }}
              </el-menu-item>
              <el-submenu v-if="menu.children" :key="menu.index" :index="menu.url || menu.index">
                <template slot="title">
                  {{ menu.name }}
                </template>
                <el-menu-item
                  v-for="(subMenu, subIndex) in menu.children"
                  :key="subIndex"
                  :index="subMenu.url || subMenu.index"
                >
                  {{ subMenu.name }}
                </el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
        </div>
        <div class="right-menu">
          <div class="edit-button">
            <el-button size="mini" icon="mdi mdi-lead-pencil" @click="handleCreateBlog" />
            <el-button size="mini" icon="mdi mdi-fullscreen" />
          </div>
          <div class="avatar">
            <img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify" />
          </div>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-main class="main">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/admin/newIndex' }">控制台</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
          <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main-card">
          <nuxt />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  head() {
    return {
      title: 'PureBlog-Admin'
    }
  },
  middleware: 'auth',
  data() {
    return {
      activeIndex: '/admin',
      menus: [
        { icon: 'mdi-view-dashboard', name: '控制台', index: '1', url: '/admin' },
        {
          name: '内容管理',
          index: '2',
          children: [
            { icon: 'mdi-file-document', name: '文章管理', index: '2-1', url: '/admin/blogManage' },
            { icon: 'mdi-equal-box', name: '类别管理', index: '2-2', url: '/admin/categoryManage' },
            { icon: 'mdi-tag', name: '标签管理', index: '2-3', url: '/admin/tagManage' }
          ]
        },
        {
          name: '系统管理',
          index: '3',
          children: [
            { icon: 'mdi-package-variant', name: '资源管理', index: '3-1' },
            { icon: 'mdi-comment', name: '评论管理', index: '3-2' },
            { icon: 'mdi-account', name: '用户管理', index: '3-3' },
            { icon: 'mdi-settings', name: '系统设置', index: '3-4' }
          ]
        }
      ]
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    handleCreateBlog() {
      this.$router.push('/admin/createBlog')
    }
  }
}
</script>

<style lang="scss">
.admin-layout {
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  .el-header {
    padding: 0px;
  }
  .main {
    background: #f0f2f5;
    .el-breadcrumb {
      height: 30px;
      display: flex;
      align-items: center;
    }
    .main-card {
      margin-top: 10px;
      height: calc(100% - 40px);
      position: relative;
      overflow: hidden;
      .el-card {
        height: 100%;
        .el-card__header {
          height: 50px;
        }
        .el-card__body {
          padding: 10px;
          padding-bottom: 0px;
          height: calc(100% - 50px);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .card-pagination {
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
      }
    }
  }
  .header {
    background: #001429;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .logo {
      color: #fff;
      font-size: 20px;
    }
    .nav {
      flex: 1;
    }
    .right-menu {
      display: flex;
      align-items: center;
      .edit-button {
        margin-right: 10px;
        button {
          padding: 0px;
          margin-left: 0px;
          margin-right: 10px;
          border: none;
          background: none;
          color: #fff;
          font-size: 24px;
        }
      }
      .avatar {
        width: 28px;
        height: 28px;
      }
    }
  }
}
</style>
