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
    <app-table
      :showPdfPopupClick="showPdfPopup"
      :inquireClick="queryClick"
      :downloadClick="downloadClick"
      :listClick="listClick"
      :printClick="printClick"
      :sendClick="sendClick"
      @onSelectionChanged="gelendata"
      :deleteInsuranceClick="deleteInsuranceClick"
      :pk="id"
      :items="items"      
      :totalRows="16"
      :title="'Beyannameler'"
      :clickposta="clickposta"
      :sendSms="sendSms"
      :columns="columns"
      ref="appTablee"
      @pageSizes="getPageSize"
    />
 </b-overlay>
    
    <b-modal
      ref="queryPopup"
      title="Beyanname Sorgula"
      ok-title="Sorgula"
      cancel-title="İptal"
      cancel-variant="outline-secondary"
      @ok="inquireClick"
             :header-bg-variant="headerBgVariant"
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
      ref="listPopup"
      title="Listele"
      ok-title="Listele"
      cancel-title="İptal"
      cancel-variant="outline-secondary"
      @ok="listRunClick"
       :header-bg-variant="headerBgVariant"
    >
      <b-row>
        <b-col cols="12">
          <b-form-group label="Ünvan" label-for="h-type" label-cols-md="4" >
            <v-select
              v-model="listRequest.title"
              :options="unvanlar"
              multiple
              placeholder="Ünvan Seçiniz"
              label="Unvan"
            />
          </b-form-group>
        </b-col>
        <!-- <b-col cols="12">
          <b-form-group label="Tür" label-for="h-type" label-cols-md="4">
            <v-select
              v-model="listRequest.type"
              :options="turler"
              multiple
              placeholder="Tür Seçiniz"
              label="BeyanTuru"
            />
          </b-form-group>
        </b-col> -->
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

     
  </div>
</template>

<script>
import AppTable from "@core/components/app-table/BeyannameTable.vue";
import { BRow, BCol, BFormGroup, BOverlay,BSpinner,  BFormDatepicker } from "bootstrap-vue";
import lng from "../../utils/strings";
import mockData from "../../../services/online/finance/service";
import vSelect from "vue-select";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import request from "request";
 import Ripple from 'vue-ripple-directive' 

