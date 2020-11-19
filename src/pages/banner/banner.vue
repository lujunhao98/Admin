<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- list -->
    <v-list @edit="edit"></v-list>
    <!-- form -->
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>

<script>
import vList from "./components/list";
import vForm from "./components/form";
import { reqBannerInfo } from "../../ustil/https";
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "添加轮播图",
      },
    };
  },
  methods: {
    // 点了添加
    willAdd() {
      this.info = {
        isshow: true,
        title: "添加轮播图",
      };
    },
    // 编辑
    edit(id) {
      this.info = {
        isshow: true,
        title: "编辑轮播图",
      };
      this.$refs.form.getOne(id)
    },
  },
  components: {
    vList,
    vForm,
  },
};
</script>

<style>
</style>