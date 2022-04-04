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


function incrementValue() {
    var value = parseInt(document.getElementById('basket-items').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('basket-items').value = value;
    document.getElementById('basket-items').style.display = 'inline-block';
}