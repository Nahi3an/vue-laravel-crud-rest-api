<template>
    <div class="container mt-2">
        <h5>Login</h5>

        <div class="row">
          <div class="col-md-6 offset-2">
            <form @submit.prevent="login">
              <fieldset>
                
                <div class="form-group row">
                    
                  <label for="staticEmail" class="col-sm-4 col-form-label">Email</label>
                  <div class="col-sm-8">
                    <div v-if="errors.credential">
                      <small class="text-danger">{{ errors.credential}}</small>
                    </div>
                    <input type="text" class="form-control" v-model="credentials.email" id="skillName" placeholder="Enter Skill Name">
                    <div v-if="errors.email">
                      <small class="text-danger">{{ errors.email[0]}}</small>
                    </div>
                   
                  </div>
                </div>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-4 col-form-label">Password</label>
                  <div class="col-sm-8"> 
                    <input type="password" class="form-control" v-model="credentials.password"  placeholder="Enter Password">
                    <div v-if="errors.password">
                       <small class="text-danger">{{ errors.password[0] }}</small>
                    </div>
                  </div>
                </div>

                
                <div class="row mt-3">
                  <div class="col-sm-4">

                  </div>
                  <div class="col-sm-8">
                    <button class="btn btn-sm btn-primary">Login</button>
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



export default{

    data(){
        return {

            credentials:{
                email:'',
                password:''
            },
            errors:{
                email:null,
                password:null,
                credential:null
                
            },
            

        }
    },
    methods:{

        login(){

            this.$store.dispatch('login', this.credentials)
            .then(()=>{
               
                if(this.$store.state.response.status == 200){

                    let msg = this.$store.state.response.data.msg;
                    this.$router.push({'name':'Home', params: { msg }});

                }else if(this.$store.state.response.status == 401){

                
                    this.errors.email = null;
                    this.errors.password = null;

                    this.errors.credential = this.$store.state.response.data.msg;
                    
                }else if(this.$store.state.response.status = 422){
                    console.log("Laravel");
                    this.errors = this.$store.state.response.data.errors;
                }
            });
        }
       
        
    },
    mounted(){

        console.log('Login Componenet Mounted');
    }
}
</script>
