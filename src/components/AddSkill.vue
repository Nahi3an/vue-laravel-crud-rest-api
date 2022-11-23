<template>
    <div class="container mt-2">
        <h5>Add New Skill</h5>

        <div class="row">
          <div class="col-md-6 offset-2">
            <form @submit.prevent="storeSkill">
              <fieldset>
                
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-4 col-form-label">Skill Name</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="name" id="skillName" placeholder="Enter Skill Name">
                    <div v-if="errors.name">
                      <small class="text-danger">{{ errors.name[0]}}</small>
                    </div>
                   
                  </div>
                </div>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-4 col-form-label">Skill Slug</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="slug" id="skillSlug" placeholder="Enter Skill Slug">
                    <div v-if="errors.slug">
                       <small class="text-danger">{{ errors.slug[0] }}</small>
                    </div>
                  </div>
                </div>

                <div class="form-group row mt-2">
                  <label for="staticEmail" class="col-sm-4 col-form-label"> </label>
                  <div class="col-sm-8">
                     <img v-bind:src=url alt="" style="height:100px; width:100px">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-4 col-form-label">Skill Image</label>
                  <div class="col-sm-8">
                    <input type="file" v-on:change="onImageChange" class="mt-3"/>
                    <div v-if="errors.image">
                       <small class="text-danger">{{ errors.image[0] }}</small>
                    </div>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-sm-4">

                  </div>
                  <div class="col-sm-8">
                    <button v-on:click="storeSkill" class="btn btn-sm btn-primary">Submit</button>
                  </div>
                </div>
                
              </fieldset>
            </form>
          </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import router, { useRouter } from 'vue-router';
export default{

name:'AddSkill',

data(){

  return {

    name:'',
    slug:'',
    image:'',
    errors:{
      name:'',
      slug:'',
      image:''
    },
    url:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'

  }
},
methods:{

  onImageChange(e){

    const file = e.target.files[0];
    this.url = URL.createObjectURL(file);
    this.image = file;
    
  },

  async storeSkill(e){

      e.preventDefault();
      var formData = new FormData();
      formData.append('image', this.image);
      formData.append('name', this.name);
      formData.append('slug', this.slug);

      await axios.post("http://127.0.0.1:8000/api/v1/skills",
          formData,
      {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      })
      .then(res => {

        let msg = res.data;
        this.$router.push({'name':'SkillsList', params: { msg }});

      }).catch(error => {

        if(error.response.status==422){
         
          this.errors = error.response.data.errors;

          
         
         }

      });
      

      console.log(formData);
      
      
   }
 },
 mounted(){

   console.log('Add Skill Componenet Mounted');
 }
 
}
</script>