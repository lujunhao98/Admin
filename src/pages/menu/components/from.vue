<template>
  <div>
    <!-- 绑定closed事件 -->
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="form">
        <el-form-item label="菜单名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单" label-width="120px">
          <el-select v-model="form.pid" placeholder="请选择" @change="changePid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" label-width="120px">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item label="菜单图标" v-if="form.type===1" label-width="120px">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" v-else label-width="120px">
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              v-for="item in routes"
              :key="item.path"
              :label="item.name+'---/'+item.path"
              :value="'/'+item.path"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="this.info.title=='添加菜单'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
import { routes } from "../../../router/index";
import axios from "axios";
import { successAlert, errorAlert } from "../../../ustil/alert";
import {
  reqMenuAdd,
  reqMenuList,
  reqMenuinfo,
  reqMenuedit,
} from "../../../ustil/https";
import loginVue from "../../login/login.vue";
export default {
  props: ["info", "list"],
  //
  data() {
    return {
      //初始化form,并通过v-model绑定数据到模板
      form: {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1,
      },
      icons: [
        "el-icon-user",
        "el-icon-aim",
        "el-icon-key",
        "el-icon-medal-1",
        "el-icon-goods",
        "el-icon-picture-outline-round",
      ],
      //定义routes
      routes: routes,
    };
  },
  methods: {
    // from置空
    empty() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1,
      };
    },
    cancel() {
      this.info.isshow = false;
    },
    add() {
      //请求
      reqMenuAdd(this.form).then((res) => {
        if (res.data.code === 200) {
          //成功
          //弹个框
          successAlert("添加成功");
          //弹框消失
          this.cancel();
          //from置空
          this.empty();
          //刷新数据
          // 去通知table.vue的init发起请求
          this.$emit("init");
        } else {
          errorAlert(res.data.msg);
        }
      });
    },
    changePid() {
      if (this.form.pid === 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    getone(id) {
      reqMenuinfo(id).then((res) => {
        //此时form上没有id
        this.form = res.data.list;
        //补id
        this.form.id = id;
        this.info.title = "编辑菜单";
      });
    },
    update() {
      reqMenuedit(this.form).then((res) => {
        if (res.data.code === 200) {
          //成功弹框
          successAlert("修改成功");
          //弹框消失
          this.cancel();
          //form重置
          this.empty();
          //刷新列表
          this.$emit("init");
        }
      });
    },
    closed(){
      //如果添加出现，点击了取消，此时什么都不做
      //如果编辑出现，点击了取消，此时form清空
      if(this.info.title == "编辑菜单"){
        this.empty()
      }
    }
  },
};
</script>

<style>
</style>