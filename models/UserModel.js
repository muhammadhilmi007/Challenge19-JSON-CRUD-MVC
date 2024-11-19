// Import modul fs (file system) untuk operasi file
const fs = require('fs');

// Membuat class UserModel untuk mengelola data user
class UserModel {
  // Constructor - dipanggil saat membuat instance baru
  // Menentukan lokasi file database JSON
  constructor() {
    this.dataFile = './database/data.json';
  }

  // Method untuk mengambil semua data user dari file JSON
  // - Membaca file menggunakan fs.readFileSync
  // - Mengubah string JSON menjadi object JavaScript dengan JSON.parse
  // - Jika gagal, tampilkan error dan return array kosong
  getAll() {
    try {
      const data = fs.readFileSync(this.dataFile, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Gagal membaca data:', err);
      return [];
    }
  }

  // Method untuk menyimpan data ke file JSON
  // - Mengubah object JavaScript menjadi string JSON dengan JSON.stringify
  // - Parameter null, 2 untuk format JSON yang rapi
  // - Menulis ke file menggunakan fs.writeFileSync
  // - Return true jika berhasil, false jika gagal
  save(data) {
    try {
      fs.writeFileSync(this.dataFile, JSON.stringify(data, null, 2));
      return true;
    } catch (err) {
      console.error('Gagal menyimpan data:', err);
      return false; 
    }
  }

  // Method untuk membuat data user baru
  // - Mengambil data yang ada dengan getAll()
  // - Menambah user baru ke array dengan push()
  // - Mengubah nilai married menjadi 'Yes' atau 'Not Yet'
  // - Menyimpan kembali dengan save()
  create(userData) {
    const users = this.getAll();
    users.push({
      ...userData,
      married: userData.married === 'true' ? 'Yes' : 'Not Yet'
    });
    return this.save(users);
  }

  // Method untuk mengupdate data user yang ada
  // - Mengambil data yang ada dengan getAll()
  // - Cek apakah id valid
  // - Jika valid, update data user pada index tersebut
  // - Menyimpan kembali dengan save()
  update(id, userData) {
    const users = this.getAll();
    if (id >= 0 && id < users.length) {
      users[id] = {
        ...userData,
        married: userData.married === 'true' ? 'Yes' : 'Not Yet'
      };
      return this.save(users);
    }
    return false;
  }

  // Method untuk menghapus data user
  // - Mengambil data yang ada dengan getAll()
  // - Cek apakah id valid
  // - Jika valid, hapus data dengan splice()
  // - Menyimpan kembali dengan save()
  delete(id) {
    const users = this.getAll();
    if (id >= 0 && id < users.length) {
      users.splice(id, 1);
      return this.save(users);
    }
    return false;
  }
}

// Export instance dari UserModel agar bisa digunakan di file lain
module.exports = new UserModel();