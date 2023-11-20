const title = document.getElementById("event_title")
const month = document.getElementById("month")
const year = document.getElementById("year")
const details = document.getElementById("event_details")
const submit = document.getElementById("submit")


onload = ()=>{
    index = JSON.parse(localStorage.getItem("event_to_be_updated"))
    if(+index >= 0){
        let e = JSON.parse(localStorage.getItem("events"))[+index]
        title.value = e.title
        month.value = e.month
        year.value = e.year
        details.value = e.details

        // change button value
        submit.innerHTML = "update event"
    }
}

function create_or_update_event(){
    let data = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")):[];
    
    let e = {
        title:title.value,
        month:month.value,
        year:year.value,
        details:details.value ? details.value:""
    }
    index = JSON.parse(localStorage.getItem("event_to_be_updated"))
    if(+index < 0){
       data.push(e)
    }else{
        data.splice(index, 1, e)
        localStorage.setItem("event_to_be_updated", JSON.stringify(-1))
        // change button value
        submit.innerHTML = "create new event"
        console.log(data)
    }
    
    data.sort(compare_events)
    localStorage.setItem("events",JSON.stringify(data))
    clear_inputs()
}

function clear_inputs(){
    let inputs = document.querySelectorAll("input,textarea")
    for(let i=0; i<inputs.length; i+=1){
        inputs[i].value=""
    }
}
function compare_events(a, b){
    if(+a.year < +b.year){
        return -1;
    }
    if(+a.year > +b.year){
        return 1;
    }
    if(+a.month < +b.month){
        return -1;
    }
    if(+a.month > +b.month){
        return 1;
    }
    return 0;
}