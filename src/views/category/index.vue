<template>
  <div class="container">
    <div class="seachPanel">
      <el-button style="float:right;" type="primary" icon="el-icon-add" @click="add(0)">新增</el-button>
    </div>
    <el-table
      :data="list"
      border
      style="width: 100%"
      row-key="id"
      default-expand-all
      :tree-props="{children: 'channelList', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="分类" align="center">
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column label="图标" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.imgServer+scope.row.icon" style="width:20px;height:20px;"/>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" @click="edit1(scope.row)">编辑</el-button>
          <el-button type="danger" plain size="mini" @click="del(scope.row)">删除</el-button>
          <el-button type="success" plain size="mini" @click="add(scope.row.id)">增加子类</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑" :visible.sync="isShow" width="88%" height="100%" center>
      <el-form style="width:80%;margin:auto;" label-position="left" label-width="120px">
        <el-form-item label="分类名称:">
          <el-input v-model="item.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="图标:">
          <el-upload
            class="avatar-uploader"
            :action="uploadPath"
            :show-file-list="false"
            :on-success="upload"
          >
            <img v-if="item.icon" :src="item.imgServer+item.icon" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input v-model="item.seq" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <el-button plain @click="isShow=false" style="float:right;">取消</el-button>
        <el-button type="primary" plain @click="edit()" style="float:right;margin-right:10px;">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getChannelList, addChannel } from "@/api/category.js";
   import {imgPath} from '@/utils/imgUploadPath'
export default {
  name: "category",

  data() {
    return {
      uploadPath: imgPath,
      isShow: false,
      list: [],
      item: {}
    };
  },
  mounted() {
    this.query(0);
  },
  methods: {
    upload(res, file) {
      this.item.icon = res.data.path;
    },
    edit1(item) {
      this.item = item;
      this.isShow = true;
    },
    add(item) {

      this.item = { pid: item };
      this.item.imgServer = this.list[0].imgServer;
      this.isShow = true;
    },
    del(item) {
      item.delFlag = 1;
      this.item = item;
      this.edit();
    },
    edit() {
      addChannel(this.item).then(res => {
        this.query(0);
        this.isShow = false
      });
    },
    query(pid) {

      getChannelList({ pid: pid }).then(res => {
        this.list = res.data;
      });
    }
  }
};
</script>
<style>
.container {
  padding: 10px;

  height: 100%;
}

.seachPanel {
  height: 60px;
  padding-top: 10px;
  border: 1px solid #ececec;
  background: white;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
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
