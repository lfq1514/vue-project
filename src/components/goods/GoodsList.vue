<template>
  <div class="goodsListPage">
    <div class="searchBox">
      <div class="search-condition">
        <div class="searchItem">
          <span class="label">商品名称</span>
          <el-input placeholder="请输入内容" v-model="shopname" clearable>
          </el-input>
        </div>
        <div class="searchItem">
          <span class="label">开始时间</span>
          <el-date-picker
            v-model="startTime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
        <div class="searchItem">
          <span class="label">结束时间</span>
          <el-date-picker v-model="endTime" type="date" placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <div class="search-condition">
        <div class="searchItem">
          <span class="label">商品类目</span>
          <el-select v-model="shopCateValue" placeholder="请选择" @change="shopcate">
            <el-option
              v-for="item in shopCateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="searchItem">
          <span class="label">商品类目</span>
          <el-select v-model="shopStatusValue" placeholder="请选择">
            <el-option
              v-for="item in shopStatusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
       <el-button type="primary" class="search">搜索</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsList",
  data() {
    return {
      shopname: "",
      startTime: "",
      endTime: "",
      shopCateOptions: [  //商品分类选项
        {
          value: "苹果"
        },
        {
          value: "橘子"
        },
        {
          value: "火龙果"
        },
      ],
      shopStatusOption:[
          {
              value:'在售'
          },
          {
              value:'下架'
          },
          {
              value:'待审核'
          },
      ],
      shopCateValue: "",
      shopStatusValue: "",
    };
  },
  methods: {
    shopcate(e) {
      console.log(e);
    }
  }
};
</script>
<style lang="scss" scoped>
.goodsListPage {
  height: 100%;
  background: pink;
}
.searchBox {
  display: flex;
  flex-direction: column;
  padding: 20px;
  .searchBtn {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-condition {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    .searchItem {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right: 20px;
      .label {
        min-width: 80px;
      }
    }
  }
  .search {
      margin-top: 20px;
      width: 100px;

  }
}
</style>
