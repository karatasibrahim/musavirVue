<template>
  <div>
    <!-- <input
      type="text"
      v-model="SearchBar"
      placeholder="FaturaNo Ara..."
      class="searchbar"
    /> -->

    <!-- Sorgula Popup -->
    <!-- <b-modal
      ref="queryPopup"
      title="Gelen E-Arşiv Fatura Sorgula"
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
              v-model="inquireRequest.title"
              :options="mukelellefler"
              placeholder="Mükellef Seçiniz"
              label="title"
              multiple
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="Ay Seçimi"
            label-for="h-start-date"
            label-cols-md="4"
          >
            < <b-form-datepicker
              id="h-start-date"
              v-model="inquireRequest.startDate"
              :max="inquireMaxDate"
              v-bind="dateTimeLanguage.labels[dateTimeLanguage.locale]"
              :locale="dateTimeLanguage.locale"
              class="mb-1"
            /> -->
          <!-- </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="Başlangıç Tarihi"
            label-for="h-start-date"
            label-cols-md="4" -->
        
            <!-- <b-form-datepicker
              id="h-start-date"
              v-model="inquireRequest.startDate"
              :max="inquireMaxDate"
              v-bind="dateTimeLanguage.labels[dateTimeLanguage.locale]"
              :locale="dateTimeLanguage.locale"
              class="mb-1"
            /> -->
          <!-- </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="Bitiş Tarihi"
            label-for="h-end-date"
            label-cols-md="4" -->
         
            <!-- <b-form-datepicker
              id="h-end-date"
              v-model="inquireRequest.endDate"
              :min="inquireMinDate"
              v-bind="dateTimeLanguage.labels[dateTimeLanguage.locale]"
              :locale="dateTimeLanguage.locale"
              class="mb-1"
            /> -->
          <!-- </b-form-group>
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
<!--
    <b-modal
      ref="listPopup"
      title="Gelen E-Arşiv Listele"
      ok-title="Listele"
      cancel-title="İptal"
      cancel-variant="outline-secondary"
      @ok="listRunClick"
    >
      <b-row>
        <b-col cols="12">
          <b-form-group
            label="Mükellef Seçimi"
            label-for="h-type"
            label-cols-md="4"
          >
            <v-select
              v-model="inquireRequest.title"
              :options="mukelellefler"
              multiple
              placeholder="Mükellef Seçiniz"
              label="MükellefSeçimi"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="Ay Seçimi"
            label-for="h-start-date"
            label-cols-md="4"
          >
            <b-form-datepicker
              id="h-start-date"
              v-model="listRequest.startDate"
              :max="inquireMaxDate"
              v-bind="dateTimeLanguage.labels[dateTimeLanguage.locale]"
              :locale="dateTimeLanguage.locale"
              class="mb-1"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="Başlangıç Tarihi"
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
            label="Bitiş Tarihi"
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
            /> -->
          <!-- </b-form-group>
        </b-col>
      </b-row>
    </b-modal>  -->
   <b-tabs>

    <b-tab title="GELEN FATURA">
         <b-overlay
      :show="busy"
      rounded="lg"
      opacity="0.6"
      @hidden="onHidden"
       active
    >
      <template v-slot:overlay>
        <div class="d-flex justify-content-between">
         <b-spinner
            small
            type="grow"
            variant="info"
          />
          <b-spinner
            type="grow"
            variant="dark"
          />
          <b-spinner
            small
            type="grow"
            variant="info"
          />
        </div> <br>
          <div class="mb-0"
               style="font-size:25px; color:red">
              Sorgulama işlemi devam etmektedir..
            </div>
      </template>

    <app-table
       
      :inquireClick="queryClick"
      :downloadClick="downloadClick"
      :listClick="listClick"
      :printClick="printClick"
      :sendClick="sendClick"
      :pk="id"
      ref="AppTable"
      :mukellefData="mukelellefler"
      :items="GElendataitems"
      :totalRows="50"
      :title="'Gelen E-Arşiv Sorgulama'"
      :columns="columns"
      @selected-tckn="gettckn"
      @sendEndDate="sendEndDate"
      @sendStartDate="sendStartDate"
    />
 </b-overlay>
    </b-tab>


    <b-tab

      title="GİDEN FATURA"
      type="danger"
    >
       <b-overlay
      :show="busy"
      rounded="lg"
      opacity="0.6"
      @hidden="onHidden"
    >
      <template v-slot:overlay>
        <div class="d-flex justify-content-between">
         <b-spinner
            small
            type="grow"
            variant="info"
          />
          <b-spinner
            type="grow"
            variant="dark"
          />
          <b-spinner
            small
            type="grow"
            variant="info"
          />
        </div> <br>
          <div class="mb-0"
               style="font-size:25px; color:red">
              Sorgulama işlemi devam etmektedir..
            </div>
      </template>
    <app-table2
      :showPdfPopupClick="showPdfPopup"
      :inquireClick="queryClick"
      
      ref="AppTable2"
        :mukellefData="mukelellefler"
       :pk="id"
       :items="GidenDataitems"
     
      :totalRows="16"
      :title="'Giden E-Arşiv Sorgulama'"
      :columns="columnsG"
      @selected-tckn="gettckn"
      @sendEndDate="sendEndDate"
      @sendStartDate="sendStartDate"
    />
 </b-overlay>

    </b-tab>


  </b-tabs>

  </div>
