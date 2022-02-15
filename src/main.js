import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Importar archivos Bootstrap y BootstrapVue CSS (el orden es importante)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Haz que BootstrapVue esté disponible en todo tu proyecto
Vue.use(BootstrapVue)

// Opcionalmente, instale el complemento de componentes del icono de BootstrapVue
Vue.use(IconsPlugin)

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)



import {auth} from './firebase'

auth.onAuthStateChanged(user => {
  if (user){
    console.log(user)
    const detectoUsuario = {
      email: user.email,
      uid: user.uid
    }
    store.dispatch('detectarUsuario', detectoUsuario)
  } else {
    console.log(user)
    store.dispatch('detectarUsuario', user)
  }

  Vue.config.productionTip = false

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})


