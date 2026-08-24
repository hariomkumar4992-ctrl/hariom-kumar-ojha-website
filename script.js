// script.js — injects 60 placeholder photos and handles lightbox + filtering
const gallery = document.getElementById('galleryGrid');
const loadMore = document.getElementById('loadMore');
const searchInput = document.getElementById('searchInput');
const yearEl = document.getElementById('year');
let photos = [];
let showingAll = false;

// generate 60 photo objects (using picsum.photos)
for (let i = 10; i < 70; i++) {
  photos.push({
    id: i,
    src: `https://picsum.photos/id/${i}/800/600`,
    thumb: `https://picsum.photos/id/${i}/600/400`,
    caption: `Celebration photo ${i - 9}`
  });
}

function render(limit = 12) {
  gallery.innerHTML = '';
  const list = showingAll ? photos : photos.slice(0, limit);
  list.forEach((p, idx) => {
    const a = document.createElement('a');
    a.href = p.src;
    a.className = 'product';
    a.dataset.index = idx;
    a.innerHTML = `<img loading="lazy" src="${p.thumb}" alt="${p.caption}" /><div class="caption">${p.caption}</div>`;
    a.addEventListener('click', openLightbox);
    gallery.appendChild(a);
  });
}

function openLightbox(e) {
  e.preventDefault();
  const url = this.href;
  const caption = this.querySelector('.caption').textContent;
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  lbImg.src = url;
  lbImg.alt = caption;
  lbCaption.textContent = caption;
  lb.style.display = 'flex';
  lb.setAttribute('aria-hidden','false');
  document.getElementById('closeLb').focus();
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.style.display = 'none';
  lb.setAttribute('aria-hidden','true');
}

document.getElementById('closeLb').addEventListener('click', closeLightbox);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

loadMore.addEventListener('click', () => {
  showingAll = true;
  render();
  loadMore.style.display = 'none';
});

searchInput.addEventListener('input', (e) => {
  const q = e.target.value.trim().toLowerCase();
  if (!q) { render(showingAll ? photos.length : 12); return; }
  const filtered = photos.filter(p => p.caption.toLowerCase().includes(q));
  gallery.innerHTML = '';
  filtered.forEach(p => {
    const a = document.createElement('a');
    a.href = p.src;
    a.className = 'product';
    a.innerHTML = `<img loading="lazy" src="${p.thumb}" alt="${p.caption}" /><div class="caption">${p.caption}</div>`;
    a.addEventListener('click', openLightbox);
    gallery.appendChild(a);
  });
});

// init
render();
yearEl.textContent = new Date().getFullYear();

// simple form prevention (no backend)
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thanks — this is a demo site. To actually send messages, connect a backend or forms provider.');
});
