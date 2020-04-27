<template>
  <div class="container">
    <div class="seachPanel">
      企业类型：
      <el-select v-model="type" @change="query" style="width:100px">
        <el-option label="商家" value='0'></el-option>
        <el-option label="供应商" value='1'></el-option>
      </el-select>
      ID号:
      <el-input v-model="youduNum" style="width:100px;" placeholder="ID号"></el-input>
      申请日期：
      <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
        value-format="yyyy-MM-dd">
      </el-date-picker>

      <template v-if='state>0'>
        审核人:
        <el-input v-model="reviewer" style="width:100px;" placeholder=" 审核人"></el-input>

        审核日期：
        <el-date-picker v-model="time2" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </template>
      <el-button style="float:right;margin-left:10px;" @click="reset">重置</el-button>
      <el-button style="float:right;" type="primary" icon="el-icon-search" @click="query">搜索</el-button>

    </div>

    <el-radio-group v-model="state" @change="query" style="margin-bottom: 10px;">
      <el-radio-button label="0">待审核</el-radio-button>
      <el-radio-button label="1">已通过</el-radio-button>
      <el-radio-button label="2">已拒绝</el-radio-button>
      <el-radio-button label="3">即将到期</el-radio-button>

    </el-radio-group>

    <el-table :data="list" border style="width: 100%">
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          {{scope.row.usersVo?scope.row.usersVo.nickname:''}}
        </template>
      </el-table-column>
      <el-table-column prop="" label="ID号" align="center">
        <template slot-scope="scope">
          {{scope.row.usersVo?scope.row.usersVo.youduNum:''}}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="申请时间" align="center">
      </el-table-column>
      <el-table-column prop="name" label="机构名称" align="center">
      </el-table-column>
      <el-table-column prop="payFlag" label="缴费情况" align="center">
        <template slot-scope="scope">
          {{scope.row.payFlag==0?'未缴费':(scope.row.payFlag==1?'已缴费 200/年':'已退款')}}
        </template>
      </el-table-column>

      <el-table-column v-if="state==1 || state==3" prop="limitTime" label="有效时段" align="center">

      </el-table-column>
      <el-table-column v-if="state>0" label="审核人" align="center">
        <template slot-scope="scope">
          {{scope.row.reviewUser?scope.row.reviewUser.username:''}}
        </template>
      </el-table-column>
      <el-table-column v-if="state>0" prop="reviewdate" label="审核时间" align="center">

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
      <el-form style="width:80%;margin:auto;" label-position='left' ref="form" :model="form" label-width="150px">
        <div style="font-size: 17px;margin: 20px 0;font-weight: bold;">基本信息</div>
        <el-form-item label="用户名:">
          {{this.form.usersVo.nickname}}
        </el-form-item>
        <el-form-item label="手机号:">
          {{this.form.usersVo.username?this.form.usersVo.username:''}}
        </el-form-item>
        <el-form-item label="ID号:">
          {{this.form.usersVo.youduNum}}
        </el-form-item>
        <div style="border-bottom: 1px dashed #dedede;width:100%;"></div>
        <div style="font-size: 17px;margin: 20px 0;font-weight: bold;">机构实名认证</div>
        <el-form-item label="缴费情况:">
          {{this.form.payFlag==0?'未缴费':(this.form.payFlag==1?'已缴费 200/年':'已退款')}}
        </el-form-item>
        <el-form-item label="申请状态:">
          {{this.states[this.form.status]}}
        </el-form-item>
        <el-form-item label="机构名称:">
          {{this.form.name}}
        </el-form-item>
        <el-form-item v-if="state==1 || state==3 " label="有效时段:">
          {{this.form.limitTime}}
          <el-button v-if="state==3" @click='isShow3=true'>发送到期提醒</el-button>
        </el-form-item>

        <el-form-item label="缴费凭证:">

          <el-image style="width: 200px; height: 100px" :src="this.form.imgServer+this.form.payImg">
          </el-image>
        </el-form-item>
        <div style="font-size: 17px;margin: 20px 0;font-weight: bold;">证件资料</div>
        <el-form-item label="营业执照:">
          <el-image style="width: 200px; height: 100px" :src="this.form.imgServer+this.form.licenseImg">
          </el-image>
        </el-form-item>

        <el-form-item label="统一社会信用代码:">
          {{this.form.creditCode}}
        </el-form-item>
        <el-form-item label="法人身份证正面:">
          <el-image style="width: 200px; height: 100px" :src="this.form.imgServer+this.form.idcardImg1">
          </el-image>
        </el-form-item>
        <el-form-item label="法人身份证背面:">
          <el-image style="width: 200px; height: 100px" :src="this.form.imgServer+this.form.idcardImg2">
          </el-image>
        </el-form-item>
        <el-form-item label="店铺正面照:" v-if='type==0'>
          <el-image style="width: 200px; height: 100px" :src="this.form.imgServer+this.form.shopImg">
          </el-image>
          <br>
          注：仅限实体店商家上传，店铺招牌清晰可见
        </el-form-item>

        <div style="font-size: 17px;margin: 20px 0;font-weight: bold;">联系信息</div>
        <el-form-item label="联系人:">
          {{type==0?this.form.contacts:this.form.contacts}}
        </el-form-item>
        <el-form-item label="联系电话:">
          {{type==0?this.form.contactsPhone:this.form.contactPhone}}
        </el-form-item>
        <el-form-item label="联系地址:">
          {{this.form.address}}
        </el-form-item>
        <el-form-item label="邮箱:">
          {{this.type==0?this.form.email:this.form.mailbox}}
        </el-form-item>




      </el-form>
      <div v-if="state>0" style="border-bottom: 1px dashed #dedede;width:80%;margin:auto;"></div>
      <el-card v-if="state>0" class="box-card" style="width:80%;margin:auto;margin-top:10px;">
        <div slot="header" class="clearfix">
          <span>审核人：{{form.reviewUser.username}}</span>
          <span style="float: right; padding: 3px 0" type="text">审核时间：{{form.reviewdate}}</span>
        </div>
        <div class="text item">
          {{form.reason}}
        </div>
      </el-card>

      <span v-if='state==0' slot="footer" class="dialog-footer">
        <el-button @click="isShow2=true">拒 绝</el-button>
        <el-button type="primary" @click="pass">通 过</el-button>
      </span>
    </el-dialog>


    <el-dialog title="拒绝原因" :visible.sync="isShow2" width="30%" center>
      <el-input type="textarea" placeholder="请输入拒绝原因" v-model="reasonTxt" rows="10" maxlength="500" show-word-limit></el-input>
      <span v-if='state==0' slot="footer" class="dialog-footer">
        <el-button @click="isShow2 = false">取 消</el-button>
        <el-button type="primary" @click="noPass">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="发送到期信息" :visible.sync="isShow3" width="30%" center>
      <el-input type="textarea" placeholder="请输入发送信息" v-model="reasonTxt" rows="10" maxlength="500" show-word-limit></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow3 = false">取 消</el-button>
        <el-button type="primary" @click="send">发 送</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    getEnterpriseListt,
    getSupplierList,
    approvalEnterprise,
    approvalSupplier
  } from '@/api/organaudit.js'
  export default {
    name: 'Audit',
    data() {

      return {
        type: '0',
        states: ['待审核', '已通过', '已拒绝'],
        youduNum: '',
        reviewer: '',
        time2: [],
        time: [],
        records: 0,
        state: 0,
        currentPage: 1,
        list: [],
        isShow: false,
        isShow2: false,
        isShow3: false,
        reasonTxt: '',
        form: {
          usersVo: {
            'nickName': ''
          },
		   reviewUser:{'truename':''},
          id: '',
          username: '',
          idCard: '',
          state: '',
          truename: '',
          auditor: '昨日黄瓜',
          auditTime: '2020-02-02 11:12',
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
      send(){

      },
      noPass() {

        var pars = {};
        pars.id = this.form.id
        pars.status = 2
        pars.reason = this.reasonTxt
        if (this.type == 0) {
          approvalEnterprise(pars).then(res => {
           this.isShow = false;
           this.isShow2 = false;
            this.query();
          }).catch(err => {

          })
        } else {
          approvalSupplier(pars).then(res => {
            this.isShow = false;
            this.isShow2 = false;
            this.query();
          }).catch(err => {

          })
        }

      },
      pass() {
        var pars = {};
        pars.id = this.form.id
        pars.status = 1
        if (this.type == 0) {
          approvalEnterprise(pars).then(res => {
            this.isShow = false;
            this.query();
          }).catch(err => {

          })
        } else {
          approvalSupplier(pars).then(res => {
            this.isShow = false;
            this.query();
          }).catch(err => {

          })
        }

      },
      query() {
        let pars = {};
        pars.youduNum = this.youduNum
        pars.status = this.state
        pars.currentPage = this.currentPage
        if(this.reviewer && this.reviewer == ''){

        }
        if(this.reviewer &&　this.reviewer　!= '') {
          pars.reviewUser = {
            truename: this.reviewer
          }
        }

        if (pars.status == '3') {
          pars.limitFlag = 1
        }

        if (this.time && this.time.length > 0) {
          pars.searchStarttime = this.time[0] + " 00:00:00"
          pars.searchEndtime = this.time[1] + " 00:00:00"
        }
        if (this.time2 && this.time2.length > 0) {
          pars.reviewUser.searchStarttime = this.time2[0] + " 00:00:00"
          pars.reviewUser.searchEndtime = this.time2[1] + " 00:00:00"
        }

        if (this.type == '0') {
          getEnterpriseListt(pars).then(res => {
            this.list = res.data
            this.records = res.records
          }).catch(err => {
            console.log(err)
          })
        } else {
          getSupplierList(pars).then(res => {
            this.list = res.data
            this.records = res.records
          }).catch(err => {
            console.log(err)
          })
        }

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
