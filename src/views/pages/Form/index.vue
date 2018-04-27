<template>
<div class="app-container">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item :label="$t('form.Activityname')" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item :label="$t('form.Zoneaction')" prop="region">
      <el-select v-model="ruleForm.region" :placeholder="$t('form.SelectAction')">
        <el-option :label="$t('form.RegionalOne')" value="shanghai"></el-option>
        <el-option :label="$t('form.Regionaltwo')" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('form.Activitytime')" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker type="date" :placeholder="$t('form.SelectionData')" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker type="fixed-time" :placeholder="$t('form.SelectionTime')" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item :label="$t('form.Immediate')" prop="delivery">
      <el-switch v-model="ruleForm.delivery"></el-switch>
    </el-form-item>
    <el-form-item :label="$t('form.Activitynature')" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="a" name="type"></el-checkbox>
        <el-checkbox label="b" name="type"></el-checkbox>
        <el-checkbox label="c" name="type"></el-checkbox>
        <el-checkbox label="d" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item :label="$t('form.Resources')" prop="resource">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio label="e"></el-radio>
        <el-radio label="f"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item :label="$t('form.Formactivity')" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">{{$t('form.Creation')}}</el-button>
      <el-button @click="resetForm('ruleForm')">{{$t('form.Reset')}}</el-button>
    </el-form-item>
  </el-form>
  </div>	
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$notify({
              title: '成功',
              message: '创建内容成功',
              type: 'success'
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>