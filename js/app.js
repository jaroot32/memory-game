document.addEventListener('DOMContentLoaded', function () {
  console.log('the DOM is ready to be interacted with!');


let deck = document.getElementById("random-deck");
let stars_list = document.getElementById("stars");
let moves_elem = document.getElementById("moves");
let matches_elem = document.getElementById("matches");
let matches = 0;
let moves = 0;
let time = document.getElementById("time");
let num = 5;
let stars = [];
let modalWin = document.getElementById("myModalWin");
let modalLost = document.getElementById("myModalLose");
let total;
let totalLost;
let close_lost;
/*
 * Create a list that holds all of your cards
 */

let cards = ["fa-diamond", "fa-diamond",
            "fa-paper-plane-o", "fa-paper-plane-o",
            "fa-anchor", "fa-anchor",
            "fa-bolt", "fa-bolt",
            "fa-cube", "fa-cube",
            "fa-leaf", "fa-leaf",
            "fa-bicycle", "fa-bicycle",
            "fa-bomb", "fa-bomb"];

function generateStars() {
  
  for ( let i = 0; i < 4; i++) {
    stars.push(`<li><i class="fa fa-star"></i></li>`);
  } 
  stars_list.innerHTML = stars.join('')
}

function timer() {
  let interval = setInterval(function() {
    
    time.innerHTML = num.toString();

    num--

    if (num < 0) {
      
      clearInterval(interval)
      time.innerHTML = "Game Over"
      
      close_lost = document.getElementById("close-lost")

      // When the user clicks on <span> (x), close the modal
      close_lost.onclick = function() {
        modalLost.style.display = "none";
      } 
      
      let btn_lost
      modalLost.style.display = "block";
      totalLost = document.getElementById("totalLost");
      totalLost.innerHTML = "";
      totalLost.innerHTML = `You took ${moves} moves, and you have ${matches} matches.`;
      btn_lost = document.getElementById("btn-lost");
      btn_lost.onclick = init
      
      
    }


  }, 1000);

}
   
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */        

function generateCards(c) {
  let cards = c.map((elem) => {
      return  `<li class="card">
                <i class="fa ${elem}" data-card="${elem}"></i>
              </li>`
    });
    let shuffled_cards = shuffle(cards)
    let joined = shuffled_cards.join('')

   return joined
}



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let target_arr = [];

function showCard(card) {
  card.classList.add("open", "show")
}

function lockCard(card) {

  target_arr[0].classList.add("match");
  card.classList.add("match");

  matchedCard();
}

function hideCard(card) {
  
  incrementMoves();
  if (target_arr[0].className.indexOf("match") > -1) {
    target_arr = []
    return;
  }

  
  setTimeout(function(){
    if (typeof target_arr[0] === "undefined") {
      target_arr.push(card)
      return
    }
             
    target_arr[0].className = "card"
   
    card.className = "card";
  
    target_arr = [];
    
    
   
}, 1000);




}

function incrementMoves() {
  moves++
  moves_elem.innerHTML = moves.toString();
  if (moves % 3 === 0) {
    stars.pop()
    let stars_string = stars.join('')
    stars_list.innerHTML = stars_string
  }
}

function matchedCard() {
  matches++        
  matches_elem.innerHTML = matches.toString();
 
  if (matches === 8) {
    // Get the <span> element that closes the modal
    span = document.getElementById("close-won");

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modalWin.style.display = "none";
    }
    // When the user clicks on the button, open the modal
     // Get the modal
     
    
    modalWin.style.display = "block";
    let total = document.getElementById("total");
    total.innerHTML = `You took ${moves} moves, and you have ${matches} matches.`;
    let btn = document.getElementById("myBtn");
    btn.onclick = init;
    window.onclick = function(event) {
      if (event.target == modalWin) {
        modalWin.style.display = "none";
      }
    } 
  }
}

function checkMatch(card) {

  if (target_arr.length === 1) {
    if (target_arr[0] === card) {
      return;
    }
    if (typeof target_arr[0] === "undefined") {
      return
    }
    incrementMoves();
    if (target_arr[0].firstElementChild.dataset.card === card.firstElementChild.dataset.card) {
      lockCard(card)
    } else {
      hideCard(card)
    }
  } 

  if (target_arr.length < 1) {
    target_arr.push(card)
  } else {
    return;
  }
  
}

deck.onclick = function(e) {

      
  let t = e.target
   
  if (t.nodeName !== "LI" || t.className.indexOf("match") > -1) {
     return;
    } else {
      showCard(t)
      checkMatch(t);
    }  
    
 };

// When the user clicks anywhere outside of the modal, close it 

if (stars.length === 0) {
  // Get the <span> element that closes the modal
  close_lost = document.getElementById("close-lost");

  // When the user clicks on <span> (x), close the modal
  close_lost.onclick = function() {
    modal.style.display = "none";
  } 
  modalLost = document.getElementById("myModalLose");
  modalLost.style.display = "block";
  let total = document.getElementById("total");
  total.innerHTML = `You took ${moves} moves, and you have ${matches} matches.`;
  let btn = document.getElementById("myBtn");
  btn.onclick = init;
  
}


function init() {
  modalLost.style.display = "none";
  modalWin.style.display = "none";
  matches = 0;
  moves = 0;
  moves_elem.innerHTML = moves.toString();
  matches_elem.innerHTML = matches.toString();
  target_arr = [];
  // num = 60;
  num = 60;
  stars = [];
  stars_list.innerHTML = "";
  timer()
  generateStars()
  deck.innerHTML = "";
  deck.innerHTML = generateCards(cards);
}

window.onload = init;

});