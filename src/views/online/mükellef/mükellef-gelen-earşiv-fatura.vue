<template>
  <div>
    <input
      type="text"
      v-model="SearchBar"
      placeholder="FaturaNo Ara..."
      class="searchbar"
    />
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
    <app-table
      :showPdfPopupClick="showPdfPopup"
      :inquireClick="queryClick"
      :downloadClick="downloadClick"
      :listClick="listClick"
      :printClick="printClick"
      :sendClick="sendClick"
      :pk="id"
      ref="AppTable"
      :items="items"
      :totalRows="50"
      :title="'Gelen E-Arşiv Sorgulama'"
      :columns="columns"
    />
 </b-overlay>
    <!-- Sorgula Popup -->
    <b-modal
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
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import AppTable from "@core/components/app-table/gelenFaturaTable.vue";
import { BRow, BCol, BFormGroup,BOverlay,BSpinner, BFormDatepicker } from "bootstrap-vue";
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
    BRow,
    BOverlay,
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
               startDate: {
            month: "",
            year: "",
          },
        endDate: {
          month: "",
          year: "",
        },
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
          dataField: "unvan",
          caption: "Mükellef Unvan",
          groupIndex:0
          
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
      SearchBar: "",
      RefData: this.$refs["AppTable"],
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
      }, 1000)
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
      this.$refs.queryPopup.show();
    },
    ...mapActions([
      "fecthGelenEarsivFat",
      "AddGelenFaturaSorgu",
      "fetchOneWatch",
    ]),
    inquireClick() {
      this.busy = true 
      this.setTimeout(() => {
        this.busy = false
      })
      let arr = [];
      console.log(this.inquireRequest);
      this.inquireRequest.title.forEach((el) => {

        arr.push(el.tckn);
      });
      const data = {
        KullaniciUid: JSON.parse(localStorage.getItem("userData")).userId,
        baslangic: this.inquireRequest.startDate,
        bitis: this.inquireRequest.endDate,

        tckn: arr,
        SorguDurumu: 0,
      };

        this.AddGelenFaturaSorgu(data);
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
      console.log(this.RefData, this.$refs["AppTable"].instance);
      this.mukelellefler = [...new Set(arr)];
        console.log(this.mukelellefler);
       
    },
  },
  computed: {
    // inquireMinDate() {
    //   return this.inquireRequest.startDate;
    // },
    // inquireMaxDate() {
    //   return this.inqurireRequest.endDate;
    // },
    // listMinDate() {
    //   return this.listRequest.startDate;
    // },
    // listMaxDate() {
    //   return this.listRequest.endDate;
    // },
    ...mapGetters(["reMukellef", "reGelenArsiv"]),
    Mukellefdataget() {
      return this.reMukellef;
    },
    GelenearsivDataGet() {
      return this.reGelenArsiv;
    },
  },
  watch: {
    SearchBar() {
      console.log(this.SearchBar);
      if (this.SearchBar.length < 3) {
        this.items = this.GelenearsivDataGet;
      } else {
        this.items = [];

        this.fetchOneWatch({ no: this.SearchBar, uid: KullaniciUid }).then(
          (res) => {
            console.log(res);

            this.items = res;
          }
        );
      }
    },
  },
  mounted() {
    this.fecthGelenFat();
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
</style>