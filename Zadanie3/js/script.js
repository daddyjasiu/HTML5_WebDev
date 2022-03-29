const tux = document.getElementById('tux');
const menu = document.getElementById('menu');
const photo = document.getElementById('option1');
const rub = document.getElementById('option2');
const feed = document.getElementById('option3');
const text = document.getElementById('text')

const visible = function (e) {
    menu.style.display = 'block';
    menu.style.left = e.pageX + "px";
    menu.style.top = e.pageY + "px";
    e.preventDefault();
};

const hide = function(){
    menu.style.display = 'none';
}

const photo_alert = function(){
    text.innerText += "\n*Snap*, you have taken a beautiful photo of a penguin!";
    alert("Photo taken!");
}

const rub_alert = function(){
    text.innerText += "\nWow, you have rubbed its belly, he seems to like it!";
    alert("Belly rubbed!");
}

const feed_alert = function(){
    text.innerText += "\n*Omnomnom*, you fed fish to the penguin! Yummy!";
    alert("Penguin fed!");
}

tux.addEventListener('contextmenu', visible, false);
document.addEventListener('click', hide, false);
photo.addEventListener('click', photo_alert, false);
rub.addEventListener('click', rub_alert, false);
feed.addEventListener('click', feed_alert, false);