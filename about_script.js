const profile = document.getElementById("profile")
const img_input = document.getElementById('img_input')
const about = document.getElementById('about')
const links_form = document.getElementById('links_form')
const insta = document.getElementById("insta")
const facebook = document.getElementById("facebook")
const whatsapp = document.getElementById("whatsapp")

onload = ()=>{
    display_image()
    load_about()
}

function display_image(){
    img_url = JSON.parse(localStorage.getItem("img_url"))
    if(! img_url){
        img_url = "resources/empty_profile.png"
    }
    profile.src = img_url
}

function save_img(img_file){
    if(img_file){
        var reader = new FileReader();

        reader.onload = function (e) {
            // Set the source of the image to the loaded data URL
            localStorage.setItem("img_url", JSON.stringify(e.target.result))
            display_image()
        }
        // Read the selected file as a data URL
        reader.readAsDataURL(img_file);
    }
}

// remove image from profile and localstorage
function remove_img(){
    localStorage.removeItem("img_url")
    display_image()
}

function update_about(){
    result = about.value
    localStorage.setItem("about", JSON.stringify(result))
}
function load_about(){
    result = JSON.parse(localStorage.getItem("about"))
    if(result){
        about.value = result
    }
}

function insert_links(){
    result = {
        insta: insta.value,
        facebook:facebook.value,
        whatsapp:whatsapp.value
    }
    localStorage.setItem("links",JSON.stringify(result))
}