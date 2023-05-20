let pageUp = document.querySelector('.page_up');


window.addEventListener('scroll',()=>{
    let scrollY = this.scrollY;
    if(scrollY >= 800){
        pageUp.style.display = 'block';
    }else{
        pageUp.style.display = 'none';
    }
})

pageUp.addEventListener('click',()=>{
    window.scrollTo(0,0);
})