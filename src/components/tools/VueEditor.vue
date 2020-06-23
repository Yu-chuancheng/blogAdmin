<template>
  <div>
    <div class="container">
      <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" />
      <el-upload
        id="el_upload"
        action="http://localhost:7001/upload"
        :file-list="fileList"
        :auto-upload="true"
        :show-file-list="false"
        :on-change="uploadResult"
      />
      <el-button v-show="show" class="editor-btn" type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
// import { ImageResize, ImageExtend } from 'quill-image-extend-module'
import ImageResize from "quill-image-resize-module";
Quill.register("modules/imageResize", ImageResize);
export default {
  name: "Editor",
  components: {
    quillEditor
  },
  props: {
    show: {
      type: Boolean,
      default: true
    },
    defaultContent: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      content: this.defaultContent,
      editorOption: {
        placeholder: "Hello World",
        modules: {
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white"
            },
            modules: ["Resize", "DisplaySize", "Toolbar"]
          },
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ["link", "image"],
              ["clean"]
            ],
            handlers: {
              image: value => {
                const node = document.getElementById("el_upload");
                node.childNodes[0].childNodes[0].click();
              }
            }
          }
        }
      },
      fileList: []
    };
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    uploadResult(file) {
      try {
        const imageUrl = file.response.url;
        // 获取富文本组件实例
        const quill = this.$refs.myTextEditor.quill;
        // 如果上传成功
        if (imageUrl) {
          // 获取光标所在位置
          const length = quill.getSelection().index; // 插入图片 res.info为服务器返回的图片地址
          quill.insertEmbed(
            length,
            "image",
            "http://localhost:7001" + imageUrl
          ); // 调整光标到最后
          quill.setSelection(length + 1);
        } else {
          this.$message.error("图片插入失败");
        } // loading动画消失
      } catch (error) {
        this.$message.error(error);
      }
    },
    submit() {
      this.$emit("submit", this.content);
    }
  }
};
</script>
<style scoped>
.editor-btn {
  margin-top: 20px;
}
.quill-editor >>> .ql-editor {
  min-height: 600px;
}
</style>
