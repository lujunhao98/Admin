<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="编号" sortable width="120"></el-table-column>
      <el-table-column prop="title" label="轮播图标题" sortable></el-table-column>
      <el-table-column label="图片" sortable width="600">
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" alt class="img" />
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope" width="120">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <!-- 32.绑定confirm事件 -->
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from '../../../ustil/alert';
import { reqBannerdel } from "../../../ustil/https";
export default {
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "banner/reqList",
    }),
    // 编辑
    edit(id){
      this.$emit('edit',id)
    },
    // 删除
    del(id) {
      reqBannerdel(id).then((res) => {
        if(res.data.code==200){
          // 成功弹窗
          successAlert("删除成功")
          // 刷新
          this.reqList()
        }
      });
    },
  },
  mounted() {
    // 一进来
    this.reqList();
  },
};
</script>

<style scoped>
.img {
  width: 100px;
  height: 100px;
}
</style>