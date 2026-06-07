(function () {
  var SERVICE_ICONS = {
    star: '<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 2.9 6 6.6.9-4.8 4.7 1.1 6.6L12 17.2l-5.8 3 1.1-6.6-4.8-4.7 6.6-.9L12 2Z"/></svg>',
    panic: '<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm3.7 6.3-2.3 3.7 2.3 3.7h-2.4L12 13.6l-1.3 2.1H8.3l2.3-3.7-2.3-3.7h2.4l1.3 2.1 1.3-2.1h2.4Z"/></svg>',
    anxiety: '<svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3 2.4 5 5.6.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9 5.6-.8L12 3Z"/></svg>',
    bipolar: '<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/></svg>',
    depression: '<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4h10a3 3 0 0 1 3 3v3c0 5-4 9-8 10-4-1-8-5-8-10V7a3 3 0 0 1 3-3Zm2 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm6 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-6 7h6v-2H9v2Z"/></svg>',
    ocd: '<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2ZM8 8.8 9.4 7.4 12 10l2.6-2.6L16 8.8 13.4 11.4 16 14l-1.4 1.4L12 12.8l-2.6 2.6L8 14l2.6-2.6L8 8.8Z"/></svg>',
    ptsd: '<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-7.2 17l1.4-1.4A8 8 0 1 1 12 20v2a10 10 0 0 0 0-20ZM7 11h2v2H7v-2Zm4 0h2v2h-2v-2Zm4 0h2v2h-2v-2Z"/></svg>',
    psychosis: '<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM8 8l2 2-2 2-1.4-1.4L7.2 10l-.6-.6L8 8Zm8 0 1.4 1.4-.6.6.6.6L16 12l-2-2 2-2Zm-6 8h4v2h-4v-2Z"/></svg>'
  };

  function getIconMarkup(key) {
    return SERVICE_ICONS[key] || SERVICE_ICONS.star;
  }

  function setText(el, value) {
    if (el && value != null) el.textContent = value;
  }

  function setHtml(el, value) {
    if (el && value != null) el.innerHTML = value;
  }

  function renderNav(nav) {
    var container = document.getElementById('nav-links');
    if (!container || !nav.links) return;
    container.innerHTML = nav.links.map(function (link) {
      var suffix = link.suffix
        ? ' <span class="ml-0.5 text-xs">' + link.suffix + '</span>'
        : '';
      return '<a class="transition hover:text-elevate-700" href="' + link.href + '">' + link.label + suffix + '</a>';
    }).join('');

    var cta = document.getElementById('nav-cta');
    if (cta && nav.ctaLabel) {
      cta.textContent = nav.ctaLabel;
      cta.href = nav.ctaHref || '#appointment';
    }
  }

  function renderLogos(site) {
    document.querySelectorAll('[data-logo]').forEach(function (img) {
      img.src = site.logo;
      img.alt = site.brandName;
    });
  }

  function renderHero(hero) {
    setText(document.getElementById('hero-badge'), hero.badge);
    setText(document.getElementById('hero-headline'), hero.headline);
    setText(document.getElementById('hero-description'), hero.description);

    var primary = document.getElementById('hero-cta-primary');
    if (primary && hero.primaryCta) {
      primary.textContent = hero.primaryCta.label;
      primary.href = hero.primaryCta.href;
    }

    var secondary = document.getElementById('hero-cta-secondary');
    if (secondary && hero.secondaryCta) {
      secondary.textContent = hero.secondaryCta.label;
      secondary.href = hero.secondaryCta.href;
    }

    var video = document.getElementById('hero-video');
    var img = document.getElementById('hero-image');
    var posterSrc = (hero.video && hero.video.poster) || (hero.image && hero.image.src) || '';
    var altText =
      (hero.video && hero.video.alt) ||
      (hero.image && hero.image.alt) ||
      '';

    if (img) {
      if (posterSrc) img.src = posterSrc;
      img.alt = altText;
      if (hero.image && hero.image.width) img.width = hero.image.width;
      if (hero.image && hero.image.height) img.height = hero.image.height;
    }

    if (video && hero.video && hero.video.src) {
      video.src = hero.video.src;
      if (posterSrc) video.poster = posterSrc;
      video.setAttribute('aria-label', altText);

      var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        video.removeAttribute('autoplay');
        video.pause();
        video.classList.add('hero-video--static');
        if (img) img.classList.add('hero-poster--visible');
      } else {
        video.classList.remove('hero-video--static');
        if (img) img.classList.remove('hero-poster--visible');
        video.play().catch(function () {
          if (img) img.classList.add('hero-poster--visible');
        });
      }
    } else if (video) {
      video.classList.add('hero-video--static');
      if (img) img.classList.add('hero-poster--visible');
    } else if (img && hero.image) {
      img.src = hero.image.src;
      img.alt = hero.image.alt;
    }
  }

  var serviceItems = [];

  function truncateText(text, max) {
    if (!text || text.length <= max) return text;
    return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
  }

  function renderServices(services) {
    setText(document.getElementById('services-kicker'), services.kicker);
    setText(document.getElementById('services-heading'), services.heading);
    setText(document.getElementById('services-intro'), services.detailPlaceholder);
    setHtml(document.getElementById('services-footnote'), services.footnote);

    var list = document.getElementById('services-list');
    if (!list || !services.items) return;

    serviceItems = services.items;
    var viewLabel = services.viewDetailsLabel || 'View details';

    list.innerHTML = services.items.map(function (item) {
      var teaser = truncateText(item.detail, 100);
      return (
        '<button type="button" class="reveal service-card" role="listitem"' +
        ' data-service-id="' + item.id + '"' +
        ' aria-haspopup="dialog"' +
        ' aria-controls="service-modal">' +
        '<div class="service-card__rings" aria-hidden="true">' +
        '<span class="service-card__ring service-card__ring--1"></span>' +
        '<span class="service-card__ring service-card__ring--2"></span>' +
        '<span class="service-card__ring service-card__ring--3"></span>' +
        '</div>' +
        '<div class="service-card__icon" aria-hidden="true">' + getIconMarkup(item.icon) + '</div>' +
        '<div class="service-card__body">' +
        '<span class="service-card__title">' + item.title + '</span>' +
        '<p class="service-card__teaser">' + teaser + '</p>' +
        '</div>' +
        '<span class="service-card__action">' + viewLabel +
        '<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">' +
        '<path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h9.69l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd"/>' +
        '</svg></span>' +
        '</button>'
      );
    }).join('');

    initServiceModal(services);
  }

  function initServiceModal(services) {
    var modal = document.getElementById('service-modal');
    var iconTarget = document.getElementById('service-modal-icon');
    var titleTarget = document.getElementById('service-modal-title');
    var textTarget = document.getElementById('service-modal-text');
    var cta = document.getElementById('service-modal-cta');
    var cards = document.querySelectorAll('.service-card[data-service-id]');
    var lastFocused = null;

    if (!modal || !cards.length) return;

    if (cta && services.modalCta) {
      cta.href = services.modalCta.href || '#appointment';
      var ctaLabel = cta.querySelector('[data-cta-label]');
      if (ctaLabel) ctaLabel.textContent = services.modalCta.label;
    }

    function openModal(serviceId) {
      var service = serviceItems.find(function (item) {
        return item.id === serviceId;
      });
      if (!service) return;

      var card = document.querySelector('.service-card[data-service-id="' + serviceId + '"]');
      var iconSource = card && card.querySelector('.service-card__icon');

      if (iconSource) iconTarget.innerHTML = iconSource.innerHTML;
      titleTarget.textContent = service.title;
      textTarget.textContent = service.detail;

      lastFocused = document.activeElement;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('service-modal-open');
      modal.querySelector('.service-modal__close').focus();
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('service-modal-open');
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
    }

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        openModal(card.dataset.serviceId);
      });
    });

    modal.querySelectorAll('[data-modal-close]').forEach(function (el) {
      el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('is-open')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      }
    });
  }

  function renderAbout(about) {
    var img = document.getElementById('about-image');
    if (img && about.image) {
      img.src = about.image.src;
      img.alt = about.image.alt;
      if (about.image.width) img.width = about.image.width;
      if (about.image.height) img.height = about.image.height;
    }

    setText(document.getElementById('about-kicker'), about.kicker);
    setText(document.getElementById('about-heading'), about.heading);

    var paragraphs = document.getElementById('about-paragraphs');
    if (paragraphs && about.paragraphs) {
      paragraphs.innerHTML = about.paragraphs.map(function (p, i) {
        var mt = i === 0 ? 'mt-5' : 'mt-4';
        return '<p class="' + mt + ' leading-7 text-slate-600">' + p + '</p>';
      }).join('');
    }

    var highlights = document.getElementById('about-highlights');
    if (highlights && about.highlights) {
      highlights.innerHTML = about.highlights.map(function (label) {
        return (
          '<div class="flex items-center gap-2.5">' +
          '<span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-elevate-100 text-xs font-bold text-elevate-600">✓</span>' +
          '<span class="text-sm font-semibold text-elevate-900">' + label + '</span>' +
          '</div>'
        );
      }).join('');
    }

    var cta = document.getElementById('about-cta');
    if (cta && about.cta) {
      cta.href = about.cta.href;
      var labelNode = cta.querySelector('[data-cta-label]');
      if (labelNode) labelNode.textContent = about.cta.label;
    }
  }

  function renderTestimonials(section) {
    setText(document.getElementById('testimonials-kicker'), section.kicker);
    setText(document.getElementById('testimonials-heading'), section.heading);

    var grid = document.getElementById('testimonials-grid');
    if (!grid || !section.items) return;

    grid.innerHTML = section.items.map(function (item) {
      return (
        '<article class="reveal testimonial-card flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-card">' +
        '<div class="text-sm tracking-wide text-elevate-500">★★★★★</div>' +
        '<p class="mt-4 flex-1 text-sm leading-7 text-slate-600">' + item.quote + '</p>' +
        '<p class="mt-5 font-bold text-elevate-700">' + item.author + '</p>' +
        '</article>'
      );
    }).join('');
  }

  function renderPayment(payment) {
    setText(document.getElementById('payment-kicker'), payment.kicker);
    setText(document.getElementById('payment-heading'), payment.heading);

    var insurers = document.getElementById('payment-insurers');
    if (insurers && payment.insurers) {
      insurers.innerHTML = payment.insurers.map(function (insurer) {
        if (insurer.html) {
          return '<span class="' + insurer.className + '">' + insurer.html + '</span>';
        }
        return '<span class="' + insurer.className + '">' + insurer.name + '</span>';
      }).join('');
    }

    var billPay = document.getElementById('payment-bill-pay');
    if (billPay && payment.billPay) {
      billPay.href = payment.billPay.href;
      var label = billPay.querySelector('[data-cta-label]');
      if (label) label.textContent = payment.billPay.label;
    }
  }

  function renderFaq(faq) {
    setText(document.getElementById('faq-heading'), faq.heading);

    var list = document.getElementById('faq-list');
    if (!list || !faq.items) return;

    list.innerHTML = faq.items.map(function (item) {
      var openAttr = item.open ? ' open' : '';
      var revealClass = item.open ? 'reveal ' : 'reveal ';
      return (
        '<details class="' + revealClass + 'group rounded-xl border border-slate-200 bg-white"' + openAttr + '>' +
        '<summary class="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-bold text-elevate-900">' +
        item.question +
        '<span class="text-lg text-elevate-500 transition group-open:rotate-180">⌄</span></summary>' +
        '<p class="border-t border-slate-100 px-5 pb-4 pt-0 leading-7 text-slate-600">' + item.answer + '</p>' +
        '</details>'
      );
    }).join('');
  }

  function renderCtaPanel(panel) {
    setText(document.getElementById('cta-heading'), panel.heading);
    setText(document.getElementById('cta-description'), panel.description);

    var btn = document.getElementById('cta-button');
    if (btn && panel.button) {
      btn.href = panel.button.href;
      var label = btn.querySelector('[data-cta-label]');
      if (label) label.textContent = panel.button.label;
    }

    var features = document.getElementById('cta-features');
    if (features && panel.features) {
      var icons = [
        '<svg class="h-6 w-6 shrink-0 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>',
        '<svg class="h-6 w-6 shrink-0 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>',
        '<svg class="h-6 w-6 shrink-0 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>'
      ];
      features.innerHTML = panel.features.map(function (text, i) {
        return (
          '<div class="flex flex-col items-start gap-2 sm:items-center sm:text-center">' +
          (icons[i] || icons[0]) +
          '<p class="text-xs font-semibold leading-snug">' + text + '</p></div>'
        );
      }).join('');
    }
  }

  function renderFooter(footer, site) {
    setText(document.getElementById('footer-description'), footer.description);
    setText(document.getElementById('footer-copyright'), site.copyright);

    function renderFooterLocation(key) {
      var location = footer.locations && footer.locations[key];
      var titleEl = document.getElementById('footer-' + key + '-title');
      var listEl = document.getElementById('footer-' + key + '-list');
      if (!titleEl || !listEl || !location) return;

      titleEl.textContent = location.title;
      var html = location.addresses.map(function (addr) {
        return (
          '<li class="flex gap-2">' +
          '<svg class="mt-0.5 h-4 w-4 shrink-0 text-elevate-300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"/></svg>' +
          '<span>' + addr + '</span></li>'
        );
      }).join('');
      if (location.email) {
        html +=
          '<li class="flex gap-2">' +
          '<svg class="mt-0.5 h-4 w-4 shrink-0 text-elevate-300" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v.01L12 13l8-6.99V6H4Zm0 12h16V9.25l-7.4 6.45a1 1 0 0 1-1.2 0L4 9.25V18Z"/></svg>' +
          '<a href="' + location.email.href + '" class="hover:text-white">' + location.email.label + '</a></li>';
      }
      listEl.innerHTML = html;
    }

    renderFooterLocation('address1');
    renderFooterLocation('address2');

    var quickLinks = document.getElementById('footer-quick-links');
    if (quickLinks && footer.quickLinks) {
      quickLinks.innerHTML = footer.quickLinks.map(function (link) {
        return '<a class="block hover:text-white" href="' + link.href + '">' + link.label + '</a>';
      }).join('');
    }
  }

  function setMetaContent(selector, value) {
    var el = document.querySelector(selector);
    if (!el || value == null || value === '') return;
    el.setAttribute('content', value);
  }

  function setCanonicalUrl(href) {
    var el = document.querySelector('link[rel="canonical"]');
    if (!el) return;
    if (href) {
      el.setAttribute('href', href);
    } else {
      el.removeAttribute('href');
    }
  }

  function renderSeo(seo, site) {
    var siteTitle = site && site.title ? site.title : '';
    if (!seo) {
      if (siteTitle) {
        document.title = siteTitle;
        var fallbackTitle = document.querySelector('title');
        if (fallbackTitle) fallbackTitle.textContent = siteTitle;
      }
      return;
    }

    var title = seo.title || siteTitle;
    var description = seo.description || '';
    var robots = seo.robots || 'index,follow';
    var canonical = seo.canonicalUrl || '';

    var ogTitle = seo.ogTitle || title;
    var ogDescription = seo.ogDescription || description;
    var ogImage = seo.ogImage || '';

    var twitterTitle = seo.twitterTitle || ogTitle || title;
    var twitterDescription = seo.twitterDescription || ogDescription || description;
    var twitterImage = seo.twitterImage || ogImage || '';

    if (title) {
      document.title = title;
      var titleEl = document.querySelector('title');
      if (titleEl) titleEl.textContent = title;
    }

    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[name="robots"]', robots);
    setCanonicalUrl(canonical);

    setMetaContent('meta[property="og:title"]', ogTitle);
    setMetaContent('meta[property="og:description"]', ogDescription);
    if (ogImage) setMetaContent('meta[property="og:image"]', ogImage);
    if (canonical) setMetaContent('meta[property="og:url"]', canonical);

    setMetaContent('meta[name="twitter:title"]', twitterTitle);
    setMetaContent('meta[name="twitter:description"]', twitterDescription);
    if (twitterImage) setMetaContent('meta[name="twitter:image"]', twitterImage);
  }

  var ABOUT_FEATURE_ICONS = {
    team: '<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    target: '<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    shield: '<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>'
  };

  function getAboutFeatureIcon(key) {
    return ABOUT_FEATURE_ICONS[key] || ABOUT_FEATURE_ICONS.team;
  }

  function renderAboutHero(pageHero) {
    setText(document.getElementById('page-hero-heading'), pageHero.heading);
    setText(document.getElementById('page-hero-intro'), pageHero.intro);

    var gallery = document.getElementById('about-gallery');
    if (!gallery || !pageHero.gallery) return;

    gallery.innerHTML = pageHero.gallery.map(function (item, i) {
      return (
        '<figure class="reveal about-gallery__item about-gallery__item--' + (i + 1) + '">' +
        '<img src="' + item.src + '" alt="' + (item.alt || '') + '" loading="lazy" decoding="async" />' +
        '</figure>'
      );
    }).join('');
  }

  function renderAboutMission(mission) {
    setText(document.getElementById('mission-heading'), mission.heading);

    var columns = document.getElementById('mission-columns');
    if (!columns || !mission.columns) return;

    columns.innerHTML = mission.columns.map(function (text) {
      return '<p class="reveal text-sm leading-7 text-slate-600 sm:text-base">' + text + '</p>';
    }).join('');
  }

  function renderAboutFounder(founder) {
    var img = document.getElementById('founder-image');
    if (img && founder.image) {
      img.src = founder.image.src;
      img.alt = founder.image.alt;
      if (founder.image.width) img.width = founder.image.width;
      if (founder.image.height) img.height = founder.image.height;
    }

    if (founder.quoteCard) {
      setText(document.getElementById('founder-quote-text'), '"' + founder.quoteCard.text + '"');
      setText(document.getElementById('founder-quote-attribution'), founder.quoteCard.attribution);
    }

    setText(document.getElementById('founder-heading'), founder.heading);
    setText(document.getElementById('founder-paragraph'), founder.paragraph);
    setText(document.getElementById('founder-blockquote'), founder.blockquote);
  }

  function renderAboutFeatures(features) {
    setText(document.getElementById('features-heading'), features.heading);
    setText(document.getElementById('features-intro'), features.intro);

    var grid = document.getElementById('features-grid');
    if (!grid || !features.items) return;

    grid.innerHTML = features.items.map(function (item) {
      return (
        '<article class="reveal about-feature-card">' +
        '<div class="about-feature-card__icon" aria-hidden="true">' + getAboutFeatureIcon(item.icon) + '</div>' +
        '<h3 class="about-feature-card__title">' + item.title + '</h3>' +
        '<p class="about-feature-card__text">' + item.description + '</p>' +
        '</article>'
      );
    }).join('');
  }

  function renderTestimonialsSection(section) {
    setText(document.getElementById('testimonials-heading'), section.heading);

    var grid = document.getElementById('testimonials-grid');
    if (!grid || !section.items) return;

    grid.innerHTML = section.items.map(function (item) {
      var authorLine = item.author;
      if (item.detail) authorLine += ', ' + item.detail;

      return (
        '<article class="reveal about-testimonial-card">' +
        '<div class="about-testimonial-card__quote" aria-hidden="true">“</div>' +
        '<p class="about-testimonial-card__text">' + item.quote + '</p>' +
        '<p class="about-testimonial-card__author">' + authorLine + '</p>' +
        '</article>'
      );
    }).join('');
  }

  function renderServiceHero(pageHero) {
    setText(document.getElementById('service-hero-heading'), pageHero.heading);
    setText(document.getElementById('service-hero-intro'), pageHero.intro);

    var cta = document.getElementById('service-hero-cta');
    if (cta && pageHero.cta) {
      cta.textContent = pageHero.cta.label;
      cta.href = pageHero.cta.href;
    }

    var stats = document.getElementById('service-hero-stats');
    if (stats && pageHero.stats) {
      stats.innerHTML = pageHero.stats.map(function (stat) {
        return (
          '<div class="service-hero__stat">' +
          '<p class="service-hero__stat-value">' + stat.value + '</p>' +
          '<p class="service-hero__stat-label">' + stat.label + '</p>' +
          '</div>'
        );
      }).join('');
    }

    var img = document.getElementById('service-hero-image');
    if (img && pageHero.image) {
      img.src = pageHero.image.src;
      img.alt = pageHero.image.alt || '';
    }
  }

  function renderServiceList(services) {
    setText(document.getElementById('services-kicker'), services.kicker);
    setText(document.getElementById('services-intro'), services.intro);

    var cta = document.getElementById('services-cta');
    if (cta && services.cta) {
      cta.textContent = services.cta.label;
      cta.href = services.cta.href;
    }

    var grid = document.getElementById('services-grid');
    if (!grid || !services.items) return;

    grid.innerHTML = services.items.map(function (item) {
      return (
        '<article class="reveal service-page-card">' +
        '<div class="service-page-card__icon" aria-hidden="true">' + getIconMarkup(item.icon) + '</div>' +
        '<h3 class="service-page-card__title">' + item.title + '</h3>' +
        '<p class="service-page-card__text">' + item.description + '</p>' +
        '</article>'
      );
    }).join('');
  }

  function renderServiceBenefits(benefits) {
    var img = document.getElementById('benefits-image');
    if (img && benefits.image) {
      img.src = benefits.image.src;
      img.alt = benefits.image.alt;
      if (benefits.image.width) img.width = benefits.image.width;
      if (benefits.image.height) img.height = benefits.image.height;
    }

    setText(document.getElementById('benefits-heading'), benefits.heading);
    setText(document.getElementById('benefits-intro'), benefits.intro);

    var list = document.getElementById('benefits-list');
    if (!list || !benefits.items) return;

    list.innerHTML = benefits.items.map(function (item) {
      return (
        '<li class="reveal flex items-start gap-3">' +
        '<span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-elevate-100 text-xs font-bold text-elevate-600">✓</span>' +
        '<span class="text-sm font-medium leading-6 text-slate-700">' + item + '</span>' +
        '</li>'
      );
    }).join('');
  }

  function renderIndexPage(data) {
    if (!data.hero) {
      console.error('[Elevate] Index page content not found in page JSON');
      return;
    }

    renderSeo(data.seo, data.site);
    renderLogos(data.site);
    renderNav(data.nav);
    renderHero(data.hero);
    renderServices(data.services);
    renderAbout(data.about);
    renderTestimonials(data.testimonials);
    renderPayment(data.payment);
    renderFaq(data.faq);
    renderCtaPanel(data.ctaPanel);
    renderFooter(data.footer, data.site);

    document.dispatchEvent(new CustomEvent('elevate:content-rendered'));
  }

  function renderAboutPage(data) {
    if (!data.pageHero) {
      console.error('[Elevate] About page content not found in page JSON');
      return;
    }

    renderSeo(data.seo, data.site);
    renderLogos(data.site);
    renderNav(data.nav);
    renderAboutHero(data.pageHero);
    renderAboutMission(data.mission);
    renderAboutFounder(data.founder);
    renderAboutFeatures(data.features);
    renderTestimonialsSection(data.testimonials);
    renderFooter(data.footer, data.site);

    document.dispatchEvent(new CustomEvent('elevate:content-rendered'));
  }

  function renderServicePage(data) {
    if (!data.pageHero) {
      console.error('[Elevate] Service page content not found in page JSON');
      return;
    }

    renderSeo(data.seo, data.site);
    renderLogos(data.site);
    renderNav(data.nav);
    renderServiceHero(data.pageHero);
    renderServiceList(data.services);
    renderServiceBenefits(data.benefits);
    renderFooter(data.footer, data.site);

    document.dispatchEvent(new CustomEvent('elevate:content-rendered'));
  }

  function renderPage(data) {
    var pageId = document.body.getAttribute('data-page') || 'index';
    if (pageId === 'about') {
      renderAboutPage(data);
      return;
    }
    if (pageId === 'service') {
      renderServicePage(data);
      return;
    }
    renderIndexPage(data);
  }

  function loadContent() {
    var pageId = document.body.getAttribute('data-page') || 'index';
    var contentUrl = pageId + '.json';

    return fetch(contentUrl)
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load ' + contentUrl);
        return res.json();
      })
      .then(renderPage)
      .catch(function (err) {
        console.error('[Elevate] Could not load ' + contentUrl + ':', err);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadContent);
  } else {
    loadContent();
  }
})();
