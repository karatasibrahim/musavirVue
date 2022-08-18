<template  >
  <div>
    <!-- <section>
      <article class="card">
        <div class="title" style="background-color: #0073b7">
          <users-icon size="35" class="icon"></users-icon>
          <span
            >{{ mukellefData.length
            }}<span style="font-weight: 400; font-size: 15px">
              Mükellef
            </span></span
          >
        </div>

        <div class="card-stats">
          <span>Firma:98</span>
          <span>Şahıs:135</span>
          <span>Basit:0</span>
        </div>

        <div class="card-link">
          Mükellef Listesine Git
          <arrow-right-circle-icon size="20"> </arrow-right-circle-icon>
        </div>
      </article>

      <article class="card">
        <div class="title" style="background-color: #359c6d">
          <file-icon size="35" class="icon"></file-icon>
          <span
            >100<span style="font-weight: 400; font-size: 15px">
              SGK Takibi
            </span></span
          >
        </div>

        <div class="card-stats">
          <span>SGK Takibi</span>
        </div>

        <div class="card-link">
          SGK Kontrol Listesine Git
          <arrow-right-circle-icon size="20"> </arrow-right-circle-icon>
        </div>
      </article>

      <article class="card">
        <div class="title" style="background-color: #f39c12">
          <file-text-icon size="35" class="icon"></file-text-icon>
          <span
            >{{ beyannameData.length
            }}<span style="font-weight: 400; font-size: 15px">
              E-Beyanname
            </span></span
          >
        </div>

        <div class="card-stats">
          <span>E-Beyanname</span>
        </div>

        <div class="card-link">
          E-Beyanname K. Listesine Git
          <arrow-right-circle-icon size="20"> </arrow-right-circle-icon>
        </div>
      </article>

      <article class="card">
        <div class="title" style="background-color: #3c8dbc">
          <img src="./assets/gib.png" style="width: 35px" />
          <span style="font-weight: 400; font-size: 15px">
            Gelir İdaresi Başkanlığı Tebligatları
          </span>
        </div>

        <div class="card-stats">
          <span
            style="
              color: #21925f;
              display: flex;
              flex-direction: column;
              align-items: center;
            "
          >
            Okunanlar
            <span>0</span>
          </span>

          <span
            style="
              color: #dd4b39;
              display: flex;
              flex-direction: column;
              align-items: center;
            "
          >
            Okunmayanlar
            <span>0</span>
          </span>
        </div>

        <div class="card-link">
          E-Tebligat Listesine Git
          <arrow-right-circle-icon size="20"> </arrow-right-circle-icon>
        </div>
      </article>

      <article class="card">
        <div class="title" style="background-color: #3c8dbc">
          <img src="./assets/vd.png" style="width: 50px" />
          <span style="font-weight: 400; font-size: 15px">
            Vergi Denetim Kurulu B. Tebligatları
          </span>
        </div>

        <div class="card-stats">
          <span
            style="
              color: #21925f;
              display: flex;
              flex-direction: column;
              align-items: center;
            "
          >
            Okunanlar
            <span>0</span>
          </span>

          <span
            style="
              color: #dd4b39;
              display: flex;
              flex-direction: column;
              align-items: center;
            "
          >
            Okunmayanlar
            <span>0</span>
          </span>
        </div>

        <div class="card-link">
          E-Tebligat Listesine Git
          <arrow-right-circle-icon size="20"> </arrow-right-circle-icon>
        </div>
      </article>

      <article class="card">
        <div class="title" style="background-color: #3c8dbc">
          <img src="./assets/tb.svg" style="width: 50px" />
          <span style="font-weight: 400; font-size: 15px">
            Ticaret Bakanlığı Tebligatları
          </span>
        </div>

        <div class="card-stats">
          <span
            style="
              color: #21925f;
              display: flex;
              flex-direction: column;
              align-items: center;
            "
          >
            Okunanlar
            <span>0</span>
          </span>

          <span
            style="
              color: #dd4b39;
              display: flex;
              flex-direction: column;
              align-items: center;
            "
          >
            Okunmayanlar
            <span>0</span>
          </span>
        </div>

        <div class="card-link">
          E-Tebligat Listesine Git
          <arrow-right-circle-icon size="20"> </arrow-right-circle-icon>
        </div>
      </article>

      <article class="card">
        <div class="title" style="background-color: #284871">
          <img src="./assets/sgk.png" style="width: 60px" />
          <span
            >100<span style="font-weight: 400; font-size: 15px">
              E-Rapor
            </span></span
          >
        </div>

        <div class="card-stats">
          <span
            style="
              color: #21925f;
              display: flex;
              flex-direction: column;
              align-items: center;
            "
          >
            Onaylanmış
            <span>0</span>
          </span>

          <span
            style="
              color: #dd4b39;
              display: flex;
              flex-direction: column;
              align-items: center;
            "
          >
            Onaylanmamış
            <span>0</span>
          </span>
        </div>

        <div class="card-link">
          E-Rapor Listesine Git
          <arrow-right-circle-icon size="20"> </arrow-right-circle-icon>
        </div>
      </article>

      <article class="card">
        <div class="title" style="background-color: #284871">
          <img src="./assets/sgk.png" style="width: 60px" />
          <span
            >100<span style="font-weight: 400; font-size: 15px">
              E-Bildirim
            </span></span
          >
        </div>

        <div class="card-stats" style="font-size: 13px">
          <span
            style="
              color: #0009bc;
              display: flex;
              flex-direction: column;
              align-items: center;
            "
          >
            İş Kazası
            <span>0</span>
          </span>

          <span
            style="
              color: #0009bc;
              display: flex;
              flex-direction: column;
              align-items: center;
            "
          >
            Meslek H...
            <span>0</span>
          </span>

          <span
            style="
              color: #21925f;
              display: flex;
              flex-direction: column;
              align-items: center;
            "
          >
            Güncel İş...
            <span>0</span>
          </span>

          <span
            style="
              color: #21925f;
              display: flex;
              flex-direction: column;
              align-items: center;
            "
          >
            Güncel M...
            <span>0</span>
          </span>
        </div>

        <div class="card-link">
          Hastane Bildirim Lis. Git
          <arrow-right-circle-icon size="20"> </arrow-right-circle-icon>
        </div>
      </article>
    </section> -->
    <div class="row">
      
       
  <div class="col-6">

     <b-card-code title="EMÜŞAVİRİM YAZILIM MODÜLÜ GÜNCELLEMELERİ">
  <app-timeline>
        <app-timeline-item
        
      title="Sgk Vizite Modülü"
      subtitle="Sgk vizite sorgulama sayfası aktif edildi."
      time="1 saat önce"

      variant="warning"
    />
    <app-timeline-item
      title="Pos Sorgulama Modülü"
      subtitle="Mükellef pos sorgulama sayfası aktif edildi."
      time="1 hafta önce"
      variant="success"
    /> 
    <app-timeline-item
      title="Gib Tebligat Modülü"
      subtitle="Tebligat sorgulama sayfası aktif edildi. Vergi Tebligat ve Ticaret Tebligat sorgulama işlemleri güncelleme ile aktif edilecek."
      time="2 hafta önce"
      variant="info"
    />

    <app-timeline-item
      title="Vergi Levhaları Modülü"
      subtitle="Mükellef vergi levhaları sorgulama ve listeleme aktif edildi."
      time="3 hafta önce"
      variant="warning"
    />

    <app-timeline-item
      title="EArşiv Fatura Modülü"
      subtitle="EArşiv gelen fatura ve giden fatura sayfaları güncellendi."
      time="1 ay önce"
    />

    <app-timeline-item
      title="EArşiv Fatura Modülü"
      subtitle="Earşiv fatura modülü aktif edildi."
      time="5 hafta önce"
      variant="secondary"
    />
     <app-timeline-item
      title="Beyanname ve Sgk Bildirgeler Modülü"
      subtitle="Gönderim seçenekleri entegre edilerek aktif edildi."
      time="6 hafta önce"
      variant="success"
    /> 
    <app-timeline-item
      title="Whatsapp, Email, Sms Modülü"
      subtitle="Gönderim seçenekleri aktif edildi."
      time="7 hafta önce"
      variant="info"
    />

    <app-timeline-item
      title="Mükellef Modülü"
      subtitle="Mükellef listesi güncellendi"
      time="2 ay önce"
      variant="warning"
    />

    <app-timeline-item
      title="Mükellef Modülü"
      subtitle="Mükellef takip işlemleri ve mükellef kart güncelleme işlemleri aktif edildi."
      time="9 hafta önce"
    />

    <app-timeline-item
      title="Beyanname Sorgulama Modülü"
      subtitle="Beyanname sorgulama ve sgk bildirge sorgulama işlemi güncellendi."
      time="10 hafta önce"
      variant="secondary"
    />
     <app-timeline-item
      title="SGK Sorgulama Modülü"
      subtitle="Sgk bildirge listelem sayfası aktif edildi."
      time="11 hafta önce"
      variant="success"
    /> 
    <app-timeline-item
      title="Beyanname Sorgulama Modülü"
      subtitle="Toplu beyanname sorgulama sayfası aktif edildi."
      time="3 ay önce"
      variant="info"
    />

 
  </app-timeline>
  </b-card-code>
  </div>
  <div class="col-6">
 <b-card-code title="GELECEK GÜNCELLEMELER">
  <app-timeline>
        <app-timeline-item
        
      title="Yoklama Denetim Modülü"
      subtitle="Yoklama denetim sorgulama sayfası aktif edilecek."  

      variant="warning"
    />
    <app-timeline-item
      title="Naylon Fatura Sorgulama Modülü"
      subtitle="Mükellef naylon fatura sorgulama sayfası aktif edilecek."
     
      variant="success"
    /> 
    <app-timeline-item
      title="Ticaret Sicil Gazetesi Modülü"
      subtitle="Ticaret sicil gazetesi sorgulama sayfası aktif edilecek."
    
      variant="info"
    />

    <app-timeline-item
      title="Kalan Beyannameler Modülü"
      subtitle="Beyanname takip işlemleri aktif edilecek."
      
      variant="warning"
    />

    <app-timeline-item
      title="Mükellef Modülü"
      subtitle="Borcu yoktur yazısı sorgulama sayfası aktif edilecektir."
     
    />

 

 
  </app-timeline>
  </b-card-code></div>
 </div>
 
 </div>
