document.getElementById('upload-button').addEventListener('click', uploadImage);
document.getElementById('search-button').addEventListener('click', searchImages);

let images = [];

function uploadImage() {
    const fileInput = document.getElementById('file-input');
    const descriptionInput = document.getElementById('description-input');
    const file = fileInput.files[0];
    const description = descriptionInput.value.trim();

    if (file && description) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            const imageSize = file.size / 1024; // Convert to KB
            const uploadDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
            images.push({ imageUrl, description, imageSize, uploadDate });
            displayImages(images);
            fileInput.value = '';
            descriptionInput.value = '';
        };
        reader.readAsDataURL(file);
    } else {
        alert('Por favor, selecione uma imagem e insira uma descrição.');
    }
}

function searchImages() {
    const searchDescription = document.getElementById('search-description').value.trim().toLowerCase();
    const searchDate = document.getElementById('search-date').value;

    const filteredImages = images.filter(image => {
        const matchesDescription = searchDescription ? image.description.toLowerCase().includes(searchDescription) : true;
        const matchesDate = searchDate ? image.uploadDate === searchDate : true;
        return matchesDescription && matchesDate;
    });

    displayImages(filteredImages);
}

function displayImages(imagesToDisplay) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    imagesToDisplay.forEach((image, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';

        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';

        const img = document.createElement('img');
        img.src = image.imageUrl;
        img.alt = image.description;
        img.onclick = () => openModal(image);

        const description = document.createElement('p');
        description.textContent = `${image.description} - ${image.uploadDate} - ${image.imageSize.toFixed(2)} KB`;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = '×';
        deleteButton.onclick = () => deleteImage(index);

        imageContainer.appendChild(img);
        imageContainer.appendChild(description);
        imageContainer.appendChild(deleteButton);
        col.appendChild(imageContainer);
        gallery.appendChild(col);
    });
}

function deleteImage(index) {
    images.splice(index, 1);
    displayImages(images);
}

// Modal functionality
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const captionText = document.getElementById('modal-caption');
const span = document.getElementsByClassName('close')[0];

function openModal(image) {
    modal.style.display = 'block';
    modalImg.src = image.imageUrl;
    captionText.innerHTML = `${image.description} - ${image.uploadDate} - ${image.imageSize.toFixed(2)} KB`;
}

span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
