var btn_down = 0;
var systemstr = "";
var level = 1;
var userstr = "";

$(document).keydown(function() {
  if (btn_down === 0) {
    btn_down = 1;
    console.log("Game has started");
    game_start();
  }
});

function game_start() {
  $("h1").text("Level " + level);

  var rand_btn = Math.floor((Math.random() * 4) + 1);
  animate(rand_btn);
  play_sound(rand_btn);
  systemstr += rand_btn;
  userstr = "";
}

$(".btn1").click(function() {
  animatepress("1");
  userstr += 1;
  checkans();
})
$(".btn2").click(function() {
  animatepress("2");
  userstr += 2;
  checkans();
})
$(".btn3").click(function() {
  animatepress("3");
  userstr += 3;
  checkans();
})
$(".btn4").click(function() {
  animatepress("4");
  userstr += 4;
  checkans();
})

function checkans() {
  if (userstr.length === systemstr.length) {
    if (userstr != systemstr) {
      btn_down = 0;
      game_over();
    } else {
      level++;
      game_start();
    }
  } else {
    var len = userstr.length;
    if (systemstr[len - 1] != userstr[len - 1]) {
      btn_down = 0;
      game_over();
    }
  }
}

$(".btn").click(function() {
  if (btn_down == 0) {
    game_over();
  }
});

function game_over() {
  btn_down = 0;
  var audio = new Audio('sounds/game-over.wav');
  audio.play();
  level = 1;
  systemstr = "";
  $("h1").text("Game Over, Press Any Key to Restart");

  $('body').addClass('error').delay(200).queue(function(next) {
    $(this).removeClass('error');
    next();
  });
  console.log("error");

  $(document).keydown(function() {
    if (btn_down === 0) {
      btn_down = 1;
      console.log("Game has started");
      game_start();
    }
  });
}

function animate(num) {
  $(".btn" + num).animate({
    opacity: 0.5
  }).delay(100).animate({
    opacity: 1
  });
}

function play_sound(num) {
  var audio = new Audio("sounds/press-" + num + ".mp3");
  audio.play();
}

function animatepress(num) {
  $(".btn" + num).addClass("shadow").delay(100).queue(function(next) {
    $(".btn" + num).removeClass("shadow");
    next();
  });
}
