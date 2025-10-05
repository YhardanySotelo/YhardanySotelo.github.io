/* ===== Datos ===== */
const DATA = {
  artist: {
    name: 'Sebastián Yepes',
    cover: 'https://picsum.photos/900/900?random=15',
    avatar: 'img/artist.webp'
  },
  menu:[
    { id:'bio', label:'Biografía', subtitle:'Sobre el artista' },
    { id:'music', label:'Música', subtitle:'Pistas & demos' },
    { id:'photos', label:'Fotos', subtitle:'Galería visual' },
    { id:'social', label:'Redes', subtitle:'Instagram / Facebook' },
    { id:'games', label:'Juegos', subtitle:'Naves (rueda)' } // nuevo elemento
  ],
  tracks:[
    { title:'No me veré caer', src:'assets/track1.mp3', length:'3:22', art:'img/track1.webp' },
    { title:'Track Two', src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', length:'4:02', art:'https://picsum.photos/600/600?random=14' },
    { title:'Ambient Demo', src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', length:'2:48', art:'https://picsum.photos/600/600?random=16' }
  ],
  gallery:[
    'img/pic1.webp',
    'img/pic2.webp',
    'img/pic3.webp',
    'img/pic4.webp'
  ]
};

/* ===== Referencias DOM ===== */
const leftPane = document.getElementById('leftPane');
const artistAvatar = document.getElementById('artistAvatar');
const nowTitle = document.getElementById('nowTitle');
const nowArtist = document.getElementById('nowArtist');
const bigBar = document.getElementById('bigBar');

const leftTimeCurrent = document.getElementById('leftTimeCurrent');
const leftTimeTotal = document.getElementById('leftTimeTotal');

const menuList = document.getElementById('menuList');
const pages = {
  bio: document.getElementById('page-bio'),
  music: document.getElementById('page-music'),
  photos: document.getElementById('page-photos'),
  social: document.getElementById('page-social'),
  games: document.getElementById('page-games') // nueva página
};

const tracksList = document.getElementById('tracksList');
const galleryGrid = document.getElementById('galleryGrid');

const player = document.getElementById('player');
const playingArt = document.getElementById('playingArt');
const playingTitle = document.getElementById('playingTitle');
const playingArtist = document.getElementById('playingArtist');
const mainBar = document.getElementById('mainBar');
const timeCurrent = document.getElementById('timeCurrent');
const timeTotal = document.getElementById('timeTotal');

const btnSelect = document.getElementById('btn-select');
const btnMenu = document.getElementById('btn-menu');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnPlay = document.getElementById('btn-play');

const photoModal = document.getElementById('photoModal');
const modalImg = document.getElementById('modalImg');
const photoThumbs = document.getElementById('photoThumbs');
const photoClose = document.getElementById('photoClose');
const photoPrev = document.getElementById('photoPrev');
const photoNext = document.getElementById('photoNext');

const wheel = document.getElementById('wheel');

/* ===== Estado global ===== */
let currentMenuIndex = 0;
let inPage = false;
let currentPageId = null;
let currentTrackIndex = 0;
let currentPhotoIndex = 0;

/* ===== MSE globals (sin cambios) ===== */
let currentMSE = { mediaSource: null, sourceBuffer: null, objectUrl: null, fetchController: null, queue: [], isUsingMSE: false };

/* ===== Util helpers ===== */
function isInsideButton(target){ return !!target.closest('button'); }
function scrollActivePage(steps, direction){
  if(!inPage || !currentPageId) return;
  const active = pages[currentPageId];
  if(!active) return;
  const amount = 80 * steps * direction;
  const maxScroll = active.scrollHeight - active.clientHeight;
  const desired = active.scrollTop + amount;
  const clamped = Math.max(0, Math.min(maxScroll, desired));
  active.scrollTo({top: clamped, behavior: 'smooth'});
}

/* ===== Inicialización UI ===== */
function initArtist(){
  leftPane.style.backgroundImage = `url('${DATA.artist.cover}')`;
  artistAvatar.src = DATA.artist.avatar;
  nowArtist.textContent = DATA.artist.name;
}
function renderMenu(){
  menuList.innerHTML = '';
  DATA.menu.forEach((m,i)=>{
    const li = document.createElement('li');
    li.tabIndex = 0;
    li.dataset.id = m.id;
    li.setAttribute('role','menuitem');
    if(i===currentMenuIndex){
      li.className = 'selected';
      setTimeout(()=> li.scrollIntoView({block:'nearest', behavior:'smooth'}), 0);
    }
    li.innerHTML = `<div><div style="font-size:14px">${m.label}</div><div class="subtitle">${m.subtitle}</div></div><div>›</div>`;
    li.addEventListener('click', ()=> { activateMenuIndex(i); });
    li.addEventListener('keydown', (e)=>{ if(e.key==='Enter') activateMenuIndex(i); });
    menuList.appendChild(li);
  });
}


/* muestra/oculta páginas */
function showPage(id){
  if(window.Game && window.Game.running){
     window.Game.stop();
     document.getElementById("page-games").style.display = "none";
  }
 
  const rightPane = document.getElementById('rightPane');

  if(!id){
    inPage = false;
    currentPageId = null;
    leftPane.classList.remove('hidden');
    rightPane.classList.remove('full');
    Object.values(pages).forEach(p => { 
      p.classList.remove('active'); 
      p.setAttribute('aria-hidden','true'); 
    });
    menuList.style.display = 'block';
    setTimeout(()=> renderMenu(), 160);
    // si veníamos de juegos, detener juego
    if(window.Game && window.Game.running){
         window.Game.stop();
    }
    return;
  }

  inPage = true;
  currentPageId = id;

  document.body.classList.add("no-transition");

  menuList.style.display = 'none';
  leftPane.classList.add('hidden');
  rightPane.classList.add('full');

  rightPane.style.width = "95%";
  leftPane.style.width = "5%";
  rightPane.offsetHeight;

  requestAnimationFrame(()=>{
    document.body.classList.remove("no-transition");
    rightPane.style.width = "";
    leftPane.style.width = "";
  });

  Object.values(pages).forEach(p => { 
    p.classList.remove('active'); 
    p.setAttribute('aria-hidden','true'); 
  });
  pages[id].classList.add('active');
  pages[id].setAttribute('aria-hidden','false');

  requestAnimationFrame(()=> {
    pages[id].scrollTop = 0;
    if(id === 'music'){ openMusic(); }
    if(id === 'photos'){ populateGallery(); }
    if (id === 'games') {
        document.getElementById("page-games").style.display = "flex";
      if (window.Game) {
        window.Game.stop();            // asegurar detenido
        if (window.Game.startCountdown) window.Game.startCountdown();
      }
    }
    if(id != 'games'){
        window.Game.stop(); 
        document.getElementById("page-games").style.display = "none";
    }

  });
}

function activateMenuIndex(i){
  currentMenuIndex = i;
  renderMenu();
  showPage(DATA.menu[i].id);

}

/* ===== Tracks & Now Playing ===== */
function populateTracks(){
  tracksList.innerHTML = '';
  DATA.tracks.forEach((t,i) => {
    const div = document.createElement('div');
    div.className = 'track';
    div.tabIndex = 0;
    div.innerHTML = `<div><strong>${t.title}</strong><div style="font-size:12px;color:#cfd8dc">${t.length}</div></div><div><button aria-label="Reproducir ${t.title}">Play</button></div>`;
    div.querySelector('button').addEventListener('click', (ev) => { ev.stopPropagation(); playTrack(i); });
    div.addEventListener('click', ()=> playTrack(i));
    div.addEventListener('keydown', (e)=>{ if(e.key==='Enter') playTrack(i); });
    tracksList.appendChild(div);
  });
}

function playTrack(i){
  if(i < 0 || i >= DATA.tracks.length) return;
  if(i === currentTrackIndex && player.src && player.paused){
    player.play().catch(()=>{});
    return;
  }
  cleanupCurrentMSE();
  currentTrackIndex = i;
  const t = DATA.tracks[i];
  loadTrackWithMSE(t.src).then((usedMSE) => {
    if(!usedMSE){
      player.src = t.src;
      player.preload = 'auto';
      player.play().catch(()=>{});
    }
  }).catch((err)=>{
    player.src = t.src;
    player.preload = 'auto';
    player.play().catch(()=>{});
  });
  updateNowPlayingUI(t);
}

function updateNowPlayingUI(t){
  playingTitle.textContent = t.title;
  playingArtist.textContent = DATA.artist.name;
  playingArt.src = t.art || DATA.artist.avatar || "img/placeholder.png";
  nowTitle.textContent = t.title;
  nowArtist.textContent = DATA.artist.name;
  leftPane.style.backgroundImage = `url('${t.art || DATA.artist.cover}')`;
}

function openMusic(){
  populateTracks();
  if(!player.src){
    currentTrackIndex = 0;
    const first = DATA.tracks[0];
    player.src = first.src;
    player.preload = "metadata";
    player.pause();
    playingArt.src = first.art || DATA.artist.avatar;
    playingTitle.textContent = first.title;
    playingArtist.textContent = DATA.artist.name;
    nowTitle.textContent = first.title;
    nowArtist.textContent = DATA.artist.name;
    leftPane.style.backgroundImage = `url('${first.art || DATA.artist.cover}')`;
  }
}

/* ========== MSE (sin cambios funcionales importantes) ========== */
async function loadTrackWithMSE(url){
  if(!('MediaSource' in window)) return false;
  try{
    const headResp = await fetch(url, { method: 'HEAD' });
    const acceptRanges = headResp.headers.get('accept-ranges') || '';
    const contentLengthHeader = headResp.headers.get('content-length');
    const contentLength = contentLengthHeader ? parseInt(contentLengthHeader, 10) : NaN;
    const supportsRange = acceptRanges.toLowerCase().includes('bytes');
    if(!supportsRange || isNaN(contentLength)) return false;
    const mime = 'audio/mpeg';
    const mediaSource = new MediaSource();
    currentMSE.mediaSource = mediaSource;
    currentMSE.queue = [];
    currentMSE.fetchController = new AbortController();
    currentMSE.isUsingMSE = true;
    const objectUrl = URL.createObjectURL(mediaSource);
    currentMSE.objectUrl = objectUrl;
    player.src = objectUrl;
    await new Promise((resolve, reject) => {
      const onSourceOpen = () => {
        try{
          const sb = mediaSource.addSourceBuffer(mime);
          currentMSE.sourceBuffer = sb;
          resolve();
        }catch(err){ reject(err); }
        finally { mediaSource.removeEventListener('sourceopen', onSourceOpen); }
      };
      mediaSource.addEventListener('sourceopen', onSourceOpen);
      setTimeout(()=> {
        if(mediaSource.readyState !== 'open') reject(new Error('MediaSource open timeout'));
      }, 5000);
    });
    const chunkSize = 64 * 1024;
    let start = 0;
    const total = contentLength;
    const sb = currentMSE.sourceBuffer;
    function appendBufferChunk(ab){
      if(!sb) return;
      if(sb.updating) currentMSE.queue.push(ab);
      else sb.appendBuffer(ab);
    }
    sb.addEventListener('updateend', ()=>{
      if(currentMSE.queue.length){
        const next = currentMSE.queue.shift();
        try{ sb.appendBuffer(next); } catch(e){ console.error(e); }
      }
    });
    const controller = currentMSE.fetchController;
    const signal = controller.signal;
    let appendedFirstChunk = false;
    while(start < total){
      if(signal.aborted) throw new Error('aborted');
      const end = Math.min(start + chunkSize - 1, total - 1);
      const rangeHeader = `bytes=${start}-${end}`;
      const resp = await fetch(url, { headers: { Range: rangeHeader }, signal });
      if(!resp.ok && resp.status !== 206) throw new Error('Range request failed with status ' + resp.status);
      const arrayBuffer = await resp.arrayBuffer();
      appendBufferChunk(arrayBuffer);
      if(!appendedFirstChunk){
        appendedFirstChunk = true;
        player.play().catch(()=>{});
      }
      start += chunkSize;
    }
    const waitForAllAppended = () => new Promise((resolve) => {
      const check = () => {
        if(!sb.updating && currentMSE.queue.length === 0) resolve();
        else setTimeout(check, 50);
      };
      check();
    });
    await waitForAllAppended();
    try{ if(currentMSE.mediaSource && currentMSE.mediaSource.readyState === 'open'){ currentMSE.mediaSource.endOfStream(); } }catch(e){}
    return true;
  }catch(err){
    cleanupCurrentMSE();
    console.warn('MSE pipeline error', err);
    return false;
  }
}

function cleanupCurrentMSE(){
  try{ if(currentMSE.fetchController) currentMSE.fetchController.abort(); }catch(e){}
  try{
    if(currentMSE.sourceBuffer && currentMSE.mediaSource && currentMSE.mediaSource.readyState === 'open'){
      try{ currentMSE.mediaSource.removeSourceBuffer(currentMSE.sourceBuffer); } catch(e){}
    }
  }catch(e){}
  try{ if(currentMSE.objectUrl) URL.revokeObjectURL(currentMSE.objectUrl); }catch(e){}
  currentMSE = { mediaSource: null, sourceBuffer: null, objectUrl: null, fetchController: null, queue: [], isUsingMSE: false };
}

/* player events */
player.addEventListener('loadedmetadata', ()=> { 
  if(timeTotal) timeTotal.textContent = formatTime(player.duration || 0);
  if(leftTimeTotal) leftTimeTotal.textContent = formatTime(player.duration || 0);
});
player.addEventListener('timeupdate', ()=> {
  if(player.duration && !isNaN(player.duration)){
    const pct = Math.max(0, Math.min(100, (player.currentTime / player.duration) * 100));
    if(mainBar) mainBar.style.width = pct + '%';
    if(bigBar) bigBar.style.width = pct + '%';
    if(timeCurrent) timeCurrent.textContent = formatTime(player.currentTime);
    if(timeTotal) timeTotal.textContent = formatTime(player.duration);
    if(leftTimeCurrent) leftTimeCurrent.textContent = formatTime(player.currentTime);
    if(leftTimeTotal) leftTimeTotal.textContent = formatTime(player.duration);
  }
});
player.addEventListener('ended', ()=> {
  const next = (currentTrackIndex + 1) % DATA.tracks.length;
  playTrack(next);
});
function formatTime(s){ if(!s || isNaN(s)) return '0:00'; const min = Math.floor(s/60); const sec = Math.floor(s%60).toString().padStart(2,'0'); return `${min}:${sec}`; }

/* ===== Gallery & Modal ===== */
function populateGallery(){
  galleryGrid.innerHTML = '';
  DATA.gallery.forEach((url, idx)=>{
    const img = document.createElement('img');
    img.src = url; img.alt = 'Foto artista';
    img.tabIndex = 0;
    img.addEventListener('click', ()=> openPhoto(idx));
    img.addEventListener('keydown', (e)=>{ if(e.key==='Enter') openPhoto(idx); });
    galleryGrid.appendChild(img);
  });
}
function openPhoto(index){
  if(index < 0 || index >= DATA.gallery.length) return;
  currentPhotoIndex = index;
  modalImg.src = DATA.gallery[index];
  photoModal.classList.add('open'); photoModal.setAttribute('aria-hidden','false');
  buildPhotoThumbs(); highlightActiveThumb();
}
function closePhoto(){ photoModal.classList.remove('open'); photoModal.setAttribute('aria-hidden','true'); modalImg.src=''; }
function buildPhotoThumbs(){
  photoThumbs.innerHTML = '';
  DATA.gallery.forEach((u,i)=>{
    const t = document.createElement('img'); t.src = u; t.alt='Miniatura'; t.tabIndex=0;
    t.addEventListener('click', ()=> openPhoto(i)); t.addEventListener('keydown', (e)=>{ if(e.key==='Enter') openPhoto(i); });
    if(i===currentPhotoIndex) t.classList.add('active');
    photoThumbs.appendChild(t);
  });
}
function highlightActiveThumb(){ const thumbs = photoThumbs.querySelectorAll('img'); thumbs.forEach((img,i)=> img.classList.toggle('active', i===currentPhotoIndex)); }

photoPrev.addEventListener('click', ()=> { currentPhotoIndex=(currentPhotoIndex-1+DATA.gallery.length)%DATA.gallery.length; modalImg.src = DATA.gallery[currentPhotoIndex]; highlightActiveThumb(); });
photoNext.addEventListener('click', ()=> { currentPhotoIndex=(currentPhotoIndex+1)%DATA.gallery.length; modalImg.src = DATA.gallery[currentPhotoIndex]; highlightActiveThumb(); });
photoClose.addEventListener('click', closePhoto);
photoModal.addEventListener('click', (e)=> { if(e.target === photoModal) closePhoto(); });
modalImg.addEventListener('click', (e)=> e.stopPropagation());

/* ===== Wheel rotation (entrada para la rueda) ===== */
let tracking=false, lastAngle=null, accumulator=0;
const THRESH = 18; // sensibilidad de cada "paso"

/* calcula ángulo desde evento */
function angleFromEvent(e){
  const rect = wheel.getBoundingClientRect();
  const cx = rect.left + rect.width/2;
  const cy = rect.top + rect.height/2;
  const ev = (e.touches && e.touches[0]) ? e.touches[0] : e;
  const x = ev.clientX - cx;
  const y = ev.clientY - cy;
  return Math.atan2(y, x) * 180 / Math.PI;
}

/* procesar pasos detectados por la rueda
   dir: 1 => sentido horario (bajar), -1 => antihorario (subir) */
function step(delta){
  if(delta > 60) delta = 60;
  if(delta < -60) delta = -60;

  accumulator += delta;
  const maxAccum = THRESH * 4;
  if(accumulator > maxAccum) accumulator = maxAccum;
  if(accumulator < -maxAccum) accumulator = -maxAccum;

  if(Math.abs(accumulator) >= THRESH){
    const steps = Math.floor(Math.abs(accumulator) / THRESH);
    const dir = accumulator > 0 ? 1 : -1;
    accumulator = accumulator - dir * steps * THRESH;

    // comportamiento específico si estamos en la página de juegos
    if(inPage && currentPageId === 'games' && window.Game){
      window.Game.handleWheel(dir * steps); // control del juego por la rueda
    } else if(!inPage){
      currentMenuIndex = (currentMenuIndex + dir * steps + DATA.menu.length) % DATA.menu.length;
      renderMenu();
    } else {
      if(currentPageId === 'photos' && photoModal.classList.contains('open')){
        currentPhotoIndex = (currentPhotoIndex + dir * steps + DATA.gallery.length) % DATA.gallery.length;
        modalImg.src = DATA.gallery[currentPhotoIndex];
        highlightActiveThumb();
      } else {
        scrollActivePage(steps, dir);
      }
    }

    if(navigator.vibrate) navigator.vibrate(6);
  }
}

/* eventos de puntero/táctil para la rueda */
wheel.addEventListener('pointerdown', (e)=>{
  if(isInsideButton(e.target)) return;
  tracking = true;
  lastAngle = angleFromEvent(e);
  try{ wheel.setPointerCapture && wheel.setPointerCapture(e.pointerId); }catch(err){}
});
wheel.addEventListener('pointermove', (e)=>{
  if(!tracking) return;
  const a = angleFromEvent(e);
  let delta = a - lastAngle;
  if(delta > 180) delta -= 360;
  if(delta < -180) delta += 360;
  lastAngle = a;
  if(delta > 60) delta = 60;
  if(delta < -60) delta = -60;
  step(delta);
});
wheel.addEventListener('pointerup', (e)=>{
  tracking=false; lastAngle=null; accumulator=0;
  try{ wheel.releasePointerCapture && wheel.releasePointerCapture(e.pointerId); }catch(err){}
});
wheel.addEventListener('touchstart', (e)=>{
  if(isInsideButton(e.target)) return;
  tracking=true; lastAngle = angleFromEvent(e);
}, {passive:false});
wheel.addEventListener('touchmove', (e)=>{
  if(!tracking) return;
  const a = angleFromEvent(e);
  let delta = a - lastAngle;
  if(delta > 180) delta -= 360;
  if(delta < -180) delta += 360;
  lastAngle = a;
  if(delta > 60) delta = 60;
  if(delta < -60) delta = -60;
  step(delta);
  e.preventDefault();
}, {passive:false});
wheel.addEventListener('touchend', ()=>{ tracking=false; lastAngle=null; accumulator=0; });

/* ===== Botones de la rueda ===== */
function safePlayToggle(){
  if(!player.src) { playTrack(0); return; }
  if(player.paused) { player.play().catch(()=>{}); }
  else { player.pause(); }
}

document.getElementById('btn-select').addEventListener('click', ()=>{
  if(!inPage){
    const id = DATA.menu[currentMenuIndex].id;
    showPage(id);
  } else {
    if(currentPageId === 'music') safePlayToggle();
    else if(currentPageId === 'photos') openPhoto(0);
    else if(currentPageId === 'games' && window.Game) window.Game.togglePause(); 
  }
});
document.getElementById('btn-menu').addEventListener('click', ()=>{
  console.log("click")
  document.getElementById("page-games").style.display = "none";
  if(inPage){
    console.log("in page true")
    showPage(null);
  }
  else {
     console.log("in page false")
     currentMenuIndex = 0; 
     renderMenu(); 
    }
});
document.getElementById('btn-prev').addEventListener('click', ()=>{
  if(!inPage){
    const prev = (currentTrackIndex - 1 + DATA.tracks.length) % DATA.tracks.length;
    playTrack(prev);
  } else if(currentPageId === 'music'){
    const prev = (currentTrackIndex - 1 + DATA.tracks.length) % DATA.tracks.length; playTrack(prev);
  } else if(currentPageId === 'photos'){
    if(photoModal.classList.contains('open')) photoPrev.click(); else openPhoto(DATA.gallery.length - 1);
  } else {
    if(currentPageId) pages[currentPageId].scrollBy({top:-80, behavior:'smooth'});
  }
});
document.getElementById('btn-next').addEventListener('click', ()=>{
  if(!inPage){
    const next = (currentTrackIndex + 1) % DATA.tracks.length;
    playTrack(next);
  } else if(currentPageId === 'music'){
    const next = (currentTrackIndex + 1) % DATA.tracks.length; playTrack(next);
  } else if(currentPageId === 'photos'){
    if(photoModal.classList.contains('open')) photoNext.click(); else openPhoto(0);
  } else {
    if(currentPageId) pages[currentPageId].scrollBy({top:80, behavior:'smooth'});
  }
});
document.getElementById('btn-play').addEventListener('click', ()=> safePlayToggle());

/* ===== Soporte teclado y accesibilidad ===== */
window.addEventListener('keydown', (e)=>{
  if(e.key === 'ArrowUp'){ currentMenuIndex = (currentMenuIndex - 1 + DATA.menu.length) % DATA.menu.length; renderMenu(); }
  if(e.key === 'ArrowDown'){ currentMenuIndex = (currentMenuIndex + 1) % DATA.menu.length; renderMenu(); }
  if(e.key === 'Enter'){ document.getElementById('btn-select').click(); }
  if(e.key === 'Escape'){ document.getElementById('btn-menu').click(); if(photoModal.classList.contains('open')) closePhoto(); }
});

/* Live region accesible */
const live = document.createElement('div');
live.setAttribute('aria-live','polite'); live.style.position='absolute'; live.style.left='-9999px';
document.body.appendChild(live);
const mo = new MutationObserver(()=> live.textContent = DATA.menu[currentMenuIndex].label + ' seleccionado');
mo.observe(menuList,{childList:true,subtree:true});

/* ===== Swipe en páginas para volver al menú (móvil) ===== */
(function enablePageSwipeToLeft(){
  let startX = null, startY = null, trackingSwipe = false;
  const threshold = 50;
  function onStart(e){
    if(!inPage) return;
    const ev = (e.touches && e.touches[0]) ? e.touches[0] : e;
    startX = ev.clientX;
    startY = ev.clientY;
    trackingSwipe = true;
  }
  function onEnd(e){
    if(!trackingSwipe) return;
    const ev = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0] : e;
    const dx = ev.clientX - startX;
    const dy = ev.clientY - startY;
    if(Math.abs(dx) > Math.abs(dy) && dx > threshold){
      showPage(null);
    }
    startX = null; startY = null; trackingSwipe = false;
  }
  Object.values(pages).forEach(p => {
    p.addEventListener('touchstart', onStart, {passive:true});
    p.addEventListener('touchend', onEnd, {passive:true});
    p.addEventListener('pointerdown', (ev)=> { if(ev.pointerType === 'touch') onStart(ev); }, {passive:true});
    p.addEventListener('pointerup', (ev)=> { if(ev.pointerType === 'touch') onEnd(ev); }, {passive:true});
  });
})();

/* ===== Inicializar ===== */
function init(){
  initArtist();
  renderMenu();
  populateTracks();

  currentTrackIndex = 0;
  const first = DATA.tracks[0];
  player.src = first.src;
  player.preload = "metadata";
  player.pause();
  updateNowPlayingUI(first);
  if(bigBar) bigBar.style.width = "0%";
}
init();

/* evitar arrastrar imágenes */
document.addEventListener('dragstart', (e)=>{ if(e.target.tagName === 'IMG') e.preventDefault(); });

/* swipe horizontal extra para mostrar/ocultar leftPane (comportamiento táctil) */
const content = document.getElementById("content");
let startX = 0;
content.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
content.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  let diffX = endX - startX;
    if (diffX > 50 && inPage) {
    // Salir de la página actual con gesto a la derecha
        showPage(null); // ✅ Esto detiene el juego y oculta page-games
        return;
    } else if (Math.abs(diffX) > 50 && !inPage) {
    if (diffX > 0) {
      document.getElementById("leftPane").classList.remove("hidden");
      document.getElementById("rightPane").classList.remove("full");
    } else {
      document.getElementById("leftPane").classList.add("hidden");
      document.getElementById("rightPane").classList.add("full");
    }
  }
}, { passive: true });

