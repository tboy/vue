<template>
  <div class="container">
    <el-form
      style="width:80%;margin:auto;"
      label-position="left"
      ref="form"
      :model="form"
      label-width="120px"
    >
      <div style="font-size: 17px;margin: 20px 0;font-weight: bold;">1.商品基本信息</div>
      <el-form-item label="商品分类:">
        <el-select v-model="form.categoryId1" @change="changeCategory" placeholder="请选择">
          <el-option v-for="item in category1" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-select v-model="form.categoryId" placeholder="请选择" style="width:350px;">
          <el-option v-for="item in category2" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称:">
        <el-input v-model="form.name" placeholder="请输入内容" maxlength="20" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="商品副标题:">
        <el-input v-model="form.subName" placeholder="请输入内容" maxlength="40" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="商品图片:">
        <div style="width:100%;height: 192px;">
          <el-upload
            v-for="(item,idx) in form.goodsImgs"
            :before-upload="selImg"
            :id="idx"
            class="avatar-uploader"
            :action="uploadPath"
            :show-file-list="false"
            :on-success="upload"
          >
            <img v-if="item.url" :src="item.url" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div style="width:100%;">商品图片尺寸：698*298px，主图大小不能超过800K；</div>
      </el-form-item>
      <el-form-item label="商品规格:">


        <div class="row" v-for="(item,idx) in form.goodsSpecifications">
          <div>
            名称：
            <el-input
              type="text"
              v-model="item.name"
              placeholder="请输入名称"
              style="width:130px;float:right;"
            ></el-input>
          </div>
          <div>
            零售价：
            <el-input
              type="number"
              v-model="item.retailPrice"
              placeholder="请输入零售价"
              style="width:110px;float:right;"
            ></el-input>
          </div>
          <div>
            原价：
            <el-input
              type="number"
              v-model="item.commission"
              placeholder="请输入原价"
              style="width:110px;float:right;"
            ></el-input>
          </div>
          <div>
            库存：
            <el-input
              type="number"
              v-model="item.inventory"
              placeholder="请输入库存"
              style="width:130px;float:right;"
            ></el-input>
          </div>

          <div style="float:right;  margin-right:0px;" v-if="isSave">
            <el-button plain size="mini" @click="delRow(idx)">删除</el-button>
            <el-button plain size="mini" @click="addRow">增加</el-button>
          </div>
        </div>
        <br />

      </el-form-item>

      <div style="font-size: 17px;margin: 20px 0;font-weight: bold;">2.商品设置</div>
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
        <tinymce :height="450" v-model="form.technicalPars"></tinymce>上传1张图片商品信息，图片尺寸：1334x667px，图片大小不能超过800K。
      </el-form-item>-->

      <el-form-item label="商品详情:">
        <tinymce :height="450" v-model="form.goodsDetail"></tinymce>只能上传6张图片，图片尺寸：1334x667px，图片大小不能超过800K。
      </el-form-item>

      <div style="font-size: 17px;margin: 20px 0;font-weight: bold;"><!-- 3.商品其它信息 --></div>
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
      <el-input
        type="textarea"
        placeholder="请输入拒绝原因"
        v-model="reasonTxt"
        rows="10"
        maxlength="500"
        show-word-limit
      ></el-input>
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
  import {imgPath} from '@/utils/imgUploadPath'
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
    this.form.goodsSpecifications = [
      {
        name: "",
        retailPrice: "",
        commission: "",
        inventory: "",
        img: null,
        url: null
      }
    ];
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
      this.form = item;
      this.form.isLeg = item.isLeg == 1;
      this.form.isTake = item.isTake == 1;
      this.form.isSales = item.isSales == 1;
      this.form.goodsImgs = item.goodsPicList;
      this.form.goodsImgs.map(item => {
        item.url = item.imgServer + item.fileaddr;
      });
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
      let pars = this.form;
      if (pars.name == "") {
        this.$message({
          message: "请输入商品名称",
          type: "warning"
        });
        return;
      }
      if (pars.subName == "") {
        this.$message({
          message: "请输入商品副标题",
          type: "warning"
        });
        return;
      }
      let isNull = false;
      pars.goodsImgs.map(item => {
        if (item.url == null) {
          isNull = true;
        }
      });
      if (isNull) {
        this.$message({
          message: "请上传5张商品图片",
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
          message: "请输入商品详情",
          type: "warning"
        });
        return;
      }
      pars.isLeg = pars.isLeg ? 1 : 0;
      pars.isTake = pars.isTake ? 1 : 0;

      pars.goodsPicList = this.form.goodsImgs;
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
    upload(res, file) {
      let idx =
        this.imgIdx.indexOf("s") != -1
          ? parseInt(this.imgIdx.split("_")[1])
          : parseInt(this.imgIdx);
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
      let temp = this.form.goodsWeight;
      this.form.goodsWeight = "";
      setTimeout(() => {
        this.form.goodsWeight = temp;
        this.changeCategory();
      }, 1000);
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
    }
  }
};
</script>
<style>
.row {
  width: 100%;
  border-bottom: 1px solid #ccc;
  height: 50px;
  padding-bottom: 10px;
  padding-top: 5px;
}

.row div {
  float: left;
  width: 195px;
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