</template>

<script>
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import { BCard } from 'bootstrap-vue'
import BCardCode from '@core/components/b-card-code'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'
import {
  UsersIcon,
  FileIcon,
  FileTextIcon,
  ArrowRightCircleIcon,
} from "vue-feather-icons";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
        AppTimeline,
    AppTimelineItem,
    UsersIcon,
    BCard,
      BCardCode,
    FileIcon,
    FileTextIcon,
    ArrowRightCircleIcon,
  },
  methods: {
    ...mapActions(["fetchBeyanname", "fetch", "fetchMukellef"]),
    FecthPersonData() {
     
          this.fetchMukellef(JSON.parse(localStorage.getItem("userData")).userId);

        this.fetch().then((res) => {
          console.log(res[0]);
            res.forEach((el) => {
                console.log(el.data().kullaniciUid);
          
        });
      });
    },
    
     fecthBeyan() {
       let arr = [];
       this.mukellefData.forEach((element) => {
          console.log(el.data().kullaniciUid);
         arr.push(element.MukellefId);
       });

    
     },
  },
 data() {
    return {
     
    }
  },
  computed: {
    ...mapGetters(["reMukellef", "reBeyanname"]),
    beyannameData() {
      return this.reBeyanname;
    },
    mukellefData() {
      return this.reMukellef;
    },
  },

  mounted() {
    this.FecthPersonData();
  },
};
</script>

<style>
section {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  grid-gap: 15px;
}

.card {
  background: #fff;
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  border-radius: 2px;
}

.card .title {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  color: white;
  gap: 10px;
  font-weight: 500;
  border-radius: 2px;
}

.card-stats {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 15px;
  color: #333333;
  font-weight: 500;
}

.icon {
  color: rgba(255, 255, 255, 0.4);
}

.card-link {
  background: #e0e6ec;
  height: 40px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  gap: 4px;
  user-select: none;
  cursor: pointer;
  transition: 200ms all;
}

.card-link:hover {
  background: #d2d7db;
}
</style>