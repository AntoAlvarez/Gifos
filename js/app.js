////////////////////
//shared functions//
////////////////////

// get data from api
async function getData (url) {
    try {
        let res = await fetch(url);
        let content = await res.json();
        let data = content.data;
        return data;
    } catch {
        err => console.log('Ha ocurrido un error' + err);
    }
}

// create card and add styles
function createCard (url, user, title, className) {
    let cardContainer = document.createElement('div');
    let cardContent = `<img class="card_img" src="${url}">
                       <div class= 'card_hover'>
                            <div id="cont_hover_icons">
                                <button class="hover_icon like" id="like"></button>
                                <button class="hover_icon dwl" id="download"></button>
                                <button class="hover_icon max" id="expand">
                                    <a class="max_link"></a>
                                </button>
                            </div>
                            <div id="cont_hover_info">
                                <h4 class='roboto gif_user'>${user}</h4>
                                <h3 class='gif_title'>${title}</h3>
                            </div>
                        </div>`;  
    cardContainer.innerHTML = cardContent;
    cardContainer.classList.add(className);
    return cardContainer;
}

// show hover options
function hoverCard (className) {
    let cardArray = document.getElementsByClassName(className);

    for (let i = 0; i < cardArray.length; i++) {
        cardArray[i].addEventListener('mouseenter', () => {
            document.getElementsByClassName('card_hover')[i].classList.add('options');
        })
        cardArray[i].addEventListener('mouseleave', () => {
            document.getElementsByClassName('card_hover')[i].classList.remove('options');
        })
    }
}

//////////////////////
//general variables///
//////////////////////

const apiKey = 'Zt6N7LUtU68Rv4dbIxa6ZK6CugsDHN20';
var offset = 0;

/////////////////
//hero section///
/////////////////

