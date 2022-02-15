import Vue from 'vue'
import Vuex from 'vuex'
import {db, auth} from '../firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tareas: [],
    tarea: {nombre: '', id: ''},
    usuario: '',
    error: '',
    carga: false,
    buscando: ''
  },
  mutations: {
    setUsuario(state, payload){
      state.usuario = payload
    },
    setError(state, payload){
      state.error = payload
    },
    setTareas(state, payload){
      state.tareas = payload
    },
    setTarea(state, payload){
      state.tarea = payload
    },
    setEliminarTarea(state, payload){
      const tareasFiltradas = state.tareas.filter(item => item.id !== payload)
      state.tareas = tareasFiltradas
    },
    cargarFirebase(state, payload){
      state.carga = payload
    }
  },
  actions: {

    buscador({commit, state}, payload){
      //console.log(payload);
      state.buscando = payload.toLowerCase();
    },

    crearUsuario({commit}, usuario){
      auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
        .then(res => {
          console.log(res)
          const usuarioCreado = {
            email: res.user.email,
            uid: res.user.uid
          }
          db.collection(res.user.email).add({
            nombre: 'Esta es tu primer tarea'
          }).then(doc => {
            commit('setUsuario', usuarioCreado)
            router.push('/')
            //router.push({name: 'Inicio'})
          }).catch(error => console.log(error))
        })
        .catch(error => {
          console.log(error)
          commit('setError', error.code)
        })
    },
    ingresoUsuario({commit}, usuario){
      auth.signInWithEmailAndPassword(usuario.email, usuario.password)
        .then(res => {
          console.log(res)
          const usuarioLogeado = {
            email: res.user.email,
            uid: res.user.uid
          }
          commit('setUsuario', usuarioLogeado)
          //router.push('/')
          router.push({name: 'Inicio'})
        })
        .catch(error => {
          console.log(error)
          commit('setError', error.code)
        })
    },
    cerrarSesion({commit}){
      auth.signOut()
        .then(() => {
          //router.push('/acceso')
          router.push({name: 'Acceso'})
        })
    },
    detectarUsuario({commit}, usuario){
      commit('setUsuario', usuario)
    },
    getTareas({commit, state}){

      commit('cargarFirebase', true);

      const tareas = []
      db.collection(state.usuario.email).get()
        .then(res => {
          res.forEach(doc => {
            //console.log(doc.id)
            //console.log(doc.data())
            let tarea = doc.data()
            tarea.id = doc.id
            tareas.push(tarea)
          })
        
          commit('cargarFirebase', false);
        })
        commit('setTareas', tareas)
    },
    getTarea({commit, state}, idTarea){
      db.collection(state.usuario.email).doc(idTarea).get()
        .then(doc => {
          console.log(doc.id)
          console.log(doc.data())
          let tarea = doc.data()
          tarea.id = doc.id
          commit('setTarea', tarea)
        })
        .catch(error => console.log(error))
    },
    editarTarea({commit, state}, tarea){
      db.collection(state.usuario.email).doc(tarea.id).update({
        nombre: tarea.nombre
      })
      .then(() => {
        console.log('Tarea editada');
        //router.push('/')
        router.push({name: 'Inicio'})
      })
      .catch(error => console.log(error))
    },
    agregarTarea({commit, state}, nombreTarea){
      commit('cargarFirebase', true);
      db.collection(state.usuario.email).add({
        nombre: nombreTarea
      })
      .then(doc => {
        //console.log(doc.id);
        //router.push('/')
        router.push({name: 'Inicio'})
        commit('cargarFirebase', false);
      })
      .catch(error => console.log(error))
    },
    eliminarTarea({commit, state}, idTarea){
      db.collection(state.usuario.email).doc(idTarea).delete()
        .then(() => {
          console.log('Tarea Eliminada');
          //dispatch('getTareas')
          commit('setEliminarTarea', idTarea)
        })
    }
  },
  getters: {
    existeUsuario(state){
      if (state.usuario === null){
        return false
      }else{
        return true
      }
    },
    arrayFiltrado(state){
      let arregloFiltrado = []
      for (let tarea of state.tareas) {
        let nombre = tarea.nombre.toLowerCase();
        if (nombre.indexOf(state.buscando) >= 0) {
          arregloFiltrado.push(tarea)
        }
      }
      return arregloFiltrado;
    }
  },
  modules: {
  }
})
