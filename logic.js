let apiQuotes = [];
// get quotes from APi

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader  = document.getElementById('loader');



function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function complete(){
quoteContainer.hidden = false;
loader.hidden = true;
}
//show new quote
function newQuote(){
    loading();
    // pick a random quote from apiquotes array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    //const quote = localQuote[Math.floor(Math.random()*localQuote.length)];
    //console.log(quote);
    // check if author field is blank and replace it with 'unknown'

    if(quote.author==null || !quote.author){
        authorText.textContent = 'Unknown';
    }else{
        authorText.textContent = quote.author;
    }
    
//check quote length to determine styling
if(quote.text.length > 30)
{
    quoteText.classList.add('long-quote');
}else{
    quoteText.classList.remove('long-quote');
}
    quoteText.textContent = quote.text;
    complete();
}


async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl); // just series of string complete we got
        apiQuotes = await response.json();
        newQuote();
        //console.log(apiQuotes[12]);
        
    }catch (error){

    }
}
// tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

newQuoteBtn.addEventListener('click',newQuote)
twitterBtn.addEventListener('click',tweetQuote);





// on load as soon as page load
getQuotes();
//loading();



 //newQuote();
