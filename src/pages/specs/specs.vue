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
        title: "添加商品规格",
      },
    };
  },
  methods: {
    //点了添加按钮
    willadd() {
      this.info = {
        isshow: true,
        title: "添加商品规格",
      };
    },
    //编辑
    edit(id) {
      this.info = {
        isshow: true,
        title: "修改商品规格",
      };
      this.$refs.form.getOne(id)
    },
  },
  components: {
    vList,
    vForm,
  },
  mounted() {},
};
</script>

<style>
</style>