// There are several ways to share, HTML

onload = ()=>{
    applyColors()
}

// HTML
function share_as_html(){
    // Create a Blob from the HTML content
    var blob = new Blob([generated_html], { type: 'text/html' });

    // Create a download link
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'custom_page.html';

    // Append the link to the document
    document.body.appendChild(a);

    // Trigger a click event on the link
    a.click();

    // Remove the link from the document
    document.body.removeChild(a);
}

function load_timeline(){
    let data = JSON.parse(localStorage.getItem("events"));
    if (data === null || !Array.isArray(data) || data.length === 0){
        data = []
    }

    result = ""
    
    for(let i=0; i<data.length; i++){
        record = data[i]
        if (record.details === null || record.details === ""){
            result += `
            <div class="${i%2!=0 ? 'event right':'event'}" id="e${i}">
                <button id="b${i}" onclick="show_contents(this.id)">${record.title}<br><span class="event_date">${getMonthName(record.month)} - ${record.year}</span> </button>
            </div>`
        }else{
            result += `
            <div class="${i%2!=0 ? 'event right':'event'}" id="e${i}">
                <button id="b${i}" onclick="show_contents(this.id)">${record.title}<br><span class="event_date">${getMonthName(record.month)} - ${record.year}</span> </button>
                <p class="event_body">
                    ${record.details}
                </p>
            </div>
            `
        }
    }
    return result;
}

img_url = JSON.parse(localStorage.getItem("img_url")) ? JSON.parse(localStorage.getItem("img_url")):"resources/empty_profile.png";
result = JSON.parse(localStorage.getItem("textuals")) ? JSON.parse(localStorage.getItem("textuals")):{greeting:"hello everyone, i am",name:"your name",slogan:"write what best describes you in 2 lines"}
console.log(result)
console.log(img_url)

let primaryColor = localStorage.getItem('primaryColor');
let secondaryColor = localStorage.getItem('secondaryColor');
let thirdColor= localStorage.getItem('thirdColor');

