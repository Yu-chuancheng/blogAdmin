<template>
  <div>
    <el-dialog
      :title="title"
      estroy-on-close
      :visible.sync="visible"
      width="50%"
      top="40px"
      :fullscreen="false"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formInline.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="值">
          <el-input v-model="formInline.value" placeholder="值"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      title: "",
      visible: false,
      formInline: {},
      url: {
        edit: `${this.firstCodetolower(this.name)}/edit`,
        add: `${this.firstCodetolower(this.name)}/add`
      }
    };
  },
  methods: {
    add() {
      this.edit({});
    },
    edit(row) {
      this.formInline = row;
    },
    async handleOk() {
      this.visible = false;
      let url = this.formInline._id ? this.url.edit : this.url.add;
      if (this.formInline._id) {
        const result = await request.post(url, this.formInline);
      } else {
        const result = await request.post(url, this.formInline);
      }
      this.$emit("close");
    },
    firstCodetolower(code) {
      let arr = code.split("");
      let text = "";
      arr[0] = arr[0].toLowerCase();
      arr.forEach(i => {
        text = text + i;
      });
      return text;
    }
  }
};
</script>

<style>
</style>