/* ===== STATUS ICONS (batería + señal) ===== */
(function initStatusIcons(){
  const battLevelEl = document.getElementById('batteryLevel');
  const batteryWrap = document.getElementById('batteryWrap');
  const signalWrap = document.getElementById('signalIcon');

  function setBatteryLevel(p){
    const clamped = Math.max(0, Math.min(1, p));
    battLevelEl.style.width = (clamped*100) + '%';
    let color = '#4caf50';
    if(clamped <= 0.15) color = '#f44336';
    else if(clamped <= 0.35) color = '#ffeb3b';
    battLevelEl.style.background = color;
    batteryWrap.classList.toggle('low', clamped <= 0.15);
  }

  let batteryLevel = 1.0;
  let discharging = true;

  function simulateBattery(){
    if(discharging){
      batteryLevel -= 0.05;
      if(batteryLevel <= 0){ batteryLevel = 0; discharging = false; }
    } else {
      batteryLevel += 0.05;
      if(batteryLevel >= 1){ batteryLevel = 1; discharging = true; }
    }
    setBatteryLevel(batteryLevel);
  }

  setBatteryLevel(batteryLevel);
  setInterval(simulateBattery, 60000);

  function renderSignal(effectiveType){
    const map = { 'slow-2g':1, '2g':1, '3g':2, '4g':4, 'wifi':4, undefined:3 };
    const bars = map[effectiveType] ?? 3;
    const spans = signalWrap.querySelectorAll('span');
    spans.forEach((s, i) => { if(i < bars) s.classList.add('active'); else s.classList.remove('active'); });
  }

  if(navigator.connection && navigator.connection.effectiveType){
    renderSignal(navigator.connection.effectiveType);
    try{ navigator.connection.addEventListener('change', ()=> renderSignal(navigator.connection.effectiveType)); }catch(e){}
  } else {
    renderSignal('4g');
  }
})();

/* ===== Reloj real ===== */
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const timeString = `${hours}:${minutes} ${ampm} • Music`;
  document.getElementById("headerTitle").textContent = timeString;
}
updateClock();
setInterval(updateClock, 60000);




/* ===== Control adicional: al entrar/salir de la página juegos ===== */
window.addEventListener('visibilitychange', ()=> {
  if(document.hidden && window.Game && window.Game.running) window.Game.stop();
});

/* ===== Botón físico OK también controla juego (ya definido arriba) ===== */

/* Fin del script */

