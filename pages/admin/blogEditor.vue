<template>
  <!-- 编辑文章 -->
  <el-row :gutter="10" class="blog-create">
    <el-col :span="19" class="editor-container">
      <el-card class="blog-create">
        <no-ssr>
          <mavon-editor
            ref="md"
            v-model.trim="formData.content"
            :toolbars="toolbars"
            :box-shadow="false"
            :subfield="false"
            default-open="edit"
            @change="handleEditorChange"
          />
        </no-ssr>
      </el-card>
    </el-col>
    <el-col :span="5" class="form-container">
      <el-card class="blog-create">
        <el-form ref="form" label-position="top" :model="formData" :rules="formRules" style="height:100%">
          <el-form-item label="标题" prop="title">
            <el-input v-model.trim="formData.title" clearable placeholder="请输入" style="width:100%" />
          </el-form-item>
          <el-form-item label="概述" prop="overView">
            <el-input v-model.trim="formData.overView" type="textarea" :rows="2" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="类别">
            <el-select v-model="formData.category" clearable placeholder="请选择" style="width:100%">
              <el-option v-for="(item, index) in categories" :key="index" :label="item.name" :value="item._id" />
            </el-select>
          </el-form-item>
          <el-form-item label="标签">
            <el-select v-model="formData.tags" clearable multiple collapse-tags placeholder="请选择" style="width:100%">
              <el-option v-for="(item, index) in tags" :key="index" :label="item.name" :value="item._id" />
            </el-select>
          </el-form-item>
          <el-form-item label="封面">
            <el-upload drag action="https://jsonplaceholder.typicode.com/posts/" style="width:100%">
              <i class="el-icon-upload" />
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div style="display:flex">
          <el-button type="primary" style="width:50%" @click="publishData">发布</el-button>
          <el-button style="width:50%" @click="saveDataToDraft">保存至草稿</el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
// if (process.client) {
//   var CodeMirror = require('codemirror/lib/codemirror')
//   require('codemirror/lib/codemirror.css')
//   require('codemirror/addon/edit/continuelist')
//   require('codemirror/mode/gfm/gfm')
//   require('codemirror/mode/javascript/javascript')
//   require('codemirror/mode/vue/vue')
// }

export default {
  layout: 'admin',
  data() {
    return {
      blogEditorStatus: 'create',
      categories: this.$store.state.categories,
      tags: this.$store.state.tags,
      formData: {
        title: '',
        overView: '',
        content: '',
        category: '',
        tags: [],
        cover: ''
      },
      formRules: {
        title: [{ required: true, message: '标题不能为空', trigger: 'change' }],
        overView: [{ required: true, message: '概述不能为空', trigger: 'change' }]
      },
      toolbars: {
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    }
  },
  created() {
    if (process.client) {
      const blogId = this.$route.query.id
      this.initBlog(blogId)
    }
  },
  mounted() {
    // console.log(this.$route.query)
    // let codeMirrorElement = document.getElementById('codeMirror')
    // CodeMirror.fromTextArea(codeMirrorElement, {
    //   mode: 'gfm',
    //   highlightFormatting: true,
    //   fencedCodeBlockHighlighting: true,
    //   lineNumbers: false,
    //   autoCloseBrackets: true,
    //   matchBrackets: true,
    //   showCursorWhenSelecting: true,
    //   lineWrapping: true,
    //   extraKeys: { Enter: 'newlineAndIndentContinueMarkdownList' }
    // })
  },
  methods: {
    handleEditorChange(value, render) {
      this.initBlog()
    },
    async initBlog(blogId) {
      if (blogId) {
        this.blogEditorStatus = 'update'
        const { data } = await this.$axios.$get(`blogs/${blogId}`)
        data.category = data.category._id || ''
        data.tags = data.tags ? data.tags.map(item => item._id) : []
        this.formData = data
      }
    },
    async saveDataToDraft() {},
    async publishData() {
      if (!this.formData.content) {
        return this.$message({
          message: '文章内容不能为空',
          type: 'warning',
          center: true
        })
      }
      const isValidate = await this.validateForm()
      if (isValidate) {
        if (this.formData.category == '') this.formData.category = null
        let res
        if (this.blogEditorStatus == 'create') {
          res = await this.$axios.$post(`/blogs`, this.formData)
        } else {
          res = await this.$axios.$put(`/blogs/${this.formData._id}`, this.formData)
        }
        if (res && res.success) {
          this.$message({
            type: 'success',
            message: '发布成功!'
          })
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

<style lang="scss">
.blog-create {
  height: 100%;
  & > div {
    height: 100%;
  }
  .editor-container .el-card__body {
    padding: 0px !important;
    height: 100% !important;
  }
  .form-container .el-card__body {
    padding: 10px !important;
    height: 100% !important;
  }
  .v-note-wrapper {
    height: 100%;
    .v-note-op {
      border: none;
      .op-icon {
        appearance: none;
      }
    }
  }
  .v-note-panel {
    height: 0px !important;
    border: none !important;
    border-top: 1px solid #e0e0e0 !important;
    .content-input-wrapper {
      padding: 12px !important;
    }
  }
  .CodeMirror {
    height: 100%;
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;
  }
  .el-upload,
  .el-upload-dragger {
    width: 100%;
  }
}
</style>