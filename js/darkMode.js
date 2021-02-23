// choose between light and dark mode

function enableDarkMode () {
    document.body.classList.add('dark');
    localStorage.setItem('darkMode', true);
    document.getElementsByClassName('a_menu')[0].innerText = 'Modo Diurno';
    document.getElementById('img_link_logo').src = '/images/logo-mobile-modo-noc.svg';
    document.getElementById('img_menu_mobile').src = '/images/burger-modo-noc.svg';
    document.getElementById('close_search_img').src = '/images/icon-search-modo-noc.svg'; 
    document.getElementsByClassName('search_img')[0].src = '/images/icon-search-modo-noc.svg'; 
}

function disableDarkMode () {
    document.body.classList.remove('dark');
    localStorage.setItem('darkMode', false);
    document.getElementsByClassName('a_menu')[0].innerText = 'Modo Nocturno';
    document.getElementById('img_link_logo').src = '/images/logo-mobile.svg';
    document.getElementById('img_menu_mobile').src = '/images/burger.svg';
    document.getElementsByClassName('search_img')[0].src = '/images/icon-search.svg'; 
    document.getElementById('close_search_img').src = '/images/icon-search.svg';
}    

document.getElementsByClassName('a_menu')[0].addEventListener('click', () => {
    if (document.body.classList != 'dark') {
        enableDarkMode()
    } else {
        disableDarkMode()
    } 
})

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') == 'true') {
        enableDarkMode()
    } else {
        disableDarkMode()   
    }
})