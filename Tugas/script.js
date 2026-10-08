// Memuat data dari Local Storage saat halaman dibuka
document.addEventListener('DOMContentLoaded', () => {
    tampilkanDaftar();

    // Event listener untuk tombol Enter
    document.getElementById("itemInput").addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            tambahItem();
        }
    });
});

// Fungsi untuk menambah item
function tambahItem() {
    const input = document.getElementById('itemInput');
    const teksItem = input.value.trim();

    if (teksItem === '') {
        alert('Harap masukkan nama item!');
        return;
    }

    const daftar = ambilDataDariStorage();
    daftar.push(teksItem);
    
    simpanKeStorage(daftar);
    tampilkanDaftar();

    input.value = ''; // Kosongkan kolom input
}

// Fungsi untuk menampilkan seluruh daftar ke layar
function tampilkanDaftar() {
    const listElement = document.getElementById('shoppingList');
    listElement.innerHTML = '';

    const daftar = ambilDataDariStorage();

    daftar.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;

        // Tombol hapus item individu
        const hapusBtn = document.createElement('button');
        hapusBtn.textContent = 'X';
        hapusBtn.className = 'delete-btn';
        hapusBtn.onclick = function() {
            hapusItem(index);
        };

        li.appendChild(hapusBtn);
        listElement.appendChild(li);
    });
}

// Fungsi untuk menghapus 1 item
function hapusItem(index) {
    const daftar = ambilDataDariStorage();
    daftar.splice(index, 1);
    simpanKeStorage(daftar);
    tampilkanDaftar();
}

// Fungsi untuk menghapus semua item
function hapusSemua() {
    if (confirm('Apakah Anda yakin ingin menghapus seluruh daftar belanja?')) {
        localStorage.removeItem('daftarBelanja');
        tampilkanDaftar();
    }
}

// Helper: Mengambil data dari Local Storage
function ambilDataDariStorage() {
    const data = localStorage.getItem('daftarBelanja');
    return data ? JSON.parse(data) : [];
}

// Helper: Menyimpan data ke Local Storage
function simpanKeStorage(daftar) {
    localStorage.setItem('daftarBelanja', JSON.stringify(daftar));
}