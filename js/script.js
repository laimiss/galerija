function getUrl(page = 1, limit = 12) {
    return `https://api.artic.edu/api/v1/artworks?fields=id,title,artist_title,image_id&page=${page}&limit=${limit}`
}

async function fetchArt(page = 1, limit = 12) {
    let response = await fetch(getUrl(page, limit))
        .then(response => response.json())
        .then(response => response)
    return response
}

async function updateGallery() {
    const puslapis = document.getElementById('puslapis').value
    const limitas = document.getElementById("limitas").value
    const response = await fetchArt(puslapis, limitas)
    const data = response.data
    const fragment = document.createDocumentFragment()

    data.forEach(artItem => {
        fragment.appendChild(createThumbnail(artItem))
    });

    const gallery = document.getElementById("gallery")
    gallery.replaceChildren()
    gallery.appendChild(fragment)
}

function createThumbnail(artItem) {
    const card = document.createElement('div')
    card.classList.add("card")

    const image = document.createElement('img')
    const imageUrl = `https://www.artic.edu/iiif/2/${artItem.image_id}/full/843,/0/default.jpg`
    image.src = imageUrl
    image.classList.add("card-img-top")
    image.addEventListener("error", function (event) {
        event.target.src = "img/not-found.jpg"
        event.onerror = null
    })

    const artTitleText = document.createElement("h5")
    artTitleText.classList.add("card-title")
    artTitleText.innerText = artItem.title

    const artAuthor = document.createElement("h6")
    artAuthor.classList.add("card-subtitle")
    artAuthor.innerText = artItem.artist_title

    card.appendChild(image)
    card.appendChild(artTitleText)
    card.appendChild(artAuthor)

    // console.log(artItem)
    return card
}

document.querySelector("button[name='puslapisMinus']").addEventListener("click", () => {
    document.getElementById("puslapis").stepDown()
    updateGallery()
})
document.querySelector("button[name='puslapisPlus']").addEventListener("click", () => {
    document.getElementById("puslapis").stepUp()
    updateGallery()
})
document.querySelector("button[name='limitasMinus']").addEventListener("click", () => {
    document.getElementById("limitas").stepDown()
    updateGallery()
})
document.querySelector("button[name='limitasPlus']").addEventListener("click", () => {
    document.getElementById("limitas").stepUp()
    updateGallery()
})

updateGallery()
