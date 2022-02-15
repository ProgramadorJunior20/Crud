<template>
    <div>
        <h1 class="font-italic text-center">Inicio Crud</h1>
        <h3 class="font-weight-light">Bienvenido <span class="badge badge-secondary font-weight-light">{{usuario.email}}</span></h3>
        <router-link :to="{name: 'Agregar'}">
            <button class="btn btn-success btn-block mt-4">Agregar</button>
        </router-link>

        <form @submit.prevent="buscador(buscando)">
            <input type="text" placeholder="Buscar..."
            class="form-control mt-5" v-model="buscando" v-on:keyup="buscador(buscando)">
        </form>

        <div v-if="carga" class="text-center mt-5">
            <h3>Cargando contenido...</h3>
            <pulse-loader :loading="carga"></pulse-loader>
        </div>


        <ul class="list-group mt-5" v-if="!carga">
            <li 
                class="list-group-item"
                v-for="item in arrayFiltrado" :key="item.id"
            >
                {{item.id}} - {{item.nombre}} 
                <div class="float-right">
                    <router-link 
                        class="btn btn-warning btn-sm mr-2"
                        :to="{name: 'Editar', params: {id: item.id}}"
                    >
                        Editar
                    </router-link>
                    <button @click="eliminarTarea(item.id)" class="btn btn-danger btn-sm">Eliminar</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex"
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
    name: 'Inicio',
    data() {
        return { buscando: '' }  
    },
    created(){
        this.getTareas()
    },
    methods:{
        ...mapActions(['getTareas', 'eliminarTarea', 'buscador'])
    },
    computed: {
        ...mapState(['tareas', 'usuario', 'carga']),
        ...mapGetters(['arrayFiltrado'])
    },
    components: {
    PulseLoader
  }

}
</script>
