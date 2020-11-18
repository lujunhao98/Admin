<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="用户编号" sortable width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" sortable width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1" disabled>启用</el-button>
          <el-button type="primary" v-else disabled>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编 辑</el-button>
          <del-btn @confirm="del(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqManageDel } from "../../../ustil/https";
import { successAlert } from "../../../ustil/alert";
export default {
  props: ["list"],
  methods: {
    //删除
    del(uid) {
      reqManageDel(uid).then((res) => {
        if (res.data.code === 200) {
          //成功的弹窗
          successAlert(res.data.msg);
          //通知父组件
          this.$emit("init");
        }
      });
    },
    //编辑
    edit(uid) {
        //通知父组件
      this.$emit("edit", uid);
    },
  },
};
</script>

<style>
</style>