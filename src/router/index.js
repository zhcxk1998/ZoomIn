import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import DataImport from '@/components/data-import/DataImport'
import childrenRegister from '@/components/login/register'
import childrenLogin from '@/components/login/toLogin'
import DataProcessing from '@/components/data-processing/DataProcessing'
import TaskDetail from '@/components/data-import/taskDetail'
import TaskRelease from '@/components/task-release/TaskRelease.vue'
import dataAnalysis from '@/components/data-analysis/dataAnalysis'
import Welcome from '@/components/welcome/WelcomePage.vue'
Vue.use(Router)
const router = new Router({
    routes: [{
        path: '/home',
        name: 'home',
        component: Home,
        children: [{
            path: 'data-import',
            name: 'data-import',
            component: DataImport,
            meta: {
                requireAuth: true
            },
        },
        {
            path: 'data-processing',
            name: 'data-processing',
            component: DataProcessing,
            meta: {
                requireAuth: true
            }
        },
        {
            path: 'task-detail',
            name: 'task-detail',
            component: TaskDetail,
            meta: {
                requireAuth: true
            }
        },
        {
            path: 'task-release',
            name: 'task-release',
            component: TaskRelease,
            meta: {
                requireAuth: true
            }
        }, {
            path: 'data-analysis',
            name: 'data-analysis',
            component: dataAnalysis,
            meta: {
                requireAuth: true
            },
        }
        ],
        meta: {
            requireAuth: true
        }
    },
    {
        path:'/welcome',
        name:'welcome',
        component:Welcome,
    },
    {
        path: '/',
        name: 'login',
        component: Login,
        children: [{
            path: '/',
            component: childrenLogin
        }, {
            path: '/register',
            component: childrenRegister
        }]
    }
    ]
})

//TODO:token 未正确使用
router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) {
        if (localStorage.getItem('token')) {
            next();
        } else {
            next({
                path: '/'
            })
        }
    } else {
        next()
    }
})

export default router