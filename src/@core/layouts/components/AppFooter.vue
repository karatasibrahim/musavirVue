<template>
  <p class="clearfix mb-0">
    <span class="float-md-right d-block d-md-inline-block mt-25">
      Copyright  © {{ new Date().getFullYear() }}
      <b-link
        class="ml-25"
        href=" "
        target="_blank"
      >EMüşavirim</b-link>
      <span class="d-none d-sm-inline-block">, Tüm hakları saklıdır.</span>
    </span>

    <!-- <span class="float-md-right d-none d-md-block">Hand-crafted &amp; Made with
      <feather-icon
        icon="HeartIcon"
        size="21"
        class="text-danger stroke-current"
      />
    </span> -->
  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
}
</script>
