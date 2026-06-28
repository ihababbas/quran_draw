const container = document.getElementById("cardsContainer"),
      countSlider = document.getElementById("countSlider"),
      countDisplay = document.getElementById("countDisplay"),
      newGameBtn = document.getElementById("newGameBtn"),
      checkBtn = document.getElementById("checkBtn"),
      resultDiv = document.getElementById("result"),
      scoreDiv = document.getElementById("score");

const ALL_SURAS = ['الفاتحة','البقرة','آل عمران','النساء','المائدة','الأنعام','الأعراف','الأنفال','التوبة','يونس','هود','يوسف','الرعد','إبراهيم','الحجر','النحل','الإسراء','الكهف','مريم','طه','الأنبياء','الحج','المؤمنون','النور','الفرقان','الشعراء','النمل','القصص','العنكبوت','الروم','لقمان','السجدة','الأحزاب','سبأ','فاطر','يس','الصافات','ص','الزمر','غافر','فصلت','الشورى','الزخرف','الدخان','الجاثية','الأحقاف','محمد','الفتح','الحجرات','ق','الذاريات','الطور','النجم','القمر','الرحمن','الواقعة','الحديد','المجادلة','الحشر','الممتحنة','الصف','الجمعة','المنافقون','التغابن','الطلاق','التحريم','الملك','القلم','الحاقة','المعارج','نوح','الجن','المزمل','المدثر','القيامة','الإنسان','المرسلات','النبأ','النازعات','عبس','التكوير','الانفطار','المطففين','الانشقاق','البروج','الطارق','الأعلى','الغاشية','الفجر','البلد','الشمس','الليل','الضحى','الشرح','التين','العلق','القدر','البينة','الزلزلة','العاديات','القارعة','التكاثر','العصر','الهمزة','الفيل','قريش','الماعون','الكوثر','الكافرون','النصر','المسد','الإخلاص','الفلق','الناس'];

const game = { count:8, selectedIndices:[], shuffledOrder:[], checked:false, dragData:null, placeholder:null };

function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]] } return a }

function startNewGame(){
  game.count=+countSlider.value; game.checked=false;
  const i=[...Array(114).keys()]; shuffle(i);
  game.selectedIndices=i.slice(0,game.count).sort((a,b)=>a-b);
  game.shuffledOrder=shuffle([...game.selectedIndices]);
  renderCards();
  resultDiv.innerHTML=scoreDiv.innerHTML="";
  checkBtn.innerHTML="تحقق من الترتيب"; checkBtn.disabled=false;
}

function renderCards(){
  container.innerHTML="";
  game.shuffledOrder.forEach(i=>{
    const c=document.createElement("div");
    c.className="card"; c.draggable=true;
    c.dataset.surahIndex=i; c.textContent=ALL_SURAS[i];
    container.appendChild(c);
  });
}

function checkAnswer(){
  if(game.checked){ startNewGame(); return }
  const cards=Array.from(container.querySelectorAll(".card"));
  let correct=0;
  cards.forEach((c,i)=>{
    const idx=+c.dataset.surahIndex, ok=idx===game.selectedIndices[i];
    c.classList.remove("correct","wrong");
    c.classList.add(ok?"correct":"wrong");
    c.draggable=false; ok&&correct++;
  });
  const total=game.selectedIndices.length; game.checked=true;
  checkBtn.textContent="لعبة جديدة";
  resultDiv.className=correct===total?"game-result success":"game-result warning";
  resultDiv.innerHTML=correct===total?"🎉 أحسنت! جميع السور مرتبة بشكل صحيح.":`أجبت بشكل صحيح على ${correct} من ${total}`;
  scoreDiv.innerHTML=`<strong>الترتيب الصحيح:</strong><br>${game.selectedIndices.map(i=>ALL_SURAS[i]).join(" ← ")}`;
}

