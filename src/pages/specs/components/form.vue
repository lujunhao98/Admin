<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="form">
        <el-form-item label="规格名称" label-width="120px">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" label-width="120px" v-for="(item,index) in attrArr" :key="index">
          <div class="line">
            <el-input v-model="item.value" autocomplete="off"></el-input>
            <el-button type="primary" v-if="index===0" @click="addAttr">添加规格属性</el-button>
            <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title==='添加商品规格'" @click="add">添 加</el-button>
        <el-button type="primary" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "../../../ustil/alert";
import { reqSpecsAdd, reqSpecsInfo } from "../../../ustil/https";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      //属性值
      attrArr: [{ value: "" }],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqCount: "specs/reqCount",
    }),
    //弹框消失
    cancel() {
      this.info.isshow = false;
    },
    //新增规格属性
    addAttr() {
      this.attrArr.push({
        value: "",
      });
    },
    //删除规格属性
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },
    //清空
    empty() {
      this.form = {
        specsnname: "",
        attrs: "",
        status: 1,
      };
      this.attrArr = [{ value: "" }];
    },
    //点击了添加
    add() {
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      reqSpecsAdd(this.form).then((res) => {
        //成功弹窗
        successAlert("添加成功");
        //弹窗消失
        this.cancel();
        //清空
        this.empty();
        //刷新
        this.reqList();
        this.reqCount();
      });
    },
    //获取一条数据
    getOne(id) {
      reqSpecsInfo(id).then((res) => {
        console.log(res);
        this.form = res.data.list[0];
        //attrArr转为当前格式( this.attrArr = [{ value: "" }])
        this.attrArr=JSON.parse(this.form.attrs).map(item=>({value:item}))

      });
    },
    //处理bug
    closed() {
      if (this.info.title === "编辑规格") {
        this.cancel();
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.line {
  display: flex;
}
.line .el-input {
  flex: 1;
}
.line .el-button {
  width: 120px;
}
</style>