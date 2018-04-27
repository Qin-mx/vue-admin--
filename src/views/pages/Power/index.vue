<template>
    <div class="app-container">
          <p>{{$t('permission.roles')}}：<span>{{roles}}</span></p>  
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