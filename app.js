// 1. Import modul yang dibutuhkan
const http = require("http"); // Modul untuk membuat server HTTP
const fs = require("fs"); // Modul untuk membaca file
const path = require("path"); // Modul untuk mengelola path file/direktori
const UserController = require("./controllers/UserController"); // Import controller untuk logika aplikasi

// 2. Membuat server HTTP
const server = http.createServer((req, res) => {
  // 3. Menangani permintaan file CSS
  if (req.url.startsWith("/styles/")) {
    // Mendapatkan path lengkap file CSS
    const filePath = path.join(__dirname, req.url);
    // Membaca file CSS
    fs.readFile(filePath, (err, content) => {
      if (err) {
        // Jika file tidak ditemukan, kirim response 404
        res.writeHead(404);
        res.end("File not found");
        return;
      }
      // Jika berhasil, kirim file CSS
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(content);
    });
    return;
  }

  // 4. Menangani routing aplikasi
  // 4a. Untuk method GET (membaca data/halaman)
  if (req.method === "GET") {
    if (req.url === "/" || req.url === "/index.html") {
      UserController.index(res); // Tampilkan halaman utama
    } else if (req.url === "/add") {
      UserController.showAddForm(res); // Tampilkan form tambah user
    } else if (req.url.startsWith("/edit/")) {
      const id = parseInt(req.url.split("/")[2]); // Ambil ID dari URL
      UserController.showEditForm(res, id); // Tampilkan form edit
    } else if (req.url.startsWith("/delete/")) {
      const id = parseInt(req.url.split("/")[2]); // Ambil ID dari URL
      UserController.delete(res, id); // Hapus data user
    } else {
      UserController.notFound(res); // Tampilkan 404 jika route tidak ditemukan
    }
  } 
  // 4b. Untuk method POST (menambah/mengubah data)
  else if (req.method === "POST") {
    if (req.url === "/add") {
      UserController.create(req, res); // Proses tambah user baru
    } else if (req.url.startsWith("/edit/")) {
      const id = parseInt(req.url.split("/")[2]); // Ambil ID dari URL
      UserController.update(req, res, id); // Proses update data user
    } else {
      UserController.notFound(res); // Tampilkan 404 jika route tidak ditemukan
    }
  }
});

// 5. Menentukan port dan menjalankan server
const PORT = process.env.PORT || 3000; // Gunakan port dari environment atau 3000
server.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
