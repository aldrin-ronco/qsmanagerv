import Vue from 'vue'
import Router from 'vue-router'
import HostList from '@/components/hostList'
import HostEdit from '@/components/hostEdit'
import Home from '@/components/home'

// import Hello from '@/components/Hello'

// import AppComponent from './components/app-component/app-component';
// import HostListComponent from './components/host-list-component/host-list-component';
// import HostEditComponent from './components/host-edit-component/host-edit-component';

Vue.use(Router)

// const Home = { template: '<p style="text-align:center">Bienvenido a Quality Manager</p>' }

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/hosts', component: HostList, name: 'hosts' },
  { path: '/hosts/new', component: HostEdit, name: 'host-new' },
  { path: '/hosts/:id/edit', component: HostEdit, name: 'host-edit' }
]

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes
})
