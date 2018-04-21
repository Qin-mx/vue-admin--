<template>
    <div  @click="handleUpload">
        <input id="excel-upload-input" type="file" accept=".xlsx, .xls" class="c-hide" @change="handleFileChange">
        <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em @click="handleUpload">点击上传</em></div>
        </div>
    </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  data() {
    return {
      excelData: {
        header: null,
        results: null
      }
    }
  },
  methods: {
    generateDate({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results
      this.$emit('on-selected-file', this.excelData)
    },
    handleDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('Only support uploading one file!')
        return
      }
      const itemFile = files[0] // only use files[0]
      this.readerData(itemFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload() {
      document.getElementById('excel-upload-input').click()
    },
    handleFileChange(e) {
      const files = e.target.files
      const itemFile = files[0] // only use files[0]
      this.readerData(itemFile)
    },
    readerData(itemFile) {
      const reader = new FileReader()
      reader.onload = e => {
        const data = e.target.result
        const fixedData = this.fixdata(data)
        const workbook = XLSX.read(btoa(fixedData), { type: 'base64' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const header = this.get_header_row(worksheet)
        const results = XLSX.utils.sheet_to_json(worksheet)
        this.generateDate({ header, results })
      }
      reader.readAsArrayBuffer(itemFile)
    },
    fixdata(data) {
      let o = ''
      let l = 0
      const w = 10240
      for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    },
    get_header_row(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
        var hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    }
  }
}
</script>

<style lang="scss" scoped>
#excel-upload-input{
    display: none;
}
.drop{
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    box-sizing: border-box;
    width: 360px;
    height: 180px;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin:0 auto;
     .el-icon-upload {
        font-size: 67px;
        color: #c0c4cc;
        margin: 40px 0 16px;
        line-height: 50px;
     }
     .el-upload__text {
        color: #606266;
        font-size: 14px;
        text-align: center;
        em {
            color: #409eff;
            font-style: normal;
        }
     }
}
</style>

