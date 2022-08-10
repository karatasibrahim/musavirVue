<template>
  <div>
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
    
        </div><br>  
          <div class="mb-0"
               style="font-size:25px; color:red">
              Sorgulama işlemi devam etmektedir..
            </div> 
      </template>
    <pos-table
      :showPdfPopupClick="showPdfPopup"
      :inquireClick="inquireClick"
      :downloadClick="downloadClick"
      :listClick="listClick"
      :mukellefData="mukellefler"
      :printClick="printClick"
      :sendClick="sendClick"
      :pk="id"
      :items="items"
      :totalRows="50"
      :title="'Pos Sorgulama'"
      :columns="columns"
      @selected-tckn="gettckn"
            @sendEndDate="sendEndDate"
            @sendStartDate="sendStartDate"
    />
 </b-overlay>
    <!-- Sorgula Popup -->
    <!-- <b-modal
      ref="queryPopup"
      title="Mükellef Pos Sorgulama"
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
              multiple
              label="title"
            />
          </b-form-group>
        </b-col>

         <b-col cols="12">
          <b-form-group label="Pos Bilgisi" label-for="h-type" label-cols-md="4">
            <v-select
              v-model="listRequest.type"
             :options="poslar"
              placeholder="Pos Bilgisi Seçiniz"
              label="PosBilgisi"
            />
          </b-form-group>
        </b-col> -->
        <!-- <b-col cols="12">
          <b-form-group
            label="Tarih Seçiniz"
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
        </b-col> -->
        <!-- <b-col cols="12">
          <b-form-group label="Detay" label-for="h-type" label-cols-md="4">
            <v-select
              v-model="listRequest.type"
               :options="detaylar"
              placeholder="Detay Seçiniz"
              label="DetayBilgisi"
            />
          </b-form-group>
        </b-col> -->
      <!-- </b-row>
    </b-modal> -->

    <!-- <b-modal
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
    </b-modal>  -->

    <b-modal
      ref="listPopup"
      title="Listele"
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
              v-model="listRequest.title"
              :options="mukelellefler"
              placeholder="Mükellef Seçiniz"
              multiple
              label="MükellefSeçimi"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="Pos Bilgisi"
            label-for="h-type"
            label-cols-md="4"
          >
            <v-select
              v-model="listRequest.type"
              :options="poslar"
              placeholder="Pos Bilgisi Seçiniz"
              label="PosBilgisi"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="Tarih Seçiniz"
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
          <b-form-group label="Detay" label-for="h-type" label-cols-md="4">
            <v-select
              v-model="listRequest.type"
              :options="detaylar"
              placeholder="Detay Seçiniz"
              label="DetayBilgisi"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import PosTable from "@core/components/app-table/PosTable.vue";
import { BRow, BCol, BFormGroup, BOverlay,BSpinner, BFormDatepicker } from "bootstrap-vue";
import lng from "../../utils/strings";
import mockData from "../../../services/online/finance/service";
import vSelect from "vue-select";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { mapGetters, mapActions } from "vuex";
 import Ripple from 'vue-ripple-directive' 
