<template>
	<div class="login">
		<h1>Login</h1>
		<form class="loginform">
			<p>
				<label for="memberIdInput">아이디</label>
				<input type="text" id="memberIdInput" class="input_text" ref="memberIdInput" v-model.trim="memberId" placeholder="아이디를 입력하세요." />
			</p>
			<p>
				<label for="memberPasswordInput">패스워드</label>
				<input type="password" id="memberPasswordInput" class="input_text" ref="memberPasswordInput" v-model.trim="memberPassword" placeholder="패스워드를 입력하세요." />
			</p>
			<p class="buttons">
				<button @click.prevent="loginSubmit" class="button blue">로그인</button>
				<button @click.prevent="doCancel" class="button">취소</button>
			</p>
		</form>
		<p>{{ errorMessage }}</p>
	</div>
</template>

<script>
import axios from 'axios';
import Nav from '../components/Nav.vue';
import store from '../vuex/store'

export default {
  components: {
    Nav
  },
  data() {
    return {
      userId: null,
      userPassword: null,
      isHidden: true,
    };
  },
  props: {
    id: Number,
    title: String,
    sub: String,
    contant: String,
    img: String,
    uploader: String,
    uptime: String
  },
  methods: {
    loginSubmit() {
      let saveData = {};
      saveData.username = this.memberId;
      saveData.password = this.memberPassword;

      try {
        axios.post("/api/v1/user/login", JSON.stringify(saveData), {
            headers: {
              "Content-Type": `application/json`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              console.log(res)
              console.log(Object.getOwnPropertyNames(this.$parent))
              store.state.isLogin = true
              this.$router.push({
                 path: "/",
                 query: this.isHidden
              })
            }
          });
      } catch (error) {
        console.error(error);
      }
    },
    doCancel(){
        this.$router.push({
            path: "/"
        })
    }
  },
};
</script>

<style scoped>
.login { width:100%; margin:20px auto; }
.loginform { width:400px; margin:auto; }
.loginform p > label { display:inline-block; width:100px; font-size:14px; padding-right:10px; }
.loginform p > .input_text { width:200px; font-size:14px; height:32px; }
.buttons { position:relative; height:32px; margin-top:20px; }
.buttons > .button { overflow:visible; cursor:pointer; min-width:125px; height:32px; margin:0 2px; padding:0 15px; line-height:32px; font-size:14px; border:1px solid #dfdfdf; background:#fff; border-radius:10px; }
.buttons > .button.blue { color:#fff; border-color:#0099d2 !important; background:#0099d2 !important; }
@media only screen and (max-width: 500px) {
  h1{
    font-size:2rem;
  }
  .loginform p > label { display:inline-block; width:100px; font-size:14px; padding-right:10px; }
}
</style>