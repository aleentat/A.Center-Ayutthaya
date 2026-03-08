function renderPortfolio() {
    const nav = document.querySelector('.portfolio-category-nav');
    const container = document.getElementById('portfolioCategories');
    if (!nav || !container || !window.portfolioCategories || !window.portfolioData) return;

    nav.innerHTML = '';
    container.innerHTML = '';

    window.portfolioCategories.forEach(category => {
        const navButton = document.createElement('a');
        navButton.href = `#${category.id}`;
        navButton.className = 'portfolio-category-btn';
        navButton.textContent = category.label;
        nav.appendChild(navButton);

        const section = document.createElement('div');
        section.className = 'portfolio-category';
        section.id = category.id;

        const heading = document.createElement('h3');
        heading.textContent = category.label;
        section.appendChild(heading);

        category.items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'portfolio-work';
            card.addEventListener('click', () => openModal(item.key));

            const data = window.portfolioData[item.key];
            const desc = document.createElement('div');
            desc.className = 'work-desc';
            desc.innerHTML = `<h4>${data.title}</h4>`;

            const images = document.createElement('div');
            images.className = 'work-images';
            images.innerHTML = `<img src="${item.thumb}" alt="${item.thumbAlt}">`;

            card.appendChild(desc);
            card.appendChild(images);
            section.appendChild(card);
        });

        container.appendChild(section);
    });
}

function openModal(key) {
    const data = window.portfolioData[key];
    if (!data) return;

    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalDesc').innerText = data.desc;

    const imageContainer = document.getElementById('modalImages');
    imageContainer.innerHTML = '';

    data.images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.onclick = () => openViewer(src);
        imageContainer.appendChild(img);
    });

    document.getElementById('portfolioModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('portfolioModal').style.display = 'none';
}

function openViewer(src) {
    document.getElementById('viewerImg').src = src;
    document.getElementById('imageViewer').classList.add('active');
}

function closeViewer() {
    document.getElementById('imageViewer').classList.remove('active');
}

function initTrustButtons() {
    document.querySelectorAll('.trust-btn').forEach(button => {
        button.addEventListener('click', function () {
            const fullList = this.parentElement.querySelector('.trust-list.full');
            if (fullList.style.display === 'block') {
                fullList.style.display = 'none';
                this.innerText = 'เพิ่มเติม ↓';
            } else {
                fullList.style.display = 'block';
                this.innerText = 'ย่อ ↑';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio();
    initTrustButtons();
});
