/*==================================================
                DOM ELEMENTS
==================================================*/

const container = document.getElementById("cardsContainer");

const countSlider = document.getElementById("countSlider");

const countDisplay = document.getElementById("countDisplay");

const newGameBtn = document.getElementById("newGameBtn");

const checkBtn = document.getElementById("checkBtn");

const resultDiv = document.getElementById("result");

const scoreDiv = document.getElementById("score");


/*==================================================
                GAME DATA
==================================================*/

const ALL_SURAS = [

'الفاتحة',

'البقرة',

'آل عمران',

'النساء',

'المائدة',

'الأنعام',

'الأعراف',

'الأنفال',

'التوبة',

'يونس',

'هود',

'يوسف',

'الرعد',

'إبراهيم',

'الحجر',

'النحل',

'الإسراء',

'الكهف',

'مريم',

'طه',

'الأنبياء',

'الحج',

'المؤمنون',

'النور',

'الفرقان',

'الشعراء',

'النمل',

'القصص',

'العنكبوت',

'الروم',

'لقمان',

'السجدة',

'الأحزاب',

'سبأ',

'فاطر',

'يس',

'الصافات',

'ص',

'الزمر',

'غافر',

'فصلت',

'الشورى',

'الزخرف',

'الدخان',

'الجاثية',

'الأحقاف',

'محمد',

'الفتح',

'الحجرات',

'ق',

'الذاريات',

'الطور',

'النجم',

'القمر',

'الرحمن',

'الواقعة',

'الحديد',

'المجادلة',

'الحشر',

'الممتحنة',

'الصف',

'الجمعة',

'المنافقون',

'التغابن',

'الطلاق',

'التحريم',

'الملك',

'القلم',

'الحاقة',

'المعارج',

'نوح',

'الجن',

'المزمل',

'المدثر',

'القيامة',

'الإنسان',

'المرسلات',

'النبأ',

'النازعات',

'عبس',

'التكوير',

'الانفطار',

'المطففين',

'الانشقاق',

'البروج',

'الطارق',

'الأعلى',

'الغاشية',

'الفجر',

'البلد',

'الشمس',

'الليل',

'الضحى',

'الشرح',

'التين',

'العلق',

'القدر',

'البينة',

'الزلزلة',

'العاديات',

'القارعة',

'التكاثر',

'العصر',

'الهمزة',

'الفيل',

'قريش',

'الماعون',

'الكوثر',

'الكافرون',

'النصر',

'المسد',

'الإخلاص',

'الفلق',

'الناس'

];


/*==================================================
                GAME STATE
==================================================*/

const game = {

    count:8,

    selectedIndices:[],

    shuffledOrder:[],

    checked:false,

    dragData:null,

    placeholder:null

};


/*==================================================
                SHUFFLE
==================================================*/

function shuffle(array){

    for(let i=array.length-1;i>0;i--){

        const j=Math.floor(Math.random()*(i+1));

        [array[i],array[j]]=[array[j],array[i]];

    }

    return array;

}


/*==================================================
                START GAME
==================================================*/

function startNewGame(){

    game.count=parseInt(countSlider.value);

    game.checked=false;

    const indices=[...Array(114).keys()];

    shuffle(indices);

    game.selectedIndices=

        indices

        .slice(0,game.count)

        .sort((a,b)=>a-b);

    game.shuffledOrder=

        shuffle([...game.selectedIndices]);

    renderCards();

    resultDiv.innerHTML="";

    scoreDiv.innerHTML="";

    checkBtn.innerHTML="تحقق من الترتيب";

    checkBtn.disabled=false;

}


/*==================================================
                INIT
==================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    countDisplay.innerHTML=countSlider.value;

    startNewGame();

});
/*==================================================
                RENDER CARDS
==================================================*/

function renderCards(){

    container.innerHTML = "";

    game.shuffledOrder.forEach(index => {

        const card = document.createElement("div");

        card.className = "card";

        card.draggable = true;

        card.dataset.surahIndex = index;

        card.textContent = ALL_SURAS[index];

        container.appendChild(card);

    });

}

/*==================================================
                CHECK ANSWER
==================================================*/

function checkAnswer(){

    if(game.checked){

        startNewGame();

        return;

    }

    const cards = Array.from(

        container.querySelectorAll(".card")

    );

    let correct = 0;

    cards.forEach((card,i)=>{

        const currentIndex =

            parseInt(card.dataset.surahIndex);

        const isCorrect =

            currentIndex === game.selectedIndices[i];

        card.classList.remove(

            "correct",

            "wrong"

        );

        card.classList.add(

            isCorrect ? "correct" : "wrong"

        );

        card.draggable = false;

        if(isCorrect){

            correct++;

        }

    });

    const total = game.selectedIndices.length;

    game.checked = true;

    checkBtn.textContent = "لعبة جديدة";

    if(correct === total){

        resultDiv.className = "game-result success";

        resultDiv.innerHTML =

            "🎉 أحسنت! جميع السور مرتبة بشكل صحيح.";

    }

    else{

        resultDiv.className = "game-result warning";

        resultDiv.innerHTML =

            `أجبت بشكل صحيح على ${correct} من ${total}`;

    }

    let order =

        game.selectedIndices

        .map(index=>ALL_SURAS[index])

        .join(" ← ");

    scoreDiv.innerHTML =

        `<strong>الترتيب الصحيح:</strong><br>${order}`;

}

/*==================================================
                SLIDER
==================================================*/

countSlider.addEventListener("input",()=>{

    countDisplay.textContent = countSlider.value;

});

