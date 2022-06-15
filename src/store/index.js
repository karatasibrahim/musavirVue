import Vue from "vue";
import Vuex from "vuex";

// Modules
import app from "./app";
import appConfig from "./app-config";
import verticalMenu from "./vertical-menu";

import { 
  collection,
  getDocs,
  getDoc,
  limit,
  query,
  where,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
  addDoc,
  orderBy,
  startAt,
  limitToLast,
  endBefore,
  endAt,
  startAfter
} from "firebase/firestore";
var firebase = require("firebase/app")
import {
  getFirestore
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDn3x_-3uQT3e_u4EFIMqXKy40iKgvUf8c",
  authDomain: "emusavirim-3c193.firebaseapp.com",
  databaseURL: "https://emusavirim-3c193-default-rtdb.firebaseio.com",
  projectId: "emusavirim-3c193",
  storageBucket: "emusavirim-3c193.appspot.com",
  messagingSenderId: "112360446427",
  appId: "1:112360446427:web:af06b497a6a34ed47aaffe",
};

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
const db = getFirestore(firebase.initializeApp(firebaseConfig));
let documentıd = ""
//let kId=  JSON.parse(localStorage.getItem("userData")).userId

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu
  },
  state: {
    person: "",
    mukellef: [],
    beyanname: [],
    posSorgu: [],
    GelenFatura: [],
    GidenFatura: [],
    GibTebligat: [],
    GibTebligatEk: [],
    TibTebligat: [],
    TibTebligatEk: [],
    VergiTebligat: [],
    SgkBildirge: [],
    SgkFirmalar: [],
    TicaretSicilGazetesi: [],
    KalanBeyanname: [],
    BeyanTakipProperties: [],
    Faaliyet: {},
    il: [],
    ilce: [],
    Sifre: {},
    calisan: [],
    sgkVizite: [],
    notification: []

  },
  getters: {
    rePerson(state) {
      return state.person
    },
    reMukellef(state) {
      return state.mukellef
    },
    reBeyanname(state) {
      let arr = []

      state.beyanname.forEach(el => {
        arr.push(el)
      })
      return arr
    },
    rePosSorgu(state) {
      return state.posSorgu
    },
    reGelenArsiv(state) {
      return state.GelenFatura
    },
    reGidenArsiv(state) {
      return state.GidenFatura
    },
    reGibTeblig(state) {
      return state.GibTebligat
    },
    reGibTebligEk(state) {
      return state.GibTebligatEk
    },
    reTibTEbligat(state) {
      return state.TibTebligat
    },
    reTibTebligatEk(state) {
      return state.TibTebligatEk
    },
    reVergiTebligat(state) {
      return state.VergiTebligat
    },
    reSgkBildirge(state) {
      return state.SgkBildirge
    },
    reSgkFirmalar(state) {
      return state.SgkFirmalar
    },
    reTicaretSicilGazetesi(state) {
      return state.TicaretSicilGazetesi
    },
    reBeyanTakipProperties(state) {
      return state.BeyanTakipProperties
    },
    reKalanBeyanname(state) {
      return state.KalanBeyanname
    },
    reFaaliyet(state) {
      return state.Faaliyet
    },
    reil(state) {
      return state.il
    },
    reilce(state) {
      return state.ilce
    },
    resifre(state) {
      return state.Sifre
    },
    reCalisan(state) {
      return state.calisan
    },
    reSgkVizite(state) {
      return state.sgkVizite
    },
    renotification(state) {
      return state.notification
    }
  },
  mutations: {
    setperson(state, payload) {
      return state.person = payload
    },
    setMukkellef(state, payload) {
      return state.mukellef.push(payload)
    },
    setBeyanname(state, payload) {
      return state.beyanname = payload
    },
    setPosSorgu(state, payload) {

      payload.forEach(el => {
        console.log(el.data());
        return state.posSorgu.push(el.data())
      })
    },
    setGelenFatura(state, payload) {

      payload.forEach(el => {
        console.log(el.data());
        return state.GelenFatura.push(el.data())
      })
    },
    setGidenFatura(state, payload) {
      payload.forEach(el => {
        console.log(el);
        return state.GidenFatura.push(el.data())
      })
    },
    setGibTebligat(state, payload) {
      payload.forEach(el => {
        return state.GibTebligat.push(el.data())
      })
    },
    setGibTebligatEk(state, payload) {
      state.GibTebligatEk = []
      payload.forEach(el => {
        console.log(el.data());
        return state.GibTebligatEk.push(el.data())
      })
    },
    setTibTebligat(state, payload) {
      console.log("MUTATİON", payload);
      payload.forEach(el => {
        return state.TibTebligat.push(el.data())
      })
    },
    setTibTebligatEk(state, payload) {
      payload.forEach(el => {
        return state.TibTebligatEk.push(el.data())
      })
    },
    setVergiTebligat(state, payload) {
      console.log("MUTATİON", payload);
      payload.forEach(el => {
        return state.VergiTebligat.push(el.data())
      })
    },
    setSgkBildirge(state, payload) {
      payload.forEach(el => {
        return state.SgkBildirge.push(el.data())
      })
    },
    setSgkFirma(state, payload) {
      console.log(payload);
      payload.forEach(el => {
        return state.SgkFirmalar.push(el.data())
      })
    },
    SetSgkBildirge(state, payload) {
      payload.forEach(el => {
        return state.SgkBildirge.push(el.data())
      })
    },
    SetTicaretSicilGazetesi(state, payload) {
      payload.forEach(el => {
        return state.SgkBildirge.push(el.data())
      })
    },
    SetBeyanTakipProperties(state, payload) {
      payload.forEach(el => {
        return state.BeyanTakipProperties.push(el.data())
      })
    },
    SetKalanBeyanname(state, payload) {
      payload.forEach(el => {
        return state.KalanBeyanname.push(el.data())
      })
    },
    SetFaaliyet(state, payload) {
      payload.forEach(el => {
        return state.Faaliyet = el.data()
      })
    },
    Setilçeler(state, payload) {
      payload.forEach(el => {
        return state.ilce.push(el.data())
      })
    },
    setİl(state, payload) {
      state.il.push(payload)
    },
    SetSifreler(state, payload) {
      console.log(payload);
      payload.forEach(el => {
        state.Sifre = el.data()
      })
    },
    setCalisan(state, payload) {
      payload.forEach(el => {
        state.calisan.push(el.data())
      })
    },
    SetSgkVizite(state, payload) {
      payload.forEach(el => {
        console.log(el.data());
        state.sgkVizite.push(el.data())
      })
    },
    setMesaj(state, payload) {
      console.log(payload);
      state.notification.push(payload)
    }
  },
  actions: {
    async fetch(context) {
      //LocalStorage'den email çektik
      const getEmail = JSON.parse(localStorage.getItem("userData"));
      const q = query(
        collection(db, "Kullanici"),
        where("Mail", "==", getEmail.email)
      );
      //Firebase kullanici kolaksiyonundaki verileri çektik burda if ile localstoge'deki veriyi sınadık
      const userdata = await getDocs(q)
      console.log(userdata.parent);

      userdata.forEach((doc) => {
        console.log("kullanıcı", doc.id);
        documentıd = doc.id;
        context.commit("setperson", doc.data())
        console.log(doc.data());
        console.log(documentıd);

      });
      return userdata
    },


    async fetchMukellef(context, payload) {
      console.log(payload);
      this.state.mukellef = []
      const q = query(collection(db, "Mukellef"),
        where("musavirUid", "==", payload));
      const mukellefdata = await getDocs(q);
      mukellefdata.forEach((doc) => {
        context.commit("setMukkellef", Object.assign(doc.data(), {
          id: doc.id
        }))

      });

      return mukellefdata
    },
    fetchOneWatch(context, payload) {
      let arr=[]
      return new Promise((resolve,reject)=>{
      console.log(payload);
      this.state.mukellef = []
      const q = query(collection(db, "GelenFaturalar"),
      where("musavirUid", "==", payload.uid),
        where("FaturaNo", "==", payload.no));
      const mukellefdata =  getDocs(q);
      mukellefdata.then(res=>{
        
        res.forEach(el=>{
arr.push(el.data())
        })
        resolve(arr)
      })
    })
      },
    async addMükellefid(context, payload) {
      let id = Math.floor((Math.random() * 1000) + 900)
      do {
        const docRef = doc(db, "Mukellef", id.toString());
        var docSnap = await getDoc(docRef);
        payload = Math.floor((Math.random() * 1000) + 900)
      } while (docSnap.exists());
      return id
    },
    async fetchBeyanname(context, payload) { 
       console.log("-------------------------BURADA");
console.log(payload);
let ar=[]
      context.dispatch("actionArr", {
        dbName: "Beyanname",
        İtemName: "Kullanici",
        payload: payload.kullaniciuid,
        limit:payload.limitSize,
        MutName: "setBeyanname"
      }).then(el=>{
        console.log(el);
        el.forEach(e=>{
          console.log(e);
          ar.push(e.data())
        })

      })
return ar
    },

    async fetchPosSorgu(context, payload) {
      console.log(payload);
      this.state.posSorgu = []

      context.dispatch("actionArr", {
        dbName: "MukellefPosSatis",
        İtemName: "KullaniciUid",
        payload: payload,
        MutName: "setPosSorgu"
      })

    },


     fecthGelenEarsivFat(context, payload) {
      this.state.GelenFatura = []
      context.dispatch("actionArr", {
        dbName: "GelenFaturalar",
        İtemName: "KullaniciUid",
        payload: payload,
        MutName: "setGelenFatura"
      })
    },


    async fetchGidenEarsiv(context, payload) {
      this.state.GidenFatura = []

      console.log(payload);
      context.dispatch("actionArr", {
        dbName: "GidenFaturalar",
        İtemName: "musavirUid",
        payload: payload,
        MutName: "setGidenFatura"
      })

    },

    async fecthGibTebligat(context, payload) {
      this.state.GibTebligat = []

      console.log(payload);

      context.dispatch("actionArr", {
        dbName: "GibTebligat",
        İtemName: "MukellefID",
        payload: payload,
        MutName: "setGibTebligat"
      })
    },
    async gibtebligatEk(context, payload) {
      this.state.GibTebligatEk = []

      console.log(payload);
      context.dispatch("actionArr", {
        dbName: "GibTebligatEk",
        İtemName: "TebligatId",
        payload: payload,
        MutName: "setGibTebligatEk"
      })

    },

    async fecthTibTebligat(context, payload) {
      this.state.TibTebligat = []

      console.log(payload);
      context.dispatch("actionArr", {
        dbName: "TicaretTebligat",
        İtemName: "MukellefID",
        payload: payload,
        MutName: "setTibTebligat"
      })

    },
    async fetchTibTebligatEk(context, payload) {
      this.state.TibTebligatEk = []

      context.dispatch("actionArr", {
        dbName: "TicaretTebligatEk",
        İtemName: "TicaretTebtId",
        payload: payload,
        MutName: "setTibTebligatEk"
      })

    },

    async fetchVergiTebligat(context, payload) {
      this.state.VergiTebligat = []

      console.log(payload);
      context.dispatch("actionArr", {
        dbName: "VergiTebligat",
        İtemName: "MukellefID",
        payload: payload,
        MutName: "setVergiTebligat"
      })
    },

    async fetchSgkFirmaalar(context, payload) {
      this.state.SgkFirmalar = []

      console.log(payload);
      context.dispatch("actionArr", {
        dbName: "Firma",
        İtemName: "MukellefId",
        payload: payload,
        MutName: "setSgkFirma"
      })

    },
    async fetchSgkBildirge(context, payload) {
      this.state.SgkBildirge = []

      console.log(payload);
      context.dispatch("actionArr", {
        dbName: "Bildirgeler",
        İtemName: "SubeId",
        payload: payload,
        MutName: "SetSgkBildirge"
      })

    },
    async fetchTicaretSicilGazetesi(context, payload) {
      this.state.TicaretSicilGazetesi = []
      console.log(payload);
      context.dispatch("actionArr", {
        dbName: "TicaretSicilGazetesi",
        İtemName: "SubeID",
        payload: payload,
        MutName: "SetTicaretSicilGazetesi"
      })

    },


    async fetchKalanBeyanname(context, payload) {
      this.state.KalanBeyanname = []
      console.log(payload);
      context.dispatch("actionArr", {
        dbName: "KalanBeyanname",
        İtemName: "MukellefId",
        payload: payload,
        MutName: "SetKalanBeyanname"
      })

    },

    async fetchBeyanTakipProperties(context, payload) {
      this.state.BeyanTakipProperties = []
      console.log(payload);
      context.dispatch("actionArr", {
        dbName: "BeyanTakipProperties",
        İtemName: "TurPropId",
        payload: payload,
        MutName: "SetBeyanTakipProperties"
      })

    },

    async fetchFaaliyet(context, payload) {

      console.log(payload);

      const q = query(collection(db, "FaaliyetKodlari"), where("FaaliyetKodu", "==", payload), limit(1))
      const Gelendata = await getDocs(q);
      context.commit("SetFaaliyet", Gelendata)
    },
    async fetchİller(context) {
      if (this.state.il.length == 0) {
        const q = collection(db, "Sehirler")
        const Gelendata = await getDocs(q);
        Gelendata.forEach(el => {
          context.commit("setİl", el.data())
        })
      }


    },
    async fetchİlce(context, payload) {
      this.state.ilce = []

      context.dispatch("actionArr", {
        dbName: "Ilceler",
        İtemName: "SehirId",
        payload: payload,
        MutName: "Setilçeler"
      })

    },
    async fetchsifreler(context, payload) {
      console.log(payload);
      context.dispatch("actionArr", {
        dbName: "Sifreler",
        İtemName: "KullaniciId",
        payload: payload,
        MutName: "SetSifreler"
      })

    },

    async fetchCalisan(context, payload) {
      console.log(payload);
      this.state.calisan = []
      context.dispatch("actionArr", {
        dbName: "Calisan",
        İtemName: "SubeId",
        payload: payload,
        MutName: "setCalisan"
      })
    },
    async fetchSgkVizite(context, payload) {
      console.log(payload);
      this.state.sgkVizite.length > 0 ? console.log("data var") :
        context.dispatch("actionArr", {
          dbName: "Vizite",
          İtemName: "CalisanId",
          payload: payload,
          MutName: "SetSgkVizite"
        })
    },
    async actionArr(context, data) {
      return new Promise((resolve,reject)=>{
              console.log("çaliştim",data);
      let queries = query(collection(db, data.dbName),
      where(data.İtemName, "==", data.payload), limit(data.limit)
    )
    let datas =  getDocs(queries)
   datas.then(documentSnapshots=>{

    context.commit(data.MutName, documentSnapshots.docs);
    let arr=[]
    console.log("ifteyim");
    arr=documentSnapshots.docs
    resolve(arr)
   })

      })

    },

    async addkalanıd(context, payload) {
      let id = Math.floor((Math.random() * 1000) + 900)
      do {
        const docRef = doc(db, "KalanBeyanname", id.toString());
        var docSnap = await getDoc(docRef);
        payload = Math.floor((Math.random() * 1000) + 900)
      } while (docSnap.exists());

      return id
    },
    async fetchMesaj(context, payload) {
      console.log(payload);
      this.state.notification = []
      console.log("çaliştim");
      this.state.mesaj = []
      let q = query(
        collection(db, "MukellefBildirim"),
        where("KullaniciId", "==", payload),
      )
      const dat = await getDocs(q)
      dat.forEach(el => {
        console.log(el.data());
        context.commit('setMesaj', el.data())
      })
    },

    //!  UPTADE 
    async updateProfileDate(context, paylod) {
      console.log(paylod);
      const profile = doc(db, "Kullanici", documentıd)
      const gProfile = await updateDoc(profile, paylod);
    },

    async updatePersonData(context, payload) {

      console.log(documentıd);
      const q = doc(db, "Sifreler", payload.SifreId.toString())

      const Gelendata = await updateDoc(q, payload);
      console.log(Gelendata);
    },

    async uptadeSgkFirma(context, payload) {
      console.log(`${payload.SubeId}`);
      const q = doc(db, "Firma", `${payload.SubeId}`)

      const Gelendata = await updateDoc(q, {
        BirimMaliyet: payload.BirimMaliyet,
        Durum: payload.Durum,
        MetreKare: payload.MetreKare,
        MukellefId: payload.MukellefId,
        SicilNo: payload.SicilNo,
        SistemSifresi: payload.SistemSifresi,
        SubeAcilis: payload.SubeAcilis,
        SubeAdi: payload.SubeAdi,
        SubeId: payload.SubeId,
        SubeKapanis: payload.SubeKapanis,
        SubeKodu: payload.SubeKodu,
        SubeKullanicAdi: payload.SubeKullanicAdi,
        SubeKullaniciKodu: payload.SubeKullaniciKodu,
        SubeNot: payload.SubeNot,
        İsyeriSifresi: payload.İsyeriSifresi
      });
      console.log(Gelendata);
      context.commit('SetSgkBildirge', Gelendata)
    },
    async AddNewMükellef(context, payload) {
      console.log(payload);
      let data = JSON.parse(JSON.stringify(payload))
      const q = doc(db, "Mukellef", data.id)
      delete data.data.id
      const Gelendata = await updateDoc(q, data.data);
      console.log(Gelendata);
    },
    async uptadeSifre(context, payload) {
      console.log(documentıd);
      const q = doc(db, "Sifreler", payload.SifreId.toString())
      const Gelendata = await updateDoc(q, payload);
      console.log(Gelendata);
    },
    //! ADD DATA
    async AddNewSgkData(context, payload) {
      // await setDoc(doc(db, "Firma", payload.SubeId ), payload);
      console.log(payload.SubeId.toString());
      const res = await setDoc(doc(db, "Firma", payload.SubeId.toString()), payload)
      console.log(res);
    },
    async AddNewBeyanTakip(contex, payload) {
      console.log(payload.KalanId.toString());
      const res = await setDoc(doc(db, "KalanBeyanname", payload.KalanId.toString()), payload)
      console.log(res);
    },
    async AddNewsssMükellef(context, payload) {
      console.log(documentıd);
      const q = doc(db, "Mukellef", payload.MukellefId.toString())
      const Gelendata = await setDoc(q, payload);
      console.log(Gelendata);
    },
    async AddNewsBeyanSorgu(contex, payload) {
      //burada payload dediğimiz bizim diger taraftan gönderdiğimiz veriler emin olmak için burada konsola yazdıralım
      console.log(payload);
      //Adddoc da biz id vermeyiiz firebase kendisi oluşturur
      const a = collection(db, "BeyannameSorgu")
      const son = await addDoc(a, payload)
    },
    async AddPosSorgu(context, payload)
    {
      console.log(payload);
const veri=collection(db,"MukellefPosSorgu")
const veriSon=await addDoc(veri,payload)
    },
    async AddGelenFaturaSorgu(context, payload)
    {
      console.log(payload);
const veri=collection(db,"GelenFaturaSorgu")
const veriSon=await addDoc(veri,payload)
    },
    async AddGidenFaturaSorgu(context, payload)
    {
      console.log(payload);
const veri=collection(db,"GidenFaturaSorgu")
const veriSon=await addDoc(veri,payload)
    },
    async AddNewsBildirgeSorgu(context, payload) {
      console.log(payload);
      const a = collection(db, "BildirgeSorgu")
      const sonn = await addDoc(a, payload)
    },

    async AddNewsNotification(context, payload) {
      console.log(payload);

      const Gelendata = await addDoc(collection(db, "MukellefBildirim"), {
        Gonderilenler: payload.Gonderilenler,
        KullaniciId: payload.KullaniciId,
        Mesaj: payload.Mesaj,
        Tarih: payload.Tarih
      });
      context.commit('setMesaj', Gelendata)
      console.log(Gelendata);
      context.dispatch('fetchMesaj', payload.KullaniciId)
    },
    //! DELETE DATA
    async DeleteSgkData(context, payload) {
      console.log(payload);
      await deleteDoc(doc(db, "Firma", payload.toString()))

    }
  },
  strict: process.env.DEV,
});