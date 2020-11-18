<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="角色编号" sortable width="120px"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" sortable width="400px"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1" disabled>启用</el-button>
          <el-button type="primary" v-else disabled>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { reqRoleDel } from "../../../ustil/https";
import { successAlert } from "../../../ustil/alert";
export default {
  props: ["list"],
  methods: {
    del(id){
      console.log(id);
      this.$confirm("你确定要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqRoleDel(id).then((res) => {
            if (res.data.code === 200) {
              //成功的弹窗
              successAlert(res.data.msg);
              //通知父组件
              this.$emit("init");
            } 
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //编辑
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {},
};
</script>

<style scoped>
</style>