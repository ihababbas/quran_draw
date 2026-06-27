/*==================================================
                GLOBAL VARIABLES
==================================================*/

let selected = [];
let selectedLevel = null;
let lastResult = null;

/*==================================================
                DOM ELEMENTS
==================================================*/

const levelGrid = document.getElementById("levelGrid");
const partsGrid = document.getElementById("partsGrid");
const resultSection = document.getElementById("resultSection");

/*==================================================
                INITIALIZE PAGE
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    createLevelGrid();

    createPartsGrid();

    resultSection.innerHTML = `
        <div class="empty-result">
            لم يتم إجراء أي سحب بعد
        </div>
    `;

});

/*==================================================
                LEVEL GRID
==================================================*/

function createLevelGrid(){

    levelGrid.innerHTML = "";

    const levels = [5,10,15,20,25,30];

    levels.forEach(level=>{

        const box = document.createElement("div");

        box.className = "level-box";

        box.innerText = level;

        box.onclick = () => selectLevel(level, box);

        levelGrid.appendChild(box);

    });

}

/*==================================================
                SELECT LEVEL
==================================================*/

function selectLevel(level, element){

    selectedLevel = level;

    selected = [];

    document.querySelectorAll(".level-box").forEach(item=>{

        item.classList.remove("active");

    });

    element.classList.add("active");

    document.querySelectorAll(".juz-box").forEach(item=>{

        item.classList.remove("active");

    });

    if(level === 30){

        selected = [];

        document.querySelectorAll(".juz-box").forEach((item,index)=>{

            item.classList.add("active");

            selected.push(index + 1);

        });

    }

}

/*==================================================
                PARTS GRID
==================================================*/

function createPartsGrid(){

    partsGrid.innerHTML = "";

    for(let i=1;i<=30;i++){

        const box = document.createElement("div");

        box.className = "juz-box";

        box.innerHTML = `

            <div>

                <strong>${i}</strong>

            </div>

        `;

        box.onclick = ()=>togglePart(i, box);

        partsGrid.appendChild(box);

    }

}

/*==================================================
                TOGGLE PART
==================================================*/

function togglePart(part, element){

    if(selectedLevel === null){

        Swal.fire({

            icon:"warning",

            title:"تنبيه",

            text:"يرجى اختيار المستوى أولاً."

        });

        return;

    }

    if(selectedLevel === 30){

        return;

    }

    if(selected.includes(part)){

        selected = selected.filter(item=>item!==part);

        element.classList.remove("active");

    }

    else{

        if(selected.length >= selectedLevel){

            Swal.fire({

                icon:"info",

                title:"تنبيه",

                text:`يمكنك اختيار ${selectedLevel} جزء فقط.`

            });

            return;

        }

        selected.push(part);

        element.classList.add("active");

    }

}

/*==================================================
                RESET
==================================================*/

function resetSelection(){

    selected = [];

    selectedLevel = null;

    lastResult = null;

    document.getElementById("name").value = "";

    document.querySelectorAll(".level-box").forEach(item=>{

        item.classList.remove("active");

    });

    document.querySelectorAll(".juz-box").forEach(item=>{

        item.classList.remove("active");

    });

    resultSection.innerHTML = `
        <div class="empty-result">
            لم يتم إجراء أي سحب بعد
        </div>
    `;

}
/*==================================================
                SUBMIT DATA
==================================================*/

async function submitData(){

    const name = document.getElementById("name").value.trim();

    if(name === ""){

        Swal.fire({
            icon:"warning",
            title:"تنبيه",
            text:"يرجى إدخال اسم الطالب."
        });

        return;

    }

    if(selectedLevel === null){

        Swal.fire({
            icon:"warning",
            title:"تنبيه",
            text:"يرجى اختيار المستوى."
        });

        return;

    }

    if(selected.length !== selectedLevel){

        Swal.fire({
            icon:"warning",
            title:"تنبيه",
            text:`يجب اختيار ${selectedLevel} جزء.`
        });

        return;

    }

    resultSection.innerHTML = `

        <div class="loading">

            جاري سحب الاختبار...

        </div>

    `;

    try{

        const response = await fetch("/draw/",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                name:name,

                level:selectedLevel,

                parts:selected

            })

        });

        const data = await response.json();

        if(data.error){

            Swal.fire({

                icon:"error",

                title:"خطأ",

                text:data.error

            });

            return;

        }

        lastResult = data;

        renderResult(data,name);

    }

    catch(error){

        console.error(error);

        Swal.fire({

            icon:"error",

            title:"خطأ",

            text:"تعذر الاتصال بالخادم."

        });

    }

}

/*==================================================
                RENDER RESULT
==================================================*/

