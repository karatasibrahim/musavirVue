<template>
  <div>
    <app-table
   :showPdfPopupClick="showPdfPopup"
      :inquireClick="queryClick"
      :downloadClick="downloadClick"
      :listClick="listClick"
      :printClick="printClick"
      :sendClick="sendClick"
@onSelectionChanged="gelendata"
      :pk="id"
      :items="items"
      :totalRows="16"
      :title="'Beyannameler'"
      :clickposta="clickposta"
      :columns="columns"
      ref="appTablee"
      @pageSizes="getPageSize"
    />

    <!-- Sorgula Popup -->
    <b-modal
      ref="queryPopup"
      title="Beyanname Sorgula"
      ok-title="Sorgula"
      cancel-title="İptal"
      cancel-variant="outline-secondary"
      @ok="inquireClick"
    >
      <b-row>
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
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-modal>

    <b-modal
      ref="pdfPopup"
      title="Beyanname Görüntüle"
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

    <!-- <b-modal
      ref="listPopup"
      title="Listele"
      ok-title="Listele"
      cancel-title="İptal"
      cancel-variant="outline-secondary"
      @ok="listRunClick"
    >
      <b-row>
        <b-col cols="12">
          <b-form-group label="Ünvan" label-for="h-type" label-cols-md="4">
            <v-select
              v-model="listRequest.title"
              :options="unvanlar"
              multiple
              placeholder="Ünvan Seçiniz"
              label="Unvan"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Tür" label-for="h-type" label-cols-md="4">
            <v-select
              v-model="listRequest.type"
              :options="turler"
              multiple
              placeholder="Tür Seçiniz"
              label="BeyanTuru"
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
              v-model="listRequest.startDate"
              :max="listMaxDate"
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
              v-model="listRequest.endDate"
              :min="listMinDate"
              v-bind="dateTimeLanguage.labels[dateTimeLanguage.locale]"
              :locale="dateTimeLanguage.locale"
              class="mb-1"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-modal> -->
    <!-- <input type="text" v-model="phone">
    <input type="text" v-model="msg"> -->
    <!-- <button @click="getQRCode">deneme</button>   -->
  </div>
</template>

