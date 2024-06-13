$(document).ready(function() {
  let numbers = [];
  let currentNumber = 1;
  let timer = 60;
  let attempts = 0;
  let bestResult = 60;
  let interval;

  function initializeGame() {
    for (let i = 1; i <= 25; i++) {
      numbers.push(i);
    }

    numbers.sort(function() {
      return 0.5 - Math.random();
    });

    for (let j = 0; j < 25; j++) {
      let randomNumber = numbers[j];
      let $numberBlock = $("<div class='number_block'>" + randomNumber + "</div>");

      $numberBlock.css({
        "font-size": (Math.floor(Math.random() * 10) + 20) + "px",
        "color": "#" + Math.floor(Math.random() * 16777215).toString(16)
      });
      $('.play-zone').append($numberBlock);
    }

    $('.number_block').click(function() {
      let number = parseInt($(this).text());
      if (number === currentNumber) {
        $(this).addClass('selected');
        currentNumber++;
        if (currentNumber === 26) {
          alert('Ви перемогли!');
          restartGame(true);
        }
      } else {
        alert('Не вірна цифра');
      }
    });

    $('#restart-game').on('click', function() {
      restartGame(false);
    });

    startTimer();
  }

  function startTimer() {
    interval = setInterval(function() {
      timer--;
      $('#timer').text(timer + ' секунд');
      if (timer === 0) {
        alert('Час вийшов!');
        restartGame(false);
      }
    }, 1000);
  }

  function restartGame(gameWon) {
    clearInterval(interval);
    attempts++;
    let timeTaken = timer;
    $('#result-table-body').append('<tr><td>' + attempts + '</td><td>' + (gameWon ? timeTaken + ' секунд' : 'Час вийшов') + '</td></tr>');

    numbers = [];
    currentNumber = 1;
    timer = 60;
    $('.number_block').removeClass('selected');
    initializeGame();
  }

  initializeGame();
});
