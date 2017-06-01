<template>
  <home>
    <div class="itemList" slot="content">
      <div class="pageTitle">
        <h2>作品集</h2>
        <button class="btnLogin">添加</button>
        <!--@click="addPhoto" -->
      </div>
      <!--<form action="" class="shopInfoForm">
            <div class="inputLine">
              <label for="">作品名字</label><input type="text" name="shopName" placeholder="请输入商铺名字" v-model="shopName">
            </div>
            <div class="inputLine">
              <label for="">作品图片</label>
              <uploadImg inputName="shopImg"  v-on:upload="setImgSrc"></uploadImg>
            </div>
            <div class="inputLine">
              <label for="">作品描述</label>
              <textarea class="itemDescribe" name="shopDescribe" placeholder="请输入对商铺的描述" v-model="shopDescribe"></textarea>
            </div>
            <div class="inputLine">
              <button @click="">提交</button>
            </div>
          </form> -->
      <table class="tableBox">
        <tr class="tableLine tableHead">
          <th>序号</th>
          <th class="itemName">作品名字</th>
          <th class="itemInfo">作品简介</th>
          <th class="itemImg">作品效果图</th>
          <th class="itemAuthor">作品作者</th>
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
            {{item.author}}
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
  name: 'shopInfo',
  components: { home, uploadImg },
  data() {
    return {
      listItem:[{
        name:"asdasdasdasd",
        price:"200"
      }],
      pageCount: 5
    }
  },
  methods: {
    setImgSrc(value) {
      this.imgSrc = value
      console.log(value)
    }
  }
}
</script>