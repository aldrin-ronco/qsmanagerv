<template>
  <div class="container" id="hostList">
    <div id="host-list">
      <div class="row">
      	<div class="col-md-12">
      	Host's <span class="badge">{{hosts.length}}</span>
      	</div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <router-link :to="{ name : 'host-new' }" @click.native.prevent="set_host_details()"><button class="btn btn-default">Crear nuevo host <span class='glyphicon glyphicon-plus'></span></button></router-link>
        </div>
      </div>
      <hr>
      <table class="table table-hover table-striped">
      	<tr>
      		<th>Descripción</th>
      		<th>IP</th>
      		<th>Usuario</th>
      		<th>Contraseña</th>
      		<th>Dominio</th>
      	</tr>
      	<tbody>
      			<tr v-for="host in hosts">
              <td><router-link :to="{ name : 'host-edit', params : {id : host.id}}" @click.native.native="set_host_details(host)">{{host.description}}</router-link></td>
      				<!-- <td>{{host.description}}</td> -->
              <!-- <td @Click="view_host_details(host)">{{host.description}}</td> -->
      				<td>{{host.host}}</td>
      				<td>{{host.userName}}</td>
      				<td>{{host.pwd}}</td>
      				<td>{{host.domain}}</td>
              <td><a href="#" @click.prevent="deleteHost(host)" class="glyphicon glyphicon-remove"></a></td>
      				<!-- <td><a href="#" {{action 'delete' host}}><span class="glyphicon glyphicon-remove"></span></a></td> -->
      			</tr>
      	</tbody>
      </table>
    </div>
   </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
import appConfig from '../../app.config'

export default {
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  computed: mapGetters([
    'hosts'
  ]),
  methods: {
    fetchData () {
      let vm = this
      if (vm.hosts.length === 0) {
        axios.get(appConfig.baseUrl)
        .then(function (response) {
          vm.$store.commit('EDIT_HOSTS', response.data.hosts)
        })
      }
    },
    set_host_details (host) {
      this.$store.commit('SET_HOST_DETAILS', host)
    },
    deleteHost (host) {
      this.$store.dispatch('deleteHost', host)
    }
  }
}
</script>

<style lang="css" scoped>
  .row {
    margin-top: 15px;
  },
  #hostList {
    max-width: 1000px;
  }
</style>
