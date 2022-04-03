/* Индекс слайда по умолчанию */
var slideIndex = 1;
showSlides(slideIndex);

/* Функция увеличивает индекс на 1, показывает следующй слайд*/
function plusSlide() {
    showSlides(slideIndex += 1);
}

/* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
function minusSlide() {
    showSlides(slideIndex -= 1);
}

/* Устанавливает текущий слайд */
function currentSlide(n) {
    showSlides(slideIndex = n);
}

/* Основная функция сладера */
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("item");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
}

function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");;
    setTimeout(() => { document.getElementById('degustaion-form').reset() }, 500);
    setTimeout(() => { popup.classList.toggle("show") }, 5000);
    return false;
}


function confirmingAge() {
    var popupAge = document.querySelector(".age-confirm");
    popupAge.classList.toggle("active");
    var blur = document.querySelector(".age-container");
    blur.classList.toggle("blur");
}