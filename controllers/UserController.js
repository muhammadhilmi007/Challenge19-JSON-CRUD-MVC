const UserModel = require('../models/UserModel');
const Templates = require('../views/templates');

// Penjelasan:
// 1. File ini adalah UserController yang berfungsi sebagai pengontrol logika aplikasi
// 2. Mengimport UserModel untuk akses database dan Templates untuk tampilan HTML
// 3. Menggunakan class dengan static methods agar bisa diakses tanpa instansiasi

class UserController {
  // Method untuk menampilkan daftar user
  // - Mengambil semua data user dari model
  // - Mengirim response berupa HTML yang berisi tabel user
  static index(res) {
    const users = UserModel.getAll();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(Templates.userList(users));
  }

  // Method untuk menampilkan form tambah user baru
  // - Menampilkan form kosong untuk input data user baru
  static showAddForm(res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(Templates.userForm());
  }

  // Method untuk menampilkan form edit user
  // - Menerima ID user yang akan diedit
  // - Mengambil data user tersebut dan menampilkan di form
  static showEditForm(res, id) {
    const users = UserModel.getAll();
    if (id >= 0 && id < users.length) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(Templates.userForm(users[id], `/edit/${id}`));
    } else {
      this.notFound(res);
    }
  }

  // Method untuk memproses penambahan data user baru
  // - Menerima data dari form dalam bentuk POST request
  // - Mengubah data form menjadi object userData
  // - Menyimpan ke database melalui model
  static create(req, res) {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      const params = new URLSearchParams(body);
      const userData = {
        name: params.get('name'),
        height: params.get('height'), 
        weight: params.get('weight'),
        birthdate: params.get('birthdate'),
        married: params.get('married')
      };
      
      if (UserModel.create(userData)) {
        this.redirect(res, '/');
      } else {
        this.serverError(res);
      }
    });
  }

  // Method untuk memproses update data user
  // - Mirip dengan create, tapi untuk mengupdate data yang sudah ada
  // - Menerima ID user yang akan diupdate
  static update(req, res, id) {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      const params = new URLSearchParams(body);
      const userData = {
        name: params.get('name'),
        height: params.get('height'),
        weight: params.get('weight'),
        birthdate: params.get('birthdate'),
        married: params.get('married')
      };
      
      if (UserModel.update(id, userData)) {
        this.redirect(res, '/');
      } else {
        this.serverError(res);
      }
    });
  }

  // Method untuk menghapus data user
  // - Menerima ID user yang akan dihapus
  // - Memanggil method delete di model
  static delete(res, id) {
    if (UserModel.delete(id)) {
      this.redirect(res, '/');
    } else {
      this.notFound(res);
    }
  }

  // Helper methods untuk keperluan response
  // redirect: Untuk pengalihan halaman
  static redirect(res, location) {
    res.writeHead(302, { Location: location });
    res.end();
  }

  // notFound: Untuk menampilkan error 404
  static notFound(res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }

  // serverError: Untuk menampilkan error 500
  static serverError(res) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
}

// Export class agar bisa digunakan di file lain
module.exports = UserController;