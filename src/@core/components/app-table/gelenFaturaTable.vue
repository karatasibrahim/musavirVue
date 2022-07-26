<template>
  <b-card no-body>
    <DxDataGrid
      style="margin-left: 10px; margin-right: 10px; margin-top: 15px"
      :key-expr="pk"
      :columns="columns"
      :show-borders="true"
      :mukellefid="mukellefid"
      ref="appGrid"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :show-column-lines="true"
      :show-row-lines="true"
      :selected-row-keys="selectedRowKeys"
      @selection-changed="onSelectionChanged"
      :columns-auto-width="true"
      :data-source="items"
      
      @exporting="onExporting"
    >
      <DxExport :enabled="true" :allow-export-selected-data="true" />
      <DxLoadPanel :enabled="true" />
      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />
      <DxFilterPanel :visible="true" />
      <DxHeaderFilter :visible="true" />
      <DxSearchPanel :visible="true" />
      <DxScrolling row-rendering-mode="virtual" />
      <DxPager
        :visible="true"
        :allowed-page-sizes="pageSizes"
        display-mode="full"
        :show-page-size-selector="true"
        :show-info="false"
        :show-navigation-buttons="true"
      />
      <DxPaging :page-size="10" />
      <DxSorting mode="multiple" />
      <DxSelection
        :select-all-mode="'allPages'"
        :show-check-boxes-mode="'always'"
        :mode="selectable"
      />
      <DxStateStoring
        :enabled="true"
        type="custom"
        storage-key="storage"
        :customSave="saveLayout"
      />
      <DxFilterRow :visible="true" />
      <DxToolbar>
        <!-- <DxItem location="before" template="headerTemplate" /> -->
            <DxItem location="before" template="mukellef" /> 
            <DxItem location="before" template="dataFirst"/>
                 <DxItem location="before" template="dataLast"/>
        <DxItem location="before" template="inquireTemplate" /> 
     
        <!-- <DxItem location="before" template="wpTemplate" />
        <DxItem location="before" template="smsTemplate" />
        <DxItem location="before" template="epostaTemplate" /> -->
              

        <DxItem name="columnChooserButton" />
        <DxItem template="exportPdfTemplate" />
        <DxItem name="exportButton" />
      </DxToolbar>
 
      <!-- <template #sendTemplate>
        <DxDropDownButton
          width="150"
          ref="sendDrop"
          :split-button="false"
          :use-select-mode="false"
          :items="sendSettings"
          @click="sendClick(data)"
          display-expr="name"
          key-expr="id"
          text="Gönder"
          icon="share"
        />
      </template> -->
<!-- 
      <template #printTemplate>
        <DxDropDownButton
          width="150"
          :split-button="false"
          :use-select-mode="false"
          :items="printSettings"
          @itemClick="printClick"
          display-expr="name"
          key-expr="id"
          text="Yazdır"
          icon="print"
          type="back"
        />
      </template> -->
<template #mukellef>
<DxDropDownBox
  type="success"
        :data-source="mukellefData"
      placeholder="Lütfen Mükellef Seçiniz"
      display-expr="title"
      value-expr="tckn"
         width="410"
        >
          <template #content>
            <DxTreeView
   
       ref="treeViewRefName"
              :data-source="mukellefData"
      @item-selection-changed="treeView_itemSelectionChanged($event)"
              key-expr="tckn"
             :select-by-click="true"
              :select-nodes-recursive="false"
              selection-mode="multiple"
              show-check-boxes-mode="normal"
              display-expr="title"
              width="400"
            />
          </template>
</DxDropDownBox>
</template>
<template #dataFirst>
 <b-form-datepicker
              v-model="startdate"
            type="date"
            width="150"
            placeholder="Başlangıç Tarihi"
             apply-value-mode="useButtons"

          />

</template>
<template #dataLast>
 <b-form-datepicker
  ref="endDate"
             v-model="endDate"
            type="date"
            width="150"
            placeholder="Bitiş Tarihi"
                       
          />

 