<script>
import AppTable from "@core/components/app-table/BeyannameTable.vue";
import { BRow, BCol, BFormGroup, BFormDatepicker } from "bootstrap-vue";
import lng from "../../utils/strings";
import mockData from "../../../services/online/finance/service";
import vSelect from "vue-select";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
let arr = [];
export default {
  components: {
    AppTable,
    BRow,
    vSelect,
    BCol,
    BFormGroup,
    BFormDatepicker,
  },
  data() {
    return {
      setQRCode: null,
      size: 125,
      phone: null,
      msg: "",
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
      id: "",
      //#endregion
      listRequest: {
        startDate: new Date(),
        endDate: new Date(),
        type: [],
        title: [],
      },

      activePdfUrl:
        "https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/0012167353%2FBEYANNAME%2F10l09o1t551oys.pdf?alt=media",
      items: [],
      unvanlar: [],
      turler: [],
      columns: [
        {
          dataField: "id",
          caption: "Id",
          visible: false,
          showInColumnChooser: false,
        },
        {
          dataField: "unvan",
          caption: "Ünvan",
        },
        {
          dataField: "beyannameTuru",
          caption: "Kodu",
        },
        {
          dataField: "vergiDairesi",
          caption: "Vergi Dairesi",
        },
        {
          dataField: "tckn",
          caption: "T.C. Kimlik No",
        },
        {
          dataField: "yuklemezamani",
          caption: "Tarih",
        },
        {
          dataField: "beyannameTuru",
          caption: "Türü",
        },
        {
          dataField: "donem",
          caption: "Dönem",
        },
        {
          dataField: "FisNo",
          caption: "Fiş No",
        },
        {
          dataField: "beyan_pdf",
          caption: "Beyan & Tahakkuk",
          cellTemplate: "beyanColumnTemplate",
        },
        // {
        //   dataField: "tahak_pdf",
        //   caption: "Tahakkuk Pdf",
        //   cellTemplate: "tahakkukColumnTemplate",
        // },
        {
          dataField: "Toplam",
          caption: "Tutar",
        },
      ],
      mukellefid: "",
      userEmail: "",
      selectredrow:[]
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
  ...mapGetters(["rePerson", "reMukellef", "reBeyanname"]),
    beyannameData() {
     return this.reBeyanname
    },
    mukelefData() {
      return this.reMukellef;
    },
    getPerson(){
     return this.rePerson.kullaniciUid
      
    },
    getUserUid()
    {
return this.rePerson.kullaniciUid;
 
    }
  },

  methods:{
    ...mapActions(['AddNewsBeyanSorgu','fetchBeyanname','nextButtons','prevButtonVuex']),

getPageSize(e){
  this.items=[]
  const data={
    kullaniciuid:this.getPerson,
    limitSize:e
  };
this.fetchBeyanname(data).then(el=>{
 this.items=el
})
},
    async getQRCode(phone, msg) {
      const res = await axios.post("http://localhost:8087/api", { phone, msg });
      this.setQRCode = res.data;
      console.log(res.data);
    },
gelendata(value){
this.selectredrow= value
},
    queryClick() {
      this.$refs.queryPopup.show();
    },
    ...mapActions(["AddNewsBeyanSorgu","AddNewsEpostaSorgu"]),

    sendClick(e) {

      var arr = [];

     e.forEach((element) => {
        let data = this.mukelefData.find((el) => {
          return element.tckn == el.tckn;
        });
        console.log(data, element);
        arr.push(Object.assign(element, data));
      });
      arr.forEach((iletim) => {  
         iletim.iletisim.forEach((tel) => {
         

       
        //   let phone = tel.Telefon;
          let msg =
            tel.HitapŞekli +
            " " +
            iletim.unvan +
            " " +
            iletim.donem +
            " " +
            "beyannameniz ektedir. " +
            " Toplam Borç Tuarınız" +
            " " +
            iletim.Toplam +
            " " +
            `${
              "https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/" +
              iletim.tckn +
              "%2FTAHAKKUK%2F" +
              iletim.tahakkukOid +
              ".pdf?alt=media"
            }`;
               window.open(`${"https://wa.me/90"+tel.Telefon+"?text="+msg}`,"_blank")
        //   this.getQRCode(phone, msg);
       });
     });
    },
    inquireClick() {
      const data = {
        KullaniciUid: this.getUserUid,

        baslangic: this.inquireRequest.startDate
          .replace("-", "")
          .replace("-", ""),
        bitis: this.inquireRequest.endDate.replace("-", "").replace("-", ""),

        SorguDurumu: 0,
      };
      console.log(data);
      //Actionu çağirip ona veri göndermemiz lazım aksi halde çalişmaz
      this.AddNewsBeyanSorgu(data);
      //Data da ayarladiğimiz verileri vuexe gönderdik
      // window.open("http://mukellef.emusavirim.com/");

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
      this.$refs.pdfPopup.show();
    },
    downloadClick(e) {},
    printClick(e) {},
clickposta(){
console.log(this.selectredrow);
let newarr=[]
this.selectredrow.forEach(a=>{
newarr.push({tckn:a.tckn,id:a.id})

})
console.log(newarr);
this.AddNewsEpostaSorgu({data:newarr})

},
    listClick() {
      this.$refs.listPopup.show();
    },

    listRunClick() {
      // let now = new Date(this.listRequest.startDate);
      // let time2 = new Date(this.listRequest.startDate);
      // const fil = this.beyannameData.filter((el) => {
      //   const time = new Date(
      //     el.beyan_yukleme_tarihi.slice(0, 10).split(".").reverse().join("/")
      //   );
      //   console.log(this.listRequest.title);
      //   if (this.listRequest.title.length > 0) {
      //     console.log("1.if");
      //     return this.listRequest.title.includes(el.unvan);
      //   } else if (this.listRequest.type.length > 0) {
      //     console.log("2.if");
      //     return this.listRequest.type.includes(el.beyan_turu);
      //   }
      //   else {
      //     console.log("else");
      //     return el;
      //   }
      // });
      // this.items = fil;
      // console.log(now);

    },
    /////////////////////////////////
    fetch() {
      this.items=[]
        const data={
    kullaniciuid:JSON.parse(localStorage.getItem("userData")).userId,
    limitSize:Number(10)
  }
      console.log(this.kullaniciUid);
 this.fetchBeyanname(data).then(el=>{
 this.items=el
})
    },
    setünvan() {
      console.log("geldim" );
           this.beyannameData.forEach(el=>{
        this.items.push(el.data())
      })
x

    },
  },
  mounted() {
    this.fetch();
    console.log(typeof this.listRequest.startDate);
  },
};
</script>

<style></style>


 