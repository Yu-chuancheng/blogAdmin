<template>
  <div style="padding:30px">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="formInline.name" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="值">
        <el-input v-model="formInline.value" placeholder="值"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" style="margin:20px 0" @click="handleAdd">新增</el-button>
    <el-table :border="true" :data="tableData" style="width: 100%;">
      <el-table-column prop="name" align="center" label="名称"></el-table-column>
      <el-table-column prop="value" label="值"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
          <el-popconfirm title="确定删除吗？" @onConfirm="handleDelete(scope.row)">
            <el-button size="small" type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <systemSet :name="$route.name" ref="model" @close="close"></systemSet>
  </div>
</template>

<script>
import systemSet from "./model/systemModel";
import blogMixins from "@/mixins/blogMixins";
export default {
  components: {
    systemSet
  },
  mixins: [blogMixins],
  data() {
    return {
      tableData: [],
      formInline: {},
      url: {
        list: `${this.firstCodetolower(this.$route.name)}/findAll${
          this.$route.name
        }`,
        removeById: `${this.firstCodetolower(this.$route.name)}/removeById`
        // list: `${this.firstCodetolower(this.$route.name)}/findBy${this.$route.name}`
      }
    };
  }
};
</script>

<style>
</style>