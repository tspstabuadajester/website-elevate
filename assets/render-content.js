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

  var DRAWER_SECTION_ICONS = {
    overview:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<circle cx="12" cy="12" r="9"/>' +
      '<path d="M12 10v6M12 7h.01"/>' +
      '</svg>',
    causes:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>' +
      '<circle cx="12" cy="12" r="3"/>' +
      '</svg>',
    signs:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M9 11l3 3L22 4"/>' +
      '<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>' +
      '</svg>',
    brain:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M9.5 4A5.5 5.5 0 0 0 4 9.5c0 .9.2 1.8.6 2.6A5.5 5.5 0 0 0 9.5 20 5 5 0 0 0 14 18.5a5 5 0 0 0 5.5-5.5 5.5 5.5 0 0 0-5.5-5.5 5.5 5.5 0 0 0-4.5-3.5Z"/>' +
      '<path d="M12 4v16M9 8h6M9 12h6M9 16h4"/>' +
      '</svg>',
    seekHelp:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<circle cx="12" cy="12" r="9"/>' +
      '<path d="M12 8v4M12 16h.01"/>' +
      '</svg>',
    treatment:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7Z"/>' +
      '</svg>',
    resources:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/>' +
      '</svg>',
    keyFacts:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 12 2a6 6 0 0 0-6 6c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/>' +
      '<path d="M9 18h6M10 22h4"/>' +
      '</svg>'
  };

  function getDrawerSectionIcon(key) {
    return DRAWER_SECTION_ICONS[key] || DRAWER_SECTION_ICONS.overview;
  }

  function renderDrawerSectionHeading(heading, iconKey, modifierClass) {
    if (!heading) return '';
    var headingClass = 'service-drawer__section-heading';
    if (modifierClass) headingClass += ' ' + modifierClass;
    return (
      '<div class="' + headingClass + '">' +
      '<span class="service-drawer__section-icon" aria-hidden="true">' +
      getDrawerSectionIcon(iconKey) +
      '</span>' +
      '<h4 class="service-drawer__section-title">' + escapeHtml(heading) + '</h4>' +
      '</div>'
    );
  }

  function getIconMarkup(key) {
    return SERVICE_ICONS[key] || SERVICE_ICONS.star;
  }

  function setText(el, value) {
    if (el && value != null) el.textContent = value;
  }

  function setHtml(el, value) {
    if (el && value != null) el.innerHTML = value;
  }

  function buildNavLinksHtml(links, linkClass) {
    if (!links) return '';
    return links.map(function (link) {
      var suffix = link.suffix
        ? ' <span class="ml-0.5 text-xs">' + link.suffix + '</span>'
        : '';
      return '<a class="' + linkClass + '" href="' + link.href + '">' + link.label + suffix + '</a>';
    }).join('');
  }

  function renderNav(nav) {
    if (!nav.links) return;

    var container = document.getElementById('nav-links');
    if (container) {
      container.innerHTML = buildNavLinksHtml(nav.links, 'transition hover:text-elevate-700');
    }

    var mobileLinks = document.getElementById('nav-mobile-links');
    if (mobileLinks) {
      mobileLinks.innerHTML = buildNavLinksHtml(nav.links, 'nav-mobile__link');
    }

    var ctaHref = nav.ctaHref || '#appointment';
    var cta = document.getElementById('nav-cta');
    if (cta && nav.ctaLabel) {
      cta.textContent = nav.ctaLabel;
      cta.href = ctaHref;
    }

    var mobileCta = document.getElementById('nav-mobile-cta');
    if (mobileCta && nav.ctaLabel) {
      mobileCta.textContent = nav.ctaLabel;
      mobileCta.href = ctaHref;
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
    var loader = document.getElementById('hero-video-loader');
    var posterSrc = (hero.video && hero.video.poster) || (hero.image && hero.image.src) || '';
    var altText =
      (hero.video && hero.video.alt) ||
      (hero.image && hero.image.alt) ||
      '';

    function showHeroLoader() {
      if (loader) {
        loader.classList.add('hero-video-loader--visible');
        loader.setAttribute('aria-hidden', 'false');
      }
    }

    function hideHeroLoader() {
      if (loader) {
        loader.classList.remove('hero-video-loader--visible');
        loader.setAttribute('aria-hidden', 'true');
      }
    }

    function showHeroPoster() {
      if (img) {
        img.hidden = false;
        img.classList.add('hero-poster--visible');
      }
    }

    function hideHeroPoster() {
      if (img) {
        img.classList.remove('hero-poster--visible');
      }
    }

    if (img) {
      if (posterSrc) img.src = posterSrc;
      img.alt = altText;
      if (hero.image && hero.image.width) img.width = hero.image.width;
      if (hero.image && hero.image.height) img.height = hero.image.height;
    }

    if (video && hero.video && hero.video.src) {
      if (!video.getAttribute('src')) {
        video.src = hero.video.src;
      }
      if (posterSrc) video.poster = posterSrc;
      video.setAttribute('preload', 'auto');
      video.setAttribute('aria-label', altText);

      var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        hideHeroLoader();
        video.removeAttribute('autoplay');
        video.pause();
        video.classList.add('hero-video--static');
        showHeroPoster();
      } else {
        showHeroLoader();
        hideHeroPoster();
        video.classList.remove('hero-video--static');

        function onHeroVideoReady() {
          hideHeroLoader();
          hideHeroPoster();
        }

        function onHeroVideoFallback() {
          hideHeroLoader();
          showHeroPoster();
        }

        video.addEventListener('playing', onHeroVideoReady, { once: true });
        video.play().catch(function () {
          video.removeEventListener('playing', onHeroVideoReady);
          onHeroVideoFallback();
        });
      }
    } else if (video) {
      hideHeroLoader();
      video.classList.add('hero-video--static');
      showHeroPoster();
    } else if (img && hero.image) {
      hideHeroLoader();
      img.src = hero.image.src;
      img.alt = hero.image.alt;
      img.hidden = false;
      img.classList.add('hero-poster--visible');
    }
  }

  var serviceItems = [];

  function truncateText(text, max) {
    if (!text || text.length <= max) return text;
    return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatServiceDetail(text) {
    if (!text) return '';
    return text
      .split(/\n\n+/)
      .map(function (paragraph) {
        return paragraph.trim();
      })
      .filter(Boolean)
      .map(function (paragraph) {
        return '<p>' + escapeHtml(paragraph) + '</p>';
      })
      .join('');
  }

  function getServiceTeaser(item) {
    if (item.summary) return item.summary;
    if (item.description) return item.description;
    if (item.overview && item.overview.items && item.overview.items[0]) {
      return item.overview.items[0];
    }
    return truncateText(item.detail || '', 100);
  }

  function hasStructuredService(item) {
    return !!(item && (item.overview || item.causes || item.signs || item.brain));
  }

  function renderBulletBlock(section, iconKey) {
    if (!section) return '';
    var html = '<section class="service-drawer__section">';
    html += renderDrawerSectionHeading(section.heading, iconKey);
    if (section.items && section.items.length) {
      html += '<ul class="service-drawer__list">';
      section.items.forEach(function (item) {
        html += '<li>' + escapeHtml(item) + '</li>';
      });
      html += '</ul>';
    }
    if (section.note) {
      html += '<p class="service-drawer__note">' + escapeHtml(section.note) + '</p>';
    }
    html += '</section>';
    return html;
  }

  function renderBrainBlock(brain) {
    if (!brain) return '';
    var html = '<section class="service-drawer__section service-drawer__section--brain">';
    html += renderDrawerSectionHeading(brain.heading, 'brain');
    if (brain.description) {
      html += '<p class="service-drawer__lead">' + escapeHtml(brain.description) + '</p>';
    }
    if (brain.image && brain.image.src) {
      html +=
        '<figure class="service-drawer__brain-figure">' +
        '<img src="' + escapeHtml(brain.image.src) + '" alt="' + escapeHtml(brain.image.alt || '') + '" class="service-drawer__brain-image" loading="lazy" decoding="async" onerror="this.closest(\'figure\').classList.add(\'is-hidden\')" />' +
        '</figure>';
    }
    if (brain.regions && brain.regions.length) {
      html += '<div class="service-drawer__regions">';
      brain.regions.forEach(function (region) {
        html +=
          '<article class="service-drawer__region">' +
          '<h5 class="service-drawer__region-name">' + escapeHtml(region.name) + '</h5>' +
          '<p class="service-drawer__region-text">' + escapeHtml(region.description) + '</p>' +
          '</article>';
      });
      html += '</div>';
    }
    html += '</section>';
    return html;
  }

  function renderSeekHelpBlock(seekHelp) {
    if (!seekHelp) return '';
    var html = '<section class="service-drawer__section">';
    html += renderDrawerSectionHeading(seekHelp.heading, 'seekHelp');
    if (seekHelp.routine && seekHelp.routine.length) {
      html += '<ul class="service-drawer__list">';
      seekHelp.routine.forEach(function (item) {
        html += '<li>' + escapeHtml(item) + '</li>';
      });
      html += '</ul>';
    }
    if (seekHelp.urgentHeading) {
      html += '<p class="service-drawer__subheading">' + escapeHtml(seekHelp.urgentHeading) + '</p>';
    }
    if (seekHelp.urgent && seekHelp.urgent.length) {
      html += '<ul class="service-drawer__list service-drawer__list--urgent">';
      seekHelp.urgent.forEach(function (item) {
        html += '<li>' + escapeHtml(item) + '</li>';
      });
      html += '</ul>';
    }
    html += '</section>';
    return html;
  }

  function renderTreatmentBlock(treatment) {
    if (!treatment) return '';
    var html = '<section class="service-drawer__section">';
    html += renderDrawerSectionHeading(treatment.heading, 'treatment');
    if (treatment.description) {
      html += '<p class="service-drawer__lead">' + escapeHtml(treatment.description) + '</p>';
    }
    if (treatment.types && treatment.types.length) {
      html += '<div class="service-drawer__chips">';
      treatment.types.forEach(function (type) {
        html += '<span class="service-drawer__chip">' + escapeHtml(type) + '</span>';
      });
      html += '</div>';
    }
    html += '</section>';
    return html;
  }

  function renderResourcesBlock(resources) {
    if (!resources || !resources.items || !resources.items.length) return '';
    var html = '<section class="service-drawer__section">';
    html += renderDrawerSectionHeading(resources.heading, 'resources');
    html += '<ul class="service-drawer__resources">';
    resources.items.forEach(function (resource) {
      var href = resource.href ? ' href="' + escapeHtml(resource.href) + '"' : '';
      var tag = resource.href ? 'a' : 'span';
      html +=
        '<li class="service-drawer__resource">' +
        '<' + tag + ' class="service-drawer__resource-link"' + href + '>' +
        '<strong>' + escapeHtml(resource.label) + '</strong>' +
        (resource.detail ? '<span>' + escapeHtml(resource.detail) + '</span>' : '') +
        '</' + tag + '>' +
        '</li>';
    });
    html += '</ul></section>';
    return html;
  }

  function renderKeyFactsBlock(keyFacts) {
    if (!keyFacts || !keyFacts.items || !keyFacts.items.length) return '';
    var html = '<section class="service-drawer__callout">';
    html += renderDrawerSectionHeading(keyFacts.heading, 'keyFacts', 'service-drawer__section-heading--callout');
    html += '<ul class="service-drawer__callout-list">';
    keyFacts.items.forEach(function (item) {
      html += '<li>' + escapeHtml(item) + '</li>';
    });
    html += '</ul></section>';
    return html;
  }

  function buildServiceDrawerHtml(service) {
    if (!hasStructuredService(service)) {
      return '<div class="service-drawer__legacy">' + formatServiceDetail(service.detail || service.description || '') + '</div>';
    }

    var html = '';
    html += renderBulletBlock(service.overview, 'overview');
    html += renderBulletBlock(service.causes, 'causes');
    html += renderBulletBlock(service.signs, 'signs');
    html += renderBrainBlock(service.brain);

    if (service.seekHelp || service.treatment) {
      html += '<div class="service-drawer__split">';
      html += renderSeekHelpBlock(service.seekHelp);
      html += renderTreatmentBlock(service.treatment);
      html += '</div>';
    }

    html += renderResourcesBlock(service.resources);
    html += renderKeyFactsBlock(service.keyFacts);
    return html;
  }

  function getServiceModalConfig(services) {
    return {
      cta: services.modalCta || services.cta,
      viewLabel: services.viewDetailsLabel || 'Learn more'
    };
  }

  function renderServices(services) {
    setText(document.getElementById('services-kicker'), services.kicker);
    setText(document.getElementById('services-heading'), services.heading);
    setText(document.getElementById('services-intro'), services.detailPlaceholder);
    setHtml(document.getElementById('services-footnote'), services.footnote);

    var list = document.getElementById('services-list');
    if (!list || !services.items) return;

    serviceItems = services.items;
    var viewLabel = services.viewDetailsLabel || 'Learn more';

    list.innerHTML = services.items.map(function (item) {
      var teaser = truncateText(getServiceTeaser(item), 100);
      return (
        '<button type="button" class="reveal service-card" role="listitem"' +
        ' data-service-id="' + item.id + '"' +
        ' aria-haspopup="dialog"' +
        ' aria-controls="service-drawer">' +
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

    initServiceDrawer(services, '.service-card[data-service-id]');
  }

  function initServiceDrawer(services, cardSelector) {
    var drawer = document.getElementById('service-drawer');
    var iconTarget = document.getElementById('service-drawer-icon');
    var titleTarget = document.getElementById('service-drawer-title');
    var updatedTarget = document.getElementById('service-drawer-updated');
    var textTarget = document.getElementById('service-drawer-text');
    var bodyTarget = document.getElementById('service-drawer-body');
    var cta = document.getElementById('service-drawer-cta');
    var selector = cardSelector || '.service-card[data-service-id], .service-page-card[data-service-id]';
    var cards = document.querySelectorAll(selector);
    var drawerConfig = getServiceModalConfig(services);
    var lastFocused = null;

    if (!drawer || !cards.length) return;

    if (cta && drawerConfig.cta) {
      cta.href = drawerConfig.cta.href || '#appointment';
      var ctaLabel = cta.querySelector('[data-cta-label]');
      if (ctaLabel) ctaLabel.textContent = drawerConfig.cta.label;
    }

    function openDrawer(serviceId, iconMarkup) {
      var service = serviceItems.find(function (item) {
        return item.id === serviceId;
      });
      if (!service) return;

      if (iconMarkup) {
        iconTarget.innerHTML = iconMarkup;
      } else {
        iconTarget.innerHTML = getIconMarkup(service.icon);
      }

      titleTarget.textContent = service.title;

      if (updatedTarget) {
        if (service.lastUpdated) {
          updatedTarget.textContent = 'Last updated ' + service.lastUpdated;
          updatedTarget.hidden = false;
        } else {
          updatedTarget.textContent = '';
          updatedTarget.hidden = true;
        }
      }

      setHtml(textTarget, buildServiceDrawerHtml(service));
      if (bodyTarget) bodyTarget.scrollTop = 0;

      lastFocused = document.activeElement;
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('service-drawer-open');
      drawer.querySelector('.service-drawer__close').focus();
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('service-drawer-open');
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
    }

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        var iconSource = card.querySelector('.service-card__icon, .service-page-card__icon');
        openDrawer(
          card.dataset.serviceId,
          iconSource ? iconSource.innerHTML : null
        );
      });
    });

    drawer.querySelectorAll('[data-drawer-close]').forEach(function (el) {
      el.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', function (e) {
      if (!drawer.classList.contains('is-open')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeDrawer();
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
    var insuranceInfo = document.getElementById('payment-insurance-info');
    if (insuranceInfo && payment.insuranceInfo) {
      var info = payment.insuranceInfo;
      insuranceInfo.innerHTML =
        '<h2 class="serif text-center text-3xl font-bold text-elevate-900 sm:text-4xl">' + info.heading + '</h2>' +
        '<p class="mx-auto mt-4 text-center text-sm leading-7 text-slate-600 sm:text-base">' + info.intro + '</p>' +
        '<div class="mt-8 space-y-5 text-sm leading-7 text-slate-600 sm:text-base">' +
        '<p><strong class="text-elevate-900">' + info.inNetwork.label + ':</strong> ' + info.inNetwork.text + '</p>' +
        '<p><strong class="text-elevate-900">' + info.comingSoon.label + ':</strong> ' + info.comingSoon.text + '</p>' +
        '<p><strong class="text-elevate-900">' + info.responsibility.label + ':</strong> ' + info.responsibility.text + '</p>' +
        '</div>';
    }

    var insurers = document.getElementById('payment-insurers');
    if (insurers && payment.insurers) {
      insurers.className = 'payment-insurers';
      insurers.innerHTML = payment.insurers.map(function (insurer) {
        return (
          '<div class="payment-insurer">' +
          '<img src="' + insurer.src + '" alt="' + insurer.name + '" class="payment-insurer__logo" loading="lazy" decoding="async" />' +
          '</div>'
        );
      }).join('');
    }

    var outOfNetwork = document.getElementById('payment-out-of-network');
    if (outOfNetwork && payment.outOfNetwork) {
      var section = payment.outOfNetwork;
      var html =
        '<h2 class="serif text-2xl font-bold text-elevate-900 sm:text-3xl">' + section.heading + '</h2>' +
        '<div class="mt-4 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">';
      section.paragraphs.forEach(function (paragraph) {
        html += '<p>' + paragraph + '</p>';
      });
      html += '</div>';
      if (section.note) {
        html += '<p class="mt-4 rounded-xl bg-elevate-50 p-4 text-sm leading-7 text-slate-600">' + section.note + '</p>';
      }
      outOfNetwork.innerHTML = html;
    }

    if (payment.feeSchedule) {
      setText(document.getElementById('payment-fee-heading'), payment.feeSchedule.heading);
      var table = document.getElementById('payment-fee-table');
      if (table && payment.feeSchedule.rows) {
        var columns = payment.feeSchedule.columns || ['Service Type', 'Estimated Duration', 'Fee'];
        var tableHtml = '<thead><tr>';
        columns.forEach(function (col) {
          tableHtml += '<th scope="col">' + col + '</th>';
        });
        tableHtml += '</tr></thead><tbody>';
        payment.feeSchedule.rows.forEach(function (row) {
          tableHtml +=
            '<tr>' +
            '<td>' + row.service + '</td>' +
            '<td>' + (row.duration || '—') + '</td>' +
            '<td>' + row.fee + '</td>' +
            '</tr>';
        });
        tableHtml += '</tbody>';
        table.innerHTML = tableHtml;
      }
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
      if (location.phone) {
        html +=
          '<li class="flex gap-2">' +
          '<svg class="mt-0.5 h-4 w-4 shrink-0 text-elevate-300" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2Z"/></svg>' +
          '<a href="' + location.phone.href + '" class="hover:text-white">' + location.phone.label + '</a></li>';
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
    shield: '<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>',
    collaboration: '<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    culture: '<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"/></svg>',
    balance: '<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 3v18M3 9h18M7 15l5 6 5-6"/></svg>',
    coaching: '<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>',
    privacy: '<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    growth: '<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 22V8M7 14l5-6 5 6"/></svg>'
  };

  var CORE_SERVICE_ICONS = {
    evaluation: '<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h6"/></svg>',
    medication: '<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>',
    therapy: '<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/></svg>',
    genesight: '<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M2 12c2-4 6-7 10-7s8 3 10 7c-2 4-6 7-10 7s-8-3-10-7Z"/><path d="M12 9v6M9 12h6"/></svg>'
  };

  function getCoreServiceIcon(key) {
    return CORE_SERVICE_ICONS[key] || CORE_SERVICE_ICONS.evaluation;
  }

  function getAboutFeatureIcon(key) {
    return ABOUT_FEATURE_ICONS[key] || ABOUT_FEATURE_ICONS.team;
  }

  function renderAboutHero(pageHero) {
    setText(document.getElementById('page-hero-heading'), pageHero.heading);
    setText(document.getElementById('page-hero-intro'), pageHero.intro);

    var paragraphs = document.getElementById('page-hero-paragraphs');
    if (paragraphs && pageHero.paragraphs && pageHero.paragraphs.length) {
      paragraphs.innerHTML = pageHero.paragraphs.map(function (text) {
        return '<p>' + text + '</p>';
      }).join('');
    } else if (paragraphs) {
      paragraphs.innerHTML = '';
    }

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

  function renderAboutPartner(partner) {
    if (!partner) return;
    setText(document.getElementById('partner-heading'), partner.heading);
    setText(document.getElementById('partner-text'), partner.text);
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

    serviceItems = services.items;
    var viewLabel = getServiceModalConfig(services).viewLabel;

    grid.innerHTML = services.items.map(function (item) {
      return (
        '<button type="button" class="reveal service-page-card" data-service-id="' + item.id + '" aria-haspopup="dialog" aria-controls="service-drawer">' +
        '<div class="service-page-card__icon" aria-hidden="true">' + getIconMarkup(item.icon) + '</div>' +
        '<h3 class="service-page-card__title">' + item.title + '</h3>' +
        '<p class="service-page-card__text">' + getServiceTeaser(item) + '</p>' +
        '<span class="service-page-card__action">' + viewLabel +
        '<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">' +
        '<path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h9.69l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd"/>' +
        '</svg></span>' +
        '</button>'
      );
    }).join('');

    initServiceDrawer(services, '.service-page-card[data-service-id]');
  }

  function renderServiceOverview(overview) {
    var container = document.getElementById('services-overview');
    if (!container || !overview || !overview.paragraphs) return;

    container.innerHTML = overview.paragraphs.map(function (text) {
      return '<p>' + text + '</p>';
    }).join('');
  }

  function renderCoreServices(coreServices) {
    setText(document.getElementById('core-services-heading'), coreServices.heading);

    var list = document.getElementById('core-services-list');
    if (!list || !coreServices.items) return;

    list.innerHTML = coreServices.items.map(function (item) {
      var html =
        '<article class="reveal core-service-card">' +
        '<div class="core-service-card__icon" aria-hidden="true">' + getCoreServiceIcon(item.icon) + '</div>' +
        '<h3 class="core-service-card__title">' + item.title + '</h3>';

      if (item.paragraphs && item.paragraphs.length) {
        html += '<div class="core-service-card__body">';
        item.paragraphs.forEach(function (paragraph) {
          html += '<p>' + paragraph + '</p>';
        });
        html += '</div>';
      }

      if (item.bullets && item.bullets.length) {
        html += '<ul class="core-service-card__list">';
        item.bullets.forEach(function (bullet) {
          html += '<li>' + bullet + '</li>';
        });
        html += '</ul>';
      }

      if (item.note) {
        html += '<p class="core-service-card__note">' + item.note + '</p>';
      }

      html += '</article>';
      return html;
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
    renderAboutPartner(data.partner);
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
    renderServiceOverview(data.overview);
    renderServiceList(data.services);
    renderCoreServices(data.coreServices);
    renderFooter(data.footer, data.site);

    document.dispatchEvent(new CustomEvent('elevate:content-rendered'));
  }

  function renderContactHero(pageHero) {
    setText(document.getElementById('contact-hero-heading'), pageHero.heading);
    setText(document.getElementById('contact-hero-intro'), pageHero.intro);
  }

  function renderContactInfo(info) {
    setText(document.getElementById('contact-info-kicker'), info.kicker);
    setText(document.getElementById('contact-info-heading'), info.heading);
    setText(document.getElementById('contact-info-intro'), info.intro);

    var emailLink = document.getElementById('contact-email');
    var emailLabel = document.getElementById('contact-email-label');
    if (emailLink && info.email) {
      emailLink.href = info.email.href;
      setText(emailLabel, info.email.label);
    }

    var phoneLink = document.getElementById('contact-phone');
    var phoneLabel = document.getElementById('contact-phone-label');
    if (phoneLink && info.phone) {
      phoneLink.href = info.phone.href;
      setText(phoneLabel, info.phone.label);
    } else if (phoneLink) {
      phoneLink.hidden = true;
    }

    var locations = document.getElementById('contact-locations');
    if (!locations || !info.locations) return;

    locations.innerHTML = info.locations.map(function (loc) {
      return (
        '<article class="reveal contact-location-card">' +
        '<div class="contact-location-card__icon" aria-hidden="true">' +
        '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"/></svg>' +
        '</div>' +
        '<div>' +
        '<h3 class="contact-location-card__title">' + loc.title + '</h3>' +
        '<p class="contact-location-card__address">' + loc.address + '</p>' +
        '</div>' +
        '</article>'
      );
    }).join('');
  }

  function renderCrisisPolicy(crisisPolicy) {
    if (!crisisPolicy) return;

    setText(document.getElementById('crisis-heading'), crisisPolicy.heading);
    setText(document.getElementById('crisis-resources-heading'), crisisPolicy.resourcesHeading);
    setText(document.getElementById('crisis-patients-note'), crisisPolicy.patientsNote);

    var intro = document.getElementById('crisis-intro');
    if (intro && crisisPolicy.paragraphs) {
      intro.innerHTML = crisisPolicy.paragraphs.map(function (text) {
        return '<p>' + text + '</p>';
      }).join('');
    }

    var resources = document.getElementById('crisis-resources');
    if (resources && crisisPolicy.resources) {
      resources.innerHTML = crisisPolicy.resources.map(function (item) {
        return (
          '<li class="reveal crisis-resource">' +
          '<strong class="block text-sm font-bold text-elevate-900">' + item.label + '</strong>' +
          '<span class="mt-1 block text-sm leading-7 text-slate-600">' + item.detail + '</span>' +
          '</li>'
        );
      }).join('');
    }
  }

  function renderContactPage(data) {
    if (!data.pageHero) {
      console.error('[Elevate] Contact page content not found in page JSON');
      return;
    }

    renderSeo(data.seo, data.site);
    renderLogos(data.site);
    renderNav(data.nav);
    renderContactHero(data.pageHero);
    renderContactInfo(data.contactInfo);
    renderCrisisPolicy(data.crisisPolicy);
    renderCtaPanel(data.ctaPanel);
    renderFooter(data.footer, data.site);

    document.dispatchEvent(new CustomEvent('elevate:content-rendered'));
  }

  function renderServiceDetailHero(pageHero) {
    setText(document.getElementById('page-hero-heading'), pageHero.heading);
    setText(document.getElementById('page-hero-intro'), pageHero.intro);
  }

  function renderWhatToExpect(section) {
    if (!section) return;

    setText(document.getElementById('expect-heading'), section.heading);
    setText(document.getElementById('expect-intro'), section.intro);
    setText(document.getElementById('expect-privacy'), section.privacyNote);

    var steps = document.getElementById('expect-steps');
    if (!steps || !section.steps) return;

    steps.innerHTML = section.steps.map(function (step) {
      var html =
        '<article class="reveal new-patient-step">' +
        '<span class="new-patient-step__number">' + step.number + '</span>' +
        '<div class="new-patient-step__body">' +
        '<h3 class="new-patient-step__title">' + step.title + '</h3>' +
        '<p class="new-patient-step__lead">' + step.lead + '</p>' +
        '<p><strong class="text-elevate-900">What we do:</strong> ' + step.whatWeDo + '</p>';

      if (step.outcome) {
        html += '<p><strong class="text-elevate-900">The outcome:</strong> ' + step.outcome + '</p>';
      }
      if (step.frequency) {
        html += '<p><strong class="text-elevate-900">Frequency:</strong> ' + step.frequency + '</p>';
      }

      html += '</div></article>';
      return html;
    }).join('');
  }

  function renderPatientForms(forms) {
    if (!forms) return;

    setText(document.getElementById('forms-heading'), forms.heading);
    setText(document.getElementById('forms-intro'), forms.intro);

    if (forms.ehr) {
      setText(document.getElementById('forms-ehr-heading'), forms.ehr.heading);
      var ehrBody = document.getElementById('forms-ehr-body');
      if (ehrBody && forms.ehr.paragraphs) {
        ehrBody.innerHTML = forms.ehr.paragraphs.map(function (p) {
          return '<p>' + p + '</p>';
        }).join('');
      }
    }

    if (forms.gettingForms) {
      setText(document.getElementById('forms-getting-heading'), forms.gettingForms.heading);
      setText(document.getElementById('forms-getting-text'), forms.gettingForms.text);
    }

    if (forms.formsList) {
      setText(document.getElementById('forms-list-heading'), forms.formsList.heading);
      var list = document.getElementById('forms-list');
      if (list && forms.formsList.items) {
        list.innerHTML = forms.formsList.items.map(function (item) {
          return (
            '<li class="new-patient-forms-list__item">' +
            '<strong>' + item.label + '</strong>' +
            '<span>' + item.detail + '</span>' +
            '</li>'
          );
        }).join('');
      }
    }

    if (forms.coordination) {
      setText(document.getElementById('forms-coordination-heading'), forms.coordination.heading);
      setText(document.getElementById('forms-coordination-intro'), forms.coordination.intro);
      var roiLink = document.getElementById('forms-roi-link');
      if (roiLink && forms.coordination.roiForm) {
        roiLink.href = forms.coordination.roiForm.href || '#';
        setText(document.getElementById('forms-roi-label'), forms.coordination.roiForm.label);
      }
    }

    if (forms.completionPolicy) {
      setText(document.getElementById('forms-policy-heading'), forms.completionPolicy.heading);
      setText(document.getElementById('forms-policy-intro'), forms.completionPolicy.intro);
      var policyItems = document.getElementById('forms-policy-items');
      if (policyItems && forms.completionPolicy.items) {
        policyItems.innerHTML = forms.completionPolicy.items.map(function (item) {
          return (
            '<div class="new-patient-policy-item">' +
            '<strong class="block text-sm font-bold text-elevate-900">' + item.label + '</strong>' +
            '<p class="mt-1 text-sm leading-7 text-slate-600">' + item.text + '</p>' +
            '</div>'
          );
        }).join('');
      }
    }
  }

  function renderPracticePolicies(section) {
    if (!section) return;

    setText(document.getElementById('policies-heading'), section.heading);
    setText(document.getElementById('policies-intro'), section.intro);

    var list = document.getElementById('policies-list');
    if (!list || !section.items) return;

    list.innerHTML = section.items.map(function (item) {
      return (
        '<article class="reveal new-patient-policy-card">' +
        '<h3 class="new-patient-policy-card__title">' + item.title + '</h3>' +
        '<p class="new-patient-policy-card__text">' + item.text + '</p>' +
        '</article>'
      );
    }).join('');
  }

  function renderServiceDetailPage(data) {
    if (!data.pageHero) {
      console.error('[Elevate] Service detail page content not found in page JSON');
      return;
    }

    renderSeo(data.seo, data.site);
    renderLogos(data.site);
    renderNav(data.nav);
    renderServiceDetailHero(data.pageHero);
    renderWhatToExpect(data.whatToExpect);
    renderPatientForms(data.patientForms);
    renderPracticePolicies(data.practicePolicies);
    renderFooter(data.footer, data.site);

    document.dispatchEvent(new CustomEvent('elevate:content-rendered'));
  }

  function renderPaymentHero(pageHero) {
    setText(document.getElementById('payment-hero-heading'), pageHero.heading);
    setText(document.getElementById('payment-hero-intro'), pageHero.intro);
  }

  function renderPaymentPage(data) {
    if (!data.pageHero) {
      console.error('[Elevate] Payment page content not found in page JSON');
      return;
    }

    renderSeo(data.seo, data.site);
    renderLogos(data.site);
    renderNav(data.nav);
    renderPaymentHero(data.pageHero);
    renderPayment(data.payment);
    renderFooter(data.footer, data.site);

    document.dispatchEvent(new CustomEvent('elevate:content-rendered'));
  }

  function renderPage(data) {
    var pageId = document.body.getAttribute('data-page') || 'index';
    if (pageId === 'about') {
      renderAboutPage(data);
      return;
    }
    if (pageId === 'services') {
      renderServicePage(data);
      return;
    }
    if (pageId === 'contact') {
      renderContactPage(data);
      return;
    }
    if (pageId === 'payment') {
      renderPaymentPage(data);
      return;
    }
    if (pageId === 'service-detail') {
      renderServiceDetailPage(data);
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
