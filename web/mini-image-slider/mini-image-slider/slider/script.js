const slidesContainer = document.querySelector('.slides');
const uploadInput = document.getElementById('upload');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');



let currentSlide = 0;
let uploadedImages = [];
let maxImages = 100;

let defaultImages = [
  'img/img1.jpg',
  'img/img2.jpg',
  'img/img3.jpg'
];


let activeImages = [...defaultImages]; 

function renderSlides(){
      slidesContainer.innerHTML = "";

activeImages.forEach((src, index) => {

const img =  document.createElement('img');
 img.src = typeof src === 'string' ? src : URL.createObjectURL(src);
  img.classList.add('slide');
   if (index === currentSlide) img.classList.add('active');
  img.alt = `Image ${index + 1}`;
  slidesContainer.appendChild(img);
});

};

function showSlide(index) {
  const total = activeImages.length;
  currentSlide = (index + total) % total;
  document.querySelectorAll('.slide').forEach((slide, i) => {
    slide.classList.toggle('active', i === currentSlide);
  });
}

prevBtn.addEventListener('click' , () => showSlide(currentSlide - 1));

nextBtn.addEventListener('click' , () => showSlide(currentSlide + 1));


uploadInput.addEventListener('change', (event) =>{

const files = Array.from(event.target.files);
if (files.length + uploadedImages.length > maxImages){
  alert(`Maximum upload limit is ${maxImages} images.`);
    return;
};

uploadedImages.push(...files);
activeImages = [...uploadedImages];
currentSlide = 0 ;
renderSlides();

});
