const stickyBar = function () {
  if (window.matchMedia('(min-width: 900px)').matches) {
    if (window.pageYOffset > document.getElementById("navbar_section").offsetTop ) {
      document.getElementById("navbar_section").classList.add("sticky");
      document.getElementById('cont_search_navbar').style.display = 'flex';
      document.getElementById("btn_crear_gif").style.display = 'none';
      document.getElementById("hero_section").style.paddingTop = '90px'
    } else {
      document.getElementById("navbar_section").classList.remove("sticky");
      document.getElementById('cont_search_navbar').style.display = 'none';
      document.getElementById("btn_crear_gif").style.display = 'block';
      document.getElementById("hero_section").style.paddingTop = '0'
    }
  }
}    

window.addEventListener('scroll', stickyBar);