export default {
  components: {
    PosTable,
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
      dateTimeLanguage: lng.dateTimeLanguage,
      id: "",
        inquireRequest:{
        startDate: "",
        endDate: "",
        type: null,
        title: [],
      },
      //focusdate: false,
      //#endregion
     listRequest:  {
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
      activePdfUrl:
        "https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/AL%C4%B0%20%C3%9CZ%C3%9CMC%C3%9C%2F1ukxyryp3t1xhp.pdf?alt=media",
      items: [
    
      ],
      unvanlar: mockData.unvanlar,
      turler: mockData.turler,
      detaylar: [],
      poslar: ["Pos Tutarı olanlar", "Pos Tutarı Olmayanlar"],
      mukelellefler: [],
      columns: [
        {
          dataField: "PosId",
          caption: "Id",
          visible: false,
          showInColumnChooser: false,
        },
        {
          dataField: "unvan",
          caption: "Unvan",
          groupIndex: 0,
        },
    
        {
          dataField: "pos_banka_adi",
          caption: "Banka Adı",
      
          
        },
               {
          dataField: "tckn",
          caption: "T.C.",
          width:"200",
         alignment: "right"
        },
        {
          dataField: "pos_banka_vkn",
          caption: "Vergi No",
          width:"200",
         alignment: "right"
        },
        
        {
          dataField: "pos_uye_isy",
          caption: "Pos Üye İşyeri No",
          width:"200",
         alignment: "right"
        },
     {
          dataField: "toplam",
          caption: "Toplam",
          width:"200",
         alignment: "right"
        },
        {
          dataField: "genelToplam",
          caption: "Genel Toplam",
          groupIndex: 1,
        },
      ],
    };
  },
  watch: {
    // "listRequest.startDate"() {
    //   this.focusdate = true;
    // },
  },
  methods: {
      clearTimeout() {
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
    },
     sendStartDate(e) {
      this.inquireRequest.startDate = e;
    },
    sendEndDate(e) {
      this.inquireRequest.endDate = e;
    },
    gettckn(e){
      this.SelectedTckn=e;
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
    queryClick() {
      //this.$refs.queryPopup.show();
    },
    ...mapActions(["AddPosSorgu", "fetchPosSorgu"]),
    inquireClick() {
       this.busy = true 
      this.setTimeout(() => {
        this.busy = false
      })
      // let arr = [];
      //   this.inquireRequest.title.forEach(el=>{
      //   arr.push(el.tckn)
      //   })
      const data = {
        KullaniciUid: JSON.parse(localStorage.getItem("userData")).userId,
        baslangic: this.inquireRequest.startDate.replace("-", "").substr(0, 6), //Ay bilgisi

        tckn: this.SelectedTckn,
        SorguDurumu: 0,
      };
   console.log("TARİH",data.baslangic);
console.log(data);
       this.AddPosSorgu(data);


       this.$toast({
        component: ToastificationContent,
        position: "top-right",
        props: {
          icon: "SearchIcon",
          variant: "success",
          text: `POS Sorgulama İşlemi Başlamıştır. Lütfen sorgulama işlemi tamamlanıncaya kadar bekleyiniz..!`,
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

    fetchunvan() {
      this.items = this.getmükelef.map((el) => {
        return {
          Unvan: el.Unvan,
          mukellefid: el.MukellefId,
        };
      });
    },
    listClick() {
      this.$refs.listPopup.show();
    },
    listRunClick() {
      console.log(this.focusdate);
      let copytime = this.listRequest.startDate;
      console.log(this.listRequest.startDate);
      let time2 = new Date(this.listRequest.startDate);
      const fil = this.PosSorguDataGet.filter((el) => {
        const time = new Date(el.SorguTarihi);
        console.log(time);
        if (this.listRequest.title.length > 0) {
          return this.listRequest.title.includes(el.BankaAdi);
        } else if (this.listRequest.type != "Pos Tutarı olanlar") {
          return el.Tutar == "";
        } else if (this.focusdate) {
          console.log(time2.getTime() < time.getTime());
          return time2.getTime() < time.getTime();
        } else {
          console.log("else");
          return el;
        }
      });
      this.items = fil;
    },
    postDataGet() {
      let arr = [];
      // this.Mukellefdataget.forEach((element) => {
      //   console.log("pos");
      //   arr.push(element.MukellefId);
      // });
      console.log(this.Mukellefdataget[0]);
      this.fetchPosSorgu(this.Mukellefdataget[0].musavirUid);
      setTimeout(() => {
        this.setOption();
      }, 1000);
    },
    setOption() {
      let bankarr = [];
      let pos = [];
      let detayArr = [];
      let arr=[];
      
            this.Mukellefdataget.forEach((el) => {            
        bankarr.push({ title: el.unvan, tckn: el.tckn });
        detayArr.push(el.BankaAdi);
      });

        this.Mukellefdataget.forEach((el) => {
            arr.push({title:el.unvan,tckn:el.tckn});   

this.mukellefler=[...new Set(arr)]

        
      });

      this.mukelellefler = [...new Set(bankarr)];
      var expected = this.PosSorguDataGet.map((a) =>
        Object.assign(
          a,
          this.Mukellefdataget.find((b) => b.tckn == a.tckn)
        )
      );
    
      let expected_alt = [];
      expected.forEach((ex) => {
  
        ex.veri.posBilgileriTable.map((ve) => {
          expected_alt.push(
            Object.assign(ve, {
              unvan: ex.unvan,
              tckn: ex.tckn,
              genelToplam: ex.veri.toplam_genel,
            })
          );
        });
      });
      console.log(expected_alt);
      this.items = expected_alt;

      console.log(this.mukelellefler);
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
    ...mapGetters(["reMukellef", "rePosSorgu"]),
    Mukellefdataget() {
      return this.reMukellef;
    },

    PosSorguDataGet() {
      return this.rePosSorgu;
    },
  },
  mounted() {
    this.postDataGet();
  },
};
</script>

<style>
element.style {
    text-align: left;
    color: black;
}
.dx-datagrid-content .dx-datagrid-table .dx-row > td.dx-datagrid-group-space + td, .dx-datagrid-content .dx-datagrid-table .dx-row > tr > td.dx-datagrid-group-space + td {
    border-left: none;
  
    color: black;
}
</style>