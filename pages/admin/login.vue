<template>
  <div>
    <h1>PureBlog-Admin</h1>
    <el-form ref="form" label-position="top" :hide-required-asterisk="true" :model="formData" :rules="formRules">
      <el-form-item label="用户名" prop="name">
        <el-input v-model.trim="formData.name" clearable autofocus />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model.trim="formData.password" clearable show-password />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
        <el-button plain>注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: 'login',
  data() {
    return {
      formData: {
        name: '',
        password: ''
      },
      formRules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'change' }],
        password: [{ required: true, message: '请输入密码', trigger: 'change' }]
      }
    }
  },
  methods: {
    async handleLogin() {
      const isValidate = await this.validateForm()
      if (isValidate) {
        const res = await this.$axios.$post('/login', this.formData)
        if (res && res.success) {
          this.$notify({
            title: '成功',
            message: '欢迎登录',
            type: 'success',
            duration: 1200
          })
          this.$store.commit('setToken', res.data.token)
          this.$router.push('/admin')
        }
      }
    },
    async validateForm() {
      try {
        const isValidate = await this.$refs.form.validate()
        return isValidate
      } catch (error) {
        return false
      }
    }
  }
}
</script>
