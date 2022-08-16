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
       @selected-tckn="gettckn"
       @sendEndDate="sendEndDate"
            @sendStartDate="sendStartDate"

    />

  

    
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
    sendStartDate(e) {
      this.inquireRequest.startDate = e;
    },
    sendEndDate(e) {
      this.inquireRequest.endDate = e;
    },
    trash(){},
  
    queryClick() {
      this.$refs.queryPopup.show();
    },
    inquireClick() {

      this.firmaverileri=[];
 let tc=[];
 tc=this.SelectedTckn;
 
 setTimeout(()=>{
      
      let unvan=[]
      var expected = this.getfirma.map(a => Object.assign(a,this.getMükellef.find(b=> b.tckn == a.tc)));
      expected.forEach(a=>{
        this.firmaverileri.push({SistemSifresi:a.SistemSifresi,SubeKodu:a.SubeKodu,SubeKullanicAdi:a.SubeKullanicAdi })
      })
     
      //var expected2 = this.getCalisan.map(a => Object.assign(a,expected.find(b => b.        SubeId == a.SubeId)));
       //var expected3 = this.getVizite.map(a => Object.assign(a,expected2.find(b => b.        CalisanID == a.CalisanId)));
     
       // expected3.forEach(a=>{ this.items.push({Mukunvan:a.Unvan,Unvan:a.CalisanUnvan,TC:a.TC,TakipNo:a.TakipNo, SiraNo:a.SiraNo,Vaka:a.Vaka,KontrolTarihi:a.KontrolTarihi,OnayDurumu:a.OnayDurumu})})
        
        this.mükelellefler=[...new Set(unvan)]

          const data = {
        KullaniciUid: JSON.parse(localStorage.getItem("userData")).userId,
        baslangic: this.inquireRequest.startDate,
        bitis: this.inquireRequest.endDate,
       SgkBilgileri:this.firmaverileri[0],
      //  kullaniciAdi:this.firmaverileri[2],
      //  isyeriKodu:this.firmaverileri[1],
        tckn: this.SelectedTckn,
        SorguDurumu: 0,
      };
  
 
   
     
       
       this.AddViziteSorgu(data);
      },500)


// setTimeout(() => {
//   var expected = this.getfirma.map(a => Object.assign(a,this.getMükellef.find(b=> b.tckn == a.Tckn)));
//  console.log("DOĞRU",expected,this.SelectedTckn);

// this.getMükellef.forEach((elemns)=>{
//   let bilgi=this.SelectedTckn.map((eln)=>{
//     return elemns.tckn==eln.Tckn;
//   });
//   console.log("2DAT",bilgi);
// });


// this.SelectedTckn.forEach((element)=>{
//   let data=this.getMükellef.map((el)=>{
//     return element.Tckn==el.tckn;
//   });
//   console.log("BİLGİ", data);
// });

// }, 3000);

  
    //  const data = {
    //     KullaniciUid: JSON.parse(localStorage.getItem("userData")).userId,
    //     baslangic: "2019",
    //     bitis: "2022",
    //    IsyeriSifresi:firmaverileri.IsyeriSifresi,
    //    kullaniciAdi:firmaverileri.kullaniciAdi,
    //    isyeriKodu:firmaverileri.SubeKodu,
    //     tckn: this.SelectedTckn,
    //     SorguDurumu: 0,
    //   };
  
 
   
     
    //  // console.log("GİDEN VERİ",data);
    //    this.AddViziteSorgu(data);
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
 this.fetchSgkFirmaalar(this.Mukellefdataget[0].musavirUid);
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

  
}, 2000);

 
 
    // this.getfirma.forEach(element => {
    // arr.push(element.Tckn) 
    //   });
       
    //   this.fetchCalisan(arr);

    //  setTimeout(()=>{
    //   let caalisanİd=[]
    //   this.getCalisan.forEach(data=>{
    //     caalisanİd.push(data.CalisanID) 
    //   })
    //   console.log(caalisanİd);
    //   this.fetchSgkVizite(caalisanİd)
    //    },800)
    // setTimeout(()=>{
    //   console.log("Vizite",this.getCalisan);
    //   let unvan=[]
    //   var expected = this.getfirma.map(a => Object.assign(a,this.getMükellef.find(b=> b.MukellefId == a.MukellefId)));
    //   var expected2 = this.getCalisan.map(a => Object.assign(a,expected.find(b => b.        SubeId == a.SubeId)));
    //     var expected3 = this.getVizite.map(a => Object.assign(a,expected2.find(b => b.        CalisanID == a.CalisanId)));
    //     expected3.forEach(a=>{ this.items.push({Munvan:a.Unvan,Unvan:a.CalisanUnvan,TC:a.TC,TakipNo:a.TakipNo, SiraNo:a.SiraNo,Vaka:a.Vaka,KontrolTarihi:a.KontrolTarihi,OnayDurumu:a.OnayDurumu})})
    //     console.log(this.items,expected3);
    //     this.mükelellefler=[...new Set(unvan)]
    //   },2000)
     
  },
  },

  mounted(){
    this.fetchdata()
  }
};
</script>

<style></style>