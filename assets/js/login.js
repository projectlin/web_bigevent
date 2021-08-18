$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
            $('.login-box').hide();
            $('.reg-box').show();
        })
        // 点击“去登录”的链接
    $('#link_login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    })


    var form = layui.form; // 从layUI中获取form对象
    var layer = layui.layer; // 从layUI中获取form对象
    // 通过form.verify（）函数自定义校验规则
    form.verify({
        // 自定义了一个叫做pwd校验的规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) { //通过形参拿到的是确认密码框中的内容
            var pwd = $('.reg-box [name=password]').val(); //这里是拿到密码框中的内容
            if (pwd !== value) { //进行判断两次的值是否相等
                return '两次输入的密码不一致' //如果不等，就return一个消息
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
            //1、阻止默认的提交行为
            e.preventDefault();
            var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
                //2、发起Ajax的post请求
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message); //注意layer不能直接使用我们需要先获取过来
                }
                layer.msg('注册成功');
                // 模拟人的点击行为
                $('#link_login').click()
            })
        })
        //监听登录表单的登录事件
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(), //注意这种快捷写法
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('密码错误')
                }
                // console.log(res.token);
                layer.msg('登录成功')
                    //登录成功后得到的 token 字符串，保存到localStoreage中
                localStorage.setItem('token', res.token)
                    //跳转到后台的主页
                location.href = '/index.html'
            }

        })
    })

})