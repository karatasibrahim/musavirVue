<template>
  <div>
    <app-table
      :showPdfPopupClick="showPdfPopup"
      :inquireClick="queryClick"
      :downloadClick="downloadClick"
      :listClick="listClick"
      :printClick="printClick"
      :sendClick="sendClick"
      :pk="id"
      :items="items"
      :totalRows="16"
      :title="'Beyannameler'"
      :columns="columns"
    />

    <!-- Sorgula Popup -->
    <b-modal
      ref="listPopup"
      title="Beyanname Görüntüle"
      scrollable
      ok-only
      ok-title="Kapat"
      no-stacking
    >
      <v-select v-model="selected" multiple label="title" />
      <b-form-textarea
        id="textarea-no-resize"
        placeholder="Fixed height textarea"
        rows="3"
        v-model="messages"
        no-resize
      />
      <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" @click="sendNot" variant="primary">
        Gönder
      </b-button>
    </b-modal>
  </div>
</template>

<script>
import AppTable from "@core/components/app-table/notificationApp.vue";
import Ripple from 'vue-ripple-directive'
import {
  BRow,
  BCol,
  BFormGroup,
  BFormDatepicker,
  BFormTextarea,
  BButton,
} from "bootstrap-vue";
import vSelect from "vue-select";
import { mapGetters,mapActions} from "vuex";
export default {
  components: {
    AppTable,
    BRow,
    vSelect,
    BCol,
    BFormTextarea,
    BButton,
    BFormGroup,
    BFormDatepicker,
  },
    directives: {
    Ripple,
  },
  data() {
    return {
      //#region Sorgulama Popup
      id: "",
      //#endregion
      items: [],
      activePdfUrl:
        "https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/0012167353%2FBEYANNAME%2F10l09o1t551oys.pdf?alt=media",
      columns: [
        {
          dataField: "id",
          caption: "Id",
          visible: false,
          showInColumnChooser: false,
        },
        {
          dataField: "Unvan",
          caption: "Ünvan",
        },
      ],
      selected: [],
      selectedid:[],
      messages:""
    };
  },
  computed: {
    inquireMinDate() {
      return this.inquireRequest.startDate;
    },
    inquireMaxDate() {
      return this.inquireRequest.endDate;
    },
    listMinDate() {
      return this.listRequest.startDate;
    },
    listMaxDate() {
      return this.listRequest.endDate;
    },
    ...mapGetters(["reMukellef","rePerson"]),
    getmükelef() {
      return this.reMukellef;
    },
    getPerson(){
        return this.rePerson.KullaniciId
    }
  },
  methods: {
    queryClick() {
      this.$refs.queryPopup.show();
    },
    inquireClick() {},
    showPdfPopup(pdfUrl) {
      //this.activePdfUrl=pdfUrl;
      this.$refs.pdfPopup.show();
    },
    ...mapActions(['AddNewsNotification']),
    downloadClick(e) {},
    printClick(e) {},
    sendClick(e) {
      console.log(e);
      this.messages=""
      this.selected = [];
      this.selectedid=[];
      console.log(e);
      e.forEach((element) => {
        this.selected.push(element.Unvan);
        this.selectedid.push(element.mukellefid)
      });
      console.log(this.selectedid);
      this.$refs.listPopup.show();
    },
    sendNot(){
        const data={
Gonderilenler:this.selectedid,
KullaniciId:this.getPerson,
Mesaj:this.messages,
Tarih:new Date().toISOString().slice(0, 10)

        }
        this.AddNewsNotification(data)
        
        console.log(data);
    },
    listClick() {
      this.$refs.listPopup.show();
    },
    listRunClick() {},
    fetchunvan() {
      this.items = this.getmükelef.map((el) => {
        return {
          Unvan: el.Unvan,
          mukellefid: el.MukellefId,
        };
      });
    },
  },
  mounted() {
    this.fetchunvan();
  },
};
</script>

<style >
.content-right{
 width: 100%!important; 
}</style>
