<template>
  <div class="container">

    <!-- Form data -->
    <form v-on:submit.prevent="save">

        <!-- Company Logo -->
        <div v-if="!company_logo && id">
          <label class="btn btn-default btn-file"> Agregar Logo
            <input type="file" name="company_logo" value="" style="display:none;" @change="onFileChange($event)">
          </label>
        </div>
        <div v-if="company_logo  && id">
          <img :src="company_logo"/>
          <button type="button" name="btnRemoveLogo" @click="removeLogo($event)" class="btn btn-default">Remover Logo</button>
        </div>

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
          <input type="text" :value="ip" @input="editIp($event)" placeholder="IP Address" class="form-control">
        </div>
        <div class="form-group">
          <label for="port">Puerto:</label>
          <input type="text" :value="port" @input="editPort($event)" placeholder="Port" class="form-control">
        </div>
        <div class="form-group">
          <label for="domain">Dominio:</label>
          <input type="text" :value="domain" @input="editDomain($event)" placeholder="domain" class="form-control">
        </div>
        <div class="form-group">
          <label for="sql_user_name">Usuario:</label>
          <input type="text" :value="sql_user_name" @input="editUserName($event)" placeholder="sql user name" class="form-control">
        </div>
        <div class="form-group">
          <label for="sql_pwd">Password:</label>
          <input type="text" :value="sql_pwd" @input="editPwd($event)" placeholder="password" class="form-control">
        </div>
        <input type="submit" value="Guardar" class="btn btn-primary" v-show="canSave"/>
        <router-link :to="{ name : 'hosts' }" class="btn btn-default">Regresar</router-link>
    </form>
    <!--
    <pre>
      {{ model }}
    </pre> -->
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import appConfig from '../../app.config'
export default {
  computed: {
    ...mapGetters([
      'hosts',
      'model',
      'id',
      'ip',
      'sql_pwd',
      'sql_user_name',
      'domain',
      'description',
      'company_logo',
      'port'
    ]),
    canSave () {
      if (this.ip.trim() && this.sql_pwd.trim() && this.sql_user_name.trim() && this.domain.trim() && this.description.trim()) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    editDescription (e) {
      this.$store.commit('EDIT_DESCRIPTION', e.target.value)
    },
    editIp (e) {
      this.$store.commit('EDIT_IP', e.target.value)
    },
    editHost (e) {
      this.$store.commit('EDIT_IP', e.target.value)
    },
    editPort (e) {
      this.$store.commit('EDIT_PORT', e.target.value)
    },
    editDomain (e) {
      this.$store.commit('EDIT_DOMAIN', e.target.value)
    },
    editUserName (e) {
      this.$store.commit('EDIT_SQL_USER_NAME', e.target.value)
    },
    editPwd (e) {
      this.$store.commit('EDIT_SQL_PWD', e.target.value)
    },
    save () {
      let vm = this
      if (vm.model.id === 0) {
        vm.$store.dispatch('addHost', vm.model)
      } else {
        vm.$store.dispatch('updateHost', vm.model)
      }
      vm.$router.push('/hosts') // Me muevo a la ruta
    },
    onFileChange (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createImage(files[0])
    },
    createImage (file) {
      let vm = this
      let reader = new FileReader()
      let folderKey = appConfig.s3Config.bucketCompanyLogosFolder.trim() + '/'
      let fileName = 'logo_' + vm.model.id + '.' + file.name.substring(file.name.lastIndexOf('.') + 1)
      let logoKey = folderKey + fileName
      let s3 = appConfig.s3()
      reader.onload = (e) => {
        s3.upload({
          Key: logoKey,
          Body: file,
          ACL: 'public-read'
        }, (err, data) => {
          if (err) {
            console.log(err.message)
          } else {
            vm.$store.commit('EDIT_COMPANY_LOGO', data.Location)
          }
        })
      }
      reader.readAsDataURL(file)
    },
    removeLogo () {
      this.$store.commit('EDIT_COMPANY_LOGO', '')
    }
  }
}
</script>

<style lang="css" scoped>
img {
  display: block;
  margin-top: 20px;
  max-height: 200px;
  max-width: 200px;
  border: 0px solid silver;
  margin: auto;
  margin-top: 20px;
}
form {
 margin-top: 10px;
 margin-bottom: 40px;
}
.btn-file {
    position: relative;
    overflow: hidden;
    max-width: 200px;
    display: block;
    margin: auto;
}
button {
  max-width: 200px;
  display: block;
  margin: auto;
  margin-top: 20px;
  overflow: hidden;
}
</style>
