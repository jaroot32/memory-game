/*
 * Create a list that holds all of your cards
 */

// game board consists of sixteen "cards" arranged in a grid.

// let ul = document.getElementsByClassName("card");
let deck = document.getElementById("random-deck");
let count = 0;
let match = 0;
let moves = 0;
// let cards = document.getElementsByClassName("fa");

let time = document.getElementById("time");
let num = 60;

let interval = setInterval(function() {
  
  time.innerHTML = num.toString()

  num--

  if (num < 0) {
    
    clearInterval(interval)
    time.innerHTML = "Game Over"
    
  }


}, 1000)


let cards = ["fa-diamond", "fa-diamond",
            "fa-paper-plane-o", "fa-paper-plane-o",
            "fa-anchor", "fa-anchor",
            "fa-bolt", "fa-bolt",
            "fa-cube", "fa-cube",
            "fa-leaf", "fa-leaf",
            "fa-bicycle", "fa-bicycle",
            "fa-bomb", "fa-bomb"];

function generateCards(c) {
  let cards = c.map((elem) => {
      return  `<li class="card">
                <i class="fa ${elem}" data-card="${elem}"></i>
              </li>`
    });
    
    let joined = cards.join('')

   return joined
}

deck.innerHTML = generateCards(cards);

// let arr = function(c) {
//     let a = [];
//     for (let elem of c) {
//         a.push(elem);
//     }
//     return a
// };


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//  function display(a) {
//      for (let elem of a) {
//         deck.append(elem)
//      }
//  }

//  display(shuffled_cards);

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



deck.addEventListener("click", function(e) {     
    console.log(e.target.firstElementChild)
    let t = e.target
    if (!t.classList.contains("open") && !t.classList.contains("show") && !t.classList.contains("match")) {
        if (target_arr.length < 2) {
        t.classList.add("open", "show")
        target_arr.push(t)
        } else {
            e.cancelBubble = true;
            e.stopPropagation();
        }
        
        console.log(target_arr)
    if (target_arr.length === 2) {
     
        e.preventDefault();
        
     
        if (target_arr[0].firstElementChild.dataset.card === target_arr[1].firstElementChild.dataset.card) {
            target_arr.forEach(elem => {
                elem.classList.add("match", "open", "show")
            })
            match++
            moves++
            target_arr = [];
        } else {
            console.log("else is working")
            setTimeout(function(){
                target_arr[0].classList.remove("open", "show");
                target_arr[1].classList.remove("open", "show");
                target_arr = [];
            }, 2000);
          
        }
    } 
}
     
    
 });

 // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 