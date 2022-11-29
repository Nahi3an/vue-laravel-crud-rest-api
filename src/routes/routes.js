import SkillsList from '../components/SkillsList.vue';
import AddSkill from '../components/AddSkill.vue';
import EditSkill from '../components/EditSkill.vue';
import Login from '../components/Login.vue';
import Logout from '../components/Logout.vue';
import store from '../store/index';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [

    {
        name: 'Home',
        path: '/',
        component: SkillsList,
        meta:{
            requiresAuth:false
        }
    },
    {
        name: 'AddSkill',
        path: '/add-skill',
        component: AddSkill,
        meta:{
            requiresAuth:true
        }
    },
    {
        name: 'EditSkill',
        path: '/skill/edit/:id?',
        component:EditSkill,
        meta:{
            requiresAuth:true
        }
    },
    {
        name: 'Login',
        path: '/login',
        component:Login,
        meta:{
            visitor:true
        }
    },
    {
        name:'Logout',
        path:'/logout',
        component:Logout,
        meta:{
            requiresAuth:true
        }
    }
    
];

const router = createRouter(
    {
        history: createWebHistory(),
        routes
    }
);

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      
      if (!store.getters.loggedIn) {
        next({
           name: 'Login'
        })
      } else{

        next();
      }

    } else if(to.matched.some(record => record.meta.visitor)){

        if (store.getters.loggedIn) {
            next({
               name: 'Home'
            })

        } else{
    
            next();
        }

    }else {
      next() // make sure to always call next()!
    }
  });

export default router;