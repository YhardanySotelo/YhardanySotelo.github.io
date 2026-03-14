/* ═══════════════════════════════════════════════════
   SOTELO OS — System  (SVG Icon Edition)
═══════════════════════════════════════════════════ */
'use strict';
var Z=300, WINS={}, DRAG=null;
var isMobile=()=>window.innerWidth<=1024;

/* ── Clock ── */
function tick(){
  var t=new Date().toLocaleTimeString('es-CO',{timeZone:'America/Bogota',hour:'2-digit',minute:'2-digit',hour12:false});
  var a=document.getElementById('mb-clock'); if(a)a.textContent=t;
  var b=document.getElementById('ios-time'); if(b)b.textContent=t.slice(0,5);
}
tick(); setInterval(tick,1000);

/* ══════════════════════════════════════
   SVG ICON LIBRARY — all identical cross-platform
══════════════════════════════════════ */
var ICONS = {
  finder: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="60" rx="13" fill="#2680EB"/>
    <rect x="8" y="16" width="44" height="32" rx="4" fill="white" opacity=".95"/>
    <rect x="8" y="16" width="44" height="10" rx="4" fill="#1A65D6"/>
    <circle cx="16" cy="21" r="3" fill="#FF5F57"/>
    <circle cx="26" cy="21" r="3" fill="#FEBC2E"/>
    <circle cx="36" cy="21" r="3" fill="#28C840"/>
    <rect x="14" y="32" width="16" height="3" rx="1.5" fill="#BDD0ED"/>
    <rect x="14" y="38" width="11" height="3" rx="1.5" fill="#BDD0ED"/>
    <circle cx="42" cy="37" r="6" stroke="white" stroke-width="2.5" fill="none"/>
    <path d="M46.5 42l3 3" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  about: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="60" rx="13" fill="url(#sic-about)"/>
    <circle cx="30" cy="22" r="9" fill="white" opacity=".95"/>
    <path d="M10 52c0-11 9-20 20-20s20 9 20 20" stroke="white" stroke-width="3" stroke-linecap="round" fill="none" opacity=".9"/>
  </svg>`,

  projects: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="60" rx="13" fill="url(#sic-projects)"/>
    <rect x="10" y="20" width="40" height="28" rx="4" fill="white" opacity=".95"/>
    <rect x="10" y="14" width="18" height="9" rx="3" fill="white" opacity=".75"/>
    <rect x="16" y="28" width="20" height="3" rx="1.5" fill="#34C759" opacity=".7"/>
    <rect x="16" y="34" width="14" height="3" rx="1.5" fill="#34C759" opacity=".5"/>
    <rect x="16" y="40" width="17" height="3" rx="1.5" fill="#34C759" opacity=".4"/>
  </svg>`,

  services: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="60" rx="13" fill="url(#sic-services)"/>
    <polygon points="30,10 35,22 48,22 38,30 42,42 30,34 18,42 22,30 12,22 25,22" fill="white" opacity=".95"/>
  </svg>`,

  gallery: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="60" rx="13" fill="url(#sic-gallery)"/>
    <rect x="9" y="13" width="42" height="34" rx="5" fill="white" opacity=".95"/>
    <circle cx="20" cy="23" r="4" fill="#FFD60A"/>
    <path d="M9 36l10-8 9 7 7-6 16 10" stroke="#FF9F0A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>`,

  terminal: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="60" rx="13" fill="#1E1E1E"/>
    <rect x="9" y="13" width="42" height="34" rx="5" fill="#282828"/>
    <path d="M16 24l8 6-8 6" stroke="#50FA7B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <rect x="27" y="34" width="14" height="3" rx="1.5" fill="#6272A4"/>
  </svg>`,

  contact: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="60" rx="13" fill="url(#sic-contact)"/>
    <rect x="10" y="17" width="40" height="26" rx="5" fill="white" opacity=".95"/>
    <path d="M10 22l20 14 20-14" stroke="#0A84FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>`,

  philosophy: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="60" rx="13" fill="url(#sic-philosophy)"/>
    <rect x="14" y="12" width="32" height="38" rx="4" fill="white" opacity=".95"/>
    <rect x="19" y="20" width="22" height="2.5" rx="1.25" fill="#BF5AF2" opacity=".7"/>
    <rect x="19" y="26" width="18" height="2.5" rx="1.25" fill="#BF5AF2" opacity=".5"/>
    <rect x="19" y="32" width="20" height="2.5" rx="1.25" fill="#BF5AF2" opacity=".4"/>
    <rect x="19" y="38" width="14" height="2.5" rx="1.25" fill="#BF5AF2" opacity=".3"/>
    <rect x="10" y="24" width="4" height="14" rx="1" fill="white"/>
  </svg>`,

  ipod: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="60" rx="13" fill="url(#sic-ipod)"/>
    <rect x="18" y="8" width="24" height="44" rx="6" fill="white" opacity=".95"/>
    <rect x="21" y="12" width="18" height="12" rx="2" fill="#FF2D55" opacity=".2"/>
    <circle cx="30" cy="38" r="8" stroke="#FF2D55" stroke-width="2" fill="none" opacity=".6"/>
    <circle cx="30" cy="38" r="3" fill="#FF2D55" opacity=".8"/>
    <path d="M28 32l5 3-5 3V32z" fill="#FF2D55" opacity=".5"/>
  </svg>`,

  saykyo: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="60" rx="13" fill="url(#sic-saykyo)"/>
    <circle cx="30" cy="30" r="16" stroke="white" stroke-width="3" opacity=".3" fill="none"/>
    <circle cx="30" cy="30" r="16" stroke="white" stroke-width="3" fill="none"
      stroke-dasharray="75 26" stroke-dashoffset="20" stroke-linecap="round"/>
    <text x="30" y="35" text-anchor="middle" font-size="11" font-weight="700" fill="white" font-family="-apple-system,sans-serif">73%</text>
  </svg>`,

  game: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="60" rx="13" fill="#0d0d0d"/>
    <rect x="8" y="8" width="44" height="44" rx="9" fill="#141414"/>
    <rect x="13" y="22" width="7" height="7" rx="2.5" fill="#30D158"/>
    <rect x="22" y="22" width="7" height="7" rx="2.5" fill="#30D158" opacity=".65"/>
    <rect x="31" y="22" width="7" height="7" rx="2.5" fill="#30D158" opacity=".35"/>
    <rect x="13" y="31" width="7" height="7" rx="2.5" fill="#30D158" opacity=".15"/>
    <circle cx="43" cy="32" r="8" fill="#FF2D55"/>
    <path d="M40 32h6M43 29v6" stroke="white" stroke-width="2" stroke-linecap="round"/>
  </svg>`,
}

/* ══════════════════════════════════════
   APP DEFINITIONS
══════════════════════════════════════ */
var APPS = {
  finder:    {title:'Finder',       w:760,h:480, build:buildFinder},
  about:     {title:'Sobre Mí',     w:520,h:480, build:buildAbout},
  projects:  {title:'Proyectos',    w:700,h:530, build:buildProjects},
  services:  {title:'Servicios',    w:700,h:480, build:buildServices},
  gallery:   {title:'Galería',      w:620,h:520, build:buildGallery},
  terminal:  {title:'Terminal',     w:640,h:400, build:buildTerminal},
  contact:   {title:'Contacto',     w:480,h:440, build:buildContact},
  philosophy:{title:'Filosofía',    w:480,h:440, build:buildPhilosophy},
  ipod:      {title:'Músico Colombiano', w:420,h:600, build:buildIpod},
  saykyo:    {title:'Saykyo Training',   w:420,h:600, build:buildSaykyo},
  game:      {title:'Snake',             w:460,h:560, build:buildGame},
};

/* ── icon HTML helper ── */
function iconImg(id, cls){
  cls=cls||'';
  return '<div class="'+cls+'" style="width:100%;height:100%;">'+ICONS[id]+'</div>';
}

/* ══════════════════════════════════════
   WINDOW ENGINE
══════════════════════════════════════ */
function openWin(id,ox,oy){
  var def=APPS[id]; if(!def)return;
  // Bounce desktop icon
  var di=document.querySelector('.desk-icon[data-id="'+id+'"]');
  if(di){di.classList.add('bounce');setTimeout(()=>di.classList.remove('bounce'),500);}
  // Dot
  var dot=document.querySelector('[data-win="'+id+'"] .dock-dot');
  if(dot)dot.classList.add('on');
  // If already open
  if(WINS[id]){focusWin(id);var el=document.getElementById('w-'+id);if(el){el.style.display='flex';el.classList.remove('wmin');}return;}
  var vw=window.innerWidth,vh=window.innerHeight;
  var wx=ox!==undefined?ox:Math.max(20,Math.min(Math.random()*(vw-def.w-40)+20,vw-def.w-20));
  var wy=oy!==undefined?oy:Math.max(40,Math.min(Math.random()*(vh-def.h-120)+40,vh-def.h-90));
  var win=document.createElement('div');
  win.className='win'; win.id='w-'+id; win.dataset.win=id;
  win.style.cssText='left:'+wx+'px;top:'+wy+'px;width:'+def.w+'px;height:'+def.h+'px;';
  win.innerHTML=
    '<div class="win-bar" onmousedown="startDrag(event,\''+id+'\')">' +
      '<div class="win-btns">' +
        '<button class="wbtn cl" onclick="closeWin(\''+id+'\')">✕</button>' +
        '<button class="wbtn mn" onclick="minWin(\''+id+'\')">−</button>' +
        '<button class="wbtn mx" onclick="maxWin(\''+id+'\')">+</button>' +
      '</div>' +
      '<div class="win-title"><div class="win-title-icon">'+ICONS[id]+'</div>'+def.title+'</div>' +
    '</div>' +
    '<div class="win-body" id="wb-'+id+'"></div>';
  document.getElementById('win-layer').appendChild(win);
  win.addEventListener('mousedown',()=>focusWin(id));
  WINS[id]={x:wx,y:wy,w:def.w,h:def.h,maxed:false};
  def.build(document.getElementById('wb-'+id));
  focusWin(id);
  document.getElementById('mb-appname').textContent=def.title;
  if(id==='terminal')setTimeout(runTerminal,200);
}
function closeWin(id){
  var el=document.getElementById('w-'+id);if(!el)return;
  el.classList.add('wclosing');
  setTimeout(()=>{el.remove();delete WINS[id];var d=document.querySelector('[data-win="'+id+'"] .dock-dot');if(d)d.classList.remove('on');},220);
}
function minWin(id){
  var el=document.getElementById('w-'+id);if(!el)return;
  el.classList.add('wmin');setTimeout(()=>{el.style.display='none';el.classList.remove('wmin');},320);
}
function maxWin(id){
  var w=WINS[id];if(!w)return;var el=document.getElementById('w-'+id);
  if(w.maxed){
    el.style.cssText='left:'+w.ox+'px;top:'+w.oy+'px;width:'+w.ow+'px;height:'+w.oh+'px;border-radius:12px;display:flex;flex-direction:column;transition:all .3s cubic-bezier(.16,1,.3,1);';
    w.maxed=false;
  } else {
    w.ox=w.x;w.oy=w.y;w.ow=w.w;w.oh=w.h;
    el.style.cssText='left:0;top:28px;width:100vw;height:calc(100vh - 110px);border-radius:0;display:flex;flex-direction:column;transition:all .3s cubic-bezier(.16,1,.3,1);';
    w.maxed=true;
  }
}
function focusWin(id){
  // id can be a string or an element
  var winId = (typeof id === 'string') ? id : id.dataset.win;
  // Remove priority-top from about when any OTHER window gets focused
  if(winId !== 'about'){
    var aboutWin=document.getElementById('w-about');
    if(aboutWin) aboutWin.classList.remove('priority-top');
  }
  Object.keys(WINS).forEach(k=>{var e=document.getElementById('w-'+k);if(e)e.classList.remove('focused');});
  var el=document.getElementById('w-'+winId);
  if(el){el.classList.add('focused');el.style.zIndex=++Z;}
}
function startDrag(e,id){
  if(e.target.classList.contains('wbtn'))return;
  focusWin(id);
  var r=document.getElementById('w-'+id).getBoundingClientRect();
  DRAG={id,ox:e.clientX-r.left,oy:e.clientY-r.top};
  document.addEventListener('mousemove',onDrag);
  document.addEventListener('mouseup',stopDrag);
  e.preventDefault();
}
function onDrag(e){
  if(!DRAG)return;
  var el=document.getElementById('w-'+DRAG.id);if(!el)return;
  var nx=Math.max(0,Math.min(e.clientX-DRAG.ox,window.innerWidth-100));
  var ny=Math.max(28,Math.min(e.clientY-DRAG.oy,window.innerHeight-60));
  el.style.left=nx+'px';el.style.top=ny+'px';
  if(WINS[DRAG.id]){WINS[DRAG.id].x=nx;WINS[DRAG.id].y=ny;}
}
function stopDrag(){DRAG=null;document.removeEventListener('mousemove',onDrag);document.removeEventListener('mouseup',stopDrag);}

