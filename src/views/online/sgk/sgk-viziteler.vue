<template>
  <div>
    <app-table3
      :showPdfPopupClick="showPdfPopup"
      :inquireClick="inquireClick"
      :printClick="printClick"
      :sendClick="sendClick"
      :trash="trash"
      :pk="id"
      :items="items"
      :totalRows="16"
      :title="'Vizite Sorgulama'"
      :columns="columns" 
      :mukellefData="mukellefler"
    />

    <!-- Sorgula Popup -->
    <b-modal
      ref="queryPopup"
      title="Vizite Sorgula"
      ok-title="Sorgula"
      cancel-title="İptal"
      cancel-variant="outline-secondary"
      @ok="inquireClick"
    >
      <b-row>
        <b-col cols="12">
          <b-form-group
            label="Mükellef Seçimi"
            label-for="h-type"
            label-cols-md="4"
          >
            <v-select
              v-model="listRequest.title"
              :options="mükelellefler"
              placeholder="Mükellef Seçiniz"
              label="MükellefSeçimi"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="İlk Dönem"
            label-for="h-start-date"
            label-cols-md="4"
          >
            <b-form-datepicker
              id="h-start-date"
              v-model="inquireRequest.startDate"
             
              v-bind="dateTimeLanguage.labels[dateTimeLanguage.locale]"
              :locale="dateTimeLanguage.locale"
              class="mb-1"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="Son Dönem"
            label-for="h-end-date"
            label-cols-md="4"
          >
            <b-form-datepicker
              id="h-end-date"
              v-model="inquireRequest.endDate" 
              v-bind="dateTimeLanguage.labels[dateTimeLanguage.locale]"
              :locale="dateTimeLanguage.locale"
              class="mb-1"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-modal>

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
import AppTable3 from "@core/components/app-table/vizitelerTable.vue";
import { BRow, BCol, BFormGroup, BFormDatepicker } from "bootstrap-vue";
import lng from "../../utils/strings";
import mockData from "../../../services/online/finance/service";
import vSelect from "vue-select";
import {mapGetters,mapActions} from 'vuex'
export default {
  components: {
    AppTable3,
    BRow,
    vSelect,
    BCol,
    BFormGroup,
    BFormDatepicker,
  },
   data() {
    return {
      id:"",
      //#region Sorgulama Popup
      dateTimeLanguage: lng.dateTimeLanguage,
    inquireRequest: {
        startDate: "",
        endDate: "",
        type: null,
        title: [],
      },
      mükelellefler:[],
      //#endregion
    listRequest: {
       startDate: "",
        endDate: "",
        type: null,
        title: [],
      },
      activePdfUrl:
        "https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/AL%C4%B0%20%C3%9CZ%C3%9CMC%C3%9C%2F1ukxyryp3t1xhp.pdf?alt=media",
      items: [],
      unvanlar: mockData.unvanlar,
      turler: mockData.turler,
      mukellefler:[],
      columns: [
        {
          dataField: "id",
          caption: "Id",
          visible: false,
          showInColumnChooser: false,
        },
            {
          dataField: "MukUnvan",
          caption: "Mükellef Adı",
          groupIndex:0
        },
          {
          dataField: "AdSoyad",
          caption: "Ad Soyad",
        },
      
        {
          dataField: "RaporTakipNo",
          caption: "Takip No",
        },
      
        {
          dataField: "Vaka",
          caption: "Vaka",
        },
        {
          dataField: "TcNo",
          caption: "TC",
        },
      
        {
          dataField: "RaporBasTarihi",
          caption: "Rapor Başlangıç",
        },
        {
          dataField: "KontrolTarihi",
          caption: "Kontrol",
        },
        {
          dataField: "OnayDurum",
          caption: "Durum",
      
          
        }
      ],
      SelectedTckn: [],
    };
  },
 
  computed: {
    
    ...mapGetters(['reMukellef','reSgkFirmalar','reCalisan','reSgkVizite']),
    getfirma(){
      return this.reSgkFirmalar
    },
    getCalisan(){
      return this.reCalisan
    },
    getVizite(){
      return this.reSgkVizite
    },
    getMükellef(){
      return this.reMukellef
    },
    Mukellefdataget()
{
return this.reMukellef;
},
SgkVizitelerDataget()
{
return this.reSgkVizite;
}
  },
 
  methods: {
      gettckn(e) {
      this.SelectedTckn = e;
    },
    trash(){},
    sendStartDate(e) {
      this.inquireRequest.startDate = e;
    },
    sendEndDate(e) {
      this.inquireRequest.endDate = e;
    },
    queryClick() {
      this.$refs.queryPopup.show();
    },
    inquireClick() {

 var arr = [];

      e.forEach((element) => {
        let data = this.firmaDataget.find((el) => {
          return element.Tckn == el.Tckn;
        });
        console.log(data, element);
        arr.push(Object.assign(element, data));
      });

console.log("ARRR",arr);



      const data = {
        KullaniciUid: JSON.parse(localStorage.getItem("userData")).userId,
        baslangic: "2019",
        bitis: "2022",
       IsyeriSifresi:"62424625",
       kullaniciAdi:"18457834178", 
       isyeriKodu:"3",
        tckn: "2720107645",
        SorguDurumu: 0,
      };
      console.log("GİDEN VERİ",data);
      //this.AddViziteSorgu(data);
    },
    showPdfPopup(pdfUrl) {
      //this.activePdfUrl=pdfUrl;
      this.$refs.pdfPopup.show();
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
    ...mapActions(['fetchCalisan','fetchSgkVizite','AddViziteSorgu','fetchSgkFirmaalar']),
    fetchdata(){
      let arr=[];
      this.items=[];
this.fetchSgkVizite(this.Mukellefdataget[0].musavirUid);
 
this.items=this.SgkVizitelerDataget;
this.Mukellefdataget.forEach((el)=>{
  arr.push({title:el.unvan,tckn:el.tckn});
});
 
this.mukellefler=[...new Set(arr)];
 
setTimeout(() => {
  this.items=this.SgkVizitelerDataget.map((a)=>{
  return Object.assign(a,{
    MukUnvan:this.Mukellefdataget.find((b)=>a.tckn.includes(b.tckn)).unvan,      
  });
}); 

 var expected = this.getfirma.map(a => Object.assign(a,this.getMükellef.find(b=> b.tckn == a.Tckn)));
 console.log("aaaa",expected);
}, 1000);

 

 
    this.getfirma.forEach(element => {
    arr.push(element.Tckn) 
      });
       
    //   this.fetchCalisan(arr);


    // setTimeout(()=>{
    //  let caalisanİd=[]
    //  this.getCalisan.forEach(data=>{
    //    caalisanİd.push(data.CalisanID) 
    //  })
    //  console.log(caalisanİd);
    //  this.fetchSgkVizite(caalisanİd)
    //   },800)
    // setTimeout(()=>{
    //   console.log("Vizite",this.getCalisan);
    //   let unvan=[]
    //   var expected = this.getfirma.map(a => Object.assign(a,this.getMükellef.find(b=> b.MukellefId == a.MukellefId)));
    //   var expected2 = this.getCalisan.map(a => Object.assign(a,expected.find(b => b.        SubeId == a.SubeId)));
      //   var expected3 = this.getVizite.map(a => Object.assign(a,expected2.find(b => b.        CalisanID == a.CalisanId)));
      //   expected3.forEach(a=>{ this.items.push({Munvan:a.Unvan,Unvan:a.CalisanUnvan,         TC:a.TC, TakipNo:a.TakipNo, SiraNo:a.SiraNo,Vaka:a.Vaka,KontrolTarihi:a.        KontrolTarihi,OnayDurumu:a.OnayDurumu})})
      //   console.log(this.items,expected3);
      //   this.mükelellefler=[...new Set(unvan)]
      // },2000)
    //}
  },
  },

  mounted(){
    this.fetchdata()
  }
};
</script>

<style></style>