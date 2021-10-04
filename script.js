const fetchData = async () => {
    let res = await fetch('https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky,Christmas?type=single', { cache: "no-cache" });
    let data = await res.json();
    return data;
}

const section = document.querySelector('section');
const container = document.querySelector('.container');
const btn = document.getElementById('run');

btn.addEventListener('click', () => {
    fetchData()
        .then(data => { 
            if (data.joke.length > 192) {
                btn.click();
            } else {
                if (!container.hasChildNodes()) createJokeContainer(data);
                else {
                    document.querySelector('strong').innerHTML = data.category;
                    document.querySelector('em').innerHTML = "";
                    document.querySelector('p').innerHTML = data.joke;
                }
            }
        });          
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

    container.style.display = 'block';     
    
    strongTag.innerHTML = obj.category;
    emTag.innerHTML = "";

    pTag.innerHTML = obj.joke;
}