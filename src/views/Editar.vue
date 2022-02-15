<template>
  <div>
    <!--{{ tarea.id }} - {{ tarea.nombre }}-->
    <h1 class="font-italic">Editar</h1>
    <form @submit.prevent="editarTarea(tarea)" class="form-inline mt-4">
      <div class="input-group mb-2 mr-sm-2">
        <div class="input-group-prepend">
          <div class="input-group-text">Nombre</div>
        </div>
        <input
          type="text"
          class="form-control font-italic"
          v-model="$v.tarea.nombre.$model"
        />
      </div>
      <!--<input type="text" class="form-control" v-model="tarea.nombre" />-->
      <button 
        type="submit" 
        class="btn btn-primary mb-2"
        :disabled="$v.tarea.$invalid"
      >Editar</button>
    </form>
    <small class="text-danger d-block" v-if="!$v.tarea.nombre.required">
      Campo requerido
    </small>
    <!--{{$v.tarea.nombre}}-->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, minLength } from 'vuelidate/lib/validators';
export default {
  name: "Editar",
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  created() {
    this.getTarea(this.id);
  },
  methods: {
    ...mapActions(["getTarea", "editarTarea"]),
  },
  computed: {
    ...mapState(["tarea"]),
  },
  validations: {
    tarea: {
      nombre: { required }
    }
  }
};
</script>

<style></style>
