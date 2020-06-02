<template>
  <div>
    <div class="container">
      <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" />
      <el-button v-show="show" class="editor-btn" type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'Editor',
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
      default: ''
    }
  },
  data: function() {
    return {
      content: this.defaultContent,
      editorOption: {
        placeholder: 'Hello World'
      }
    }
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      this.content = html
    },
    submit() {
      this.$emit('submit', this.content)
    }
  }
}
</script>
<style scoped>
.editor-btn {
  margin-top: 20px;
}
.quill-editor >>> .ql-editor {
  min-height: 600px;
}
</style>
