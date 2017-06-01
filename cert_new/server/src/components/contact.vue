<template>
  <home>
    <div class="contact" slot="content">
      <div class="layer" v-show="layerShow">
        <div class="addInfo">
          <form action="" class="addInfoForm">
            <div class="inputLine">
              <label for="">名字</label>
              <input type="text" name="addName" placeholder="请输入商品名字" v-model="addName">
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
          <div class="cancel">
            <div class="icon layerIcon" @click="cancel()"></div>
          </div>
        </div>
  
      </div>
    </div>
  </home>
</template>
<style lang="stylus">
@import "../assets/styles/icons/iconfont.css"
.layer
  width 100%
  height 100%
  background rgba(0,0,0,0.6)
  position absolute
  display flex
  justify-content center
  align-items center

.addInfo
  border 1px solid white
  padding-top: 2rem
  display: block
  width 600px
  background white
  color black
  position relative
.cancel
  position absolute
  top -12px
  right 10px
.layerIcon:before,.layerIcon:after
  background red
.contact
  display: flex
  flex: 1
  flex-direction: column
  align-items: center
  justify-content: center
  color: white
</style>
<script>
import home from "../common/home.vue"
import uploadImg from "../common/uploadImg.vue"
export default {
  name: 'shopInfo',
  data() {
    return {
      layerShow: true,
      addDescribe: '',
      addName: '',
    }
  },
  components: { home, uploadImg },
  methods: {
    setImgSrc(value) {
      this.imgSrc = value
      console.log(value)
    },
    addFamous() {
      this.layerShow = !this.layerShow
    },
    cancel(){
      this.layerShow = !this.layerShow
    }
  }
}
</script>