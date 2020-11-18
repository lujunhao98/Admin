<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed='closed'>
      <el-form :model="user">
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="user.roleid" placeholder="请所属角色">
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title==='添加用户'">添 加</el-button>
        <el-button type="primary" v-else @click="update()">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqRoleList, reqManageAdd, reqManageInfo } from "../../../ustil/https";
import { successAlert } from "../../../ustil/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      rolelist: [],
    };
  },
  methods: {
    //弹框消失
    cancel() {
      this.info.isshow = false;
    },
    //重置user
    empty() {
      this.user = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    add() {
      reqManageAdd(this.user).then((res) => {
        // console.log(this.user)
        successAlert(res.data.msg);
        this.cancel();
        this.empty();
        this.$emit("init");
      });
    },
    //获取一条详情
    getOne(uid) {
      reqManageInfo(uid).then((res) => {
        //此刻user没有id,有uid,而修改要的就是uid
        this.user = res.data.list;
        //处理密码
        this.user.password = "";
      });
    },
    //处理消失
    closed() {
      if(this.info.title==='编辑用户'){
        this.empty()
      }
    },
  },
  mounted() {
    //一进来就请求角色列表
    reqRoleList().then((res) => {
      if (res.data.code === 200) {
        // console.log(res.data)
        this.rolelist = res.data.list;
      }
    });
  },
};
</script>

<style>
</style>