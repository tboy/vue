<template>
  <div class="container">
    <el-form style="width:80%;margin:auto;" label-position='left' ref="form" :model="form" label-width="120px">
      <div style="font-size: 17px;margin: 20px 0;font-weight: bold;">零售店铺设置</div>

      <el-form-item label="店铺轮播图:">
        <div style="width:100%;height: 192px;">
          <el-upload v-for="(item,idx) in form.tblPiccenterList" :before-upload="selImg" :id="idx" class="avatar-uploader"
            :action="uploadPath" :show-file-list="false" :on-success="upload">
            <img v-if="item.fileaddr!=''" :src="form.imgServer+item.fileaddr" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div style="width:100%;">
          产品图片尺寸：800*800px，主图大小不能超过800K；
        </div>
      </el-form-item>

      <el-form-item label="店铺名称:">
        <el-input v-model="form.name" placeholder="请输入内容" maxlength="10" show-word-limit></el-input>
      </el-form-item>

      <el-form-item label="店铺LOGO:">
        <div style="width:100%;height: 192px;">
          <el-upload :before-upload="selImg" id="logo" class="avatar-uploader" :action="uploadPath" :show-file-list="false"
            :on-success="upload">
            <img v-if="form.logo!=''" :src="form.imgServer+form.logo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div style="width:100%;">
          产品图片尺寸：800*800px，主图大小不能超过800K；
        </div>
      </el-form-item>

      <el-form-item label="店铺类目:">
        {{form.categoryMarginVo.categoryMargin.name+" "+form.categoryMarginVo.name}}
      </el-form-item>
      <el-form-item label="联系人:">
        <el-input v-model="form.contacts" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="联系电话:">
        <el-input v-model="form.phone" placeholder="请输入内容" type="number" maxlength="11" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="详细地址:">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-select v-model="form.area1" @change="changeArea" placeholder="请选择" class="my-select">
              <el-option v-for="(key,val) in areas.provincial" :key="val" :label="key" :value="val">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <el-select v-model="form.area2" @change="changeArea" placeholder="请选择" class="my-select">
              <el-option v-for="(key,val) in areas.municipal" :key="val" :label="key" :value="val">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-select v-model="form.area3" placeholder="请选择" class="my-select">
              <el-option v-for="(key,val) in areas.county" :key="val" :label="key" :value="val">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-input v-model="form.address" style="margin-top:20px;" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="店铺简介:">
        <el-input v-model="form.shopIntroduction" placeholder="请输入内容" maxlength="80" type="textarea" :autosize="{ minRows: 8, maxRows: 8}"
          show-word-limit></el-input>
      </el-form-item>
      <el-form-item  label="">
        <el-button plain @click="save" style="float:right;">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    getMyShop,
    updateMyShop
  } from '@/api/myshop.js'
  import areaJson from '@/systemData/area'
    import {imgPath} from '@/utils/imgUploadPath'
  export default {
    name: 'Datacenter',
    data() {
      return {
        uploadPath: imgPath,
        areas: {
          provincial: [],
          municipal: [],
          county: []
        },
        imgIdx: null,
        form: {
          categoryMarginVo: {
            categoryMargin: {}
          },
          imgServer: '',
          tblPiccenterList: [{
            fileaddr: ''
          }, {
            fileaddr: ''
          }, {
            fileaddr: ''
          }],
          name: '',
          logo: '',
          contacts: '',
          phone: '',
          area1: '440000',
          area2: '440100',
          area3: '440115',
          address: '',
          shopIntroduction: ''
        },
        isFirst: true
      }
    },
    watch: {},
    created() {
      // window.addEventListener('storage', this.afterQRScan)
    },
    mounted() {
      getMyShop().then(res => {
        this.form = res.data
        if (this.form.tblPiccenterList.length == 0) {
          this.form.tblPiccenterList = [{
            fileaddr: ''
          }, {
            fileaddr: ''
          }, {
            fileaddr: ''
          }]
        }
        if (res.data.areaid1 != 0) {
          this.form.area1 = res.data.areaid1 + ''
          this.form.area2 = res.data.areaid2 + ''
          this.form.area3 = res.data.areaid3 + ''
        }
        this.changeArea()
      })

    },
    destroyed() {
      // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
      changeArea() {
        const provincial = areaJson[100000]
        const municipal = areaJson[this.form.area1]
        const county = areaJson[this.form.area2]
        this.areas.provincial = provincial
        this.areas.municipal = municipal
        this.areas.county = county
        let isIn = false
        Object.keys(municipal).map(key => {
          if (key == this.form.area2) {
            isIn = true
          }
        })
        if (!isIn) {
          this.form.area2 = Object.keys(municipal)[0]
        }
        isIn = false
        Object.keys(county).map(key => {
          if (key == this.form.area3) {
            isIn = true
          }
        })
        if (!isIn) {
          this.form.area3 = Object.keys(county)[0]
        }
      },
      selImg(val) {
        this.imgIdx = event.target.parentElement.parentElement.getAttribute("id")
      },
      upload(res, file) {
        if (this.imgIdx == 'logo') {
          this.form.logo = res.data.path
        } else {
          if (this.form.tblPiccenterList[this.imgIdx].id) {
            this.form.tblPiccenterList[this.imgIdx].updateId = this.form.tblPiccenterList[this.imgIdx].id
          }
          this.imgIdx = parseInt(this.imgIdx)
          this.form.tblPiccenterList[this.imgIdx].fileaddr = res.data.path
        }
      },
      save() {
        this.form.areaid1 = this.form.area1
        this.form.areaid2 = this.form.area2
        this.form.areaid3 = this.form.area3
        updateMyShop(this.form).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          });
        })
      }
    }
  }
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
    width: 230px;
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
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
