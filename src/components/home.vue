<template>
  <div>
    <p>Bienvenido a Quality Host's Manager</p>
    <input type="text" name="" v-model:value="folder">
    <button type="button" name="btnFolder" @click="createFolder">Crear Folder</button>
    <input type="file" accept="image/*" id="logotoupload">
    <button type="button" name="btnLogo" @click="uploadLogo">Subir Logo</button>
    <ul>
      <li v-for="folder in folders">
        <a href="#" @click.prevent="showFolder(folder)">{{ folder }}</a>
      </li>
    </ul>
    <div>
      <img v-for="file in files" :src="file" style="width:128px;heigth:128px">
    </div>
    <pre>
      {{ $data }}
    </pre>
  </div>
</template>

<script>
import AWS from 'aws-sdk'
import path from 'path'
import appConfig from '../../app.config'
export default {
  created () {
    this.listFiles()
  },
  data () {
    return {
      folder: '',
      folders: [],
      files: []
    }
  },
  methods: {
    createFolder () {
      let vm = this
      let bucketName = 'qs.company.logos'
      let bucketRegion = 'us-west-2'
      let IdentityPoolId = 'us-west-2:b037283a-c604-417e-ae5a-795ecefe6a73'
      AWS.config.update({
        region: bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: IdentityPoolId
        })
      })
      let s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: bucketName }
      })
      s3.putObject({ Key: encodeURIComponent(vm.folder) + '/' }, function (err, data) {
        if (err) {
          return alert('There was an error creating your album: ' + err.message)
        }
        console.log('Bucket creado satisfactoriamente !')
      })
    },
    uploadLogo () {
      let files = document.getElementById('logotoupload').files
      let file = files[0]
      let fileName = file.name
      let folderKey = encodeURIComponent(this.folder) + '/'
      let logoKey = folderKey + fileName
      appConfig.s3().upload({
        Key: logoKey,
        Body: file,
        ACL: 'public-read'
      }, function (err, data) {
        if (err) {
          return alert('There was an error uploading logo: ', err.message)
        }
        console.log('Upload complete ...', data)
      })
    },
    listFiles () {
      let vm = this
      let bucketName = 'qs.company.logos'
      let bucketRegion = 'us-west-2'
      let IdentityPoolId = 'us-west-2:b037283a-c604-417e-ae5a-795ecefe6a73'
      AWS.config.update({
        region: bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: IdentityPoolId
        })
      })
      let s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: bucketName }
      })
      s3.listObjects({ Delimiter: '/' }, function (err, data) {
        if (err) {
          return alert('There was an error listing files : ' + err.message)
        } else {
          data.CommonPrefixes.map(function (commonPrefix) {
            let prefix = commonPrefix.Prefix
            let folder = decodeURIComponent(prefix.replace('/', ''))
            vm.folders.push(folder)
          })
        }
      })
    },
    showFolder (folder) {
      let vm = this
      let bucketName = 'qs.company.logos'
      let bucketRegion = 'us-west-2'
      let IdentityPoolId = 'us-west-2:b037283a-c604-417e-ae5a-795ecefe6a73'
      AWS.config.update({
        region: bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: IdentityPoolId
        })
      })
      let s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: bucketName }
      })
      let folderKey = encodeURIComponent(folder) + '/'
      s3.listObjects({ Prefix: folderKey }, function (err, data) {
        if (err) {
          return alert('There was an error listing files : ' + err.message)
        } else {
          let href = this.request.httpRequest.endpoint.href
          let bucketUrl = path.join(href, bucketName, '/')
          data.Contents.map(function (file) {
            if (file.Key.substring(file.Key.length - 1) !== '/') {
              vm.files.push(path.join(bucketUrl, file.Key))
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
p {
  text-align: center;
}

input {
  display: block;
  margin: auto;
  margin-top: 10px;
}

button {
  display: block;
  margin: auto;
  margin-top: 10px;
}

pre {
  margin-top: 10px;
}
</style>
