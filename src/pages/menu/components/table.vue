<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
      
    >
      <el-table-column prop="id" label="菜单编号" sortable width="120"></el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="200"></el-table-column>
      <el-table-column label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1" disabled>启用</el-button>
          <el-button type="primary" v-else disabled>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { successAlert, errorAlert } from "../../../ustil/alert";
import { reqMenudel } from "../../../ustil/https";
export default {
  props: ["list"],
  data() {
    return {
      //列表数据
    };
  },
  methods: {
    del(id) {
      console.log(id);
      this.$confirm("你确定要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqMenudel(id).then((res) => {
            if (res.data.code === 200) {
              //成功的弹窗
              successAlert(res.data.msg);
              //通知父组件
              this.$emit("init");
            } else {
              errorAlert(res.data.msg);
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
    //点击了编辑
    edit(id) {
      //通知父组件
      this.$emit("edit", id);
    },
  },
};
</script>

<style>
</style>