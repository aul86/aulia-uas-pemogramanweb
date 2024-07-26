document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const pageTitle = document.getElementById('page-title');
    const contentSection = document.getElementById('content');
    const formContainer = document.getElementById('form-container');
    const authContainer = document.querySelector('.auth-container');
    const dashboardContainer = document.querySelector('.dashboard-container');

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    // Show login form by default
    authContainer.style.display = 'block';
    dashboardContainer.style.display = 'none';

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Simulate login
        authContainer.style.display = 'none';
        dashboardContainer.style.display = 'block';
        document.querySelector('.nav-item[data-content="dashboard"]').click();
    });

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Simulate registration
        alert('Registrasi berhasil! Silakan login.');
        showRegisterLink.click();
    });

    showRegisterLink.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'block';
    });

    showLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
    });

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const content = this.getAttribute('data-content');
            pageTitle.textContent = content.charAt(0).toUpperCase() + content.slice(1);
            switch (content) {
                case 'dashboard':
                    contentSection.innerHTML = `
                        <h2>Welcome to the Dashboard</h2>
                        <p>Here you can access various sections of the application.</p>
                    `;
                    contentSection.style.display = 'block';
                    formContainer.style.display = 'none';
                    break;
                case 'presensi':
                    contentSection.innerHTML = `
                        <h2>Presensi</h2>
                        <table class="table-container">
                            <thead>
                                <tr>
                                    <th>Nama Mahasiswa</th>
                                    <th>Status Kehadiran</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${Array.from({ length: 40 }, (_, i) => `
                                    <tr>
                                        <td>Mahasiswa ${i + 1}</td>
                                        <td>
                                            <select>
                                                <option value="hadir">Hadir</option>
                                                <option value="tidak-hadir">Tidak Hadir</option>
                                            </select>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    `;
                    contentSection.style.display = 'block';
                    formContainer.style.display = 'none';
                    break;
                case 'jadwal':
                    contentSection.innerHTML = `
                        <h2>Jadwal Perkuliahan</h2>
                        <div class="jadwal-box">
                            <div class="day-box">Senin<br>09:00 - 11:00</div>
                            <div class="day-box">Selasa<br>10:00 - 12:00</div>
                            <div class="day-box">Rabu<br>13:00 - 15:00</div>
                            <div class="day-box">Kamis<br>08:00 - 10:00</div>
                            <div class="day-box">Jumat<br>11:00 - 13:00</div>
                            <div class="day-box">Sabtu<br>09:00 - 11:00</div>
                        </div>
                    `;
                    contentSection.style.display = 'block';
                    formContainer.style.display = 'none';
                    break;
                case 'ujian':
                    const ujianDropdown = document.createElement('div');
                    const ujianDetails = document.createElement('div');

                    ujianDropdown.innerHTML = `
                        <h2>Jadwal Ujian</h2>
                        <div class="ujian-dropdown">
                            <select id="bulan-ujian">
                                <option value="juni">Juni</option>
                                <option value="juli">Juli</option>
                                <option value="agustus">Agustus</option>
                            </select>
                        </div>
                    `;
                    ujianDetails.className = 'ujian-details';
                    ujianDropdown.appendChild(ujianDetails);
                    contentSection.innerHTML = '';
                    contentSection.appendChild(ujianDropdown);
                    contentSection.style.display = 'block';
                    formContainer.style.display = 'none';

                    document.getElementById('bulan-ujian').addEventListener('change', function() {
                        const bulan = this.value;
                        let ujianHTML = '';

                        if (bulan === 'juni') {
                            ujianHTML = '<p>Ujian pada tanggal 5 dan 15 Juni 2024</p>';
                        } else if (bulan === 'juli') {
                            ujianHTML = '<p>Ujian pada tanggal 10 dan 20 Juli 2024</p>';
                        } else if (bulan === 'agustus') {
                            ujianHTML = '<p>Ujian pada tanggal 5, 12, 19, dan 26 Agustus 2024</p>';
                        }

                        ujianDetails.innerHTML = ujianHTML;
                        ujianDetails.style.display = 'block';
                    });
                    break;
                case 'email':
                    contentSection.innerHTML = `
                        <h2>Email</h2>
                        <p>Email Pemilik Akun: <span id="email-akun">Aulia@gmail.com</span></p>
                    `;
                    contentSection.style.display = 'block';
                    formContainer.style.display = 'none';
                    break;
                case 'rekapitulasi':
                    contentSection.style.display = 'none';
                    formContainer.innerHTML = `
                        <div class="form-container rekapitulasi">
                            <h2>Rekapitulasi Nilai</h2>
                            <form>
                                <table class="table-container">
                                    <thead>
                                        <tr>
                                            <th>Nama Mahasiswa</th>
                                            <th>NIM</th>
                                            <th>Program Studi</th>
                                            ${Array.from({ length: 14 }, (_, i) => `<th>Periode ${i + 1}</th>`).join('')}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><input type="text" name="nama" required></td>
                                            <td><input type="text" name="nim" required></td>
                                            <td><input type="text" name="program" required></td>
                                            ${Array.from({ length: 14 }, (_, i) => `<td><input type="number" name="nilai-${i + 1}" required></td>`).join('')}
                                        </tr>
                                    </tbody>
                                </table>
                                <button type="submit">Simpan</button>
                            </form>
                            <h2>Tambah Data Mahasiswa</h2>
                            <form id="tambahDataForm">
                                <label for="nama-mahasiswa">Nama Mahasiswa:</label>
                                <input type="text" id="nama-mahasiswa" name="nama-mahasiswa" required>

                                <label for="nim-mahasiswa">NIM:</label>
                                <input type="text" id="nim-mahasiswa" name="nim-mahasiswa" required>

                                <label for="kelas-mahasiswa">Kelas:</label>
                                <input type="text" id="kelas-mahasiswa" name="kelas-mahasiswa" required>

                                <label for="tahun-ajar">Tahun Ajar:</label>
                                <input type="text" id="tahun-ajar" name="tahun-ajar" required>

                                <button type="submit">Tambah</button>
                            </form>
                        </div>
                    `;
                    formContainer.style.display = 'block';
                    break;
            }
        });
    });

    document.querySelector('.nav-item[data-content="dashboard"]').click();
});
