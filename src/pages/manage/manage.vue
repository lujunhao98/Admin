<template>
  <div>
    <el-button type="primary" @click="willAdd">添 加</el-button>
    <!-- 列表 -->
    <v-list :list="list" @init="newinit" @edit="edit"></v-list>
    <!-- 分页 -->
    <!-- current-change:当前页码发生了修改，会触发，回调函数的参数就是新的页码 -->
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="changePage"
      :total="total"
      :page-size="size"
    ></el-pagination>
    <!-- form -->
    <v-form :info="info" @init="newinit" ref="form"></v-form>
  </div>
</template>

<script>
import vList from "./components/list";
import vForm from "./components/form";
import { reqManageList, reqManageCount } from "../../ustil/https";
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "添加用户",
      },
      // 列表数据初始值
      list: [],
      //总条数
      total: 0,
      //查询条数
      size: 2,
      //页码数
      page: 1,
    };
  },
  methods: {
    // 点击了添加按钮
    willAdd() {
      this.info = {
        isshow: true,
        title: "添加用户",
      };
    },
    // 获取列表数据发请求
    init() {
      reqManageList({ page: this.page, size: this.size }).then((res) => {
        let list = res.data.list ? res.data.list : [];
        //如果取到的list是[]，并且page>1 page自减，请求列表
        if (list.length === 0 && this.page > 1) {
          this.page--;
          this.init();
          return;
        }
        this.list = list;
      });
    },
    //获取总数
    getCount() {
      reqManageCount().then((res) => {
        console.log(res);
        this.total = res.data.list[0].total;
      });
    },
    //页码发生改变
    changePage(page) {
      this.page = page;
      this.init();
    },
    //请求list 总数
    newinit() {
      this.init();
      this.getCount();
    },
    //编辑
    edit(uid) {
      this.info = {
        isshow: true,
        title: "编辑用户",
      };
      this.$refs.form.getOne(uid);
    },
  },
  mounted() {
    this.init();
    this.getCount();
  },
  components: {
    vForm,
    vList,
  },
};
</script>

<style>
</style>