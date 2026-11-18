
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
   ATTENDANCE CONFIRMATION
============================== */

// When user clicks NO
function noNotification() {
    document.getElementById("noModal").classList.add("show");
}

function closeNoModal() {
    document.getElementById("noModal").classList.remove("show");

    confirmAttendance();
}


// When user clicks YES or after NO notification
function confirmAttendance() {

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

    // Display BACK button on success page
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

    // Hide success page navigation
    document.getElementById("successNavigation")
        .style.display = "none";

    // Return to Page 3
    showPage(3);

    // Hide navigation buttons on Page 3
    document.querySelector("#page3 .navigation")
        .style.display = "none";
}


/* ==============================
   INITIALIZE WEBSITE
============================== */

document.addEventListener("DOMContentLoaded", () => {

    showPage(1);

});
