<template>
  <div>
    <p>Bienvenido a Quality Host's Manager</p>
    <p>User {{ query }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    query () {
      return this.$route.query
    }
  }
}
</script>

<style lang="css">
p {
  text-align: center;
}
</style>
