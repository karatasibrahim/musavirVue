<template>
  <b-card no-body>
    <DxDataGrid
      style="margin-left: 10px; margin-right: 10px; margin-top: 15px"
      :key-expr="pk"
      :columns="columns"
      :show-borders="true"
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
      />
      <DxFilterRow :visible="true" />
      <DxToolbar>
        <DxItem location="before" template="headerTemplate" />
          <DxItem location="before" template="mukellef" /> 
            <DxItem location="before" template="dataFirsts"/>
                 <DxItem location="before" template="dataLasts"/>
        <DxItem location="before" template="inquireTemplate" />
        <!-- <DxItem location="before" template="printTemplate" />
        <DxItem location="before" template="trash" /> -->
        <DxItem name="columnChooserButton" />
        <DxItem template="exportPdfTemplate" />
        <DxItem name="exportButton" />
      </DxToolbar>
      <!-- <DxColumn data-field="RaporTakipNo" caption="Takip No"/>
      <DxColumn data-field="SiraNo" caption="Sıra No"/>
      <DxColumn data-field="Vaka" caption="Vaka"/>
      <DxColumn data-field="TC" caption= "TC"/>
      <DxColumn data-field="AdSoyad" caption= "Ad Soyad"/>
      <DxColumn data-field="RaporBaşlangıç" caption="Rapor Başlangıç"/>
      <DxColumn data-field="KontrolTarihi" caption="Kontrol"/>
      <DxColumn data-field="OnayDurum" caption="Durum" />
      <DxColumn
        :group-index="0"
        data-field="Munvan"
       
      />  -->

    

      <template #inquireTemplate>
        <DxButton
          type="danger"
          text="Sorgula"
          icon="search"
          @click="inquireClick()"
        />
      </template>

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
<template #dataFirsts>
 <b-form-datepicker
              v-model="startdate"
            type="date"
            width="150"
            placeholder="Başlangıç Tarihi"
             apply-value-mode="useButtons"

          />

</template>
<template #dataLasts>
 <b-form-datepicker
  ref="endDate"
             v-model="endDate"
            type="date"
            width="150"
            placeholder="Bitiş Tarihi"
                       
          />

 
</template>
      <template #trash>
        <DxButton
          type="normal"
          text="Sil"
          icon="trash"
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
          <img
            src="https://musavir.tacminyazilim.com/app-assets/images/tacmin/logo_20px.png"
            @click="showPanelClick(data.data.beyan_pdf)"
          />
        </div>
      </template>

      <template #mukellefColumnTemplate="{ data }">
        <div class="text-center">
          <img
            src="https://musavir.tacminyazilim.com/app-assets/images/tacmin/edit_20px.png"
            @click="showTaxPayerInfoClick(data.data.beyan_pdf)"
          />
        </div>
      </template>

      <template #beyanColumnTemplate="{ data }">
        <div class="text-center">
          <img
            src="https://i.ibb.co/CvqLvpj/beyanname.jpg"
            @click="showPdfPopupClick(data.data.beyan_pdf)"
          />
        </div>
      </template>

      <template #tahakkukColumnTemplate="{ data }">
        <div class="text-center">
          <img
            src="https://i.ibb.co/mGfSXHG/tahakkuk.jpg"
            @click="showPdfPopupClick(data.data.tahak_pdf)"
          />
        </div>
      </template>

      <template #sgkGosterimColumnTemplate="{ data }">
        <div class="text-left">
          <img
            src="https://i.ibb.co/mGfSXHG/tahakkuk.jpg"
            @click="showPdfPopupClick(data.data.tahak_pdf)"
          />
          <span> &nbsp; &nbsp; &nbsp;</span>
          <img
            src="https://i.ibb.co/mGfSXHG/tahakkuk.jpg"
            @click="showPdfPopupClick(data.data.tahak_pdf)"
          />

          <span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
          <img
            class="text-right"
            src="https://musavir.tacminyazilim.com/app-assets/images/tacmin/sil_20px.png"
            @click="deleteInsuranceClick(data.data)"
          />
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
import DxDropDownButton from "devextreme-vue/drop-down-button";
import DxDateBox from 'devextreme-vue/date-box';
import DxTreeView from 'devextreme-vue/tree-view'; 
import DxDropDownBox from 'devextreme-vue/drop-down-box';
import Ripple from "vue-ripple-directive";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";
import { exportDataGrid } from "devextreme/excel_exporter";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";

export default {
  name: "AppTable",
  components: {
    BCard,
    BCardBody,
    BCardTitle,
    DxDateBox,
     DxTreeView,
    BCardText,
    BFormDatepicker,
    DxDataGrid,
    DxDateBox,
    DxTreeView,
     DxDropDownBox,
    DxScrolling,
    DxPager,
    BCardHeader,
    DxPaging,
    DxSearchPanel,
    DxSorting,
    DxFilterRow,
    DxHeaderFilter,
    DxDropDownButton,
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
      sendSettings: [
        { id: 1, name: "Sms", icon: "rename" },
        { id: 2, name: "E-Posta", icon: "email" },
        { id: 3, name: "Whatsapp", icon: "attach" },
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
    treeView_itemSelectionChanged(e) {
      console.log("Muk",e.component.getSelectedNodeKeys()); 
  this.$emit("selected-tckn",e.component.getSelectedNodeKeys())
    },
    onSelectionChanged({ selectedRowKeys, selectedRowsData }) {
      console.log(selectedRowsData);
      this.selectedRowKeys = selectedRowKeys;
      this.selectionChangedBySelectBox = false;
    },
    saveLayout(state) {
      console.log(state);
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


      })  
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

};
</script>
<style scoped>
#exportButton {
  margin-bottom: 10px;
}
</style>
