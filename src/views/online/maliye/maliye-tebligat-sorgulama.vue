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
      <b-overlay
          :show="busy"
          rounded="lg"
          opacity="0.6"
          @hidden="onHidden"
          active
        >
          <template v-slot:overlay>
            <div class="d-flex justify-content-between">
              <b-spinner small type="grow" variant="info" />
              <b-spinner type="grow" variant="dark" />
              <b-spinner small type="grow" variant="info" />
            </div>
            <br />
            <div class="mb-0" style="font-size: 25px; color: red">
              Sorgulama işlemi devam etmektedir..
            </div>
          </template>
    <tebligat-table
      :showPdfPopupClick="showPdfPopup"
      :inquireClick="queryClick"
      :downloadClick="downloadClick"
      :okunduYap="okunduYap"
      :trash="trash"
      :printClick="printClick"
      :sendClick="sendClick"
      :pk="MukellefID"
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
      :pk="MukellefID"
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
      :pk="MukellefID"
      :items="items"
      :totalRows="16"
      :title="'Tebligatlar'"
      :columns="columnsVergi"
      v-if="Vergi"
    />
            </b-overlay>
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
import { BRow, BCol, BFormGroup, BOverlay,
  BSpinner, BFormDatepicker } from "bootstrap-vue";
import lng from "../../utils/strings";
//import mockData from "../../../services/online/finance/service";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import vSelect from "vue-select";
import { mapActions, mapGetters } from "vuex";
import Ripple from "vue-ripple-directive";
 
export default {
  components: {
    TebligatTable,
    BRow,
    vSelect,
     BOverlay,
  BSpinner,
    BCol,
    BFormGroup,
    BFormDatepicker,
  },
   directives: {
    Ripple,
  },
  data() {
    return {
        busy: false,
      timeout: null,
       MukellefID:'',
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
          dataField: "veri.birimAdi",
          caption: "Vergi Dairesi",
          width:"300"
        },
        {
          dataField: "tckn",
          caption: "Vergi No",
          width:"100"
        },
        {
          dataField: "veri.zarfKonu",
          caption: "Konu",
          width:"300"
        },
        {
          dataField: "veri.zarfAciklama",
          caption: "Açıklama",
               width:"340"
        },
        {
          dataField: "veri.vdGondermeTarihi",
          caption: "Tarih",
               width:"100"
        },
        {
          dataField: "OkumaDurum",
          caption: "Okundu",
               width:"120"
        },
        {
          dataField: "ZarfPdf",
          caption: "İşlem",
          cellTemplate: "beyanColumnTemplate",
               width:"90"
        },
        {
          dataField: "ekdat",
          caption: "Ek",
                 width:"90",
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
    clearTimeout() {
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
    },
    setTimeout(callback) {
      this.clearTimeout()
      this.timeout = setTimeout(() => {
        this.clearTimeout()
        callback()
      }, 45000)
    },
    onHidden() {
      // Return focus to the button
      this.$refs.button.focus()
    },
    onClick() {
      this.busy = true
      // Simulate an async request
      this.setTimeout(() => {
        this.busy = false
      })
    },
    ...mapActions(["AddNewsTebligatSorgu"]),
        queryClick() {
      this.$refs.queryPopup.show();
    },
    inquireClick() {
       this.busy = true 
      this.setTimeout(() => {
        this.busy = false
      })
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
 this.$toast({
        component: ToastificationContent,
        position: "top-right",
        props: {
          icon: "SearchIcon",
          variant: "success",
          text: `Tebligat Sorgulama İşlemi Başlamıştır. Lütfen sorgulama işlemi tamamlanıncaya kadar bekleyiniz..!`,
        },
      });

    },
        showPdfPopup(e, tck, is) {
      this.activePdfUrl = `${
        "https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/" +
        tck +
        "%2F" +
        is +
        "%2F" +
        e +
        ".pdf?alt=media"
      }`;
      //this.activePdfUrl=pdfUrl;
      this.$refs.pdfPopup.show();
    },
    setLisst(){
  let arr = [];
      let durumarr = [];
      this.items = this.GetTebligat;
      this.getMukellef.forEach((data) => {
        arr.push({ title: data.unvan, value: data.tckn });
      });
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
     this.fecthtebligat();
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
  this.items=[]; 
  this.fecthGibTebligat(JSON.parse(localStorage.getItem("userData")).userId).then(()=>{
     
     let ekarr=[];
     console.log( this.GetTebligat);
     this.GetTebligat.forEach(el=>{
      console.log(el);
      ekarr.push(el.TebligatId) })
      String.prototype.insert = function(index, string) {
  if (index > 0) {
    return this.substring(0, index) + string + this.substr(index);
  }

  return string + this;
};
      setTimeout(() => {
          this.gibtebligatEk(ekarr).then(()=>{
            let join_part_one= this.GetTebligat.map(a=>Object.assign(a,this.GetTebligatek.find(b=>b.zarfOid==a.zarfOid))) //NODERED tarafında ticaret Tebligat dosyaları zarfOid Firebase alanında ki zarfOid ye göre yazdırıalacak
          let join_part_two=join_part_one.map(a=>Object.assign(a,{unvan:this.getMukellef.find(b=>b.tckn==a.tckn).unvan}))

        join_part_two.forEach(el=>{
          let data=el.veri.vdGondermeTarihi.substring(0,8)
el.veri.vdGondermeTarihi=data.substring(0,4).insert(4, "/")+data.substring(4,6).insert(6, "/")+data.substring(6,8);
        })     

          console.log(join_part_two);
          this.items=join_part_two
          })
      }, 400);
  })
       this.setLisst();  
 
    
    },

//! Ticaret Bakanlığı
    fecthticaret(){  
      this.items=[]; 
      this.fecthTibTebligat(JSON.parse(localStorage.getItem("userData")).userId).then(()=>{
            let ekarr=[];
     console.log( this.GetTibTebligat);
     this.GetTibTebligat.forEach(el=>{
      console.log(el);
      ekarr.push(el.TebligatId) })
      setTimeout(() => {
          this.fetchTibTebligatEk(ekarr).then(()=>{
            let join_part_one= this.GetTibTebligat.map(a=>Object.assign(a,this.GetTibTebligatEk.find(b=>b.TebligatId==a.TebligatId)))
          let join_part_two=join_part_one.map(a=>Object.assign(a,{unvan:this.getMukellef.find(b=>b.tckn==a.tckn).unvan}))
          console.log(join_part_two);
          this.items=join_part_two
          })
      }, 400);
      })
    },
//! Vergi Denetim Kurulu
fetchVergi(){
  this.items=[]; 
      this.fetchVergiTebligat(JSON.parse(localStorage.getItem("userData")).userId).then(()=>{
                   let ekarr=[];
     console.log( this.GetVergiTebligat);
     this.GetVergiTebligat.forEach(el=>{
      console.log(el);
      ekarr.push(el.TebligatId) })
      setTimeout(() => {
          this.gibtebligatEk(ekarr).then(()=>{
          let join_part_two=GetVergiTebligat.map(a=>Object.assign(a,{unvan:this.getMukellef.find(b=>b.tckn==a.tckn).unvan}))
          console.log(join_part_two);
          this.items=join_part_two
          })
      }, 400); 
      })


},

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