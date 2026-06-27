const ALL_SURAHS=[
  'الفاتحة','البقرة','آل عمران','النساء','المائدة','الأنعام','الأعراف','الأنفال','التوبة','يونس',
  'هود','يوسف','الرعد','إبراهيم','الحجر','النحل','الإسراء','الكهف','مريم','طه',
  'الأنبياء','الحج','المؤمنون','النور','الفرقان','الشعراء','النمل','القصص','العنكبوت','الروم',
  'لقمان','السجدة','الأحزاب','سبأ','فاطر','يس','الصافات','ص','الزمر','غافر',
  'فصلت','الشورى','الزخرف','الدخان','الجاثية','الأحقاف','محمد','الفتح','الحجرات','ق',
  'الذاريات','الطور','النجم','القمر','الرحمن','الواقعة','الحديد','المجادلة','الحشر','الممتحنة',
  'الصف','الجمعة','المنافقون','التغابن','الطلاق','التحريم','الملك','القلم','الحاقة','المعارج',
  'نوح','الجن','المزمل','المدثر','القيامة','الإنسان','المرسلات','النبأ','النازعات','عبس',
  'التكوير','الإنفطار','المطففين','الإنشقاق','البروج','الطارق','الغاشية','الفجر','البلد','الليل',
  'الشرح','العلق','البينة','العاديات','التكاثر','الفيل','الكوثر','المسد','الناس'
];

let cards=[],flipped=[],matched=0,attempts=0,timer=0,interval=null,locked=false;

function shuffle(a){for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

function pickRandom(n){
  let pool=[...ALL_SURAHS];
  shuffle(pool);
  return pool.slice(0,n);
}

function initGame(){
  clearInterval(interval);interval=null;timer=0;flipped=[];matched=0;attempts=0;locked=false;
  document.getElementById('timer').textContent='00:00';
  document.getElementById('attempts').textContent='0';
  document.getElementById('remaining').textContent='8';
  document.getElementById('msg').textContent='';
  let chosen=pickRandom(8);
  cards=[];
  chosen.forEach((s,i)=>{cards.push({id:i*2,name:s,matched:false});cards.push({id:i*2+1,name:s,matched:false})});
  shuffle(cards);
  let grid=document.getElementById('grid');
  grid.innerHTML='';
  cards.forEach((c,idx)=>{
    let div=document.createElement('div');
    div.className='card';
    div.dataset.idx=idx;
    div.innerHTML='<div class="card-inner"><div class="card-face card-back">?</div><div class="card-face card-front">'+c.name+'</div></div>';
    div.addEventListener('click',()=>flipCard(idx));
    grid.appendChild(div);
  });
}

function flipCard(idx){
  if(locked||flipped.length>=2||cards[idx].matched) return;
  let el=document.querySelectorAll('.card')[idx];
  if(el.classList.contains('flipped')) return;
  el.classList.add('flipped');
  flipped.push(idx);
  if(!interval){timer=0;interval=setInterval(updateTimer,1000)}
  if(flipped.length===2) setTimeout(checkMatch,600);
}

function checkMatch(){
  attempts++;
  document.getElementById('attempts').textContent=attempts;
  let [a,b]=flipped;
  let match=cards[a].name===cards[b].name;
  if(match){
    cards[a].matched=cards[b].matched=true;
    matched++;
    document.getElementById('remaining').textContent=8-matched;
    document.querySelectorAll('.card')[a].classList.add('matched');
    document.querySelectorAll('.card')[b].classList.add('matched');
    if(matched===8){
      clearInterval(interval);
      document.getElementById('msg').textContent='🎉 أكملت اللعبة في '+document.getElementById('timer').textContent+' و '+attempts+' محاولة!';
    }
  }else{
    setTimeout(()=>{
      document.querySelectorAll('.card')[a].classList.remove('flipped');
      document.querySelectorAll('.card')[b].classList.remove('flipped');
    },400);
  }
  flipped=[];
}

function updateTimer(){
  timer++;
  let m=String(Math.floor(timer/60)).padStart(2,'0');
  let s=String(timer%60).padStart(2,'0');
  document.getElementById('timer').textContent=m+':'+s;
}

initGame()