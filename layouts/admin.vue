<template>
  <el-container class="admin-layout">
    <el-header>
      <div class="header">
        <div class="logo">PureBlog-Admin</div>
        <div class="nav">
          <el-menu
            :default-active="$route.path"
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
            <el-button size="mini" icon="mdi mdi-logout-variant" @click="handleLogout" />
          </div>
          <div class="avatar">
            <img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify" />
          </div>
        </div>
      </div>
    </el-header>
    <el-container class="main">
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/admin' }">控制台</el-breadcrumb-item>
          <template v-if="breadcrumbs.length">
            <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">{{ item }}</el-breadcrumb-item>
          </template>
        </el-breadcrumb>
        <div class="main-card">
          <no-ssr>
            <nuxt />
          </no-ssr>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  head() {
    return {
      title: 'PureBlog-Admin'
    }
  },
  middleware: 'auth',
  data() {
    return {
      menus: [
        { name: '控制台', index: '1', url: '/admin' },
        {
          name: '内容管理',
          index: '2',
          children: [
            { name: '文章管理', index: '2-1', url: '/admin/blogManage' },
            { name: '类别管理', index: '2-2', url: '/admin/categoryManage' },
            { name: '标签管理', index: '2-3', url: '/admin/tagManage' }
          ]
        },
        {
          name: '系统管理',
          index: '3',
          children: [{ name: '用户管理', index: '3-1', url: '/admin/userManage' }]
        }
      ],
      breadcrumbs: []
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      let arr = keyPath
      if (arr.length == 2) {
        let menu = this.menus.find(item => item.index == arr[0])
        let subMenu = menu.children.find(item => item.url == arr[1])
        this.breadcrumbs = [menu.name, subMenu.name]
      } else {
        this.breadcrumbs = []
      }
    },
    handleCreateBlog() {
      this.breadcrumbs = []
      this.$router.push('/admin/blogEditor')
    },
    handleLogout() {
      Cookie.remove('auth')
      this.$store.commit('setToken', null)
      this.$router.push('/admin/login')
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
    overflow: scroll;
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
      & > .el-card {
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
