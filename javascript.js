const accessKey = "_yH2_rfgoSckJm-t6zsM5CAsRqThoAUmF7XuALN6NQ8"
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("button");
let inputData = ""
let page  = 1;

async function searchImages(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data);
    const results = data.results
   
    if(page === 1){
        searchResults.innerHTML = ""
    }
    results.map((result)=>{
        const imagewrapper = document.createElement("div")
        imagewrapper.classList.add("search-result")
        const image = document.createElement("img")
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description
      
        imagewrapper.appendChild(image);
        imagewrapper.appendChild(imageLink);
        searchResults.appendChild(imagewrapper);
        console.log(`page1 = ${page}`);
    })
    page++
    console.log(`page2 = ${page}`);
    if(page > 1){
        showMore.style.display = "block"
    }
}
formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    page = 1;
    searchImages();
})
showMore.addEventListener("click",()=>{
    searchImages()
})