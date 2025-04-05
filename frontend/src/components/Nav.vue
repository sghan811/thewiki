<template>
  <header>
    <div class="title" @login="verify()">
      <router-link to="/" class="main">Discord Wiki</router-link>  
      <router-link v-if:="!this.$store.state.isLogin" to="/login" class="login-button" >login</router-link>
      <router-link v-if:="this.$store.state.isLogin" to="/write" class="login-button2" >글 작성</router-link>
      <router-link @click="logout()" v-if:="this.$store.state.isLogin" to="/" class="login-button">logout</router-link>
    </div>
    
    <div class="container-fluid">
      <nav class="navbar navbar-expand-sm navbar-light bg-light">
        <div class="nav">
          <ul class="navbar-nav">
            <li><router-link to='/' class="category">속보</router-link></li>
            <li><router-link to='/servers' class="category">서버</router-link></li>
            <li><router-link to='/events' class="category">이벤트</router-link></li>
            <li><router-link to='/issues' class="category">사건</router-link></li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="login-bar">
      
    </div>
  </header>
</template>

<script>
import axios from 'axios'
import store from '../vuex/store'
export default {
  name: 'Nav',
  data() {
    return {
    }
  }, 
  mounted() {
    this.verify()
    console.log(this.$store.state.isLogin)
  },
  methods: {
    logout() {
      this.isHidden = false
      this.$store.state.isLogin = false
      axios.get("/api/v1/user/logout")
    },
    async verify() {
      if((await axios.get("/api/v1/user/verify")).data.isAuth){
        store.state.isLogin = true
      }else{
        store.state.isLogin = false
      }
    }
  }
}
</script>

<style>
.main{
  color:black;
  font-size: 3rem;
  text-decoration: none;
}
.login-button2{
  border-color:black;
  border: 2px inset black;
  right: 6rem;
  position:absolute;
  font-size: 20px;
  align-self: center;
  color:black;
  text-decoration: none;
}
.title{
  width: 100%;
  font-size: 5%;
  display: flex;
  justify-content: center;
  color:black;
  text-decoration: none;
  z-index: 1;
}
li {
  font-size: 2rem;
}
.category {
  font-size: 2rem;
  color:black;
  text-decoration: none;
}
ul{
   list-style:none;
}
.nav {
  width: 100%;
  display: flex;
  justify-content: center;
  font-weight: 600;
}
.login-button{
  border-color:black;
  border: 2px inset black;
  right: 1rem;
  position:absolute;
  font-size: 20px;
  align-self: center;
  color:black;
  text-decoration: none;
}
.navbar-nav{
  margin: 0 auto;
  margin-top:3vh;
  margin-bottom:1vh;
  display: flex;
  justify-content: space-between;  
  padding:0;
  right: 50%;
  left: 50%;
  width: 40%;
}
header {
    font-family: 'Times New Roman', serif;
    backdrop-filter: saturate(200%) blur(10px);
    background-color: rgba(255,250,250, 0.8);
    font-weight: bolder;
    top: 0;
    position: sticky;
    z-index: 100;
    width: 80vw;
    margin: 0 auto;
    padding-top: 20px;
    border-bottom-style: solid;
    border-bottom-color: black;
    border-bottom-width: 3px;
}
@media only screen and (max-width: 500px) {
  .category{
    font-size: 1.5rem;
  }
  header{
    width: 100vw;
    margin: 0px;
  }
  .main{
    font-size: 2rem;
    margin-right: 2%;
  }
  .login-button{
    left: 0px;
    position: static;
    font-size: 1rem;
  }
  .login-button2{
    margin-right: 2%;
    font-size: 1rem;
    position: static;
  }
  .title{
    position: static;
  }
  .nav{
    padding-bottom: 2rem;
    padding-top: 3%;
  }
  li {
    font-size: 1rem;
  }
  .navbar-nav{
    width: 80%;
  }
}
</style>
