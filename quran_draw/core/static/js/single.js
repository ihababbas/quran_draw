/*==================================================
                GLOBAL VARIABLES
==================================================*/

let selectedJuz = null;
let selectedCount = null;
let lastResult = null;

/*==================================================
                DOM ELEMENTS
==================================================*/

const juzGrid = document.getElementById("juzGrid");
const countGrid = document.getElementById("countGrid");
const resultSection = document.getElementById("resultSection");

/*==================================================
                INITIALIZE PAGE
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    createJuzGrid();

    createCountGrid();

    resultSection.innerHTML = `
        <div class="empty-result">
            لم يتم إجراء أي سحب بعد
        </div>
    `;

});

/*==================================================
                CREATE JUZ GRID
==================================================*/

function createJuzGrid(){

    juzGrid.innerHTML = "";

    for(let i = 1; i <= 30; i++){

        const box = document.createElement("div");

        box.className = "juz-box";

        box.innerText = i;

        box.onclick = function(){

            document.querySelectorAll(".juz-box").forEach(item=>{

                item.classList.remove("active");

            });

            box.classList.add("active");

            selectedJuz = i;

        };

        juzGrid.appendChild(box);

    }

}

/*==================================================
                CREATE COUNT GRID
==================================================*/

function createCountGrid(){

    countGrid.innerHTML = "";

    const counts = [1,2,3,4,5,6,7,8];

    counts.forEach(number=>{

        const box = document.createElement("div");

        box.className = "count-box";

        box.innerText = number;

        box.onclick = function(){

            document.querySelectorAll(".count-box").forEach(item=>{

                item.classList.remove("active");

            });

            box.classList.add("active");

            selectedCount = number;

        };

        countGrid.appendChild(box);

    });

}

/*==================================================
                RESET FORM
==================================================*/

function resetForm(){

    selectedJuz = null;

    selectedCount = null;

    lastResult = null;

    document.getElementById("name").value = "";

    document.querySelectorAll(".juz-box").forEach(item=>{

        item.classList.remove("active");

    });

    document.querySelectorAll(".count-box").forEach(item=>{

        item.classList.remove("active");

    });

    resultSection.innerHTML = `
        <div class="empty-result">
            لم يتم إجراء أي سحب بعد
        </div>
    `;

}
/*==================================================
                DRAW SINGLE EXAM
==================================================*/

async function drawSingle(){

    const name = document.getElementById("name").value.trim();

    if(name === ""){

        Swal.fire({

            icon:"warning",

            title:"تنبيه",

            text:"يرجى إدخال اسم الطالب."

        });

        return;

    }

    if(selectedJuz === null){

        Swal.fire({

            icon:"warning",

            title:"تنبيه",

            text:"يرجى اختيار الجزء."

        });

        return;

    }

    if(selectedCount === null){

        Swal.fire({

            icon:"warning",

            title:"تنبيه",

            text:"يرجى اختيار عدد المواضع."

        });

        return;

    }

    resultSection.innerHTML = `

        <div class="loading">

            جاري سحب الاختبار...

        </div>

    `;

    try{

        const response = await fetch("/draw-single/",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                name:name,

                juz:selectedJuz,

                count:selectedCount

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

        renderResult(data);

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

function renderResult(data){

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

            ${data.name}

        </div>

        <div>

            <strong>

                الجزء :

            </strong>

            ${data.juz}

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

        filename:`${lastResult.name}_Juz_${lastResult.juz}.pdf`,

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

    text += "=================================\n";

    text += `الطالب : ${lastResult.name}\n`;

    text += `الجزء : ${lastResult.juz}\n\n`;

    lastResult.results.forEach((item,index)=>{

        text += `${index+1}. ${item.surah} - صفحة ${item.page}\n`;

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

            text:"لا يوجد بيانات."

        });

        return;

    }

    const html = document.getElementById("printable").outerHTML;

    const blob = new Blob([html],{

        type:"text/html"

    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "exam.html";

    link.click();

}