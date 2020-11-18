<template>
  <div>
    <el-table
      :data="[]"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="date" label="编号" sortable width="180"></el-table-column>
      <el-table-column prop="name" label="昵称" sortable width="180"></el-table-column>
      <el-table-column prop="address" label="手机号"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <!-- <template slot-scope="scope"> -->
        <el-button type="primary" @click="update">编辑</el-button>
        <!-- </template> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqMemberList } from "../../../ustil/https";
export default {
  methods: {
      update(){
          this.info.isshow=true
      }
  },
  mounted() {
    reqMemberList().then((res) => {
      console.log(res);
    });
  },
};
</script>

<style>
</style>