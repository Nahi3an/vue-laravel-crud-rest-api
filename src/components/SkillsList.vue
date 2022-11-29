<template>
    <div class="container mt-3">

        <h5>Skills List</h5>
        <!-- <h5>{{ this.$store.getters.appName }}</h5> -->
        
        <h4 class="text-center text-success"> {{ msg }} </h4>
        
       <table class="table table-hover ">
        <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Slug</th>
            <th scope="col">Image</th>
            <th scope="col">Action</th>
        </tr> 

        <tbody v-for="(skill,index) in skills" :key="index">
            <tr class="table-dark">

                <th scope="row">{{index + 1}}</th>
                <th scope="row">{{ skill.name }}</th>
                <th scope="row">{{ skill.slug }}</th>
                <th scope="row">
                    <div v-if="skill.image">
                       
                        <img style="height: 100px; width:100px;" :src="portNumber+'/storage/skills/' + skill.image" />
                    </div> 
                    <div v-else>

                        <span>No Image Found</span>

                    </div>
                </th>

                <th scope="row">
                    <router-link :to="{name:'EditSkill', params:{ id: skill.id}}" class="btn btn-sm btn-light" style="margin-right:10px">Edit </router-link>
                    <button class="btn btn-sm btn-danger" @click.prevent="deleteSkill(skill.id)">Delete </button>
                </th>

            </tr>
        </tbody>

       </table>
    </div>
</template>

<script>

// import { response } from 'express';
import axios from 'axios';

export default{
    
   name:'SkillsList',

   data(){
    
    return{

       skills:Array,
       msg:String,
       count:Number,
       portNumber:String
    }
   },
   created(){

       this.getSkills();
   },
   methods:{

     async getSkills(){

        let url = 'http://127.0.0.1:8000/api/v1/skills';
        this.portNumber = 'http://127.0.0.1:8000';
        this.count = 0;
        
        await axios.get(url)
        .then(response => {

            this.skills = response.data.data;
        }).catch(error => {

            console.log(error);
        })
     },

     async deleteSkill(id){

        
        if(confirm("Do you really want to delete?")){
            let url = `http://127.0.0.1:8000/api/v1/skills/${id}`;
            await axios.delete(url)
            .then(response => {
                
        
                this.msg = response.data;
                this.getSkills();
                
            }).catch(error => {

                console.log(error);
            })

          
        }
       

        

     }
   },
   mounted(){

     console.log('Skill List Componenet Mounted');
     this.msg = this.$route.params.msg;
    
   }
}
</script>