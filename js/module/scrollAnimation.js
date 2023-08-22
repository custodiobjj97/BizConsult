export default function initScrollAnimation() {
    const animationScroll = () => {
        const elementAnimation = document.querySelectorAll('[data-scroll]')
        const halfHeight=  window.innerHeight * 0.5
        for (let i = 0; i < elementAnimation.length; i++) {
            const elementTop = elementAnimation[i].getBoundingClientRect().top
            const elementVisible = (elementTop - halfHeight) < 0
            if (elementVisible) {
                elementAnimation[i].classList.add('active')
            } else if (elementAnimation[i].classList.contains('active')) {
                elementAnimation[i].classList.remove('active')
            }
        }
    }
    animationScroll()
    window.addEventListener('scroll', animationScroll)
    
}