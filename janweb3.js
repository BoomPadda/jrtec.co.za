const now = new Date();
const currentDay = now.getDay();
const currentHour = now.getHours();
const workingHours = [
    { day: 0, open: false },
    { day: 1, open: true, start: 8, end: 17 },
    { day: 2, open: true, start: 8, end: 17 },
    { day: 3, open: true, start: 8, end: 17 },
    { day: 4, open: true, start: 8, end: 17 },
    { day: 5, open: true, start: 8, end: 17 },
    { day: 6, open: false }
];

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const todayWorkingHours = workingHours.find(day => day.day === currentDay);

const getNextOpeningDay = () => {
    for (let i = 1; i <= 7; i++) {
        const nextDayIndex = (currentDay + i) % 7;
        const nextDay = workingHours.find(day => day.day === nextDayIndex);
        if (nextDay && nextDay.open) {
            return nextDay;
        }
    }
    return null;
};

if (todayWorkingHours) {
    if (todayWorkingHours.open) {
        if (currentHour >= todayWorkingHours.start && currentHour < todayWorkingHours.end) {
            document.getElementById('status').textContent = `Currently open till ${todayWorkingHours.end}:00`;
        } else if (currentHour < todayWorkingHours.start) {
            document.getElementById('status').textContent = `Open today at ${todayWorkingHours.start}:00`;
        } else {
            const nextOpeningDay = getNextOpeningDay();
            if (nextOpeningDay) {
                const nextDayName = daysOfWeek[nextOpeningDay.day];
                const timePhrase = (nextOpeningDay.day - currentDay === 1) ? 'tomorrow' : `on ${nextDayName}`;
                document.getElementById('status').textContent = `Closed now, will open ${timePhrase} at ${nextOpeningDay.start}:00`;
            }
        }
    } else {
        const nextOpeningDay = getNextOpeningDay();
        if (nextOpeningDay) {
            const nextDayName = daysOfWeek[nextOpeningDay.day];
            const timePhrase = (nextOpeningDay.day - currentDay === 1) ? 'tomorrow' : `on ${nextDayName}`;
            document.getElementById('status').textContent = `Closed today, will open ${timePhrase} at ${nextOpeningDay.start}:00`;
        } else {
            document.getElementById('status').textContent = 'Closed today';
        }
    }
} else {
    document.getElementById('status').textContent = 'No working hours defined for today';
}


document.querySelector('.hamburger-icon').addEventListener('click', function () {
    document.querySelector('.nav-list').classList.toggle('active');
});

function openModal(imageSrc) {
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imageSrc;
    const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
    imageModal.show();
}

// //Get the button:
// var mybutton = document.getElementById("back-to-top");

// // When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function () { scrollFunction() };

// function scrollFunction() {
//     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//         mybutton.style.display = "block";
//     } else {
//         mybutton.style.display = "none";
//     }
// }

// // When the user clicks on the button, scroll to the top of the document
// mybutton.addEventListener("click", function () {
//     document.body.scrollTop = 0; // For Safari
//     document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
// });

document.addEventListener("DOMContentLoaded", function () {
    let scrollToTopButton = document.getElementById("scrollToTopButton");

    // When the user scrolls down 20px from the top, show the button
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 20) {
            scrollToTopButton.style.display = "block";
        } else {
            scrollToTopButton.style.display = "none";
        }
    });

    // When the user clicks on the button, scroll to the top of the document
    scrollToTopButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

