var $ = function(x) {
    return document.querySelector(x);
}
var $$ = function(xs) {
    return document.querySelectorAll(xs);
}
var result = $('.result');
var temp = $('.temp').content;
var frag = document.createDocumentFragment();
for (let w = 0; w < pokemons.length; w++) {
    var tempClone = temp.cloneNode(true);
    tempClone.querySelector('.read').dataset.number = w;
    tempClone.querySelector('.add').dataset.number = w;
    tempClone.querySelector('.img').src = pokemons[w].img;
    tempClone.querySelector('.id').textContent = pokemons[w].id;
    tempClone.querySelector('.name').textContent = pokemons[w].name;
    for (var i = 0; i < pokemons[w].weaknesses.length; i++) {
        var li = document.createElement('li');
        li.textContent = pokemons[w].weaknesses[i];
        tempClone.querySelector('.list').appendChild(li);
    }
    frag.appendChild(tempClone);
}
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
var checkScroll = function(){
    var list = $('.ol')
	console.log(window.scrollY);
	if(window.scrollY > 100){
		list.classList.add('ol__scroll');
        list.classList.remove('listOl')
	} else {
        list.classList.add('listOl')    
    }
}
document.addEventListener('scroll', debounce(checkScroll, 200))
result.appendChild(frag);
var wrap = $('.wrap');
var img = $('#p_img');
var m_name = $("#name");
var weightt = $("#ogirligi");
var height = $("#height");
var ol = $('.or');
var massiv = [];
result.addEventListener('click', (x) => {
    if (x.target.className == 'read') {
        var index = parseInt(x.target.dataset.number, 10);
        var show = Array.from(result.querySelectorAll('.read')).find(function(item){
            return parseInt(item.dataset.number, 10) === index;
        });
        var a = show.dataset.number;
        img.src = pokemons[a].img;
        m_name.textContent = pokemons[a].name;
        height.textContent = 'Height: ' + pokemons[a].height;
        weightt.textContent = 'Weight: ' + pokemons[a].weight;
        wrap.classList.add('dfl');
        return;
    } else if (x.target.className == 'add') {
        ol.textContent = '';
        var index = parseInt(x.target.dataset.number, 10);
        var show = Array.from(result.querySelectorAll('.add')).find(function(item){
            return parseInt(item.dataset.number, 10) === index;
        });
        var d = show.dataset.number;
        console.log(d);

        massiv.push(pokemons[d].name)
        for (var i = 0; i < massiv.length; i++) {
            var li = document.createElement('li');
            var btn = document.createElement('button');
            btn.innerHTML = "X";
            btn.classList.add('cb');
            btn.dataset.id = i;
            li.textContent = massiv[i];
            li.appendChild(btn);
            ol.appendChild(li);
        }
        return;
    }
});
ol.addEventListener('click', function(evt){
    if(evt.target.className !== 'cb'){
        return;
    }
    var index = parseInt(evt.target.dataset.id, 10);
    var itemToRemove = Array.from(ol.querySelectorAll('.cb')).find(function(item){
        return parseInt(item.dataset.id, 10) === index;
    });
    ol.textContent = '';
    massiv.splice(parseInt(itemToRemove.dataset.id, 10), 1);
    for (var i = 0; i < massiv.length; i++) {
        var li = document.createElement('li');
        var btn = document.createElement('button');
        btn.textContent = 'x';
        btn.classList.add('cb');
        btn.dataset.id = i;
        li.textContent = massiv[i];
        li.appendChild(btn);
        ol.appendChild(li);
    }
});
wrap.addEventListener('click', (e) =>{
    if (e.target.className !== 'wrap dfl') {   
        return;
    }
    else{
        wrap.classList.remove('dfl');
    }
});
var close = $('.close');
close.addEventListener('click', () => {
    wrap.classList.remove('dfl');
})
document.addEventListener('keyup', function (e) {
        console.log(e.keyCode);
        wrap.classList.remove('dfl');

})