// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  options.url = 'http://ajax.frontend.itheima.net' + options.url;
  console.log(options.url);
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = { Authorization: localStorage.getItem('token') || '' }
  }
  //不论成功还是失败,最终都会执行complete回调函数
  options.complete = function (res2) {
    console.log(res2);
    console.log(res2.responseJSON);
    if (res2.responseJSON.status === 1 & res2.responseJSON.message == '身份认证失败！') {
      localStorage.removeItem('token');
      location.href = '/login.html'
    }
  }
})