export default ({ app, route, store, $axios }) => {
  $axios.onRequest(config => {
    if (store.state.token) {
      config.headers['Authorization'] = `Bearer ${store.state.token}`
    }
  })
  $axios.onResponse(response => {
    const data = response.data
    if (!data.success && data.message) {
      return app.$message({
        message: data.message,
        type: 'warning',
        center: true,
        customClass: route.path.includes('login') ? 'login-el-message' : ''
      })
    }
  })
  $axios.onError(err => {
    const data = err.response.data
    if (err.response.status == 404) {
      return app.$message({
        message: '404-接口不存在',
        type: 'error',
        center: true
      })
    }
    if (!data.success && data.message) {
      return app.$message({
        message: data.message,
        type: 'error',
        center: true
      })
    }
  })
}
