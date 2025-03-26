function fitElementToParent(el, padding = 0) {
      function resize() {
        anime.set(el, { scale: 1 });
        var parentEl = el.parentNode;
        var ratio = parentEl.offsetWidth / (el.offsetWidth - padding);
        anime.set(el, { scale: ratio });
      }
      resize();
      window.addEventListener('resize', resize);
    }

    var sphereAnimation = (function () {
      var sphereEl = document.querySelector('.sphere-animation');
      var spherePathEls = sphereEl.querySelectorAll('.sphere path');
      var pathLength = spherePathEls.length;
      var animations = [];

      fitElementToParent(sphereEl);

      var breathAnimation = anime({
        begin: function () {
          for (var i = 0; i < pathLength; i++) {
            animations.push(anime({
              targets: spherePathEls[i],
              stroke: { value: ['rgba(255,75,75,1)', 'rgba(80,80,80,.35)'], duration: 500 },
              translateX: [2, -4],
              translateY: [2, -4],
              easing: 'easeOutQuad',
              autoplay: false
            }));
          }
        },
        update: function (ins) {
          animations.forEach(function (animation, i) {
            var percent = (1 - Math.sin((i * 0.35) + (0.0022 * ins.currentTime))) / 2;
            animation.seek(animation.duration * percent);
          });
        },
        duration: Infinity,
        autoplay: false
      });

      var introAnimation = anime.timeline({
        autoplay: false
      }).add({
        targets: spherePathEls,
        strokeDashoffset: {
          value: [anime.setDashoffset, 0],
          duration: 3900,
          easing: 'easeInOutCirc',
          delay: anime.stagger(190, { direction: 'reverse' })
        },
        duration: 2000,
        delay: anime.stagger(60, { direction: 'reverse' }),
        easing: 'linear'
      });

      var shadowAnimation = anime({
        targets: '#sphereGradient',
        x1: '25%',
        x2: '25%',
        y1: '0%',
        y2: '75%',
        duration: 30000,
        easing: 'easeOutQuint',
        autoplay: false
      });

      function init() {
        introAnimation.play();
        breathAnimation.play();
        shadowAnimation.play();
      }

      init();
    })();