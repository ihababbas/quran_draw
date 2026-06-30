/*==================================================
            SURAH AYAHS GAME
==================================================*/

class SurahAyahsGame {

    constructor() {

        /*==========================================
                    DATA
        ==========================================*/

        this.surahs = [

            [7,"الفاتحة"],
            [286,"البقرة"],
            [200,"آل عمران"],
            [176,"النساء"],
            [120,"المائدة"],
            [165,"الأنعام"],
            [206,"الأعراف"],
            [75,"الأنفال"],
            [129,"التوبة"],
            [109,"يونس"],
            [123,"هود"],
            [111,"يوسف"],
            [43,"الرعد"],
            [52,"إبراهيم"],
            [99,"الحجر"],
            [128,"النحل"],
            [111,"الإسراء"],
            [110,"الكهف"],
            [98,"مريم"],
            [135,"طه"],
            [112,"الأنبياء"],
            [78,"الحج"],
            [118,"المؤمنون"],
            [64,"النور"],
            [77,"الفرقان"],
            [227,"الشعراء"],
            [93,"النمل"],
            [88,"القصص"],
            [69,"العنكبوت"],
            [60,"الروم"],
            [34,"لقمان"],
            [30,"السجدة"],
            [73,"الأحزاب"],
            [54,"سبأ"],
            [45,"فاطر"],
            [83,"يس"],
            [182,"الصافات"],
            [88,"ص"],
            [75,"الزمر"],
            [85,"غافر"],
            [54,"فصلت"],
            [53,"الشورى"],
            [89,"الزخرف"],
            [59,"الدخان"],
            [37,"الجاثية"],
            [35,"الأحقاف"],
            [38,"محمد"],
            [29,"الفتح"],
            [18,"الحجرات"],
            [45,"ق"],
            [60,"الذاريات"],
            [49,"الطور"],
            [62,"النجم"],
            [55,"القمر"],
            [78,"الرحمن"],
            [96,"الواقعة"],
            [29,"الحديد"],
            [22,"المجادلة"],
            [24,"الحشر"],
            [13,"الممتحنة"],
            [14,"الصف"],
            [11,"الجمعة"],
            [11,"المنافقون"],
            [18,"التغابن"],
            [12,"الطلاق"],
            [12,"التحريم"],
            [30,"الملك"],
            [52,"القلم"],
            [52,"الحاقة"],
            [44,"المعارج"],
            [28,"نوح"],
            [28,"الجن"],
            [20,"المزمل"],
            [56,"المدثر"],
            [40,"القيامة"],
            [31,"الإنسان"],
            [50,"المرسلات"],
            [40,"النبأ"],
            [46,"النازعات"],
            [42,"عبس"],
            [29,"التكوير"],
            [19,"الانفطار"],
            [36,"المطففين"],
            [25,"الانشقاق"],
            [22,"البروج"],
            [17,"الطارق"],
            [19,"الأعلى"],
            [26,"الغاشية"],
            [30,"الفجر"],
            [20,"البلد"],
            [15,"الشمس"],
            [21,"الليل"],
            [11,"الضحى"],
            [8,"الشرح"],
            [8,"التين"],
            [19,"العلق"],
            [5,"القدر"],
            [8,"البينة"],
            [8,"الزلزلة"],
            [11,"العاديات"],
            [11,"القارعة"],
            [8,"التكاثر"],
            [3,"العصر"],
            [9,"الهمزة"],
            [5,"الفيل"],
            [4,"قريش"],
            [7,"الماعون"],
            [3,"الكوثر"],
            [6,"الكافرون"],
            [3,"النصر"],
            [5,"المسد"],
            [4,"الإخلاص"],
            [5,"الفلق"],
            [6,"الناس"]

        ];

        /*==========================================
                GAME VARIABLES
        ==========================================*/

        this.totalQuestions = 10;

        this.currentQuestion = 0;

        this.score = 0;

        this.questions = [];

        this.answered = false;

        /*==========================================
                DOM ELEMENTS
        ==========================================*/

        this.questionCounter = document.getElementById("questionCounter");

        this.progressFill = document.getElementById("progressFill");

        this.surahName = document.getElementById("surahName");

        this.optionsContainer = document.getElementById("optionsContainer");

        this.feedback = document.getElementById("feedback");

        this.nextBtn = document.getElementById("nextBtn");

        this.result = document.getElementById("result");

        this.finalScore = document.getElementById("finalScore");

        this.scoreDetail = document.getElementById("scoreDetail");

        this.restartBtn = document.getElementById("restartBtn");

        /*==========================================
                EVENTS
        ==========================================*/

        this.nextBtn.addEventListener("click", () => {

            this.currentQuestion++;

            this.showQuestion();

        });

        this.restartBtn.addEventListener("click", () => {

            this.startGame();

        });

        /*==========================================
                START
        ==========================================*/

        this.startGame();

    }

    /*==================================================
                    SHUFFLE ARRAY
    ==================================================*/

    shuffle(array){

        for(let i=array.length-1;i>0;i--){

            const j=Math.floor(Math.random()*(i+1));

            [array[i],array[j]]=[array[j],array[i]];

        }

        return array;

    }

    /*==================================================
                GENERATE OPTIONS
    ==================================================*/

