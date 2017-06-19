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
            <form action="" class="addInfoForm">
              <div class="inputLine">
                <label for="">学长姓名</label>
                <input type="text" name="addName" placeholder="请输入学长姓名" v-model="addName">
              </div>
              <div class="inputLine">
                <label for="">大佬图片</label>
                <uploadImg inputName="addImg" v-on:upload="setImgSrc"></uploadImg>
  
              </div>
              <div class="inputLine">
                <label for="">大佬简介</label>
                <textarea class="itemDescribe" name="addDescribe" placeholder="请输入对商品的描述" v-model="addDescribe"></textarea>
              </div>
              <div class="inputLine">
                <button @click="">提交</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <table class="tableBox">
        <tr class="tableLine tableHead">
          <th>序号</th>
          <th class="itemName">大佬名字</th>
          <th class="itemInfo">大佬简介</th>
          <th class="itemImg">大佬照片</th>
          <th class="itemDescribe">大佬寄语</th>
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
            <img :src="img.src" alt="" class="showImg" v-for="img in item.Img">
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
      listItem: [{
        name: "asdasdasdasd",
        price: "200"
      }],
      pageCount: 5,
      layerShow: false,
      addDescribe: '',
      addName: '',
      postURL: "http://localhost:3000/famous/"
    }
  },
  methods: {
    setImgSrc(value) {
      this.imgSrc = value
      console.log(value)
    },
    addFamous() {
      this.layerShow = !this.layerShow
    },
    cancel() {
      this.layerShow = !this.layerShow
    }
  },
  created() {
    this.$http.get(this.postURL).then((req) => {
      console.log(req.data);
    })
  }
}
</script>