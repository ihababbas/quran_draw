async function loadPrayerTimes(){

    try{

        const response = await fetch(
            "https://api.aladhan.com/v1/timingsByCity?city=Amman&country=Jordan"
        );

        const data = await response.json();

        const timings = data.data.timings;
        const hijri = data.data.date.hijri;

        const months = {
            "1":"محرم",
            "2":"صفر",
            "3":"ربيع الأول",
            "4":"ربيع الآخر",
            "5":"جمادى الأولى",
            "6":"جمادى الآخرة",
            "7":"رجب",
            "8":"شعبان",
            "9":"رمضان",
            "10":"شوال",
            "11":"ذو القعدة",
            "12":"ذو الحجة"
        };

        document.getElementById("headerHijri").innerHTML =
            `${hijri.day} ${months[hijri.month.number]} ${hijri.year}`;

        const prayers = {

            "الفجر":timings.Fajr,

            "الظهر":timings.Dhuhr,

            "العصر":timings.Asr,

            "المغرب":timings.Maghrib,

            "العشاء":timings.Isha

        };

        let now = new Date();

        let nextPrayer = null;

        let nextName = "";

        for(const prayer in prayers){

            const [h,m] = prayers[prayer].split(":");

            const prayerTime = new Date();

            prayerTime.setHours(h,m,0,0);

            if(prayerTime > now){

                nextPrayer = prayerTime;

                nextName = prayer;

                break;

            }

        }

        if(!nextPrayer){

            nextName = "الفجر";

            const [h,m] = timings.Fajr.split(":");

            nextPrayer = new Date();

            nextPrayer.setDate(nextPrayer.getDate()+1);

            nextPrayer.setHours(h,m,0,0);

        }

        document.getElementById("headerPrayer").innerHTML =
            `الصلاة القادمة : ${nextName}`;

        setInterval(()=>{

            let diff = nextPrayer - new Date();

            let hours = Math.floor(diff/(1000*60*60));

            let minutes = Math.floor((diff/(1000*60))%60);

            let seconds = Math.floor((diff/1000)%60);

            document.getElementById("headerCountdown").innerHTML =
                `المتبقي : ${hours}س ${minutes}د ${seconds}ث`;

        },1000);

    }

    catch(error){

        console.log(error);

    }

}

loadPrayerTimes();