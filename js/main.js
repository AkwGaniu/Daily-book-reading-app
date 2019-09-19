var closeButton = document.querySelector(".close")
var bgModal = document.querySelector(".bg-modal")
var books = []
var booksListing = document.querySelector(".book-listing")
var inputField = document.querySelector("input")
var buton = document.querySelector(".button")
var val = null


closeButton.addEventListener("click", () => {
    bgModal.style.display = "none"
    buton.innerHTML = "Add Book"

})

document.querySelector("#add").addEventListener("click", () => {
    bgModal.style.display = "flex"
})

buton.addEventListener("click", () => {
    //Get the book title
    let bookName = collectBookTitle();
    //Hide the modal
    bgModal.style.display = "none"
    //Add book to page

    if (val !== null) {
        val.firstElementChild.innerText = bookName
        val = null
        buton.innerHTML = "Add Book"
    } else {
        addBook(bookName)
    }
    //Clear input field content
    clear()
})

//Counter for books added
let counter = 0

//Function Declaration
let collectBookTitle = () => {
    bookTitle = inputField.value
    return bookTitle
}

let addBook = (title) => {
    counter++
    books.push(title)
    let bookContainer = document.createElement('div')
    bookContainer.innerHTML = `
        <div class="book" id = "book${counter}">
            <p contenteditable="true" id = "b-title${counter}">${title}</p>
            <p class="action">
                <span  class = "edit" id = "edit${counter}" onclick = "editTitle(this)"><i class="fas fa-edit"></i></span>
                <i class="far fa-window-close" id = "del${counter}" onclick = "delBook(this)"></i>
            </p>
        </div>
    `
    booksListing.append(bookContainer)

}

let clear = () => {
    document.querySelector("input").value = ""
}
 
let editTitle = (content) => {
   // let valueToEdit = document.querySelector()
   
 
    val = content.parentNode.parentNode.parentNode.firstElementChild
    let initialCoontent = val.innerText
    buton.innerHTML = "Change Title"
    bgModal.style.display =  "flex"
    inputField.value = initialCoontent






}



let delBook = (del) => {
    
    var id = document.getElementById(del.id);
    id.addEventListener('click', ()=>{
        var confirmDel = confirm('do you want to delete?');
        if (confirmDel){

            var toDel = id.parentElement.parentElement.parentElement;
            toDel.remove();
        } else {
            return;

        }
        

    })



}

//                 <span  class = "edit" id = "edit${counter}" onclick = "editTitle(this)"><i class="fas fa-edit"></i></span>
