<template>
  <home>
    <div slot="content" class="itemList">
      <div class="pageTitle">
        <h2>社团照</h2>
        <button class="btnLogin">添加</button>
        <!--@click="addPhoto" -->
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
            <img :src="img.src" alt="" class="showImg" v-for="img in item.Img">
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
</style>
<script>
import home from "../common/home.vue"
export default {
  name: "itemList",
  data() {
    return {
      listItem: [{
        name: "asdasdasdasd",
        price: "200"
      }],
      pageCount: 5
    }
  },
  components: { home },
  // created () {
  //    this.$http.post(this.loginApi, { //提交密码账号
  //     }, {}).then((response) => {//成功后验证
  //         this.listItem = response.listItem
  //     })
  // },
  methods: {
    fix(num) {

    },
    del(num) {

    }
  }
}
</script>