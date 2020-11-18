<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- list -->
    <v-list></v-list>
    <!-- form -->
    <v-form :info="info"></v-form>
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
  },

  components: {
    vList,
    vForm,
  },
};
</script>

<style>
</style>