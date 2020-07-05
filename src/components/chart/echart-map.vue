<template>
  <div class="echartPage">
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import jsonp from 'jsonp'
import 'echarts/map/js/china'


    let option = {
      series: [
        {
          type:'map',
          map:'china',
          label:{
            show:true,
            fontSize:12,
            color:'red'
          },

          //鼠标滑过之后配置
          emphasis:{
            label:{
              color:'#fff',
            },
            itemStyle:{
              areaColor:'#83b5e7'
            }

          },
          data:[
            {name:'',value:''}

          ]
        },
      ],
      visualMap:[
        {
          type:'piecewise',
          show:true,
          splitNumber:5,
          pieces:[
            {min:10000},
            {min:1000,max:9999},
            {min:100,max:999},
            {min:10,max:99},
            {min:0,max:9},

          ],
          inRange:{
            symbol:'rect',
            color:['#ffc0b1','#9c0505']
          }
        }
      ]
    };
export default {
  name: "Echart",
  data() {
    return {};
  },
  mounted() {
    this.getData()
    this.myChart = echarts.init(document.getElementById("main"));


    // 使用刚指定的配置项和数据显示图表。
    this.myChart.setOption(option);
  },
  methods: {
    getData(){
      jsonp('https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427',{},(err,data)=>{
        if(!err){
          let dataList=data.data.list.map((item)=>{
            return {
              name:item.name,
              value:item.value
            }

          })
          option.series[0].data=dataList
          this.myChart.setOption(option);

        }

      })


    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.echartPage {
  height: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.canvas {
  border: 1px solid #ccc;
}
</style>
