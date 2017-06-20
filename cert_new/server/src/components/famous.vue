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
            <img :src="item.src" alt="" class="showImg" >
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
      addImg: {}
    }
  },
  methods: {
    setImgSrc(value,file) {
      this.addImg = file
      console.log(value,file)
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
      formData.append('addName',this.addName)
      formData.append("addInfo",this.addInfo)
      formData.append("addDescribe",this.addDescribe)
      let config={
        header:{ 'Content-type': 'application/x-www-form-urlencoded' }
      }
      this.$http.post(this.postURL, formData,config ).then((res) => {
        console.log(res.status)
        if (res.status == 200) {
          this.layerShow=!this.layerShow;
          this.$router.go(0)
        }
      });
    },
    del(num){
      console.log(num)
      this.$http.patch(this.postURL,{"data":num}).then(res=>{
        if(res.data.status==200){
          this.$router.go(0)
        }
      })
    }
  },
  created() {
    this.$http.get(this.postURL).then((res) => {
      console.log(res.data.data);
      res.data.data.forEach((item)=>{
        this.listItem.push(item)
      },this)
    })
  }
}
</script>