// search gifs
async function searchGifs (searchQuery) {
    try{
        let searchData = await getData(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchQuery}&limit=12&offset=${offset}`);
        if (searchData.length != 0) {
            // section display
            document.getElementById('search_results_section').classList.remove('hidden');
            document.getElementById('trending_topics_section').classList.add('hidden');
            for (let i = 0; i <= searchData.length; i++) {
                // get search info
                let searchUrl = searchData[i].images.downsized_medium.url;
                let searchUser = searchData[i].username;
                let searchTitle = searchData[i].title;
                // create search cards
                let searchCard = createCard(searchUrl, searchUser, searchTitle, 'card');
                // append search cards
                document.getElementById('cont_search_cards').appendChild(searchCard);
                // change title according to search value
                document.getElementById('search_title').innerText = `${searchQuery.charAt().toUpperCase() + searchQuery.toLowerCase().slice(1)}`;
            }
        }
        if (searchData.length == 0) {
            // no results section display
            document.getElementById('search_title_noresults').innerText = `${searchQuery.charAt().toUpperCase() + searchQuery.toLowerCase().slice(1)}`;
            document.getElementById('search_noresults_section').classList.remove('hidden');
            document.getElementById('trending_topics_section').classList.add('hidden');
        }  
        return true;
    } catch {
        err => console.log('Ha ocurrido un error' + err);
    }
}

// display more results
function displayMore (value) {
    document.getElementById('btn_more_results').addEventListener('click', () => {
        offset += 12;
        searchGifs(value)
    })
}     

// activate search
function activeSearch () {
    document.getElementById('cont_search_hero').style.height = 'auto';
    document.getElementById('cont_search_hero_inactive').style.margin = '15px';
    document.getElementById('search_img').classList.remove('hidden');
    document.getElementById('search_img').style.margin = '0 20px';
    document.getElementById('close_search_img').src = '../images/close.svg';
    document.getElementById('close_search_img').classList.add('close_img');
    document.getElementById('hero_input').style.margin = '0 13px';
    document.getElementById('line_search').classList.remove('hidden');
    document.getElementById('cont_sugg').classList.remove('hidden');
}

// inactivate search 
function inactiveSearch () {
    document.getElementById('cont_search_hero').style.height = '50px';
    document.getElementById('cont_search_hero_inactive').style.margin = '15px';
    document.getElementById('search_img').classList.add('hidden');
    document.getElementById('close_search_img').src = '../images/icon-search.svg';
    document.getElementById('close_search_img').classList.remove('close_img');
    document.getElementById('hero_input').style.margin = '55px';
    document.getElementById('line_search').classList.add('hidden');
    document.getElementById('cont_sugg').classList.add('hidden');
}

async function createSuggList (tag) {
    let tagsArray = await getData(`https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${tag}&limit=4`);
    for (let i = 0; i < tagsArray.length; i++) {
        // create list of suggestions
        let li = document.createElement('li');
        li.innerHTML = `<img class="img_sugg" src="../images/icon-search-active.svg" alt="icono búsqueda">
                        <a class="text_sugg">${tagsArray[i].name}</a>`;
        li.classList.add('cont_sugg_item');
        document.getElementById('cont_sugg').appendChild(li);
        // add search functions to each item
        li.addEventListener('click', () => {
            searchGifs(li.children[1].innerText);
            displayMore(li.children[1].innerText);
            inactiveSearch();
        })
    }
}

// add autocomplete event to input
document.getElementById('hero_input').addEventListener('input', () => {
    if (document.getElementById('hero_input').value.length > 2) {
        document.getElementById('cont_sugg').innerHTML = '';
        createSuggList(document.getElementById('hero_input').value); 
        activeSearch();
    } else {
        inactiveSearch();
    }
})

// add events to search icons and enter key (navbar section)
document.getElementsByClassName('search_img')[0].addEventListener('click', () => {
    searchGifs(document.getElementById('navbar_input').value);
    displayMore(document.getElementById('navbar_input').value);
})

document.getElementById('navbar_input').addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        searchGifs(document.getElementById('navbar_input').value);
        displayMore(document.getElementById('navbar_input').value);
    }    
})

// add events to search icons and enter key (hero section)
document.getElementById('close_search_img').addEventListener('click', () => {
    inactiveSearch();
    document.getElementById('hero_input').value = '';  
})

document.getElementById('search_img').addEventListener('click', () => {
    searchGifs(document.getElementById('hero_input').value);
    displayMore(document.getElementById('hero_input').value);
    inactiveSearch();
})

document.getElementById('hero_input').addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        searchGifs(document.getElementById('hero_input').value);
        displayMore(document.getElementById('hero_input').value);
        inactiveSearch();
    }    
})

// show trending topics
const trendingTopics = async function () {
    try{
        // get trending topics data
        let topics = await getData(`https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`);
        topics = topics.slice(0,5);
        // add inner text to spans
        let topics_spans = document.getElementsByClassName('tt');
        for (let i = 0; i < topics_spans.length; i++) {
           topics_spans[i].innerText = `${topics[i].charAt().toUpperCase() + topics[i].toLowerCase().slice(1)}, `; 
           document.getElementsByClassName('tt last')[0].innerText = `${topics[i].charAt().toUpperCase() + topics[i].toLowerCase().slice(1)}`;
        }
    } catch {
        err => console.log('Ha ocurrido un error' + err);
    }
}
document.addEventListener('DOMContentLoaded', trendingTopics)

// add search function to trending tags
let ttopics = document.getElementsByClassName('tt');
for (let i = 0; i < ttopics.length; i++) {
    ttopics[i].addEventListener('click', () => {
        searchGifs(ttopics[i].innerText.replace(/,\s*$/, ""));
        displayMore(ttopics[i].innerText.replace(/,\s*$/, ""));
    })
}

////////////////////////////
//trending gifs section/////
////////////////////////////

// show trending gifos 
async function trendingGifos () {
    try {
        let trendingData = await getData(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=3&offset=${offset}`);
                
        for (let i = 0; i <= trendingData.length; i++) {
            // get trending gifos info
            let trendingUrl = trendingData[i].images.downsized_medium.url;
            let trendingUser = trendingData[i].username;
            let trendingTitle = trendingData[i].title;
            // create trending cards
            let trendingCard = createCard(trendingUrl, trendingUser, trendingTitle, 'trending_card');
            // append trending cards into slider 
            document.getElementById('cont_trending_cards').appendChild(trendingCard);
            // hover
            hoverCard('trending_card');
        }
        return; 
    } catch {
        err => console.log('Ha ocurrido un error' + err);
    }
}
trendingGifos();

// add gif to local storage
var likeArray = [];

async function likeTG () {
    await trendingGifos();

    let likeBtns = Array.from(document.getElementsByClassName('like'));
    
    for (let i = 0; i < likeBtns.length; i++) {
        likeBtns[i].addEventListener('click', () => {
            // add new styles to button
            likeBtns[i].classList.add('clicked');
            // get liked gif data
            let url = document.getElementsByClassName('card_img')[i].src;
            let user = document.getElementsByClassName('gif_user')[i].textContent;
            let title = document.getElementsByClassName('gif_title')[i].textContent;
            // create object with gif data
            let likedGif = {
                url: url,
                username: user,
                title: title
            }
            // push object into liked gifs array
            likeArray.push(likedGif);
            // save array in local storage
            localStorage.setItem('FavGif', JSON.stringify(likeArray));    
        })
    }
}
likeTG();

