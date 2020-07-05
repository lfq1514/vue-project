//折线图构造函数
function LineChart(ctx) {

    this.ctx = ctx
    //画布的大小
    console.log(this.ctx)
    this.c_width = this.ctx.canvas.width
    this.c_height = this.ctx.canvas.height
    //网格的大小
    this.gridSize = 10
    //坐标系的间距
    this.space = 20
    //箭头的大小
    this.arrowSize = 10
    //绘制点
    this.dotteSize = 6
    //坐标原点(canvas的坐标是在左上角，我们要转化一下)
    this.x0 = this.space
    this.y0 = this.c_height - this.space
}
//初始化
LineChart.prototype.init = function (data) {
    this.drawGrid()
    this.drawAxis()
    this.drawDotted(data)
}
//绘制网格
LineChart.prototype.drawGrid = function (data) {
    let c_width = this.c_width
    let c_height = this.c_height
    var x_lines = Math.floor(c_height / this.gridSize)
    var y_lines = Math.floor(c_width / this.gridSize)
    for (let i = 0; i <= x_lines; i++) {
        //开始路径
        this.ctx.beginPath()
        this.ctx.moveTo(0, this.gridSize * i - 0.5)
        this.ctx.lineTo(c_width, this.gridSize * i - 0.5)
        this.ctx.strokeStyle = '#eee'
        this.ctx.stroke()
    }
    for (let i = 0; i <= y_lines; i++) {
        //开始路径
        this.ctx.beginPath()
        this.ctx.moveTo(this.gridSize * i - 0.5, 0)
        this.ctx.lineTo(this.gridSize * i - 0.5, c_height)
        this.ctx.strokeStyle = '#eee'
        this.ctx.stroke()
    }
}
//绘制坐标
LineChart.prototype.drawAxis = function () {
    //x轴坐标
    this.ctx.beginPath()
    this.ctx.moveTo(this.x0, this.y0 - 0.5)
    this.ctx.lineTo(this.c_width - this.space + this.arrowSize, this.y0 - 0.5)
    this.ctx.lineTo(this.c_width - this.space, this.y0 - 0.5 - this.arrowSize / 2)
    this.ctx.lineTo(this.c_width - this.space, this.y0 - 0.5 + this.arrowSize / 2)
    this.ctx.lineTo(this.c_width - this.space + this.arrowSize, this.y0 - 0.5)
    this.ctx.strokeStyle = "#000"
    this.ctx.stroke()
    this.ctx.fill()
    //y轴坐标
    this.ctx.beginPath()
    this.ctx.moveTo(this.x0 - 0.5, this.y0)
    this.ctx.lineTo(this.x0 - 0.5, this.y0 - this.c_height + this.space)
    this.ctx.lineTo(this.x0 - 0.5 - this.arrowSize / 2, this.y0 - this.c_height + this.space + this.arrowSize)
    this.ctx.lineTo(this.x0 - 0.5 + this.arrowSize / 2, this.y0 - this.c_height + this.space + this.arrowSize)
    this.ctx.lineTo(this.x0 - 0.5, this.y0 - this.c_height + this.space)
    this.ctx.strokeStyle = "#000"
    this.ctx.stroke()
    this.ctx.fill()



}
//绘制坐标点
LineChart.prototype.drawDotted = function (data) {
    // this.ctx.beginPath()
    // this.ctx.moveTo()
    let pre_x=this.x0,pre_y=this.y0
    data.forEach((item, index) => {
        //坐标转化
        let c_x = this.x0 + item.x
        let c_y = this.y0 - item.y
        this.ctx.beginPath()
        // this.ctx.moveTo(c_x - this.dotteSize / 2, c_y - this.dotteSize / 2)
        // this.ctx.lineTo(c_x + this.dotteSize / 2, c_y - this.dotteSize / 2)
        // this.ctx.lineTo(c_x + this.dotteSize / 2, c_y + this.dotteSize / 2)
        // this.ctx.lineTo(c_x - this.dotteSize / 2, c_y + this.dotteSize / 2)
        this.ctx.fillRect(c_x - this.dotteSize / 2,c_y - this.dotteSize / 2,this.dotteSize,this.dotteSize )
        this.ctx.closePath()
        this.ctx.fill()
        //第一个点作为起点
        // debugger
            this.ctx.beginPath()
            this.ctx.moveTo(pre_x, pre_y)
            this.ctx.lineTo(c_x, c_y)
            this.ctx.closePath()
            this.ctx.strokeStyle = "#000"
            this.ctx.stroke()
            pre_x=c_x
            pre_y=c_y
    })

}


export {
    LineChart
}