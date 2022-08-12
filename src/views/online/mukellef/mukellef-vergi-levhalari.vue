<template>
  <div>
    <app-table9
      :showPdfPopupClick="showPdfPopup"
      :inquireClick="inquireClick"
      :downloadClick="downloadClick"
      :mukellefData="mukellefler"
      :printClick="printClick"
      :sendClick="sendClick"
      :pk="id"
      :items="items"
      :totalRows="16"
      :title="'Vergi Levhaları'"
      :columns="columns"
      @selected-tckn="gettckn"
    />

    <!-- Sorgula Popup -->
    <!-- <b-modal
      ref="queryPopup"
      title="Vergi Levhaları"
      ok-title="Sorgula"
      cancel-title="İptal"
      cancel-variant="outline-secondary"
      @ok="inquireClick"
    >
      <b-row>
        <b-col cols="12">
          <b-form-group label="Ünvan" label-for="h-type" label-cols-md="4">
            <v-select
              v-model="listRequest.title"
              :options="unvanlar"
              placeholder="Ünvan Seçiniz"
              label="Unvan"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-modal> -->

    <b-modal
      ref="pdfPopup"
      title="Görüntüle"
      size="xl"
      scrollable
      ok-only
      ok-title="Kapat"
      no-stacking
    >
      <iframe
        :src="this.activePdfUrl"
        width="100%"
        height="700"
        frameborder="0"
      >
      </iframe>
    </b-modal>
  </div>
</template>

<script>
import AppTable9 from "@core/components/app-table/vergiLevhalariTable.vue";
import { BRow, BCol, BFormGroup, BFormDatepicker } from "bootstrap-vue";
import lng from "../../utils/strings";
import mockData from "../../../services/online/finance/service";
import vSelect from "vue-select";
import { mapActions,mapGetters } from 'vuex';

export default {
  components: {
    AppTable9,
    BRow,
    vSelect,
    BCol,
    BFormGroup,
    BFormDatepicker,
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
  },
  data() {
    return {
      //#region Sorgulama Popup
      dateTimeLanguage: lng.dateTimeLanguage,
      inquireRequest: {
        startDate: new Date(),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          new Date().getDate()
        ),
      },
      id:"",
      //#endregion
      listRequest: {
        startDate: new Date(),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          new Date().getDate()
        ),
        type: null,
        title: null,
      },
      activePdfUrl:
        "https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/AL%C4%B0%20%C3%9CZ%C3%9CMC%C3%9C%2F1ukxyryp3t1xhp.pdf?alt=media",
      items: mockData.beyannameDatasi,
      unvanlar: mockData.unvanlar,
      turler: mockData.turler,
      mukellefler:[],
      items:[],
      columns: [
        {
          dataField: "id",
          caption: "Id",
          visible: false,
          showInColumnChooser: false,
        },
        {
          dataField: "veri.ceEVergiLevhaAdSoyadUnvanTx",
          caption: "Ünvan",
        },
        {
          dataField: "veri.ceEVergiLevhaVdTx",
          caption: "Vergi Dairesi",
        },
        {
          dataField: "tckn",
          caption: "Vergi No",
        },
        {
          dataField: "veri.ceEVergiLevhaOnayZamanTx",
          caption: "Onay Tarih",
        },
        {
          dataField: "veri.ceEVergiLevhaVergiTur",
          caption: "Takvim",
        },
        {
          dataField: "veri.ceEVergiLevhaOnayKoduTx",
          caption: "Onay Kodu",
        },
        {
          dataField: "veri.ceEVergiLevhaTcknTx",
          caption: "Vergi Levha No",
        },
        {
          dataField: "veri.message",
          caption: "Durum",
        },
        {
          dataField: "İçerik",
          caption: "PDF",
          alignment: "center",
          width: "80",
          cellTemplate: "beyanColumnTemplate",
        },
      ],
    };
  },
  methods: {
     ...mapActions(["AddVergiLevhasiSorgu","fetchVergiLevhalari"]),
    queryClick() {
      this.$refs.queryPopup.show();
    },
    fetchVergiLevha()
    {this.items=[];
    this.fetchVergiLevhalari(this.Mukellefdataget[0].musavirUid);
    this.items=this.VergiLevhalariDataget;
console.log(this.items);
    },
    gettckn(e)
    {
this.SelectedTckn=e;
    },
    inquireClick() {
      const data={
KullaniciUid:JSON.parse(localStorage.getItem("userData")).userId,
tckn:this.SelectedTckn,
SorguDurumu:0,
      };

      console.log("GİDECEK DATA",data);
      this.AddVergiLevhasiSorgu(data);
    },
     showPdfPopup(tckn, e) {
      this.activePdfUrl = `${
        "https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/" +
        tckn +
        "%2FVERGILEVHALARI%2F" +
        e +
        ".pdf?alt=media"
      }`;
      this.$refs.pdfPopup.show();
      console.log(tckn, e);
    },
    downloadClick(e) {},
    printClick(e) {},
    sendClick(e) {},
    listClick() {
      this.$refs.listPopup.show();
    },
    
    listRunClick() {
      console.log(this.listRequest.type);
    },
    vergiDataGet(){
 
this.setOption();
    },
  setOption()
  {
    let arr=[];
    this.Mukellefdataget.forEach((el)=>{
      arr.push({title:el.unvan,tckn:el.tckn})
      this.mukellefler=[...new Set(arr)];
    

    });

  },
  },
  computed:{
...mapGetters(["reMukellef","reVergiLevhalari"]),
Mukellefdataget(){
  return this.reMukellef;

},
VergiLevhalariDataget()
{
  return this.reVergiLevhalari;
 
},
  },
  mounted(){
    this.vergiDataGet();
    this.fetchVergiLevha();
  },
};
</script>

<style></style>