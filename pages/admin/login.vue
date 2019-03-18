<template>
  <v-layout align-center justify-center>
    <v-flex md8>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>PureBlog-Admin</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="formData.name"
              :rules="nameRules"
              required
              prepend-icon="mdi-account"
              name="login"
              label="用户名"
              type="text"
            />
            <v-text-field
              v-model="formData.password"
              :rules="pwdRules"
              required
              prepend-icon="mdi-lock"
              name="password"
              label="密码"
              type="password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="handleLogin">登录</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
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
      nameRules: [v => !!v || '请输入用户名'],
      pwdRules: [v => !!v || '请输入密码']
    }
  },
  methods: {
    async handleLogin() {
      if (this.$refs.form.validate()) {
        const res = await this.$axios.$post('/login', this.formData)
        if (res && res.success) {
          this.$store.commit('setToken', res.data.token)
          this.$router.push('/admin')
        }
      }
    }
  }
}
</script>
