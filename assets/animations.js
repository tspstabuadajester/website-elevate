(function () {
  var HERO_TIMEOUT_MS = 2500;

  function isVisible(el) {
    return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  }

  function hasSrc(img) {
    var src = img.getAttribute('src');
    return src && src.length > 0;
  }

  function waitForImage(img) {
    if (!hasSrc(img) || !isVisible(img)) {
      return Promise.resolve();
    }
    if (img.complete && img.naturalWidth > 0) {
      return Promise.resolve();
    }

    return new Promise(function (resolve) {
      function done() {
        img.removeEventListener('load', done);
        img.removeEventListener('error', done);
        resolve();
      }
      img.addEventListener('load', done);
      img.addEventListener('error', done);
    });
  }

  function waitForHeroCritical() {
    var promises = [];
    var heroPoster = document.getElementById('hero-image');

    if (heroPoster) {
      promises.push(waitForImage(heroPoster));
    }

    if (!promises.length) {
      return Promise.resolve();
    }

    return Promise.race([
      Promise.all(promises),
      new Promise(function (resolve) {
        setTimeout(resolve, HERO_TIMEOUT_MS);
      })
    ]);
  }

  function initRevealAnimations() {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    document.querySelectorAll('.reveal-stagger').forEach(function (parent) {
      parent.querySelectorAll('.reveal').forEach(function (el, i) {
        el.style.transitionDelay = Math.min(i * 0.08, 0.64) + 's';
      });
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  function startHeroAnimations() {
    document.body.classList.add('assets-ready');
    document.dispatchEvent(new CustomEvent('elevate:animations-ready'));
  }

  document.addEventListener('elevate:content-rendered', function () {
    initRevealAnimations();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      startHeroAnimations();
      return;
    }

    waitForHeroCritical().then(startHeroAnimations);
  });
})();
