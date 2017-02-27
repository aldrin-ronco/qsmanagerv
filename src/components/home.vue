<template>
  <div>
    <p>Bienvenido a Quality Host's Manager</p>
    <p>User {{ user }}</p>
    <p>Pwd {{ pwd }}</p>
    <p>IP {{ ip }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$route.query.user
    },
    pwd () {
      return this.$route.query.pwd
    },
    ip () {
      return this.$route.query.ip
    }
  }
}
</script>

<style lang="css">
p {
  text-align: center;
}
</style>
