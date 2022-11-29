import axios from 'axios';
import { createStore } from 'vuex'


const store = createStore({

    state:{
        token: localStorage.getItem('accessToken') || null,
        response:''
    },
    getters:{
        
        loggedIn(state){
            return state.token !== null; //  loggedIn True when loggedin  & false when not logged in
        }
    },
    mutations:{

        setToken(state, token){
            state.token = token;
            
        },
        setResponse(state,res){

            state.response = res;
           
        },
        removeToken(state){
            state.token = null;
            
        },
    },
    actions:{

        async login(context,credentials){

            let url = "http://127.0.0.1:8000/api/v1/login"
            await axios.post(url,credentials)
            .then(res=>{


                localStorage.setItem('accessToken', res.data.data.access_Token);
                localStorage.setItem('name', res.data.data.name);
                localStorage.setItem('id', res.data.data.id);

                context.commit('setToken', res.data.data.access_Token);
                context.commit('setResponse', res);

              

            })
            .catch(error=> {

               
                context.commit('setResponse', error.response);
              
            });

           
        },


        async logout(context){

            let url = "http://127.0.0.1:8000/api/v1/logout"

            axios.defaults.headers.common['Authorization'] = "Bearer " + context.state.token;
            await axios.post(url)
            .then(res=>{


                localStorage.removeItem('accessToken');
                localStorage.removeItem('name');
                localStorage.removeItem('id');

                context.commit('removeToken');
                //context.commit('setResponse', res);

              

            })
            .catch(error=> {

               
               
              
            });

           
        }
    },
    modules:{

        
    }
});


export default store;