<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="form">
        <el-form-item label="一级分类" label-width="120px">
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="changeFirst">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="120px">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" label-width="120px">
          <el-input v-model="form.goodsname" autocomplete="off" placeholder="请输入商品价格"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px">
          <el-input v-model="form.price" autocomplete="off" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="120px">
          <el-input v-model="form.market_price" autocomplete="off" placeholder="请输入市场价格"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="120px">
          <!-- 上传文件 -->
          <div class="myupload">
            <h3>+</h3>
            <img class="img" v-if="imgUrl" :src="imgUrl" alt />

            <input v-if="info.isshow" type="file" class="ipt" @change="changeFile" />
          </div>
        </el-form-item>

        <el-form-item label="商品规格" label-width="120px">
          <el-select v-model="form.specsid" placeholder="请选择" @change="changeSpecsId">
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" label-width="120px">
          <el-select v-model="form.specsattr" placeholder="请选择">
            <el-option v-for="item in attrsList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="120px">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="120px">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加商品'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "../../../ustil/alert";
import {
  reqcateList,
  reqgoodsAdd,
  reqgoodsDetail,
  reqgoodsUpdate,
} from "../../../ustil/https";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      // 二级分类的list
      secondCateList: [],
      // 图片的临时地址
      imgUrl: "",
      // 规格属性的list
      attrsList: [],
    };
  },
  computed: {
    ...mapGetters({
      // 一级分类
      cateList: "cate/list",
      // 规格list
      specsList: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      // 请求一级分类list
      reqCateList: "cate/reqList",
      // 请求规格list
      reqSpecsList: "specs/reqList",
      // 商品list和总数
      reqGoodsList: "goods/reqList",
      reqGoodsCount: "goods/reqCount",
    }),
    // 根据一级分类id，得到二级分类list
    changeFirst() {
      // 二级分类的id重置
      this.form.second_cateid = "";
      this.getSecondList();
    },
    getSecondList() {
      // 获取二级分类list
      reqcateList({ pid: this.form.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
        console.log(this.secondCateList);
      });
    },
    // 处理图片
    changeFile(e) {
      let file = e.target.files[0];
      // 验证
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    // 修改了规格,计算出规格属性的list
    changeSpecsId() {
      // 先将specsattr 置空
      this.form.specsattr = [];
      this.getAttrs();
    },
    getAttrs() {
      // 取出 specList。哪一条数据的id 和this.form.speesid是一样的
      let obj = this.specsList.find((item) => item.id === this.form.specsid);
      // 就将这条数据的attrs取出， 赋值给attrsList
      this.attrsList = obj.attrs;
    },
    // 弹框消失
    cancel() {
      this.info.isshow = false;
    },
    // 新增商品属性
    addAttr() {
      this.attrArr.push({
        value: "",
      });
    },
    //删除商品属性
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },
    // 清空
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //此时是数组，后端要的是 "[]"
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      //二级分类的list
      this.secondCateList = [];
      //图片临时地址
      this.imgUrl = "";
      //规格属性list
      this.attrsList = [];
    },
    // 添加
    add() {
      // this.form.description=this.editor.txt.html()

      let d = { ...this.form };
      d.specsattr = JSON.stringify(d.specsattr);

      reqgoodsAdd(d).then((res) => {
        if (res.data.code === 200) {
          successAlert("添加成功");
          this.cancel();
          this.empty();
          // 刷新
          this.reqGoodsList();
          this.reqGoodsCount();
        }
      });
    },
    // 详情
    getOne(id) {
      reqgoodsDetail(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        // 请求二级list
        this.getSecondList();
        // 图片
        this.imgUrl = this.$imgPre + this.form.img;
        // 属性
        this.form.specsattr = JSON.parse(this.form.specsattr);
        // 计算规格属性的list
        this.getAttrs();
        // 给编辑器赋值
        if (this.editor) {
          this.editor.txt.html(this.form.description);
        }
      });
    },
    // 更新
    update() {
      // this.check().then(() => {
      // this.form.description = this.editor.txt.html();
      let d = { ...this.form };
      d.specsattr = JSON.stringify(d.specsattr);
      reqgoodsUpdate(d).then((res) => {
        if (res.data.code == 200) {
          successAlert("更新成功");
          this.cancel();
          this.empty();
          this.reqGoodsList();
        }
      });
      // });
    },
    closed() {
      if (this.info.title == "编辑商品") {
        this.empty();
      }
    },
  },
  mounted() {
    this.reqCateList();
    this.reqSpecsList(true);
  },
};
</script>

<style scoped >
.line {
  display: flex;
}
.line .el-input {
  flex: 1;
}
.line .el-button {
  width: auto;
}
.myupload {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px dashed #ccc;
  position: relative;
}
.myupload h3 {
  width: 100%;
  height: 100px;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
  color: #666;
  font-weight: 100;
}
.myupload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.myupload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>