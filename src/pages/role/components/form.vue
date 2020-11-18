<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" label-width="120px">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            :props="{children: 'children',label: 'title'}"
            default-expand-all
            ref="tree"
          ></el-tree>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :plain="true" @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加角色'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqMenuList,
  reqRoleadd,
  reqRoleDetail,
  reqRoleUpdate,
} from "../../../ustil/https";
import { successAlert } from "../../../ustil/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        rolename: "",
        menus: "",
        status: 1,
      },
      //初始化树形控件
      menuList: [],
    };
  },
  methods: {
    cancel() {
      this.info.isshow = false;
      this.$message({
          showClose: true,
          message: '你选择了取消'
      })
    },
    empty() {
      this.user = {
        rolename: "",
        menus: "",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    add() {
      // 15.`将树形控件的数据取出，变成字符串数组，赋值给user.menus
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      // ajax请求
      reqRoleadd(this.user).then((res) => {
        if (res.data.code == 200) {
          //弹窗消
          this.cancel();
          //成功弹窗
          successAlert("添加成功");
          //清空user
          this.empty();
          //通知组件
          this.$emit("init");
        }
      });
    },
    //获取一条数据
    getOne(id) {
      reqRoleDetail(id).then((res) => {
        //此时没有 补id
        this.user = res.data.list;
        //处理树形控件的数据
        this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));
        //补id
        this.user.id = id;
      });
    },
    update() {
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleUpdate(this.user).then((res) => {
        if (res.data.code === 200) {
          //成功弹窗
          successAlert("修改成功");
          //弹窗消失
          this.cancel();
          //清空
          this.empty();
          //刷新
        }
      });
    },
    //处理编辑=》取消=》添加数据不会清空问题
    closed() {
      if(this.info.title=='编辑角色'){
        this.empty()
      }
    },
  },
  mounted() {
    reqMenuList().then((res) => {
      if (res.data.code === 200) {
        this.menuList = res.data.list;
      }
    });
  },
};
</script>

<style>
</style>