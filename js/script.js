const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php';
let key = '7aPvC';
let maxAttempts = 5;

/*
(async () => {
    key = await getKey();

})();
*/

// events
document.querySelector('button').addEventListener('click', async () => {

    // get inputs
    let author = document.querySelector('#author').value;
    let title = document.querySelector('#title').value;
    
    await createBook(author, title)
    let books = await getBooks()
    updateUI(books);
})


function updateUI(books){
    
    let booksEl = document.querySelector('.books');
    
    booksEl.innerHTML = '';


    books.data.forEach(book => {

        let el = document.createElement('article');
        el.innerHTML = `
        <h1>${book.title}</h1>
        `;

        booksEl.appendChild(el);
    
    });
}

async function createBook(author, title){

    console.log('Creating Book...')

    let url = `${baseUrl}?op=insert&key=${key}&author=${author}&title=${title}`;


    try {

        for(let attempt = 0; attempt < maxAttempts; attempt++){
       
            let resp = await fetch(url);
            let data = await resp.json();
            
            if(data.status == 'error'){
                console.error(`Error on attemp ${attempt}. Msg: ${data.message}`)

            } else {
                console.log('Book Added!')
                return data
            }
        }

        return []

    } catch(error) {
        console.error(error)
    }

};


async function getBooks(){
    
    console.log('Getting Books...')

    let url = `${baseUrl}?op=select&key=${key}`;

    try {

        for(let attempt = 0; attempt < maxAttempts; attempt++){

            let resp = await fetch(url);
            let data = await resp.json();
            

            if(data.status == 'error'){
                console.error(`Error on attemp ${attempt}. Msg: ${data.message}`)
                
            } else {
                console.log('Returning Books.')
                return data
            }
        }

        return []

    } catch(error) {
        console.error(error)
    }
}

async function getKey(){

    console.log('Getting Key...')

    let url = `${baseUrl}?requestKey`;

    try {
        let resp = await fetch(url);
        let data = await resp.json();
        
        return data.key
        
    } catch(error) {
        console.error(error)
    }
}
