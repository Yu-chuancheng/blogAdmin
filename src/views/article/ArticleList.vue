<template>
  <el-table :data="tableData" style="width: 100%;margin:30px">
    <el-table-column prop="articleTitle" align="center" label="标题" />
    <el-table-column align="center" label="类别">
      <template
        slot-scope="scope"
      >{{ articleCategory.find(i=>{return i.value == scope.row.articleCategory })?articleCategory.find(i=>{return i.value == scope.row.articleCategory }).name:scope.row.articleCategory }}</template>
    </el-table-column>
    <el-table-column prop="articleColumn" align="center" label="专栏">
      <template
        slot-scope="scope"
      >{{ articleColumn.find(i=>{return i.value == scope.row.articleColumn })?articleColumn.find(i=>{return i.value == scope.row.articleColumn }).name:scope.row.articleColumn }}</template>
    </el-table-column>
    <el-table-column align="center" label="创建时间">
      <template slot-scope="scope">{{ DateFormat(scope.row.date) }}</template>
    </el-table-column>
    <el-table-column align="center" label="更新时间">
      <template slot-scope="scope">{{ DateFormat(scope.row.updateTime) }}</template>
    </el-table-column>
    <el-table-column align="center" label="操作">
      <template slot-scope="scope">
        <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
        <!-- <el-popconfirm title="确定删除吗？"> -->
        <el-button
          slot="reference"
          size="small"
          type="danger"
          @click="handleDelete(scope.row)"
        >删除</el-button>
        <!-- @onConfirm="handleDelete(scope.row)" -->
        <!-- </el-popconfirm> -->
      </template>
    </el-table-column>
    <article-model ref="model" @close="close" />
  </el-table>
</template>

<script>
import articleModel from '@/views/article/model/Article'
import blogMixins from '@/mixins/blogMixins'
import request from '@/utils/request'
export default {
  components: { 'article-model': articleModel },
  mixins: [blogMixins],
  data() {
    return {
      tableData: [],
      url: {
        list: 'article/findAll',
        removeById: 'article/removeById'
      },
      articleCategory: [],
      articleColumn: []
    }
  },
  created: function() {
    this.getDict()
    this.loadData()
  },
  methods: {
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
    }
  }
}
</script>
