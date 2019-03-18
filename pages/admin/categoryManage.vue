<template>
  <!-- 类别管理 -->
  <v-layout row>
    <v-flex xs12>
      <v-card height="100%">
        <v-card-title class="py-2">
          <v-text-field
            v-model="listQuery.name"
            clearable
            single-line
            hide-details
            label="根据类别名搜索"
            class="py-0 my-0"
            style="max-width:300px"
          />
          <v-spacer />
          <v-btn color="primary" @click="handleSearch">
            <v-icon left dark>mdi-magnify</v-icon>
            查询
          </v-btn>
          <v-btn @click="handleCreate">
            <v-icon left dark>mdi-plus</v-icon>
            添加
          </v-btn>
        </v-card-title>
        <el-table class="px-3" :data="list" height="calc(100% - 64px)">
          <el-table-column prop="name" label="名称" />
          <el-table-column fixed="right" label="操作">
            <template slot-scope="{ row }">
              <v-icon class="mr-2" @click="handleUpdate(row)">
                mdi-file-document-edit
              </v-icon>
              <v-icon @click="handleDelete(row)">
                mdi-delete
              </v-icon>
            </template>
          </el-table-column>
        </el-table>
      </v-card>
    </v-flex>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title primary-title>
          <span class="headline">类别信息</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="formData.name" required :rules="nameRules" label="类别名" type="text" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn flat @click="handleDialogClose">关闭</v-btn>
          <v-btn v-if="dialogStatus == 'create'" color="primary" flat @click="createData">保存</v-btn>
          <v-btn v-else color="primary" @click="updateData">更新</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  layout: 'admin',
  data: () => ({
    listQuery: {
      name: ''
    },
    list: [],
    dialog: false,
    dialogStatus: 'create',
    formData: {
      name: ''
    },
    nameRules: [v => !!v || '请输入类别名']
  }),
  created() {
    if (process.client) {
      this.getList()
    }
  },
  methods: {
    handleSearch() {
      this.getList()
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialog = true
    },
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.formData = JSON.parse(JSON.stringify(row))
      this.dialog = true
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
      this.dialog = false
      this.$refs.form.reset()
    },
    async getList() {
      const res = await this.$axios.$get('/categories')
      if (res && res.success) {
        this.list = res.data
      }
    },
    async createData() {
      if (this.$refs.form.validate()) {
        const res = await this.$axios.$post(`/categories`, this.formData)
        if (res && res.success) {
          this.getList()
          this.handleDialogClose()
        }
      }
    },
    async updateData() {
      const id = this.formData._id
      if (this.$refs.form.validate()) {
        const res = await this.$axios.$put(`/categories/${id}`, this.formData)
        if (res && res.success) {
          this.getList()
          this.handleDialogClose()
        }
      }
    },
    async deleteData(data) {
      const id = data._id
      const res = await this.$axios.$delete(`/categories/${id}`)
      if (res && res.success) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getList()
      }
    }
  }
}
</script>
