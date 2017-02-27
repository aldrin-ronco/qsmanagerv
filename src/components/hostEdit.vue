<template>
<div>
  <form v-on:submit.prevent="save">
    <div class="container">
      <div class="form-group" v-show="id">
        <label for="id">Id</label>
        <input type="text" :value="id" class="form-control" readonly>
      </div>
      <div class="form-group">
        <label for="description">Descripción:</label>
        <input v-focus
               type="text"
               :value="description"
               @input="editDescription($event)"
               placeholder="description"
               class="form-control">
      </div>
      <div class="form-group">
        <label for="IP">IP:</label>
        <input type="text" :value="host" @change="editHost($event)" placeholder="IP Address" class="form-control">
      </div>
      <div class="form-group">
        <label for="domain">Dominio:</label>
        <input type="text" :value="domain" @change="editDomain($event)" placeholder="domain" class="form-control">
      </div>
      <div class="form-group">
        <label for="userName">Usuario:</label>
        <input type="text" :value="userName" @change="editUserName($event)" placeholder="username" class="form-control">
      </div>
      <div class="form-group">
        <label for="pwd">Password:</label>
        <input type="text" :value="pwd" @change="editPwd($event)" placeholder="password" class="form-control">
      </div>
      <input type="submit" value="Guardar" class="btn btn-primary"/>
      <router-link :to="{ name : 'hosts' }" class="btn btn-default">Regresar</router-link>
     </div>
  </form>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'hosts',
      'model',
      'id',
      'host',
      'pwd',
      'userName',
      'domain',
      'description'
    ])
  },
  methods: {
    editDescription (e) {
      this.$store.commit('EDIT_DESCRIPTION', e.target.value)
    },
    editHost (e) {
      this.$store.commit('EDIT_HOST', e.target.value)
    },
    editDomain (e) {
      this.$store.commit('EDIT_DOMAIN', e.target.value)
    },
    editUserName (e) {
      this.$store.commit('EDIT_USERNAME', e.target.value)
    },
    editPwd (e) {
      this.$store.commit('EDIT_PWD', e.target.value)
    },
    save () {
      let vm = this
      if (vm.model.id === 0) {
        vm.$store.dispatch('addHost', vm.model)
      } else {
        vm.$store.dispatch('updateHost', vm.model)
      }
      vm.$router.push('/hosts') // Me muevo a la ruta
    }
  }
}
</script>

<style lang="css">
</style>
