/*
カーソルに追従するアニメーション
*/

CursorFollower();  //関数の使用

function CursorFollower(){
  let $cursor = $('.cursor'),
      $follower = $('.follower span'),
      cWidth = $cursor.width(),
      mouseX = 0,
      mouseY = 0,
      followX = 0,
      followY = 0,
      delay = 4,
      isFirstClick = true;

  // マウス座標の取得
  $(document).on("mousemove", function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  // クリックイベントでのアニメーション
  $(document).on("click", function(e) {
    if (isFirstClick) {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
      isFirstClick = false;
    }
    createDroplet(followX, followY);
  });

  // カーソルの遅延アニメーション
  TweenMax.to({}, .001, {
    repeat: -1,
    onRepeat: function() {
      followX += (mouseX - followX) / delay;
      followY += (mouseY - followY) / delay;
      
      TweenMax.set($follower, {
        css: {
          left: followX - ($follower.width() / 2),
          top: followY - ($follower.height() / 2)
        }
      });

      TweenMax.set($cursor, {
        css: {
          left: mouseX - (cWidth / 2),
          top: mouseY - (cWidth / 2)
        }
      });
    }
  });
}

function getRandomColor() {
  const colors = [
    '#3faac0', // 水色
    '#3faac0',
    '#4ee9df',
    '#58f4ba',
    '#5398f8',
    '#5afb90'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createDroplet(x, y) {
  const $droplet = $('<div class="droplet"></div>');
  const randomColor = getRandomColor();
  $('body').append($droplet);
  
  $droplet.css({
    left: x - 100,
    top: y - 100,
    backgroundColor: randomColor
  });

  TweenMax.to($droplet, 1, {
    scale: 3,
    opacity: 0,
    ease: Power1.easeOut,
    onComplete: function() {
      $droplet.remove();
    }
  });
}