export default {
  data: () => ({
    list: [],
    formDataTemp: {},
    dialogVisable: false,
    dialogStatus: 'create'
  }),
  created() {
    if (process.client) {
      this.formDataTemp = JSON.parse(JSON.stringify(this.formData))
    }
  },
  methods: {
    handleSearch() {
      this.getList()
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogVisable = true
    },
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.dialogVisable = true
      this.formData = JSON.parse(JSON.stringify(row))
    },
    handleDelete(row) {
      this.$confirm('确认删除该数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteData(row)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleDialogClose() {
      this.formData = JSON.parse(JSON.stringify(this.formDataTemp))
      this.$refs.form.resetFields()
      this.dialogVisable = false
    },
    async getList() {
      let res
      if (this.listQuery.page && this.listQuery.limit) {
        res = await this.$axios.$get(`/${this.apiSuffix}?page=${this.listQuery.page}&limit=${this.listQuery.limit}`)
      } else {
        res = await this.$axios.$get(`/${this.apiSuffix}`)
      }
      if (res && res.success) {
        this.total = res.total
        this.list = res.data
      }
    },
    async createData() {
      const isValidate = await this.validateForm()
      if (isValidate) {
        const res = await this.$axios.$post(`/${this.apiSuffix}`, this.formData)
        if (res && res.success) {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.handleDialogClose()
          this.getList()
        }
      }
    },
    async updateData() {
      const id = this.formData._id
      const isValidate = await this.validateForm()
      if (isValidate) {
        const res = await this.$axios.$put(`/${this.apiSuffix}/${id}`, this.formData)
        if (res && res.success) {
          this.$message({
            type: 'success',
            message: '更新成功!'
          })
          this.handleDialogClose()
          this.getList()
        }
      }
    },
    async deleteData(data) {
      const id = data._id
      const res = await this.$axios.$delete(`/${this.apiSuffix}/${id}`)
      if (res && res.success) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getList()
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
