<template>
    <!-- <div class="card p-5 m-10 rounded-lg w-[500px] h-[200px] flex items-center justify-center hover:shadow-2xl">
      <img class="w-40 h-40 object-cover rounded-lg mr-5" :src="img" />
      <div class="ml-2">
        <div class="title text-neutral-200 mb-2 text-lg">{{ title }}</div>
        <div class="content text-neutral-500">{{ desc }}</div>
      </div>
    </div> -->
    <div class="main-post">
        <h1 class="main-title">{{ this.title }}</h1>
        <div class="head">
            <div class="texts">
                <span class="timestamp">{{ this.timestamp }}</span>
                <p>{{ this.sub }}</p>
                <router-link :to="'/detail/?id='+this.id">더 알아보기</router-link>
            </div>
            <img :src="this.img" class="img">
        </div>
    </div>
  </template>
  
  <script>
  
  import { interfaceDeclaration } from '@babel/types';
  import axios from 'axios';
  
  export default {
    name: 'headline',
    mounted() {
        this.pView()
    },
    data() {
        return {
            title: '',
            sub: '',
            img: '',
            contant: '',
            uploader: '',
            uptime: ''
        };
    },
    props:{
        id: Number,
        title: String,
        sub: String,
        contant: String,
        img: String,
        uploader: String,
        uptime: String
    },
    methods: {
        async pView() {
          try {
            console.log(this.id)
            await axios.get('/api/v1/post/view?id='+this.id).then((res)=> {
                this.title = res.data.posts[0].title
                this.sub = res.data.posts[0].sub
                this.img = res.data.posts[0].img
                this.contant = res.data.posts[0].contant
                this.uploader = res.data.posts[0].uploader
                this.uptime = res.data.posts[0].uptime
                console.log(res.data.posts[0].title)
            })
          } catch (error) {
            console.log(error)
          }
            
        }   
    }
  }
  </script>
  
  <style scoped>
  .head {
    display: flex;
  }
    .content {
      /* 한 줄 자르기 */
      display: inline-block;
      width: 280px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  
      /* 여러 줄 자르기 추가 스타일 */
      white-space: normal;
      line-height: 1.2;
      height: 3.6em;
      text-align: left;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .headline {
    padding: 80px 30%;
  }
  .main-title {
    width: 100%;
    font-size: 4rem;
    margin-bottom: 0;
  }
  .headline > div {
    margin-bottom: 50px;
    padding-top: 50px;
    border-top: 1px #909090 solid;
  }
  
  .headline > div h1 {
    margin-top: 0;
  }
  
  .headline > div:first-child {
    border-top: none;
    padding-top: 0;
  }

  .main-post {
    flex-direction: row;
    flex-wrap: nowrap;
  }
  p {
    font-size: auto;
  }
  .main-post img {
    margin-left: auto;
    border-radius: 0px 25px 0px 25px;
    width: 250px;
  }
  
  .timestamp {
    font-size: 12px;
  }
  
  .headline a {
    text-decoration: none;
   color: #909090;
  }
  
  .main-post h2 {
    margin-top: 0;
  }
  
  .main-post {
    margin-bottom: 30px;
  }
  
  .main-post:last-child {
    margin-bottom: 0;
  }
  @media only screen and (max-width: 500px) {
    .main-title{
      font-size: 2rem;
    }
  .posts {
    padding: 80px 5%;
  }
  .post img {
    margin-left: auto;
    border-radius: 30px;
    width: 30%;
  }
  .head img{
    width: 150px;
  }
  .main-post{
    width: 100vw;
  }
}
  </style>
  