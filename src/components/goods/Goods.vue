<template>
  <div class="goodsPage">
    <el-container class="container">
      <el-aside width="200px">
        <el-menu
          default-active="/home/goods/goodsList"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            v-for="(item,index) in goodsTitleList"
            :key="index"
            :index="item.path"
          >
            <i class="el-icon-menu"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "Goods",
  data() {
    return {
      goodsTitleList: [{ title: "商家列表",path:"/home/goods/goodsList" }, { title: "商家分组",path:'/home/goods/goodsGroup' }]
    };
  },
  methods: {
    handleSelect(path) {
      console.log('22222')
          this.$router.push(path);
      }
  }
};
</script>
<style lang="scss" scoped>
.goodsPage {
  height: 100%;
  width: 100%;
  background: skyblue;
}
.container {
  height: 100%;
}
::v-deep .el-aside {
  width: 100px;
  background: #545c64;
  padding: 20px 0 20px;
}
::v-deep .el-container {
  text-align: left;
}
</style>
