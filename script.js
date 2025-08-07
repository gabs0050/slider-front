const API_URL = 'https://slider-back-l623.onrender.com/images'

const slider = document.querySelector('.slider')
const prevBtn = document.querySelector('.prev-btn')
const nextBtn = document.querySelector('.next-btn')

let currentIndex = 0
let imagesData = []
let slideInterval

async function fetchImages() {
    try {
        const response = await fetch(API_URL)
        if (!response.ok) {
            throw new Error('Erro ao carregar as imagens da API.')
        }
        imagesData = await response.json()
        renderSlider()
        startAutoPlay()
    } catch (error) {
        console.error("Não foi possível buscar as imagens:", error)
        
        const errorParagraph = document.createElement('p')
        errorParagraph.textContent = 'Erro ao carregar imagens. Verifique se o JSON-Server está rodando.'
        errorParagraph.style.cssText = 'color: red padding: 20px text-align: center'
        slider.appendChild(errorParagraph)
    }
}

function renderSlider() {
    if (imagesData.length === 0) {
        const noImageParagraph = document.createElement('p')
        noImageParagraph.textContent = 'Nenhuma imagem encontrada.'
        slider.appendChild(noImageParagraph)
        return
    }
    
    slider.innerHTML = ''
    imagesData.forEach(image => {
        const slideElement = document.createElement('div')
        slideElement.classList.add('slide')

        const imgElement = document.createElement('img')
        imgElement.src = image.imageUrl
        imgElement.alt = image.description
        
        const infoElement = document.createElement('div')
        infoElement.classList.add('slide-info')

        const titleElement = document.createElement('h3')
        titleElement.textContent = image.description

        const dateElement = document.createElement('p')
        dateElement.textContent = `Data: ${image.date}`

        infoElement.appendChild(titleElement)
        infoElement.appendChild(dateElement)

        slideElement.appendChild(imgElement)
        slideElement.appendChild(infoElement)
        slider.appendChild(slideElement)
    })
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % imagesData.length
    updateSlider()
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + imagesData.length) % imagesData.length
    updateSlider()
}

function updateSlider() {
    const slideWidth = slider.clientWidth
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`
}

function startAutoPlay() {
    slideInterval = setInterval(() => {
        nextSlide()
    }, 5000)
}

function resetAutoPlay() {
    clearInterval(slideInterval)
    startAutoPlay()
}

prevBtn.addEventListener('click', () => {
    prevSlide()
    resetAutoPlay()
})

nextBtn.addEventListener('click', () => {
    nextSlide()
    resetAutoPlay()
})

document.addEventListener('DOMContentLoaded', fetchImages)