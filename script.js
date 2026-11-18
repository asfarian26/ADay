
/* ==============================
   PAGE NAVIGATION
============================== */

let currentPage = 1;
const totalPages = 4;

function showPage(pageNumber) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(`page${pageNumber}`)
        .classList.add("active");

    currentPage = pageNumber;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function nextPage() {
    if (currentPage < totalPages) {
        showPage(currentPage + 1);
    }
}

function previousPage() {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
}


/* ==============================
   PHOTO UPLOAD FUNCTION
============================== */

document.querySelectorAll(".photo-upload").forEach(input => {

    input.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            return;
        }

        const photoSlot = this.closest(".photo-slot");
        const image = photoSlot.querySelector("img");

        image.src = URL.createObjectURL(file);

        photoSlot.classList.add("has-image");

    });

});


/* ==============================
   EMAILJS CONFIGURATION
============================== */

// Replace these with your actual EmailJS credentials

const EMAILJS_PUBLIC_KEY = "-OwhrWxsejGBRaRUl";
const EMAILJS_SERVICE_ID = "service_32ybdtr";
const EMAILJS_TEMPLATE_ID = "template_87hih2p";


// Prevent duplicate email submissions
let attendanceEmailSent = false;


// Send attendance response to email
async function sendAttendanceEmail(response) {

    if (attendanceEmailSent) return;

    if (typeof emailjs === "undefined") {
        console.error("EmailJS SDK is not loaded.");
        alert("Email service is unavailable. Please try again.");
        return;
    }

    try {

        const templateParams = {

            to_email: "asfarinaaffian26@gmail.com",

            attendance: response,

            event_name: "Akid Azizi's Day",

            event_date: "21 November 2026",

            event_time: "11:00 AM - 8:00 PM",

            submitted_at: new Date().toLocaleString()

        };

        await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );

        attendanceEmailSent = true;

        console.log("Attendance email sent successfully!");

    } catch (error) {

        console.error("Email sending failed:", error);

        alert(
            "Your response was recorded on screen, but the email could not be sent. Please try again."
        );

    }

}


/* ==============================
   ATTENDANCE CONFIRMATION
============================== */

// When user clicks NO
function noNotification() {

    sendAttendanceEmail("NO");

    document.getElementById("noModal")
        .classList.add("show");

}


// Close NO notification
function closeNoModal() {

    document.getElementById("noModal")
        .classList.remove("show");

    showAttendanceSuccess();

}


// When user clicks YES
function confirmAttendance() {

    sendAttendanceEmail("YES");

    showAttendanceSuccess();

}


// Display success message
function showAttendanceSuccess() {

    const successMessage =
        document.getElementById("successMessage");

    const attendanceButtons =
        document.querySelector(".attendance-buttons");

    const attendanceQuestion =
        document.querySelector(".attendance-question");

    const attendanceBear =
        document.querySelector(".attendance-bear");

    const attendanceNote =
        document.querySelector(".attendance-note");

    successMessage.classList.add("show");

    attendanceButtons.style.display = "none";
    attendanceQuestion.style.display = "none";
    attendanceBear.style.display = "none";
    attendanceNote.style.display = "none";

    document.getElementById("successNavigation")
        .style.display = "flex";

    successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* ==============================
   BACK TO TENTATIVE
============================== */

function backToTentative() {

    document.getElementById("successNavigation")
        .style.display = "none";

    showPage(3);

    document.querySelector("#page3 .navigation")
        .style.display = "none";
}


/* ==============================
   INITIALIZE WEBSITE
============================== */

document.addEventListener("DOMContentLoaded", () => {

    showPage(1);

    // Initialize EmailJS
    if (typeof emailjs !== "undefined") {

        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
        });

    }

});
