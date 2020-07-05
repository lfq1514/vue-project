<template>
  <div class="hello">

      {{msg}}000000000

  </div>
</template>

<script>
export default {
  name: 'Test1',
  props: {
    msg: String
  },
  data () {
    return {

    }

  },
  created(){
      console.log('created')

  },
  mounted(){
      console.log('mounted')

  },
  updated(){
      console.log('updated')

  },
  methods:{
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
