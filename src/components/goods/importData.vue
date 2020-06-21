<template>
  <div class="importDataPage">
    <el-button type="primary"  @click="backPrePage"
      >返回上一页</el-button
    >
   <el-upload
        action
        accept=".xlsx, .xls"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handle"
      >
        <el-button type="primary">选取EXCEL文件</el-button>
      </el-upload>
    <el-table
      :data="goodListData"
      border
      style="width: 100%"
    >
      <el-table-column type="index" align="center"> </el-table-column>
      <el-table-column prop="img" label="商品图片" align="center" width="180">
      </el-table-column>
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
    </el-table>
  </div>
</template>
<script>
import xlsx from "xlsx";
export default {
  name: "importData",
  data() {
    return {
      goodListData: [
        {
          shopName: "西瓜",
          serverFee: "0.1",
          saleFee: "10",
          shopStatus: "在售中"
        }
      ]
    };
  },
  methods: {
    backPrePage() {
      this.$router.back();
    },
   async handle(e){
        //获取file文件对象
        let file=e.raw
        let data=await this.readFile(file)
        let workbook=xlsx.read(data, { type: "binary" })
        let worksheet=workbook.Sheets[workbook.SheetNames[0]]
        data = xlsx.utils.sheet_to_json(worksheet);
        //转化后的data格式 (也可能有其他的数据列表，我们只要过滤服务端需要的数据即可)：
        //[{商品名称: "测试1", 服务费率: '1', 销售价格: '1',商品状态:'在售中'}]
        //把读取出来的数据变为最后可以传递给服务器的数据格式
        let arr=[]
        //需要的字段及格式
        let character={
            shopName:{
                text:'商品名称',
                type:'string'
            },
            serverFee:{
                text:'服务费率',
                type:'string'
            },
            saleFee:{
                text:'销售价格',
                type:'string'
            },
            shopStatus:{
                text:'商品状态',
                type:'string'
            }
        }
        data.forEach((item)=>{
            let obj={}
            for(let key in character){
                //从数据结构中获取表格读取数据中对应的标题
                let text=character[key].text
                //根据对应的标题，从读取的数据中获取对应的值
                let value=item[text]||""
                obj[key]=value
            }
            arr.push(obj)
        })
        this.goodListData = arr;

    },
    readFile(file){
        //FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容
        return new Promise(resolve=>{
            let reader=new FileReader()
            //把文件按照二进制进行读取
            reader.readAsBinaryString(file)
            reader.onload=(e)=>{
                resolve(e.target.result)
            }

        })


    }
  }
};
</script>
<style lang="scss" scoped></style>
