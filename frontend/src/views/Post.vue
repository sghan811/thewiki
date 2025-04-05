<template>
    <diV class="post">
        <div class="content">
            <h1>{{ title }}</h1>
            <h4>작성자:{{ uploader }}</h4>
            <div v-html="contant"></div>
        </div>
    </diV>
    
</template>

<script>

import axios from 'axios';
import Nav from '../components/Nav.vue';

export default {
    name: 'Post',
    components: {
        Nav,
    },
    data() {
        return {
            id: this.$route.query.id,
            title: '',
            sub: '',
            contant: '',
            uploader: '',
            uptime: '',
        };
    },
    mounted() {
        this.pView()
    },
    methods: {
        async pView() {
            console.log(this.id)
            await axios.get('/api/v1/post/view?id='+this.id).then((res)=> {
                this.title = res.data.posts[0].title
                this.sub = res.data.posts[0].sub
                this.contant = res.data.posts[0].contant
                this.uploader = res.data.posts[0].uploader
            })
        }   
    }
}

</script>

<style>
    .post{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .content{
        width: 40%;
    }
</style>