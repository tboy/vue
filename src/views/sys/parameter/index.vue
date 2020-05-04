<template>
  <div class="app-container">
   <!-- <div class="filter-container">
      <el-form  ref="dataForm" label-position="left"  label-width="100px" style=''>
        <el-form-item label="循环时间" prop="starNum" style="width: 578px;">
         <el-input style="width: 185px;"  readonly="true"> </el-input>
            <el-button  type="primary" >设置</el-button>
        </el-form-item>
      </el-form>
    </div>-->
    <!-- 表格 -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" stripe border fit highlight-current-row
              style="width: 100%;min-height:100px;">
      <el-table-column align="center" label="名称" min-width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.type|typeFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="星星数(个)" min-width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.starNum}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="转发数(条)" min-width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.forwardNum}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="评论数(个)" min-width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.commentNum}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="完播率(%)" min-width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.finishedNum}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="推送总数(个)" min-width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.pushNum}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="推送关注人数(个)" min-width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.attentionNum}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="推送附近人数(个)" min-width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.nearbyNum}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="推送随机人数(个)" min-width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.randomNum}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="综合权重(%)" min-width="150px">
        <template slot-scope="scope">
          <span >{{scope.row.weights}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" align="center" :label="$t('table.actions')">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="settingDialog(scope.row)">{{$t('base.setting')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 增/改弹窗 -->
    <el-dialog :visible.sync="dialogFormVisible"  v-loading='dialogLoading'>
      <div slot="title" class="dialog-footer">
        <h3 class="full-dialog-title">{{dialogTitle}}</h3>
      </div>

      <el-form :rules="valids" ref="dataForm" label-position="left" :model="form" label-width="150px" style=''>
        <el-form-item label="名称" prop="type">
        <el-select v-model="form.type" placeholder="请选择名称" >
          <el-option
            v-for="item in topicOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>

        <el-form-item label="星星数(个)" prop="starNum">
          <el-input type="text" :rows="2"  class="input-name" v-model="form.starNum"></el-input>
        </el-form-item>

        <el-form-item label="转发数(条)" prop="forwardNum">
          <el-input type="text" :rows="2"  class="input-name" v-model="form.forwardNum"></el-input>
        </el-form-item>

      <el-form-item label="评论个数(个)" prop="percent">
        <el-input type="text" :rows="2"  class="input-name" v-model="form.commentNum"></el-input>
      </el-form-item>

      <el-form-item label="完播率(%)" prop="percent">
        <el-input type="text" :rows="2"  class="input-name" v-model="form.finishedNum"></el-input>
      </el-form-item>
        <el-form-item label="推送总数(个)" prop="percent">
          <el-input type="text" :rows="2"  class="input-name" v-model="form.pushNum"></el-input>
        </el-form-item>

      <el-form-item label="推送关注人数(个)" prop="percent">
        <el-input type="text" :rows="2"  class="input-name" v-model="form.attentionNum"></el-input>
      </el-form-item>
        <el-form-item label="推送附近人数(个)" prop="percent">
          <el-input type="text" :rows="2"  class="input-name" v-model="form.nearbyNum"></el-input>
        </el-form-item>
        <el-form-item label="推送随机人数(个)" prop="percent">
          <el-input type="text" :rows="2"  class="input-name" v-model="form.randomNum"></el-input>
        </el-form-item>
        <el-form-item label="综合权重(%)" prop="percent">
          <el-input type="text" :rows="2"  class="input-name" v-model="form.weights"></el-input>
        </el-form-item>
        </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="handleSetting" :loading="btnLoading">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // 水波纹指令
  import commission from '@/api/commission'

  const typeOptions = [
    { key: '0', display_name: '智能分发' },
    { key: '1', display_name: '综合权重' },
    { key: '2', display_name: '热度权重' },
    { key: '3', display_name: '冷却池' },
    { key: '4', display_name: '刷新周期' }
  ]
  const typeFilter = typeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})
  export default {
    name: 'category',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        listLoading: false,
        btnLoading: false,
        dialogFormVisible: false,
        dialogLoading: false,
        dialogTitle: '推送视频参数修改',
        valids: {
          value: [{ required: true, message: '请输入值' }]
        },
        topicOptions: [
          { value: '0', label: '智能分发' },
          { value: '1', label: '综合权重' },
          { value: '2', label: '热门权重' }
        ],
        form: {
          id: null,
          starNum: null,
          forwardNum: null,
          commentNum: null,
          finishedNum: null,
          pushNum: null,
          type: null,
          attentionNum: null,
          nearbyNum: null,
          randomNum: null,
          weights: null
        }
      }
    },
    filters: {
      typeFilter(type) {
        return typeFilter[type]
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        commission.findaAllParameter().then(response => {
          this.list = response.data
          this.listLoading = false
        }).catch((error) => {
          console.log(error)
          this.listLoading = false
        })
      }, /* addParameter() {
        this.form = {
          id: null,
          starNum: null,
          forwardNum: null,
          commentNum: null,
          finishedNum: null,
          pushNum: null,
          type: null,
          attentionNum: null,
          nearbyNum: null,
          randomNum: null,
          weights: null
        }
        this.dialogFormVisible = true
      },*/
      settingDialog(data) {
        this.form = {
          id: data.id,
          starNum: data.starNum,
          forwardNum: data.forwardNum,
          commentNum: data.commentNum,
          finishedNum: data.finishedNum,
          pushNum: data.pushNum,
          type: data.type,
          attentionNum: data.attentionNum,
          nearbyNum: data.nearbyNum,
          randomNum: data.randomNum,
          weights: data.weights
        }
        this.dialogFormVisible = true
      },
      handleSetting() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            commission.updateParameter(this.form).then((res) => {
              this.dialogFormVisible = false
              this.btnLoading = false
              this.$notify({
                title: '成功',
                message: '设置成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            }).catch((error) => {
              console.log(error)
              this.btnLoading = false
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
