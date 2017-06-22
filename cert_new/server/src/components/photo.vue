<template>
  <home>
    <div slot="content" class="itemList">
      <div class="pageTitle">
        <h2>社团照</h2>
        <button class="btnLogin" @click="addPhoto()">添加</button>
        <!--@click="addPhoto" -->
      </div>
      <div class="toast" v-show="toastShow">
        <p class="toastContent">{{toast}}成功</p>
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
                <label for="">选择照片</label>
                <uploadImg inputName="photoImg" v-on:upload="setImgSrc"></uploadImg>
              </div>
              <div class="inputLine">
                <label for="">照片描述</label>
                <input type="text" name="photoDescribe" placeholder="请输入此照片的描述" v-model="photoDescribe">
              </div>
              <div class="inputLine">
                <label for="">拍摄时间</label>
                <input type="text" name="photoDate" placeholder="请输入此照片的拍摄日期" v-model="photoDate">
              </div>
              <div class="inputLine">
                <button @click="upload()">提交</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <table class="tableBox">
        <tr class="tableLine tableHead">
          <th>序号</th>
          <th class="itemImg">照片</th>
          <th class="itemDescribe">照片描述</th>
          <th class="itemDate">拍摄时间</th>
          <th class="itemBtn">操作</th>
        </tr>
        <tr class="tableLine" v-if="listItem.length == 0">
          <td colspan="6">无信息</td>
        </tr>
        <tr class="tableLine tableMain" v-for="(item,index) in listItem">
          <td>{{ index+1 }}</td>
          <td>
            <img :src="item.src" alt="" class="showImg">
          </td>
          <td>
            {{item.describle}}
          </td>
          <td>
            {{item.date}}
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
.layerIcon:before,.layerIcon:after
  background red!important
</style>
<script>
import home from "../common/home.vue"
import uploadImg from "../common/uploadImg.vue"
export default {
  name: "itemList",
  data() {
    return {
      listItem: [],
      pageCount: 5,
      photoDescribe: '',
      layerShow: false,
      photoDate: "",
      photoImg: {},
      toast: "",
      toastShow: false,
      postURL: "http://localhost:3000/photo/"
    }
  },
  components: { home, uploadImg },
  // created () {
  //    this.$http.post(this.loginApi, { //提交密码账号
  //     }, {}).then((response) => {//成功后验证
  //         this.listItem = response.listItem
  //     })
  // },
  methods: {
    validate(data) {
      if (data == 404) {
        this.$router.push({ path: "/" })
        window.localStorage.removeItem("token");
        this.showToast("token验证失败,请重新登录");
      }
    },
    fix(num) {

    },
    upload() {
      console.log('asd')
      const formData = new FormData()
      formData.append('file', this.photoImg)
      formData.append("photoDescribe", this.photoDescribe)
      formData.append("photoDate", this.photoDate)
      formData.append("token", window.localStorage.getItem("token"))
      let config = {
        header: { 'Content-type': 'application/x-www-form-urlencoded' }
      }
      if (this.photoImg) {
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
          console.log(this.listItem)
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
    },
    setImgSrc(value, file) {
      this.photoImg = file
      console.log(value, file)
    },
    addPhoto() {
      this.layerShow = !this.layerShow
    },
    cancel() {
      this.layerShow = !this.layerShow
    }
  },
  created() {
    this.getInfo()
  }
}
</script>