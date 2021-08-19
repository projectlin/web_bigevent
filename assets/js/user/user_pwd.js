$(function() {
    var form = layui.form
    var layer = layui.layer
        //验证表单
    form.verify({
            pass: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            samepwd: function(value) {
                if ($('[name=oldPwd]').val() === value) {
                    return '新旧密码不能一致'
                }
            },
            repwd: function(value) {
                if ($('[name=newPwd]').val() !== value) {
                    return '前后密码不一致，请重新输入'
                }
            }
        })
        //重置密码
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    // console.log(res);
                    return layer.msg('重置密码失败')
                }
                layer.msg('重置密码成功');
                //重置完之后我们需要重置表单
                $('.layui-form')[0].reset()
            }

        })

    })
})