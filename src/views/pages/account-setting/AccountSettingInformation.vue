<template>
  <b-card>
    <b-card>
      <b-form>
        <h4>Sms Firma Ayarları</h4>
        <b-row>
          <!-- old password -->

          <b-col md="6">
            <b-form-group label="Sms Firma" label-for="account-old-password">
              <b-input-group class="input-group-merge">
                <b-form-input
                  id="account-old-password"
                  v-model="getKullaniciAyar.sms.smsFirma"
                  name="old-password"
                  type="text"
                  placeholder=""
                />
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label-for="account-new-password"
              label="Sms Originatör"
            >
              <b-input-group class="input-group-merge">
                <b-form-input
                  id="account-new-password"
                  v-model="getKullaniciAyar.sms.smsOriginator"
                  type="text"
                  name="new-password"
                  placeholder=""
                />
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label-for="account-retype-new-password"
              label="Kullanıcı Adı"
            >
              <b-input-group class="input-group-merge">
                <b-form-input
                  id="account-retype-new-password"
                  v-model="getKullaniciAyar.sms.smsUser"
                  type="text"
                  name="retype-password"
                  placeholder=""
                />
                <b-input-group-append is-text>
                  <feather-icon
                    :icon="passwordToggleIconRetype"
                    class="cursor-pointer"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label-for="account-retype-new-password"
              label="Sms Şifre"
            >
              <b-input-group class="input-group-merge">
                <b-form-input
                  id="account-retype-new-password"
                  v-model="getKullaniciAyar.sms.smsPass"
                  type="text"
                  name="retype-password"
                  placeholder=""
                />
                <b-input-group-append is-text>
                  <feather-icon
                    :icon="passwordToggleIconRetype"
                    class="cursor-pointer"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <!--/ old password -->
        </b-row>
      </b-form>
    </b-card>

    <b-card>
      <b-form>
        <h4>Mail Ayarları</h4>
        <b-row>
          <!-- old password -->
     <b-col md="6">
            <b-form-group label-for="account-new-password" label="Mail Sunucu">
              <b-input-group class="input-group-merge">
                <b-form-input
                  id="account-new-password"
                  v-model="getKullaniciAyar.mail.mailHost"
                  :type="passwordFieldTypeNew"
                  name="new-password"
                  placeholder=""
                />
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Mail Portu" label-for="account-old-password">
              <b-input-group class="input-group-merge">
                <b-form-input
                  id="account-old-password"
                  v-model="getKullaniciAyar.mail.mailPort"
                  name="old-password"
                  :type="passwordFieldTypeOld"
                  placeholder=""
                />
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label-for="account-retype-new-password"
              label="Kullanıcı Adı"
            >
              <b-input-group class="input-group-merge">
                <b-form-input
                  id="account-retype-new-password"
                  type="text"
                   v-model="getKullaniciAyar.mail.mailUser"
                  name="retype-password"
                  placeholder=""
                />
                <b-input-group-append is-text>
                  <feather-icon
                    :icon="passwordToggleIconRetype"
                    class="cursor-pointer"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label-for="account-retype-new-password"
              label="Şifre"
            >
              <b-input-group class="input-group-merge">
                <b-form-input
                  id="account-retype-new-password"
                  v-model="getKullaniciAyar.mail.mailPass"
                  type="text"
                  name="retype-password"
                  placeholder=""
                />
                <b-input-group-append is-text>
                  <feather-icon
                    :icon="passwordToggleIconRetype"
                    class="cursor-pointer"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <!--/ old password -->
             <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-1 mr-1"
            @click.prevent="sendData"
          >
            Kaydet
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="reset"
            class="mt-1"
            variant="outline-secondary"
            @click.prevent="resetForm"
          >
            İptal
          </b-button>
        </b-col>
      </b-row>
        
      </b-form>
    </b-card>

 
  </b-card>
</template>

<script>
import {
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BRow,
  BCol,
  BCard,
  BFormTextarea,
  BInputGroup,
  BInputGroupAppend,
} from "bootstrap-vue";
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import Ripple from "vue-ripple-directive";
import Cleave from "vue-cleave-component";

// eslint-disable-next-line import/no-extraneous-dependencies
import "cleave.js/dist/addons/cleave-phone.us";
import { mapActions,mapGetters } from 'vuex';

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    BFormTextarea,
    BInputGroup,
    BInputGroupAppend,
    vSelect,
    flatPickr,
    Cleave,
  },
  directives: {
    Ripple,
  },
  props: {
    informationData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {

      mail:{
 mailHost:"",
      mailPort:"",
      mailUser:"",
      mailPass:"",
      },
     sms:{
smsFirma:"",
smsOriginator:"",
smsUser:"",
smsPass:"",
     },
      countryOption: ["USA", "India", "Canada"],
      localOptions: "",
      //  JSON.parse(JSON.stringify(this.informationData)),
      clevePhone: {
        phone: true,
        phoneRegionCode: "US",
      },
    };
  },

  methods: {
    ...mapActions(["updateProfileSettings","fetchKullaniciAyarlar"]),
    fetch(){
      let uid=JSON.parse(localStorage.getItem("userData")).userId;
      this.fetchKullaniciAyarlar(uid)
    },
  
  sendData(){
let uid=JSON.parse(localStorage.getItem("userData")).userId;
console.log({kullaniciUid:uid,...this.getKullaniciAyar});
 this.updateProfileSettings({kullaniciUid:uid,...this.getKullaniciAyar})
    },
    resetForm() {
      this.localOptions = JSON.parse(JSON.stringify(this.informationData));
    },
  },
    computed: {
    ...mapGetters(["reKullaniciAyarlar"]),
    getKullaniciAyar()
    {
return this.reKullaniciAyarlar
    },
    passwordToggleIconOld() {
      return this.passwordFieldTypeOld === "password"
        ? "EyeIcon"
        : "EyeOffIcon";
    },
    passwordToggleIconNew() {
      return this.passwordFieldTypeNew === "password"
        ? "EyeIcon"
        : "EyeOffIcon";
    },
    passwordToggleIconRetype() {
      return this.passwordFieldTypeRetype === "password"
        ? "EyeIcon"
        : "EyeOffIcon";
    },
  },
  mounted(){
    this.fetch()
  }
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
