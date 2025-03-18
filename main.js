let menuIcon = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('activate');
    navlist.classList.toggle('activate');
    document.body.classList.toggle('open');
});

navlist.addEventListener('click', () => {
    navlist.classList.remove('activate');
    menuIcon.classList.remove('activate');
    document.body.classList.remove('open');
})


let text = document.querySelector('.text p');

text.innerHTML = text.innerHTML.split("").map((char, i) => 
    `<b style="transform:rotate(${i * 6.3}deg)">${char}</b>`).join("");

const buttons = document.querySelectorAll('[.about-btn button]');
const contents = document.querySelectorAll('.about-content');

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        contents.forEach((content) => {
            content.classList.remove('active');
        });
        contents[index].style.display = 'block';
        buttons.forEach((button) => {
            button.classList.remove('active');
        });
        button.classList.add('active');
    });
});


var mixer = mixitup('.portfolio-container', {
    selectors: {
        target: '.portfolio-item'
    },
    animation: {
        duration: 300
    }
});


var swiper = new Swiper(".review-slider", {
    slidePerView: 1,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay:{
        delay: 3000,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

window.addEventListener("scroll", () => {
    if (!skillsPlayed)
    skillsCounter();
})

function hasReached(el) {
    let topPosition = el.getBoundingClientRect().top;
    if (window.innerHeight >= topPosition + el.offsetHeight) return true;
    return false;
}

function updateCount(num, maxNum) {
    let currentNum = +num.innerText;
    if (currentNum < maxNum) {
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum);
        }, 12);
    }
}

let skillsPlayed = false;

function skillsCounter() {
    if (!hasReached(first_skill)) return;
    skillsPlayed = true;
    sk_counters.forEach((counter, i) => {
        let target = +counter.dataset.target;
        let strokeDashoffset = 440 - 440 * (target / 100);
        progress_bars[i].style.strokeDashoffset = strokeDashoffset;
        updateCount(counter, target);
    },400)

}

progress_bars.forEach((p) => (p.style.animation = "progress 2s ease-in-out forwards"));

// side progress bar

let calcScrollValue = () => {
    let scrollProgress = document.getElementById("scroll-progress");
    let pos = document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);

    if (pos > 100) {
        scrollProgress.style.display = "grid";
    } else {
        scrollProgress.style.display = "none";
    }
    scrollProgress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });
   
    scrollProgress.addEventListener("click",() => {
        scrollProgress.style.display = "none";
    });

    scrollProgress.style.background = `conic-gradient(#fff ${scrollValue}%,#e6006d ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// active menu 

let menuLi = document.querySelectorAll("header ul li a");
let section = document.querySelectorAll('section');

function activeMenu(){
    let len = section.length;
    while(--len && window.scrollY + 97 < section[len].offsetTop){}
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}
activeMenu();
window.addEventListener("scroll",activeMenu);

// scroll reveal

ScrollReveal({ 
    distance:"90px",
    duration:2000,
    delay:200,
    // reset: true ,
});


ScrollReveal().reveal('.hero-info,.main-text,.proposal,.heading', { origin: "top" });
ScrollReveal().reveal('.about-img,.fillter-buttons,.contact-info', { origin: "left" });
ScrollReveal().reveal('.about-content,.skills', { origin: "right" });
ScrollReveal().reveal('.allServices,.portfolio-gallery,.blog-box,footer,.img-hero', { origin: "bottom" });
