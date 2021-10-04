const section = document.querySelector('section');
const container = document.querySelector('.container');
const btn = document.getElementById('run');
const save = document.getElementById('save');
const saveIcon = document.querySelector('#save img');

const src = document.getElementById('src');

const like = src.getAttribute('data-like');
const unlike = src.getAttribute('data-unlike');

let bestJokes = Array.from(new Set());

const fetchData = async () => {
    let res = await fetch('https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky,Christmas?type=single', { cache: "no-cache" });
    let data = await res.json();
    return data;
}

bestJokes.map(elem => {
    if (elem == data) saveIcon.setAttribute('src', like) 
    else saveIcon.setAttribute('src', unlike)
})

btn.addEventListener('click', () => {
    fetchData()
        .then(data => { 
            if (data.joke.length > 192) btn.click();
            else {
                if (!container.hasChildNodes()) createJokeContainer(data);
                else {
                    document.querySelector('.category').textContent = data.category;
                    document.querySelector('.type').textContent = "";
                    document.querySelector('.joke').textContent = data.joke;
                }
            }
        });          
})

save.addEventListener('click', () => {
    bestJokes.push(document.querySelector('p').textContent);
    bestJokes = [...new Set(bestJokes)];

    setInterval(() => {
        bestJokes.map(elem => {
            if (elem === document.querySelector('p').textContent) saveIcon.setAttribute('src', like);
            else saveIcon.setAttribute('src', unlike);
        })
    }, 100);
})

const createJokeContainer = (obj) => {
    const pTag = document.createElement('p');
    const asideTag = document.createElement('aside');
    const strongTag = document.createElement('strong');
    const emTag = document.createElement('em');

    pTag.classList.add('joke');
    asideTag.classList.add('info');
    strongTag.classList.add('category');
    emTag.classList.add('type');

    container.appendChild(pTag);
    container.appendChild(asideTag);
    asideTag.appendChild(strongTag);
    asideTag.appendChild(emTag);
    
    strongTag.innerHTML = obj.category;
    emTag.innerHTML = "";

    pTag.innerHTML = obj.joke;

    container.style.opacity = '0';

    setTimeout(() => {
        container.style.opacity = '1';
    }, 400);
}

window.onload = () => {
    btn.click();
}