let generated_html = `<!DOCTYPE html><html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            /* nav styling */
            @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300&family=DM+Serif+Display:ital@0;1&family=Dosis:wght@700&family=Pacifico&family=Patua+One&display=swap');
            :root{
                --primary-color:${primaryColor};
                --secondary-color:${secondaryColor};
                --third-color:${thirdColor};
            }
            *{
                margin: 0;
                padding: 0;
            }
            body{
                background-color: var(--third-color);
            }
            nav a{
                text-decoration: none;
                color: var(--third-color);
            }
            nav{
                background-color: var(--primary-color);
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                color: var(--third-color);
                padding: 10px 80px;
                margin-bottom: 50px;
                text-transform: capitalize;
                height: 10%;
            }
            nav .logo{
                font-family: 'Pacifico', cursive;
                font-size: 60px;
                cursor: pointer;
            }
            nav ul{
                display: inline-block;
            }
            nav ul li{
                display: inline-block;
                position: relative;
                font-size: 28px;
                font-family: 'Patua One', serif;
                color: var(--third-color);
                text-decoration: none;
                list-style: none;
                margin-left: 35px;
                cursor: pointer;
            }
            nav .active{
                color: var(--secondary-color);
            }
            nav ul li::after{
                content: '';
                display: block;
                width: 0%;
                height:2px;
                background: var(--third-color);
                margin: auto;
                margin-top: 10px;
                transition: 1s;
            }
            nav li:hover::after{
                content: '';
                display: block;
                width: 100%;
                height:2px;
                background: var(--third-color);
                margin: auto;
                margin-top: 10px;
            }
            nav .active::after{
                background: var(--secondary-color);
            }
            nav .active:hover::after{
                background: var(--secondary-color);
            }
            html {
                scroll-behavior: smooth;
            }
            *{
                margin: 0;
                padding: 0;
            }
            /* hero section */
            .hero{
                display: flex;
                justify-content: center;
                text-transform: capitalize;
                width: 100%;
                height: 600px;
            }
            /* visual */
            .visual{
                width: 40%;
                text-align: center;
            }
            img{
                width: 80%;
                aspect-ratio: 1/1;
                border-radius: 50%;
            }
            .editor{
                display: flex;
                justify-content: center;
            }
            svg{
                fill: #303030;
                height: 50px;
                margin: 10px;
                cursor: pointer;
            }
            /* textual */
            .textual{
                width: 50%;
                /* padding-right: 10%; */
                color: var(--primary-color);
                line-height: 130px;
                text-align: center;
                text-wrap: balance;
                display: flex;
                flex-flow: column nowrap;
                justify-content: center;
                align-items: center;
            }
            .title{
                text-transform: capitalize;
                font-size: 100px;
                font-weight: 700;
                font-family: 'Dosis', sans-serif;
                margin-bottom: 40px;
            }
            .title span{
                font-size: 50px;
            }
            .textual p{
                font-size: 24px;
                font-family: 'DM Serif Display', serif;
                line-height: 40px;
            }
            button{
                font-family: 'Dosis', sans-serif;
                color: var(--secondary-color);
                border: 2px solid var(--secondary-color);
                background: none;
                padding: 15px 20px;
                border-radius: 50px;
                text-transform: capitalize;
                font-size: 40px;
                font-weight: 700;
                cursor: pointer;
                margin: 50px 0px;
                transition: 1s;
            }
            button:hover{
                color: var(--third-color);
                background-color: var(--secondary-color);
            }
            /* timeline */
            .timeline{
                margin: 100px 0px;
                margin-bottom: -5px;
                padding: 200px 0px;
                width: 100%;
                position: relative;
            }
            vl{
                position: absolute;
                top: 0px;
                left: 50%;
                border: 5px dashed var(--primary-color);
                height: 100%;
            }
            .events_container{
                width: 80%;
                margin: auto;
                padding: 100px 0px;
                display: flex;
                flex-flow: column nowrap;
            }
            .event{
                width: 50%;
                text-align: center;
                margin: 30px 0px;
            }
            .event button{
                width: 80%;
                line-height: 30px;
                color: var(--third-color);
                background-color: var(--secondary-color);
                margin: 0px auto;
                z-index:1;
            }
            .event button:hover{
                box-shadow: 0px 0px 10px 5px #9c7500 inset;
            }
            .event_body{
                width: 60%;
                margin: auto;
                margin-top: -20px;
                
                height: 0px;
                opacity:0;

                overflow: hidden;
                transition: all 1s ;
                
                color: var(--primary-color);
                font-size: 20px;
                text-align: left;
                border: 1px solid var(--secondary-color);
            }
            .event_date{
                color: #5D5D5D;
                font-size: 19px;
            }
            .right{
                align-self: end;
            }
            
            
            /* scrolling */
            #up{
                display: none;
                position: fixed;
                right: 20px;
                bottom: 20px;
                height: 50px;
                fill: var(--secondary-color);
                cursor: pointer;
            }
            
            
            /* footer */
            footer{
                display: flex;
                flex-flow: column nowrap;
                align-content: center;
                justify-content: space-evenly;
                text-align: center;
            }
            footer p{
                font-weight: 200;
                font-size: 24px;
                color: var(--secondary-color);
                margin: 25px;
            }
            .social_media{
                background-color: var(--primary-color);
                padding-top: 30px;
                padding-bottom: 10px;
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                align-items: center;
            }
            footer a{
                margin: 0px 30px;
                font-size: 30px;
                text-decoration: none;
            }
            #whatsapp{
                font-size: 40px;
            }
            footer svg{
                fill: var(--secondary-color);
            }
        </style>
        <title>Home</title>
    </head>
    <body>
        <nav>
            <h1 class="logo">me</h1>
            <ul>
                <li class="active">home</li>
            </ul>
        </nav>
        <section class="hero">
            <div class="visual">
                <img id="profile" src="${img_url}">
            </div>
            <div class="textual">
                <h2 class="title">
                    <span>${result.greeting}</span> <br>
                    ${result.name}
                </h2>
                <p>
                    ${result.slogan}
                </p>
                <button onclick="scroll_to_events()">see my journey</button>
            </div>
        </section>
        <section class="timeline">
            <vl></vl>
            <div class="events_container" id="container">
            ${load_timeline()}
            </div>
        </section>
        <svg id="up" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM135.1 217.4l107.1-99.9c3.8-3.5 8.7-5.5 13.8-5.5s10.1 2 13.8 5.5l107.1 99.9c4.5 4.2 7.1 10.1 7.1 16.3c0 12.3-10 22.3-22.3 22.3H304v96c0 17.7-14.3 32-32 32H240c-17.7 0-32-14.3-32-32V256H150.3C138 256 128 246 128 233.7c0-6.2 2.6-12.1 7.1-16.3z"/></svg>
        <footer>
            <div class="social_media">
                <a id="whatsapp" href="https://www.whatsapp.com/"><svg class="social_media_icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg></a>
                <a href="https://www.facebook.com/"><svg class="social_media_icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg></a>
                <a href="https://www.instagram.com/"><svg class="social_media_icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg></a>
            </div>
        </footer>
        <script>
            const event_contaniner = document.getElementById("container")
            // basic interactions
            // show & hide contents of an event
                function show_contents(event_button_id){
                    let event_body = document.getElementById(event_button_id).nextElementSibling
                    if(event_body.style.height=="auto"){
                        event_body.style.height = "0px";
                        event_body.style.padding = "0px 10px";
                        event_body.style.marginTop = "-40px";
                        event_body.style.opacity = "0";
                    }else{
                        event_body.style.height="auto";
                        event_body.style.padding="15px 10px";
                        event_body.style.marginTop = "-10px";
                        event_body.style.opacity = "1";
                    }
                }
                // hide contents when clicking outside it
                document.addEventListener('click', function (e) {
                    document.querySelectorAll('.event button').forEach(item => {
                        if (!item.contains(e.target)) {
                            item.nextElementSibling.style.height = "0px";
                            item.nextElementSibling.style.padding = "0px 10px";
                            item.nextElementSibling.style.marginTop = "-40px";
                            item.nextElementSibling.style.opacity = "0";
                        }
                    });
                });
        
            // scroll to hero
                let up = document.getElementById("up")
                up.addEventListener("click", () => {
                    scroll({
                        left:0,
                        top:0,
                        behavior:"smooth"
                    })
                })
                // show up button
                window.onscroll = () => {
                    if(scrollY >= 500){
                        up.style.display = "block";
                    }else{
                        up.style.display = "none";
                    }
                }
        
            // see journey button
                function scroll_to_events(){
                    event_contaniner.scrollIntoView()
                }
        </script>
    </body>
    </html>`;

