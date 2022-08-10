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
  startAfter,
  connectFirestoreEmulator,
  Query
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
    kulanicilar:[],
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
    KullaniciAyarlar:{},
    BeyanTakipProperties: [],
    Faaliyet: {},
    il: [],
    ilce: [],
    Sifre: {},
    calisan: [],
    sgkVizite: [],
    notification: [],
    vergiDairesi: []
  },
  getters: {
    reVergiDaire(state) {
      return state.vergiDairesi
    },
    rePerson(state) {
      return state.person
    },
    reMukellef(state) {
      return state.mukellef
    },
    reKullanicilar(state){
      return state.kullanicilar
    },
     reKullaniciAyarlar(state){
      return state.KullaniciAyarlar
     },
    reBeyanname(state) {

      return state.beyanname
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
    setVD(state, payload) {
      return state.vergiDairesi.push(payload)
    },
    setperson(state, payload) {
      return state.person = payload
    },
    setMukkellef(state, payload) {
      return state.mukellef.push(payload)
    },
    setKullanicilar(state,payload){
      return state.kullanicilar.push(payload)
    },
    setKullaniciAyarlar(state,payload){

      return state.KullaniciAyarlar=payload
      
    },
    setBeyanname(state, payload) {
      return state.beyanname = payload
    },
    setPosSorgu(state, payload) {

      payload.forEach(el => {
         
        return state.posSorgu.push(el.data())
      })
    },
    setGelenFatura(state, payload) {

      payload.forEach(el => {
        
        return state.GelenFatura.push(el.data())
      })
    },
    setGidenFatura(state, payload) {
      payload.forEach(el => {
       
        return state.GidenFatura.push(el.data())
      })
    },
    setGibTebligat(state, payload) {
      
      payload.forEach(el => {
        return state.GibTebligat.push({...el.data(),id:el.id})
      })
    },
    setGibTebligatEk(state, payload) {
      state.GibTebligatEk = []
      payload.forEach(el => {
        
        return state.GibTebligatEk.push(el.data())
      })
    },
    setTibTebligat(state, payload) {
     
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
      
        state.sgkVizite.push(el.data())
      })
    },
    setMesaj(state, payload) {
    
      state.notification.push(payload)
    }
  },
  actions: { //////////////// AUTH VE KULLANİCİ TABLOSU İÇİN İNCELENECEK
    async fetch(context) {
      //LocalStorage'den email çektik
      const getEmail = JSON.parse(localStorage.getItem("userData"));
      const q = query(
        collection(db, "Kullanici"),
        where("Mail", "==", getEmail.email)
      );
      //Firebase kullanici kolaksiyonundaki verileri çektik burda if ile localstoge'deki veriyi sınadık
      const userdata = await getDocs(q)
      

      userdata.forEach((doc) => {
       
        documentıd = doc.id;
        context.commit("setperson", doc.data())
       

      });
      return userdata
    },
    async fetchMukellef(context, payload) {
     
      this.state.mukellef = []
    
    //let user= JSON.parse(localStorage.getItem("userData")).userId
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
    async fetchKullanicilar(context,payload)
    {
this.state.kullanicilar=[]
const q=query(collection(db,"Kullanici"));
const kullaniciData=await getDocs(q);
kullanidiData.forEach((doc)=>{
  context.commit("setKullanicilar", Object.assign(doc.data(),{id:doc.id}))
});
return kullaniciData
    },
    async fetchKullaniciAyarlar(context,payload){

      this.state.KullaniciAyarlar=[]
      const q=query(collection(db,"KullaniciAyarlar"),
      where("kullaniciUid","==",payload));
      const kullaniciAyar=await getDocs(q);
      kullaniciAyar.forEach((doc)=>{
       
        context.commit("setKullaniciAyarlar",Object.assign(doc.data(),{
          id:doc.id
        }))
      });
     
    },
    fetchOneWatch(context, payload) {
      let arr = []
      return new Promise((resolve, reject) => {
       
        this.state.mukellef = []
        const q = onSnapshot(doc(db, "GelenFaturalar"),
          where("KullaniciUid", "==", payload.uid),
          where("FaturaNo", "==", payload.no));
        const mukellefdata = getDocs(q);
        mukellefdata.then(res => {

          res.forEach(el => {
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
     
      let ar = []
     context.dispatch("actionArr", {
        dbName: "Beyanname",
        İtemName: "Kullanici", 
        payload: payload.kullaniciuid,
        limit: payload.limitSize,   
        order:{data:"donem"},
        MutName: "setBeyanname"
      }).then(el => {
        el.forEach(e => {
          
          ar.push(Object.assign(e.data(), {
            id: e.id
          }))
        })

      })
      return ar
    },
    async fetchvergiDairesi(contex, data) {
     
      let queries = [];
      for (let i = 0; i < data.length; i += 10) {
        queries.push(query(
          collection(db, "VergiDairesi"),
          where("VergiDaireKod", "in", data.slice(i, i + 10)), ))
      }
      let usersDocsSnaps = [];
      for (let i = 0; i < queries.length; i++) {
        usersDocsSnaps.push(getDocs(queries[i]));
      }
      usersDocsSnaps = await Promise.all(usersDocsSnaps);

      let usersDocs = [...new Set([].concat(...usersDocsSnaps.map((o) => o.docs)))];
      usersDocs.forEach(el => {

        contex.commit("setVD", el.data())
        // this.state.vergiDairesi.push(el.data())
      })


    },
    async fetchPosSorgu(context, payload) {
     
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

     
      context.dispatch("actionArr", {
        dbName: "GidenFaturalar",
        İtemName: "KullaniciUid",
        payload: payload,
        MutName: "setGidenFatura"
      })

    },
    async fecthGibTebligat(context, payload) {
      this.state.GibTebligat = []

      

      context.dispatch("actionArr", {
        dbName: "GibTebligat",
        İtemName: "KullaniciUid",
        payload: payload,
        MutName: "setGibTebligat"
      })
    },
    async gibtebligatEk(context, data) {
      this.state.GibTebligatEk = []
      let queries = [];
      for (let i = 0; i < data.length; i += 10) {
        queries.push(query(
          collection(db, "GibTebligatEk"),
          where("TebligatId", "in", data.slice(i, i + 10)), ))
      }
      let usersDocsSnaps = [];
      for (let i = 0; i < queries.length; i++) {
        usersDocsSnaps.push(getDocs(queries[i]));
      }
      usersDocsSnaps = await Promise.all(usersDocsSnaps);

      let usersDocs = [...new Set([].concat(...usersDocsSnaps.map((o) => o.docs)))];
      usersDocs.forEach(el => {

        context.commit("setGibTebligatEk", el.data())

    })
    },
    async fecthTibTebligat(context, payload) {
      this.state.TibTebligat = []

   
      context.dispatch("actionArr", {
        dbName: "TicaretTebligat",
        İtemName: "MukellefID",
        payload: payload,
        MutName: "setTibTebligat"
      })

    },
    async fetchTibTebligatEk(context, data) {
      this.state.TibTebligatEk = []
      let queries = [];
      for (let i = 0; i < data.length; i += 10) {
        queries.push(query(
          collection(db, "TicaretTebligatEk"),
          where("TicaretTebtId", "in", data.slice(i, i + 10)), ))
      }
      let usersDocsSnaps = [];
      for (let i = 0; i < queries.length; i++) {
        usersDocsSnaps.push(getDocs(queries[i]));
      }
      usersDocsSnaps = await Promise.all(usersDocsSnaps);

      let usersDocs = [...new Set([].concat(...usersDocsSnaps.map((o) => o.docs)))];
      usersDocs.forEach(el => {
        context.commit("setTibTebligatEk", el.data())
      })
    },
    async fetchVergiTebligat(context, payload) {
      this.state.VergiTebligat = []

      context.dispatch("actionArr", {
        dbName: "VergiTebligat",
        İtemName: "MukellefID",
        payload: payload,
        MutName: "setVergiTebligat"
      })
    },
    async fetchSgkFirmaalar(context, payload) {
      this.state.SgkFirmalar = []

      context.dispatch("actionArr", {
        dbName: "Firma",
        İtemName: "MukellefId",
        payload: payload,
        MutName: "setSgkFirma"
      })

    },
    async fetchSgkBildirge(context, payload) {
      this.state.SgkBildirge = []

      context.dispatch("actionArr", {
        dbName: "Bildirgeler",
        İtemName: "Kullanici",
        payload: payload,
        MutName: "SetSgkBildirge"
      })

    },
    async fetchTicaretSicilGazetesi(context, payload) {
      this.state.TicaretSicilGazetesi = []

      context.dispatch("actionArr", {
        dbName: "TicaretSicilGazetesi",
        İtemName: "SubeID",
        payload: payload,
        MutName: "SetTicaretSicilGazetesi"
      })

    },
    async fetchKalanBeyanname(context, payload) {
      this.state.KalanBeyanname = []

      context.dispatch("actionArr", {
        dbName: "KalanBeyanname",
        İtemName: "MukellefId",
        payload: payload,
        MutName: "SetKalanBeyanname"
      })

    },
    async fetchBeyanTakipProperties(context, payload) {
      this.state.BeyanTakipProperties = []

      context.dispatch("actionArr", {
        dbName: "BeyanTakipProperties",
        İtemName: "TurPropId",
        payload: payload,
        MutName: "SetBeyanTakipProperties"
      })

    },
    async fetchFaaliyet(context, payload) {


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
      context.dispatch("actionArr", {
        dbName: "Sifreler",
        İtemName: "KullaniciUid",
        payload: payload,
        MutName: "SetSifreler"
      })

    },
    async fetchCalisan(context, payload) {
      this.state.calisan = []
      context.dispatch("actionArr", {
        dbName: "Calisan",
        İtemName: "SubeId",
        payload: payload,
        MutName: "setCalisan"
      })
    },
    async fetchSgkVizite(context, payload) {
      this.state.sgkVizite.length > 0 ? console.log("data var") :
        context.dispatch("actionArr", {
          dbName: "Vizite",
          İtemName: "CalisanId",
          payload: payload,
          MutName: "SetSgkVizite"
        })
    },
    
    async beyannameAyGetir(context, data) {
      var buAy = (new Date().getMonth() < 10 ? "0" + new Date().getMonth() : new Date().getMonth()) + "/" + new Date().getFullYear() + "-" + (new Date().getMonth() < 10 ? "0" + new Date().getMonth() : new Date().getMonth()) + "/" + new Date().getFullYear()

      let queries = query(collection(db, "Beyanname"),
        where("Kullanici", "==", data.kullaniciuid), where("donem", "==", buAy), limit(10)
      )
      let datas = await getDocs(queries)

      context.commit("setBeyanname", datas.docs.map(e => e.data()));
     

    },
    async beyannameGetir(context, payload) {
      
      let queries = query(collection(db, "Beyanname"),
        where("Kullanici", "==", payload.kullaniciuid),
        limit(payload.limit)
      )
      let datas = await getDocs(queries)

      context.commit("setBeyanname", datas.docs.map(e => e.data()));
    

    },

    async actionArrBey(context, data) {
      return new Promise((resolve, reject) => {
     
        var buAy = (new Date().getMonth() < 10 ? "0" + new Date().getMonth() : new Date().getMonth()) + "/" + new Date().getFullYear() + "-" + (new Date().getMonth() < 10 ? "0" + new Date().getMonth() : new Date().getMonth()) + "/" + new Date().getFullYear()
       
        let queries = query(collection(db, data.dbName),
          where(data.İtemName, "==", data.payload), where(data.order.data, "==", buAy), limit(data.limit)
        )
        
        let datas = getDocs(queries)
        datas.then(documentSnapshots => {

          context.commit(data.MutName, documentSnapshots.docs);
          let arr = []
       
          arr = documentSnapshots.docs
          resolve(arr)
        })

      })

    },
    async actionArr(context, data) {
      return new Promise((resolve, reject) => {
     
        let queries = query(collection(db, data.dbName),
          where(data.İtemName, "==", data.payload), limit(data.limit)
        )
        let datas = getDocs(queries)
        datas.then(documentSnapshots => {

          context.commit(data.MutName, documentSnapshots.docs);
          let arr = []
        
          arr = documentSnapshots.docs
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
    
      this.state.notification = []
    
      this.state.mesaj = []
      let q = query(
        collection(db, "MukellefBildirim"),
        where("KullaniciId", "==", payload),
      )
      const dat = await getDocs(q)
      dat.forEach(el => {
      
        context.commit('setMesaj', el.data())
      })
    },
    //!  UPTADE 
    async updateBeyanname(context,payload)
    {
       
      const beyan=doc(db,"Beyanname",payload.beyanOid) 
      const gBeyan=await updateDoc(beyan,payload);
    },
    async updateSgkTah(context,payload){
      const sgk=doc(db,"Bildirgeler",payload.thkOid)
      const gsgk=await updateDoc(sgk,payload);
    },
    async updateProfileDate(context, paylod) {
 
      const profile = doc(db, "Kullanici", documentıd)
      const gProfile = await updateDoc(profile, paylod);
    },
    async updateProfileSettings(context, paylod) {
   
      const profile = doc(db, "KullaniciAyarlar", paylod.kullaniciUid)
      const gProfile = await setDoc(profile, paylod);
    },
    async updatePersonData(context, payload) {

      const q = doc(db, "Sifreler", payload.SifreId.toString())

      const Gelendata = await updateDoc(q, payload);

    },
    async uptadeSgkFirma(context, payload) {
  
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
    
      context.commit('SetSgkBildirge', Gelendata)
    },
    async AddNewMükellef(context, payload) {
      
      let data = JSON.parse(JSON.stringify(payload))
      const q = doc(db, "Mukellef", data.id)
      delete data.data.id
      const Gelendata = await updateDoc(q, data.data);
     
    },
    async AddNewKullanici(context,payload){
let data=JSON.parse(JSON.stringify(payload))
const q=doc(db,"Kullanici",data.id)
delete data.data.id
const gelen=await updateDoc(q,data.data)
    },
    async uptadeSifre(context, payload) {
      
      const q = doc(db, "Sifreler", payload.SifreId.toString())
      const Gelendata = await updateDoc(q, payload);
  
    },
    //! ADD DATA
    async AddNewSgkData(context, payload) {
      // await setDoc(doc(db, "Firma", payload.SubeId ), payload);
 
      const res = await setDoc(doc(db, "Firma", payload.SubeId.toString()), payload)
 
    },
    async AddNewBeyanTakip(contex, payload) {

      const res = await setDoc(doc(db, "KalanBeyanname", payload.KalanId.toString()), payload)
    
    },
    async AddNewsssMükellef(context, payload) {

      const q = doc(db, "Mukellef", payload.MukellefId.toString())
      const Gelendata = await setDoc(q, payload);
    
    },
    async AddNewsKullanici(context,payload)
    {
      const q=doc(db,"Kullanici",payload.KullaniciUid.toString())
      const gelen=await setDoc(q,payload);
    },
    async AddNewsBeyanSorgu(contex, payload) {
      //burada payload dediğimiz bizim diger taraftan gönderdiğimiz veriler emin olmak için burada konsola yazdıralım
   
      //Adddoc da biz id vermeyiiz firebase kendisi oluşturur
      const a = collection(db, "BeyannameSorgu")
      const son = await addDoc(a, payload)
    },
    async AddNewsWhatsappSorgu(contex,payload){
    
      const a =collection(db,"WhatsappSorgu/"+payload.KullaniciUid+"/Sorgular")
      const son=await addDoc(a,payload)

    },
    async AddNewsMailSorgu(contex,payload){
    //    var ta= await getDoc( collection(db,"Bildirgeler/1vl0autsv81wok"))
    //    const alovelaceDocumentRef = doc(db, 'Bildirgeler/1vl0autsv81wok');

     
    //   const GelenData=await addDoc(collection(db,"MailSorgu/"+payload.KullaniciUid+"/Sorgular"),
    //   {
    //     //user: db.doc('users/' + user_key),
    //      TabloRef:doc(db, 'Bildirgeler/'+payload.beyanname.beyannameOid)
    //   });
    //   contex.commit(GelenData);
    //   console.log(GelenData);
        const yy=collection(db,"MailSorgu/"+payload.KullaniciUid+"/Sorgular")
       const son=await addDoc(yy,payload)
       
    },
    async AddNewsTebligatSorgu(context, payload) {
  
      const a = collection(db, "TebligatSorgu")
      const sonn = await addDoc(a, payload)
    },
    async AddNewsEpostaSorgu(contex, payload) {
      //burada payload dediğimiz bizim diger taraftan gönderdiğimiz veriler emin olmak için burada konsola yazdıralım

      //Adddoc da biz id vermeyiiz firebase kendisi oluşturur
      const a = collection(db, "EpostaGonder")
      const son = await addDoc(a, payload)
    },
    async AddPosSorgu(context, payload) {
    
      const veri = collection(db, "MukellefPosSorgu")
      const veriSon = await addDoc(veri, payload)
    },
    async AddGelenFaturaSorgu(context, payload) {
    
      const veri = collection(db, "GelenFaturaSorgu")
      const veriSon = await addDoc(veri, payload)
    },
    async AddGidenFaturaSorgu(context, payload) {
    
      const veri = collection(db, "GidenFaturaSorgu")
      const veriSon = await addDoc(veri, payload)
    },
    async AddNewsBildirgeSorgu(context, payload) {
   
      const a = collection(db, "BildirgeSorgu")
      const sonn = await addDoc(a, payload)
    },
    async AddNewsNotification(context, payload) {
     

      const Gelendata = await addDoc(collection(db, "MukellefBildirim"), {
        Gonderilenler: payload.Gonderilenler,
        KullaniciId: payload.KullaniciId,
        Mesaj: payload.Mesaj,
        Tarih: payload.Tarih
      });
      context.commit('setMesaj', Gelendata)
    
      context.dispatch('fetchMesaj', payload.KullaniciId)
    },
    //! DELETE DATA
    async DeleteSgkData(context, payload) {
    
      await deleteDoc(doc(db, "Firma", payload.toString()))

    },
    async DeleteBeyanData(context, payload) {
     
      await deleteDoc(doc(db, "Beyanname", payload))

    },
     async DeleteGelenFatura(context,payload){
  
       
         //await deleteDoc(doc(db,"GelenFaturalar").where('KullaniciUid','==',payload))


         const q = query(collection(db, "GelenFaturalar"));
         const querySnapshot = await getDocs(q);
         querySnapshot.docs.forEach((doc)=>{
          deleteDoc(doc.ref)
         })

           
    },

    async DeleteGidenFatura(context,payload){
  
 
     //await deleteDoc(doc(db,"GelenFaturalar").where('KullaniciUid','==',payload))


     const q = query(collection(db, "GidenFaturalar"));
     const querySnapshot = await getDocs(q);
     querySnapshot.docs.forEach((doc)=>{
      deleteDoc(doc.ref)
     })

       
}
  },
  strict: process.env.DEV,
});