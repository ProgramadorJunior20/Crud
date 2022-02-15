<template>
  <div>
    <h1 class="text-center font-weight-light">Acceso de usuarios</h1>
    <form @submit.prevent="ingresoUsuario({ email: $v.email.$model, password: $v.pass.$model })">
      <div class="form-group">
        <label>Ingresar Usuario</label>
        <input
          type="email"
          class="form-control"
          placeholder="correo@gmail.com"
          v-model="$v.email.$model"
        />
        <small class="text-danger d-block" v-if="!$v.email.required">Campo Requerido</small>
        <small class="text-danger d-block" v-if="!$v.email.email">Correo no valido</small>
      </div>
      <div class="form-group">
        <label>Ingrese su contraseña</label>
        <input
          type="password"
          class="form-control"
          placeholder="Contraseña"
          v-model="$v.pass.$model"
        />
        <small class="text-danger d-block" v-if="!$v.pass.required">Campo Requerido</small>
        <small class="text-danger d-block" v-if="!$v.pass.minLength">Minimo 6 carácteres</small>
      </div>
      <button 
        type="submit" 
        class="btn btn-primary" 
        @click="ingresoUsuario"
        :disabled="$v.$invalid"
      >Acceso</button>
    </form>
    <p class="mt-4" v-if="error === 'auth/user-not-found'">Usuario incorrecta</p>
    <p class="mt-4" v-if="error === 'auth/wrong-password'">Contraseña incorrecta</p>
    <!--{{$v.email}}-->
    <!--{{$v.pass}}-->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
  name: "Acceso",
  data() {
    return {
      email: "",
      pass: "",
    };
  },
  methods: {
    ...mapActions(["ingresoUsuario"]),
  },
  computed: {
    ...mapState(["error"]),
  },
  validations:{
      email:{required, email},
      pass:{required, minLength: minLength(6)}
  }
};
</script>
