<template>
  <div class="container">
    <div class="seachPanel">
      用户名:
      <el-input v-model="username" style="width:180px;" placeholder="用户名"></el-input>
      ID号:
      <el-input v-model="idNum" style="width:180px;" placeholder="ID号"></el-input>
      内容类型：
      <el-select v-model="type" placeholder="内容类型" clearable>
        <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      申请日期：
      <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
        value-format="yyyy-MM-dd yyyy-MM-dd">
      </el-date-picker>
      <el-button style="float:right;margin-left:10px;" @click="reset">重置</el-button>
      <el-button style="float:right;" type="primary" icon="el-icon-search" @click="query">搜索</el-button>

    </div>

    <el-radio-group v-model="state" @change="query" style="margin-bottom: 10px;">
      <el-radio-button label="0">待审核</el-radio-button>
      <el-radio-button label="1">已通过</el-radio-button>
      
     
    </el-radio-group>

    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="username" label="用户名" align="center">
      </el-table-column>
      <el-table-column prop="idNum" label="ID号" align="center">
      </el-table-column>
      <el-table-column prop="type" label="类型" align="center">
      </el-table-column>
      <el-table-column prop="time" label="发布时间" align="center">

      </el-table-column>
      <el-table-column prop="total" label="内容" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="view(scope.row)"> 查看</el-button>
        </template>
      </el-table-column>

      <el-table-column v-if="state>0" prop="auditor" label="审核人" align="center">

      </el-table-column>
      <el-table-column v-if="state>0" prop="auditTime" label="审核时间" align="center">

      </el-table-column>
      <el-table-column v-if="state>1" prop="reason" label="原因" align="center">

      </el-table-column>
      <el-table-column v-if="state<3" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.state == 0" @click="passItem(scope.row)"> 通过</el-button>
          <el-button type="danger" v-if="scope.row.state<2" @click="warming(scope.row)">警告</el-button>
          <el-button type="danger" v-if="scope.row.state<3" @click="frezen(scope.row)">冻结</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @current-change="query" :current-page.sync="currentPage" style="margin-top:10px;margin-left:-10px;float:right;"
      layout="total,  prev, pager, next, jumper" page-size="10" :total="records">
    </el-pagination>

    <el-dialog :title="tit" :visible.sync="isShow" width="30%" center>
      <el-input type="textarea" placeholder="请输入原因" v-model="reasonTxt" rows="10" maxlength="500" show-word-limit></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="submitReason">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Audit',
    data() {
      return {
        isShow: false,
        reasonTxt: '',
        tit: '警告原因',
        username: '',
        idNum: '',
        time: [],
        type: '',
        records: 100,
        types: [{
            value: 0,
            label: '视频'
          }, {
            value: 1,
            label: '图文'
          }, {
            value: 2,
            label: '文章'
          },
          {
            value: 3,
            label: '音频'
          }
        ],
        state: 0,
        currentPage: 1,
        list: [],
        sort: {}
      }
    },
    mounted() {
      this.query();
    },
    methods: {
      passItem(item) {

      },
      warming(item) {
        this.tit = ''
        this.reasonTxt = ''
        this.isShow = true
      },
      frezen(item) {
        this.tit = ''
        this.reasonTxt = ''
        this.isShow = true
      },
      submitReason() {
        this.isShow = false
      },

      reset() {
        this.username = '';
        this.idNum = '';
        this.type = '';
        this.time = [];
      },
      query() {

        let pars = {};
        pars.username = this.username
        pars.currentPage = 1
        if (this.time && this.time.length > 0) {
          pars.startDate = this.time[0]
          pars.endDate = this.time[1]
        }

        this.list = [{
          username: "asdfasd",
          idNum: '123123',
          type: '视频',
          state: this.state,
          time: '20020-02-02',
          auditor: '昨日黄瓜',
          auditTime: "2020-02-02",
          reason: "原因不明"
        }]

      }
    }
  }
</script>
<style>


  .container {
    padding: 10px;

    height: 100%;
  }

  .seachPanel {
    height: 60px;
    padding-top: 10px;
    border: 1px solid #ECECEC;
    background: white;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
</style>
