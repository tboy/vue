<template>
  <div class="container">
    <div class="seachPanel">

      ID号:
      <el-input v-model="youduNum" style="width:180px;" placeholder="ID号"></el-input>
      申请日期：
      <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
        value-format="yyyy-MM-dd">
      </el-date-picker>
      <template v-if='states>0'>
        审核人:
        <el-input v-model="reviewer" style="width:180px;" placeholder=" 审核人"></el-input>

        审核日期：
        <el-date-picker v-model="time2" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </template>
      <el-button style="float:right;margin-left:10px;" @click="reset">重置</el-button>
      <el-button style="float:right;" type="primary" icon="el-icon-search" @click="query">搜索</el-button>

    </div>

    <el-radio-group v-model="states" @change="query" style="margin-bottom: 10px;">
      <el-radio-button label="0">待审核</el-radio-button>
      <el-radio-button label="1">已通过</el-radio-button>
      <el-radio-button label="2">已拒绝</el-radio-button>
    </el-radio-group>

    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="nickName" label="用户名" align="center">
        <template slot-scope="scope">
          {{scope.row.users.nickname}}
        </template>
      </el-table-column>
      <el-table-column label="ID号" align="center">
        <template slot-scope="scope">
          {{scope.row.users.youduNum}}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="申请时间" align="center">
      </el-table-column>

      <el-table-column v-if="states>0" prop="reviewer" label="审核人" align="center">
        <template slot-scope="scope">
          {{scope.row.reviewUser?scope.row.reviewUser.username:''}}
        </template>
      </el-table-column>
      <el-table-column v-if="states>0" prop="reviewTime" label="审核时间" align="center">

      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="show(scope.row)"  plain size="mini"> 查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @current-change="query" :current-page.sync="currentPage" style="margin-top:10px;margin-left:-10px;float:right;"
      layout="total,  prev, pager, next, jumper" :page-size=10 :total="records">
    </el-pagination>


    <el-dialog title="查看详情" :visible.sync="isShow" width="60%" center>
      <el-form style="width:80%;margin:auto;" label-position='left' ref="form" :model="form" label-width="120px">
        <div style="font-size: 17px;margin: 20px 0;font-weight: bold;">基本信息</div>
        <el-form-item label="用户名:">
          {{this.form.users.nickname}}
        </el-form-item>
        <el-form-item label="手机号:">
          {{this.form.users.username}}
        </el-form-item>
        <el-form-item label="ID号">
          {{this.form.youduNum}}
        </el-form-item>
        <div style="border-bottom: 1px dashed #dedede;width:100%;"></div>
        <div style="font-size: 17px;margin: 20px 0;font-weight: bold;">实名认证</div>
        <el-form-item label="真实姓名:">
          {{this.form.trueName}}
        </el-form-item>
        <el-form-item label="身份证号码:">
          {{this.form.idCard}}
        </el-form-item>
        <el-form-item label="实名认证状态:">
          {{this.statesArr[this.form.status]}}
        </el-form-item>
        <el-form-item label="实名认证照片:">
          <div style="width:200px;float:left;margin-right:20px;text-align: center;">


            <el-image style="width: 200px; height: 100px" :src="this.form.imgServer+this.form.openImage">
            </el-image>
            身份证正面
          </div>
          <div style="width:200px;float:left;margin-right:20px;text-align: center;">
            <el-image style="width: 200px; height: 100px" :src="this.form.imgServer+this.form.backImage">
            </el-image>
            身份证背面
          </div>
          <div style="width:200px;float:left;margin-right:20px;text-align: center;">
            <el-image style="width: 200px; height: 100px" :src="this.form.imgServer+this.form.handImage">
            </el-image>
            手持身份证
          </div>
        </el-form-item>



      </el-form>
      <div v-if="states>0" style="border-bottom: 1px dashed #dedede;width:80%;margin:auto;"></div>
      <el-card v-if="states>0" class="box-card" style="width:80%;margin:auto;margin-top:10px;">
        <div slot="header" class="clearfix">
          <span>审核人：{{form.reviewUser.username}}</span>
          <span style="float: right; padding: 3px 0" type="text">审核时间：{{form.reviewTime}}</span>
        </div>
        <div class="text item">
          {{form.reason}}
        </div>
      </el-card>

      <span v-if='states==0' slot="footer" class="dialog-footer">
        <el-button @click="isShow2=true">拒 绝</el-button>
        <el-button type="primary" @click="pass">通 过</el-button>
      </span>
    </el-dialog>


    <el-dialog title="拒绝原因" :visible.sync="isShow2" width="30%" center>
      <el-input type="textarea" placeholder="请输入拒绝原因" v-model="reasonTxt" rows="10" maxlength="500" show-word-limit></el-input>
      <span v-if='states==0' slot="footer" class="dialog-footer">
        <el-button @click="isShow2 = false">取 消</el-button>
        <el-button type="primary" @click="noPass">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    getVerifiedList,
    checkVerified
  } from '@/api/personalaudit.js'
  export default {
    name: 'Audit',
    data() {

      return {
        statesArr: ['待审核', '已通过', '已拒绝'],
        youduNum: '',
        reviewer: '',
        time2: [],
        time: [],
        records: 0,
        states: 0,
        currentPage: 1,
        list: [],
        isShow: false,
        isShow2: false,
        reasonTxt: '',
        form: {
          id: '',
          users: {
            nickname: ''
          },
          reviewUser: {
            username: ''
          },
          nickname: '',
          youduNum: '',
          idCard: '',
          states: '',
          truename: '',
          reviewer: '昨日黄瓜',
          reviewTime: '2020-02-02 11:12',
          reason: '无理由',
          phone: '',
          img1: '',
          img2: '',
          img3: '',
          srcList: []
        }
      }
    },
    mounted() {
      this.query();
    },
    methods: {
      show(item) {
        this.form = item

        this.isShow = true
      },
      reset() {

        this.youduNum = '';
        this.reviewer = '';
        this.time = [];
        this.time2 = [];
      },
      noPass() {
        this.form.id
        if (this.reasonTxt == '') {
          alert('请输入原因')
          return
        }

        var pars = {}
        pars.id = this.form.id
        pars.status = 2
        pars.reason = this.reasonTxt
        checkVerified(pars).then(res => {
          this.isShow = false;
          this.isShow2 = false;
          this.query()
        }).catch((err) => {
          console.log(err)
        })

      },
      pass() {
        var pars = {}
        pars.id = this.form.id
        pars.status = 1
        checkVerified(pars).then(res => {
          this.isShow = false
          this.query()
        }).catch((err) => {
          console.log(err)
        })

      },
      query() {

        let pars = {};
        pars.youduNum = this.youduNum
        pars.status = this.states
        pars.currentPage = this.currentPage
        pars.reviewUser = {
          truename: this.reviewer
        }

        if (this.time && this.time.length > 0) {
          pars.searchStarttime = this.time[0] + " 00:00:00"
          pars.searchEndtime = this.time[1] + " 00:00:00"
        }
        if (this.time2 && this.time2.length > 0) {
          pars.reviewUser.searchStarttime = this.time2[0] + " 00:00:00"
          pars.reviewUser.searchEndtime = this.time2[1] + " 00:00:00"
        }

        getVerifiedList(pars).then(res => {
          console.log(res)
          this.list = res.data
          this.records = res.records
        }).catch((err) => {
          console.log(err)
        })

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