let arr = [];
export default {
  components: {
    AppTable,
    BRow,
    BOverlay,BSpinner, 
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
       headerBgVariant: 'danger',
        busy: false,
    timeout: null,
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
      filterItems:[],
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
          dataField: "Gonderim",
          caption: "Gönderim",
          width: "100",
           cellTemplate: "gonderimTemplate",
        },
        {
          dataField: "unvan",
          caption: "Ünvan",
 
          
        },
        
        {
          dataField: "beyannameKodu",
          caption: "Kodu",
          width: "100",
        },
        {
          dataField: "vergiDairesi",
          caption: "Vergi Dairesi",
          width: "150",
        },
        {
          dataField: "tckn",
          caption: "T.C. Kimlik No",
          width: "110",
        },
        {
          dataField: "yuklemezamani",
          caption: "Tarih",
          width: "140",
        },
        {
          dataField: "beyannameTuru",
          caption: "Türü",
          width: "120",
        },
        {
          dataField: "donem",
          caption: "Dönem",
          width: "140",
          
        },
         {
          dataField: "Vadesi",
          caption: "Vadesi",
          width: "100",
          
        },
        {
          dataField: "FisNo",
          caption: "Fiş No",
          width: "180",
        },
        {
          dataField: "Toplam",
          caption: "Tutar",
          alignment: "right",
          width: "90",
          customize_text: "priceColumn_customizeText",
        },
        {
          dataField: "beyan_pdf",
          caption: "Beyan & Tahakkuk",
          cellTemplate: "beyanColumnTemplate",
          width: "100",
        },
        // {
        //   dataField: "tahak_pdf",
        //   caption: "Tahakkuk Pdf",
        //   cellTemplate: "tahakkukColumnTemplate",
        // },
      ],
      mukellefid: "",
      userEmail: "",
      selectredrow: [],
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
    ...mapGetters(["rePerson", "reMukellef","reKullaniciAyarlar", "reBeyanname", "reVergiDaire"]),
    beyannameData() {
      let arr = [];

      this.reBeyanname.forEach((el) => {
        arr.push(Object.assign(el.data(), { id: el.id }));
      });
      return arr;
    },
     getKullaniciAyar()
    {
      return this.reKullaniciAyarlar;
    },
     
    mukelefData() {
      return this.reMukellef;
    },
    getPerson() {
      return this.rePerson.kullaniciUid;
    },
  
    getUserUid() {
      return this.rePerson.kullaniciUid;
    },
    getVDairesi() {
      return this.reVergiDaire;
    },
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
    async getPageSize(e) {
      let beyan = [];
      let unvanlaar = [];
      const data = {
        kullaniciuid: JSON.parse(localStorage.getItem("userData")).userId,
        limit: e,
      };
      await this.beyannameGetir(data)
      this.items = this.reBeyanname;
 
    },
    sendmail() {},
    priceColumn_customizeText(cellInfo) {
      return cellInfo.value + "$";
    },
    ...mapActions([
      "AddNewsBeyanSorgu",
      "fetchBeyanname",
      "fetchBeyannameFilter",
      "nextButtons",
      "prevButtonVuex",
      "DeleteBeyanData",
      "updateBeyanname",
      "DeleteGelenFatura"
    ]),
    deleteInsuranceClick(e) {
      
      this.DeleteBeyanData(e);
      let fin = this.items.findIndex((el) => {
        return el.id == e;
      });
      this.items.splice(fin, 1);
    },
    getPageSize(e) {
      let beyan = [];
      let unvanlaar = [];
      const data = {
        kullaniciuid: JSON.parse(localStorage.getItem("userData")).userId,
        limitSize: e,
      };
      this.fetchBeyanname(data).then((el) => {
        beyan = el;
        let ar = [];

        this.beyannameData.forEach((eld) => {
          ar.push(eld.vergiDairesi);
        });
        this.mukelefData.forEach((esl) => {
          unvanlaar.push(esl.unvan);
        });
        setTimeout(() => {
          this.unvanlar = [...new Set(unvanlaar)];

          this.fetchvergiDairesi(ar).then((res) => {
            this.items = beyan.map((a) =>
              Object.assign(
                a,
                this.getVDairesi.find((b) => b.VergiDaireKod == a.vergiDairesi)
              )
            );
          });
        }, 500);
      });
    },
 
    gelendata(value) {
      let arr = value.map((a) =>
        Object.assign(
          a,
          { unvan: this.mukelefData.find((b) => b.tckn == a.tckn) }.unvan
        )
      ); 
      this.selectredrow = arr;
    },
    queryClick() {
      this.$refs.queryPopup.show();
    },
    ...mapActions([
      "AddNewsBeyanSorgu",
      "AddNewsEpostaSorgu",
      "fetchvergiDairesi",
      "AddNewsWhatsappSorgu",
      "AddNewsMailSorgu",
      "fetchKullaniciAyarlar"
    ]),

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
          let msgBaslik =
            tel.HitapŞekli + "," + " "+
            "Son ödeme tarihi " +
            " "+
            iletim.Vadesi + " " + "olan" +
            " "+
             iletim.beyannameTuru + " "+ "ödemeniz"+
            // iletim.unvan +
           
            " " + 
            iletim.Toplam + " "+ "TL dir."
            " " ;
            
        
            let beyanid= iletim.beyannameOid;
            let msgTah=`${
            "https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/" +
            iletim.tckn +
            "%2FTAHAKKUK" +
            "%2F" +
            iletim.tahakkukOid +
            ".pdf?alt=media"
          }`;
         //let beyan=['Beyanname',msgUrl]
          ;
let phone = tel.Telefon;
 