// display favourites section
function displayFavSection () {
    let likedArray = JSON.parse(localStorage.getItem('FavGif'));
       
    if (likedArray == null || likedArray.length == 0) {
        document.getElementById('no_favs_section').classList.remove('hidden');
        document.getElementById('hero_section').classList.add('hidden');
        document.getElementById('trending_topics_section').classList.add('hidden');
    } else {
        document.getElementById('favs_section').classList.remove('hidden');
        document.getElementById('hero_section').classList.add('hidden');
        document.getElementById('trending_topics_section').classList.add('hidden');

        for (let i = 0; i <= likedArray.length; i++) {
            // get search info
            let likedUrl = likedArray[i].url;
            let likedUser = likedArray[i].username;
            let likedTitle = likedArray[i].title;
            // create search cards
            let likedCard = createCard(likedUrl, likedUser, likedTitle, 'card');
            // append search cards
            document.getElementById('cont_favs_cards').appendChild(likedCard);

            if (likedArray.length >= 12) {
                document.getElementById('more_favs').classList.remove('hidden');
                // add event to button
                document.getElementById('more_favs').addEventListener('click', () => {
                    document.getElementsByClassName('set_height')[0].style.height = 'fit-content';
                })
            } 
        }
    }
}

document.getElementsByClassName('a_menu')[1].addEventListener('click', () => {
    displayFavSection();
})

////////////////////////// falta funcionalidad para eliminar gifs de favoritos y mis gifos /////////////////

// display expanded gif screen
async function expandTG () {
    await trendingGifos();

    let maxBtns = Array.from(document.getElementsByClassName('max'));

    for (let i = 0; i < maxBtns.length; i++) {
        // get gif data
        let maxUrl = maxBtns[i].parentElement.parentElement.previousElementSibling.src;
        let maxUser = maxBtns[i].parentElement.parentElement.children[1].children[0].innerText;
        let maxTitle = maxBtns[i].parentElement.parentElement.children[1].children[1].innerText;
        // add expand gif event
        maxBtns[i].addEventListener('click', () => {
            document.getElementById('cont_gifmax').classList.remove('hidden');
            document.getElementById('gif_max').src = maxUrl;
            document.getElementById('user_max').innerText = maxUser;
            document.getElementById('title_max').innerText = maxTitle;
            // close expanded gif screen
            document.getElementById('close_max').addEventListener('click', () => {
                document.getElementById('cont_gifmax').classList.add('hidden');
            })
        })
    }    
}
expandTG();

////////////// falta funcionalidad para pasar a la imagen siguiente o anterior ////////////////////

// download gif
async function downloadGif(obj) {
    const gif_id = obj.getAttribute("data-obj-id")

    const downloadUrl = `https://media.giphy.com/media/${gif_id}/giphy.gif`;
    const fetchedGif = fetch(downloadUrl);
    const blobGif = (await fetchedGif).blob();
    const urlGif = URL.createObjectURL(await blobGif);
    const saveImg = document.createElement("a");
    saveImg.href = urlGif;
    saveImg.download = "downloaded-guifo.gif";
    saveImg.style = 'display: "none"';
    document.body.appendChild(saveImg);
    saveImg.click();
    document.body.removeChild(saveImg);
}

async function downloadTG () {
    await trendingGifos();

    let dwnlBtns = Array.from(document.getElementsByClassName('dwl'));
    for (let i = 0; i < dwnlBtns.length; i++) {
        let dwlURL = dwnlBtns[i].parentElement.parentElement.previousElementSibling.src;
        dwnlBtns[i].addEventListener('click', () => {
            
            
            downloadGif();




        })
    }

}
downloadTG();


//////////////// falta funcionalidad para slider en mobile ///////////////////////

// slider function (desktop)
document.getElementById('btn_right_slider').addEventListener('click', () => {
    document.getElementById('cont_trending_cards').innerHTML = '';
    offset += 3;
    trendingGifos();
    likeTG();
    expandTG();
    downloadTG();
});

document.getElementById('btn_left_slider').addEventListener('click', () => {
    if (offset != 0) {
        document.getElementById('cont_trending_cards').innerHTML = '';
        offset -= 3;
        trendingGifos();
        likeTG();
        expandTG();
        downloadTG();
    }
});


