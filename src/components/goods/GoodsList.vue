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
          <el-select
            v-model="shopCateValue"
            placeholder="请选择"
            @change="shopcate"
          >
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
        <el-button type="primary" class="search">搜索</el-button>
      </div>
    </div>
    <el-button type="primary" class="search" @click="exportExcel"
      >表格导出</el-button
    >
    <el-button type="primary" class="search" @click="importExcel"
      >数据导入</el-button
    >
    <el-table
      :data="goodListData"
      @selection-change="selectionChange"
      border
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="index" align="center"> </el-table-column>
      <el-table-column
        prop="shopName"
        label="商品名称"
        align="center"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="serverFee"
        label="服务费率"
        align="center"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="saleFee"
        label="销售价格"
        align="center"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="shopStatus"
        label="商品状态"
        align="center"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="创建时间"
        align="center"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="" label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import xslx from "xlsx";
export default {
  name: "GoodsList",
  data() {
    return {
      shopname: "",
      startTime: "",
      endTime: "",
      shopCateOptions: [
        //商品分类选项
        {
          value: "苹果"
        },
        {
          value: "橘子"
        },
        {
          value: "火龙果"
        }
      ],
      shopStatusOption: [
        {
          value: "在售"
        },
        {
          value: "下架"
        },
        {
          value: "待审核"
        }
      ],
      shopCateValue: "",
      shopStatusValue: "",
      selectionList: [], //选中的列表项
      goodListData: [
        {
          shopName: "西瓜",
          serverFee: "0.1",
          saleFee: "10",
          shopStatus: "在售中",
          createDate: "2020-01-12"
        },
        {
          shopName: "西瓜",
          serverFee: "0.1",
          saleFee: "10",
          shopStatus: "在售中",
          createDate: "2020-01-12"
        },
        {
          shopName: "西瓜",
          serverFee: "0.1",
          saleFee: "10",
          shopStatus: "在售中",
          createDate: "2020-01-12"
        }
      ]
    };
  },
  methods: {
    shopcate(e) {
      console.log(e);
    },
    //选择列表项
    selectionChange(value) {
      this.selectionList = value;
    },
    //表格导出
    exportExcel() {
      if (this.selectionList.length <= 0) {
        this.$message({
          message: "请先选择要导出的数据！",
          type: "warning",
          showClose: true
        });
        return;
      }
      let arr = this.selectionList.map(item => {
        return {
          商品名称: item.shopName,
          服务费率: item.serverFee,
          销售价格: item.saleFee,
          商品状态:item.shopStatus
        };
      });
       let sheet = xslx.utils.json_to_sheet(arr)
       let book = xslx.utils.book_new();
      xslx.utils.book_append_sheet(book, sheet, "sheet1");
      xslx.writeFile(book, `user${new Date().getTime()}.xls`);
    },
    importExcel(){
        this.$router.push('/home/goods/importData')
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
    width: 100px;
  }
}
</style>
