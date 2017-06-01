<template>
  <div class="loginBox" @keyup.enter="login">
      <div class="loginTitle">
        <h2>CERT</h2>
        <h3>专注IT技术、服务交大师生</h3>
      </div>
      <div class="inputLine">
        <input type="text" placeholder="请输入账号" v-model="account" ref="account">
      </div>

      <div class="inputLine">
        <input type="password" placeholder="请输入密码" v-model="password" ref="password" :class="input" @keyup="changeErr">
        <input type="hidden" :value="token">
      </div>
      <div class="checkLine" v-show="!validation">
        <span class="inputErr" >名字或密码错误</span>
      </div>
      <div class="checkLine">
        <span class="checkboxBorder" @click="select">
          <span :class="checkboxInside">
          </span>
          <input type="checkbox" class="rememberMe" v-model="remember">
        </span>
        <span class="checkboxWord">记住密码</span>
      </div>
      <div class="btnLine">
        <button class="btnLogin" @click="login" >登录</button>
        <button class="btnRegist" @click="register">注册</button>
      </div>
  </div>
</template>

<style lang="stylus">
  @import "../assets/styles/common.styl"
  .loginBox
    border-radius: 5px
    -moz-border-radius: 5px
    background-clip: padding-box
    margin: 0px auto
    width: 350px
    padding: 15px 35px 15px
    background: #fff
    border: 1px solid #eaeaea
    box-shadow: 0 0 25px #cac6c6
    font-size: fontSize * 1.3

  .loginTitle
    font-size: fontSize * 1.6
    padding-bottom: 15px
    h2
      text-shadow: 0px 0px 5px rgba(106, 210, 119, 0.37)

  .btnRegist
    background-color: rgba(106, 210, 119, 1) 
    &:hover
      background-color: #4dc35c
      border-color: #4dc35c

  .checkboxBorder,.checkboxInside,.inside
    cursor: pointer
    display: inline-block
    position: relative
    white-space: nowrap

  .rememberMe
    opacity 0
  .checkboxBorder
    width 18px
    height 20px
    outline 0
    border:1px solid btnColor
    border-radius: 3px
    margin-right: 5px 
    line-height: 1;
    vertical-align: middle;
  .checkboxInside
    width 18px
    height 20px
    background-color: btnColor
    &:after
      content:""
      display:block
      margin: 3px auto
      width:4px
      height: 8px
      border-right:2px white solid
      border-bottom: 2px white solid
      transform: rotateZ(50deg)
  .checkboxWord
    font-size: fontSize * 1.1
    vertical-align: middle
    font-weight: bold

    

</style>
<script>
import {mapGetters,mapState} from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      account: '', //账号
      password: '', //密码 
      input:'',     //input 框class
      remember:false, //记住我
      checkboxInside:'inside' , //checkbox 的内部
      token:'', //token
      sessionID:'', //session
      validation:true, //是否验证
      focusStatus:false, //密码框是否选中,
      loginApi:'/login',
      get:""
    }
  },
  methods: {
    validate (status) { //检测密码是否正确 尚未完成
      if(status == 200){ //如果状态码为200，则通过验证，跳转页面
        this.$store.commit('isLogin',{userName:this.account,keep:30})
        this.$router.push({name:"HelloID",params:{userID:this.account}})
      }else if(status == 404){//如果状态码为404，密码错误，输入框变红，提示信息出现
        this.validation = false
        this.input="inputErr"
        this.focusStatus = true
        this.$refs.password.focus(this.focusStatus);
      }
    },
    changeErr () {//改变input 值
      this.focusStatus = true
      if(this.focusStatus){
        this.input = ""
        this.validation = true
      }
    },
    login () { //登录
      var pwd = this.password
      var account = this.account
      this.$http.post(this.loginApi, { //提交密码账号
        username: account,
        password: pwd,
        token:this.token,
        sessionID:this.sessionID,
        remember:this.remember
      }, {}).then((response) => {//成功后验证
        this.validate(response.data.status)
        console.log(this.sessionID)
        this.setCookie()
      })
    },
    select () { //设置cookie
      this.checkboxInside = (this.checkboxInside=="inside")?"checkboxInside":"inside" //改变checkboxInside 的Class
      this.remember = (this.remember)?false:true //改变remember的值
    },
    setCookie (){ //设置cookies
      var date = (new Date()).getTime();
      var newDate = new Date(date + 30*24*60*60*1000) 
      document.cookie = "session="+ this.sessionID + ";expires=" + newDate.toGMTString();
      document.cookie = "remember="+ this.remember + ";expires=" + newDate.toGMTString();
      if(this.remeber){
        document.cookie = "userName="+ this.account + ";expires=" + newDate.toGMTString();
      }else{
        sessionStorage.setItem("user", this.account)
      }
    },
    register () {
      this.$router.push({path:"/Register"})
    }
  },
  created: function (){ //获取token等信息
      var date = (new Date()).getTime();
      var newDate
      console.log(this.$store)
      var sessionID = document.cookie.replace(/(?:(?:^|.*;\s*)session\s*\=\s*([^;]*).*$)|^.*$/, "$1")//获取cookie
      var remember = document.cookie.replace(/(?:(?:^|.*;\s*)remember\s*\=\s*([^;]*).*$)|^.*$/, "$1")//是否记住
      this.$http.post(this.loginApi, {
        'date':date,
        'sessionID': sessionID,
        'remember': remember
      }, {}).then((response) => {
        console.log(response.data)
        if(response.data.remember == 200){
          this.$router.push({name:"Hello",params:{userID:response.data.userID}})
        }else{
          newDate = new Date(response.data.final)
          this.token = response.data.token
          this.sessionID =  response.data.sessionID
        }

      });
  },
  beforeRouteLeave (to, from, next) {
      console.log(this.$store.state.count)
      next()
  }
}
</script>
