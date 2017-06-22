<template>
  <home>
    <div class="itemList" slot="content">
      <div class="pageTitle">
        <h2>名人堂</h2>
        <button class="btnLogin" @click="addFamous()">添加</button>
      </div>
  
      <div class="layer" v-show="layerShow">
        <div class="addInfo">
          <div class="layerHeader">
            <div class="layerTitle">
              添加信息
              <div class="cancel">
                <div class="icon layerIcon" @click="cancel()"></div>
              </div>
            </div>
  
          </div>
          <div class="layerContent">
            <form class="addInfoForm" enctype='multipart/form-data' action="javascript: void(0);">
              <div class="inputLine">
                <label for="">学长姓名</label>
                <input type="text" name="addName" placeholder="请输入学长姓名" v-model="addName">
              </div>
              <div class="inputLine">
                <label for="">学长照片</label>
                <uploadImg inputName="addImg" v-on:upload="setImgSrc"></uploadImg>
  
              </div>
              <div class="inputLine">
                <label for="">学长简介</label>
                <textarea class="itemInfo" name="addInfo" v-model="addInfo"></textarea>
              </div>
              <div class="inputLine">
                <label for="">学长寄语</label>
                <textarea class="itemDescribe" name="addDescribe" v-model="addDescribe"></textarea>
              </div>
              <div class="inputLine">
                <button @click="upload()">提交</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="toast" v-show="toastShow">
        <p class="toastContent">{{toast}}成功</p>
      </div>
      <table class="tableBox">
        <tr class="tableLine tableHead">
          <th>序号</th>
          <th class="itemName">学长名字</th>
          <th class="itemInfo">学长简介</th>
          <th class="itemImg">学长照片</th>
          <th class="itemDescribe">学长寄语</th>
          <th class="itemBtn">操作</th>
        </tr>
        <tr class="tableLine" v-if="listItem.length == 0">
          <td colspan="6">无信息</td>
        </tr>
        <tr class="tableLine tableMain" v-for="(item,index) in listItem">
          <td>{{ index+1 }}</td>
          <td>{{item.name}}</td>
          <td>{{item.info}}</td>
          <td>
            <img :src="item.src" alt="" class="showImg">
          </td>
          <td>
            {{item.describle}}
          </td>
          <td class="itemImg">
            <button class="btnFix" @click="fix(item.num)">修改</button>
            <button class="btnDel" @click="del(item.num)">删除</button>
          </td>
        </tr>
      </table>
      <div class="pageBox">
        <button class="btnPage btnLast">上一页</button>
        <div class="btnGroup">
          <button class="btnPage" v-for="(page,index) in pageCount" @click="page(index)">{{index+1}}</button>
        </div>
        <button class="btnPage btnNext">下一页</button>
      </div>
    </div>
  </home>
</template>
<style lang="stylus">
@import "../assets/styles/icons/iconfont.css"
.layerIcon:before,.layerIcon:after
  background red!important
</style>
<script>
import home from "../common/home.vue"
import uploadImg from "../common/uploadImg.vue"
export default {
  name: 'addInfo',
  components: { home, uploadImg },
  data() {
    return {
      listItem: [],
      pageCount: 5,
      layerShow: false,
      addDescribe: '',
      addName: '',
      addInfo: '',
      postURL: "http://localhost:3000/famous/",
      addImg: {},
      toast: "",
      toastShow: false
    }
  },
  methods: {
    validate(data) {
      if (data == 404) {
        this.$router.push({ path: "/" })
        window.localStorage.removeItem("token");
        this.showToast("token验证失败,请重新登录");
      }
    },
    setImgSrc(value, file) {
      this.addImg = file
      console.log(value, file)
    },
    addFamous() {
      this.layerShow = !this.layerShow
    },
    cancel() {
      this.layerShow = !this.layerShow
    },
    upload() {
      const formData = new FormData()
      formData.append('file', this.addImg)
      formData.append('addName', this.addName)
      formData.append("addInfo", this.addInfo)
      formData.append("addDescribe", this.addDescribe)
      formData.append("token", window.localStorage.getItem("token"))
      let config = {
        header: { 'Content-type': 'application/x-www-form-urlencoded' }
      }
      if (this.addImg) {
        this.$http.post(this.postURL, formData, config).then((res) => {
          console.log(res.status)
          if (res.status == 200) {
            this.layerShow = !this.layerShow;
            this.getInfo()
            this.showToast("添加");
          } else {
            this.$router.push({ path: "/" })
            window.localStorage.removeItem("token")
          }
        });
      } else {

      }

    },
    showToast(value, time = 800) {
      this.toastShow = !this.toastShow;
      this.toast = value;
      let that = this;
      console.log(time)
      setTimeout(function () { that.toastShow = !that.toastShow }, time);
    },
    getInfo() {
      this.$http.get(this.postURL, { params: { token: window.localStorage.getItem("token") } }).then(res => {
        if (res.data.status == 404) {
          this.$router.push({ path: "/" })
          window.localStorage.removeItem("token")
        } else if (res.data.status == 200) {
          this.listItem = [];
          res.data.data.forEach((item) => {
            this.listItem.push(item)
          }, this)
        }
      })
    },
    del(num) {
      console.log(num)
      this.$http.patch(this.postURL, { "data": num, "token": window.localStorage.getItem("token") }).then(res => {
        if (res.data.status == 200) {
          this.getInfo()
          this.showToast("删除");
        } else if (res.data.status == 404) {
          this.$router.push({ path: "/" })
          window.localStorage.removeItem("token")
        }
      })
    }
  },
  created() {
    this.getInfo()
  }
}
</script>