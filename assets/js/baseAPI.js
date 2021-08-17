$.ajaxPrefilter(function(options) {
    // 注意：每次调用$.get()和$.post以及$.ajax()的时候都会先调用ajaxPrefilter这个函数，在这个函数中，可以拿到我们给的ajax提供的根路径
    options.url = "http://api-breakingnews-web.itheima.net" + options.url
        // console.log(options.url);
})