document.addEventListener('DOMContentLoaded', function () {

  let deck = document.getElementById("random-deck"),
  stars_list = document.getElementById("stars"),
  moves_elem = document.getElementById("moves"),
  matches_elem = document.getElementById("matches"),
  matches = 0,
  moves = 0,
  time = document.getElementById("time"),
  num,
  stars = [],
  modalWin = document.getElementById("myModalWin"),
  modalLost = document.getElementById("myModalLose"),
  totalLost,
  btn_lost,
  close_lost,
  repeat = document.getElementById("repeat"),
  interval, 
  pause;

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

  function losing() {
    
    close_lost = document.getElementById("close-lost")

    // When the user clicks on <span> (x), close the modal
    close_lost.onclick = function() {
      modalLost.style.display = "none";
    } 
    
    modalLost.style.display = "block";
    totalLost = document.getElementById("totalLost");
    totalLost.innerHTML = "";
    totalLost.innerHTML = `You took ${moves} moves, and you have ${matches} matches.`;
    btn_lost = document.getElementById("btn-lost");
    btn_lost.onclick = init;

  }

  function winning() {
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

  function callback() {
      
    time.innerHTML = num.toString();

    num--

    if (num < 0) {
      
      clear()
      time.innerHTML = "Game Over"
      losing()
        
    }

  }

  function timer() {
    interval = setInterval(callback, 1000);
  }
    

  function clear() {
    pause = clearInterval(interval)
  }

    repeat.addEventListener("click", function() { 
      num = 60;
      clear()
      init();
    });
    
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
      
    let currentIndex = array.length, temporaryValue, randomIndex;

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

    if (target_arr[0].className.indexOf("match") > -1) {
      target_arr = []
      return;
    
    }

    
    setTimeout(function(){

      if (typeof target_arr[0] === "undefined") {
        target_arr.push(card)
        return;
      }
              
      target_arr[0].className = "card"
    
      card.className = "card";
    
      target_arr = [];
      
    }, 750);

  }

  function incrementMoves() {
    
    moves++
    moves_elem.innerHTML = moves.toString();
    
    if (moves % 3 === 0) {
    
      stars.pop();
      let stars_string = stars.join('');
      stars_list.innerHTML = stars_string
    
    }

    if (stars.length <= 0) {
      
      clear()
      losing()
    
    }

  }

  function matchedCard() {
    
    matches++        
    matches_elem.innerHTML = matches.toString();
  
    if (matches === 8) {
      clear()
      winning()
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
      
    incrementMoves();

    let t = e.target;
    
    if (t.nodeName !== "LI" || t.className.indexOf("match") > -1) {
      return;
      } else {
        showCard(t)
        checkMatch(t);
      }  
      
  };

  function init() {
    modalLost.style.display = "none";
    modalWin.style.display = "none";
    matches = 0;
    moves = 0;
    moves_elem.innerHTML = moves.toString();
    matches_elem.innerHTML = matches.toString();
    target_arr = [];
    num = 60;
    timer()
    stars = [];
    stars_list.innerHTML = "";
    generateStars();
    deck.innerHTML = "";
    deck.innerHTML = generateCards(cards);
  }

  window.onload = init;

});