countSlider.addEventListener("input",()=>{ countDisplay.textContent=countSlider.value });
countSlider.addEventListener("change",startNewGame);
newGameBtn.addEventListener("click",startNewGame);
checkBtn.addEventListener("click",checkAnswer);

container.addEventListener("dragstart",e=>{
  if(game.checked) return;
  const c=e.target.closest(".card"); if(!c) return;
  game.dragData={element:c}; c.classList.add("dragging");
  e.dataTransfer.effectAllowed="move"; e.dataTransfer.setData("text/plain","");
});

container.addEventListener("dragover",e=>{
  e.preventDefault();
  if(game.checked||!game.dragData) return;
  const t=e.target.closest(".card");
  if(!t||t===game.dragData.element) return;
  const r=t.getBoundingClientRect(),m=r.top+r.height/2;
  document.querySelectorAll(".card").forEach(c=>c.classList.remove("drop-top","drop-bottom"));
  t.classList.add(e.clientY<m?"drop-top":"drop-bottom");
});

container.addEventListener("dragleave",e=>{
  const c=e.target.closest(".card");
  c&&c.classList.remove("drop-top","drop-bottom");
});

container.addEventListener("drop",e=>{
  e.preventDefault();
  if(game.checked||!game.dragData) return;
  const t=e.target.closest(".card");
  if(!t||t===game.dragData.element) return;
  const r=t.getBoundingClientRect(),m=r.top+r.height/2;
  e.clientY<m?container.insertBefore(game.dragData.element,t):container.insertBefore(game.dragData.element,t.nextSibling);
  document.querySelectorAll(".card").forEach(c=>c.classList.remove("drop-top","drop-bottom"));
});

container.addEventListener("dragend",()=>{
  game.dragData&&game.dragData.element.classList.remove("dragging");
  document.querySelectorAll(".card").forEach(c=>c.classList.remove("drop-top","drop-bottom"));
  game.dragData=null;
});

container.addEventListener("touchstart",e=>{
  if(game.checked) return;
  const c=e.target.closest(".card"); if(!c) return;
  game.dragData&&finishTouchDrag();
  const t=e.touches[0],r=c.getBoundingClientRect();
  game.placeholder=document.createElement("div");
  game.placeholder.className="card-placeholder";
  game.placeholder.style.height=r.height+"px";
  container.insertBefore(game.placeholder,c.nextSibling);
  container.removeChild(c);
  Object.assign(c.style,{position:"fixed",left:r.left+"px",top:r.top+"px",width:r.width+"px",height:r.height+"px",margin:"0",zIndex:"1000",pointerEvents:"none",transform:"scale(1.05)"});
  document.body.appendChild(c);
  game.dragData={element:c,offsetX:t.clientX-r.left,offsetY:t.clientY-r.top};
},{passive:true});

container.addEventListener("touchmove",e=>{
  if(game.checked||!game.dragData) return;
  e.preventDefault();
  const t=e.touches[0],c=game.dragData.element;
  c.style.left=t.clientX-game.dragData.offsetX+"px";
  c.style.top=t.clientY-game.dragData.offsetY+"px";
  const cards=[...container.querySelectorAll(".card")];
  let before=null;
  for(const c of cards){ const r=c.getBoundingClientRect(); if(t.clientY<r.top+r.height/2){ before=c; break } }
  before?container.insertBefore(game.placeholder,before):container.appendChild(game.placeholder);
},{passive:false});

["touchend","touchcancel"].forEach(ev=>{ container.addEventListener(ev,()=>{ game.dragData&&finishTouchDrag() }) });

function finishTouchDrag(){
  const c=game.dragData.element;
  container.insertBefore(c,game.placeholder);
  game.placeholder.remove();
  c.style.position=c.style.left=c.style.top=c.style.width=c.style.height=c.style.margin=c.style.zIndex=c.style.pointerEvents=c.style.transform="";
  c.classList.remove("dragging");
  game.dragData=game.placeholder=null;
}

startNewGame();
