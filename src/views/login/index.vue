<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录"></van-nav-bar>
    <!-- 表单 -->
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        clearable
        class="iconfont icon-phone_icon"
        placeholder="请输入手机号"
      ></van-field>
      <van-field
        v-model="user.code"
        center
        clearable
        class="iconfont icon-mima"
        placeholder="请输入短信验证码"
      >
        <van-button slot="button" size="small" type="primary" round>发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login-btn-box">
      <van-button @click="onLogin" type="info">登录</van-button>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  // 数据绑定
  // 根据接口绑定表单获取数据
  data () {
    return {
      // 获取数据
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    // 请求登录
    async onLogin () {
      try {
        const res = await request({
          method: 'POST',
          url: '/app/v1_0/authorizations',
          data: this.user
        })
        console.log('登录成功', res)
      } catch (err) {
        console.log('登录失败', err)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login-btn-box {
  padding: 27px 16px;
  .van-button {
    width: 100%;
  }
}
</style>
