<template>
  <Edit :data="id" ref="edit" style="width: 100%;height: 100%;border: 0;overflow-x: hidden;" />
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import {
    findAllCategoryMargin,
    addGoods
  } from '@/api/categorymargin.js'
  import Edit from './eidt'
  export default {
    name: 'Audit',
    components: {
      Tinymce,
      Edit
    },
    data() {
      return {
        id: null
      }
    },
    mounted() {

    },
    methods: {

    }
  }
</script>
<style>
  .row {
    width: 100%;
    border-bottom: 1px solid #ccc;
    height: 200px;
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
