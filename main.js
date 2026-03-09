/* ================================================================
   SOTELO CONFIG — Edita aquí los valores que quieras controlar
   ================================================================ */
var SOTELO_CONFIG = {
  stats: [
    { value: 10,  label: 'Proyectos', suffix: '+', colorClass: 'c1' },
    { value: 8,   label: 'Clientes',  suffix: '+', colorClass: 'c2' },
    { value: 5,   label: 'Años',      suffix: '+', colorClass: 'c3' }
  ]
};
/* ================================================================ */

(function(){
'use strict';

/* ─── SCROLL PROGRESS ─── */
var sp=document.getElementById('scroll-prog');
function updateProgress(){
  var d=document.documentElement;
  sp.style.width=((window.scrollY/(d.scrollHeight-d.clientHeight))*100)+'%';
}
window.addEventListener('scroll',updateProgress,{passive:true});

/* ─── LIVE CLOCK ─── */
function updateClock(){
  var now=new Date();
  var options={timeZone:'America/Bogota',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false};
  var t=now.toLocaleTimeString('es-CO',options);
  var el=document.getElementById('live-time');
  var el2=document.getElementById('ld-clock-disp');
  if(el)el.textContent=t;
  if(el2)el2.textContent='LOCAL · '+t;
}
updateClock();setInterval(updateClock,1000);

/* ─── CURSOR EPIC ─── */
var cur=document.getElementById('cur');
var curR=document.getElementById('cur-r');
var curI=document.getElementById('cur-inner');
var mx=0,my=0,rx=0,ry=0;
var blobColors=['rgba(77,184,200,0.35)','rgba(224,64,251,0.3)','rgba(93,223,168,0.25)'];
var blobIdx=0;
var lastBlobTime=0;

document.addEventListener('mousemove',function(e){
  mx=e.clientX;my=e.clientY;
  cur.style.left=mx+'px';cur.style.top=my+'px';
  /* Liquid blob trail on fast movement */
  var now=Date.now();
  if(now-lastBlobTime>120){
    lastBlobTime=now;
    var blob=document.createElement('div');
    blob.className='c-blob';
    var s=6+Math.random()*10;
    blob.style.cssText='left:'+mx+'px;top:'+my+'px;width:'+s+'px;height:'+s+'px;background:'+blobColors[blobIdx%blobColors.length]+';';
    blobIdx++;
    document.body.appendChild(blob);
    setTimeout(function(){blob.remove();},1200);
  }
});
document.addEventListener('mousedown',function(){cur.classList.add('clicking');});
document.addEventListener('mouseup',function(){cur.classList.remove('clicking');});

/* Cursor ring gradient follow */
var hue=180;
(function track(){
  rx+=(mx-rx)*.1;ry+=(my-ry)*.1;
  hue=(hue+.3)%360;
  curR.style.left=rx+'px';curR.style.top=ry+'px';
  curI.style.left=rx+'px';curI.style.top=ry+'px';
  curI.style.borderColor='hsla('+hue+',70%,65%,0.4)';
  requestAnimationFrame(track);
})();

cur.style.background='var(--white)';
cur.style.mixBlendMode='difference';

/* Cursor states */
var heroEl=document.getElementById('hero');
document.querySelectorAll('a,button,.sv-cell').forEach(function(el){
  el.addEventListener('mouseenter',function(){curI.classList.add('over-link');});
  el.addEventListener('mouseleave',function(){curI.classList.remove('over-link');});
});
if(heroEl){
  heroEl.addEventListener('mouseenter',function(){curI.classList.add('over-hero');});
  heroEl.addEventListener('mouseleave',function(){curI.classList.remove('over-hero');});
}

/* ─── CURSOR TRAIL ─── */
var trailPool=[];var trailN=14;
for(var ti=0;ti<trailN;ti++){
  var td=document.createElement('div');td.className='trail-dot';
  var tc=ti%3===0?'var(--ac)':ti%3===1?'var(--mg)':'var(--green)';
  td.style.background=tc;
  document.body.appendChild(td);trailPool.push({el:td,x:0,y:0});
}
var trailPositions=[];
document.addEventListener('mousemove',function(e){
  trailPositions.unshift({x:e.clientX,y:e.clientY});
  if(trailPositions.length>trailN)trailPositions.length=trailN;
});
(function trailLoop(){
  requestAnimationFrame(trailLoop);
  for(var i=0;i<trailN;i++){
    var dot=trailPool[i];
    if(trailPositions[i]){
      dot.x+=(trailPositions[i].x-dot.x)*.22;
      dot.y+=(trailPositions[i].y-dot.y)*.22;
      var al=((trailN-i)/trailN)*0.18;
      var sc=1-i/trailN*.65;
      dot.el.style.cssText='left:'+dot.x+'px;top:'+dot.y+'px;opacity:'+al+';transform:translate(-50%,-50%) scale('+sc+');';
    }
  }
})();

/* ─── LOADER ─── */
var ldBar=document.getElementById('ld-bar');
var ldPct=document.getElementById('ld-pct');
var loaderEl=document.getElementById('loader');
var pct=0;
var ldTimer=setInterval(function(){
  pct+=Math.random()*9+4;
  if(pct>=100){pct=100;clearInterval(ldTimer);setTimeout(boot,500);}
  ldBar.style.width=pct+'%';
  ldPct.textContent=Math.round(pct)+'%';
},70);

/* ─── SCRAMBLE TEXT ─── */
var chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
function scramble(el,target,duration){
  var start=null;
  var len=target.length;
  function step(ts){
    if(!start)start=ts;
    var p=Math.min((ts-start)/duration,1);
    var revealed=Math.floor(p*len);
    var out='';
    for(var i=0;i<len;i++){
      if(i<revealed){out+=target[i];}
      else{out+=chars[Math.floor(Math.random()*chars.length)];}
    }
    el.textContent=out;
    if(p<1)requestAnimationFrame(step);
    else el.textContent=target;
  }
  requestAnimationFrame(step);
}

function boot(){
  loaderEl.classList.add('gone');
  ['h-location','h-eye','h-title','h-sub','h-btns','h-clock'].forEach(function(id){
    var el=document.getElementById(id);
    if(el)el.classList.add('h-show');
  });
  var hs=document.getElementById('h-scroll');
  if(hs)hs.classList.add('h-show');
  setTimeout(function(){
    var sc=document.getElementById('hero-scramble');
    if(sc)scramble(sc,'Craftsman',1400);
  },2600);
  initHero();
  initInterlude();
  initAbout3D();
  buildBars();
  initReveal();
  initCounters();
  initMagnetic();
  initScrollFX();
  initServiceHover();
  initEasterEgg();
}

/* ─── NAV ─── */
window.addEventListener('scroll',function(){
  document.getElementById('nav').classList.toggle('solid',window.scrollY>60);
});

/* ─── HERO CANVAS ─── */
function initHero(){
  var canvas=document.getElementById('hero-canvas');if(!canvas)return;
  var ctx=canvas.getContext('2d');
  var W,H;
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
  resize();window.addEventListener('resize',resize);
  var pts=[];
  var ptColors=['rgba(77,184,200,','rgba(224,64,251,','rgba(93,223,168,','rgba(45,143,160,'];
  for(var i=0;i<130;i++){
    pts.push({
      x:Math.random()*1920,y:Math.random()*1080,
      vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,
      r:Math.random()*.9+.2,
      color:ptColors[Math.floor(Math.random()*ptColors.length)]
    });
  }
  var pmx=960,pmy=540;
  document.addEventListener('mousemove',function(e){pmx=e.clientX;pmy=e.clientY;});
  var t=0;
  (function loop(){
    requestAnimationFrame(loop);t+=.007;
    ctx.clearRect(0,0,W,H);
    ctx.strokeStyle='rgba(77,184,200,0.025)';ctx.lineWidth=1;
    for(var x=0;x<W;x+=80){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for(var y=0;y<H;y+=80){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
    var vg=ctx.createRadialGradient(W/2,H/2,H*.1,W/2,H/2,H*.9);
    vg.addColorStop(0,'transparent');vg.addColorStop(1,'rgba(7,7,26,.82)');
    ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
    var grd=ctx.createRadialGradient(pmx,pmy,0,pmx,pmy,280);
    grd.addColorStop(0,'rgba(77,184,200,0.045)');
    grd.addColorStop(.5,'rgba(224,64,251,0.02)');
    grd.addColorStop(1,'transparent');
    ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
    for(var i=0;i<pts.length;i++){
      var p=pts[i];
      p.x+=p.vx+(pmx-W/2)*.00008;p.y+=p.vy+(pmy-H/2)*.00008;
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
      var dist=Math.sqrt((p.x-pmx)*(p.x-pmx)+(p.y-pmy)*(p.y-pmy));
      var glow=Math.max(0,1-dist/220);
      var alpha=.1+Math.sin(t+p.x*.008)*.07+glow*.6;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r+glow*.6,0,Math.PI*2);
      ctx.fillStyle=p.color+alpha+')';ctx.fill();
    }
    for(var i=0;i<pts.length;i++){
      for(var j=i+1;j<pts.length;j++){
        var dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y;
        var d=Math.sqrt(dx*dx+dy*dy);
        if(d<95){
          var grad=ctx.createLinearGradient(pts[i].x,pts[i].y,pts[j].x,pts[j].y);
          var al=(0.08*(1-d/95));
          grad.addColorStop(0,'rgba(77,184,200,'+al+')');
          grad.addColorStop(1,'rgba(224,64,251,'+(al*.7)+')');
          ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);
          ctx.strokeStyle=grad;ctx.lineWidth=.5;ctx.stroke();
        }
      }
    }
  })();
  window.addEventListener('scroll',function(){
    var hi=document.getElementById('hero-inner');
    if(hi&&window.scrollY<window.innerHeight)hi.style.transform='translateY('+(window.scrollY*.22)+'px)';
  });
}

/* ─── INTERLUDE 3D ─── */
function initInterlude(){
  if(typeof THREE==='undefined')return;
  var canvas=document.getElementById('scene-canvas');if(!canvas)return;
  var renderer=new THREE.WebGLRenderer({canvas:canvas,alpha:true,antialias:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  var scene=new THREE.Scene();
  var cam=new THREE.PerspectiveCamera(65,window.innerWidth/window.innerHeight,.1,100);
  cam.position.set(0,0,4.5);
  scene.add(new THREE.AmbientLight(0xffffff,.3));
  var pl1=new THREE.PointLight(0x4db8c8,4,18);pl1.position.set(3,2,3);scene.add(pl1);
  var pl2=new THREE.PointLight(0xe040fb,2.5,14);pl2.position.set(-3,-2,2);scene.add(pl2);
  var pl3=new THREE.PointLight(0x5ddfa8,1.5,10);pl3.position.set(0,3,-2);scene.add(pl3);
  var tk=new THREE.Mesh(new THREE.TorusKnotGeometry(1.2,.08,200,18,3,5),
    new THREE.MeshStandardMaterial({color:0x0d0d22,metalness:.96,roughness:.04}));scene.add(tk);
  var tkW=new THREE.Mesh(new THREE.TorusKnotGeometry(1.22,.082,200,18,3,5),
    new THREE.MeshBasicMaterial({color:0x4db8c8,wireframe:true,transparent:true,opacity:.08}));scene.add(tkW);
  var tkW2=new THREE.Mesh(new THREE.TorusKnotGeometry(1.25,.08,200,18,3,5),
    new THREE.MeshBasicMaterial({color:0xe040fb,wireframe:true,transparent:true,opacity:.04}));scene.add(tkW2);
  var pGeo=new THREE.BufferGeometry();
  var pPos=new Float32Array(300*3);
  var pColors=new Float32Array(300*3);
  for(var i=0;i<300;i++){
    var a=Math.random()*Math.PI*2,r=2.2+Math.random()*4;
    pPos[i*3]=Math.cos(a)*r;pPos[i*3+1]=(Math.random()-.5)*7;pPos[i*3+2]=Math.sin(a)*r-3;
    var mix=Math.random();
    pColors[i*3]=mix*.3+(1-mix)*.88;pColors[i*3+1]=mix*.72+(1-mix)*.25;pColors[i*3+2]=mix*.79+(1-mix)*.98;
  }
  pGeo.setAttribute('position',new THREE.BufferAttribute(pPos,3));
  pGeo.setAttribute('color',new THREE.BufferAttribute(pColors,3));
  scene.add(new THREE.Points(pGeo,new THREE.PointsMaterial({size:.035,vertexColors:true,transparent:true,opacity:.5})));
  var tmx=0,tmy=0,t=0,running=false;
  document.addEventListener('mousemove',function(e){tmx=(e.clientX/window.innerWidth-.5);tmy=-(e.clientY/window.innerHeight-.5);});
  window.addEventListener('resize',function(){cam.aspect=window.innerWidth/window.innerHeight;cam.updateProjectionMatrix();renderer.setSize(window.innerWidth,window.innerHeight);});
  var obs=new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting&&!running){running=true;
      (function loop(){if(!running)return;requestAnimationFrame(loop);t+=.005;
        tk.rotation.y+=.006;tk.rotation.x=.3+Math.sin(t)*.1;
        tkW.rotation.y=tk.rotation.y;tkW.rotation.x=tk.rotation.x;
        tkW2.rotation.y=tk.rotation.y+.3;tkW2.rotation.x=tk.rotation.x;
        cam.position.x+=(tmx*2-cam.position.x)*.05;cam.position.y+=(tmy*1.5-cam.position.y)*.05;
        cam.lookAt(scene.position);
        pl1.position.x=Math.sin(t*1.3)*3;pl1.position.y=Math.cos(t*.9)*2;
        pl2.position.x=Math.cos(t*.8)*3;pl2.position.y=Math.sin(t*1.1)*2;
        renderer.render(scene,cam);})();
    }else if(!entries[0].isIntersecting){running=false;}
  },{threshold:.1});
  obs.observe(document.getElementById('interlude'));
}

/* ─── ABOUT 3D ─── */
function initAbout3D(){
  if(typeof THREE==='undefined')return;
  var canvas=document.getElementById('about-canvas');if(!canvas)return;
  var W=canvas.offsetWidth,H=canvas.offsetHeight;if(!W||!H)return;
  var renderer=new THREE.WebGLRenderer({canvas:canvas,alpha:true,antialias:true});
  renderer.setSize(W,H);renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  var scene=new THREE.Scene();
  var cam=new THREE.PerspectiveCamera(58,W/H,.1,50);cam.position.set(0,0,4);
  scene.add(new THREE.AmbientLight(0xffffff,.3));
  var pl=new THREE.PointLight(0x4db8c8,3,16);pl.position.set(2,2,3);scene.add(pl);
  var pl2=new THREE.PointLight(0xe040fb,2,12);pl2.position.set(-3,-1,2);scene.add(pl2);
  var pl3=new THREE.PointLight(0x5ddfa8,1,8);pl3.position.set(1,-3,1);scene.add(pl3);
  var oct=new THREE.Mesh(new THREE.OctahedronGeometry(1.3,1),new THREE.MeshStandardMaterial({color:0x0e0e26,metalness:.95,roughness:.05}));scene.add(oct);
  var octW=new THREE.Mesh(new THREE.OctahedronGeometry(1.32,1),new THREE.MeshBasicMaterial({color:0x4db8c8,wireframe:true,transparent:true,opacity:.12}));scene.add(octW);
  var octW2=new THREE.Mesh(new THREE.OctahedronGeometry(1.36,1),new THREE.MeshBasicMaterial({color:0xe040fb,wireframe:true,transparent:true,opacity:.05}));scene.add(octW2);
  [1.9,2.6,3.3].forEach(function(r,i){
    var col=[0x4db8c8,0xe040fb,0x5ddfa8][i];
    var ring=new THREE.Mesh(new THREE.TorusGeometry(r,.005,8,80),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.07-.01*i}));
    ring.rotation.x=Math.PI/3*i;scene.add(ring);
  });
  var lx=0,ly=0,t=0;
  canvas.addEventListener('mousemove',function(e){var rc=canvas.getBoundingClientRect();lx=(e.clientX-rc.left)/W-.5;ly=-((e.clientY-rc.top)/H-.5);});
  (function loop(){requestAnimationFrame(loop);t+=.006;
    oct.rotation.y+=.005;oct.rotation.x=Math.sin(t)*.18;
    octW.rotation.y=oct.rotation.y;octW.rotation.x=oct.rotation.x;
    octW2.rotation.y=oct.rotation.y-.2;octW2.rotation.x=oct.rotation.x;
    pl.position.x=Math.sin(t)*2.5;pl.position.y=Math.cos(t*.8)*2;
    pl2.position.x=Math.cos(t*.9)*2.5;pl2.position.y=Math.sin(t*1.1)*2;
    cam.position.x+=(lx*1.5-cam.position.x)*.06;cam.position.y+=(ly-cam.position.y)*.06;
    cam.lookAt(scene.position);renderer.render(scene,cam);})();
}

