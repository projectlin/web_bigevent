$(function() {
    //定义一个查询的参数对象，将来请求数据的时候，需要将请求参数对象提交到服务器
    var layer = layui.layer
    var form = layui.form

    //定义美化时间的过滤器
    // template.defaults.impotrs.dataFormat = function(date) {
    //         const dt = new Date(date) //const是一个关键字

    //         var y = dt.getFullYear()
    //         var m = padZero(dt.getMonth() + 1)
    //         var d = padZero(dt.getDate())

    //         var hh = padZero(dt.getHoursgeth());
    //         var mm = padZero(dt.getMinutes());
    //         var ss = padZero(dt.getSeconds());

    //         return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss

    //     }
    //     // 定义一个补0的函数
    // function padZero(n) {
    //     return n > 9 ? n : '0' + n

    // }
    var q = {
        pagenum: 1, //页码值，默认请求第一页的数据
        pagesize: 2, //每页显示多少条数据 ,默认每页显示2条
        cate_id: '', // 文章分类的id
        state: '' //文章发布的状态
    }
    initTable()
        //获取文章列表的数据
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表数据失败')
                }
                //获取后我们通过template模板引擎来渲染文章列表数据
                var htmlstr = template('tpl-table', res)
                $('tbody').html(htmlstr)
                    // console.log(res);
                    // form.render()
            }
        })

    }
    // 初始化文章分类的方法
    // function initCate() {
    //     $.ajax({
    //         method:
    //     })
    // }
})