/*==================================================
                BUTTONS
==================================================*/

newGameBtn.addEventListener(

    "click",

    startNewGame

);

checkBtn.addEventListener(

    "click",

    checkAnswer

);

/*==================================================
            DESKTOP DRAG & DROP
==================================================*/

container.addEventListener("dragstart",(e)=>{

    if(game.checked) return;

    const card=e.target.closest(".card");

    if(!card) return;

    game.dragData={

        element:card

    };

    card.classList.add("dragging");

    e.dataTransfer.effectAllowed="move";

    e.dataTransfer.setData("text/plain","");

});


container.addEventListener("dragover",(e)=>{

    e.preventDefault();

    if(game.checked || !game.dragData) return;

    const target=e.target.closest(".card");

    if(!target) return;

    if(target===game.dragData.element) return;

    const rect=target.getBoundingClientRect();

    const middle=rect.top+(rect.height/2);

    document.querySelectorAll(".card").forEach(card=>{

        card.classList.remove(

            "drop-top",

            "drop-bottom"

        );

    });

    if(e.clientY<middle){

        target.classList.add("drop-top");

    }

    else{

        target.classList.add("drop-bottom");

    }

});


container.addEventListener("dragleave",(e)=>{

    const card=e.target.closest(".card");

    if(card){

        card.classList.remove(

            "drop-top",

            "drop-bottom"

        );

    }

});


container.addEventListener("drop",(e)=>{

    e.preventDefault();

    if(game.checked || !game.dragData) return;

    const target=e.target.closest(".card");

    if(!target) return;

    if(target===game.dragData.element) return;

    const rect=target.getBoundingClientRect();

    const middle=rect.top+(rect.height/2);

    if(e.clientY<middle){

        container.insertBefore(

            game.dragData.element,

            target

        );

    }

    else{

        container.insertBefore(

            game.dragData.element,

            target.nextSibling

        );

    }

    document.querySelectorAll(".card").forEach(card=>{

        card.classList.remove(

            "drop-top",

            "drop-bottom"

        );

    });

});


container.addEventListener("dragend",()=>{

    if(game.dragData){

        game.dragData.element.classList.remove(

            "dragging"

        );

    }

    document.querySelectorAll(".card").forEach(card=>{

        card.classList.remove(

            "drop-top",

            "drop-bottom"

        );

    });

    game.dragData=null;

});
/*==================================================
            TOUCH DRAG & DROP
==================================================*/

container.addEventListener("touchstart",(e)=>{

    if(game.checked) return;

    const card=e.target.closest(".card");

    if(!card) return;

    if(game.dragData) cleanupTouchDrag();

    const touch=e.touches[0];

    const rect=card.getBoundingClientRect();

    game.placeholder=document.createElement("div");

    game.placeholder.className="card-placeholder";

    game.placeholder.style.height=rect.height+"px";

    container.insertBefore(

        game.placeholder,

        card.nextSibling

    );

    container.removeChild(card);

    card.style.position="fixed";

    card.style.left=rect.left+"px";

    card.style.top=rect.top+"px";

    card.style.width=rect.width+"px";

    card.style.height=rect.height+"px";

    card.style.margin="0";

    card.style.zIndex="1000";

    card.style.pointerEvents="none";

    card.style.transform="scale(1.05)";

    document.body.appendChild(card);

    game.dragData={

        element:card,

        offsetX:touch.clientX-rect.left,

        offsetY:touch.clientY-rect.top

    };

},{passive:true});


container.addEventListener("touchmove",(e)=>{

    if(game.checked) return;

    if(!game.dragData) return;

    e.preventDefault();

    const touch=e.touches[0];

    const card=game.dragData.element;

    card.style.left=(

        touch.clientX-

        game.dragData.offsetX

    )+"px";

    card.style.top=(

        touch.clientY-

        game.dragData.offsetY

    )+"px";

    const cards=

        [...container.querySelectorAll(".card")];

    let before=null;

    for(const current of cards){

        const rect=current.getBoundingClientRect();

        if(touch.clientY<rect.top+rect.height/2){

            before=current;

            break;

        }

    }

    if(before){

        container.insertBefore(

            game.placeholder,

            before

        );

    }

    else{

        container.appendChild(

            game.placeholder

        );

    }

},{passive:false});


container.addEventListener("touchend",()=>{

    if(!game.dragData) return;

    finishTouchDrag();

});


container.addEventListener("touchcancel",()=>{

    if(!game.dragData) return;

    finishTouchDrag();

});


/*==================================================
            FINISH TOUCH
==================================================*/

function finishTouchDrag(){

    const card=game.dragData.element;

    container.insertBefore(

        card,

        game.placeholder

    );

    game.placeholder.remove();

    card.style.position="";

    card.style.left="";

    card.style.top="";

    card.style.width="";

    card.style.height="";

    card.style.margin="";

    card.style.zIndex="";

    card.style.pointerEvents="";

    card.style.transform="";

    card.classList.remove("dragging");

    game.dragData=null;

    game.placeholder=null;

}


/*==================================================
            CLEANUP
==================================================*/

function cleanupTouchDrag(){

    if(game.dragData){

        finishTouchDrag();

    }

}


/*==================================================
            EVENTS
==================================================*/

countSlider.addEventListener("input",()=>{

    countDisplay.textContent=countSlider.value;

});

countSlider.addEventListener("change",startNewGame);

newGameBtn.addEventListener("click",startNewGame);

checkBtn.addEventListener("click",checkAnswer);


/*==================================================
            START
==================================================*/

startNewGame();