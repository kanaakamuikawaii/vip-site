let selectedPackage = "";

function selectPackage(paket) {
  selectedPackage = paket;
  const qrisImg = document.getElementById("qrisImage");

  if (paket === "eceran") {
    qrisImg.src = "qris-eceran.jpg";
  } else {
    qrisImg.src = "qris-full.jpg";
  }

  document.getElementById("qrisSection").classList.remove("hidden");
  document.getElementById("status").textContent = "";
}

function uploadBukti() {
  const fileInput = document.getElementById("buktiInput");
  const username = document.getElementById("usernameInput").value.trim();
  const file = fileInput.files[0];

  if (!username || !username.startsWith("t.me/")) {
    alert("Masukkan username Telegram kamu yang benar (contoh: t.me/namakamu)");
    return;
  }

  if (!file) {
    alert("Pilih gambar bukti dulu.");
    return;
  }

  const TOKEN = "7605431882:AAEyOIKQcDD3sriH3SsGWUDoE5OHOepLbIs";
  const CHAT_ID = "7548982508";
  const url = `https://api.telegram.org/bot${TOKEN}/sendPhoto`;

  const formData = new FormData();
  formData.append("chat_id", CHAT_ID);
  formData.append("caption", `📥 Bukti Transfer\nPaket: ${selectedPackage}\n🧑 Username: ${username}`);
  formData.append("photo", file);

  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.ok) {
        document.getElementById("status").textContent = "✅ Bukti berhasil dikirim!";
      } else {
        document.getElementById("status").textContent = "❌ Gagal kirim. Coba lagi.";
      }
    })
    .catch(() => {
      document.getElementById("status").textContent = "⚠️ Terjadi kesalahan.";
    });
}