    pickOptions(correctAnswer){

        let range;

        if(correctAnswer<=15){

            range=4;

        }else if(correctAnswer<=50){

            range=10;

        }else if(correctAnswer<=100){

            range=20;

        }else{

            range=35;

        }

        const nearby=this.surahs

            .map(item=>item[0])

            .filter(num=>num!==correctAnswer && Math.abs(num-correctAnswer)<=range);

        this.shuffle(nearby);

        const options=new Set();

        options.add(correctAnswer);

        for(const value of nearby){

            if(options.size>=4) break;

            options.add(value);

        }

        let offset=1;

        while(options.size<4){

            const plus=correctAnswer+offset;

            const minus=correctAnswer-offset;

            if(plus>0) options.add(plus);

            if(options.size>=4) break;

            if(minus>0) options.add(minus);

            offset++;

        }

        return this.shuffle([...options]);

    }

    /*==================================================
                    START GAME
    ==================================================*/

    startGame(){

        this.score=0;

        this.currentQuestion=0;

        this.answered=false;

        const indexes=[...Array(this.surahs.length).keys()];

        this.shuffle(indexes);

        this.questions=indexes

            .slice(0,this.totalQuestions)

            .map(index=>this.surahs[index]);

        this.result.classList.add("hidden");

        document.querySelector(".game-progress").style.display="block";

        document.querySelector(".question-card").style.display="block";

        this.optionsContainer.style.display="grid";

        this.feedback.className="game-feedback";

        this.feedback.innerHTML="";

        this.nextBtn.style.display="none";

        this.showQuestion();

    }

    /*==================================================
                UPDATE PROGRESS
    ==================================================*/

    updateProgress(){

        this.questionCounter.innerHTML=

            `السؤال ${this.currentQuestion+1} من ${this.totalQuestions}`;

        const percent=

            ((this.currentQuestion)/this.totalQuestions)*100;

        this.progressFill.style.width=`${percent}%`;

    }

    /*==================================================
                    SHOW QUESTION
    ==================================================*/

    showQuestion(){

        if(this.currentQuestion>=this.totalQuestions){

            this.showResult();

            return;

        }

        this.answered=false;

        this.nextBtn.style.display="none";

        this.feedback.innerHTML="";

        this.feedback.className="game-feedback";

        this.updateProgress();

        const question=this.questions[this.currentQuestion];

        const correctAnswer=question[0];

        const surah=question[1];

        this.surahName.textContent=surah;

        const options=this.pickOptions(correctAnswer);

        this.optionsContainer.innerHTML="";

        options.forEach(value=>{

            const option=document.createElement("div");

            option.className="option";

            option.dataset.value=value;

            option.textContent=value;

            option.addEventListener("click",()=>{

                this.selectAnswer(

                    option,

                    value,

                    correctAnswer,

                    surah

                );

            });

            this.optionsContainer.appendChild(option);

        });

    }
        /*==================================================
                SELECT ANSWER
    ==================================================*/

    selectAnswer(selectedElement, selectedValue, correctValue, surahName){

        if(this.answered) return;

        this.answered = true;

        const options = document.querySelectorAll(".option");

        options.forEach(option=>{

            option.style.pointerEvents="none";

        });

        if(selectedValue===correctValue){

            this.score++;

            selectedElement.classList.add("correct");

            this.feedback.className="game-feedback success";

            this.feedback.innerHTML=

                `<i class="fa-solid fa-circle-check"></i>
                 أحسنت، إجابة صحيحة.`;

        }else{

            selectedElement.classList.add("wrong");

            options.forEach(option=>{

                if(parseInt(option.dataset.value)===correctValue){

                    option.classList.add("correct");

                }

            });

            this.feedback.className="game-feedback error";

            this.feedback.innerHTML=

                `<i class="fa-solid fa-circle-xmark"></i>
                 الإجابة الصحيحة هي <strong>${correctValue}</strong>
                 آية في سورة <strong>${surahName}</strong>.`;

        }

        this.nextBtn.style.display="inline-flex";

    }

    /*==================================================
                SHOW RESULT
    ==================================================*/

    showResult(){

        document.querySelector(".game-progress").style.display="none";

        document.querySelector(".question-card").style.display="none";

        this.optionsContainer.style.display="none";

        this.feedback.style.display="none";

        this.nextBtn.style.display="none";

        this.result.classList.remove("hidden");

        const percentage=Math.round(

            (this.score/this.totalQuestions)*100

        );

        this.progressFill.style.width="100%";

        this.finalScore.innerHTML=

            `${this.score} / ${this.totalQuestions}`;

        let message="";

        if(percentage===100){

            message="🏆 ممتاز! إجابات صحيحة بالكامل.";

        }else if(percentage>=90){

            message="🌟 أداء رائع جداً، استمر.";

        }else if(percentage>=70){

            message="✅ أداء جيد جداً، أحسنت.";

        }else if(percentage>=50){

            message="📖 جيد، لكن يحتاج إلى مراجعة أكثر.";

        }else{

            message="💪 لا تيأس، واصل المراجعة وستتحسن بإذن الله.";

        }

        this.scoreDetail.innerHTML=

            `
            <div>
                <strong>النسبة:</strong>
                ${percentage}%
            </div>

            <br>

            <div>
                ${message}
            </div>
            `;

    }

}

/*==================================================
                START GAME
==================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    new SurahAyahsGame();

});