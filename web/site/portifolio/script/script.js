 /*animacao*/
  const throttle = _.throttle;


const players = 
    Array.from(document.querySelectorAll('.js-play-on-screen'));


function isOnScreen(el) {
    let rect = el.getBoundingClientRect() 
    return rect.top > 0 && rect.bottom < window.innerHeight;
}

function playAnimation(el) {
    if(isOnScreen(el)) el.style.animationPlayState = 'running';
}


const render = throttle(() => players.forEach(playAnimation), 150);

render();
window.addEventListener('scroll', render);
//animacao-fim

//parallaxcomeco
let reader = document.getElementById('reader');
    let coffe = document.getElementById('coffe');
    let text = document.getElementById('text');
    let btn = document.getElementById('btn');

window.addEventListener('scroll',function()
{
    let value = window.scrollY;
reader.style.top = value *0.01+'px';
coffe.style.top = value *0.01+'px';
text.style.marginLeft = value *0.01+'px';
btn.style.marginRight = value *0.01+'px';
}
)
