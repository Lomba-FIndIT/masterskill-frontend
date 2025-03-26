<template>
    <footer :class="$style.footer">
      <div :class="$style.footerContainer">
        <!-- Bagian Kiri: Logo -->
        <div :class="$style.logoSection">
          <img src="/assets/logo.png" />  
        </div>
          
  
        <!-- Divider -->
        <div :class="$style.divider"></div>
  
        <!-- Bagian Tengah: Layanan Informasi -->
        <div :class="$style.infoSection">
          <b>Layanan Informasi</b>
          <p>MasterSkill</p>
        </div>
  
        <!-- Divider -->
        <div :class="$style.divider"></div>
  
        <!-- Bagian Kanan: Contact -->
        <div :class="$style.contactSection">
          <b>Contact</b>
          <div :class="$style.contactItem">
            <!-- <img :class="$style.icon" src="/assets/phone.png" alt="Phone" /> -->
            <p>Telp. : 021 1500 002</p>
          </div>
          <div :class="$style.contactItem">
            <!-- <img :class="$style.icon" src="/assets/whats-app.png" alt="WhatsApp" /> -->
            <p>WhatsApp: 0815 1500 0002</p>
          </div>
          <div :class="$style.socialIcons">
            <!-- <img :class="$style.socialIcon" src="/assets/twitter-bird.png" alt="Twitter" />
            <img :class="$style.socialIcon" src="/assets/facebook.png" alt="Facebook" />
            <img :class="$style.socialIcon" src="/assets/instagram.png" alt="Instagram" /> -->
          </div>
        </div>
      </div>
  
      <!-- Copyright -->
      <div :class="$style.footerCopyright">
        <p>2025 Hak Cipta, MasterSkill</p>
      </div>
    </footer>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "FooterComponent",
  });
  </script>
  
  <style module>
  /* Footer container utama */
  .footer {
    width: 100%;
    background-color: #ffdd00;
    text-align: center;
    padding-bottom: 0; /* Menghapus padding bawah */
  }
  
  /* Wrapper untuk semua isi footer */
  .footerContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: auto;
    padding: 20px;
    gap: 50px;
  }
  
  /* Bagian Logo */
  .logoSection {
    flex: 1;
    text-align: left;
  }
  
  .logo {
    height: 80px;
  }
  
  /* Bagian Informasi */
  .infoSection {
    flex: 2;
    text-align: center;
    font-weight: bold;
  }
  
  /* Bagian Kontak */
  .contactSection {
    flex: 1;
    text-align: left;
  }
  
  .contactItem {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 5px;
  }
  
  .icon {
    width: 24px;
    height: 24px;
  }
  
  /* Social Media Icons */
  .socialIcons {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  
  .socialIcon {
    width: 20px;
    height: 20px;
  }
  
  /* Divider (garis pemisah) */
  .divider {
    width: 1px;
    height: 60px;
    background-color: rgba(0, 0, 0, 0.6);
  }
  
  /* Copyright Section */
  .footerCopyright {
    background: black;
    color: white;
    padding: 0.8rem; /* Kurangi padding agar tidak terlalu tebal */
    width: 100%;
    text-align: center;
    font-size: 14px; /* Ukuran teks lebih kecil supaya proporsional */
    margin-top: -5px; /* Tarik sedikit ke atas */
  }
  </style>