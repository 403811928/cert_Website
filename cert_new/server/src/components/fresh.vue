<template>
  <home>
    <div slot="content" class="itemList">
      <div class="pageTitle">
        <h2>新生报名</h2>
        <!--@click="addPhoto" -->
      </div>
      <div class="toast" v-show="toastShow">
        <p class="toastContent">{{toast}}成功</p>
      </div>
      <table class="tableBox">
        <tr class="tableLine tableHead">
          <th>序号</th>
          <th class="itemImg">姓名</th>
          <th class="itemDescribe">QQ</th>
          <th class="itemDate">电话</th>
          <th class="itemDate">专业信息</th>
          <th class="itemBtn">操作</th>
        </tr>
        <tr class="tableLine" v-if="listItem.length == 0">
          <td colspan="6">无信息</td>
        </tr>
        <tr class="tableLine tableMain" v-for="(item,index) in listItem">
          <td>{{ index+1 }}</td>
          <td>
            {{item.name}}
          </td>
          <td>
            {{item.QQ}}
          </td>
          <td>
            {{item.phone}}
          </td>
          <td>
            {{item.describe}}
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
      toast: "",
      toastShow: false,
      postURL: "http://localhost:3000/fresh/",

    }
  },
  components: { home, uploadImg },
  methods: {
    fix(num) {

    },
    validate(data) {
      if (data == 404) {
        this.$router.push({ path: "/" })
        window.localStorage.removeItem("token");
        this.showToast("token验证失败,请重新登录");
      }
    },
    del(num) {
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
    showToast(value, time = 800) {
      this.toastShow = !this.toastShow;
      this.toast = value;
      let that = this;
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
    }
  },
  created() {
    this.getInfo()
  }
}
</script>