/* ══════════════════════════════════════
   CONTENT BUILDERS
══════════════════════════════════════ */
function buildFinder(el){
  var rows=[
    {id:'finder',lbl:'Finder'},{id:'about',lbl:'Sobre Mí'},{id:'projects',lbl:'Proyectos'},
    {id:'services',lbl:'Servicios'},{id:'terminal',lbl:'Terminal'},
    {id:'philosophy',lbl:'Filosofía'},
  ];
  var cells=[
    {id:'projects',lbl:'Proyectos'},{id:'about',lbl:'Sobre Mí'},{id:'services',lbl:'Servicios'},
    {id:'philosophy',lbl:'Filosofía'},{id:'terminal',lbl:'Terminal'},
    {id:'ipod',lbl:'iPod Web'},{id:'saykyo',lbl:'Saykyo'},{id:'contact',lbl:'Contacto'},
  ];
  el.innerHTML=
    '<div class="finder-wrap">'+
      '<div class="finder-side">'+
        '<div class="fs-sec">Favoritos</div>'+
        rows.map(function(r,i){return '<div class="fs-row'+(i===0?' act':'')+ '" onclick="openWin(\''+r.id+'\')"><div class="fs-ic">'+ICONS[r.id]+'</div>'+r.lbl+'</div>';}).join('')+
        '<div class="fs-sec">Proyectos</div>'+
        '<div class="fs-row" onclick="openWin(\'ipod\')"><div class="fs-ic">'+ICONS.ipod+'</div>iPod Web</div>'+
        '<div class="fs-row" onclick="openWin(\'saykyo\')"><div class="fs-ic">'+ICONS.saykyo+'</div>Saykyo App</div>'+
      '</div>'+
      '<div class="finder-main">'+
        '<div style="font-size:11px;font-weight:600;color:var(--t2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:12px;">Sotelo Studio — Workspace</div>'+
        '<div class="icgrid">'+cells.map(c=>'<div class="gcell" onclick="openWin(\''+c.id+'\')"><div class="gc-img">'+ICONS[c.id]+'</div><div class="gc-lbl">'+c.lbl+'</div></div>').join('')+'</div>'+
        '<div style="margin-top:18px;padding-top:14px;border-top:1px solid var(--sep);">'+
          '<div style="font-size:11px;font-weight:600;color:var(--t2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px;">Info del Sistema</div>'+
          '<div class="info-row"><span class="ik">Sistema</span><span class="iv">Sotelo OS 1.0</span></div>'+
          '<div class="info-row"><span class="ik">Ubicación</span><span class="iv">Tunja, Boyacá · COL</span></div>'+
          '<div class="info-row"><span class="ik">Estado</span><span class="iv" style="color:var(--sys-green);">● Disponible 2026</span></div>'+
          '<div class="info-row"><span class="ik">Contacto</span><span class="iv">yhasotelo@hotmail.com</span></div>'+
        '</div>'+
      '</div>'+
    '</div>';
}