</template>

<script>
import AppTable from "@core/components/app-table/gelenFaturaTable.vue";
 import AppTable2 from "@core/components/app-table/gidenFaturalarTable.vue"
import { BRow, BCol, BFormGroup,BTabs, BTab, BCardText,BOverlay,BSpinner, BFormDatepicker } from "bootstrap-vue";
import lng from "../../utils/strings";
import mockData from "../../../services/online/finance/service";
import vSelect from "vue-select";
import { mapGetters, mapActions } from "vuex";
let KullaniciUid = JSON.parse(localStorage.getItem("userData")).userId;
 import Ripple from 'vue-ripple-directive'
 import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default {
  components: {
    AppTable,
    AppTable2,
    BRow,
    BOverlay,
    BTabs, BTab, BCardText,
    BSpinner,
    vSelect,
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

      id: "",
      dateTimeLanguage: lng.dateTimeLanguage,
      inquireRequest: {
               startDate:'',
        endDate:'',
        type: null,
        title: [],
      },
      //#endregion
      listRequest: {
             startDate: {
            month: "",
            year: "",
          },
        endDate:  {
          month: "",
          year: "",
        },
        type: null,
        title: [],
      },
      activePdfUrl:
        "https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/AL%C4%B0%20%C3%9CZ%C3%9CMC%C3%9C%2F1ukxyryp3t1xhp.pdf?alt=media",
      items: [],
      GElendataitems:[],
      unvanlar: mockData.unvanlar,
      turler: mockData.turler,
      mukelellefler: [],
      columns: [
        {
          dataField: "id",
          caption: "Id",
          visible: false,
          showInColumnChooser: false,
        },
           {
          dataField: "MukUnvan",
          caption: "Mükellef",
          groupIndex:0,

        },
        {
          dataField: "veri.unvan",
          caption: "Gelen Unvan",

        },
        {
          dataField: "veri.faturaNo",
          caption: "Fatura No",
          width:"150"
        },
        {
          dataField: "veri.vergi",
          caption: "Vergiler",
          alignment:"right",
          width:"100"
        },
        {
          dataField: "veri.mukVkn",
          caption: "Vergi No",
          width:"120"
        },
        {
          dataField: "veri.tarih",
          caption: "Tarih",
          width:"100"
        },
          {
          dataField: "veri.toplam",
          caption: "Toplam",
            alignment: "right",
            width:"100"
        },
        {
          dataField: "veri.odenecek",
          caption: "Ödenecek",
            alignment: "right",
            width:"100"
        },
        {
          dataField: "veri.paraBirimi",
          caption: "Döviz",
        alignment:"right",
        width:"80"
        },
        {
          dataField: "veri.gonderimSekli",
          caption: "Gönderim Şekli",
          width:"200"
        },
        {
          dataField: "Aciklama",
          caption: "Açıklama",
          width:"200"
        },
      ],
        items:[],
        GidenDataitems:[],
      columnsG: [
      
        {
          dataField: "id",
          caption: "Id",
          visible: false,
          showInColumnChooser: false,
        },
           {
          dataField: "MukellefUnvan",
          caption: "Mükellef",
          groupIndex:0,

        },
        {
          dataField: "fatura.belgeNumarasi",
          caption: "Belge Numarası",
        },
           {
          dataField: "fatura.aliciUnvanAdSoyad",
          caption: "Alıcı Ünvan",
          width:250
          
        },
        {
          dataField: "fatura.aliciVknTckn",
          caption: "Alıcı VKN/TC",
           alignment: "right",
        },
     
        {
          dataField: "fatura.belgeTarihi",
          caption: "Belge Tarihi",
           alignment: "right",
        },
        {
          dataField: "veri.tip",
          caption: "Belge Türü",
           alignment: "right",
        },
        {
          dataField: "fatura.onayDurumu",
          caption: "Onay Durumu",
           alignment: "right",
        },
        {
          dataField: "veri.odenecek",
          caption: "Tutar",
           alignment: "right",
        },
        {
          dataField: "İçerik",
          caption: "Pdf",
            alignment: "center",
            width:"80",
          cellTemplate: "gidenFaturaTemplate",
         
        },
      ],
      SearchBar: "",
      RefData: this.$refs["AppTable2"],
      SelectedTckn:[]
    };
  },
  methods: {
    sendStartDate(e){
this.inquireRequest.startDate=e

    },
        sendEndDate(e){
this.inquireRequest.endDate=e

    },
    gettckn(e){

this.SelectedTckn=e
    },
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
      }, 20000)
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
         this.$toast({
        component: ToastificationContent,
        position: "top-right",
        props: {
          icon: "SearchIcon",
          variant: "success",
          text: `Beyanname Sorgulama İşlemi Başlamıştır. Lütfen sorgulama işlemi tamamlanıncaya kadar bekleyiniz..!`,
        },
      });
    },
    queryClick() {
     // this.$refs.queryPopup.show();
 this.busy = true
      this.setTimeout(() => {
        this.busy = false
      })

      const data = {
        KullaniciUid: JSON.parse(localStorage.getItem("userData")).userId,
        baslangic: this.inquireRequest.startDate,
        bitis: this.inquireRequest.endDate,

        tckn: this.SelectedTckn,
        SorguDurumu: 0,
      };
console.log(data);
        this.AddGelenFaturaSorgu(data);
        this.AddGidenFaturaSorgu(data);
             this.$toast({
        component: ToastificationContent,
        position: "top-right",
        props: {
          icon: "SearchIcon",
          variant: "success",
          text: `Gelen EArşiv fatura sorgulama işleminiz başlamıştır. Lütfen sorgulama işlemi tamamlanıncaya kadar bekleyiniz..!`,
        },
      });

    },
    ...mapActions([
      "fecthGelenEarsivFat",
      "AddGelenFaturaSorgu",
      "fetchOneWatch",
      "DeleteGelenFatura",
      "fetchGidenEarsiv",
      "AddGidenFaturaSorgu"
    ]),

