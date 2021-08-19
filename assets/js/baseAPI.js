$.ajaxPrefilter(function(options) {
    // 注意：每次调用$.get()和$.post以及$.ajax()的时候都会先调用ajaxPrefilter这个函数，在这个函数中，可以拿到我们给的ajax提供的根路径
    options.url = "http://api-breakingnews-web.itheima.net" + options.url
        // console.log(options.url);
        // 统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' }

    }

    options.complete = function(res) {
        // 在complete回调函数中，可以使用res.responseJSON拿到服务器相应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {

            // 1、强势清空token
            localStorage.removeItem('token');
            //强制跳转到登录界面
            location.href('login.html')
        }
    }
})