</template>

 <!-- <template #wpTemplate>
        <DxButton
          type="success"
          text="Whatsapp"
          icon="share"
      
          @click="sendClick(selectedRowKeys)"
        />
      </template>
       <template #smsTemplate>
        <DxButton
          type="warning"
          text="Sms"
          icon="comment"
          @click="listClick"
        />
      </template>
       <template #epostaTemplate>
        <DxButton
          type="default"
          text="E-posta"
          icon="email"
          @click="listClick"
        />
      </template> -->

       <template #inquireTemplate>
        <DxButton
          type="danger"
          text="Gib'ten Sorgula"
          icon="search"
        
          @click="inquireClick()"  
        />
      </template>  

      <template #headerTemplate>
        <div class="text-center" style="margin-right: 20px">
          <h4>{{ title }}</h4>
        </div>
      </template>

      <template #exportPdfTemplate>
        <DxButton type="normal" icon="exportpdf" @click="exportPdf" />
      </template>

      <template #panelColumnTemplate="{ data }">
        <div class="text-center">
                      <feather-icon  @click="showPanelClick(data.data.beyan_pdf)" icon="BriefcaseIcon"/>

          <!-- <img
            src="https://musavir.tacminyazilim.com/app-assets/images/tacmin/logo_20px.png"
           
          /> -->
        </div>
      </template>

      <template #mukellefColumnTemplate="{ data }">
        <div class="text-center">
                  <feather-icon   @click="showTaxPayerInfoClick(data.data.beyan_pdf,data.data.MukellefId)" icon="UserIcon"/>

          <!-- <img
            src="https://musavir.tacminyazilim.com/app-assets/images/tacmin/edit_20px.png"
          
          /> -->
        </div>
      </template>

      <template #beyanColumnTemplate="{ data }">
        <div class="text-center">
          <img
            src="https://i.ibb.co/CvqLvpj/beyanname.jpg"
            @click="showPdfPopupClick(data.data.beyannameOid,data.data.tckn,'BEYANNAME')"
          />
          &nbsp; 
            <img
            src="https://i.ibb.co/mGfSXHG/tahakkuk.jpg"
            @click="showPdfPopupClick(data.data.tahakkukOid,data.data.tckn,'TAHAKKUK')"
          /> &nbsp; 
             <img
            class="text-right" height="14px"
            src="https://musavir.tacminyazilim.com/app-assets/images/tacmin/sil_20px.png"
            @click="deleteInsuranceClick(data.data)"
          />
        </div>
      </template>

      <!-- <template #tahakkukColumnTemplate="{ data }">
        <div class="text-center">
        // Fatma
        </div>
      </template> -->

      <template #sgkGosterimColumnTemplate="{ data }">
        <div class="text-left">
         <span> &nbsp; &nbsp;</span>
              <img  v-if="data.data.hasOwnProperty('tahakkukOid')"
            src="https://i.ibb.co/mGfSXHG/tahakkuk.jpg"
             @click="showPdfPopupClick(data.data.bynthkoid,data.data .tckn,'SGK')"
          />
          <span> &nbsp;</span>
          <img  v-if="data.data.payload.data.hasOwnProperty('thkhaberlesme2')"
            src="https://i.ibb.co/mGfSXHG/tahakkuk.jpg"
             @click="showPdfPopupClick(data.data.thkoid,data.data.tckn,'SGK')"
          />     <span> &nbsp;</span>
             <img
            class="text-right" height="14px"
            src="https://musavir.tacminyazilim.com/app-assets/images/tacmin/sil_20px.png"
            @click="deleteInsuranceClick(data.data)"
          />
<!--           
          <img  v-if="data.data.payload.data.hasOwnProperty('thkhaberlesme3')"
            src="https://i.ibb.co/mGfSXHG/tahakkuk.jpg"
           @click="showPdfPopupClick(data.data.payload.data.thkhaberlesme3.thkoid,data.data.tckn,'SGK')"
          /> -->

<!--        
          <img
           v-if="data.data.payload.data.hasOwnProperty('thkhaberlesme4')"
            class="text-right"
           src="https://i.ibb.co/mGfSXHG/tahakkuk.jpg"
             @click="showPdfPopupClick(data.data.payload.data.thkhaberlesme4.thkoid,data.data.tckn,'SGK')"
          /> -->
          
          <!-- <img
           v-if="data.data.payload.data.hasOwnProperty('thkhaberlesme5')"
            class="text-right"
           src="https://i.ibb.co/mGfSXHG/tahakkuk.jpg"
             @click="showPdfPopupClick(data.data.payload.data.thkhaberlesme5.thkoid,data.data.tckn,'SGK')"
          /> -->
        </div>
      </template>
    </DxDataGrid>
  </b-card>
</template>

<script>
import {
  BCard,
  BCardHeader,
  BCardBody,
  BCardTitle,
  BCardText,
  BFormDatepicker
} from "bootstrap-vue";

