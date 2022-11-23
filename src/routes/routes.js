import SkillsList from '../components/SkillsList.vue';
import AddSkill from '../components/AddSkill.vue';
import EditSkill from '../components/EditSkill.vue';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [

    {
        name: 'SkillsList',
        path: '/',
        component: SkillsList
    },
    {
        name: 'AddSkill',
        path: '/add-skill',
        component: AddSkill
    },
    {
        name: 'EditSkill',
        path: '/skill/edit/:id?',
        component:EditSkill
    }
];

const router = createRouter(
    {
        history: createWebHistory(),
        routes
    }
);

export default router;