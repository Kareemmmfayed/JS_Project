// Check local storage for main color

let mainCo = localStorage.getItem("color-option");
if (mainCo !== null) {
    document.documentElement.style.setProperty("--main-color", mainCo);
    document.querySelectorAll(".color-list li").forEach(element => {
        element.classList.remove("active");
        if (element.dataset.color === mainCo) {
            element.classList.add("active");
        }
        });
}


let backChange = true;
let backInter;
let backOpp = localStorage.getItem("backOp");
if (backOpp !== null) {
    if (backOpp === 'true') {
        backChange = true;
    } else {
        backChange = false;
    }
    document.querySelectorAll(".setting-box .box .back span").forEach(ele => {
        ele.classList.remove("active");
        if (backOpp === 'true') {
            document.querySelector(".back .yes").classList.add("active");
        } else {
            document.querySelector(".back .no").classList.add("active");
        }
        });
}


// Open settings box

document.querySelector(".toggle .fa-gear").onclick = function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open");
}


// Change color

const colorLi = document.querySelectorAll(".color-list li");
colorLi.forEach(li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        // store it in local storage 
        localStorage.setItem("color-option", e.target.dataset.color);
        // Active class
        handleActive(e);
    });
});


// Change background mode 

const backBtn = document.querySelectorAll(".setting-box .back span");
backBtn.forEach(sp => {
    sp.addEventListener("click", (e)=> {
        handleActive(e);
        if (e.target.dataset.background === "yes") {
                backChange = true;
                randomImg();
                localStorage.setItem("backOp", true);
        }
        else {
                backChange = false;
                clearInterval(backInter);
                localStorage.setItem("backOp", false);
        }
    });
});


// Change background color

let land = document.querySelector(".landing");
let imgAr = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"];

function randomImg() {
    if (backChange === true) {
        backInter = setInterval(() => {
            let random = Math.floor(Math.random() * imgAr.length);
            land.style.backgroundImage = 'url("Media/' + imgAr[random] + '")';
        }, 10000);
    }
}

randomImg();


// Progress 

let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
    let top = ourSkills.offsetTop;
    let it = ourSkills.offsetHeight;
    let winhi = this.innerHeight;
    let pagesc = this.pageYOffset;
    if (pagesc > (top + it - winhi)) {
        let sk = document.querySelectorAll(".skills .skill-prog span");
        sk.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
}


// Pop up box

let imgss = document.querySelectorAll(".gallery img");

imgss.forEach(em => {
    em.addEventListener("click", (e) => {
        let overlay1 = document.createElement("div");
        overlay1.className = "popUp";
        document.body.appendChild(overlay1);

        let popUpBox = document.createElement("div");
        popUpBox.className = "popUpBox";

        if (em.alt !== null) {
            let te = document.createElement("h3");
            let tecon = document.createTextNode(em.alt);
            te.appendChild(tecon);
            popUpBox.appendChild(te);
        }
        
        let popImg = document.createElement("img");
        popImg.src = em.src;
        popUpBox.appendChild(popImg);
        document.body.appendChild(popUpBox);

        let closeBu = document.createElement("span");
        closeBu.className = "closeBut";
        closeTe = document.createTextNode("X");
        closeBu.appendChild(closeTe);
        popUpBox.appendChild(closeBu);
    });
});

document.addEventListener("click", e => {
    if (e.target.className == "closeBut") {
        e.target.parentNode.remove();
        document.querySelector(".popUp").remove();
    }
})


// Bullets & Links

const bulls = document.querySelectorAll(".nav-bullets .bullet");

const linkss = document.querySelectorAll(".landing .links a");

function scrollToSomewhere (elements) {
    elements.forEach(ele => {

        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior : "smooth"
            });
        });
    });
};

scrollToSomewhere(bulls);
scrollToSomewhere(linkss);


function handleActive (ev) {
    ev.target.parentElement.querySelectorAll('.active').forEach(ele => {
        ele.classList.remove("active");
    });
    ev.target.classList.add('active');
};


// Show or Hide bullets

let bullspan = document.querySelectorAll(".setting-box .bull span");
let bullnav = document.querySelector(".nav-bullets");

let bulocal = localStorage.getItem("bulllocal");
if (bulocal !== null) {
    bullnav.style.display = bulocal;
    bullspan.forEach(span => {
        span.classList.remove("active");
    });
    if (bulocal === "block") {
        document.querySelector(".setting-box .bull .yes").classList.add("active");
    } else {
        document.querySelector(".setting-box .bull .no").classList.add("active");
    }
}

bullspan.forEach(span => {
    span.addEventListener("click", (e)=> {
        handleActive(e);
        if (span.dataset.display === "show") {
            bullnav.style.display = "block";
            localStorage.setItem("bulllocal", "block");

        } else {
            bullnav.style.display = "none";
            localStorage.setItem("bulllocal", "none");
        }
    });
});


// Reset 

document.querySelector(".reset-options").onclick = function () {

    // Removes All
    localStorage.clear();


    // localStorage.removeItem("color-option");
    // localStorage.removeItem("backOp");
    // localStorage.removeItem("bulllocal");

    // Reload window 
    window.location.reload();
};







