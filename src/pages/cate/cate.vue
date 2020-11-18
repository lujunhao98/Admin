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
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "添加商品",
      },
    };
  },
  methods: {
    //点击了添加按钮
    willAdd() {
      this.info = {
        isshow: true,
        title: "添加商品",
      };
    },
    // 编辑
    edit(id) {
      this.info = {
        isshow: true,
        title: "编辑商品",
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