//     inquireClick() {

//       this.busy = true
//       this.setTimeout(() => {
//         this.busy = false
//       })

//       const data = {
//         KullaniciUid: JSON.parse(localStorage.getItem("userData")).userId,
//         baslangic: this.inquireRequest.startDate,
//         bitis: this.inquireRequest.endDate,

//         tckn: this.SelectedTckn,
//         SorguDurumu: 0,
//       };
// console.log(data);
//         this.AddGelenFaturaSorgu(data);
//              this.$toast({
//         component: ToastificationContent,
//         position: "top-right",
//         props: {
//           icon: "SearchIcon",
//           variant: "success",
//           text: `Gelen EArşiv fatura sorgulama işleminiz başlamıştır. Lütfen sorgulama işlemi tamamlanıncaya kadar bekleyiniz..!`,
//         },
//       });
//   //this.DeleteGelenFatura(this.items);


//     },

    // showPdfPopup(pdfUrl) {
    //   //this.activePdfUrl=pdfUrl;
    //   this.$refs.pdfPopup.show();
    // },
    downloadClick(e) {},
    printClick(e) {},
    sendClick(e) {},
    listClick() {
      this.$refs.listPopup.show();
    },
        showPdfPopup(tckn, e ) {
      this.activePdfUrl = `${
        "https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/" +
        tckn +
        "%2FGİDEN%2F" +
        e +
        ".pdf?alt=media"
      }`;
      this.$refs.pdfPopup.show();
    },
    listRunClick() {
      let now = new Date(this.listRequest.startDate);
      let time2 = new Date(this.listRequest.startDate);
      const fil = this.GelenearsivDataGet.filter((el) => {
        const time = new Date(
          el.Tarih.slice(0, 10).split(".").reverse().join("/")
        );
        console.log(this.listRequest.title);
        if (this.listRequest.title.length > 0) {
          console.log("1.if");
          return this.listRequest.title.includes(el.Unvan);
        }

        //   if(  time2.getTime()<=now.getTime()){
        //     console.log("3.if",this.listRequest.startDate!=this.listRequest.endDate, this.listRequest.startDate,this.listRequest.endDate);
        //       return time2.getTime()<time.getTime()
        //  }
        else {
          console.log("else");
          return el;
        }
      });
      this.items = fil;
    },

    fecthGelenFat() {
      this.items = [];
      this.fecthGelenEarsivFat(this.Mukellefdataget[0].musavirUid);
      this.setList();
    },
    setList() {
      let arr = [];
      this.items = this.GelenearsivDataGet;
      this.Mukellefdataget.forEach((el) => {
        arr.push({ title: el.unvan, tckn: el.tckn });
      });
      //console.log(this.RefData, this.$refs["AppTable"].instance);
      this.mukelellefler = [...new Set(arr)];
        console.log(this.mukelellefler);
        this.setTimeout(()=>{
this.GElendataitems=this.GelenearsivDataGet.map(a=>{
return Object.assign(a,{MukUnvan:this.Mukellefdataget.find(b=> a.tckn.includes(b.tckn)).unvan})

}) 
  },50);
    },

     fetchGidenars() {
      this.fetchGidenEarsiv(this.Mukellefdataget[0].musavirUid);
        this.GidenDataitems = this.getGidenArsiv;
       this.setArr();
    },
      setArr() {
        let arr = [];
      //  let durumarr = [];
        this.GidenDataitems = this.getGidenArsiv;
        //   this.setTimeout(()=>{
        // this.GidenDataitems=this.getGidenArsiv.map(a=>{
        //   return Object.assign(a,{MukellefUnvan:this.Mukellefdataget.find(b=>a.tckn.includes(b.tckn)).unvan})
        // })
        //  },50);
       this.Mukellefdataget.forEach((data) => {
         arr.push({ title: data.unvan, value: data.tckn });
       });
       console.log(arr, durumarr);
       this.unvanlar = [...new Set(arr)];
      },
  },
  computed: {
    // inquireMinDate() {
    //   return this.inquireRequest.startDate;
    // },
    inquireMaxDate() {

    },
    // listMinDate() {
    //   return this.listRequest.startDate;
    // },
    // listMaxDate() {
    //   return this.listRequest.endDate;
    // },
    ...mapGetters(["reMukellef", "reGelenArsiv","reGidenArsiv"]),
    Mukellefdataget() {
      return this.reMukellef;
    },
      getGidenArsiv() {
      return this.reGidenArsiv;
    },
    GelenearsivDataGet() {
      return this.reGelenArsiv;
    },
  },
  watch: {
    // SearchBar() {
    //   console.log(this.SearchBar);
    //   if (this.SearchBar.length < 3) {
    //     this.items = this.GelenearsivDataGet;
    //   } else {
    //     this.items = [];

    //     this.fetchOneWatch({ no: this.SearchBar, uid: KullaniciUid }).then(
    //       (res) => {
    //         console.log(res);

    //         this.items = res;
    //       }
    //     );
    //   }
    // },
  },
  created(){

  },
  mounted() {
    this.fecthGelenFat();
this.fetchGidenars();


  },
};
</script>

<style>
.searchbar {
  border-radius: 5px;
  border: 1px solid #d7cbcb;
  padding: 5px 10px 5px 10px;
  margin-bottom: 5px;
}
.nav-tabs .nav-link.active, [dir] .nav-tabs .nav-item.show .nav-link {
    background-color: transparent;
    border-color: #dae1e7 #dae1e7 transparent;
    font-weight: bold;
    color: red;
}
.nav-tabs .nav-link {
    border: none;
    padding: 0.61rem 1.2rem;
    border-radius: 0;
    font-weight: bold;
    color: blue;
}
.nav-tabs .nav-link.active .nav-tabs .nav-item.show .nav-link {
    background-color: transparent;
    border-color: #dae1e7 #dae1e7 transparent;
    background-color: #fff;
    border-color:red;
    border-left-style: solid;
    border-top: solid;
    border-width: 2px;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-weight: 600;
    float: left;
    padding: 0.625rem 1.25rem;
    position: relative;
    transition: 0.1s ease-in-out;
    text-decoration: none;
}

</style>