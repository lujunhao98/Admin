<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- 列表 -->
    <v-list :list="list" @init="init" @edit="edit"></v-list>
    <!-- form弹窗 -->
    <v-form :info="info" @init="init" ref='form'></v-form>
  </div>
</template>

<script>
import vForm from "./components/form";
import vList from "./components/list";
import { reqRoleList } from "../../ustil/https";
export default {
  components: {
    vList,
    vForm,
  },
  data() {
    return {
      info: {
        isshow: false,
        title: "添加角色",
      },
      list: [],
    };
  },
  methods: {
    //点击添加按钮
    willAdd() {
          this.info={
        isshow: true,
        title: "添加角色",
      }
    },
    //发请求
    init() {
      reqRoleList().then((res) => {
        this.list = res.data.list;
      });
    },
    //编辑
    edit(id) {
      this.info = {
        isshow:true,
        title:'编辑角色'
      }
      this.$refs.form.getOne(id)
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>