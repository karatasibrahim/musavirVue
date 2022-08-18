<template>
  <div>
    <app-table5
      :inquireClick="inquireClick"
      :pk="'id'"
      :items="items"
      :totalRows="16"
      :title="'GİB Borcu Yoktur'"
      :columns="columns"
      :mukellefData="mukellefler"
       @selected-tckn="gettckn"
    />

 
  </div>
</template>

<script>
import AppTable5 from "@core/components/app-table/borcuYokturTable.vue";
import { BRow, BCol, BFormGroup, BFormDatepicker, BFormInput, BFormCheckbox } from "bootstrap-vue";
import lng from "../../utils/strings";
import mockData from "../../../services/online/finance/service";
import vSelect from "vue-select";
import { mapActions,mapGetters } from 'vuex';
export default {
  components: {
    AppTable5,
    BRow,
    vSelect,
    BCol,
    BFormGroup,
    BFormDatepicker,
    BFormInput,
    BFormCheckbox,
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
      selected: false,
    
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
          dataField: "Tarih",
          caption: "Tarih",
        },
        {
          dataField: "Kurum",
          caption: "Kurum",
        },
        {
          dataField: "Durum",
          caption: "Durum",
        },
        {
          dataField: "Göster",
          caption: "Göster",
        },
      ],
    };
  },
  methods: {
     ...mapActions([""]),
    queryClick() {
      this.$refs.queryPopup.show();
    },
    inquireClick() {
        
    },
        gettckn(e)
    {
this.SelectedTckn=e;
    },
    showPdfPopup(pdfUrl) {
      //this.activePdfUrl=pdfUrl;
      this.$refs.pdfPopup.show();
    },borcDataGet()
    {
      this.setOption();
    },
      setOption(){
let arr=[];
this.Mukellefdataget.forEach((el)=>{
  arr.push({title:el.unvan,tckn:el.tckn})
  this.mukellefler=[...new Set(arr)];
});
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
  },
  computed:{
    ...mapGetters(["reMukellef"]),
    Mukellefdataget(){
      return this.reMukellef;
    },
  },
  mounted(){
    this.borcDataGet();
  },
};
</script>

<style></style>