const sizes = document.querySelectorAll('.size');
const colors_circle = document.querySelectorAll('.color_circle');
const vanss = document.querySelectorAll('.vans');
const colors = document.querySelectorAll('.color');
const vansBg = document.querySelectorAll('.color_background');

let prevColor = "#080000";
let animationEnd = true;

function changeSize(){
    sizes.forEach(size => size.classList.remove('active'));
    this.classList.add('active');
}

function changeColor(){
    if(!animationEnd) return;
    let primary = this.getAttribute('primary');
    let color_circle = this.getAttribute('color_circle');
    let vans = document.querySelector(`.vans[color="${color_circle}"]`);
    let color = document.querySelector(`.color[color="${color_circle}"]`);
    let prevColorBackground = document.querySelector(`.color[color="${prevColor}"]`);

    if(color_circle == prevColor) return;

    colors_circle.forEach(c => c.classList.remove('active'));
    this.classList.add('active');

    document.documentElement.style.setProperty('--primary', primary);
    
    vanss.forEach(s => s.classList.remove('show'));
    vans.classList.add('show');

    colors.forEach(g => g.classList.remove('first', 'second'));
    color.classList.add('first');
    prevColorBackground.classList.add('second');

    prevColor = color;
    animationEnd = false;

    color.addEventListener('animationend', () => {
        animationEnd = true;
    });
}

sizes.forEach(size => size.addEventListener('click', changeSize));
colors_circle.forEach(c => c.addEventListener('click', changeColor));

let x = window.matchMedia("(max-width: 1000px)");

function changeHeight(){
    if(x.matches){
        let vansHeight = vanss[0].offsetHeight;
        vansBg.style.height = `${vansHeight * 0.9}px`;
    }
    else{
        vansBg.style.height = "475px";
    }
}

changeHeight();

window.addEventListener('resize', changeHeight);