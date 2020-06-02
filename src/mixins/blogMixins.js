import request from '@/utils/request'
const blogMixins = {
  data() {
    return {
      tableData: [],
      formInline: {},
      skip: 1
    }
  },
  created: function() {
    this.loadData()
  },
  methods: {
    onSubmit() {
      this.loadData(1)
    },
    close() {
      this.loadData(1)
    },
    DateFormat(date) {
      date = new Date(date)
      let ret
      let fmt = 'YYYY-mm-dd HH:MM:SS'
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString() // 秒
      }
      for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        }
      }
      return fmt
    },
    async loadData(arg) {
      if (!this.url || !this.url.list) {
        this.$message.error('this.url.list不存在')
        return
      }
      if (arg) {
        this.skip = 1
      }
      // skip: this.skip
      const params = Object.assign({}, this.formInline)
      console.log(params)
      const result = await request({ url: this.url.list, method: 'get', params: params })
      // console.log(result)
      this.tableData = result.result
    },
    handleEdit(row) {
      this.$refs.model.visible = true
      this.$refs.model.edit(row)
      this.$refs.model.title = '编辑'
    },
    handleAdd() {
      this.$refs.model.visible = true
      this.$refs.model.add()
      this.$refs.model.title = '添加'
    },
    // handleEditSee() {
    //   this.$refs.model.visible = true
    //   this.$refs.model.see(row)
    //   this.$refs.model.title = '查看'
    // },
    async handleDelete(row) {
      const result = await request({ url: this.url.removeById, method: 'get', params: { _id: row._id }})
      if (result) {
        this.$message.success(result.message)
      }
      this.loadData(1)
    },
    firstCodetolower(code) {
      const arr = code.split('')
      let text = ''
      arr[0] = arr[0].toLowerCase()
      arr.forEach(i => {
        text = text + i
      })
      return text
    }
  }
}
export default blogMixins
