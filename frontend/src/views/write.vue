<template>
	<div>
		<h1>게시판 등록</h1>
		<div class="AddWrap">
			<table class="tbAdd">
					<colgroup>
						<col width="15%" />
						<col width="*" />
					</colgroup>
					<tr>
						<th>제목</th>
						<td><input type="text" v-model="title" ref="subject" /></td>
					</tr>
                    <tr>
						<th>말머리</th>
						<td><input v-model="sub" ref="sub"/></td>
					</tr>
					<tr>
						<th>이미지 링크</th>
						<td><input v-model="img" ref="img"></input></td>
					</tr>
					<tr>
						<th>내용</th>
						<td>
							<div class="editor" v-if="editor">
								<menu-bar class="editor_header" :editor="editor"></menu-bar>
								<editor-content class="editor_content" :editor="editor"></editor-content>
							</div>
						</td>
					</tr>

					<select v-model="category" ref="category">
						<option v-for="list in  categoryList" :value="list.value">{{ list.text }}</option>
					</select>
				</table>
		</div>

		<div class="btnWrap">
			<a href="javascript:;" @click="fnList" class="btn">목록</a>
			<a href="javascript:;" @click="fnAddProc" class="btnAdd btn">등록</a>
		</div>	
		<div class="preview"><Card :uptime="Date.now()" :title="this.title" :sub="this.sub" :img="this.img" :contant="this.contant"/></div>
		<!-- <div class="preview"><preview :uptime="Date.now()" :title="this.title" :sub="this.sub" :img="this.img" :contant="this.contant"/></div> -->
	</div>
</template>

<script>

import { exportDefaultSpecifier } from '@babel/types';
import axios from 'axios';
import MenuBar from '../components/MenuBar.vue'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import Nav from '../components/Nav.vue';
import Card from '../components/Card.vue';
import preview from '../components/preview.vue';
import * as Y from 'yjs'

export default {
    name: 'Post',
    components: {
        Nav,
		Card,
		preview,
		EditorContent,
		MenuBar,
    },
    data() {
        return {
			editor: null,
			categoryList:[
				{
					text:"카테고리 선택",
					value: "0"
				},
				{
					text : "뉴스",
					value: "news"
				},
				{
					text : "이벤트",
					value: "events"
				},
				{
					text : "사건",
					value: "issues"
				}
			],
            form: {

            },
            title: '',
            sub: '',
            contant: '',
            uploader: '',
            img:'',
			category: '0',
            user: {}
        };
    },
    mounted() {
		this.editor = new Editor({
			extensions: [
				StarterKit,
				Highlight,
				TaskList,
				TaskItem
			]
		})
		
    },
    methods: {
        fnList(){ //리스트 화면으로 이동 함수
			this.$router.push({path:'/'});
			
		}
		,async fnAddProc() { //등록 프로세스
			if(!this.title) { //제목이 없다면 값을 입력하라고 알려준다.
				alert("제목을 입력해 주세요");
				this.$refs.title.focus(); //방식으로 선택자를 찾는다.
				return;
			}
			if(this.category == '0') {
				alert("카테고리를 입력해 주세요");
				return;
			}
			this.contant = this.editor.getHTML()
            this.user = (await axios.get('/api/v1/user/')).data.user.username
            console.log(this.user)
			this.form = { //backend로 전송될 POST 데이터
				title:this.title
				,sub:this.sub
				,contant:this.contant
				,uploader:this.nickname
                ,img:this.img
				, category: this.category
			} 
			console.log(this.form)
			axios.post('/api/v1/post/upload',this.form)
			.then((res)=>{
                if (res.status === 200) {
                    alert('등록되었습니다.');
				    this.fnList();
                }else{
                    alert('error')
                }
			})
			.catch((err)=>{
				console.log(err);
			})
			
		}, uploadImage: function() {
			let form = new FormData()
			let image = this.$refs['image'].files[0]
			
			form.append('img', image)
		
			axios.post('/upload', form, {
				header: { 'Content-Type': 'multipart/form-data' }
			}).then( ({data}) => {
				this.img = data
			})
			.catch( err => console.log(err))
			},
			clickInputTag: function() {
			this.$refs['image'].click()
		}
    }
}

</script>

<style>
	.editor_content {
		padding: 1.25rem 1rem;
    	flex: 1 1 auto;
    	overflow-x: hidden;
    	overflow-y: auto;
    	-webkit-overflow-scrolling: touch;
	}
	.editor_header {
		display: flex;
    	align-items: center;
    	flex: 0 0 auto;
    	flex-wrap: wrap;
    	padding: 0.25rem;
    	border-bottom: 3px solid #0D0D0D;
	}
	.editor {
		height: 26rem;
		display: flex;
 		flex-direction: column;
  		color: #0D0D0D;
  		background-color: #FFF;
  		border: 3px solid #0D0D0D;
  		border-radius: 0.75rem;
	}
	.preview{
		padding-top: 50px;
		padding-bottom: 50px;
		width: 30%;
		margin: 0 auto;
	}
	.write{
		width: 100%;
		align-items: center;
		justify-content: center;
	}
	h1{
		text-align: center;
	}
	.AddWrap{
		width:100%;
		display: flex;
		justify-content: center;
	}
	.tbAdd{border-top:1px solid #888;width: 80%;}
	.tbAdd th, .tbAdd td{border-bottom:1px solid #eee; padding:5px 0;}
	.tbAdd td{padding:10px 10px; box-sizing:border-box;}
	.tbAdd td input{width:100%; min-height:30px; box-sizing:border-box; padding:0 10px;}
	.tbAdd td textarea{width:100%; min-height:300px; padding:10px; box-sizing:border-box;}
	.btnWrap{text-align:center; margin:20px 0 0 0;}
	.btnWrap a{margin:0 10px;}
	.btnAdd {background:#43b984}
	.btnDelete{background:#f00;}
	.ProseMirror {
		outline: none;
	}
</style>