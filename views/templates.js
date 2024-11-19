class Templates {
  static header() {
    return `
        <!DOCTYPE html>
        <html>
        <head>
          <title>JSON CRUD</title>
          <link rel="stylesheet" type="text/css" href="/styles/style.css">
        </head>
        <body>
      `;
  }

  static footer() {
    return `
        </body>
        </html>
      `;
  }

  // Method userList() untuk menampilkan daftar user dalam bentuk tabel
  // - Menerima parameter users yang berisi array data user
  // - Menggabungkan header, konten tabel, dan footer
  static userList(users) {
    return `
        ${this.header()}
        <div class="container-fluid">
          <div class="">
            <h1>JSON CRUD (Create, Read, Update, Delete)</h1>
          </div>
          <div class="">
            <button type="button" class="create">
              <a href="/add">Create</a>
            </button>
          </div>
          <div class="">
            <table class="table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Height</th>
                  <th>Weight</th>
                  <th>Birthdate</th>
                  <th>Is Married</th>
                <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${users
                  .map((user, index) => this.userRow(user, index))
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
        ${this.footer()}
      `;
  }

  // Method userRow() untuk membuat baris tabel untuk setiap user
  // - Menerima data user dan index
  // - Menampilkan data user dan tombol aksi (edit & delete)
  static userRow(user, index) {
    return `
        <tr>
          <td>${index + 1}</td>
          <td>${user.name}</td>
          <td>${user.height}</td>
          <td>${user.weight}</td>
          <td>${user.birthdate}</td>
          <td>${user.married}</td>
          <td>
            <div class="action">
              <a href="/edit/${index}">Edit</a>
              <a href="/delete/${index}"
               onclick="return confirm('Yakin ingin menghapus data ${
                 user.name
               }?')">Delete</a>
            </div>
          </td>
        </tr>
      `;
  }

  // Method userForm() untuk menampilkan form tambah/edit user
  // - Menerima data user (opsional) dan action form
  // - Jika ada data user, form diisi dengan data tersebut (mode edit)
  // - Jika tidak ada data user, form kosong (mode tambah)
  static userForm(user = {}, action = "/add") {
    return `
        ${this.header()}
        <div class="container-fluid">
          <div class="">
            <form method="POST" action="${action}">
              <div class="form-group">
                <input type="text" name="name" placeholder="Name" value="${
                  user.name || ""
              }" required>
            </div>
            <div class="form-group">
                <input type="number" name="height" placeholder="Height (cm)" value="${
                  user.height || ""
                }" required>
              </div>
              <div class="form-group">
                <input type="number" name="weight" step="0.01" placeholder="Weight (kg)" value="${
                user.weight || ""
              }" required>
            </div>
            <div class="form-group">
              <input type="date" name="birthdate" value="${
                user.birthdate || ""
              }" required>
            </div>
            <div class="form-group">
              <select name="married" required>
                <option value="" disabled ${
                  !user.married ? "selected" : ""
                }>Is Married?</option>
                <option value="true" ${
                  user.married === "Yes" ? "selected" : ""
                }>True</option>
                <option value="false" ${
                  user.married === "Not Yet" ? "selected" : ""
                }>False</option>
              </select>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-green">Save</button>
              <button type="button" class="btn-blue">
                <a href="/">Cancel</a>
              </button>
            </div>
            </form>
          </div>
        </div>
        ${this.footer()}
      `;
  }
}

module.exports = Templates;
