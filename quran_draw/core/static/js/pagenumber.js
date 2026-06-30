const SURAHS=[
  [1,'الفاتحة'],[2,'البقرة'],[50,'آل عمران'],[77,'النساء'],[106,'المائدة'],
  [128,'الأنعام'],[151,'الأعراف'],[177,'الأنفال'],[187,'التوبة'],[208,'يونس'],
  [221,'هود'],[235,'يوسف'],[249,'الرعد'],[255,'إبراهيم'],[262,'الحجر'],
  [267,'النحل'],[282,'الإسراء'],[293,'الكهف'],[305,'مريم'],[312,'طه'],
  [322,'الأنبياء'],[332,'الحج'],[342,'المؤمنون'],[350,'النور'],[359,'الفرقان'],
  [367,'الشعراء'],[377,'النمل'],[385,'القصص'],[396,'العنكبوت'],[404,'الروم'],
  [411,'لقمان'],[415,'السجدة'],[418,'الأحزاب'],[428,'سبأ'],[434,'فاطر'],
  [440,'يس'],[446,'الصافات'],[453,'ص'],[458,'الزمر'],[467,'غافر'],
  [476,'فصلت'],[483,'الشورى'],[489,'الزخرف'],[496,'الدخان'],[499,'الجاثية'],
  [502,'الأحقاف'],[507,'محمد'],[511,'الفتح'],[515,'الحجرات'],[518,'ق'],
  [520,'الذاريات'],[523,'الطور'],[526,'النجم'],[528,'القمر'],[531,'الرحمن'],
  [534,'الواقعة'],[537,'الحديد'],[541,'المجادلة'],[545,'الحشر'],[548,'الممتحنة'],
  [551,'الصف'],[553,'الجمعة'],[554,'المنافقون'],[556,'التغابن'],[558,'الطلاق'],
  [560,'التحريم'],[562,'الملك'],[564,'القلم'],[566,'الحاقة'],[568,'المعارج'],
  [570,'نوح'],[572,'الجن'],[574,'المزمل'],[575,'المدثر'],[577,'القيامة'],
  [578,'الإنسان'],[580,'المرسلات'],[582,'النبأ'],[583,'النازعات'],[585,'عبس'],
  [586,'التكوير'],[587,'الإنفطار'],[588,'المطففين'],[589,'الإنشقاق'],[590,'البروج'],
  [591,'الطارق'],[592,'الغاشية'],[593,'الفجر'],[594,'البلد'],[595,'الليل'],
  [596,'الشرح'],[597,'العلق'],[598,'البينة'],[599,'العاديات'],[600,'التكاثر'],
  [601,'الفيل'],[602,'الكوثر'],[603,'المسد'],[604,'الناس']
];

const JUZ_STARTS=[1,22,42,62,82,102,122,142,162,182,202,222,242,262,282,302,322,342,362,382,402,422,442,462,482,502,522,542,562,582];
let currentPage=1;

function norm(s){
  return s.trim().replace(/[إأآ]/g,'ا').replace(/[ى]/g,'ي').replace(/ة/g,'ه').replace(/\s+/g,'').replace(/^ال/,'');
}

function getJuz(page){
  for(let i=JUZ_STARTS.length-1;i>=0;i--)
    if(page>=JUZ_STARTS[i]) return i+1;
  return 1;
}

function getSurahsForPage(page){
  let names=[];
  for(let i=0;i<SURAHS.length;i++){
    if(SURAHS[i][0]===page) names.push(SURAHS[i][1]);
    if(SURAHS[i][0]>page) break;
  }
  if(names.length===0){
    for(let i=SURAHS.length-1;i>=0;i--){
      if(SURAHS[i][0]<=page){names.push(SURAHS[i][1]);break;}
    }
  }
  return names;
}

function gen(){
  let el=document.getElementById('num');
  el.classList.remove('pop');
  void el.offsetWidth;
  currentPage=Math.floor(Math.random()*604)+1;
  el.textContent=currentPage;
  el.classList.add('pop');
  document.getElementById('juzInput').value='';
  document.getElementById('surahInput').value='';
  document.getElementById('juzInput').focus();
  document.getElementById('result').textContent='';
  document.getElementById('result').className='result';
}

function check(){
  let juzInput=document.getElementById('juzInput');
  let surahInput=document.getElementById('surahInput');
  let result=document.getElementById('result');
  let userJuz=Number(juzInput.value);
  let userSurah=surahInput.value.trim();
  if(!Number.isInteger(userJuz)||userJuz<1||userJuz>30){
    result.textContent='⚠️ الرجاء إدخال رقم صحيح للجزء (1-30)';
    result.className='result wrong';
    juzInput.focus();
    return;
  }
  if(!userSurah){
    result.textContent='⚠️ الرجاء إدخال اسم السورة';
    result.className='result wrong';
    surahInput.focus();
    return;
  }
  let correctJuz=getJuz(currentPage);
  let correctSurahs=getSurahsForPage(currentPage);
  let userNorm=norm(userSurah);
  let surahOk=correctSurahs.some(s=>norm(s)===userNorm);
  let juzOk=userJuz===correctJuz;
  if(juzOk&&surahOk){
    result.textContent='✅ إجابة صحيحة! الجزء '+correctJuz+' - سورة '+correctSurahs.join('، ');
    result.className='result correct';
  }else{
    let msg='❌ ';
    if(!juzOk) msg+='الجزء الصحيح: '+correctJuz+'. ';
    if(!surahOk) msg+='السورة الصحيحة: '+correctSurahs.join(' أو ')+'. ';
    result.textContent=msg;
    result.className='result wrong';
  }
}

function next(){gen()}

(function initDatalist(){
  let seen={},dl=document.getElementById('surahList');
  SURAHS.forEach(s=>{if(!seen[s[1]]){seen[s[1]]=1;let o=document.createElement('option');o.value=s[1];dl.appendChild(o)}});
})();

document.getElementById('juzInput').addEventListener('keydown',function(e){if(e.key==='Enter')document.getElementById('surahInput').focus()});
document.getElementById('surahInput').addEventListener('keydown',function(e){if(e.key==='Enter')check()});

gen()