<template>
  <div>
    <app-table8
     :showPdfPopupClick="showPdfPopup"
      :inquireClick="inquireClick"
      :listClick="listClick"
      :mukellefData="mukellefler"
      :pk="EbildId"
      :items="GelenDataItems"
      :totalRows="16"
      :title="'Yoklama Evrakları'"
      :columns="columns"
       @selected-tckn="gettckn"
    />
       <app-table9
     :showPdfPopupClick="showPdfPopup"
      :inquireClick="inquireClick"
      :listClick="listClick"
      :mukellefData="mukellefler"
      :pk="EbildId"
      :items="yoklamaDataItems"
      :totalRows="16"
      :title="'Denetim Evrakları'"
      :columns="columns2"
  
    />
 
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
     <b-modal
      ref="pdfPopup2"
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
import AppTable8 from "@core/components/app-table/yoklamaDenetimTable.vue";
import AppTable9 from "@/@core/components/app-table/denetimTable.vue";
import {
  BRow,
  BCol,
  BFormGroup,
  BFormDatepicker,
  BFormCheckbox,
} from "bootstrap-vue";
import lng from "../../utils/strings";
import mockData from "../../../services/online/finance/service";
import vSelect from "vue-select";
import { mapActions,mapGetters } from 'vuex';

export default {
  components: {
    AppTable8,
    AppTable9,
    BRow,
    BFormCheckbox,
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
    EbildId:"",
      //#region Sorgulama Popup
      dateTimeLanguage: lng.dateTimeLanguage,
      inquireRequest: {
        title: null,
        startDate: {
          month: "",
          year: "",
        },
        endDate: {
          month: "",
          year: "",
        },
      },
      //#endregion
      listRequest: {
        title: null,
        startDate: {
          month: "",
          year: "",
        },
        endDate: {
          month: "",
          year: "",
        },
        docType1: true,
        docType2: true,
        docType3: true,
      },
      activePdfUrl:
        "https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/AL%C4%B0%20%C3%9CZ%C3%9CMC%C3%9C%2F1ukxyryp3t1xhp.pdf?alt=media",
      items: mockData.bildirgeler,
      unvanlar: mockData.unvanlar,
      turler: mockData.turler,
       mukellefler:[],
      items:[],
      GelenDataItems:[],
      yoklamaDataItems:[],
      columns: [
        {
          dataField: "EbildId",
          caption: "Id",
          visible: false,
          showInColumnChooser: false,
        },
        {
          dataField: "unvan",
          caption: "Ünvan",
          groupIndex:0
        },
          {
          dataField: "tarih",
          caption: "Tarih",
        },
        {
          dataField: "tckn",
          caption: "VergiNo",
        },
        {
          dataField: "vergiDairesi",
          caption: "VergiDairesi",
        },
         {
          dataField: "ykodu",
          caption: "Kodu",
        },
        {
          dataField: "GİB",
          caption: "Evraklar",
          cellTemplate:"yoklamaTemplate"
        },
      ],
      columns2:[
{
          dataField: "EbildId",
          caption: "Id",
          visible: false,
          showInColumnChooser: false,
        },
        {
          dataField: "unvans",
          caption: "Ünvan",
           groupIndex:0
          
        },
        {
          dataField: "0.kadi",
          caption: "DKM",
        },
          {
          dataField: "0.dtarih",
          caption: "Tarih",
        },
        
        {
          dataField: "0.dkodu",
          caption: "Denetim Kodu",
        },
         {
          dataField: "0.bkodu",
          caption: "Kodu",
        },
        {
          dataField: "GİB",
          caption: "Evraklar",
          cellTemplate:"denetimTemplate"
        },
      ],
    };
  },
  methods: {
    ...mapActions(["AddNewYoklamaDenetimSorgu","fetchYoklamaDenetim"]),
    //#region Ust Bar Butonları
    queryClick() {
      this.$refs.queryPopup.show();
    },
    fetchYoklama()
    {
   this.items=[];
    this.fetchYoklamaDenetim(this.Mukellefdataget[0].musavirUid);
this.GelenDataItems=this.yoklamDenetimData;
this.yoklamaDataItems=this.yoklamDenetimData;

    },
   showPdfPopup(tckn, e) {
      this.activePdfUrl = `${
        "https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/" +
        tckn +
        "%2FYOKLAMADENETIM%2F" +
        e +
        ".pdf?alt=media"
      }`;
      this.$refs.pdfPopup.show();
      console.log(tckn, e);
    },
      showPdfPopup(tckn, e) {
      this.activePdfUrl = `${
        "https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/" +
        tckn +
        "%2FYOKLAMADENETIM%2F" +
        e +
        ".pdf?alt=media"
      }`;
      this.$refs.pdfPopup2.show();
      console.log(tckn, e);
    },
     
    inquireClick() {

let musavir=JSON.parse(localStorage.getItem("userData")).userId;
 
const data={

KullaniciUid:musavir,
tckn:this.SelectedTckn,
SorguDurumu:0,

}
 
this.AddNewYoklamaDenetimSorgu(data);

    },
    downloadClick(e) {},
    printClick(e) {},
    sendClick(e) {},
    listClick() {
      this.$refs.listPopup.show();
    },
     gettckn(e)
    {
this.SelectedTckn=e;
    },
    listRunClick() {
      console.log(this.listRequest.type);
    },
    odenenDataGet(){
this.setOption();
    },
    setOption(){
let arr=[];
 
this.Mukellefdataget.forEach((el)=>{
  arr.push({title:el.unvan,tckn:el.tckn})
  
  this.mukellefler=[...new Set(arr)];
 setTimeout(() => {
      this.GelenDataItems=this.yoklamDenetimData.map((a)=>{
        return Object.assign(a,{
            unvan:this.Mukellefdataget.find((b)=>a.tckn.includes(b.tckn)).unvan,
        });
         
      });

      this.yoklamaDataItems=this.yoklamDenetimData.map((a=>{
        return Object.assign(a,{
            unvans:this.Mukellefdataget.find((b)=>a.tckn.includes(b.tckn)).unvan,
        })
      }))
    
 }, 1000);
 
 

});

 
 





    },
    //#endregion

    //#region Boş Function
    emptyClick() {},
    //#endregion

    //#region SAYFA ICIN
    deleteInsuranceClick() {},
  
    //#endregion
  },
  computed:{
    ...mapGetters(["reMukellef","reYoklamaDenetim"]),

    yoklamDenetimData()
    {
return this.reYoklamaDenetim;

    },
    Mukellefdataget(){
  return this.reMukellef;

},

  },
  mounted(){
    this.fetchYoklama();
this.odenenDataGet();
},
};
</script>

<style></style>