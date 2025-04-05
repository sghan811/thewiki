<template>
    <!-- <div class="posts">
      <div class="post">
        <div class="texts">
          <span class="timestamp">{{ mainPost.timestamp }}</span>
          <h1>{{ mainPost.title }}</h1>
          <p>{{ mainPost.description }}</p>
        </div>
        <img :src="mainPost.imageUrl">
      </div>
      <div class="popular-posts">
        <h1>Popular Posts</h1>
        <div class="posts-container">
          <div class="post" v-for="post in popularPosts">
            <div class="texts">
              <span class="timestamp">{{ post.timestamp }}</span>
              <h2>{{ post.title }}</h2>
              <p>{{ post.description }}</p>
              <a>더 알아보기 ></a>
            </div>
            <img :src="post.imageUrl">
          </div>
        </div>
      </div>
    </div> -->
    <div class="news">
      <div class="posts">
        <Card v-for="item in posts" :uptime="item.uptime" :title=item.title :sub=item.sub :img="item.img" :id="item.id"/>
      </div>
    </div>
  
  
  </template>
  
  <script>
  import Nav from '../components/Nav.vue'
  import Card from '../components/Card.vue'
  import headline from '../components/headline.vue'
  import axios from 'axios'
  export default {
    name: 'events',
    components: {
      Nav,
      Card,
      headline
    },  
    data() {
      return {
        requestData: {},
        posts: [
        ],
        id: this.$route.params.id,
        title: this.$route.params.title
      }
    },
    async mounted() {
      this.posts = (await axios.get("/api/v1/post/category?c='issues'")).data;
      this.load()
    },
    methods: {
      async load(){
        this.requestData = {
          id: this.id,
          title: this.title
        }
        this.posts = (await axios.get("/api/v1/post/category?c='issues'")).data.posts;
      }
    }
  }
  </script>
  
  <style>
  .news{
    width: 80%;
    display: flex;
    margin: 0 auto;
  }
  .headline{
    margin-top: 25px;
    width: 70%;
    margin-right: 20%;
  }
  .posts {
    width: 70%;
    margin: 0 auto;
    margin-top: 25px;
  }
  
  .posts > div {
    margin-bottom: 50px;
    padding-top: 50px;
    border-top: 1px #909090 solid;
  }
  
  .posts > div h1 {
    margin-top: 0;
  }
  
  .posts > div:first-child {
    border-top: none;
    padding-top: 0;
  }
  
  .post {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  
  .post img {
    margin-left: 20px;
    border-radius: 30px;
    width: 250px;
  }
  
  .timestamp {
    font-size: 12px;
  }
  
  .posts a {
    text-decoration: none;
   color: #909090;
  }
  
  .post h2 {
    margin-top: 0;
  }
  
  .post {
    margin-bottom: 30px;
  }
  
  .post:last-child {
    margin-bottom: 0;
  }
  @media only screen and (max-width: 500px) {
    .headline{
      width:100%;
    }
    .news{
      display: inline;
    }
  }
  </style>