/* ─── PHONE BARS ─── */
function buildBars(){
  var c=document.getElementById('phi-bars');if(!c)return;
  var vals=[55,80,42,92,66,50,88];
  vals.forEach(function(v,i){
    var b=document.createElement('div');b.className='phi-bar';
    var hue=160+i*8;
    b.style.cssText='height:'+Math.round(v*.33)+'px;background:hsl('+hue+',70%,58%);opacity:'+(0.4+v/220)+';border-radius:2px 2px 0 0;box-shadow:0 0 6px hsla('+hue+',70%,58%,.3);';
    c.appendChild(b);
  });
}

/* ─── SERVICE CARD GLOW ─── */
function initServiceHover(){
  document.querySelectorAll('.sv-cell').forEach(function(cell){
    var glow=cell.querySelector('.sv-glow');if(!glow)return;
    cell.addEventListener('mousemove',function(e){
      var r=cell.getBoundingClientRect();
      glow.style.left=(e.clientX-r.left)+'px';glow.style.top=(e.clientY-r.top)+'px';
    });
  });
}

/* ─── SCROLL FX ─── */
function initScrollFX(){
  var desktop=window.innerWidth>=900;
  var ipodStage=document.getElementById('ipod-stage');
  var ipodFloat=document.getElementById('ipod-float');
  var phoneStage=document.getElementById('phone-stage');
  var phoneFloat=document.getElementById('phone-float');
  if(!ipodFloat||!phoneFloat)return;
  if(desktop&&ipodStage){
    ipodStage.addEventListener('mousemove',function(e){
      var r=ipodStage.getBoundingClientRect();
      var dx=(e.clientX-r.left-r.width/2)/(r.width/2);
      var dy=(e.clientY-r.top-r.height/2)/(r.height/2);
      ipodFloat.style.transition='transform .08s';
      ipodFloat.style.transform='perspective(900px) rotateY('+(dx*16)+'deg) rotateX('+(-dy*10)+'deg) translateZ(30px)';
    });
    ipodStage.addEventListener('mouseleave',function(){
      ipodFloat.style.transition='transform .8s cubic-bezier(.23,1,.32,1)';
      ipodFloat.style.transform='perspective(900px) rotateY(-6deg) rotateX(2deg)';
    });
  }
  if(desktop&&phoneStage){
    phoneStage.addEventListener('mousemove',function(e){
      var r=phoneStage.getBoundingClientRect();
      var dx=(e.clientX-r.left-r.width/2)/(r.width/2);
      var dy=(e.clientY-r.top-r.height/2)/(r.height/2);
      phoneFloat.style.transition='transform .08s';
      phoneFloat.style.transform='perspective(900px) rotateY('+(dx*16)+'deg) rotateX('+(-dy*10)+'deg) translateZ(30px)';
    });
    phoneStage.addEventListener('mouseleave',function(){
      phoneFloat.style.transition='transform .8s cubic-bezier(.23,1,.32,1)';
      phoneFloat.style.transform='perspective(900px) rotateY(6deg) rotateX(2deg)';
    });
  }
  function easeOut(t){return 1-Math.pow(1-t,3);}
  function onScrollDesktop(){
    var sy=window.scrollY;
    var syEl=document.getElementById('sy');
    if(syEl&&!(ipodStage&&ipodStage.matches(':hover'))){
      var outerTop=syEl.getBoundingClientRect().top+sy;
      var prog=Math.max(0,Math.min(1,(sy-outerTop)/syEl.offsetHeight));
      var p1=Math.max(0,Math.min(1,prog/.25));
      var p2=Math.max(0,Math.min(1,(prog-.25)/.5));
      var p3=Math.max(0,Math.min(1,(prog-.75)/.25));
      ipodFloat.style.transition='none';
      ipodFloat.style.transform='perspective(900px) translateY('+((1-easeOut(p1))*130+easeOut(p3)*-110)+'px) rotateY('+(-6+easeOut(p1)*6+p3*-8)+'deg) rotateX('+(18-easeOut(p1)*16+p3*5)+'deg) scale('+(.82+easeOut(p1)*.18-p3*.12)+')';
      [['an1',0],['an2',.1],['an3',.2]].forEach(function(a){
        var el=document.getElementById(a[0]);if(!el)return;
        var show=p2>a[1]+.08&&p3<.5;
        el.style.opacity=show?'1':'0';
        if(show)el.classList.add('vis');else el.classList.remove('vis');
      });
    }
    var skEl=document.getElementById('sk');
    if(skEl&&!(phoneStage&&phoneStage.matches(':hover'))){
      var outerTop2=skEl.getBoundingClientRect().top+sy;
      var prog2=Math.max(0,Math.min(1,(sy-outerTop2)/skEl.offsetHeight));
      var p1b=Math.max(0,Math.min(1,prog2/.25));
      var p2b=Math.max(0,Math.min(1,(prog2-.25)/.5));
      var p3b=Math.max(0,Math.min(1,(prog2-.75)/.25));
      phoneFloat.style.transition='none';
      phoneFloat.style.transform='perspective(900px) translateY('+((1-easeOut(p1b))*130+easeOut(p3b)*-110)+'px) rotateY('+(6-easeOut(p1b)*6+p3b*8)+'deg) rotateX('+(18-easeOut(p1b)*16+p3b*5)+'deg) scale('+(.82+easeOut(p1b)*.18-p3b*.12)+')';
      [['an4',0],['an5',.1],['an6',.2]].forEach(function(a){
        var el=document.getElementById(a[0]);if(!el)return;
        var show=p2b>a[1]+.08&&p3b<.5;
        el.style.opacity=show?'1':'0';
        if(show)el.classList.add('vis');else el.classList.remove('vis');
      });
    }
  }
  function onScrollMobile(){
    var vh=window.innerHeight;
    if(ipodFloat){var ri=ipodFloat.getBoundingClientRect();var pi=Math.max(-.5,Math.min(1.2,1-(ri.top+ri.height/2)/vh));ipodFloat.style.transition='transform .15s ease-out';ipodFloat.style.transform='perspective(700px) translateY('+(pi*-18)+'px) rotateY('+(-4+pi*4)+'deg) rotateX('+(pi*-12)+'deg)';}
    if(phoneFloat){var rp=phoneFloat.getBoundingClientRect();var pp=Math.max(-.5,Math.min(1.2,1-(rp.top+rp.height/2)/vh));phoneFloat.style.transition='transform .15s ease-out';phoneFloat.style.transform='perspective(700px) translateY('+(pp*-18)+'px) rotateY('+(4-pp*4)+'deg) rotateX('+(pp*-12)+'deg)';}
  }
  if(desktop){window.addEventListener('scroll',onScrollDesktop,{passive:true});onScrollDesktop();}
  else{window.addEventListener('scroll',onScrollMobile,{passive:true});onScrollMobile();}
}

