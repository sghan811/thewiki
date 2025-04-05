<template>
  <!-- <div class="card p-5 m-10 rounded-lg w-[500px] h-[200px] flex items-center justify-center hover:shadow-2xl">
    <img class="w-40 h-40 object-cover rounded-lg mr-5" :src="img" />
    <div class="ml-2">
      <div class="title text-neutral-200 mb-2 text-lg">{{ title }}</div>
      <div class="content text-neutral-500">{{ desc }}</div>
    </div>
  </div> -->
  <div class="post">
    <div class="texts">
      <span class="timestamp">{{yyyyMMdd(uptime)}}</span>
      <h2>{{ title }}</h2>
      <p>{{ sub }}</p>
      <router-link :to="'/detail/?id='+this.id">더 알아보기</router-link>
    </div>
    <img :src="img" class="img">
  </div>
</template>

<script>

import { interfaceDeclaration } from '@babel/types';


export default {
  name: 'Card',
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
    view() {
      this.$router.push({
        path:'./detail',
        query: this.id
      })
    },
    yyyyMMdd(value){
      if(value == '') return '';
      console.log(value)
      // 현재 Date 혹은 DateTime 데이터를 javaScript date 타입화

      var js_date = new Date(value*1);

      console.log(js_date)
      // 연도, 월, 일 추출
      var year = js_date.getFullYear();
      var month = js_date.getMonth() + 1;
      var day = js_date.getDate();

      // 월, 일의 경우 한자리 수 값이 있기 때문에 공백에 0 처리
      if(month < 10){
        month = '0' + month;
      }

      if(day < 10){
        day = '0' + day;
      }

      // 최종 포맷 (ex - '2021-10-08')
      return year + '-' + month + '-' + day;      
    }
  },
}
</script>

<style scoped>
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
  .posts {
  padding: 80px 30%;
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
  margin-left: auto;
  border-radius: 0px 25px 0px 25px;
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
  .posts {
    padding: 80px 5%;
  }
  .post img {
    margin-left: auto;
    border-radius: 0px 25px 0px 25px;
    width: 50%;
  }
}
</style>
