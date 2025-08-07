const API_URL = 'https://slider-back-l623.onrender.com/images'

const slider = document.querySelector('.slider')
const prevBtn = document.querySelector('.prev-btn')
const nextBtn = document.querySelector('.next-btn')

let currentIndex = 0
let imagesData = []
let slideInterval

// Função para buscar as imagens do JSON
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
        slider.innerHTML = '<p style="color: red padding: 20px text-align: center">Erro ao carregar imagens. Verifique se o JSON-Server está rodando.</p>'
    }
}

// Função para renderizar as imagens e informações no slider
function renderSlider() {
    if (imagesData.length === 0) {
        slider.innerHTML = '<p>Nenhuma imagem encontrada.</p>'
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
        infoElement.innerHTML = `
            <h3>${image.description}</h3>
            <p>Data: ${image.date}</p>
        `

        slideElement.appendChild(imgElement)
        slideElement.appendChild(infoElement)
        slider.appendChild(slideElement)
    })
}

// Função para avançar o slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % imagesData.length
    updateSlider()
}

// Função para voltar o slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + imagesData.length) % imagesData.length
    updateSlider()
}

// Função para atualizar a posição do slider
function updateSlider() {
    const slideWidth = slider.clientWidth
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`
}

// Inicia a transição automática dos slides
function startAutoPlay() {
    slideInterval = setInterval(() => {
        nextSlide()
    }, 5000)
}

// Reinicia o timer após interação manual
function resetAutoPlay() {
    clearInterval(slideInterval)
    startAutoPlay()
}

// Adiciona os event listeners aos botões
prevBtn.addEventListener('click', () => {
    prevSlide()
    resetAutoPlay()
})

nextBtn.addEventListener('click', () => {
    nextSlide()
    resetAutoPlay()
})

// Inicia o carregamento das imagens quando a página é carregada
document.addEventListener('DOMContentLoaded', fetchImages)