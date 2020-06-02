<template>
  <el-dialog
    :title="title"
    estroy-on-close
    :visible.sync="visible"
    width="80%"
    top="40px"
    :fullscreen="true"
    :close-on-click-modal="false"
    :append-to-body="true"
  >
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="formInline.articleTitle" placeholder="标题" />
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="formInline.articleCategory" placeholder="标签">
          <el-option
            v-for="(item,index) in articleCategory"
            :key="index"
            :label="item.name"
            :value="item.value+''"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="专栏">
        <el-select v-model="formInline.articleColumn" placeholder="专栏">
          <el-option
            v-for="(item,index) in articleColumn"
            :key="index"
            :label="item.name"
            :value="item.value+''"
          />
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="图片">
        <el-upload
          ref="upload"
          class="upload-demo"
          action="http://localhost:7001/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture-card"
          :auto-upload="false"
          :limit="1"
          :on-change="uploadResult"
        >
          <el-button v-show="fileList.length<1" slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </el-form-item>
    </el-form>
    <VueEditor
      ref="vue_editor"
      :key="contents"
      :default-content="formInline.articleContent"
      :show="false"
      @submit="editorResult"
    />

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import request from '@/utils/request'
import VueEditor from '@/components/tools/VueEditor'
export default {
  name: 'ArticleModel',
  components: {
    VueEditor
  },
  data() {
    return {
      formInline: {
        articleTitle: '',
        articleColumn: '',
        articleCategory: ''
      },
      articleCategory: [],
      articleColumn: [],
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      contents: false,
      visible: false,
      title: '查看',
      url: {
        edit: 'article/edit'
      }
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    edit(row) {
      this.formInline = row
    },
    async handleOk() {
      this.visible = false
      this.formInline.articleContent = this.$refs.vue_editor.content
      // eslint-disable-next-line no-unused-vars
      const result = await request.post(this.url.edit, this.formInline)
    },
    reload() {
      this.formInline = {
        articleTitle: '',
        articleColumn: '',
        articleCategory: ''
      }
      this.articleCategory = []
      this.articleColumn = []
      this.contents = !this.contents
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 加载专栏列表
    async getDict() {
      const category = await request({
        url: 'category/findAllCategory',
        method: 'get'
      })
      const column = await request({
        url: 'column/findAllColumn',
        method: 'get'
      })
      this.articleCategory = category.result
      this.articleColumn = column.result
    },
    async editorResult(articleContent) {
      const data = Object.assign({ articleContent }, this.formInline)
      const res = await request({
        url: 'article/add',
        method: 'post',
        data
      })
      if (res) {
        this.$message.success('提交成功！')
        this.reload()
        return
      }
      this.$message.error('提交失败')
    },
    uploadResult(file) {
      try {
        const imageName = file.name
        const imageUrl = file.response.url
        const imageUid = file.uid
        const imageInfo = { name: imageName, url: imageUrl, uid: imageUid }
        const Object = Object.assign(
          { articleContent: this.articleContent },
          imageInfo
        )
        this.editorResult(Object)
      } catch (error) {
        this.$message.error(error)
      }
    },
    submitUpload(articleContent) {
      this.articleContent = articleContent
      this.$refs.upload.submit()
    }
  }
}
</script>

<style>
.dialog-footer {
  bottom: 20px;
  position: absolute;
  right: 20px;
}
</style>