/* ─── REVEAL ─── */
function initReveal(){
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');obs.unobserve(e.target);}});
  },{threshold:.1,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.rv').forEach(function(el){obs.observe(el);});
}

/* ─── COUNTERS ─── */
function initCounters(){
  var container=document.getElementById('ab-stats');
  if(container){
    container.innerHTML='';
    SOTELO_CONFIG.stats.forEach(function(stat){
      var wrap=document.createElement('div');
      var num=document.createElement('div');
      num.className='ab-n '+stat.colorClass;
      num.dataset.target=stat.value;
      num.dataset.suffix=stat.suffix||'+';
      num.textContent='0';
      var lbl=document.createElement('div');
      lbl.className='ab-l';
      lbl.textContent=stat.label;
      wrap.appendChild(num);wrap.appendChild(lbl);
      container.appendChild(wrap);
    });
  }
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        var target=parseInt(e.target.dataset.target);
        var suffix=e.target.dataset.suffix||'+';
        var c=0;var inc=target/60;
        var ti=setInterval(function(){
          c+=inc;if(c>=target){c=target;clearInterval(ti);}
          e.target.textContent=Math.round(c)+suffix;
        },24);obs.unobserve(e.target);
      }
    });
  },{threshold:.5});
  document.querySelectorAll('[data-target]').forEach(function(el){obs.observe(el);});
}

