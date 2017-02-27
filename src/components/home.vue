<template>
  <p>Bienvenido a Quality Host's Manager</p>
  <p>User {{ user }}</p>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$route.query.user
    }
  }
}
</script>

<style lang="css">
p {
  text-align: center;
}
</style>
