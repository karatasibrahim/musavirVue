<template>
  <b-nav-item-dropdown
    class="dropdown-notification mr-25"
    menu-class="dropdown-menu-media"
    right
  >
    <template #button-content>
      <feather-icon
        :badge="items.length"
        badge-classes="bg-danger"
        class="text-body"
        icon="BellIcon"
        size="21"
      />
    </template>
    <!-- Header -->
    <li class="dropdown-menu-header">
      <div class="dropdown-header d-flex">
        <h4 class="notification-title mb-0 mr-auto">
          Bildirimler
        </h4>
        <b-badge
          pill
          variant="light-primary"
        >
          3 Yeni
        </b-badge>
      </div>
    </li>
    <!-- Notifications -->
    <vue-perfect-scrollbar

      :settings="perfectScrollbarSettings"
      class="scrollable-container media-list scroll-area"
      tagname="li"
    >
      <!-- Account Notification -->

      <b-link
        v-for="notification in getNot"
        :key="notification.subtitle"
      >
        <b-media>
          <p class="media-heading">
            <span class="font-weight-bolder">
              {{ notification.Mesaj }}
            </span>
          </p>
          <small class="notification-text">{{ notification.Tarih }}</small>
        </b-media>
      </b-link>

      <!-- System Notification Toggler -->
      <!-- <div class="media d-flex align-items-center">
        <h6 class="font-weight-bolder mr-auto mb-0">
         Sistem Bildirimleri
        </h6>
        <b-form-checkbox
          :checked="true"
          switch
        />
      </div> -->

      <!-- System Notifications -->
      <!-- <b-link
        v-for="notification in systemNotifications"
        :key="notification.subtitle"
      >
        <b-media>
          <template #aside>
            <b-avatar
              size="32"
              :variant="notification.type"
            >
              <feather-icon :icon="notification.icon" />
            </b-avatar>
          </template>
          <p class="media-heading">
            <span class="font-weight-bolder">
              {{ notification.title }}
            </span>
          </p>
          <small class="notification-text">{{ notification.subtitle }}</small>
        </b-media>
      </b-link> -->
    </vue-perfect-scrollbar>

    <!-- Cart Footer -->
    <li class="dropdown-menu-footer"><b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      block
    >Tüm Bildirimleri Oku</b-button>
    </li>
  </b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BBadge, BMedia, BLink, BAvatar, BButton, BFormCheckbox,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ripple from 'vue-ripple-directive'
import {mapGetters,mapActions} from 'vuex'
export default {
  components: {
    BNavItemDropdown,
    BBadge,
    BMedia,
    BLink,
    BAvatar,
    VuePerfectScrollbar,
    BButton,
    BFormCheckbox,
  },
  directives: {
    Ripple,
  },
  data(){
    return{
      items:[]
    }
  },
  computed:{
...mapGetters(['renotification']),
getNot(){
    return this.renotification
}
  },
  methods:{
  ...mapActions(['fetchMesaj']),
    fetchNot(){
this.fetchMesaj('657aa3d1-cc29-434e-9523-16cfc51a7d92')
setTimeout(()=>{
  this.items=this.getNot
  this.items.sort(function(a, b) {
    a = new Date(a.Tarih);
    b = new Date(b.Tarih);
    return a>b ? -1 : a<b ? 1 : 0;
});
  console.log( this.items);

},1000)
  },
  },
  setup() {
    /* eslint-disable global-require */
    const notifications = [
      {
        title: 'Congratulation Sam 🎉',
        avatar: require('@/assets/images/avatars/6-small.png'),
        subtitle: 'Won the monthly best seller badge',
        type: 'light-success',
      },
      {
        title: 'New message received',
        avatar: require('@/assets/images/avatars/9-small.png'),
        subtitle: 'You have 10 unread messages',
        type: 'light-info',
      },
      {
        title: 'Revised Order 👋',
        avatar: 'MD',
        subtitle: 'MD Inc. order updated',
        type: 'light-danger',
      },
    ]
    /* eslint-disable global-require */

    const systemNotifications = [
      {
        title: 'Server down',
        subtitle: 'USA Server is down due to hight CPU usage',
        type: 'light-danger',
        icon: 'XIcon',
      },
      {
        title: 'Sales report generated',
        subtitle: 'Last month sales report generated',
        type: 'light-success',
        icon: 'CheckIcon',
      },
      {
        title: 'High memory usage',
        subtitle: 'BLR Server using high memory',
        type: 'light-warning',
        icon: 'AlertTriangleIcon',
      },
    ]

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    }

    return {
      notifications,
      systemNotifications,
      perfectScrollbarSettings,
    }
  },
  created(){
    },
mounted(){
  this.fetchNot() 
  console.log("not");
}
}
</script>

<style>

</style>
