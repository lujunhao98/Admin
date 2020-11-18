<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="form.pid" placeholder="请选择角色">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="120px" v-if="form.id!==0">
          <div class="myupload">
            <h3>+</h3>
            <img class="img" :src="imgUrl" alt v-if="imgUrl" />
            <input v-if="info.isshow" type="file" class="ipt" @change="changeFile" />
          </div>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { errorAlert, successAlert } from "../../../ustil/alert";
import { reqcateAdd, reqcateList } from "../../../ustil/https";
import { SuccessAlert } from "../../../ustil/alert";
import path from "path";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
      imgUrl: "",
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqlist: "cate/reqList",
    }),
    //选择了文件
    changeFile(e) {
      let file = e.target.files[0];

      // 判断文件大小  file.size  B  1M=1024KB 1KB =1024B
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件大小不可超过2M");
        return;
      }
      //判断文件类型
      let extname = path.extname(file.name); //.jpg
      let arr = [".jpg", ".jpeg", ".png", ".gif"];
      if (!arr.includes(extname)) {
        errorAlert("请上传正确的图片格式");
        return;
      }

      //URL.createObjectURL(file)把一个文件生成一个URL地址

      this.imgUrl = URL.createObjectURL(file);

      //form.img赋值
      this.form.img = file;
    },
    //点了取消
    cancel() {
      this.info.isshow = false;
    },
    // 清空
    empty() {
      this.form = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    // 点了添加按钮
    add() {
      //ajax
      reqcateAdd(this.form).then((res) => {
        if (res.data.code === 200) {
          //成功弹窗
          successAlert("添加成功");
          //弹框消失
          this.cancel();
          //清空
          this.empty();
          //   刷新
          this.reqlist();
        }
      });
    },
  },
  mounted() {
    //   12.一进来，先获取菜单列表数据
    reqRoleList().then((res) => {
      if (res.data.code == 200) {
        this.roleList = res.data.list;
      }
    });
  },
};
</script>

<style scoped>
.myupload {
  width: 150px;
  height: 130px;
  text-align: center;
  border: 1px solid skyblue;
}
h3 {
  font-size: 50px;
  font-weight: 100;
  text-align: center;
  line-height: 120px;
}
.myupload .img {
  width: 150px;
  height: 100%;
  font-size: 0;
  position: absolute;
  top: 0;
  left: 0;
}
.myupload .ipt {
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 100%;
  outline: none;
  cursor: pointer;
  opacity: 0;
}
</style>