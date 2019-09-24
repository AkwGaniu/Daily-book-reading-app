var closeButton = document.querySelector(".close")
var bgModal = document.querySelector(".bg-modal")
var books = []
var booksListing = document.querySelector(".book-listing")
var inputField = document.querySelector("input")
var buton = document.querySelector(".button")
var val = null


document.addEventListener("DOMContentLoaded", e => {    
    addBookToPage()
})


closeButton.addEventListener("click", () => {
    bgModal.style.display = "none"
    buton.innerHTML = "Add Book"
    inputField.setAttribute("autofocus", "false")


})

document.querySelector("#add").addEventListener("click", () => {
    bgModal.style.display = "flex"
    inputField.setAttribute("autofocus", "true")
})

buton.addEventListener("click", () => {
    let  newArray = []
    let local
    let bookName = collectBookTitle()  //Get the book title

    bgModal.style.display = "none"      //Hide the modal

    if (val !== null) {     //Add book to page

        let editId = val.getAttribute("id") 
        editId = editId.substr(4, 2)    //Get the array index from the Id
        local = localStorageGet()   
        local = Object.entries(local)

        for ([key, value] of local) {
            if(key === editId) {
                local.splice(key, 1, bookName)  //Replace the current item
                newArray.push(bookName)
            } else {
                newArray.push(value)
            }
        }

        localStorageSet(newArray)
        val = null
        buton.innerHTML = "Add Book"
        clearInputField()
        document.location.reload(true)

    } else {

        addToLocalStorage(bookName)
        clearInputField()
    }
})


//Function Declaration
const localStorageGet = e => JSON.parse(localStorage.getItem("bookTitle"))
const localStorageSet = (items) => localStorage.setItem("bookTitle", JSON.stringify(items))

const collectBookTitle = () => {
    bookTitle = inputField.value
    return bookTitle
}

const addToLocalStorage = (title) => {
    let booksToLocalStorage
    let getItem
    // Check if Local storage property exists
    if (localStorage.hasOwnProperty("bookTitle")) {

        getItem = localStorageGet()
        getItem.push(title)
        localStorageSet(getItem)
        document.location.reload(true)  //Reload page to reeflect changes

    } else {
        books.push(title)
        localStorageSet(books)
        document.location.reload(true)  //Reload page to reeflect changes
    }
}

const addBookToPage = () => {
    let bookContainer
    let existingBooks = localStorageGet()

    existingBooks = Object.entries(existingBooks)   //Convert Local storage entries from objeect to array

    for ([key, value] of existingBooks) {   //Loop through the array and do something
        
        bookContainer = document.createElement('div')
        bookContainer.innerHTML = `
        <div class="book" id = "book${key}">
            <p contenteditable="true" id = "b-title${key}">${value}</p>
            <p class="action">
                <span  class = "edit" id = "edit${key}" onclick = "editTitle(this)"><i class="fas fa-edit"></i></span>
                <i class="far fa-window-close" id = "del${key}" onclick = "delBook(this)"></i>
            </p>
        </div>
    `
    booksListing.append(bookContainer)
    }
    
}

const clearInputField = () => {
    document.querySelector("input").value = ""
}
 
const delBook = (del) => {
    let newArray = []
    let editId
    let local
    let confirmDel = confirm('Are you sure you want to Delete this entry?');


    val = del.parentNode.parentNode.parentNode.firstElementChild
    editId = val.getAttribute("id")
    editId = editId.substr(4, 2)
    local = localStorageGet()   //Get the Items in the local storage
    local = Object.entries(local)

    if (confirmDel){
        for ([key, value] of local) {
            if(key === editId) {
                local.splice(key, 0)
            } else {
                newArray.push(value)
            }
        }
        
        localStorageSet(newArray)
        newArray= []
        document.location.reload(true)
    } else {
        return;
    }
}



const editTitle = (content) => {    
    let = content.parentNode.parentNode.parentNode.firstElementChild
    let initialCoontent = val.innerText

    buton.innerHTML = "Update"
    bgModal.style.display =  "flex"
    inputField.value = initialCoontent
}
