<template>
  <div class="app-container">
    <h3 class="menu-header">系统菜单
      <el-button class="filter-item" style="margin-left: 50px;" type="primary"  @click="createDialog">+</el-button>
    </h3>
    <el-tree v-loading="listLoading" :data="list" node-key="id" :expand-on-click-node="false" style="border-radius:10px;width:50%;height:500px;border:1px solid #ccc;">
      <span slot-scope="{ node, data}" class="custom-tree-node">
        <span>{{ data.title }}</span>
        <span>
          <el-button v-if="data.parent === 0" size="mini" type="text" @click="() => createDialog(data.id)">+</el-button>
          <el-button size="mini" type="text" @click="() => updateDialog(data)">编辑</el-button>
          <el-button size="mini" type="text" @click="() => deleteDialog(data)">删除</el-button>
        </span>
      </span>
    </el-tree>
    <!-- 增/改 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="valids" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="顺序">
          <el-input v-model="temp.sequence" />
        </el-form-item>
        <el-form-item label="名称" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="资源" prop="path">
          <el-input v-model="temp.path" />
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="temp.redirect" />
        </el-form-item>

        <el-form-item v-if="checkItemId" label="上级" prop="parent">
          <el-select v-model="temp.parent" class="filter-item" :disabled="disabled" placeholder="请选择">
            <el-option v-for="item in menus" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" :loading="btnLoading" @click="createData">确定</el-button>
        <el-button v-else type="primary" :loading="btnLoading" @click="updateData">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // 水波纹指令
  import {
    getMenusList,
    addMenu,
    updateMenu,
    deleteMenu
  } from '@/api/menu'
  export default {
    name: 'Sysmenu',
    directives: {
      waves
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        listLoading: false,
        btnLoading: false,
        dialogFormVisible: false,
        dialogTitle: null,
        disabled: false,
        dialogStatus: 'create',
        temp: {
          path: '',
          title: '',
          parent: '',
          sequence: '',
          redirect: '',
          icon: '',
          permission: ''
        },
        list: null,
        valids: {
          path: [{
            required: true,
            message: '路径是必须的'
          }],
          title: [{
            required: true,
            message: '名称是必须的'
          }],
          parent: [{
            required: true,
            message: '父级必须设置'
          }]
        },
        checkItemId: null,
        menus: []
      }
    },
    created() {
      this.menus.push({
        key: 0,
        display_name: '顶层'
      })
      this.getList((list) => {
        this.formatTreeData(list)
      })
    },
    methods: {
      getList(callback) {
        this.listLoading = true
        getMenusList().then(response => {
          response.data.map((item) => {
            item.children = item.childList
          })
          this.list = response.data
          this.listLoading = false
          if (callback) callback(this.list)
        })
      },
      createDialog(id) {
        this.resetTemp()
        this.dialogFormVisible = true
        this.dialogTitle = '增加菜单'
        this.dialogStatus = 'create'
        if (typeof id !== 'object') {
          this.checkItemId = id
          this.temp.parent = id
          this.disabled = true
        } else {
          this.disabled = false
          this.checkItemId = null
          this.temp.parent = 0
        }
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateDialog(data) {
        this.temp = {
          id: data.id,
          path: data.path,
          title: data.title,
          parent: data.parent,
          sequence: data.sequence,
          redirect: data.redirect,
          icon: data.icon,
          hidden: 0,
          alwaysshow: 0,
          nocache: 1,

        }
        this.dialogFormVisible = true
        this.dialogTitle = '更新菜单'
        this.dialogStatus = 'update'
        this.checkItemId = data.id
        this.disabled = false
      },
      deleteDialog(data) {
        this.checkItemId = data.id
        this.$confirm('此操作将删除 "' + data.meta.title + '" 菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteMenu({
            id: data.id
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            addMenu(this.temp).then((res) => {
              this.dialogFormVisible = false
              this.btnLoading = false
              this.$notify({
                title: '成功',
                message: '新增成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
          }
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            updateMenu(this.temp).then((res) => {
              this.dialogFormVisible = false
              this.btnLoading = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
          }
        })
      },
      formatTreeData(data) {
        if (!data) return
        data.map((item) => {
          this.menus.push({
            key: item.id,
            display_name: item.meta.title
          })
          // if (item.children) this.formatTreeData(item.children)
        })
      },
      resetTemp() {
        this.temp = {
          path: '',
          title: '',
          parent: '',
          sequence: '',
          redirect: '',
          icon: '',
          permission: ''
        }
      }
    }
  }
</script>
<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .menu-header {
    font-size: 16px;
    padding: 0 10px;
    font-weight: 400;
    margin-top: 0;
  }

  .el-select {
    width: 100%;
  }
</style>
