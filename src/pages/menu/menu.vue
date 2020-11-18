<template>
  <div>
    <!-- 添加 -->
    <el-button type="success" @click="weillshow">添加</el-button>
    <!-- 表格 -->
    <v-table :list="list" @init="init" @edit="edit($event)"></v-table>
    <!-- 弹窗 -->
    <v-from :info="info" :list="list" @init="init" ref="from" ></v-from>
  </div>
</template>

<script>
import vTable from "./components/table";
import vFrom from "./components/from";
import { reqMenuList } from "../../ustil/https";
import { successAlert } from '../../ustil/alert';
export default {
  components: {
    vTable,
    vFrom,
  },
  data() {
    return {
      info: {
        isshow: false,
        title:'',
      },
      //列表数据
      list: [],
    };
  },
  methods: {
    weillshow() {
      this.info.isshow = true;
      this.info.title='添加菜单'
    },
    //刷新列表
    init() {
      reqMenuList().then((res) => {
        // console.log(res);
        this.list = res.data.list;
      });
    },
    edit(id) {
      //  弹窗from组件
      this.weillshow()
    //父组件调用from组件里的getone()
    this.$refs.from.getone(id)

    },
  },
  mounted() {
    //一进来就请求数据
    this.init();
  },
};
</script>

<style scoped>
</style>