function renderResult(data,name){

    let rows = "";

    data.results.forEach(item=>{

        rows += `

        <tr>

            <td>${item.juz}</td>

            <td>${item.surah}</td>

            <td>${item.page}</td>

        </tr>

        `;

    });

    resultSection.innerHTML = `

<div id="printable">

    <div class="print-header">

        <h1>

            نموذج اختبار حفظ القرآن الكريم

        </h1>

        <p>

            منصة قلب الحافظ

        </p>

    </div>

    <div class="student-info">

        <div>

            <strong>

                اسم الطالب :

            </strong>

            ${name}

        </div>

        <div>

            <strong>

                المستوى :

            </strong>

            ${selectedLevel}

        </div>

        <div>

            <strong>

                الأجزاء المختارة :

            </strong>

            ${selected.join(" ، ")}

        </div>

        <div>

            <strong>

                الأجزاء المسحوبة :

            </strong>

            ${data.chosen_parts.join(" ، ")}

        </div>

    </div>

    <table class="exam-table">

        <thead>

            <tr>

                <th>

                    الجزء

                </th>

                <th>

                    السورة

                </th>

                <th>

                    الصفحة

                </th>

            </tr>

        </thead>

        <tbody>

            ${rows}

        </tbody>

    </table>

    <div class="signature">

        <div>

            <hr>

            المعلم

        </div>

        <div>

            <hr>

            الطالب

        </div>

    </div>

</div>

`;

}
/*==================================================
                PRINT RESULT
==================================================*/

function printResult(){

    if(lastResult === null){

        Swal.fire({

            icon:"warning",

            title:"تنبيه",

            text:"قم بإجراء السحب أولاً."

        });

        return;

    }

    window.print();

}

/*==================================================
                DOWNLOAD PDF
==================================================*/

function downloadPDF(){

    if(lastResult === null){

        Swal.fire({

            icon:"warning",

            title:"تنبيه",

            text:"قم بإجراء السحب أولاً."

        });

        return;

    }

    const printable = document.getElementById("printable");

    const options = {

        margin:0,

        filename:`Multi_Exam_${selectedLevel}.pdf`,

        image:{

            type:"jpeg",

            quality:1

        },

        html2canvas:{

            scale:3,

            useCORS:true,

            scrollX:0,

            scrollY:0

        },

        jsPDF:{

            unit:"mm",

            format:"a4",

            orientation:"portrait"

        }

    };

    html2pdf()

        .set(options)

        .from(printable)

        .save();

}

/*==================================================
                COPY RESULT
==================================================*/

function copyResult(){

    if(lastResult === null){

        Swal.fire({

            icon:"warning",

            title:"تنبيه",

            text:"لا يوجد نتيجة لنسخها."

        });

        return;

    }

    let text = "";

    text += "نموذج اختبار حفظ القرآن الكريم\n";

    text += "====================================\n";

    text += `المستوى : ${selectedLevel}\n`;

    text += `الأجزاء المختارة : ${selected.join(", ")}\n`;

    text += `الأجزاء المسحوبة : ${lastResult.chosen_parts.join(", ")}\n\n`;

    lastResult.results.forEach((item,index)=>{

        text += `${index+1}. الجزء ${item.juz} - ${item.surah} - صفحة ${item.page}\n`;

    });

    navigator.clipboard.writeText(text);

    Swal.fire({

        icon:"success",

        title:"تم",

        text:"تم نسخ النتيجة."

    });

}

/*==================================================
                SAVE HTML
==================================================*/

function saveHTML(){

    if(lastResult === null){

        Swal.fire({

            icon:"warning",

            title:"تنبيه",

            text:"لا يوجد بيانات للحفظ."

        });

        return;

    }

    const html = document.getElementById("printable").outerHTML;

    const blob = new Blob([html],{

        type:"text/html"

    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "multi_exam.html";

    link.click();

}

/*==================================================
                UI HELPERS
==================================================*/

updateSelectionCounter();

/*==================================================
                UPDATE COUNTER
==================================================*/

function updateSelectionCounter(){

    const info = document.getElementById("selectionInfo");

    if(!info) return;

    if(selectedLevel === null){

        info.innerHTML = `
            <span>
                اختر المستوى أولاً
            </span>
        `;

        return;

    }

    info.innerHTML = `
        <span>
            تم اختيار
            <strong>${selected.length}</strong>
            من
            <strong>${selectedLevel}</strong>
            جزء
        </span>
    `;

}

/*==================================================
                ENABLE BUTTON
==================================================*/

function updateSubmitButton(){

    const btn = document.getElementById("submitBtn");

    if(!btn) return;

    btn.disabled = !(selectedLevel && selected.length === selectedLevel);

}

/*==================================================
                UPDATE UI
==================================================*/

function refreshUI(){

    updateSelectionCounter();

    updateSubmitButton();

}

/*==================================================
                CALL REFRESH
==================================================*/

document.addEventListener("click",()=>{

    refreshUI();

});

/*==================================================
                RESET RESULT
==================================================*/

function clearResult(){

    resultSection.innerHTML = `

        <div class="empty-result">

            لم يتم إجراء أي سحب بعد

        </div>

    `;

}

/*==================================================
                PAGE READY
==================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    refreshUI();

});