function buildAbout(el){
  el.style.background='#fff';
  el.style.padding='20px';
  el.innerHTML=
      '<div style="display:flex;gap:20px;align-items:center;margin-bottom:22px;">'+
        '<div class="about-av" style="width:80px;height:80px;border-radius:50%;overflow:hidden;flex-shrink:0;box-shadow:0 4px 20px rgba(0,122,255,.35),0 0 0 3px rgba(0,122,255,.15);">'+
          '<img id="about-avatar-img" src="avatar.jpeg" alt="Sotelo" style="width:100%;height:100%;object-fit:cover;display:block;" '+
          'onerror="this.style.display=\'none\';this.parentNode.innerHTML=\''+ICONS.about.replace(/'/g,"\\'").replace(/\n/g,'')+'\';">'+
        '</div>'+
        '<div>'+
          '<div style="font-size:24px;font-weight:700;color:var(--t1);margin-bottom:2px;letter-spacing:-.02em;">Sotelo</div>'+
          '<div style="font-size:13px;color:var(--t2);margin-bottom:10px;">Digital Craftsman · UI/UX · Dev</div>'+
          '<div style="display:flex;gap:6px;flex-wrap:wrap;">'+
            '<span class="pill green">● Disponible 2026</span>'+
            '<span class="pill blue">Tunja, CO</span>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<p style="font-size:13.5px;line-height:1.78;color:var(--t2);margin-bottom:14px;">Creativo digital en la intersección de <strong style="color:var(--t1)">diseño</strong>, <strong style="color:var(--t1)">código</strong> e <strong style="color:var(--t1)">identidad</strong>. Desde <strong style="color:var(--sys-blue)">Tunja, Boyacá</strong> — construyo experiencias que la gente recuerda antes de entender por qué las ama.</p>'+
      '<p style="font-size:13.5px;line-height:1.78;color:var(--t2);margin-bottom:22px;">Cada proyecto empieza con una pregunta: <em style="color:var(--t1)">¿cómo hacemos esto de una manera que nadie haya visto antes?</em></p>'+
      '<div style="display:flex;gap:10px;margin-bottom:20px;">'+
        '<div class="stat-c"><div class="stat-n" style="color:var(--sys-blue)" id="sn1">0</div><div class="stat-l">Proyectos</div></div>'+
        '<div class="stat-c"><div class="stat-n" style="color:var(--sys-purple)" id="sn2">0</div><div class="stat-l">Clientes</div></div>'+
        '<div class="stat-c"><div class="stat-n" style="color:var(--sys-green)" id="sn3">0</div><div class="stat-l">Años</div></div>'+
      '</div>'+
    '</div>';
  function cnt(id,t){var e=document.getElementById(id);if(!e)return;var c=0,inc=t/40;var ti=setInterval(()=>{c+=inc;if(c>=t){c=t;clearInterval(ti);}e.textContent=Math.round(c)+'+';},28);}
  setTimeout(()=>{cnt('sn1',10);cnt('sn2',8);cnt('sn3',5);},300);
}

function buildProjects(el){
  el.style.background='#f2f2f7';
  var isMob = window.innerWidth <= 1024;
  var cards=[
    {
      num:'01',title:'Músico Colombiano',tag:'Música · Web Experience',
      desc:'Un iPod interactivo nativo que contiene toda la identidad digital del artista — música, videos y biografía — dentro de un dispositivo icónico reimaginado para el browser.',
      chips:['Web XP','UI/UX','CSS 3D','Music Player'],
      grad:'linear-gradient(135deg,#FF2D55 0%,#AF52DE 100%)',
      gradLight:'linear-gradient(135deg,rgba(255,45,85,.08) 0%,rgba(175,82,222,.08) 100%)',
      accent:'#FF2D55',
      ic:'ipod',win:'ipod',year:'2026'
    },
    {
      num:'02',title:'Saykyo Training',tag:'Fitness Tech · App Design',
      desc:'Plataforma de entrenamiento con gestión de rutinas, seguimiento con gráficas estratégicas, valoraciones corporales y analytics que convierten datos en resultados.',
      chips:['App Design','UX Research','Data Viz','React Native'],
      grad:'linear-gradient(135deg,#30D158 0%,#007AFF 100%)',
      gradLight:'linear-gradient(135deg,rgba(48,209,88,.08) 0%,rgba(0,122,255,.08) 100%)',
      accent:'#007AFF',
      ic:'saykyo',win:'saykyo',year:'2026'
    },
  ];

  if(isMob){
    // ── MOBILE: full-width stacked cards, iOS native feel ──
    el.innerHTML = `

<div class="proj-mob-wrap">
  <div class="proj-mob-header">
    <div class="proj-mob-eyebrow">Portfolio</div>
    <div class="proj-mob-title">Proyectos</div>
  </div>
  ${cards.map(c=>`
  <div class="proj-mob-card" onclick="${isMob ? `openSheet('${c.win}')` : `openWin('${c.win}')`}">
    <div class="proj-mob-hero" style="background:${c.grad}">
      <div class="proj-mob-hero-shine"></div>
      <div class="proj-mob-hero-icon">${ICONS[c.ic]}</div>
      <div class="proj-mob-hero-badge">${c.year}</div>
    </div>
    <div class="proj-mob-body">
      <div class="proj-mob-num">${c.num} — Proyecto</div>
      <div class="proj-mob-name">${c.title}</div>
      <div class="proj-mob-tag">${c.tag}</div>
      <div class="proj-mob-desc">${c.desc}</div>
      <div class="proj-mob-chips">
        ${c.chips.map(ch=>`<span class="proj-mob-chip" style="color:${c.accent};border-color:${c.accent}22;background:${c.accent}0d;">${ch}</span>`).join('')}
      </div>
      <div class="proj-mob-cta" style="background:${c.grad};color:#fff;">
        <span>Ver proyecto completo</span>
        <div class="proj-mob-cta-arrow" style="background:rgba(255,255,255,.25);opacity:1;">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7M6 2.5l3.5 3.5L6 9.5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>
    </div>
  </div>`).join('')}
  <div class="proj-mob-coming">
    <div style="font-size:28px;margin-bottom:8px;">🚀</div>
    <div style="font-size:15px;font-weight:600;color:var(--t1);margin-bottom:4px;">Más proyectos en camino</div>
    <div style="font-size:12px;color:var(--t3);font-family:var(--sf-mono);">Disponible para proyectos · 2026</div>
  </div>
</div>`;
  } else {
    // ── DESKTOP: 2-col grid ──
    el.style.background='#fff';
    el.innerHTML='<div class="pcards" style="padding:20px;">'+cards.map(c=>`
      <div class="pcard" onclick="openWin('${c.win}')" style="cursor:pointer;">
        <div class="pcard-head" style="background:${c.grad};min-height:110px;">
          <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.12) 0%,transparent 60%);pointer-events:none;"></div>
          <div style="width:52px;height:52px;border-radius:13px;overflow:hidden;position:relative;z-index:1;box-shadow:0 4px 16px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.3);">${ICONS[c.ic]}</div>
          <div style="position:absolute;top:14px;right:14px;font-size:9px;font-family:var(--sf-mono);color:rgba(255,255,255,.55);letter-spacing:.08em;background:rgba(0,0,0,.2);padding:3px 8px;border-radius:6px;">${c.year}</div>
        </div>
        <div class="pcard-body">
          <div class="pcard-num">${c.num}</div>
          <div class="pcard-title">${c.title}</div>
          <div style="font-size:11px;color:var(--t3);margin-bottom:8px;">${c.tag}</div>
          <div class="pcard-desc">${c.desc}</div>
          <div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:4px;">${c.chips.map(x=>'<span class="chip">'+x+'</span>').join('')}</div>
          <div style="margin-top:14px;display:flex;align-items:center;gap:6px;font-size:12px;color:var(--sys-blue);font-weight:500;">
            <span>Ver proyecto</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
        </div>
      </div>`).join('')+
      '<div style="grid-column:1/-1;background:rgba(0,0,0,.02);border:1.5px dashed rgba(0,0,0,.08);border-radius:14px;padding:24px;text-align:center;">'+
        '<div style="font-size:20px;margin-bottom:6px;">🚀</div>'+
        '<div style="font-size:12px;font-weight:600;color:var(--t2);">Más proyectos en camino</div>'+
        '<div style="font-size:11px;color:var(--t3);font-family:var(--sf-mono);margin-top:4px;">Disponible para proyectos · 2026</div>'+
      '</div>'+
    '</div>';
  }
}

function buildServices(el){
  el.style.background='#f2f2f7';
  var isMob=window.innerWidth<=1024;
  var svcs=[
    {ic:'gallery', bg:'linear-gradient(135deg,#007AFF,#5E5CE6)', n:'UI / UX Design',      d:'Interfaces que generan emociones y conversiones reales.'},
    {ic:'terminal',bg:'linear-gradient(135deg,#34C759,#007AFF)', n:'Desarrollo Web',       d:'Código limpio, animaciones fluidas, experiencias que escalan.'},
    {ic:'philosophy',bg:'linear-gradient(135deg,#AF52DE,#FF2D55)',n:'Identidad de Marca',  d:'Sistemas visuales completos que comunican quién eres.'},
    {ic:'ipod',    bg:'linear-gradient(135deg,#FF9500,#FF2D55)', n:'Motion & 3D',          d:'Animaciones 3D, WebGL y micro-interacciones de alto impacto.'},
    {ic:'saykyo',  bg:'linear-gradient(135deg,#5AC8FA,#007AFF)', n:'App Design',           d:'De wireframes a prototipos interactivos listos para producción.'},
    {ic:'contact', bg:'linear-gradient(135deg,#FFD60A,#FF9500)', n:'Consultoría',          d:'Estrategia de producto, auditorías de marca y dirección creativa.'},
  ];

  if(isMob){
    // Mobile: iOS grouped list style — full width rows
    el.innerHTML=`
<div style="padding:16px 16px 32px;">
  <div style="font-size:11px;font-weight:600;color:rgba(60,60,67,.6);text-transform:uppercase;letter-spacing:.08em;padding:4px 4px 10px;">Servicios · Lo que creo</div>
  <div style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 0 rgba(0,0,0,.06);">
    ${svcs.map((s,i)=>`
    <div style="display:flex;align-items:center;gap:14px;padding:14px 16px;${i<svcs.length-1?'border-bottom:1px solid rgba(0,0,0,.07);':''}">
      <div style="width:46px;height:46px;border-radius:12px;overflow:hidden;flex-shrink:0;background:${s.bg};box-shadow:0 2px 8px rgba(0,0,0,.15);">${ICONS[s.ic]}</div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:15px;font-weight:600;color:rgba(0,0,0,.88);margin-bottom:2px;">${s.n}</div>
        <div style="font-size:13px;color:rgba(0,0,0,.5);line-height:1.4;">${s.d}</div>
      </div>
      <svg width="7" height="12" viewBox="0 0 7 12" fill="none" style="flex-shrink:0;"><path d="M1 1l5 5-5 5" stroke="rgba(0,0,0,.25)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>`).join('')}
  </div>
</div>`;
  } else {
    // Desktop: original 3-col grid
    el.style.background='#fff';
    el.innerHTML=
      '<div style="padding:12px 16px 4px;font-size:11px;font-weight:600;color:var(--t2);text-transform:uppercase;letter-spacing:.06em;">04 — Servicios · Lo que creo</div>'+
      '<div class="svgrid">'+svcs.map(s=>`
        <div class="svcell">
          <div class="sv-ic" style="background:${s.bg}">${ICONS[s.ic]}</div>
          <div class="sv-n">${s.n}</div>
          <div class="sv-d">${s.d}</div>
        </div>`).join('')+'</div>';
  }
}

/* ── GALLERY — dynamic photo loader ── */
var GAL_PHOTOS = [];
var LB_IDX = 0;

function buildGallery(el){
  // Photos: tries 1.jpg, 2.jpg … 1.png, 2.png etc.
  // We show a loading state then dynamically detect which files exist
  el.innerHTML=
    '<div class="gal-toolbar">'+
      '<span id="gal-count" style="color:var(--t2);">Cargando fotos…</span>'+
      '<span style="font-size:11px;font-family:var(--sf-mono);">Proyectos · Sotelo Studio</span>'+
    '</div>'+
    '<div id="gal-grid-inner"></div>';
  loadGalleryPhotos(document.getElementById('gal-grid-inner'), document.getElementById('gal-count'));
}

function loadGalleryPhotos(grid, counter){
  // Attempt to load images 1–20 (both .jpg and .png)
  var total=20, loaded=[], failed=0, tried=0;
  var names=[];
  for(var i=1;i<=total;i++){names.push({n:i,exts:['jpg','jpeg','png','webp']});}

  function tryLoad(item, extIdx){
    if(extIdx>=item.exts.length){failed++;check();return;}
    var img=new Image();
    var src=item.n+'.'+item.exts[extIdx];
    img.onload=function(){
      loaded.push({src:src,label:'Proyecto '+item.n,idx:loaded.length});
      renderGallery(grid,counter);
      check();
    };
    img.onerror=function(){ tryLoad(item,extIdx+1); };
    img.src=src;
  }
  function check(){
    tried++;
    if(tried===total){
      if(loaded.length===0) showEmptyGallery(grid,counter);
    }
  }
  names.forEach(function(item){ tryLoad(item,0); });
  // Also try /photos/ subfolder
  for(var j=1;j<=10;j++){
    (function(n){
      var img=new Image(); img.src='photos/'+n+'.jpg';
      img.onload=function(){
        loaded.push({src:'photos/'+n+'.jpg',label:'Foto '+n,idx:loaded.length});
        renderGallery(grid,counter);
      };
    })(j);
  }
}

function renderGallery(grid, counter){
  GAL_PHOTOS = grid._photos = (grid._photos||[]);
  // Avoid duplicates
  var existingSrcs = GAL_PHOTOS.map(p=>p.src);
  // This gets called on each success, rebuild sorted
  if(!grid._all) grid._all=[];
  counter.textContent = GAL_PHOTOS.length > 0 ? GAL_PHOTOS.length+' foto'+(GAL_PHOTOS.length!==1?'s':'') : 'Cargando…';
  grid.className='gal-grid';
  grid.innerHTML=GAL_PHOTOS.map((p,i)=>`
    <div class="gal-cell" onclick="openLB(${i})">
      <img src="${p.src}" alt="${p.label}" loading="lazy">
      <div class="gal-cap"><span class="gal-cap-txt">${p.label}</span></div>
    </div>`).join('');
}

// Call this when a new photo loads successfully
function addGalleryPhoto(src, label){
  // Check duplicates
  if(GAL_PHOTOS.find(p=>p.src===src)) return;
  GAL_PHOTOS.push({src,label,idx:GAL_PHOTOS.length});
  // Re-render any open gallery
  var grid=document.getElementById('gal-grid-inner');
  var counter=document.getElementById('gal-count');
  if(grid&&counter){ grid._photos=GAL_PHOTOS; renderGallery(grid,counter); }
}

function showEmptyGallery(grid, counter){
  counter.textContent='Sin fotos';
  grid.innerHTML=
    '<div class="gal-empty">'+
      '<svg class="gal-empty-icon" viewBox="0 0 60 60" fill="none"><rect x="6" y="10" width="48" height="40" rx="6" stroke="rgba(0,0,0,.5)" stroke-width="2"/><circle cx="20" cy="24" r="5" stroke="rgba(0,0,0,.5)" stroke-width="2"/><path d="M6 38l12-10 10 8 8-6 18 12" stroke="rgba(0,0,0,.5)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'+
      '<div style="font-size:16px;font-weight:600;color:var(--t1);">Sin fotos aún</div>'+
      '<div style="font-size:13px;color:var(--t2);max-width:260px;">Pon tus fotos con nombres 1.jpg, 2.jpg, 3.png… en la misma carpeta que este archivo.</div>'+
    '</div>';
}

/* Lightbox */
function openLB(idx){
  LB_IDX=idx;
  var p=GAL_PHOTOS[idx];if(!p)return;
  document.getElementById('lb-img').src=p.src;
  document.getElementById('lb-caption').textContent=p.label+' · '+(idx+1)+'/'+GAL_PHOTOS.length;
  document.getElementById('lightbox').classList.add('on');
}
function closeLB(){document.getElementById('lightbox').classList.remove('on');}
function lbNav(dir){
  LB_IDX=(LB_IDX+dir+GAL_PHOTOS.length)%GAL_PHOTOS.length;
  openLB(LB_IDX);
}
document.getElementById('lightbox').addEventListener('click',function(e){if(e.target===this)closeLB();});
document.addEventListener('keydown',function(e){
  if(document.getElementById('lightbox').classList.contains('on')){
    if(e.key==='ArrowLeft')lbNav(-1);
    if(e.key==='ArrowRight')lbNav(1);
    if(e.key==='Escape')closeLB();
  }
});

function buildTerminal(el){
  el.innerHTML='<div class="term-bg" id="term-out"></div>';
}
var TLINES=[
  {p:'clear'},{p:'whoami'},{o:'sotelo — digital craftsman',c:'gr'},
  {p:'cat perfil.json'},{o:'{',c:'bl'},
  {o:'  "nombre":    "Sotelo",',c:'bl'},{o:'  "rol":       "UI Designer & Developer",',c:'bl'},
  {o:'  "ubicacion": "Tunja, Boyacá · Colombia",',c:'bl'},
  {o:'  "stack":     ["Figma","React","Three.js","CSS"],',c:'bl'},
  {o:'  "disponible": true',c:'gr'},{o:'}',c:'bl'},
  {p:'ls proyectos/'},{o:'01_musico-colombiano/   02_saykyo-app/',c:'yw'},
  {p:'cat filosofia.txt'},{o:'"El mejor diseño es aquel que desaparece —',c:'pk'},{o:' dejando solo la experiencia pura."',c:'pk'},
  {p:'ping yhasotelo@hotmail.com'},{o:'PING sotelo [disponible 2026] — 0ms response',c:'gr'},{cursor:true}
];
function runTerminal(){
  var out=document.getElementById('term-out');if(!out)return;
  out.innerHTML='';var i=0;
  function next(){
    if(i>=TLINES.length)return; var l=TLINES[i++];
    var d=document.createElement('div'); d.style.marginBottom='1px';
    if(l.cursor) d.innerHTML='<span class="tp">sotelo@studio:~$</span> <span class="tcur"></span>';
    else if(l.p!==undefined) d.innerHTML='<span class="tp">sotelo@studio:~$</span> <span class="tc"> '+l.p+'</span>';
    else d.innerHTML='<span class="to '+(l.c||'')+'">'+l.o+'</span>';
    out.appendChild(d); out.scrollTop=out.scrollHeight;
    setTimeout(next,l.p!==undefined?160:55);
  }
  setTimeout(next,300);
}

function buildContact(el){
  el.style.background='#fff';
  el.innerHTML=
    '<div class="cpad" style="display:flex;flex-direction:column;gap:18px;">'+
      '<div><div style="font-size:11px;font-weight:600;color:var(--sys-blue);text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px;">05 — Contacto</div>'+
      '<div style="font-size:28px;font-weight:700;color:var(--t1);line-height:1.15;">Hagamos algo<br><span style="color:var(--sys-blue)">increíble.</span></div></div>'+
      '<span class="pill green" style="width:fit-content;">● Disponible para proyectos 2026</span>'+
      '<a href="mailto:yhasotelo@hotmail.com" class="ct-email-row">'+
        '<div class="ct-em-icon">'+ICONS.contact+'</div>'+
        '<div><div style="font-size:15px;font-weight:500;color:var(--sys-blue);">yhasotelo@hotmail.com</div><div style="font-size:12px;color:var(--t2);margin-top:1px;">Respuesta en menos de 24h</div></div>'+
      '</a>'+
      '<div style="font-size:13px;color:var(--t2);">◎ Tunja, Boyacá · Colombia · COL</div>'+
      '<div style="border-top:1px solid var(--sep);padding-top:16px;display:flex;justify-content:space-between;font-size:11px;color:var(--t3);">'+
        '<span>© 2026 Sotelo Studio</span><span>Hecho con obsesión · Colombia</span>'+
      '</div>'+
    '</div>';
}

function buildPhilosophy(el){
  el.style.background='#f2f2f7';
  el.innerHTML=
    '<div style="padding:0 0 32px;">'+
      // Hero section
      '<div style="background:#fff;padding:24px 20px 20px;margin-bottom:10px;">'+
        '<div style="font-size:11px;font-weight:600;color:var(--sys-blue);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;">Filosofía</div>'+
        '<div style="font-size:28px;font-weight:700;color:var(--t1);line-height:1.18;letter-spacing:-.02em;margin-bottom:6px;">El diseño que <span style="color:var(--sys-purple)">desaparece.</span></div>'+
        '<div style="font-size:14px;color:var(--t2);line-height:1.5;">UI Designer & Developer · Tunja, Boyacá</div>'+
      '</div>'+
      // Quote card
      '<div style="margin:0 16px 10px;">'+
        '<div style="background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 1px 0 rgba(0,0,0,.06);">'+
          '<div style="background:linear-gradient(135deg,#AF52DE,#5E5CE6);padding:18px 20px;">'+
            '<div style="font-size:32px;line-height:1;color:rgba(255,255,255,.4);font-family:Georgia,serif;margin-bottom:4px;">"</div>'+
            '<div style="font-size:16px;font-style:italic;color:#fff;line-height:1.55;font-weight:400;">El mejor diseño es aquel que desaparece — dejando solo la experiencia pura.</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
      // Paragraphs as iOS grouped list
      '<div style="margin:0 16px 10px;">'+
        '<div style="font-size:11px;font-weight:600;color:rgba(60,60,67,.6);text-transform:uppercase;letter-spacing:.06em;padding:8px 4px 6px;">Manifiesto</div>'+
        '<div style="background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 1px 0 rgba(0,0,0,.06);">'+
          '<div style="padding:14px 16px;border-bottom:1px solid rgba(0,0,0,.06);">'+
            '<div style="font-size:13px;font-weight:600;color:var(--t1);margin-bottom:4px;">Pixel con propósito</div>'+
            '<div style="font-size:13px;color:var(--t2);line-height:1.55;">Cada pixel tiene propósito. Cada interacción cuenta una historia. Trabajo donde la tecnología se vuelve emoción.</div>'+
          '</div>'+
          '<div style="padding:14px 16px;">'+
            '<div style="font-size:13px;font-weight:600;color:var(--t1);margin-bottom:4px;">Lenguaje visual propio</div>'+
            '<div style="font-size:13px;color:var(--t2);line-height:1.55;">No persigo tendencias — creo lenguajes visuales que resisten el tiempo. El código es mi pincel, el browser mi lienzo.</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
      // Stack pills as iOS grouped
      '<div style="margin:0 16px 10px;">'+
        '<div style="font-size:11px;font-weight:600;color:rgba(60,60,67,.6);text-transform:uppercase;letter-spacing:.06em;padding:8px 4px 6px;">Stack</div>'+
        '<div style="background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 1px 0 rgba(0,0,0,.06);">'+
          ['Figma','React','Three.js','CSS','UI/UX'].map((s,i,arr)=>
            '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;'+
            (i<arr.length-1?'border-bottom:1px solid rgba(0,0,0,.06);':'')+'">'+
              '<div style="font-size:14px;color:var(--t1);">'+s+'</div>'+
              '<svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1l5 5-5 5" stroke="rgba(0,0,0,.25)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'+
            '</div>'
          ).join('')+
        '</div>'+
      '</div>'+
      // Footer
      '<div style="padding:10px 20px;">'+
        '<div style="font-size:12px;color:rgba(60,60,67,.45);text-align:center;font-family:var(--sf-mono);">Construido desde Tunja, Boyacá · 2026</div>'+
      '</div>'+
    '</div>';
}

function buildIpod(el){
  el.style.background='linear-gradient(160deg,#0d0d18 0%,#1a0530 50%,#0a1020 100%)';
  el.style.height='100%';
  el.style.overflow='auto';

  el.innerHTML=`

<div class="ip-wrap">
  <div class="ip-device-showcase">
    <div class="ip-badge">Proyecto 01</div>
    <div class="ip-body">
      <div class="ip-screen-shell">
        <div class="ip-screen">
          <div class="ip-scan"></div>
          <div class="ip-screen-top"><span>✦ Sotelo iPod</span><span id="ip-clock">--:--</span></div>
          <div class="ip-screen-title">Músico Colombiano</div>
          <div class="ip-screen-sub">Web Experience · 2026</div>
          <div class="ip-screen-bar"><div class="ip-screen-fill"></div></div>
          <div class="ip-screen-times"><span>1:14</span><span>3:42</span></div>
        </div>
      </div>
      <div class="ip-wheel">
        <span class="ip-wlbl ip-wl-t">MENU</span>
        <span class="ip-wlbl ip-wl-b">▶|◀</span>
        <span class="ip-wlbl ip-wl-l">◄◄</span>
        <span class="ip-wlbl ip-wl-r">▶▶</span>
        <div class="ip-wctr"></div>
      </div>
      <div class="ip-logo">♦ SOTELO STUDIO</div>
    </div>
  </div>

  <div class="ip-info">
    <div class="ip-project-num">01 — Proyecto</div>
    <div class="ip-project-title">Músico<br>Colombiano</div>
    <div class="ip-project-sub">Web Experience · Música · UI/UX</div>
    <div class="ip-project-desc">
      Un iPod interactivo nativo que contiene toda la identidad digital del artista — música, videos y biografía — dentro de un dispositivo icónico reimaginado para el browser.
    </div>
    <div class="ip-chips">
      <span class="ip-chip">Web XP</span>
      <span class="ip-chip">UI/UX</span>
      <span class="ip-chip">CSS 3D</span>
      <span class="ip-chip">Music Player</span>
    </div>
    <div class="ip-divider"></div>
    <div class="ip-highlight">
      <div class="ip-hl-ic">🎵</div>
      <div><div class="ip-hl-t">Player de audio nativo</div><div class="ip-hl-d">MP3 directamente en el browser, sin dependencias</div></div>
    </div>
    <div class="ip-highlight">
      <div class="ip-hl-ic">🎛️</div>
      <div><div class="ip-hl-t">Click-wheel funcional</div><div class="ip-hl-d">Navegación por rueda giratoria como el iPod original</div></div>
    </div>
    <div class="ip-highlight">
      <div class="ip-hl-ic">📱</div>
      <div><div class="ip-hl-t">Identidad visual completa</div><div class="ip-hl-d">Diseño que comunica la esencia del artista</div></div>
    </div>
  </div>
</div>
`;
  // Start clock after HTML is injected
  (function(){
    function t(){var now=new Date();var h=now.getHours().toString().padStart(2,'0');var m=now.getMinutes().toString().padStart(2,'0');var clk=document.getElementById('ip-clock');if(clk)clk.textContent=h+':'+m;}
    t(); setInterval(t,1000);
  })();
}


function buildSaykyo(el){
  el.style.background='linear-gradient(160deg,#030310 0%,#0a0a20 40%,#050515 100%)';
  el.style.height='100%';
  el.style.overflow='auto';

  el.innerHTML=`

<div class="sk-wrap">
  <div class="sk-device-showcase">
    <div class="sk-badge">Proyecto 02</div>
    <div class="sk-iphone">
      <div class="sk-screen-wrap">
        <div class="sk-di"></div>
        <div class="sk-app">
          <div class="sk-app-header">
            <div class="sk-app-logo">SAY<span>|</span>KYO</div>
            <div class="sk-app-avatar">YS</div>
          </div>
          <!-- Ring -->
          <div class="sk-ring-row">
            <svg class="sk-ring-svg" width="44" height="44" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="16" stroke="rgba(255,255,255,.08)" stroke-width="4" fill="none"/>
              <circle cx="22" cy="22" r="16" stroke="#30D158" stroke-width="4" fill="none"
                stroke-dasharray="73 28" stroke-dashoffset="20" stroke-linecap="round"/>
              <text x="22" y="26" text-anchor="middle" font-size="9" font-weight="700" fill="white" font-family="monospace">73%</text>
            </svg>
            <div class="sk-ring-info">
              <div class="sk-ring-title">Asistencia del mes</div>
              <div class="sk-ring-val">4 días</div>
              <div class="sk-ring-sub">Racha actual · Récord: 4</div>
            </div>
          </div>
          <!-- Mini stats -->
          <div class="sk-mini-stats">
            <div class="sk-ms"><div class="sk-ms-v" style="color:#f97316">🔥 4</div><div class="sk-ms-l">Racha</div></div>
            <div class="sk-ms"><div class="sk-ms-v" style="color:#a855f7">22</div><div class="sk-ms-l">Series hoy</div></div>
          </div>
          <!-- Bar chart -->
          <div class="sk-chart-wrap">
            <div class="sk-chart-label">Semana actual</div>
            <div class="sk-bars">
              ${[0.9,0.6,0.85,0.5,0.7,0,0].map((v,i)=>`<div class="sk-bar" style="height:${Math.max(v*100,8)}%;background:${v>0?'linear-gradient(180deg,#30D158,#007AFF)':'rgba(255,255,255,.06)'}"></div>`).join('')}
            </div>
          </div>
          <!-- Bottom nav -->
          <div style="flex:1;"></div>
          <div class="sk-bnav">
            <div class="sk-bnav-ic act"><span>🏋️</span><div class="sk-bnav-lbl" style="color:#30D158;">Entrenar</div></div>
            <div class="sk-bnav-ic"><span>📈</span><div class="sk-bnav-lbl">Progreso</div></div>
            <div class="sk-bnav-ic"><span>👤</span><div class="sk-bnav-lbl">Perfil</div></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="sk-info">
    <div class="sk-proj-num">02 — Proyecto</div>
    <div class="sk-proj-title">Saykyo<br>Training</div>
    <div class="sk-proj-sub">Fitness Tech · App Design · Data Viz</div>
    <div class="sk-proj-desc">
      Plataforma de entrenamiento con gestión de rutinas, seguimiento con gráficas estratégicas, valoraciones corporales y analytics que convierten datos en resultados reales.
    </div>
    <div class="sk-chips2">
      <span class="sk-chip2">App Design</span>
      <span class="sk-chip2">UX Research</span>
      <span class="sk-chip2">Data Viz</span>
      <span class="sk-chip2">React Native</span>
    </div>
    <div class="sk-divider2"></div>
    <div class="sk-highlight2">
      <div class="sk-hl-ic2">📊</div>
      <div><div class="sk-hl-t2">Analytics en tiempo real</div><div class="sk-hl-d2">Gráficas de progreso, rachas y métricas corporales</div></div>
    </div>
    <div class="sk-highlight2">
      <div class="sk-hl-ic2">⚡</div>
      <div><div class="sk-hl-t2">Gestión de rutinas RPE</div><div class="sk-hl-d2">Seguimiento por percepción de esfuerzo por ejercicio</div></div>
    </div>
    <div class="sk-highlight2">
      <div class="sk-hl-ic2">🎯</div>
      <div><div class="sk-hl-t2">Valoración corporal</div><div class="sk-hl-d2">Seguimiento de composición, peso y métricas del cuerpo</div></div>
    </div>
  </div>
</div>
`;
}


/* ══════════════════════════════════════
   DESKTOP ICONS
══════════════════════════════════════ */
var DESK_ICONS=[
  {id:'about',    lbl:'Sobre Mí',  x:20, y:20},
  {id:'projects', lbl:'Proyectos', x:20, y:118},
  {id:'services', lbl:'Servicios', x:20, y:216},
  {id:'philosophy',lbl:'Filosofía',x:20, y:314},
  {id:'game',     lbl:'Snake',     x:20, y:412},
];
function buildDesktop(){
  var desk=document.getElementById('desktop');
  DESK_ICONS.forEach(function(d){
    var el=document.createElement('div');
    el.className='desk-icon'; el.dataset.id=d.id;
    el.style.left=d.x+'px'; el.style.top=d.y+'px';
    el.innerHTML='<div class="di-img">'+ICONS[d.id]+'</div><div class="di-label">'+d.lbl+'</div>';
    var clickTimer=null;
    el.addEventListener('click',function(){
      document.querySelectorAll('.desk-icon').forEach(x=>x.classList.remove('sel'));
      el.classList.add('sel');
      if(clickTimer){clearTimeout(clickTimer);clickTimer=null;openWin(d.id);}
      else{clickTimer=setTimeout(function(){clickTimer=null;openWin(d.id);},250);}
    });
    desk.appendChild(el);
  });
}

/* ══════════════════════════════════════
   DOCK BUILD
══════════════════════════════════════ */
var DOCK_APPS=[
  {id:'finder', lbl:'Finder'},
  {id:'about',  lbl:'Sobre Mí'},
  {id:'projects',lbl:'Proyectos'},
  {id:'services',lbl:'Servicios'},
  {id:'terminal',lbl:'Terminal'},
  {id:'game',   lbl:'Snake'},
  null,
  {id:'contact', lbl:'Contacto'},
];
function buildDock(){
  var dock=document.getElementById('dock');
  DOCK_APPS.forEach(function(a){
    if(!a){var sep=document.createElement('div');sep.className='dock-sep';dock.appendChild(sep);return;}
    var el=document.createElement('div'); el.className='dock-item'; el.dataset.win=a.id;
    el.innerHTML='<div class="d-img">'+ICONS[a.id]+'</div><div class="dock-dot" id="dot-'+a.id+'"></div><div class="dock-lbl">'+a.lbl+'</div>';
    el.addEventListener('click',()=>openWin(a.id));
    dock.appendChild(el);
  });
}

/* ══════════════════════════════════════
   SPOTLIGHT
══════════════════════════════════════ */
var SPOT_DATA=[
  {id:'finder',lbl:'Finder',sub:'Sistema'},
  {id:'about',lbl:'Sobre Mí',sub:'Perfil'},
  {id:'projects',lbl:'Proyectos',sub:'Portfolio'},
  {id:'services',lbl:'Servicios',sub:'Servicios'},
  {id:'terminal',lbl:'Terminal',sub:'App'},
  {id:'contact',lbl:'Contacto',sub:'Email'},
  {id:'philosophy',lbl:'Filosofía',sub:'Notas'},
  {id:'ipod',lbl:'iPod Web',sub:'Proyecto'},
  {id:'saykyo',lbl:'Saykyo App',sub:'Proyecto'},
  {id:'game',lbl:'Snake',sub:'Juego'},
];
function toggleSpot(){
  var s=document.getElementById('spotlight');
  s.classList.toggle('on');
  if(s.classList.contains('on')){document.getElementById('spot-q').value='';document.getElementById('spot-q').focus();renderSpot('');}
}
document.getElementById('spot-q').addEventListener('input',function(){renderSpot(this.value.toLowerCase());});
document.getElementById('spot-q').addEventListener('keydown',function(e){if(e.key==='Enter'){var f=document.querySelector('.spot-item');if(f)f.click();}});
document.getElementById('spotlight').addEventListener('click',function(e){if(e.target===this)this.classList.remove('on');});
function renderSpot(q){
  var f=SPOT_DATA.filter(x=>!q||x.lbl.toLowerCase().includes(q)||x.sub.toLowerCase().includes(q));
  document.getElementById('spot-res').innerHTML=f.map(x=>`
    <div class="spot-item" onclick="openWin('${x.id}');document.getElementById('spotlight').classList.remove('on')">
      <div class="spot-ic">${ICONS[x.id]}</div>
      <span class="spot-lbl">${x.lbl}</span>
      <span class="spot-sub">${x.sub}</span>
    </div>`).join('');
}
document.addEventListener('keydown',function(e){
  if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();toggleSpot();}
  if(e.key==='Escape'){document.getElementById('spotlight').classList.remove('on');document.getElementById('ctx').classList.remove('on');}
});

/* ══════════════════════════════════════
   CONTEXT MENU
══════════════════════════════════════ */
document.addEventListener('contextmenu',function(e){
  if(!document.getElementById('desktop').contains(e.target)&&e.target.id!=='desktop') return;
  e.preventDefault();
  var m=document.getElementById('ctx');
  m.style.left=e.clientX+'px'; m.style.top=e.clientY+'px';
  m.innerHTML=
    `<div class="ctx-item" onclick="openWin('finder')"><div class="ctx-ic">${ICONS.finder}</div>Abrir Finder</div>`+
    `<div class="ctx-item" onclick="openWin('terminal')"><div class="ctx-ic">${ICONS.terminal}</div>Nueva Terminal</div>`+
    '<div class="ctx-sep"></div>'+
    `<div class="ctx-item" onclick="openWin('about')"><div class="ctx-ic">${ICONS.about}</div>Sobre Mí</div>`+
    `<div class="ctx-item" onclick="openWin('contact')"><div class="ctx-ic">${ICONS.contact}</div>Contactar</div>`+
    '<div class="ctx-sep"></div>'+
    `<div class="ctx-item" onclick="toggleSpot()"><svg width="16" height="16" viewBox="0 0 20 20" fill="none" style="flex-shrink:0"><circle cx="8.5" cy="8.5" r="5.5" stroke="rgba(0,0,0,.5)" stroke-width="1.5"/><path d="M13 13l4 4" stroke="rgba(0,0,0,.5)" stroke-width="1.5" stroke-linecap="round"/></svg>Spotlight  ⌘K</div>`;
  m.classList.add('on');
});
document.addEventListener('click',()=>document.getElementById('ctx').classList.remove('on'));

/* ══════════════════════════════════════
   NOTIFICATION
══════════════════════════════════════ */
function notify(iconId,title,msg,delay){
  setTimeout(function(){
    document.getElementById('notif-ic').innerHTML=ICONS[iconId]||'';
    document.getElementById('notif-title').textContent=title;
    document.getElementById('notif-msg').textContent=msg;
    var n=document.getElementById('notif'); n.classList.add('show');
    setTimeout(()=>n.classList.remove('show'),3800);
  },delay||0);
}

/* ══════════════════════════════════════
   iOS HOME SCREEN
══════════════════════════════════════ */
var IOS_PAGES_DATA=[
  [ // page 1
    {id:'about',lbl:'Sobre Mí'},{id:'projects',lbl:'Proyectos'},
    {id:'services',lbl:'Servicios'},{id:'ipod',lbl:'iPod Web'},
    {id:'saykyo',lbl:'Saykyo'},{id:'philosophy',lbl:'Filosofía'},
    {id:'game',lbl:'Snake'},{id:'contact',lbl:'Contacto'},
  ],
];
var IOS_DOCK_DATA=[
  {id:'contact',lbl:'Mail'},
  {id:'about',lbl:'Perfil'},{id:'projects',lbl:'Proyectos'},{id:'services',lbl:'Servicios'},
];
var iosCurPage=0;

function buildIos(){
  var pages=document.getElementById('ios-pages');
  var dots=document.getElementById('ios-dots');
  var dock=document.getElementById('ios-dock');
  pages.innerHTML=''; dots.innerHTML=''; dock.innerHTML='';

  IOS_PAGES_DATA.forEach(function(apps,pi){
    var page=document.createElement('div');
    page.className='ios-page '+(pi===0?'active':'right');
    page.id='ios-p-'+pi;
    apps.forEach(function(a){
      var el=document.createElement('div'); el.className='ios-icon';
      el.innerHTML='<div class="ios-iimg">'+ICONS[a.id]+'</div><div class="ios-ilbl">'+a.lbl+'</div>';
      el.addEventListener('click',()=>openSheet(a.id));
      page.appendChild(el);
    });
    pages.appendChild(page);
    var dot=document.createElement('div');
    dot.className='ios-dot'+(pi===0?' on':'');
    dot.id='ios-d-'+pi; dots.appendChild(dot);
  });

  // Swipe
  var sx=0;
  pages.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;},{passive:true});
  pages.addEventListener('touchend',e=>{var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50)iosSwitch(dx>0?-1:1);});

  IOS_DOCK_DATA.forEach(function(a){
    var el=document.createElement('div'); el.className='ios-icon';
    el.innerHTML='<div class="ios-iimg" style="width:56px;height:56px;">'+ICONS[a.id]+'</div>';
    el.addEventListener('click',()=>openSheet(a.id));
    dock.appendChild(el);
  });
}
function iosSwitch(dir){
  var np=iosCurPage+dir;
  if(np<0||np>=IOS_PAGES_DATA.length)return;
  var cur=document.getElementById('ios-p-'+iosCurPage);
  var nxt=document.getElementById('ios-p-'+np);
  document.getElementById('ios-d-'+iosCurPage).classList.remove('on');
  cur.classList.remove('active'); cur.classList.add(dir>0?'left':'right');
  nxt.classList.remove('left','right'); nxt.classList.add('active');
  iosCurPage=np;
  document.getElementById('ios-d-'+np).classList.add('on');
}
var DARK_APPS = {ipod:1, saykyo:1, terminal:1, game:1};
var GRAY_APPS = {projects:1, philosophy:1, services:1};
var FULLSCREEN_APPS = {game:1};
function openSheet(id){
  var def=APPS[id];if(!def)return;
  document.getElementById('sheet-title').textContent=def.title;
  var body=document.getElementById('sheet-body'); body.innerHTML='';
  if(DARK_APPS[id]) body.className='ios-card-body dark-app';
  else if(GRAY_APPS[id]) body.className='ios-card-body gray-app';
  else body.className='ios-card-body';
  var sheet=document.getElementById('ios-sheet');
  if(FULLSCREEN_APPS[id]) sheet.classList.add('fullscreen-sheet');
  else sheet.classList.remove('fullscreen-sheet');
  def.build(body);
  sheet.classList.add('on');
}
function closeSheet(){
  var sheet=document.getElementById('ios-sheet');
  sheet.classList.remove('on');
  setTimeout(function(){ sheet.classList.remove('fullscreen-sheet'); }, 500);
}
// Swipe down sheet to close — only when body is at scroll top AND clearly dragging down
var sheetY=0, sheetSwipeOk=false;
document.querySelector('.ios-card').addEventListener('touchstart',function(e){
  sheetY=e.touches[0].clientY;
  var body=document.getElementById('sheet-body');
  // Never allow swipe-close if touching canvas, dpad, or any game element
  var onGame=e.target.closest('#gcanvas,.g-dpad,.g-dpad-btn,.g-btn,.g-wrap');
  if(onGame){sheetSwipeOk=false;return;}
  // Allow only from handle/bar, OR if scrollable content is at very top
  var onHandle=e.target.closest('.ios-card-handle,.ios-card-bar');
  // Check if the body itself scrolls — if overflow is hidden, don't allow body-swipe
  var bodyScrolls=body&&body.scrollHeight>body.clientHeight+4;
  var bodyAtTop=body&&body.scrollTop<=0;
  sheetSwipeOk=!!onHandle||(bodyScrolls&&bodyAtTop);
},{passive:true});
document.querySelector('.ios-card').addEventListener('touchend',function(e){
  if(!sheetSwipeOk)return;
  var dy=e.changedTouches[0].clientY-sheetY;
  if(dy>160)closeSheet();
});

/* ══════════════════════════════════════
   BOOT
══════════════════════════════════════ */
(function(){
  var fill=document.getElementById('boot-fill'), pct=0;
  var iv=setInterval(function(){
    pct+=Math.random()*6+2;
    if(pct>=100){pct=100;clearInterval(iv);setTimeout(launch,700);}
    fill.style.width=pct+'%';
  },90);
})();

function launch(){
  var boot=document.getElementById('boot');
  boot.classList.add('out');
  setTimeout(function(){
    boot.style.display='none';
    if(!isMobile()){
      buildDesktop(); buildDock();
      // About Me centered above everything, first thing visible
      var vw=window.innerWidth, vh=window.innerHeight;
      var aw=520, ah=480;
      var ax=Math.round((vw-aw)/2), ay=Math.round((vh-ah)/2 - 20);
      setTimeout(function(){
        openWin('about',ax,ay);
      },150);
      setTimeout(function(){
        openWin('finder',36,60);
        // Re-focus about so it appears on top at boot
        setTimeout(function(){
          var aboutWin=document.getElementById('w-about');
          if(aboutWin){focusWin('about');}
        },80);
      },600);
    } else {
      buildIos();
      // Auto-open Sobre Mí on mobile, same as desktop
      setTimeout(function(){ openSheet('about'); }, 600);
    }
    setTimeout(()=>notify('about','Sotelo OS',isMobile()?'Toca los iconos para explorar · desliza para más páginas':'Clic en iconos · Clic derecho · ⌘K Spotlight'),1200);
  },1400);
}

/* ══════════════════════════════════════
   WOW — Cursor glow tracking
══════════════════════════════════════ */
(function(){
  var glow = document.getElementById('cursor-glow');
  if(!glow) return;
  var mx=window.innerWidth/2, my=window.innerHeight/2;
  var cx=mx, cy=my;
  document.addEventListener('mousemove', function(e){
    mx=e.clientX; my=e.clientY;
  });
  function animGlow(){
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    glow.style.left = cx + 'px';
    glow.style.top = cy + 'px';
    requestAnimationFrame(animGlow);
  }
  animGlow();
})();

/* ══════════════════════════════════════
   WOW — Floating particles
══════════════════════════════════════ */
(function(){
  var container = document.getElementById('particles');
  if(!container) return;
  var colors = [
    'rgba(120,170,255,.55)','rgba(200,160,100,.45)','rgba(180,130,200,.4)',
    'rgba(100,200,180,.35)','rgba(255,200,80,.3)','rgba(150,200,255,.4)'
  ];
  function createParticle(){
    var p = document.createElement('div');
    p.className = 'particle';
    var size = Math.random()*4+1.5;
    var x = Math.random()*100;
    var drift = (Math.random()-0.5)*200;
    var dur = Math.random()*18+12;
    var delay = Math.random()*20;
    var color = colors[Math.floor(Math.random()*colors.length)];
    p.style.cssText =
      'left:'+x+'vw;bottom:-10px;width:'+size+'px;height:'+size+'px;'+
      'background:'+color+';'+
      '--px:'+drift+'px;'+
      'animation-duration:'+dur+'s;animation-delay:'+delay+'s;'+
      'box-shadow:0 0 '+size*3+'px '+color+';';
    container.appendChild(p);
    setTimeout(function(){p.remove();createParticle();}, (dur+delay)*1000);
  }
  // Create initial batch
  for(var i=0;i<18;i++) createParticle();
})();

/* ══════════════════════════════════════
   WOW — Window entrance stagger
══════════════════════════════════════ */
var _origOpenWin = openWin;
// Patch: already handled by CSS animation, nothing extra needed.

/* ══════════════════════════════════════
   WOW — Menubar app name animation
══════════════════════════════════════ */
(function(){
  var el = document.getElementById('mb-appname');
  if(!el) return;
  var orig = el.textContent;
  // Subtle fade when app name changes
  var observer = new MutationObserver(function(){
    el.style.opacity='0';el.style.transform='translateY(-3px)';
    setTimeout(function(){el.style.transition='opacity .2s,transform .2s';el.style.opacity='1';el.style.transform='translateY(0)';},40);
  });
  observer.observe(el,{childList:true,subtree:true,characterData:true});
})();

var _lastMobile = isMobile();
window.addEventListener('resize',function(){
  var nowMobile = isMobile();
  if(nowMobile !== _lastMobile){
    _lastMobile = nowMobile;
    // Hide all open windows
    document.getElementById('win-layer').innerHTML='';
    Object.keys(WINS).forEach(k=>delete WINS[k]);
    if(nowMobile){
      // Switch to iOS
      document.getElementById('ios-ui').style.display='flex';
      buildIos();
    } else {
      // Switch to desktop
      document.getElementById('ios-ui').style.display='none';
      document.getElementById('ios-sheet').classList.remove('on');
      document.getElementById('desktop').innerHTML='';
      document.getElementById('dock').innerHTML='';
      buildDesktop(); buildDock();
      var vw=window.innerWidth,vh=window.innerHeight;
      var aw=520,ah=480;
      var ax=Math.round((vw-aw)/2),ay=Math.round((vh-ah)/2-20);
      setTimeout(()=>openWin('about',ax,ay),150);
    }
  }
});
/* ══════════════════════════════════════
   GAME — SNAKE (Apple Edition)
══════════════════════════════════════ */
function buildGame(el){
  var isMob = window.innerWidth <= 1024;
  el.style.background = '#000';
  el.style.height = '100%';
  el.style.overflow = 'hidden';
  el.style.userSelect = 'none';

  var CELL = isMob ? 22 : 18;
  var COLS, ROWS, W, H;

  el.innerHTML = `
<style>
#gcanvas{display:block;touch-action:none;border-radius:16px;}
.g-wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:0;
  background:radial-gradient(ellipse at 50% 30%,#0d1f0d 0%,#050505 70%);}
.g-hud{display:flex;align-items:center;justify-content:space-between;width:100%;padding:10px 16px 8px;flex-shrink:0;}
.g-score-box{display:flex;flex-direction:column;align-items:center;gap:1px;}
.g-score-lbl{font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.3);}
.g-score-val{font-size:28px;font-weight:800;color:#fff;font-family:'SF Mono','Menlo',monospace;letter-spacing:-.02em;line-height:1;
  transition:transform .12s cubic-bezier(.34,1.56,.64,1);}
.g-score-val.pop{transform:scale(1.35);}
.g-level-pill{background:rgba(48,209,88,.12);border:1px solid rgba(48,209,88,.25);border-radius:20px;
  padding:5px 14px;font-size:11px;font-weight:600;color:#30D158;letter-spacing:.04em;
  box-shadow:0 0 12px rgba(48,209,88,.15);transition:all .3s;}
.g-canvas-wrap{
  position:relative;flex-shrink:0;
  border-radius:18px;
  padding:3px;
  background:linear-gradient(135deg,rgba(48,209,88,.5),rgba(0,122,255,.3),rgba(48,209,88,.5));
  background-size:200% 200%;
  animation:g-border-spin 4s linear infinite;
  box-shadow:0 0 32px rgba(48,209,88,.2),0 0 64px rgba(48,209,88,.08),0 8px 32px rgba(0,0,0,.6);
}
@keyframes g-border-spin{
  0%{background-position:0% 50%;}
  50%{background-position:100% 50%;}
  100%{background-position:0% 50%;}
}
.g-canvas-inner{border-radius:16px;overflow:hidden;position:relative;}
.g-overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;
  background:rgba(0,0,0,.85);backdrop-filter:blur(16px);border-radius:16px;
  overflow-y:auto;padding:16px 12px;
  transition:opacity .3s;}
.g-overlay.hidden{opacity:0;pointer-events:none;}
.g-over-emoji{font-size:32px;margin-bottom:-2px;}
.g-over-title{font-size:26px;font-weight:800;color:#fff;letter-spacing:-.03em;}
.g-over-sub{font-size:11px;color:rgba(255,255,255,.38);margin-top:-2px;letter-spacing:.04em;text-transform:uppercase;}
.g-over-score{font-size:46px;font-weight:900;color:#30D158;font-family:'SF Mono','Menlo',monospace;
  line-height:1;margin:2px 0 0;text-shadow:0 0 30px rgba(48,209,88,.5);}
.g-over-best{font-size:10px;color:rgba(255,255,255,.28);letter-spacing:.08em;text-transform:uppercase;margin-top:1px;}
.g-btn{background:linear-gradient(135deg,#30D158,#25a244);color:#fff;border:none;border-radius:14px;
  font-size:15px;font-weight:700;padding:13px 36px;cursor:pointer;margin-top:12px;
  box-shadow:0 4px 24px rgba(48,209,88,.45),inset 0 1px 0 rgba(255,255,255,.2);
  letter-spacing:-.01em;transition:transform .1s,box-shadow .1s;-webkit-tap-highlight-color:transparent;}
.g-btn:active{transform:scale(.96);box-shadow:0 2px 10px rgba(48,209,88,.3);}
.g-dpad{display:grid;grid-template-columns:repeat(3,56px);grid-template-rows:repeat(3,56px);gap:4px;margin:10px auto 0;flex-shrink:0;}
.g-dpad-btn{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);border-radius:14px;
  display:flex;align-items:center;justify-content:center;font-size:20px;color:rgba(255,255,255,.7);cursor:pointer;
  -webkit-tap-highlight-color:transparent;transition:background .08s,transform .08s,box-shadow .08s;}
.g-dpad-btn:active{background:rgba(48,209,88,.25);border-color:rgba(48,209,88,.4);
  box-shadow:0 0 12px rgba(48,209,88,.3);transform:scale(.9);}
.g-dpad-center{background:rgba(255,255,255,.04);border-radius:50%;color:rgba(255,255,255,.4);}
.g-hint{font-size:10px;color:rgba(255,255,255,.18);text-align:center;padding:6px 0 2px;letter-spacing:.04em;flex-shrink:0;}
</style>
<div class="g-wrap" id="g-wrap">
  <div class="g-hud">
    <div class="g-score-box">
      <div class="g-score-lbl">Score</div>
      <div class="g-score-val" id="g-score">0</div>
    </div>
    <div class="g-level-pill" id="g-level">Nivel 1</div>
    <div class="g-score-box">
      <div class="g-score-lbl">Best</div>
      <div class="g-score-val" id="g-best">0</div>
    </div>
  </div>
  <div class="g-canvas-wrap" id="g-canvas-wrap">
    <div class="g-canvas-inner" id="g-canvas-inner">
      <canvas id="gcanvas"></canvas>
      <div class="g-overlay" id="g-overlay">
        <div class="g-over-emoji" id="g-over-emoji">🐍</div>
        <div class="g-over-title" id="g-over-title">Snake</div>
        <div class="g-over-sub" id="g-over-sub">Sotelo Edition</div>
        <div class="g-over-score" id="g-over-score" style="display:none"></div>
        <div class="g-over-best" id="g-over-best" style="display:none"></div>
        <button class="g-btn" id="g-start-btn">▶ Jugar</button>
      </div>
    </div>
  </div>
  ${isMob ? `
  <div class="g-dpad" id="g-dpad">
    <div></div>
    <div class="g-dpad-btn" id="gbtn-up">↑</div>
    <div></div>
    <div class="g-dpad-btn" id="gbtn-left">←</div>
    <div class="g-dpad-btn g-dpad-center" id="gbtn-pause">⏸</div>
    <div class="g-dpad-btn" id="gbtn-right">→</div>
    <div></div>
    <div class="g-dpad-btn" id="gbtn-down">↓</div>
    <div></div>
  </div>
  <div class="g-hint">Desliza o usa el pad · toca centro para pausar</div>
  ` : '<div class="g-hint">← → ↑ ↓ &nbsp;·&nbsp; Espacio para pausar</div>'}
</div>`;

  /* ── sizing ── */
  var wrap = document.getElementById('g-canvas-wrap');
  var inner = document.getElementById('g-canvas-inner');
  var canvas = document.getElementById('gcanvas');
  var ctx = canvas.getContext('2d');

  function resize(){
    // Measure actual heights of non-canvas elements
    var hud = el.querySelector('.g-hud');
    var dpad = el.querySelector('.g-dpad');
    var hint = el.querySelector('.g-hint');
    var hudH = hud ? hud.offsetHeight : 52;
    var dpadH = dpad ? dpad.offsetHeight + 16 : 0;
    var hintH = hint ? hint.offsetHeight : 20;
    var padding = 24; // top+bottom breathing room

    var availH = el.clientHeight - hudH - dpadH - hintH - padding - 6; // 6 = border wrap
    var availW = el.clientWidth - 32; // side padding

    COLS = Math.floor(availW / CELL);
    ROWS = Math.floor(availH / CELL);
    if(COLS%2!==0) COLS--;
    if(ROWS%2!==0) ROWS--;
    COLS = Math.max(8, COLS);
    ROWS = Math.max(8, ROWS);
    W = COLS * CELL;
    H = ROWS * CELL;
    canvas.width = W;
    canvas.height = H;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    inner.style.width = W + 'px';
    inner.style.height = H + 'px';
    wrap.style.width = (W + 6) + 'px';
    wrap.style.height = (H + 6) + 'px';
    if(gameState === 'playing') draw();
    else draw();
  }

  /* ── state ── */
  var snake, dir, nextDir, food, score, best, gameState, loopId, level, speed;
  best = 0;
  gameState = 'idle';

  function initGame(){
    var mx = Math.floor(COLS/2), my = Math.floor(ROWS/2);
    snake = [{x:mx,y:my},{x:mx-1,y:my},{x:mx-2,y:my}];
    dir = {x:1,y:0}; nextDir = {x:1,y:0};
    score = 0; level = 1; speed = 140;
    spawnFood();
    updateHUD();
  }

  function spawnFood(){
    var empty = [];
    for(var cx=0;cx<COLS;cx++) for(var cy=0;cy<ROWS;cy++){
      if(!snake.find(s=>s.x===cx&&s.y===cy)) empty.push({x:cx,y:cy});
    }
    food = empty[Math.floor(Math.random()*empty.length)];
    food.pulse = 0;
    // Random food type for variety
    food.type = Math.random() < 0.15 ? 'super' : 'normal';
  }

  function updateHUD(){
    document.getElementById('g-score').textContent = score;
    document.getElementById('g-best').textContent = best;
    document.getElementById('g-level').textContent = 'Nivel ' + level;
  }

  /* ── particles ── */
  var particles = [];
  function spawnParticles(x, y, color){
    for(var i=0;i<12;i++){
      var angle = (Math.PI*2/12)*i + Math.random()*.5;
      var speed = 1.5 + Math.random()*2.5;
      particles.push({
        x: x*CELL+CELL/2, y: y*CELL+CELL/2,
        vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed,
        life: 1, decay: 0.055 + Math.random()*0.03,
        r: 2+Math.random()*3, color: color
      });
    }
  }

  /* ── draw ── */
  var hue = 0;
  function draw(){
    hue = (hue+0.4)%360;

    // Background — deep dark green tint
    ctx.fillStyle = '#080e08';
    ctx.fillRect(0,0,W,H);

    // Grid lines — subtle green tint
    ctx.strokeStyle = 'rgba(48,209,88,.07)';
    ctx.lineWidth = 0.5;
    for(var gx=0;gx<=COLS;gx++){
      ctx.beginPath(); ctx.moveTo(gx*CELL,0); ctx.lineTo(gx*CELL,H); ctx.stroke();
    }
    for(var gy=0;gy<=ROWS;gy++){
      ctx.beginPath(); ctx.moveTo(0,gy*CELL); ctx.lineTo(W,gy*CELL); ctx.stroke();
    }

    // Scanlines overlay
    for(var sl=0;sl<H;sl+=4){
      ctx.fillStyle='rgba(0,0,0,.06)';
      ctx.fillRect(0,sl,W,2);
    }

    // Corner accent dots
    var ca='rgba(48,209,88,.3)', cs=6;
    ctx.fillStyle=ca;
    [[0,0],[W,0],[0,H],[W,H]].forEach(function(c){
      ctx.beginPath(); ctx.arc(c[0],c[1],cs,0,Math.PI*2); ctx.fill();
    });

    // Only draw game elements if game has been initialized
    if(!food || !snake) return;

    // Food glow
    food.pulse = (food.pulse||0) + 0.07;
    var fp = Math.sin(food.pulse)*0.4+0.6;
    var fc = food.type==='super' ? '#FF9500' : '#30D158';
    var fx = food.x*CELL+CELL/2, fy = food.y*CELL+CELL/2;
    // Outer glow
    var gr = ctx.createRadialGradient(fx,fy,0,fx,fy,CELL*1.2);
    gr.addColorStop(0, fc+'55'); gr.addColorStop(1,'transparent');
    ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(fx,fy,CELL*1.2,0,Math.PI*2); ctx.fill();
    // Food body
    ctx.save();
    ctx.shadowBlur = 12*fp; ctx.shadowColor = fc;
    ctx.fillStyle = fc;
    ctx.beginPath();
    ctx.roundRect(food.x*CELL+2, food.y*CELL+2, CELL-4, CELL-4, 5);
    ctx.fill();
    if(food.type==='super'){
      ctx.fillStyle='rgba(255,255,255,.8)';
      ctx.font='bold '+(CELL-6)+'px system-ui';
      ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText('★',fx,fy+1);
    }
    ctx.restore();

    // Snake
    snake.forEach(function(seg, i){
      var isHead = i===0;
      var t = 1 - i/snake.length;
      var sx = seg.x*CELL, sy = seg.y*CELL;
      var pad = isHead ? 1 : 2;
      var r = isHead ? 8 : 5;

      // Color: head is bright, tail fades
      var segHue = (hue + i*4)%360;
      ctx.save();
      if(isHead){
        ctx.shadowBlur = 16; ctx.shadowColor = 'hsla('+segHue+',80%,60%,0.8)';
      }
      ctx.fillStyle = isHead
        ? 'hsl('+segHue+',75%,62%)'
        : 'hsla('+segHue+',65%,'+(48+t*14)+'%,'+(0.5+t*0.5)+')';
      ctx.beginPath();
      ctx.roundRect(sx+pad, sy+pad, CELL-pad*2, CELL-pad*2, r);
      ctx.fill();

      // Head eyes
      if(isHead){
        ctx.fillStyle='rgba(255,255,255,.9)';
        var ex1, ey1, ex2, ey2;
        var es=3, eo=5;
        if(dir.x===1){  ex1=sx+CELL-eo; ey1=sy+eo;   ex2=sx+CELL-eo; ey2=sy+CELL-eo; }
        else if(dir.x===-1){ ex1=sx+eo; ey1=sy+eo;   ex2=sx+eo;      ey2=sy+CELL-eo; }
        else if(dir.y===1){  ex1=sx+eo; ey1=sy+CELL-eo; ex2=sx+CELL-eo; ey2=sy+CELL-eo; }
        else { ex1=sx+eo; ey1=sy+eo; ex2=sx+CELL-eo; ey2=sy+eo; }
        ctx.beginPath(); ctx.arc(ex1,ey1,es,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(ex2,ey2,es,0,Math.PI*2); ctx.fill();
        ctx.fillStyle='rgba(0,0,0,.8)';
        ctx.beginPath(); ctx.arc(ex1+.5,ey1+.5,1.5,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(ex2+.5,ey2+.5,1.5,0,Math.PI*2); ctx.fill();
      }
      ctx.restore();
    });

    // Particles
    particles = particles.filter(function(p){
      p.x+=p.vx; p.y+=p.vy; p.vy+=0.08; p.life-=p.decay;
      if(p.life<=0) return false;
      ctx.save();
      ctx.globalAlpha=p.life;
      ctx.fillStyle=p.color;
      ctx.shadowBlur=6; ctx.shadowColor=p.color;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r*p.life,0,Math.PI*2); ctx.fill();
      ctx.restore();
      return true;
    });
  }

  /* ── game loop ── */
  var lastTime = 0;
  function loop(ts){
    if(gameState!=='playing') return;
    loopId = requestAnimationFrame(loop);
    if(ts - lastTime < speed) { draw(); return; }
    lastTime = ts;

    dir = {x:nextDir.x, y:nextDir.y};
    var head = {x:snake[0].x+dir.x, y:snake[0].y+dir.y};

    // Wall collision
    if(head.x<0||head.x>=COLS||head.y<0||head.y>=ROWS){ endGame(); return; }
    // Self collision
    if(snake.find(s=>s.x===head.x&&s.y===head.y)){ endGame(); return; }

    snake.unshift(head);
    var ate = head.x===food.x && head.y===food.y;
    if(ate){
      var pts = food.type==='super' ? 5 : 1;
      score += pts;
      if(score>best) best=score;
      spawnParticles(food.x, food.y, food.type==='super'?'#FF9500':'#30D158');
      spawnFood();
      level = Math.floor(score/5)+1;
      speed = Math.max(60, 140 - (level-1)*12);
      updateHUD();
      // Score pop animation
      var sv=document.getElementById('g-score');
      if(sv){sv.classList.remove('pop');void sv.offsetWidth;sv.classList.add('pop');setTimeout(()=>sv.classList.remove('pop'),150);}
      // Pulse border faster on eat
      var cw=document.getElementById('g-canvas-wrap');
      if(cw){cw.style.boxShadow='0 0 48px rgba(48,209,88,.55),0 0 80px rgba(48,209,88,.2),0 8px 32px rgba(0,0,0,.6)';
        setTimeout(()=>{if(cw)cw.style.boxShadow='';},300);}
    } else {
      snake.pop();
    }
    draw();
  }

  function startGame(){
    initGame();
    gameState='playing';
    var ov=document.getElementById('g-overlay');
    ov.classList.add('hidden');
    document.getElementById('g-over-emoji').textContent='🐍';
    document.getElementById('g-over-score').style.display='none';
    document.getElementById('g-over-best').style.display='none';
    lastTime=0;
    loopId=requestAnimationFrame(loop);
  }

  function endGame(){
    cancelAnimationFrame(loopId);
    gameState='dead';
    // Death flash
    ctx.fillStyle='rgba(255,59,48,.15)';
    ctx.fillRect(0,0,W,H);
    spawnParticles(snake[0].x,snake[0].y,'#FF3B30');
    draw();
    setTimeout(function(){
      document.getElementById('g-over-emoji').textContent='💀';
      document.getElementById('g-over-title').textContent='Game Over';
      document.getElementById('g-over-sub').textContent='puntaje final';
      document.getElementById('g-over-score').style.display='block';
      document.getElementById('g-over-score').textContent=score;
      document.getElementById('g-over-best').style.display='block';
      document.getElementById('g-over-best').textContent='RÉCORD: '+best;
      document.getElementById('g-start-btn').textContent='↺ Reintentar';
      document.getElementById('g-overlay').classList.remove('hidden');
    }, 400);
  }

  function togglePause(){
    if(gameState==='playing'){
      gameState='paused';
      cancelAnimationFrame(loopId);
      // Draw pause overlay on canvas
      ctx.fillStyle='rgba(0,0,0,.6)';
      ctx.fillRect(0,0,W,H);
      ctx.fillStyle='rgba(255,255,255,.9)';
      ctx.font='bold 28px system-ui';
      ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText('⏸ Pausado',W/2,H/2);
    } else if(gameState==='paused'){
      gameState='playing';
      lastTime=0;
      loopId=requestAnimationFrame(loop);
    }
  }

  /* ── controls ── */
  document.getElementById('g-start-btn').addEventListener('click', startGame);

  // Keyboard
  var keyHandler = function(e){
    var map={ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1},ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0}};
    if(map[e.key]){
      e.preventDefault();
      var nd=map[e.key];
      if(nd.x===-dir.x&&nd.y===-dir.y) return; // no reverse
      nextDir=nd;
    }
    if(e.key===' '||e.key==='Escape') togglePause();
  };
  document.addEventListener('keydown', keyHandler);

  // D-pad buttons (mobile)
  if(isMob){
    var btns={up:{x:0,y:-1},down:{x:0,y:1},left:{x:-1,y:0},right:{x:1,y:0}};
    Object.keys(btns).forEach(function(k){
      var btn=document.getElementById('gbtn-'+k);
      if(!btn)return;
      btn.addEventListener('touchstart',function(e){
        e.stopPropagation();
        var nd=btns[k];
        if(nd.x===-dir.x&&nd.y===-dir.y) return;
        nextDir=nd;
      },{passive:true});
    });
    var pauseBtn=document.getElementById('gbtn-pause');
    if(pauseBtn) pauseBtn.addEventListener('touchstart',function(e){e.stopPropagation();togglePause();},{passive:true});
  }

  // Swipe on canvas (mobile)
  var tx=0,ty=0;
  canvas.addEventListener('touchstart',function(e){tx=e.touches[0].clientX;ty=e.touches[0].clientY;e.stopPropagation();},{passive:true});
  canvas.addEventListener('touchend',function(e){
    e.stopPropagation();
    var dx=e.changedTouches[0].clientX-tx, dy=e.changedTouches[0].clientY-ty;
    if(Math.abs(dx)<20&&Math.abs(dy)<20) return;
    var nd;
    if(Math.abs(dx)>Math.abs(dy)) nd=dx>0?{x:1,y:0}:{x:-1,y:0};
    else nd=dy>0?{x:0,y:1}:{x:0,y:-1};
    if(nd.x===-dir.x&&nd.y===-dir.y) return;
    nextDir=nd;
  });

  // Cleanup on close
  var observer=new MutationObserver(function(){
    if(!document.contains(canvas)){
      cancelAnimationFrame(loopId);
      document.removeEventListener('keydown',keyHandler);
      observer.disconnect();
    }
  });
  observer.observe(document.body,{childList:true,subtree:true});

  resize();
  draw();
}
