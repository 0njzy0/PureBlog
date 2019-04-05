<template>
  <!-- 文章管理 -->
  <el-card>
    <div slot="header">
      <span>控制台</span>
      <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-search" @click="handleSearch">
        查询
      </el-button>
    </div>
    <el-table :data="list" height="auto">
      <el-table-column prop="title" label="标题" min-width="150" />
      <el-table-column prop="overView" label="概述" min-width="150" />
      <el-table-column prop="author.name" label="作者" />
      <el-table-column prop="category.name" label="类别" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="{ row }">
          <span>{{ row.createTime ? $dayjs(row.createTime).format('YYYY-MM-DD HH:mm') : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间">
        <template slot-scope="{ row }">
          <span>{{ row.updateTime ? $dayjs(row.updateTime).format('YYYY-MM-DD HH:mm') : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="{ row }">
          <el-button type="text" size="small" icon="el-icon-edit" @click="handleUpdate(row)">修改</el-button>
          <el-button type="text" size="small" icon="el-icon-delete" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="card-pagination">
      <el-pagination
        background
        :current-page="listQuery.page"
        :page-sizes="[3, 5, 10, 20]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog title="文章信息" :visible.sync="dialogVisable" @close="handleDialogClose">
      <el-form ref="form" :model="formData" :rules="formRules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title" />
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
    apiSuffix: 'blogs',
    listQuery: {
      page: 1,
      limit: 20
    },
    total: 0,
    formData: {
      title: ''
    },
    formRules: {
      title: [{ required: true, message: '请输入标题', trigger: 'change' }]
    }
  }),
  created() {
    if (process.client) {
      this.getList()
    }
  },
  methods: {
    handleUpdate(data) {
      const blogId = data._id
      this.$router.push(`/admin/blogEditor?id=${blogId}`)
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    }
  }
}
</script>
