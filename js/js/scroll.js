jQuery(window).load(function() {
setTimeout(() => {
  const spaceHolderr = document.querySelector('.space-holderr');
const horizontal = document.querySelector('.horizontal');
spaceHolderr.style.height = `${calcDynamicHeight(horizontal)}px`;
}, 600);
 

function calcDynamicHeight(ref) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const objectWidth = ref.scrollWidth;
  return objectWidth - vw + vh + 150; // 150 is the padding (in pixels) desired on the right side of the .cards container. This can be set to whatever your styles dictate
}

window.addEventListener('scroll', () => {
  const sticky = document.querySelector('.stickyy');
  horizontal.style.transform = `translateX(-${sticky.offsetTop}px)`;
});

window.addEventListener('resize', () => {
  spaceHolderr.style.height = `${calcDynamicHeight(horizontal)}px`;
});
});

jQuery( document ).ready(function() {
    jQuery( '.horizontal-scroll' ).horizontalScroll({
      containerHeight: "500vh"
    });
});