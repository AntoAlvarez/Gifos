// expand hamburger menu (mobile)

document.getElementById("img_menu_mobile").addEventListener('click', () => {

    if (document.getElementById('menu').style.display == 'none') {
        document.getElementById('img_menu_mobile').src = '/images/close.svg';
        document.getElementById('menu').style.display = 'flex';
        if (localStorage.getItem('darkMode') == 'true') {
            document.getElementById('img_menu_mobile').src = '/images/close-modo-noc.svg';
        }
    } else {
        document.getElementById('img_menu_mobile').src = '/images/burger.svg';
        document.getElementById('menu').style.display = 'none';
        if (localStorage.getItem('darkMode') == 'true') {
            document.getElementById('img_menu_mobile').src = '/images/burger-modo-noc.svg';
        }
    }
    
})
