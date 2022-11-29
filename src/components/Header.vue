<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div class="container-fluid">
                      <router-link class="navbar-brand" to="/">{{ title }}</router-link>
                      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                      </button>
    
                      <div class="collapse navbar-collapse" id="navbarColor01">
                        <ul class="navbar-nav me-auto">
                          <li class="nav-item">
                            <router-link class="nav-link " :to="{name:'Home'}">Home
                              <span class="visually-hidden">(current)</span>
                            </router-link>
                          </li>
                          
                          <div v-if="loggedIn">
                            <li class="nav-item">
                            <router-link class="nav-link" :to="{name:'AddSkill'}">Add Skills</router-link>
                            </li>
                          </div>
                          <div v-if="loggedIn">
                            
                            <li class="nav-item">
                            <router-link class="nav-link" :to="{name:'Logout'}">Logout</router-link>
                            </li>
                           
                          </div>

                          <div v-if="!loggedIn">
                            <li class="nav-item">
                            <router-link class="nav-link" :to="{name:'Login'}">Login</router-link>
                            </li>
                          </div>
                         
                          
                        </ul>
                        
                      </div>
                    </div>
                  </nav>
    </template>
    
    
    <script>
    export default{
      name:'Header',
      props:{ title:String},
      computed:{
        loggedIn(){

          return this.$store.getters.loggedIn;
        }
      },
     
     
      

      
    }
    </script>