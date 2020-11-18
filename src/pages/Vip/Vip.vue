<template>
  <div>
    <!-- list -->
    <v-list></v-list>
    <!-- form -->
    <v-form :info="info"></v-form>
  </div>
</template>

<script>
import vList from "./components/list";
import vForm from "./components/form";
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "会员修改",
      },
    };
  },
  mounted(){

  },
  components: {
    vList,
    vForm,
  },
};
</script>

<style>
</style>