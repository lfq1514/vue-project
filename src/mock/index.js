import Mock from 'mockjs'
Mock.mock('/api/login', 'get', {
    code: 200,
    msg: '登录成功'
})

let {list} = Mock.mock({
    'list|8': [
        {
            shopName: "@ctitle",
            shopImg: "@image('100x100','red','blue','png','测试')",
            serverFee: "@number",
            saleFee: "@number",
            shopStatus: "@ctitle",
            createDate: "@date('yyyy-mm-dd hh:mm:ss')",
        }

    ]

})

Mock.mock('/api/getGoodsList', 'get', (options) => {
    return {
        code:200,
        list:list,
        total:list.length
    }

})