function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    
    return date.toLocaleString('en-US', {
        month: 'short',
    });
}



img_url = JSON.parse(localStorage.getItem("img_url")) ? JSON.parse(localStorage.getItem("img_url")):"resources/empty_profile.png";
result = JSON.parse(localStorage.getItem("textuals")) ? JSON.parse(localStorage.getItem("textuals")):{greeting:"hello everyone, i am",name:"your name",slogan:"write what best describes you in 2 lines"}
console.log(result)
console.log(img_url)
// image
let generated_html_2 = `<!DOCTYPE html><html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            /* nav styling */
            @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300&family=DM+Serif+Display:ital@0;1&family=Dosis:wght@700&family=Pacifico&family=Patua+One&display=swap');
            *{
                margin: 0;
                padding: 0;
            }
            /* textual */
            .textual{
                width: 100%;
                padding: 50px 0px;
                color: var(--primary-color);
                line-height: 130px;
                text-align: center;
                text-wrap: balance;
                display: flex;
                flex-flow: column nowrap;
                justify-content: center;
                align-items: center;
                background-color: var(--third-color);
            }
            .title{
                text-transform: capitalize;
                font-size: 100px;
                font-weight: 700;
                font-family: 'Dosis', sans-serif;
                margin-bottom: 40px;
            }
            .title span{
                font-size: 50px;
            }
            .textual p{
                font-size: 24px;
                font-family: 'DM Serif Display', serif;
                line-height: 40px;
            }
            button{
                font-family: 'Dosis', sans-serif;
                color: var(--secondary-color);
                border: 2px solid var(--secondary-color);
                background: none;
                padding: 15px 20px;
                border-radius: 50px;
                text-transform: capitalize;
                font-size: 40px;
                font-weight: 700;
                cursor: pointer;
                margin: 50px 0px;
                transition: 1s;
            }
            /* timeline */
            .timeline{
                padding: 100px 0px;
                width: 100%;
                position: relative;
                background-color: var(--third-color);
            }
            vl{
                position: absolute;
                top: 0px;
                left: 50%;
                border: 5px dashed var(--primary-color);
                height: 100%;
            }
            .events_container{
                width: 80%;
                margin: auto;
                padding: 100px 0px;
                display: flex;
                flex-flow: column nowrap;
            }
            .event{
                width: 50%;
                text-align: center;
                margin-bottom: 30px;
            }
            .event button{
                width: 80%;
                line-height: 30px;
                color: var(--primary-color);
                background-color: var(--secondary-color);
                margin: 0px auto;
                z-index:1;
            }
            .event_body{
                width: 60%;
                margin: auto;
                margin-top: -10px;
                padding: 10px 15px;
                color: var(--primary-color);
                font-size: 20px;
                text-align: left;
                border: 1px solid var(--secondary-color);
            }
            .event_date{
                color: #5D5D5D;
                font-size: 19px;
            }
            .right{
                align-self: end;
            }
        </style>
        <title>Home</title>
    </head>
    <body>
        <div class="textual">
            <h2 class="title">
                <span>${result.greeting}</span> <br>
                ${result.name}
            </h2>
            <p>
                ${result.slogan}
            </p>
        </div>
        <section class="timeline">
            <vl></vl>
            <div class="events_container" id="container">
                ${load_timeline()}
            </div>
        </section>
    </body>
    </html>`;
// Function to convert HTML to image and trigger download
function share_as_image() {
    let htmlContent = document.createElement("div");
    htmlContent.id = "htmlContent"
    htmlContent
    // Set the HTML content to the div
    htmlContent.innerHTML = generated_html_2;
    document.body.append(htmlContent)
    html2canvas(document.getElementById('htmlContent')).then(function(canvas) {
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.download = 'html_to_image.png';
        link.href = canvas.toDataURL("image/png");
        link.target = '_blank';
        link.click();
        document.body.removeChild(link);
        document.body.removeChild(htmlContent)
    });
}