/* ─── MAGNETIC BUTTONS ─── */
function initMagnetic(){
  document.querySelectorAll('.btn-a,.btn-b,.n-cta,.proj-link,.ct-soc-card').forEach(function(btn){
    btn.addEventListener('mousemove',function(e){
      var r=btn.getBoundingClientRect();
      btn.style.transform='translate('+((e.clientX-r.left-r.width/2)*.2)+'px,'+((e.clientY-r.top-r.height/2)*.2)+'px)';
    });
    btn.addEventListener('mouseleave',function(){btn.style.transform='';btn.style.transition='transform .6s cubic-bezier(.23,1,.32,1)';});
    btn.addEventListener('mouseenter',function(){btn.style.transition='transform .1s';});
  });
}

/* ─── EASTER EGG ─── */
function initEasterEgg(){
  var logo=document.getElementById('n-logo');if(!logo)return;
  var burstColors=['#4db8c8','#e040fb','#5ddfa8','#2a8fa0','#a800d4'];
  logo.addEventListener('click',function(e){
    e.preventDefault();
    var wrapper=document.createElement('div');wrapper.className='logo-burst';
    wrapper.style.cssText='left:'+e.clientX+'px;top:'+e.clientY+'px;';
    var count=20;
    for(var i=0;i<count;i++){
      var s=document.createElement('span');
      var angle=(i/count)*Math.PI*2;
      var dist=50+Math.random()*70;
      s.style.setProperty('--tx',(Math.cos(angle)*dist)+'px');
      s.style.setProperty('--ty',(Math.sin(angle)*dist)+'px');
      s.style.animationDelay=(Math.random()*.2)+'s';
      var sz=3+Math.random()*7;
      s.style.width=sz+'px';s.style.height=sz+'px';
      s.style.background=burstColors[Math.floor(Math.random()*burstColors.length)];
      s.style.boxShadow='0 0 8px '+burstColors[i%burstColors.length];
      wrapper.appendChild(s);
    }
    document.body.appendChild(wrapper);
    setTimeout(function(){wrapper.remove();},1300);
  });
}

})();
