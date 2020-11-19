<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="标题" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="120px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeFile"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title==='添加轮播图'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "../../../ustil/alert";
import {
  reqBannerAdd,
  reqBannerInfo,
  reqBannerUpdate,
} from "../../../ustil/https";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        title: "",
        img: null,
        status: 1,
      },
      imgUrl: "",
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqList: "banner/reqList",
    }),
    //弹窗消失
    cancel() {
      this.info.isshow = false;
    },
    //清空
    empty() {
      this.form = {
        title: "",
        img: null,
        state: 1,
      };
      this.imgUrl = "";
    },
    //element-ui的文件上传
    changeFile(e) {
      let file = e.raw;
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    // 添加
    add() {
      reqBannerAdd(this.form).then((res) => {
        if (res.data.code === 200) {
          //成功弹窗
          console.log(res);
          successAlert("添加成功");
          //弹框消失
          this.cancel();
          //清除
          this.empty();
          // 刷新
          this.reqList();
        }
      });
    },
    // 获取一天数据
    getOne(id) {
      reqBannerInfo(id).then((res) => {
        // console.log(res);
        this.form = res.data.list;
        this.imgUrl = this.$imgPre + this.form.img;
        // 补id
        this.form.id = id;
      });
    },
    // 修改
    update() {
      reqBannerUpdate(this.form).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          //弹成功
          successAlert("修改成功");
          //弹框消失
          this.cancel();
          //数据清空
          this.empty();
          //刷新list
          this.reqList();
          console.log('123');
        }
      });
    },
  },
};
</script>

<style scoped >
.add >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>