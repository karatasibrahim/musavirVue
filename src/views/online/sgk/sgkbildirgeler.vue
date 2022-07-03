<template>
  <div>
    <app-table
      :showPdfPopupClick="showPdfPopup"
      :deleteInsuranceClick="deleteInsuranceClick"
      :inquireClick="queryClick"
      :downloadClick="downloadClick"
      :listClick="listClick"
      :printClick="printClick"
      :pk="id"
      :clickposta="clickposta"
      @onSelectionChanged="gelendata"
      :sendClick="sendClick"
      :items="getSgkBildirgeData"
      :totalRows="16"
      :title="'Sgk Bildirge Listesi'"
      :columns="columns"
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

    <!-- Pdf Görüntüle Popup -->
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

    <!-- Listele Popup -->
    <!-- <b-modal
      ref="listPopup"
      title="Listele"
      no-close-on-backdrop
      ok-title="Listele"
      cancel-title="Kapat"
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
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-form-group
            style="
              margin-bottom: 0rem !important;
              margin-top: 0.5rem !important;
            "
            label="İlk Dönem"
            label-for="h-type"
            label-cols-md="4"
          ></b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-form-select
            v-model="listRequest.startDate.month"
            :options="months"
            placeholder="Ay Seçiniz"
          />
        </b-col>
        <b-col cols="6">
          <b-form-select
            v-model="listRequest.startDate.year"
            :options="years"
            placeholder="Yıl Seçiniz"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-form-group
            style="
              margin-bottom: 0rem !important;
              margin-top: 0.5rem !important;
            "
            label="Son Dönem"
            label-for="h-type"
            label-cols-md="4"
          ></b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <v-select
            v-model="listRequest.endDate.month"
            :options="months"
            placeholder="Ay Seçiniz"
          />
        </b-col>
        <b-col cols="6">
          <v-select
            v-model="listRequest.endDate.year"
            :options="years"
            placeholder="Yıl Seçiniz"
          />
        </b-col>
      </b-row>
      <br />
      <b-form-checkbox-group
        id="checkbox-group-2"
        v-model="listRequest.selected"
        name="flavour-2"
        class="demo-inline-spacing"
      >
        <b-row>
          <b-col cols="4">
            <b-form-checkbox value="Asıl">Asıl</b-form-checkbox>
          </b-col>
          <b-col cols="4">
            <b-form-checkbox value="Ek">Ek</b-form-checkbox>
          </b-col>
          <b-col cols="4">
            <b-form-checkbox value="İptal">İptal</b-form-checkbox>
          </b-col>
        </b-row>
      </b-form-checkbox-group>
      {{ listRequest.selected }}
    </b-modal> -->
  </div>
</template>

<script>
import AppTable from "@core/components/app-table/AppTable.vue";
import {
  BRow,
  BCol,
  BFormGroup,
  BFormDatepicker,
  BFormCheckbox,
  BFormCheckboxGroup,
  BFormSelect,
} from "bootstrap-vue";
import lng from "../../utils/strings";
import mockData from "../../../services/online/finance/service";
import vSelect from "vue-select";
import { mapActions, mapGetters } from "vuex";

