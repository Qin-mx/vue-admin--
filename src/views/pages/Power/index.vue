<template>
    <div class="app-container">
          <p>权限：<span>{{roles}}</span></p>  
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'power',
  computed: {
    ...mapGetters(['roles', 'name'])
  }
}
</script>