export default function initSliderTouched() {
    const slider = document.querySelector('.slider-container')
    const slides = Array.from(document.querySelectorAll('.slide'))
    const rightSlider = document.querySelector('.right')
    const leftSlider = document.querySelector('.left')
    
    let isDragging = false 
    let startPos = 0
    let currentTranslate = 0
    let prevTranslate = 0
    let animationID = 0
    let currentIndex = 0

    slides.forEach((slide, index) => {
        const slideImg = slide.querySelector('img')
        slideImg.addEventListener('dragstart', (e) => { e.preventDefault() })
        
        // mouse events
        slide.addEventListener('mousedown', touchStart(index))
        slide.addEventListener('mouseup', touchEnd)
        slide.addEventListener('mouseleave', touchEnd)
        slide.addEventListener('mousemove', touchMove)


        // touch events
         
        slide.addEventListener('touchstart', touchStart(index))
        slide.addEventListener('touchend', touchEnd)
        slide.addEventListener('touchmove', touchMove)
    })
    
    rightSlider.addEventListener('click', btnNext)
    leftSlider.addEventListener('click', btnPrev)

    window.oncontextmenu = function (event) {
        event.stopPropagation()
        event.preventDefault()
        return false 
    }

    function touchStart(index) {
        return function (event) {
            currentIndex = index 
            startPos = getPositionX(event)
            isDragging = true 
            animationID = requestAnimationFrame(animation)
            slider.classList.add('grabbing')
        }
    }

    function touchEnd() {
        isDragging = false 
        cancelAnimationFrame(animationID)

        const movedBy = currentTranslate - prevTranslate
        
        if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1
        
        if (movedBy > 100 && currentIndex > 0) currentIndex -= 1

        setSliderPositionByIndex()

        slider.classList.remove('grabbing')
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event) 
            currentTranslate= prevTranslate + currentPosition - startPos
        }
    }


    function btnNext() {
        if (currentIndex < slides.length - 1) {
            currentIndex++
            setSliderPositionByIndex()
        }
    }

    function btnPrev() {
        if (currentIndex > 0) {
            currentIndex--
            setSliderPositionByIndex()
        }
    }
    setInterval(() => {
        currentIndex = currentIndex = (currentIndex += 1) % slides.length
        setSliderPositionByIndex()
    },8000)

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
    }
    function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`
    }

    function animation() {
        setSliderPosition()
        if(isDragging) requestAnimationFrame(animation)
    }
    
    function setSliderPositionByIndex() {
        currentTranslate = currentIndex * -window.innerWidth
        prevTranslate = currentTranslate
        setSliderPosition()
        
    }
    
}