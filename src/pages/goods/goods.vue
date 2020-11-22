<template>
  <div>
    <el-button type="primary" @click="willadd">添加</el-button>
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
    willadd() {
      this.info.isshow = true;
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