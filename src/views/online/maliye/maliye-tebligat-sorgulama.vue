<template>
  <div>
    <div class="btn-container">
      <button class="m-btn">
        <img src="https://i.imgur.com/qOltLPz.png" @click="income" />
        Gelir İdaresi Başkanlığı
      </button>

      <button class="m-btn">
        <img src="https://i.imgur.com/FX4smTA.png" @click="trade" />
        Ticaret Bakanlığı
      </button>

      <button class="m-btn">
        <img src="https://i.imgur.com/2cnC8QA.png" @click="tax"/>
        Vergi Denetim Kurulu Başkanı
      </button>
    </div>

    <tebligat-table
      :showPdfPopupClick="showPdfPopup"
      :inquireClick="queryClick"
      :downloadClick="downloadClick"
      :okunduYap="okunduYap"
      :trash="trash"
      :printClick="printClick"
      :sendClick="sendClick"
      :pk="'MukellefID'"
      :items="items"
      :totalRows="16"
      :title="'Tebligatlar'"
      :columns="columns"
      v-if="Gib"
    />
    <tebligat-table
      :showPdfPopupClick="showPdfPopup"
      :inquireClick="queryClick"
      :downloadClick="downloadClick"
      :okunduYap="okunduYap"
      :trash="trash"
      :printClick="printClick"
      :sendClick="sendClick"
      :pk="'MukellefID'"
      :items="items"
      :totalRows="16"
      :title="'Tebligatlar'"
      :columns="columnsTib"
      v-if="Tib"
    />
       <tebligat-table
      :showPdfPopupClick="showPdfPopup"
      :inquireClick="queryClick"
      :downloadClick="downloadClick"
      :okunduYap="okunduYap"
      :trash="trash"
      :printClick="printClick"
      :sendClick="sendClick"
      :pk="'MukellefID'"
      :items="items"
      :totalRows="16"
      :title="'Tebligatlar'"
      :columns="columnsVergi"
      v-if="Vergi"
    />
    <!-- Sorgula Popup -->
    <b-modal
      ref="queryPopup"
      title="GİB'den Sorgula"
      ok-title="Sorgula"
      cancel-title="İptal"
      cancel-variant="outline-secondary"
      @ok="inquireClick"
    >
      <b-row>
        <b-col cols="12">
          <b-form-group label="Ünvan" label-for="h-type" label-cols-md="4">
            <v-select
               v-model="inquireRequest.title"
              multiple
              :options="unvanlar"
              placeholder="Ünvan Seçiniz"
              label="title"
            />
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group
            label="Tebliğ Başlangıç"
            label-for="h-start-date"
            label-cols-md="4"
          >
            <b-form-datepicker
              id="h-start-date"
              v-model="inquireRequest.startDate"
              :max="inquireMaxDate"
              v-bind="dateTimeLanguage.labels[dateTimeLanguage.locale]"
              :locale="dateTimeLanguage.locale"
              class="mb-1"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="Tebliğ Bitiş"
            label-for="h-end-date"
            label-cols-md="4"
          >
            <b-form-datepicker
              id="h-end-date"
              v-model="inquireRequest.endDate"
              :min="inquireMinDate"
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
import TebligatTable from "@core/components/app-table/TebligatTable.vue";
import { BRow, BCol, BFormGroup, BFormDatepicker } from "bootstrap-vue";
import lng from "../../utils/strings";
//import mockData from "../../../services/online/finance/service";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import vSelect from "vue-select";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    TebligatTable,
    BRow,
    vSelect,
    BCol,
    BFormGroup,
    BFormDatepicker,
  },
  data() {
    return {
      selected2: [],
      unvanlar:[],
      books: [
        {
          title: "Database",
          icon: "DatabaseIcon",
        },
        {
          title: "Codepen",
          icon: "CodepenIcon",
        },
        {
          title: "Aperture ",
          icon: "ApertureIcon",
        },
        {
          title: "Command",
          icon: "CommandIcon",
        },
      ],
      //#region Sorgulama Popup
      dateTimeLanguage: lng.dateTimeLanguage,
    inquireRequest: {
        startDate: {
          title: null,
          startDate: {
            month: "",
            year: "",
          },
        },
        endDate: {
          month: "",
          year: "",
        },
      },
      //#endregion
       listRequest: {
        startDate: new Date(),
        endDate: new Date(),
        type: [],
        title: [],
      },
      activePdfUrl:
        "https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/AL%C4%B0%20%C3%9CZ%C3%9CMC%C3%9C%2F1ukxyryp3t1xhp.pdf?alt=media",
      items: [],
     
      columns: [
        {
          dataField: "MukellefID",
          caption: "Id",
          visible: false,
          showInColumnChooser: false,
        },
        {
          dataField: "unvan",
          caption: "Ünvan",
        },
        {
          dataField: "ZarfKonu",
          caption: "Vergi Dairesi",
        },
        {
          dataField: "VergiNo",
          caption: "Vergi No",
        },
        {
          dataField: "BirimAdi",
          caption: "Konu",
        },
        {
          dataField: "ZarfAciklama",
          caption: "Açıklama",
        },
        {
          dataField: "TebellugTarihi",
          caption: "Tarih",
        },
        {
          dataField: "OkumaDurum",
          caption: "Okundu",
        },
        {
          dataField: "ZarfPdf",
          caption: "İşlem",
          cellTemplate: "beyanColumnTemplate",
        },
        {
          dataField: "ekdat",
          caption: "Ek",
         cellTemplate:"EkdataColumnTemplate"

        },
      ],
       columnsTib: [
        {
          dataField: "MukellefID",
          caption: "Id",
          visible: false,
          showInColumnChooser: false,
        },
        {
          dataField: "unvan",
          caption: "Ünvan",
        },
        {
          dataField: "ZarfKonu",
          caption: "Vergi Dairesi",
        },
        {
          dataField: "VergiNo",
          caption: "Vergi No",
        },
        {
          dataField: "altKurumKodu",
          caption: "Alt Kurum Kodu",
        },
        {
          dataField: "belgeNo",
          caption: "Belge No",
        },
        {
          dataField: "TebellugTarihi",
          caption: "Tarih",
        },
        {
          dataField: "OkumaDurum",
          caption: "Okundu",
        },
        {
          dataField: "ZarfPdf",
          caption: "İşlem",
          cellTemplate: "beyanColumnTemplate",
        },
        {
          dataField: "ekdat",
          caption: "Ek",
         cellTemplate:"EkdataColumnTemplate"

        },
      ],
       columnsVergi: [
        {
          dataField: "MukellefID",
          caption: "Id",
          visible: false,
          showInColumnChooser: false,
        },
        {
          dataField: "unvan",
          caption: "Ünvan",
        },
        {
          dataField: "ZarfKonu",
          caption: "Vergi Dairesi",
        },
        {
          dataField: "VergiNo",
          caption: "Vergi No",
        },
        {
          dataField: "altKurumKodu",
          caption: "Alt Kurum Kodu",
        },
        {
          dataField: "belgeNo",
          caption: "Belge No",
        },
        {
          dataField: "TebellugTarihi",
          caption: "Tarih",
        },
        {
          dataField: "OkumaDurum",
          caption: "Okundu",
        },
        {
          dataField: "ZarfPdf",
          caption: "İşlem",
          cellTemplate: "beyanColumnTemplate",
        },
        {
          dataField: "ekdat",
          caption: "Ek",
         cellTemplate:"EkdataColumnTemplate"

        },
      ],
      mukellefData:[],
      Gib:true,
      Tib:false,
      Vergi:false,
    };
  },
  methods: {
    ...mapActions(["AddNewsTebligatSorgu"]),
        queryClick() {
      this.$refs.queryPopup.show();
    },
    inquireClick() {
        let arr = [];     
        this.inquireRequest.title.forEach((el)=>{
        arr.push(el.value)
        })
const data={
  KullaniciUid:JSON.parse(localStorage.getItem("userData")).userId,
  baslangic:this.inquireRequest.startDate
  .replace("-", "")
          .replace("-", ""),
        bitis: this.inquireRequest.endDate.replace("-", "").replace("-", ""),
 tckn: arr,
        SorguDurumu: 0,
};
console.log(data);
this.AddNewsTebligatSorgu(data);
//  this.$toast({
//         component: ToastificationContent,
//         position: "top-right",
//         props: {
//           icon: "SearchIcon",
//           variant: "success",
//           text: `Tebligat Sorgulama İşlemi Başlamıştır. Lütfen sorgulama işlemi tamamlanıncaya kadar bekleyiniz..!`,
//         },
//       });


    },
    showPdfPopup(pdfUrl) {
      //this.activePdfUrl=pdfUrl;
      this.$refs.pdfPopup.show();
    },
    setLisst()
    {
  let arr = [];
      let durumarr = [];
      this.items = this.GetTebligat;
      this.getMukellef.forEach((data) => {
        arr.push({ title: data.unvan, value: data.tckn });
      });
      console.log(arr, durumarr);
      this.unvanlar = [...new Set(arr)];
    },
    downloadClick(e) {},
    printClick(e) {},
    sendClick(e) {},
    okunduYap() {},
    trash() {},
    listRunClick() {
      console.log(this.listRequest.type);
    },
    income() {
     this.SetData();
       this.Gib=true;
      this.Tib=false;
            this.Vergi=false;

    },
    trade() {
      this.items=[]
      this.Gib=false;
      this.Tib=true;
        this.Vergi=false;
      this.fecthticaret()
    },
    tax() {
      console.log("");
      this.items=[];
      this.Gib=false;
      this.Tib=false;
      this.Vergi=true;
      this.fetchVergi();
    },
    ...mapActions(["fecthGibTebligat","fetchMukellef","gibtebligatEk","fecthTibTebligat","fetchTibTebligatEk","fetchVergiTebligat"]),
    fecthtebligat() {
  
  this.fecthGibTebligat(this.getMukellef[0].musavirUid);
       this.setLisst();  
 
    
    },
    SetData() {
      console.log("çlaiştim setdata");
      this.items=[]; 
     
     let ekarr=[];
     this.GetTebligat.forEach(el=>
     {ekarr.push(el.TebligatId) }
      )
   this.gibtebligatEk(ekarr);
 setTimeout(()=>{
   this.SetEkdata()
 },2000)  
    },
  
    SetEkdata(){ 
      let orjinal=[];
      let Ek=[]
//? Ek tebligatıd alındı
      this.GetTebligatek.forEach(ek=>{
    Ek.push(ek.TebligatId)
  })
//? Orginal tebligatid alindi
this.GetTebligat.forEach(orj=>{
orjinal.push(orj.TebligatId)
})
//? Uyumlu olan ek bulundu
let sorc=this.GetTebligatek.filter(el=>{
  return orjinal.includes(el.TebligatId)
})

console.log(orjinal,sorc);
//? orginal ile karşilaştirilarak items aekleme yapılacak 
for (let i = 0; i < sorc.length; i++) {
  const element = sorc[i];
 var as= this.GetTebligat.forEach(el=>{
  if(el.TebligatId == element.TebligatId){
    let arr=[]
    arr.push(element)
 el.ek=[{...element}]
 el.ekdat=arr.length
    console.log(el);
  }
 
})
}
this.items = this.GetTebligat;

console.log(sorc,this.items);
    },

//! Ticaret Bakanlığı
    fecthticaret(){  
      this.fecthTibTebligat(this.mukellefData);
     setTimeout(()=>{
       this.SetTibData()
     },5000) 
    },
    SetTibData(){
      console.log("çaliştim Ticaret");
      this.items=[]; 
     let ekarr=[];
     this.GetTibTebligat.forEach(el=>
     {ekarr.push(el.TicaretTebtId) }
      )
   this.fetchTibTebligatEk(ekarr);
 
 setTimeout(()=>{
   this.SetTibEkdata()
 },5000) 
    },
    SetTibEkdata(){
      let Tiborjinal=[];
      let TibEk=[]
//? Ek tebligatıd alındı
      this.GetTibTebligatEk.forEach(ek=>{
    TibEk.push(ek.TebligatId)
  })
//? Orginal tebligatid alindi
this.GetTibTebligat.forEach(orj=>{
Tiborjinal.push(orj.TicaretTebtId)
})
//? Uyumlu olan ek bulundu
let Tibsorc=this.GetTibTebligatEk.filter(el=>{
  return Tiborjinal.includes(el.TicaretTebtId)
})

console.log(Tiborjinal,Tibsorc,this.GetTibTebligatEk);
//? orginal ile karşilaştirilarak items aekleme yapılacak 
for (let i = 0; i < Tibsorc.length; i++) {
  const element = Tibsorc[i];
  this.GetTibTebligat.forEach(el=>{
  if(el.TicaretTebtId == element.TicaretTebtId){
    let Tibarr=[]
    Tibarr.push(element)
 el.ek=[{...element}]
 el.ekdat=Tibarr.length
    console.log(el);
  }
 
})
}
this.items = this.GetTibTebligat;
console.log(Tibsorc,this.items);
    },

//! Vergi Denetim Kurulu
fetchVergi(){
      this.fetchVergiTebligat(this.mukellefData);
        setTimeout(()=>{
       this.SetVibData()
     },5000)
},
SetVibData(){
      console.log("çlaiştim Vergi");
      this.items=[]; 
     this.items=this.GetVergiTebligat
}
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
   
    ...mapGetters(["reMukellef","rePerson", "reGibTeblig","reGibTebligEk", "reTibTEbligat","reTibTebligatEk","reVergiTebligat"]),
    getMukellef() {
      return this.reMukellef;
    },
    GetTebligat() {
      return this.reGibTeblig;
    },
    GetTebligatek(){
      return this.reGibTebligEk
    },
    GetTibTebligat(){
return this.reTibTEbligat
    },
    
    GetTibTebligatEk(){
      return this.reTibTebligatEk
    },
    GetVergiTebligat(){
      return this.reVergiTebligat
    },
    getUserUid(){
      return this.rePerson.kullaniciUid;
    },
   
  },

  mounted() {
    this.fecthtebligat();
  },
};
</script>

<style>
.btn-container {
  display: flex;
  gap: 5px;
  margin-bottom: 5px;
}

.btn-container .m-btn {
  border: none;
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  background: #fff;
  padding: 7px 10px;
  border-radius: 0.357rem;
  display: flex;
  gap: 8px;
  align-items: center;
}

@media (max-width: 768px) {
  .btn-container .m-btn img {
    width: 35px;
  }
}
</style>