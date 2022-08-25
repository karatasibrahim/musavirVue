export default [
  //Mükellef İşlemleri Menüsü
  {
    path: "/mukellef/mukellef-listesi",
    name: "online-mukellef-listesi",
    component: () => import("@/views/online/mukellef/mukellef-listesi"),
  },
  {
    path: "/mukellef/mukellef-ekle",
    name: "online-mukellef-mukellef-ekle",
    component: () => import("@/views/online/mukellef/mukellef-ekle"),
  },
  {
    path: "/mukellef/mukellef-fatura",
    name: "online-mukellef-fatura",
    component: () => import("@/views/online/mukellef/mukellef-fatura"),
  },
  // {
  //   path: "/mükellef/mükellef-özeti",
  //   name: "online-mükellef-özeti",
  //   component: () => import("@/views/online/mükellef/mükellef-özeti"),
  // },
  // {
  //   path: "/mükellef/mükellef-vergi-sorgula",
  //   name: "online-maliye-vergi-sorgula",
  //   component: () => import("@/views/online/mükellef/mükellef-vergi-sorgula"),
  // },
  // {
  //   path: "/mükellef/mükellef-gayrimenkul-satış",
  //   name: "online-mükellef-gayrimenkul-satış",
  //   component: () => import("@/views/online/mükellef/mükellef-gayrimenkul-satış"),
  // },
  // {
  //   path: "/mükellef/mükellef-geçmiş-araçlarım",
  //   name: "online-mükellef-geçmiş-araçlarım",
  //   component: () => import("@/views/online/mükellef/mükellef-geçmiş-araçlarım"),
  // },
  {
    path: "/mukellef/mukellef-gelen-earşiv-fatura",
    name: "online-mukellef-gelen-earşiv-fatura",
    component: () => import("@/views/online/mukellef/mukellef-gelen-earşiv-fatura"),
  },
  {
    path: "/mukellef/mukellef-giden-earşiv-fatura",
    name: "online-mukellef-giden-earşiv-fatura",
    component: () => import("@/views/online/mukellef/mukellef-giden-earşiv-fatura"),
  },
  // {
  //   path: "/mükellef/mükellef-stopaj",
  //   name: "online-mükellef-stopaj",
  //   component: () => import("@/views/online/mükellef/mükellef-stopaj"),
  // },
  // {
  //   path: "/mükellef/mükellef-kira-ödemeleri",
  //   name: "online-mükellef-kira-ödemeleri",
  //   component: () => import("@/views/online/mükellef/mükellef-kira-ödemeleri"),
  // },
  // {
  //   path: "/mükellef/mükellef-mevcut-araçlarım",
  //   name: "online-mükellef-mevcut-araçlarım",
  //   component: () => import("@/views/online/mükellef/mükellef-mevcut-araçlarım"),
  // },
  {
    path: "/mukellef/mukellef-vergi-levhalari",
    name: "online-mukellef-vergi-levhalari",
    component: () => import("@/views/online/mukellef/mukellef-vergi-levhalari"),
  },
    {
      path: "/mukellef/mukellef-yoklama-denetim",
      name: "online-mukellef-yoklama-denetim",
      component: () => import("@/views/online/mukellef/mukellef-yoklama-denetim"),
    },

  //Maliye İşlemleri Menüsü
  {
    path: "/maliye/beyannameler",
    name: "online-maliye-beyannameler",
    component: () => import("@/views/online/maliye/beyannameler"),
  },
  {
    path: "/maliye/maliye-borcu-yoktur", 
    name: "online-maliye-borcu-yoktur",
    component: () => import("@/views/online/maliye/maliye-borcu-yoktur"),
  },
   {
    path: "/maliye/maliye-kalan-beyannameler",
    name: "online-maliye-kalan-beyannameler",
    component: () => import("@/views/online/maliye/maliye-kalan-beyannameler"),
  },
  // {
  //   path: "/maliye/maliye-mükellef-yazısı",
  //   name: "online-maliye-mükellef-yazısı",
  //   component: () => import("@/views/online/maliye/maliye-mükellef-yazısı"),
  // },
    {
    path: "/maliye/maliye-odenen-ggecici",
    name: "online-maliye-odenen-ggecici",
    component: () => import("@/views/online/maliye/maliye-odenen-ggecici"),
  },
  {
    path: "/maliye/maliye-odenen-kgecici",
    name: "online-maliye-odenen-kgecici",
    component: () => import("@/views/online/maliye/maliye-odenen-kgecici"),
  },
  {
    path: "/maliye/maliye-pos-sorgulama",
    name: "online-maliye-pos-sorgulama",
    component: () => import("@/views/online/maliye/maliye-pos-sorgulama"),
  },
  // {
  //   path: "/maliye/maliye-sicil-kaydım",
  //   name: "online-maliye-sicil-kaydım",
  //   component: () => import("@/views/online/maliye/maliye-sicil-kaydım"),
  // },
  {
    path: "/maliye/maliye-tebligat-sorgulama",
    name: "online-maliye-tebligat-sorgulama",
    component: () => import("@/views/online/maliye/maliye-tebligat-sorgulama"),
  },

  // SGK İşlemleri Menüsü
  {
    path: "/sgk/sgk-işçilik-hesabı",
    name: "online-sgk-işçilik-hesabı",
    component: () => import("@/views/online/sgk/sgk-işçilik-hesabı"),
  },
  {
    path: "/sgk/sgkbildirgeler",
    name: "online-sgk-sgkbildirgeler",
    component: () => import("@/views/online/sgk/sgkbildirgeler"),
  },
  // {
  //   path: "/sgk/sgk-borcu-yoktur",
  //   name: "online-sgk-borcu-yoktur",
  //   component: () => import("@/views/online/sgk/sgk-borcu-yoktur"),
  // },
  // {
  //   path: "/sgk/sgk-işçi-giriş-çıkış",
  //   name: "online-sgk-işçi-giriş-çıkış",
  //   component: () => import("@/views/online/sgk/sgk-işçi-giriş-çıkış"),
  // },
  // {
  //   path: "/sgk/sgk-takip",
  //   name: "online-sgk-takip",
  //   component: () => import("@/views/online/sgk/sgk-takip"),
  // },
  {
    path: "/sgk/sgk-viziteler",
    name: "online-sgk-viziteler",
    component: () => import("@/views/online/sgk/sgk-viziteler"),
  },

  // Finans İşlemleri Menüsü
  // {
  //   path: "/finans/finans-cari-işlemleri",
  //   name: "online-finans-cari-işlemleri",
  //   component: () => import("@/views/online/finans/finans-cari-işlemleri"),
  // },
  // {
  //   path: "/finans/finans-gelir-gider",
  //   name: "online-finans-gelir-gider",
  //   component: () => import("@/views/online/finans/finans-gelir-gider"),
  // },
  // {
  //   path: "/finans/finans-muhasebe-ücretleri",
  //   name: "online-finans-muhasebe-ücretleri",
  //   component: () => import("@/views/online/finans/finans-muhasebe-ücretleri"),
  // },

  // E-Devlet İşlemleri Menüsü
  {
    path: "/edevlet/edevlet-dava-dosyaları",
    name: "online-edevlet-dava-dosyaları",
    component: () => import("@/views/online/edevlet/edevlet-dava-dosyaları"),
  },
  {
    path: "/edevlet/edevlet-icra-dosyaları",
    name: "online-edevlet-icra-dosyaları",
    component: () => import("@/views/online/edevlet/edevlet-icra-dosyaları"),
  },

  // // Hızlı Giriş Menüsü
  // {
  //   path: "/hızlıgirişler/hızlıgirişler-ebeyanname",
  //   name: "online-hızlıgirişler-ebeyanname",
  //   component: () => import("@/views/online/hızlıgirişler/hızlıgirişler-ebeyanname"),
  // },
  // {
  //   path: "/hızlıgirişler/hızlıgirişler-efatura",
  //   name: "online-hızlıgirişler-efatura",
  //   component: () => import("@/views/online/hızlıgirişler/hızlıgirişler-efatura"),
  // },
  // {
  //   path: "/hızlıgirişler/hızlıgirişler-gelir-idaresi",
  //   name: "online-hızlıgirişler-gelir-idaresi",
  //   component: () => import("@/views/online/hızlıgirişler/hızlıgirişler-gelir-idaresi"),
  // },
  // {
  //   path: "/hızlıgirişler/hızlıgirişler-maliye",
  //   name: "online-hızlıgirişler-maliye",
  //   component: () => import("@/views/online/hızlıgirişler/hızlıgirişler-maliye"),
  // },
  // {
  //   path: "/hızlıgirişler/hızlıgirişler-sgk",
  //   name: "online-hızlıgirişler-sgk",
  //   component: () => import("@/views/online/hızlıgirişler/hızlıgirişler-sgk"),
  // },
];