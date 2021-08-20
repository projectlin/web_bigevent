$(function() {
    var layer = layui.layer
    var form = layui.from
    initArtCateList()


    //获取文章分类的列表
    function initArtCateList() {
        $.ajax({ //这里发起ajax请求是没有添加点击事件注意和有加点击事件的
            method: 'get',
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res);
                var htmlstr = template('tpl-table', res);
                $('tbody').html(htmlstr);
            }
        })
    }
    var index = null
        //添加类别的弹出层
    $('#btnAddCate').on('click', function() {
        index = layer.open({
            area: ['500px', '250px'],
            type: 1,
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    //通过代理的形式，为form绑定submit事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增文章列表失败')
                }
                //提交成功后我们又需要重新渲染页面，所以调用获取文章分类的列表的函数
                initArtCateList()
                    //当我们提交成功后，我们需要弹出框会自动关闭
                layer.close(index)
            }
        })
    })

    //通过代理的形式，为编辑按钮绑定click事件
    $('tbody').on('click', '.btn-edit', function() {
        index = layer.open({
                area: ['500px', '250px'],
                type: 1,
                title: '修改文章分类',
                content: $('#dialog-edit').html()
            })
            //点击之后获取相对应的id号
        var id = $(this).attr('data-id')
            // console.log(id);
            //发起请求获取对应的分类的数据
        $.ajax({
            method: 'get',
            url: '/my/article/cates/',
            // data: $(this).serialize(),
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('修改失败！')
                }
                form.val("formedit", res.data);
            }
        })

    })


    //通过代理的形式，为删除按钮绑定click事件
    $('tbody').on('click', '.btn-delete', function() {
        // console.log('ok');
        var id = $(this).attr('data-id') //attr获取自定义属性的值，这里是用来获取该类的id值
        layer.confirm('是否删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/',
                success: function(res) {
                    if (res.status !== 0) {
                        console.log(res);
                        return layer.msg('删除文章失败')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })
    })
})