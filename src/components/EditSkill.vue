<template>
    <div class="container mt-2">
        <h5>Edit Skill</h5>

        <div class="row">
          <div class="col-md-6 offset-2">
          <form @submit.prevent="updateSkill">
              <fieldset>
                
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-4 col-form-label">Skill Name</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="skill.name" id="skillName" placeholder="Enter Skill Name">
                    <div v-if="errors.name">
                      <small class="text-danger">{{ errors.name[0]}}</small>
                    </div>
                   
                  </div>
                </div>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-4 col-form-label">Skill Slug</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="skill.slug" id="skillSlug" placeholder="Enter Skill Slug">
                    <div v-if="errors.slug">
                       <small class="text-danger">{{ errors.slug[0] }}</small>
                    </div>
                  </div>
                </div>

                <div class="form-group row mt-2">
                  <label for="staticEmail" class="col-sm-4 col-form-label"> </label>
                  <div v-if="skill.image" class="col-sm-8">
                    <img :src="imageUrl" alt="" style="height:100px; width:100px">
                    
                  </div>
                  <div v-else class="col-sm-8">
                     <span>No Image Found</span>
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
                    <button class="btn btn-sm btn-primary">Submit</button>
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

name:'EditSkill',

data(){

  return {
    skill:{},
    name:'',
    slug:'',
    image:'',
    errors:{
      name:'',
      slug:'',
      image:''
    },
    imageUrl:''

  }
},
created(){

    this.getContactById();

},
methods:{

  onImageChange(e){

    const file = e.target.files[0];
    this.imageUrl = URL.createObjectURL(file);
    this.skill.image = file;
    
  },

  async getContactById(){

    let url = `http://127.0.0.1:8000/api/v1/skills/${this.$route.params.id}`;
    

    await axios.get(url)
    .then(response => {
            
       this.skill = response.data.data;
       this.imageUrl = `http://127.0.0.1:8000/storage/skills/${this.skill.image}`;

    }).catch(error => {

            console.log(error);
    })
  },

  async updateSkill(e){

      e.preventDefault();
      var formData = new FormData();  

      formData.append('name', this.skill.name);
      formData.append('slug', this.skill.slug);
      
      if(typeof this.skill.image !== 'string'){

        formData.append('image', this.skill.image);
       
      }
     
    

      let url = `http://127.0.0.1:8000/api/v1/skills/${this.$route.params.id}`;
      
      await axios.post(url,
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
      

    
      
      
   }
 },
 mounted(){

   console.log('Edit Skill Componenet Mounted');
 }
 
}
</script>