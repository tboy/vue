<template>
  <div class="container">

    <el-form style="width:80%;margin:auto;" label-position="left" ref="form" :model="form" label-width="120px">
      <div style="font-size: 17px;margin: 20px 0;font-weight: bold;">1.产品基本信息</div>

      <el-form-item label="产品名称:">
        <el-input v-model="form.name" placeholder="请输入内容" maxlength="10" show-word-limit style="width:500px;"></el-input>

      </el-form-item>
      <el-form-item label="产品副标题:">
        <el-input v-model="form.subName" placeholder="请输入内容" maxlength="30" show-word-limit style="width:500px;"></el-input>
      </el-form-item>
      <el-form-item label="产品分类:">
        <el-select v-model="form.categoryId1" @change="changeCategory" placeholder="请选择" style="width:250px;float:left;margin-right:20px;">
          <el-option v-for="item in category1" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-select v-model="form.categoryId" placeholder="请选择" style="width:250px;">
          <el-option v-for="item in category2" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品规格:">
        <div class="row" v-for="(item,idx) in form.goodsSpecifications">
          <el-upload :before-upload="selImg" :id="'s_'+idx" class="avatar-uploader" style="width:178px;" :action="uploadPath"
            :show-file-list="false" :on-success="upload">

            <img v-if="item.url" :src="item.url" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

          <div>
            规格：
            <el-input type="text" v-model="item.name" placeholder="请输入规格" style="width:100px;float:right;"></el-input>
          </div>
          <div>
            销售价：
            <el-input type="number" v-model="item.retailPrice" placeholder="请输入销售价" style="width:110px;float:right;"></el-input>
          </div>
          <div>
            显示价：
            <el-input type="number" v-model="item.commission" placeholder="请输入显示价" style="width:110px;float:right;"></el-input>
          </div>
          <div>
            数量：
            <el-input type="number" v-model="item.inventory" placeholder="请输入数量" style="width:130px;float:right;"></el-input>
          </div>

          <div style="float:right;  margin-right:0px;margin-top:119px;" v-if="isSave">
            <el-button plain size="mini" @click="delRow(idx)">删除</el-button>
            <el-button plain size="mini" @click="addRow">增加</el-button>
          </div>
        </div>
        <br />

      </el-form-item>
      <el-form-item label="产品图片:">
        <div style="width:100%;height: 192px;">
          <div v-for="(item,idx) in form.goodsImgs" style="width:178px;float:left;margin-right:20px;">
            <i v-if="item.url" class="el-icon-close" @click="delImg()" :id="idx" style="margin-left:174px;height: 13px;width: 13px;color: white;background: #1890ff;cursor:pointer;border-radius: 100%;position: absolute;top:-10px;"></i>
            <el-upload :before-upload="selImg" :id="idx" class="avatar-uploader" :action="uploadPath" :show-file-list="false"
              :on-success="upload">
              <div v-if="item.url">
                <img :src="item.url" class="avatar" />
              </div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>

      </el-form-item>


      <div style="font-size: 17px;margin: 20px 0;font-weight: bold;">2.产品设置</div>
      <!-- <el-form-item label="物流:">
        <el-checkbox-group v-model="form.isTake">
          <el-checkbox label="自提" value="1" name="isTake"></el-checkbox>
        </el-checkbox-group>
        <el-form-item label="自提地址:">
          <el-input v-model="form.address" placeholder="请输入内容"></el-input>
        </el-form-item>
        <div style="height:10px;"></div>
        <el-form-item label="营业时间:">
          <el-input v-model="form.takeTime" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-checkbox-group v-model="form.isLeg">
          <el-checkbox label="是否支持跑腿" value="1" name="isLeg"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="技术参数:">
        <tinymce :height="450" v-model="form.technicalPars"></tinymce>上传1张图片产品信息，图片尺寸：1334x667px，图片大小不能超过800K。
      </el-form-item>-->

      <el-form-item label="详情:">
        <tinymce :height="450" v-model="form.goodsDetail"></tinymce>
      </el-form-item>

      <div style="font-size: 17px;margin: 20px 0;font-weight: bold;">
        <!-- 3.产品其它信息 -->
      </div>
      <!-- <el-form-item label="上架时间:">
        <el-radio-group v-model="form.upType">
          <el-radio label="0">立即上架</el-radio>
          <el-radio label="1">放入仓库</el-radio>
        </el-radio-group>
      </el-form-item> -->

      <el-form-item v-if="isSave" label>
        <el-button plain @click="save" style="float:right;">保存</el-button>
      </el-form-item>

      <el-form-item v-if="isAudit" label>
        <el-button plain @click="isShow2=true" style="float:right;">不通过</el-button>
        <el-button plain @click="audit(1)" style="float:right;margin-right:10px;">通过</el-button>
      </el-form-item>

      <div v-if="form.status>1" style="border-bottom: 1px dashed #dedede;width:80%;margin:auto;"></div>
      <el-card v-if="form.status>1" class="box-card" style="width:80%;margin:auto;margin-top:10px;">
        <div slot="header" class="clearfix">
          <span>审核人：{{form.reviewUser.username}}</span>
          <span style="float: right; padding: 3px 0" type="text">审核时间：{{form.reviewdate}}</span>
        </div>
        <div class="text item">{{form.reason}}</div>
      </el-card>
    </el-form>

    <el-dialog title="拒绝原因" :visible.sync="isShow2" width="30%" center :modal="false">
      <el-input type="textarea" placeholder="请输入拒绝原因" v-model="reasonTxt" rows="10" maxlength="500" show-word-limit></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow2 = false">取 消</el-button>
        <el-button type="primary" @click="audit(2)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Tinymce from "@/components/Tinymce";
  import {
    findAllCategoryMargin,
    addGoods,
    auditGoods,
    delSpecification
  } from "@/api/categorymargin.js";
  import {
    imgPath
  } from '@/utils/imgUploadPath'
  export default {
    name: "Edit",
    components: {
      Tinymce
    },
    props: {
      callback: Function
    },
    data() {
      return {

        time: null,
        isSave: true,
        init: false,
        isAudit: false,
        isShow2: false,
        reasonTxt: "",
        uploadPath: imgPath,
        category1: [],
        category2: [],
        imgIdx: null,
        form: {
          avac: '',
          shopId: null,
          categoryId1: null,
          categoryId: null,
          name: "",
          subName: "",
          goodsImgs: [],
          isSales: 0,
          goodsSpecifications: [],
          goodsWeight: "",
          isTake: 0,
          address: "",
          takeTime: "",
          isPostage: 1,
          isLeg: 0,
          technicalPars: "",
          goodsDetail: "",
          upType: null
        }
      };
    },
    mounted() {
      let goodsImgs = [];
      for (let i = 0; i < 5; i++) {
        let item = {};
        item.url = null;
        item.path = "";
        goodsImgs.push(item);
      }
      this.form.goodsImgs = goodsImgs;
      this.form.goodsSpecifications = [{
        name: "",
        retailPrice: "",
        commission: "",
        inventory: "",
        img: null,
        url: null
      }];
      findAllCategoryMargin().then(res => {
        this.category1 = res.data;
        if (!this.init) {
          this.form.categoryId1 = res.data[0].id;
          this.changeCategory();
        }
      });
    },
    methods: {
      initView(item) {
        item = JSON.parse(JSON.stringify(item));
        this.form.name = item.name;
        this.form = item;
        this.form.isLeg = item.isLeg == 1;
        this.form.isTake = item.isTake == 1;
        this.form.isSales = item.isSales == 1;
        this.form.goodsImgs = [];
        for (var i = 0; i < 5; i++) {
          var temp = item.goodsPicList[i]
          if (temp) {
            temp.url = temp.imgServer + temp.fileaddr;

          } else {
            temp = {
              url: null,
              fileaddr: null
            };
          }
          this.form.goodsImgs[i] = temp;
        }
        this.form.goodsImgs.sort();
        this.form.goodsSpecifications = item.specificationsList;
        this.form.goodsSpecifications.map(item => {
          item.url = item.imgServer + item.img;
        });
        this.form.categoryId = parseInt(item.categoryMarginVo.id);
        this.form.categoryId1 = parseInt(item.categoryMarginVo.categoryMargin.id);

        this.update();
      },
      setEdit(item) {
        this.isSave = true;
        this.isAudit = false;
        this.isShow2 = false;
        this.init = false;
        this.initView(item);
      },
      show(item) {
        this.isSave = false;
        this.isAudit = false;
        this.isShow2 = false;
        this.init = true;
        this.initView(item);
      },
      setAudit(item) {
        this.init = true;
        this.isSave = false;
        this.isAudit = true;
        this.isShow2 = false;
        this.initView(item);
      },
      audit(status) {
        let pars = {};
        pars.id = this.form.id;
        pars.status = status;
        pars.reason = this.reasonTxt;
        auditGoods(pars).then(res => {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.$props.callback();
        });
      },
      save() {

        let pars = JSON.parse(JSON.stringify(this.form));
        if (pars.name == "") {
          this.$message({
            message: "请输入产品名称",
            type: "warning"
          });
          return;
        }
        if (pars.subName == "") {
          this.$message({
            message: "请输入产品副标题",
            type: "warning"
          });
          return;
        }
        let isNull = 0;
        var arr = [];
        pars.goodsImgs.map(item => {
          if (item.updateId == null && item.url == null) {

          } else {
            arr.push(item);
          }
        });
        pars.goodsImgs = arr;
        if (arr.length == 0) {
          this.$message({
            message: "请上传产品图片",
            type: "warning"
          });
          return;
        }

        isNull = false;
        pars.goodsSpecifications.map(item => {
          if (item.name == "" || item.retailPrice == "" || item.inventory == "") {
            isNull = true;
          }
          if (pars.isSales) {
            pars.isSales = 1;
            if (item.commission == "") {
              isNull = true;
            }
          } else {
            pars.isSales = 0;
          }
        });
        if (isNull) {
          this.$message({
            message: "请填写完整规格",
            type: "warning"
          });
          return;
        }


        if (pars.goodsDetail == "") {
          this.$message({
            message: "请输入产品详情",
            type: "warning"
          });
          return;
        }
        pars.isLeg = pars.isLeg ? 1 : 0;
        pars.isTake = pars.isTake ? 1 : 0;

        pars.goodsPicList = pars.goodsImgs;
        pars.specificationsList = this.form.goodsSpecifications;
        addGoods(pars).then(res => {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.$props.callback();
        });
      },
      selImg(val) {
        this.imgIdx = event.target.parentElement.parentElement.getAttribute("id");
        this.update();
      },
      delImg() {
        var idx = event.target.getAttribute("id");
        this.form.goodsImgs[idx].url = null;
        this.form.goodsImgs[idx].fileaddr = null;
        this.form.goodsImgs[idx].path = '';
        if (this.form.goodsImgs[idx].id) {
          this.form.goodsImgs[idx].updateId = this.form.goodsImgs[idx].id
        }
        this.update();
      },
      upload(res, file) {

        let idx =
          this.imgIdx.indexOf("s") != -1 ?
          parseInt(this.imgIdx.split("_")[1]) :
          parseInt(this.imgIdx);
        if (this.imgIdx.indexOf("s") == -1) {
          this.form.goodsImgs[idx].fileaddr = res.data.path;
          this.form.goodsImgs[idx].url = res.data.server + res.data.path;
          if (this.form.goodsImgs[idx].id) {
            this.form.goodsImgs[idx].updateId = this.form.goodsImgs[idx].id;
          }
        } else {
          this.form.goodsSpecifications[idx].img = res.data.path;
          this.form.goodsSpecifications[idx].url = res.data.server + res.data.path;
          if (this.form.goodsSpecifications[idx].id) {
            this.form.goodsSpecifications[
              idx
            ].updateId = this.form.goodsSpecifications[idx].id;
          }
        }

        this.update();
      },
      delRow(idx) {
        if (this.form.goodsSpecifications.length == 1) {
          this.$message({
            message: "规格不能为空",
            type: "warning"
          });
          return;
        }
        if (this.form.goodsSpecifications[idx].id) {
          delSpecification(this.form.goodsSpecifications[idx].id).then(res => {
            this.form.goodsSpecifications.splice(idx, 1);
            this.update();
          });
        } else {
          this.form.goodsSpecifications.splice(idx, 1);
          this.update();
        }
      },
      addRow() {
        this.form.goodsSpecifications.push({
          name: "",
          retailPrice: "",
          commission: "",
          inventory: ""
        });
        this.update();
      },
      update() {
        this.changeCategory();
        
      },
      changeCategory() {
        let that = this;
        this.category1.map(item => {
          if (item.id == that.form.categoryId1) {
            that.category2 = item.categoryMarginList;
            if (!that.init) {
              that.form.categoryId = item.categoryMarginList[0].id;
            }
          }
        });
        this.$forceUpdate()
      }
    }
  };
</script>
<style>
  .row {
    width: 100%;
    border-bottom: 1px solid #ccc;
    height: 221px !important;
    padding-bottom: 10px;
    padding-top: 5px;
  }

  .row div {
    float: left;
    width: 185px;
    margin-right: 5px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    float: left;
    margin-right: 20px;
    width: 178px !important;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px !important;
    height: 178px;
    display: block;
  }
</style>
