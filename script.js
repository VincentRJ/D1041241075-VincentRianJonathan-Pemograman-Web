document.addEventListener('DOMContentLoaded', function () {

    // Nama tamu dari link, contoh: index.html?tamu=Vincent%20Rian%20Jonathan
    const parameterUrl = new URLSearchParams(window.location.search);
    const namaTamuDariUrl = parameterUrl.get('tamu');

    if (namaTamuDariUrl) {
        document.getElementById('namaTamu').textContent = namaTamuDariUrl;
        document.getElementById('nama').value = namaTamuDariUrl;
    }

    // Sampul pembuka
    const sampulPembuka = document.getElementById('sampulPembuka');
    const tombolBuka = document.getElementById('tombolBukaUndangan');
    const musikLatar = document.getElementById('musikLatar');
    const tombolMusik = document.getElementById('tombolMusik');

    tombolBuka.addEventListener('click', function () {
        sampulPembuka.classList.add('tersembunyi');
        document.body.classList.remove('terkunci');

        // audio hanya bisa diputar setelah ada klik dari pengguna
        musikLatar.play()
            .then(function () {
                tombolMusik.textContent = '⏸';
            })
            .catch(function () {
                // file musik tidak ditemukan / diblokir, tombol musik tetap bisa dipakai manual
            });
    });

    // Tombol musik
    tombolMusik.addEventListener('click', function () {
        if (musikLatar.paused) {
            musikLatar.play();
            tombolMusik.textContent = '⏸';
        } else {
            musikLatar.pause();
            tombolMusik.textContent = '🎵';
        }
    });

    // Hitung mundur
    const tanggalAcara = new Date('2026-12-12T09:00:00').getTime();
    let intervalHitungMundur;

    function perbaruiHitungMundur() {
        const sisaWaktu = tanggalAcara - new Date().getTime();

        if (sisaWaktu < 0) {
            document.querySelector('.baris-hitung-mundur').innerHTML =
                '<p style="font-size: 20px;">Hari bahagia telah tiba! 🎉</p>';
            clearInterval(intervalHitungMundur);
            return;
        }

        const hari = Math.floor(sisaWaktu / (1000 * 60 * 60 * 24));
        const jam = Math.floor((sisaWaktu % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const menit = Math.floor((sisaWaktu % (1000 * 60 * 60)) / (1000 * 60));
        const detik = Math.floor((sisaWaktu % (1000 * 60)) / 1000);

        document.getElementById('cdHari').textContent = String(hari).padStart(2, '0');
        document.getElementById('cdJam').textContent = String(jam).padStart(2, '0');
        document.getElementById('cdMenit').textContent = String(menit).padStart(2, '0');
        document.getElementById('cdDetik').textContent = String(detik).padStart(2, '0');
    }

    perbaruiHitungMundur();
    intervalHitungMundur = setInterval(perbaruiHitungMundur, 1000);

    // Form RSVP 
    const formRSVP = document.getElementById('formRSVP');
    const pesanTerimaKasih = document.getElementById('pesanTerimaKasih');

    formRSVP.addEventListener('submit', function (peristiwa) {
        peristiwa.preventDefault();

        formRSVP.reset();
        pesanTerimaKasih.style.display = 'block';

        setTimeout(function () {
            pesanTerimaKasih.style.display = 'none';
        }, 5000);
    });

    // Lightbox galeri
    const semuaFotoGaleri = document.querySelectorAll('.kotak-galeri img');
    const lightbox = document.getElementById('lightbox');
    const gambarLightbox = document.getElementById('gambarLightbox');
    const tutupLightbox = document.getElementById('tutupLightbox');

    semuaFotoGaleri.forEach(function (foto) {
        foto.addEventListener('click', function () {
            gambarLightbox.src = foto.src;
            lightbox.classList.add('tampil');
        });
    });

    function tutupLightboxFungsi() {
        lightbox.classList.remove('tampil');
    }

    tutupLightbox.addEventListener('click', tutupLightboxFungsi);

    lightbox.addEventListener('click', function (peristiwa) {
        if (peristiwa.target === lightbox) {
            tutupLightboxFungsi();
        }
    });

    // Popup wedding gift
    const tombolBeriKado = document.getElementById('tombolBeriKado');
    const modalKado = document.getElementById('modalKado');
    const tutupModalKado = document.getElementById('tutupModalKado');
    const semuaTombolSalin = document.querySelectorAll('.tombol-salin');

    tombolBeriKado.addEventListener('click', function () {
        modalKado.classList.add('tampil');
    });

    tutupModalKado.addEventListener('click', function () {
        modalKado.classList.remove('tampil');
    });

    modalKado.addEventListener('click', function (peristiwa) {
        if (peristiwa.target === modalKado) {
            modalKado.classList.remove('tampil');
        }
    });

    semuaTombolSalin.forEach(function (tombol) {
        tombol.addEventListener('click', function () {
            const nomorRekening = tombol.getAttribute('data-rekening');

            navigator.clipboard.writeText(nomorRekening).then(function () {
                const teksAsli = tombol.textContent;
                tombol.textContent = 'Tersalin!';

                setTimeout(function () {
                    tombol.textContent = teksAsli;
                }, 2000);
            });
        });
    });

    // Animasi muncul saat scroll
    const elemenReveal = document.querySelectorAll('.reveal');

    const pengamatScroll = new IntersectionObserver(function (daftarElemen) {
        daftarElemen.forEach(function (elemen) {
            if (elemen.isIntersecting) {
                elemen.target.classList.add('tampak');
            }
        });
    }, {
        threshold: 0.15
    });

    elemenReveal.forEach(function (elemen) {
        pengamatScroll.observe(elemen);
    });

    // Butiran emas & kelopak jatuh
    const jumlahDesktop = 26;
    const jumlahHP = 14;

    function buatEfekJatuh(wadah, seluruhHalaman) {
        const lapisan = document.createElement('div');
        lapisan.className = seluruhHalaman ? 'lapisan-butiran seluruh-halaman' : 'lapisan-butiran';
        lapisan.setAttribute('aria-hidden', 'true');

        const jumlah = window.innerWidth < 600 ? jumlahHP : jumlahDesktop;

        for (let i = 0; i < jumlah; i++) {
            const butiran = document.createElement('span');
            const kelopak = Math.random() < 0.2;
            const ukuran = kelopak ? 8 + Math.random() * 6 : 3 + Math.random() * 4;

            butiran.className = kelopak ? 'butiran kelopak' : 'butiran';
            butiran.style.left = (Math.random() * 100) + '%';
            butiran.style.width = ukuran + 'px';
            butiran.style.height = (kelopak ? ukuran * 1.4 : ukuran) + 'px';
            butiran.style.animationDuration = (9 + Math.random() * 9) + 's';
            butiran.style.animationDelay = '-' + (Math.random() * 18) + 's';
            butiran.style.setProperty('--geser', (Math.random() * 120 - 60) + 'px');
            butiran.style.setProperty('--putar', (Math.random() * 360) + 'deg');

            lapisan.appendChild(butiran);
        }

        wadah.insertBefore(lapisan, wadah.firstChild);
    }

    buatEfekJatuh(document.getElementById('sampulPembuka'));
    buatEfekJatuh(document.body, true);

});