import {
  DxDataGrid,
  DxScrolling,
  DxPager,
  DxPaging,
  DxSearchPanel,
  DxSorting,
  DxFilterRow,
  DxHeaderFilter,
  DxFilterPanel,
  DxColumn,
  DxSelection,
  DxColumnChooser,
  DxColumnFixing,
  DxStateStoring,
  DxToolbar,
  DxItem,
  DxLoadPanel,
  DxExport,
} from "devextreme-vue/data-grid";
import { BButton } from "bootstrap-vue";
import DxButton from "devextreme-vue/button";
import DxDateBox from 'devextreme-vue/date-box';
import DxDropDownButton from "devextreme-vue/drop-down-button";
import DxDropDownBox from 'devextreme-vue/drop-down-box';
import Ripple from "vue-ripple-directive";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";
import { exportDataGrid } from "devextreme/excel_exporter";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import DxTreeView from 'devextreme-vue/tree-view';
export default {
  name: "AppTable",
  components: {
    BCard,
    BCardBody,
    BCardTitle,
    BCardText,
    DxDataGrid,
    BFormDatepicker,
    DxDateBox,
    DxScrolling,
    DxPager,
    BCardHeader,
    DxPaging,
    DxSearchPanel,
    DxSorting,
    DxTreeView,
    DxFilterRow,
    DxHeaderFilter,
    DxDropDownButton,
    DxDropDownBox,
    DxFilterPanel,
    DxColumn,
    DxSelection,
    DxColumnChooser,
    DxColumnFixing,
    DxStateStoring,
    DxToolbar,
    DxItem,
    DxLoadPanel,
    BButton,
    DxButton,
    DxExport,
  },
  directives: {
    Ripple,
  },

  props: {
    pk: {
      type: String,
      default: "id",
    },
    title: {
      type: String,
      default: "Grid",
    },
    columns: {
      type: Array,
      default: [],
    },
    items: {
      type: Array,
      default: [],
    },
    selectable: {
      type: String,
      default: "multiple",
    },
    mukellefData:{
      type:Array
    },
    showPdfPopupClick: Function,
    inquireClick: Function,
    downloadClick: Function,
    listClick: Function,
    printClick: Function,
    sendClick: Function,
    deleteInsuranceClick: Function,
    showTaxPayerInfoClick: Function,
    showPanelClick: Function,
  },
  data() {
    return {
 startdate: new Date(),
 endDate: new Date(),
      mukellefid:"",
      pageSizes: [10, 20, 50, "all"],
      selectedRowKeys: [],
      downloadSettings: [
        { id: 1, name: "Detaylı İndir", icon: "download" },
        { id: 2, name: "Detaysız İndir", icon: "download" },
      ],
      printSettings: [
        { id: 1, name: "Beyanname", icon: "pdffile" },
        { id: 2, name: "Tahakkuk", icon: "pdffile" },
        { id: 3, name: "Tümü", icon: "pdffile" },
      ],
  
    };
  },
  watch:{
startdate(){
  this.$emit('sendStartDate',this.startdate)
},
endDate(){

  this.$emit('sendEndDate',this.endDate)
}
  },
  computed: {
    dataGrid() {
      return this.$refs.appGrid.instance;
    },
 
  },
  methods: {
    saveenddate(){
console.log(this.$refs.endDate);
    },
    getEnd(e){
console.log(e);
    },
        treeView_itemSelectionChanged(e) {
      console.log(e.component.getSelectedNodeKeys()); 
  this.$emit("selected-tckn",e.component.getSelectedNodeKeys())
    },

window(e,tck){
  let url= `${"https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/"+tck+"%2FTAHAKKUK%2F"+ e+".pdf?alt=media"}`
  window.open(url,'_blank')
  console.log(e);
},
    onSelectionChanged({ selectedRowKeys, selectedRowsData }) {
      console.log(selectedRowsData);
      this.selectedRowKeys = selectedRowKeys;
      this.selectionChangedBySelectBox = false;
        console.log(this.$refs["appGrid"].instance);
    },
    saveLayout(state) {
      state.columns.forEach((element) => {
        var column_custom_ref = this.columns.filter(
          (x) => x.dataField == element.dataField
        )[0];
        if (column_custom_ref.cellTemplate != null)
          element.cellTemplate = column_custom_ref.cellTemplate;
        if (column_custom_ref.format != null)
          element.format = column_custom_ref.format;
        if (column_custom_ref.minWidth != null)
          element.minWidth = column_custom_ref.minWidth;
        if (column_custom_ref.maxWidth != null)
          element.maxWidth = column_custom_ref.maxWidth;
        if (column_custom_ref.caption != null)
          element.caption = column_custom_ref.caption;
      });
      //state.columns burada kayda gönderilecek.
    },
    exportPdf() {
      const doc = new jsPDF({
        orientation: "landscape",
      });
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: this.dataGrid,
      }).then(() => {
        doc.save(this.title + ".pdf");
      });
    },
    onExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet(this.title);

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            this.title + ".xlsx"
          );
        });
      });
      e.cancel = true;
    },
  },
//   updated(){
//     console.log(this.$refs["appGrid"].instance);
//   let eleman= document.getElementsByClassName("dx-texteditor-input")
//    for (let index = 0; index < eleman.length; index++) {
//     const el = eleman[index];
//     el.addEventListener('keypress')
//    }
//  }
 };
</script>
<style scoped>
#exportButton {
  margin-bottom: 10px;
}
.feather.feather-trash,
.feather.feather-user{
    width: 27px;
  height: 19px;
}
  .dx-button.dx-button-warning {
        background-color: #ffc107;
    }

</style>
 