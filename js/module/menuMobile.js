export default function initMenuMobile() {
    const toggle = document.querySelector('.toggle')
    
    const activeToggle = (event) => {
        if (event.type === 'touchstart') {
            event.preventDefault()
        }
        const menu = document.querySelector('.list-menu')
        const line=document.querySelector('.line')
        menu.classList.toggle('active')
        line.classList.toggle('active')

    }


    ['click','touchstart'].forEach((event)=>{toggle.addEventListener(event, activeToggle)})
}