const data={
  KullaniciUid:this.getUserUid,
  SorguDurumu:0,
  TelefonNo:phone,
  MesajIcerik:msgBaslik,
      //Beyanname:this.fetchBeyanname("/Beyanname/"+beyanid),
           // user: db.doc('users/pb7La4kzEaBow4iWvmxZ')
   Tablo:"Beyanname/"+beyanid,
  Dosyalar:[
    // {
    //    "dosya":"Beyanname",
    //    "url":msgUrl
    // },
    { 
       "dosya":"Tahakkuk",
       "url":msgTah
       
    }]  
}; 
 this.AddNewsWhatsappSorgu(data);
 
        }); 
       
      });
  
    },
    inquireClick() {
         this.busy = true 
      this.setTimeout(() => {
        this.busy = false
      })
      const data = {
        KullaniciUid: this.getUserUid,

        baslangic: this.inquireRequest.startDate
          .replace("-", "")
          .replace("-", ""),
        bitis: this.inquireRequest.endDate.replace("-", "").replace("-", ""),

        SorguDurumu: 0,
      };
 
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
    clickposta() {
      console.log(this.selectredrow);
      let newarr = "";
      let mail = "";
      let mailBilgi = JSON.parse(localStorage.getItem("userData")).email;
      this.selectredrow.forEach((a) => {
        a.iletisim.forEach((il) => {
          console.log(
            `Son ödeme tarihi ${a.Vadesi} olan ${a.beyannameKodu} ödemeniz ${a.Toplam}Tl dir.`
          );
          let msgBaslik=  il.HitapŞekli + "," + " "+
            "Son ödeme tarihi " +
            " "+
            a.Vadesi + " " + "olan" +
            " "+
             a.beyannameTuru + " "+ "ödemeniz"+
            // iletim.unvan +
           
            " " + 
            a.Toplam + " "+ "TL dir."
            " " ;
 
          console.log(il.Mail);
           let mailMuk= il.Mail;
          // let fileURl = `${
          //   "https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/" +
          //   a.tckn +
          //   "%2FBEYANNAME" +
          //   "%2F" +
          //   a.beyannameOid +
          //   ".pdf?alt=media"
          // }`;
          let fileURlb = `${
            "https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/" +
            a.tckn +
            "%2FTAHAKKUK" +
            "%2F" +
            a.tahakkukOid +
            ".pdf?alt=media"
          }`;
           let userID=JSON.parse(localStorage.getItem("userData")).userId;
          const data={
        KullaniciUid:userID,
        SorguDurumu:0,
        GidecekMail:mailMuk,
        MesajIcerik:msgBaslik,
        //Beyanname:this.fetchBeyanname("/Beyanname/"+beyanid),
        // user: db.doc('users/pb7La4kzEaBow4iWvmxZ')
         Tablo:"Beyanname/"+a.beyannameOid,
          MesajBaslik:"Beyaname Tahakkuk Fişi",
          Mail:{
            host: this.getKullaniciAyar.mail.mailHost,
            port: this.getKullaniciAyar.mail.mailPort,
            secure:true,
            requireTLS:true,
            auth:{
            user: this.getKullaniciAyar.mail.mailUser,
            pass: this.getKullaniciAyar.mail.mailPass,
            }
            },
        attachments:[
    // {
    //    "dosya":"Beyanname",
    //    "url":msgUrl
    // },
    { 
       filename:"Tahakkuk.pdf",
       path:fileURlb
       
    }]  
}; 
this.AddNewsMailSorgu(data);
          // console.log(fileURl);
          // request(fileURl, { encoding: null }, (err, res, body) => {
          //   const textBuffered = Buffer.from(body);
          //   console.log(textBuffered);
          //   newarr = textBuffered;
          // });
          // request(fileURlb, { encoding: null }, (err, res, body) => {
          //   const textBuffered = Buffer.from(body);
          //   console.log(textBuffered);
          //   mail = textBuffered;
          // });
          // boş dönüyor
        
          // setTimeout(() => {
          //   console.log(newarr, mail);
          //   axios
          //     .post(
          //       "https://api.sendgrid.com/v3/mail/send",
          //       {
          //         personalizations: [{ to: [{ email: `${il.Mail}` }] }],
          //         from: { email: mailBilgi },
          //         subject: "Emüşavirim E-Beyanname Bilgilendirme E-postasi",
          //         content: [
          //           {
          //             type: "text/html",
          //             value: `"<h5>Sayın ${a.unvan}</h5> <br> <p>Son ödeme tarihi ${a.donem} olan ${a.beyannameKodu} ödenmeniz ${a.Toplam}Tl dir.</p>"`,
          //           },
          //         ],
          //         attachments: [
          //           {
          //             content: newarr.toString("base64"),
          //             filename: "attachment.pdf",
          //             type: "application/pdf",
          //           },
          //           {
          //             content: mail.toString("base64"),
          //             filename: "attachment.pdf",
          //             type: "application/pdf",
          //           },
          //         ],
          //       },
          //       {
          //         headers: {
          //           Authorization:
          //             "Bearer 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",
          //           "Content-Type": "application/json",
          //         },
          //       }
          //     )
          //     .then((res) => {
          //       console.log(res);
          //     });
          // }, 1000);
        });
      });
      // console.log(newarr);
      // this.AddNewsEpostaSorgu({ data: newarr });
    },
     sendSms(){
    
    this.selectredrow.forEach((a)=>{
      a.iletisim.forEach((il)=>{    
      let msgBaslik=  il.HitapŞekli + "," + " "+
            "Son odeme tarihi " +
            " "+
            a.Vadesi + " " + "olan" +
            " "+
             a.beyannameTuru + " "+ "odemeniz"+
            " " + 
            a.Toplam + " "+ "TL dir."
            " " ;   
       let fileURlb = `${
            "https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/" +
            a.tckn +
            "%2FTAHAKKUK" +
            "%2F" +
            a.tahakkukOid +
            ".pdf?alt=media"
          }`;           
            setTimeout(() => {         
            axios
            .post(
              "http://panel.1sms.com.tr:8080/api/smspost/v1",               
                `<sms>
    <username>${this.getKullaniciAyar.sms.smsUser}</username>
    <password>${this.getKullaniciAyar.sms.smsPass}</password>
    <header>${this.getKullaniciAyar.sms.smsOriginator}</header>
    <validity>2880</validity>
    <sendDateTime>2022.1.23.9.30.0</sendDateTime>
    <message>
        <gsm>
            <no>90${il.Telefon}</no>    
        </gsm>
        <msg><![CDATA[${msgBaslik}]]></msg>
    </message>
</sms>
`).then((res)=>{
              console.log(res);
            })
           }, 1000);
 var currentData=new Date();
            var date=currentData.getDate();
           const data={
            beyanOid: a.beyannameOid,
            smsDurum:{
              durum:Number(1),
              tarih:date,
            }
           };
           this.updateBeyanname(data);
      })
    })
    },
    listClick() {
      this.$refs.listPopup.show();
    },

    listRunClick() {
      let now = new Date(this.listRequest.startDate);
      let time2 = new Date(this.listRequest.endDate);
            console.log("BAŞLANGIÇ",this.listRequest.startDate);
      console.log("BİTİŞ",this.listRequest.endDate);
      const fil = this.beyannameData.filter((el) => {
        const time = new Date(
          el.donem.slice(0, 10).split(".").reverse().join("/")
        );
        console.log("TARİH DONEM", el.donem);
        //console.log(Object.values(this.listRequest));
        if (
          this.listRequest.title.length > 0 ||
          this.listRequest.type.length > 0
        ) {
         // console.log("1.if");
          return (
            this.listRequest.title.includes(el.unvan) &&
            // this.listRequest.type.includes(el.beyannameKodu) &&
            now.getTime() >= time <= time2.getTime()
          );
        } else if (this.listRequest.type.length > 0) {
        //  console.log("2.if");
          return;
        } else {
         // console.log("else");
          return el;
        }
      });
      this.items = fil;
      
    },
    /////////////////////////////////
    fetch() {
      let beyan = [];
      const data = {
        kullaniciuid: JSON.parse(localStorage.getItem("userData")).userId,
        limitSize: Number(10),
        
      };
          
      this.fetchBeyanname(data).then((el) => {
        let ar = [];
        let unvanlaar = [];
        let beyantype = []; 
          this.beyannameData.forEach((eld) => {
            ar.push(eld.vergiDairesi);
            beyantype.push(eld.beyannameKodu);
            beyan = el;
          });
          this.mukelefData.forEach((esl) => {
            unvanlaar.push(esl.unvan);
          });        

        setTimeout(() => {
          // console.log(ar);
          this.turler = [...new Set(beyantype)];
          this.unvanlar = [...new Set(unvanlaar)];
          this.fetchvergiDairesi(ar).then((res) => {
            setTimeout(() => {}, 900);

            this.items = beyan.map((a) =>
              Object.assign(a, {
                vergiDairesi: this.getVDairesi.find(
                  (b) => b.VergiDaireKod == a.vergiDairesi
                ).VergiDaire,
              })
            );
             //console.log(this.items);
          });
        }, 2500);
      });
         const dataf = {
        kullaniciuid: JSON.parse(localStorage.getItem("userData")).userId,
      };
       this.fetchBeyannameFilter(dataf).then((el) => {
       
        //  console.log(this.beyannameData);
          this.beyannameData.forEach((eld) => {
            ar.push(eld.vergiDairesi);
            beyantype.push(eld.beyannameKodu);

            beyan = el;
          });
          this.mukelefData.forEach((esl) => {
            unvanlaar.push(esl.unvan);
          });
        //}, 300);

        setTimeout(() => {
         // console.log(ar);
          this.turler = [...new Set(beyantype)];
          this.unvanlar = [...new Set(unvanlaar)];
          // this.fetchvergiDairesi(ar).then((res) => {
          //   setTimeout(() => {}, 900);

          //   this.filterItems = beyan.map((a) =>
          //     Object.assign(a, {
          //       vergiDairesi: this.getVDairesi.find(
          //         (b) => b.VergiDaireKod == a.vergiDairesi
          //       ).VergiDaire,
          //     })
          //   );
          //   console.log(this.items);
          // });
        }, 2500);
      });
      this.fetchKullaniciAyarlar(
        JSON.parse(localStorage.getItem("userData")).userId ).then(()=>{

//console.log(this.getKullaniciAyar);
      });
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style>
.dx-datagrid-text-content {
  font-weight: bold;
  color: black;
}
.main-menu.menu-light .navigation .navigation-header span {
    font-weight: 500;
   font-weight: bold;
    color: red;
}

.main-menu.menu-light .navigation li a > * {
    transition: transform 0.25s ease;
      font-weight: bold;
    color: black;
     
}
  .vertical-layout.vertical-menu-modern .main-menu .navigation > li > a svg, [dir=ltr] .vertical-layout.vertical-menu-modern .main-menu .navigation > li > a i{
    color:darkblue;
  }

  .dx-header {  
    color: blue!important;  
}

</style>


 