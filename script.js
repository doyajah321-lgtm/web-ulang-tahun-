/* =====================================================
   BIRTHDAY WEBSITE SCRIPT
===================================================== */


/* =====================================================
   TANGGAL ULANG TAHUN
===================================================== */

/*
   GANTI TANGGAL DI SINI

   Contoh:
   "2026-12-25T00:00:00"

   Kalau ulang tahunnya 25 Desember 2026.
*/

const birthdayDate = new Date(
    "2026-10-06T08:30:00"
).getTime();



/* =====================================================
   COUNTDOWN
===================================================== */

function updateCountdown() {

    const now = new Date().getTime();

    const distance = birthdayDate - now;


    if (distance <= 0) {

        document.getElementById("days").innerText = "00";

        document.getElementById("hours").innerText = "00";

        document.getElementById("minutes").innerText = "00";

        document.getElementById("seconds").innerText = "00";

        return;

    }


    const days = Math.floor(
        distance /
        (1000 * 60 * 60 * 24)
    );


    const hours = Math.floor(
        (distance %
            (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );


    const minutes = Math.floor(
        (distance %
            (1000 * 60 * 60)) /
        (1000 * 60)
    );


    const seconds = Math.floor(
        (distance %
            (1000 * 60)) /
        1000
    );


    document.getElementById("days").innerText =
        String(days).padStart(2, "0");


    document.getElementById("hours").innerText =
        String(hours).padStart(2, "0");


    document.getElementById("minutes").innerText =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds").innerText =
        String(seconds).padStart(2, "0");

}


setInterval(
    updateCountdown,
    1000
);

updateCountdown();



/* =====================================================
   PAGE SWITCH
===================================================== */

function showPage(pageId) {

    const pages =
        document.querySelectorAll(".page");


    pages.forEach(page => {

        page.classList.remove("active");

        page.classList.add("hidden");

    });


    const selectedPage =
        document.getElementById(pageId);


    selectedPage.classList.remove("hidden");

    selectedPage.classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    /* BUNGA BARU */

    createFlowersForPage(pageId);

}



/* =====================================================
   OPEN SURPRISE
===================================================== */

function startSurprise() {

    const music =
        document.getElementById(
            "birthdayMusic"
        );


    music.volume = 0.35;


    /*
       Browser biasanya hanya mengizinkan
       audio setelah user menekan tombol.
    */

    music.play().catch(() => {

        console.log(
            "Music menunggu interaksi user."
        );

    });


    showPage("giftPage");

}



/* =====================================================
   OPEN GIFT
===================================================== */

function openGift() {

    showPage("birthdayPage");

}



/* =====================================================
   SHOW MEMORIES
===================================================== */

function showMemories() {

    showPage("memoriesPage");

}



/* =====================================================
   SHOW VIDEO
===================================================== */

function showVideo() {

    showPage("videoPage");

}



/* =====================================================
   SHOW FINAL
===================================================== */

function showFinal() {

    const video =
        document.getElementById(
            "memoryVideo"
        );


    /*
       Video dihentikan ketika
       pindah halaman.
    */

    if (video) {

        video.pause();

    }


    showPage("finalPage");

}



/* =====================================================
   RESTART
===================================================== */

function restartWebsite() {

    const video =
        document.getElementById(
            "memoryVideo"
        );


    if (video) {

        video.pause();

        video.currentTime = 0;

    }


    showPage("opening");

}



/* =====================================================
   FLOWER RAIN
===================================================== */

const flowerSymbols = [

    "✿",
    "❀",
    "✾",
    "✽",
    "❁",
    "🌸",
    "♡"

];


function createFlower(container) {

    const flower =
        document.createElement("div");


    flower.classList.add(
        "flower"
    );


    flower.innerText =
        flowerSymbols[
            Math.floor(
                Math.random() *
                flowerSymbols.length
            )
        ];


    /*
       Posisi horizontal acak
    */

    flower.style.left =
        Math.random() * 100 + "%";


    /*
       Ukuran bunga acak
    */

    const size =
        Math.random() * 12 + 10;


    flower.style.fontSize =
        size + "px";


    /*
       Kecepatan jatuh
    */

    const duration =
        Math.random() * 5 + 5;


    flower.style.animationDuration =
        duration + "s";


    /*
       Delay sedikit supaya
       bunga tidak jatuh bersamaan.
    */

    flower.style.animationDelay =
        Math.random() * 2 + "s";


    container.appendChild(
        flower
    );


    /*
       Hapus bunga setelah selesai
    */

    setTimeout(() => {

        flower.remove();

    }, (duration + 3) * 1000);

}



/* =====================================================
   CREATE FLOWERS
===================================================== */

function createFlowersForPage(pageId) {

    const container =
        document.querySelector(
            `#flowerRain${capitalize(pageId)}`
        );


    /*
       Opening punya id flowerRain
    */

    if (pageId === "opening") {

        createContinuousFlowers(
            document.getElementById(
                "flowerRain"
            )
        );

        return;

    }


    if (!container) {

        return;

    }


    createContinuousFlowers(
        container
    );

}



/* =====================================================
   CAPITALIZE
===================================================== */

function capitalize(text) {

    return text.charAt(0).toUpperCase()
        + text.slice(1);

}



/* =====================================================
   CONTINUOUS FLOWER
===================================================== */

let flowerIntervals = [];


function createContinuousFlowers(container) {

    if (!container) {

        return;

    }


    /*
       Tambahkan bunga langsung
    */

    for (let i = 0; i < 12; i++) {

        setTimeout(() => {

            createFlower(
                container
            );

        }, i * 250);

    }


    /*
       Hujan bunga terus menerus
    */

    const interval =
        setInterval(() => {

            createFlower(
                container
            );

        }, 450);


    flowerIntervals.push(
        interval
    );

}



/* =====================================================
   START FLOWER RAIN
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        createContinuousFlowers(
            document.getElementById(
                "flowerRain"
            )
        );

    }
);



/* =====================================================
   VIDEO
===================================================== */

const memoryVideo =
    document.getElementById(
        "memoryVideo"
    );


if (memoryVideo) {

    memoryVideo.addEventListener(
        "play",
        () => {

            /*
               Saat video diputar,
               background music berhenti.
            */

            const music =
                document.getElementById(
                    "birthdayMusic"
                );


            if (music) {

                music.pause();

            }

        }
    );


    memoryVideo.addEventListener(
        "ended",
        () => {

            /*
               Setelah video selesai,
               musik background boleh hidup lagi.
            */

            const music =
                document.getElementById(
                    "birthdayMusic"
                );


            if (music) {

                music.play().catch(
                    () => {}
                );

            }

        }
    );

}