import axios from "axios";
import request from "request";
import objectAssign from "object-assign";
export default {
  components: {
    AppTable,
    BRow,
    BFormCheckbox,
    vSelect,
    BCol,
    BFormGroup,
    BFormDatepicker,
    BFormCheckboxGroup,
    BFormSelect,
  },

  data() {
    return {
      selectredrow: [],
      id: "",
      //#region Sorgulama Popup
      dateTimeLanguage: lng.dateTimeLanguage,
      inquireRequest: {
        title: null,
        startDate: {
          month: "",
          year: "",
        },
        endDate: {
          month: "",
          year: "",
        },
      },
      //#endregion
      listRequest: {
        title: [],
        startDate: {
          month: "",
          year: "",
        },
        endDate: {
          month: "",
          year: "",
        },
        selected: [],
      },
      activePdfUrl:
        "https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/AL%C4%B0%20%C3%9CZ%C3%9CMC%C3%9C%2F1ukxyryp3t1xhp.pdf?alt=media",
      months: [
        { value: "", text: "" },
        { value: "01", text: "Ocak" },
        { value: "02", text: "Şubat" },
        { value: "03", text: "Mart" },
        { value: "04", text: "Nisan" },
        { value: "05", text: "Mayıs" },
        { value: "06", text: "Haziran" },
        { value: "07", text: "Temmuz" },
        { value: "08", text: "Ağustos" },
        { value: "09", text: "Eylül" },
        { value: "10", text: "Ekim" },
        { value: "11", text: "Kasım" },
        { value: "12", text: "Aralık" },
      ],
      years: ["", "2018", "2019", "2020", "2021", "2022"],
      items: [],
      unvanlar: [],
      turler: mockData.turler,
      columns: [
        {
          dataField: "",
          caption: "id",
          visible: false,
          showInColumnChooser: false,
        },

        {
          dataField: "Gonderim",
          caption: "Gönderim Durumu",
          width: "90",
        },
        {
          dataField: "unvan",
          caption: "Ünvan",
        },
        // {
        //   dataField: "SubeAdi",
        //   caption: "Şube",
        // },
        {
          dataField: "donem",
          caption: "Dönem",
          width: "130",
        },
        {
          dataField: "sicilNo",
          caption: "Sicil No",
          width: "230",
        },
        // {
        //   dataField: "BelgeCesidi",
        //   caption: "Belge Çeşidi",
        // },
        {
          dataField: "payload.data.thkhaberlesme2.aciklama",
          caption: "Kanun",
        },
        // {
        //   dataField: "Durum",
        //   caption: "Durum",
        // },
        // {
        //   dataField: "Vade",
        //   dataType: "date",
        //   caption: "Vade",
        // },
        {
          dataField: "Toplam",
          caption: "Tutar",
          alignment: "right",
          width: "100",
        },
        {
          dataField: "Goster",
          caption: "Tahahkuk Fişi & Hizmet",
          cellTemplate: "sgkGosterimColumnTemplate",
          width: "100",
        },
      ],
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
    ...mapGetters(["reSgkBildirge", "reSgkFirmalar","reKullaniciAyarlar", "reMukellef", "rePerson"]),
    getFirmadata() {
      return this.reSgkFirmalar;
    },
    getSgkBildirgeData() {
      return this.reSgkBildirge;
    },
    getMukellefdata() {
      return this.reMukellef;
    },
    getPerson() {
      return this.rePerson.kullaniciUid;
    },
    getUserUid() {
      return this.rePerson.kullaniciUid;
    },
    getKullaniciAyar()
    {
      return this.reKullaniciAyarlar;
    }
  },

  methods: {
    //#region Ust Bar Butonları

    queryClick() {
      this.$refs.queryPopup.show();
    },
    gelendata(value) {
      console.log(value);
      this.selectredrow = value;
    },
    ...mapActions([
      "AddNewsBildirgeSorgu",
      "AddNewsWhatsappSorgu",
      "AddNewsMailSorgu",
      "fetchKullaniciAyarlar",
    ]),
    inquireClick() {
      const data = {
        KullaniciUid: this.getUserUid,
        baslangic: this.inquireRequest.startDate
          .toString()
          .replace("-", "")
          .replace("-", ""),
        bitis: this.inquireRequest.endDate.replace("-", "").replace("-", ""),
        SorguDurumu: 0,
      };
      this.AddNewsBildirgeSorgu(data);
    },
    downloadClick(e) {},
    printClick(e) {},
    sendClick(e) {
      var arr = [];
      
      e.forEach((element) => {
        let data = this.getMukellefdata.find((el) => {
          return element.tckn == el.tckn;
        });
        console.log(data, element);
        arr.push(Object.assign(element, data));

        console.log(arr);
      });





      arr.forEach((iletim) => {
        iletim.iletisim.forEach((tel) => {
          //   let phone = tel.Telefon;
          let msgBaslik =
            tel.HitapŞekli +
            "," +
            " " +
            "Son ödeme tarihi " +
            " " +
            iletim.donem +
            " " +
            "olan" +
            " " +
            iletim.beyannameTuru +
            " " +
            "ödemeniz" +
            // iletim.unvan +

            " " +
            iletim.Toplam +
            " " +
            "TL dir.";
          (" ");

          // let msgUrl=   `${
          //   "https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/" +
          //   iletim.tckn +
          //   "%2FBEYANNAME%2F" +
          //   iletim.beyannameOid +
          //   ".pdf?alt=media"
          // }`;

          let beyanid = iletim.beyannameOid;
          let tahid=iletim.thkoid;
          let msgTah = `${
            "https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/" +
            iletim.tckn +
            "%2FSGK" +
            "%2F" +
            iletim.thkoid +
            ".pdf?alt=media"
          }`;
          //let beyan=['Beyanname',msgUrl]
          let phone = tel.Telefon;

          const data = {
            KullaniciUid: this.getUserUid,
            SorguDurumu: 0,
            TelefonNo: [phone],
            MesajIcerik: msgBaslik,
            //Beyanname:this.fetchBeyanname("/Beyanname/"+beyanid),
            // user: db.doc('users/pb7La4kzEaBow4iWvmxZ')
            Tablo: "Bildirgeler/" + tahid,
            Dosyalar: [
              // {
              //    "dosya":"Beyanname",
              //    "url":msgUrl
              // },
              {
                dosya: "Tahakkuk",
                url: msgTah,
              },
            ],
          };
          this.AddNewsWhatsappSorgu(data);
        });
      });
    },
    listClick() {
      this.$refs.listPopup.show();
    },
    listRunClick() {
      this.items = [];
      console.log(this.listRequest.startDate);
      const datanDonem =
        this.listRequest.startDate.month +
        " " +
        "/" +
        " " +
        this.listRequest.startDate.year;
      console.log(datanDonem);
      const filters = this.getSgkBildirgeData.filter((el) => {
        if (this.listRequest.title.length > 0) {
          console.log("1.if");
          return this.listRequest.title.includes(el.Unvan);
        }
        if (this.listRequest.selected.length > 0) {
          console.log("2.if");
          return this.listRequest.selected.includes(el.Durum);
        }
        if (
          this.listRequest.startDate.month != "" &&
          this.listRequest.startDate.year != ""
        ) {
          console.log("3.if");
          console.log(el.Donem == datanDonem, el.Donem, datanDonem);
          return el.Donem.match(datanDonem);
        } else {
          console.log("else");
          return el;
        }
      });

      console.log(filters);
      this.items = filters;
    },
    //#endregion

    //#region Boş Function
    emptyClick() {},
    //#endregion
    clickposta() {
      console.log(this.selectredrow);
      let beyan = "";
      let hizmet = "";
      let mailBilgi = JSON.parse(localStorage.getItem("userData")).email;
      var arr=[];
//           arr.forEach((ayar) => {
//         ayar.mail.forEach((tel) => {
//  let mail=ayar.mail;
//  console.log(mail);

//         }
//         )});

  
      this.selectredrow.forEach((a) => {
        a.iletisim.forEach((il) => {
          
          // console.log(
          //   `Son ödeme tarihi ${a.donem} olan ${a.beyannameKodu} ödenmeniz ${a.Toplam}Tl dir.`
          // );
        
        
          let msgBaslik =
            a.donem +
            " " +
            "Son ödeme tarihli" +
            " " +
            a.beyannameTuru +
            " " +
            "ödemeniz" +
            // iletim.unvan +

            " " +
            a.Toplam +
            " " +
            "TL dir.";

          " " +
            a.beyannameTuru +
            " " +
            "ödemeniz" +
            // iletim.unvan +

            " " +
            a.Toplam +
            " " +
            "TL dir." +
            "";
          let mailMuk = il.Mail;
          console.log(il.Mail);
          console.log(msgBaslik);
          // let fileURlbeyan = `${
          //   "https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/" +
          //   a.tckn +
          //   "%2FSGK" +
          //   "%2F" +
          //   a.bynthkoid +
          //   ".pdf?alt=media"
          // }`;
          let fileURlhizmet = `${
            "https://firebasestorage.googleapis.com/v0/b/emusavirim-3c193.appspot.com/o/" +
            a.tckn +
            "%2FSGK" +
            "%2F" +
            a.thkoid +
            ".pdf?alt=media"
          }`;

          const data = {
            KullaniciUid: this.getUserUid,
            SorguDurumu: 0,
            GidecekMail: mailMuk,
            MesajIcerik: msgBaslik,
            //Beyanname:this.fetchBeyanname("/Beyanname/"+beyanid),
            // user: db.doc('users/pb7La4kzEaBow4iWvmxZ')
            //  Tablo:"Bildirgeler/"+a.beyannameOid,
            Tablo:"Bildirgeler/"+ a.thkoid,
            MesajBaslik:"Sgk Tahakkuk Fişi",
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
            attachments: [
              // {
              //    "dosya":"Beyanname",
              //    "url":msgUrl
              // },
              {
                filename: "Tahakkuk.pdf",
                path: fileURlhizmet,
              },
            ],
          };

          this.AddNewsMailSorgu(data);
          // request(fileURlbeyan, { encoding: null }, (err, res, body) => {
          //   const textBuffered = Buffer.from(body);
          //   console.log(textBuffered);
          //   beyan = textBuffered;
          // });
          // request(fileURlhizmet, { encoding: null }, (err, res, body) => {
          //   const textBuffered = Buffer.from(body);
          //   console.log(textBuffered);
          //   hizmet = textBuffered;
          // });

          // setTimeout(()=>{
          //   console.log(fileURlhizmet,fileURlbeyan);

          //  axios.post("https://api.sendgrid.com/v3/mail/send",
          //               {
          //                 personalizations: [{ to: [{ email: `${il.Mail}` }] }],
          //                 from:  { email: mailBilgi }  ,
          //                 subject: "Emüşavirim E-Bildirge Bilgilendirme E-postasi",
          //                 content: [
          //                   {
          //                     type: "text/html",
          //                     value: `"<h5>Sayın ${a.unvan}</h5> <br> <p>Son ödeme tarihi ${a.donem} olan ${a.beyannameKodu} ödenmeniz ${a.Toplam}Tl dir.</p>"`,
          //                   },
          //                 ],
          //                 attachments: [
          //                   {
          //                     content: beyan.toString("base64"),
          //                     filename: "attachment.pdf",
          //                     type: "application/pdf",
          //                   },
          //                   {
          //                     content: hizmet.toString("base64"),
          //                     filename: "attachment.pdf",
          //                     type: "application/pdf",
          //                   },
          //                 ],
          //               },
          //               {
          //                 headers: {
          //                   Authorization:
          //                     "Bearer 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",
          //                   "Content-Type": "application/json",
          //                 },
          //               }
          //             )
          //             .then((res) => {
          //               console.log(res);
          //             });
          // },
          // 1000);
        });
      });
      // console.log(newarr);
      // this.AddNewsEpostaSorgu({ data: newarr });
    },
    //#region SAYFA ICIN
    deleteInsuranceClick() {},
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
    //#endregion
    ...mapActions(["fetchSgkBildirge","fetchKullaniciAyarlar"]),
    fetchVergi() {
      this.fetchSgkBildirge(
        JSON.parse(localStorage.getItem("userData")).userId
      ).then(() => {
        setTimeout(() => {
          console.log(this.getSgkBildirgeData);
          let ex = this.getSgkBildirgeData.map((a) =>
            Object.assign(a, {
              iletisim: this.getMukellefdata.find((b) => b.tckn == a.tckn)
                .iletisim,
            })
          );
          console.log(ex);
        }, 1000);
      });


      this.fetchKullaniciAyarlar(
        JSON.parse(localStorage.getItem("userData")).userId ).then(()=>{

console.log(this.getKullaniciAyar);
      });
      // let kAyar=this.getSgkBildirgeData.map((a)=>
      // Object.assign(a,{ayar:this.getPerson.find((b)=>b.KullaniciUid==a.KullaniciUid).kAyar}))
 
    
    },
  },
  mounted() {
    this.fetchVergi();
  },
};
</script>

<style></style>
