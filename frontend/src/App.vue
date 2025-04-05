<template>
  <Nav ref="Nav"/>
  <RouterView></RouterView>
</template>

<script>
import Nav from './components/Nav.vue'
import router from './vue-routers';

export default {
  name: 'App',
  components: {
    Nav
  },
  methods: {
    login() {
      this.$refs.Nav.verify();
    }
  }
}
</script>

<style>
*{
  -webkit-text-size-adjust : auto;  /* 크롬, 사파리, 오페라(신) */
  -ms-text-size-adjust : auto;  /* IE */
  -moz-text-size-adjust : auto;  /* 파이어폭스 */
  -o-text-size-adjust : auto;  /* 오페라(구)*/
  font-family: 'noto sans';
}
@font-face {
  font-family: 'noto sans';
  src: url('./Noto_Sans_KR/NotoSansKR-Bold.otf');
}
a{
  color:black;
  text-decoration: none;
}
body{margin: 0;}
</style>