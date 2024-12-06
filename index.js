const carousal=document.querySelector(".carousal")
const slides =document.querySelectorAll(".image-slide")
const prevBtn=document.getElementById("prev-btn")
const nextBtn=document.getElementById("next-btn")

let currentIndex=0

// updating the carousal 
function updateCarousel(){
    carousal.style.transform=`translateX(-${currentIndex*100}%)`
}

prevBtn.addEventListener('click',()=>{
    currentIndex=(currentIndex-1+slides.length)%slides.length
    updateCarousel()
})

nextBtn.addEventListener('click',()=>{
    currentIndex=(currentIndex+1)%slides.length
    updateCarousel()
})

//text draggable logic

function makeDraggable(element){
    let offsetX,offsetY;

    element.addEventListener("mousedown",(e)=>{
        offsetX=e.clientX-element.offsetLeft
        offsetY=e.clientY-element.offsetTop

        function onMouseMove(e){
            element.style.left=`${e.clientX-offsetX}px`
            element.style.top=`${e.clientY-offsetY}px`
        }

        document.addEventListener('mousemove',onMouseMove);
        document.addEventListener('mouseup',()=>{
            document.removeEventListener('mousemove',onMouseMove)
        },{once:true})
    })
}

document.querySelectorAll('.text-overlay').forEach(makeDraggable)

//add text logic

const addTextBtn=document.getElementById("add-text-btn")
addTextBtn.addEventListener('click',()=>{
    //  const activeSlide=slides[currentIndex]
    const activeSlide=slides[0]
    const newText=document.createElement("div")
    newText.className="text-overlay"
    newText.contentEditable=true
    newText.textContent="New Text"
    newText.style.position="abolute"
    newText.style.left="10%"
    newText.style.top="10%"
    makeDraggable(newText)
    activeSlide.appendChild(newText)
})

//text style

const fontSizeSlider=document.getElementById("font-size-slider")
const fontColorPicker=document.getElementById("font-color-picker")
const fontStyleSelector=document.getElementById("font-style-selector")
const alignButton=document.querySelectorAll('[data-align]')

let selectedText=null


//select text element
document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("text-overlay")){
        selectedText=e.target
    }
})

//Adjust font size

fontSizeSlider.addEventListener("input",()=>{
    if(selectedText){
        selectedText.style.fontSize=`${fontSizeSlider.value}px`
    }
})

//change font color

fontColorPicker.addEventListener("input",()=>{
    if(selectedText){
        selectedText.style.color=fontColorPicker.value
    }
})

//change font style

fontStyleSelector.addEventListener("change",()=>{
    if(selectedText){
        selectedText.style.fontFamily=fontStyleSelector.value
    }
})


//Change alignement

alignButton.forEach(button=>{
    button.addEventListener("click",()=>{
        if(selectedText){
            const alignement=button.dataset.align
            selectedText.style.textAlign=alignement
            selectedText.style.width="100%"
        }
    })
})

