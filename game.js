(function setupSpaceShooterSprites(){
  const canvas=document.getElementById("gameCanvas");
  const ctx=canvas.getContext("2d",{alpha:false});
  const W=320,H=240;canvas.width=W;canvas.height=H;

  // Cargar sprites
  const sprites={
    player:new Image(),
    enemy1:new Image(),
    enemy2:new Image(),
    laser:new Image(),
    explosion:new Image()
  };
  sprites.player.src="assets/player.png";
  sprites.enemy1.src="assets/enemy1.png";
  sprites.enemy2.src="assets/enemy2.png";
  sprites.laser.src="assets/laser.png";
  sprites.explosion.src="assets/explosion.png";

  // Estado
  let rafId=null,running=false,lastTs=0,score=0;
  const ship={x:56,y:H/2,w:32,h:32};
  let enemies=[],bullets=[],explosions=[],stars=[];

  // Config
  const enemySpawnRate=10.5,enemyMinSpeed=90,enemyMaxSpeed=160,autoShootRate=2;
  const maxEnemies=32;

  // Helpers
  const rand=(a,b)=>Math.random()*(b-a)+a;
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

  function resetGame(){
    enemies=[];bullets=[];explosions=[];
    score=0;ship.y=H/2;
    initStars();
    updateScore();
  }

  // Fondo estrellas
  function initStars(){
    stars.length = 0; // limpiar el array global
    const numStars = 100; 
    for(let i=0; i<numStars; i++){
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() * 1 + 0.5,      // estrellas más pequeñas (0.5–1.5 px)
        speed: Math.random() * 50 + 20,     // velocidad distinta (px/s)
        alpha: Math.random() * 0.3 + 0.2    // menos brillo (0.2–0.5)
      });
    }
  }

  function drawStars(dt){
    ctx.fillStyle="#000";
    ctx.fillRect(0,0,W,H);

    for(let s of stars){
      ctx.globalAlpha = s.alpha;
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI*2);
      ctx.fill();

      // mover la estrella
      s.x -= s.speed * dt;
      if(s.x < 0){
        s.x = W + 2;
        s.y = Math.random() * H;
        s.size = Math.random() * 1 + 0.5;
        s.speed = Math.random() * 50 + 20;
        s.alpha = Math.random() * 0.3 + 0.2;
      }
    }
    ctx.globalAlpha = 1;
  }

  // Naves
  function drawShip(){ctx.drawImage(sprites.player,ship.x-ship.w/2,ship.y-ship.h/2,ship.w,ship.h);}
  function spawnEnemy(){
    if(enemies.length>=maxEnemies) return;
    const img = Math.random()>0.5 ? sprites.enemy1 : sprites.enemy2;
    const vx = -rand(enemyMinSpeed, enemyMaxSpeed);
    const vy = rand(-80, 80); // velocidad vertical aleatoria
    enemies.push({
      x: W+30,
      y: rand(20, H-20),
      w: 32,
      h: 32,
      vx,
      vy,
      img
    });
  }

  function drawEnemies(){for(let e of enemies)ctx.drawImage(e.img,e.x-e.w/2,e.y-e.h/2,e.w,e.h);}

  // Balas
  function shoot(){bullets.push({x:ship.x+16,y:ship.y,vx:220});}
  function drawBullets(){
    for(let b of bullets)ctx.drawImage(sprites.laser, b.x-6, b.y-4, 12, 8);
  }

  // Explosiones
  function pushExplosion(x,y){explosions.push({x,y,life:1});}
  function drawExplosions(dt){
    for(let i=explosions.length-1;i>=0;i--){
      const ex=explosions[i];ex.life-=dt*2;
      if(ex.life<=0){explosions.splice(i,1);continue;}
      const size=32+(1-ex.life)*32;
      ctx.globalAlpha=ex.life;
      ctx.drawImage(sprites.explosion,ex.x-size/2,ex.y-size/2,size,size);
      ctx.globalAlpha=1;
    }
  }

  // HUD
  function updateScore(){const s=document.getElementById("Puntaje");if(s)s.textContent=score;}

  // Loop
  let lastShot=0,spawnAcc=0;
  function update(dt){
    bullets.forEach((b,i)=>{b.x+=b.vx*dt;if(b.x>W+20)bullets.splice(i,1);});
    for(let i=enemies.length-1;i>=0;i--){
      const e = enemies[i];
      e.x += e.vx * dt;
      e.y += e.vy * dt;

      if(e.y < 20 || e.y > H-20){
        e.vy *= -1;
      }
      if(e.x < -30) enemies.splice(i,1);
    }

    // colisión bala-enemigo
    for(let i=enemies.length-1;i>=0;i--){
      for(let j=bullets.length-1;j>=0;j--){
        const e=enemies[i],b=bullets[j];
        if(Math.abs(e.x-b.x)<16&&Math.abs(e.y-b.y)<16){
          pushExplosion(e.x,e.y);
          enemies.splice(i,1);bullets.splice(j,1);
          score++;updateScore();break;
        }
      }
    }

    // colisión nave-enemigo
    for(let e of enemies){
      if(Math.abs(e.x-ship.x)<20&&Math.abs(e.y-ship.y)<20){
        pushExplosion(ship.x,ship.y);running=false;showGameOver();return;
      }
    }

    spawnAcc+=dt;
    if(spawnAcc>0.15){if(Math.random()<dt*enemySpawnRate)spawnEnemy();spawnAcc=0;}

    lastShot+=dt;
    if(lastShot>=1/autoShootRate){lastShot=0;shoot();}
  }

  function render(dt){
    drawStars(dt);
    drawBullets();drawEnemies();drawShip();drawExplosions(dt);
    ctx.fillStyle="cyan";ctx.font="bold 14px monospace";ctx.fillText("PUNTAJE "+score,8,20);
  }

  function loop(ts){rafId=requestAnimationFrame(loop);
    if(!lastTs)lastTs=ts;let dt=(ts-lastTs)/1000;lastTs=ts;
    if(!running){render(dt);return;}
    update(dt);render(dt);}

  // UI
  function showGameOver(){document.getElementById("gameOver").style.display="block";}
  function hideGameOver(){document.getElementById("gameOver").style.display="none";}

  // API pública
  window.Game={
    start(){if(running)return;running=true;lastTs=0;hideGameOver();if(!rafId)rafId=requestAnimationFrame(loop);},
    stop(){running=false;},
    togglePause(){running=!running;if(running&&!rafId)rafId=requestAnimationFrame(loop);},
    restart(){resetGame();running=true;lastTs=0;hideGameOver();if(!rafId)rafId=requestAnimationFrame(loop);},
    handleWheel(d){ship.y+=d*10;ship.y=clamp(ship.y,ship.h/2,H-ship.h/2);},
    startCountdown(){
      const el=document.getElementById("gameCountdown");
      resetGame();hideGameOver();
      el.style.display="block";
      let c=3;el.textContent=c;
      const t=setInterval(()=>{
        c--;if(c>=1)el.textContent=c;
        if(c<0){clearInterval(t);el.style.display="none";window.Game.start();}
      },1000);
    }
  };

  document.getElementById("gameRestart").onclick=()=>window.Game.restart();
  document.getElementById("gamePause").onclick=()=>window.Game.togglePause();

  resetGame();if(!rafId)rafId=requestAnimationFrame(loop);
})();