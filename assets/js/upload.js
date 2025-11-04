document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const profilePreview = document.getElementById('profilePreview');
    const previewImage = document.getElementById('previewImage');
    const uploadBtn = document.getElementById('uploadBtn');
    const removeBtn = document.getElementById('removeBtn');
    const successMessage = document.getElementById('successMessage');
    const cropModal = document.getElementById('cropModal');
    const cropImage = document.getElementById('cropImage');
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const cancelCropBtn = document.getElementById('cancelCrop');
    const saveCropBtn = document.getElementById('saveCrop');

    let currentScale = 1;
    let currentPosition = { x: 0, y: 0 };
    let isDragging = false;
    let startPosition = { x: 0, y: 0 };
    let currentFile = null;

    uploadBtn.addEventListener('click', () => fileInput.click());
    profilePreview.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            currentFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                cropImage.src = e.target.result;
                cropModal.style.display = 'flex';
                document.body.classList.add('modal-open');
                currentScale = 1;
                currentPosition = { x:0, y:0 };
                updateCropImageTransform();
            }
            reader.readAsDataURL(currentFile);
        }
    });

    removeBtn.addEventListener('click', () => {
        previewImage.src = '';
        previewImage.style.display = 'none';
        previewImage.style.transform = 'scale(1) translate(0,0)';
        document.querySelector('.profile-preview .placeholder').style.display = 'flex';
        removeBtn.style.display = 'none';
        successMessage.style.display = 'none';
        fileInput.value = '';
        currentFile = null;
    });

    zoomInBtn.addEventListener('click', () => {
        currentScale = Math.min(currentScale + 0.1, 3);
        updateCropImageTransform();
    });

    zoomOutBtn.addEventListener('click', () => {
        currentScale = Math.max(currentScale - 0.1, 1);
        updateCropImageTransform();
    });

    cropImage.addEventListener('mousedown', startDrag);
    function startDrag(e) {
        isDragging = true;
        startPosition.x = e.clientX - currentPosition.x;
        startPosition.y = e.clientY - currentPosition.y;
        e.preventDefault();
    }

    document.addEventListener('mousemove', drag);
    function drag(e) {
        if (!isDragging) return;
        currentPosition.x = e.clientX - startPosition.x;
        currentPosition.y = e.clientY - startPosition.y;
        updateCropImageTransform();
    }

    document.addEventListener('mouseup', () => { isDragging = false; });

    function updateCropImageTransform() {
        cropImage.style.transform = `translate(${currentPosition.x}px, ${currentPosition.y}px) scale(${currentScale})`;
    }

    cancelCropBtn.addEventListener('click', () => {
        cropModal.style.display = 'none';
        document.body.classList.remove('modal-open');
        fileInput.value = '';
        currentFile = null;
    });

    saveCropBtn.addEventListener('click', () => {
        previewImage.src = cropImage.src;
        previewImage.style.display = 'block';
        document.querySelector('.profile-preview .placeholder').style.display = 'none';
        removeBtn.style.display = 'block';
        successMessage.style.display = 'block';
        const scaleRatio = 70 / 200;
        previewImage.style.transform = `translate(${currentPosition.x * scaleRatio}px, ${currentPosition.y * scaleRatio}px) scale(${currentScale})`;
        cropModal.style.display = 'none';
        document.body.classList.remove('modal-open');
        setTimeout(() => successMessage.style.display = 'none', 3000);
    });
});