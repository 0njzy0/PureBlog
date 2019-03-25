<template>
  <!-- 标签管理 -->
  <el-card>
    <div slot="header">
      <span>控制台</span>
      <el-button style="float: right; padding: 3px 20px" type="text" icon="el-icon-plus" @click="handleCreate">
        添加
      </el-button>
      <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-search" @click="handleSearch">
        查询
      </el-button>
    </div>
    <el-table :data="list" height="auto">
      <el-table-column prop="name" label="名称" />
      <el-table-column fixed="right" label="操作">
        <template slot-scope="{ row }">
          <el-button type="text" size="small" icon="el-icon-edit" @click="handleUpdate(row)">修改</el-button>
          <el-button type="text" size="small" icon="el-icon-delete" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="标签信息" :visible.sync="dialogVisable" @close="handleDialogClose">
      <el-form ref="form" :model="formData" :rules="formRules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose">取消</el-button>
        <el-button v-if="dialogStatus == 'create'" type="primary" @click="createData">保存</el-button>
        <el-button v-else-if="dialogStatus == 'update'" type="primary" @click="updateData">更新</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import curd from '~/mixins/curd'

export default {
  layout: 'admin',
  mixins: [curd],
  data: () => ({
    apiSuffix: 'tags',
    listQuery: {
      name: ''
    },
    formData: {
      name: ''
    },
    formRules: {
      name: [{ required: true, message: '请输入标签名称', trigger: 'change' }]
    }
  }),
  created() {
    if (process.client) {
      this.getList()
    }
  },
  methods: {}
}
</script>
