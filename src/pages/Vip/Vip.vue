<template>
  <div>
    <!-- list -->
    <v-list @edit="edit"  :list="list"></v-list>
    <!-- form -->
    <v-form :info="info" ref="form" @init="init"></v-form>
  </div>
</template>

<script>
import vList from "./components/list";
import vForm from "./components/form";
import {reqMemberList} from '../../ustil/https'

export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "会员修改",
      },
      list:[],
    };
  },
  methods: {
    //编辑
    edit(uid) {
      this.info.isshow = true;
      this.$refs.form.getOne(uid);
    },
    // 刷新
    init() {
      reqMemberList().then((res) => {
        this.list = res.data.list;
      });
    },
  },
  mounted() {
    this.init()
  },
  components: {
    vList,
    vForm,
  },
};
</script>

<style>
</style>