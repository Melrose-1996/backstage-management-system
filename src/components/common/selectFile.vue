<template>
	<span>
    <label class="el-button el-button--text" for="file">模板导入</label>
    <form>
      <input type="file" style="position:absolute;clip:rect(0 0 0 0);" id="file" :accept="SheetJSFT" @change="_change" />
    </form>
	</span>
</template>
<script>
import XLSX from 'xlsx'
const _SheetJSFT = ['xlsx', 'xls'].map(x => { return '.' + x }).join(',')
export default {
  data () {
    return {
      SheetJSFT: _SheetJSFT,
      allStudentList: []
    }
  },
  props: {
    callback: {
      type: Function,
      required: true
    }
  },
  methods: {
    _change (evt) {
      const files = evt.target.files
      if (!files || !files[0]) return false
      let type = files[0].name.split('.')[1]
      if (type === 'xlsx' || type === 'xls') {
        this._file(files[0])
      } else {
        return this.$message({
          type: 'error',
          message: '必须上传以xlsx或者xls结尾的文件'
        })
      }
    },
    _file (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.allStudentList = []
        const bstr = e.target.result
        const wb = XLSX.read(bstr, {type: 'binary'})
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        const data = XLSX.utils.sheet_to_json(ws, {header: 1})
        let allStudentForClass = {} // 所有学生按班级
        data.forEach((v, i) => { // 整理所有的数据
          if (i > 0) {
            let obj = {}
            obj.studentId = v[0]
            obj.name = v[1]
            obj.sex = v[2] === '男' ? 1 : 2
            obj.idType = v[3] === '身份证' ? 1 : 2
            obj.cardNo = v[4]
            obj.gradeYear = v[5]
            obj.className = v[6]
            obj.amount = v[7]
            obj.tmpStr = obj.gradeYear + '级' + obj.className
            if (!allStudentForClass[obj.tmpStr]) {
              allStudentForClass[obj.tmpStr] = []
            }
            this.allStudentList.push(obj)
            allStudentForClass[obj.tmpStr].push(obj)
          }
        })
        console.log(allStudentForClass, '010101010101')
        this.callback(this.allStudentList, allStudentForClass)
      }
      reader.readAsBinaryString(file)
    }
  }
}
</script>


