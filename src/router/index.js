import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/pages/LoginPage.vue'
import SignUp from '@/components/pages/SignUp.vue'
import CategoryProducts from '@/components/product/CategoryProducts.vue'
import HomePage from '@/components/pages/HomePage.vue'
import Product from '@/components/product/Product.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'LoginPage',
      component:LoginPage
  },
  {
    path: '/signup',
    name: 'SignUp',
    component:SignUp
  }, 
  {
    path: '/product/:id',
    name: 'product',
    component: Product,
    props: true
  }
  ,
  {
    path:'/category/:categoryName',
    name:'category',
    component:CategoryProducts,
    props:true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
