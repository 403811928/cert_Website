<template>
  <home>
    <div class="itemList" slot="content">
      <div class="pageTitle">
        <h2>名人堂</h2>
        <button class="btnLogin" @click="addFamous()">添加</button>
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

    }
  },
  methods: {
    setImgSrc(value) {
      this.imgSrc = value
      console.log(value)
    },
    addFamous() {
      this.layerShow = !this.layerShow
    }
  }
}
</script>