$(function () {
  // 点击“去注册账号”的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击“去登录”的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    pwd: [/^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      var pwd = $('.reg-box [name=password]').val();
      if (pwd !== value) {
        return '两次输入密码不一致!'
      }
    }
  })
  //注册页面表单提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    var data = {
      username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()
    };
    // console.log(data);
    $.post('/api/reguser', data, function (res) {
      // console.log(res);
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功,请登录!');
      $('#link_login').click()
    })
  })
  //登录页面表单提交
  $('#form_login').on('submit', function (e) {
    console.log($(this).serialize());
    e.preventDefault();
    $.ajax({
      url: '/api/login',
      method: 'POST',
      //快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {

        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // 将res下token中携带的身份认证字段保存到本地存储
        localStorage.setItem('token', res.token);
        //登录成功后跳转到index.html页面
        location.href = 'index.html'
      }
    })
  })
})
