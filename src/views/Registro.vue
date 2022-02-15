<template>
  <div>
    <h1 class="text-center font-weight-light">Registro de usuarios</h1>
    <form @submit.prevent="crearUsuario({email: email, password: pass1})">
      <div class="form-group">
        <label>Ingrese su correo</label>
        <input
          type="email"
          class="form-control"
          placeholder="correo@gmail.com"
          v-model="$v.email.$model"
        />
        <small class="text-danger d-block" v-if="!$v.email.required">
          Campo requerido
        </small>
        <small class="text-danger d-block" v-if="!$v.email.email">
          Email no válido
        </small>
      </div>
      <div class="form-group">
        <label>Ingrese su contraseña</label>
        <input
          type="password"
          class="form-control"
          placeholder="Contraseña"
          v-model="pass1"
        />
        <small class="text-danger d-block" v-if="!$v.pass1.minLength">
          Minimo 6 carácteres
        </small>
      </div>
      <div class="form-group">
        <label>Repita su contraseña</label>
        <input
          type="password"
          class="form-control"
          placeholder="Contraseña"
          v-model="pass2"
        />
        <small class="text-danger d-block" v-if="!$v.pass2.sameAs">
          Contraseña no coincide
        </small>
      </div>
      <button type="submit" class="btn btn-primary" :disabled='!desactivar'>
        Registrar
      </button>
    </form>
    <p class="mt-4" v-if="error === 'auth/email-already-in-use'">Email ya Registrado!</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
export default {
  name: "Registro",
  data() {
    return {
      email: "",
      pass1: "",
      pass2: "",
    };
  },
  created() {},
  methods: {
    ...mapActions(["crearUsuario"]),
  },
  computed: {
    ...mapState(["error"]),
    desactivar() {
      return (
        this.pass1 === this.pass2 &&
        this.pass1.trim() !== "" &&
        this.pass1.length > 5
      );
    },
  },
  validations:{
    email:{email, required},
    pass1:{minLength: minLength(6)},
    pass2:{sameAs: sameAs('pass1')}
  }
};
</script>
