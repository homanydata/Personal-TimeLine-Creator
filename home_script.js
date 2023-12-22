const event_contaniner = document.getElementById("container")
const profile = document.getElementById("profile")
const greeting = document.getElementById("greeting")
const myName = document.getElementById("name")
const slogan = document.getElementById("slogan")
const insta = document.getElementById("insta")
const facebook = document.getElementById("facebook")
const whatsapp = document.getElementById("whatsapp")

// localStorage.removeItem("events")
// localStorage.removeItem("textuals")
// localStorage.removeItem("links")

// basic interactions
    // show & hide contents of an event
        function show_contents(event_button_id){
            let event_body = document.getElementById(event_button_id).nextElementSibling
            if(event_body.style.height=="auto"){
                event_body.style.height = "0px";
            }else{
                event_body.style.height="auto"
            }
        }
        // hide contents when clicking outside it
        document.addEventListener('click', function (e) {
            document.querySelectorAll('.event button').forEach(item => {
                if (!item.contains(e.target)) {
                    item.nextElementSibling.style.height = "0px";
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


// onload
onload = ()=>{
    scroll({
            behavior:"auto",
            top:0,
            left:0
    })
    applyColors()
    load_timeline()
    load_textuals()
    load_social_links()
    display_image()
}
function load_timeline(){
    let data = JSON.parse(localStorage.getItem("events"));
    if (data === null || !Array.isArray(data) || data.length === 0){
        data = [
            {
                title:"event 1",
                month:1,
                year:2020,
                details:"When you click on “See my journey” you scroll down to find this timeline, with events on right and left, where u can build you personal events timeline, add/edit/delete events"
            },
            {
                title:"whatever event",
                month:9,
                year:2003,
                details:"whatever short text about the event"
            },
            {
                title:"editing",
                month:10,
                year:2023,
                details: "you can use the editor buttons beside this to delete or update the event"
            }
        ]
    }

    result = ""
    
    for(let i=0; i<data.length; i++){
        record = data[i]
        if (record.details === null || record.details === ""){
            result += `
            <div class="${i%2!=0 ? 'event right':'event'}" id="e${i}">
                <button id="b${i}" onclick="show_contents(this.id)">${record.title}<br><span class="event_date">${getMonthName(record.month)} - ${record.year}</span> </button>
                <div class="event_body">
                    <div class="editor" style="flex-direction:row;justify-content:center;width:100%">
                        <svg onclick="delete_event(this.parentNode.parentNode.id)" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
                        <svg onclick="update_event(this.parentNode.parentNode.parentNode.id)" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                    </div>
                </div>
            </div>`
        }else{
            result += `
            <div class="${i%2!=0 ? 'event right':'event'}" id="e${i}">
                <button id="b${i}" onclick="show_contents(this.id)">${record.title}<br><span class="event_date">${getMonthName(record.month)} - ${record.year}</span> </button>
                <div class="event_body">
                    <div class="editor">
                        <svg onclick="delete_event(this.parentNode.parentNode.id)" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
                        <svg onclick="update_event(this.parentNode.parentNode.parentNode.id)" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                    </div>
                    <p class="event_details">
                        ${record.details}
                    </p>
                </div>
            </div>
            `
        }
    }
    event_contaniner.innerHTML = result;
}
function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', {
      month: 'short',
    });
}
// display existing image in localstorage
function display_image(){
    img_url = JSON.parse(localStorage.getItem("img_url"))
    if(! img_url){
        img_url = "resources/empty_profile.png"
    }
    profile.src = img_url
}

function load_social_links(){
    let links = JSON.parse(localStorage.getItem("links"))
    if(links){
        insta.style.display = "none"
        facebook.style.display = "none"
        whatsapp.style.display = "none"
        if(links.insta){
            insta.href = links.insta,
            insta.style.display = "block"
        }
        if(links.facebook){
            facebook.href = links.facebook,
            facebook.style.display = "block"
        }
        if(links.whatsapp){
            whatsapp.href = links.whatsapp,
            whatsapp.style.display = "block"
        }
    }
}



// deleting event in home page
function delete_event(event_id){
    let data = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")):[];
    index = event_id.substr(1)
    data.splice(index, 1)
    localStorage.setItem("events", JSON.stringify(data))
    load_timeline()
}

// updating event from home, go to addEvent page and save index that needs update to localstorage
function update_event(event_id){
    index = event_id.substr(1)
    localStorage.setItem("event_to_be_updated", JSON.stringify(index))
    location.assign("addEvent.html")
}


function update_textuals(){
    result = {
        greeting: greeting.value,
        name: myName.value,
        slogan:slogan.value
    }
    localStorage.setItem("textuals", JSON.stringify(result))
}
function load_textuals(){
    result = JSON.parse(localStorage.getItem("textuals"))
    if(result){
        greeting.value = result.greeting
        myName.value = result.name
        slogan.value = result.slogan
    }
}