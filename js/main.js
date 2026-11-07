/*
 * Portfolio behaviour — vanilla JS, no dependencies.
 * Reads project data from the global PROJECTS array (js/projects.js).
 * Note: this file must load after projects.js (see the script tags in index.html).
 */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var $ = function (sel, ctx) { return (ctx || doc).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); };

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var FILTER_MS = 220; // keep in sync with --dur-med in CSS

  /* ---------- helpers ---------- */

  // Create an element with attributes and children (text only; never injects HTML).
  function el(tag, attrs, children) {
    var node = doc.createElement(tag);
    Object.keys(attrs || {}).forEach(function (key) {
      var val = attrs[key];
      if (val === false || val == null) return;
      if (key === 'class') node.className = val;
      else if (key === 'text') node.textContent = val;
      else node.setAttribute(key, val === true ? '' : val);
    });
    (children || []).forEach(function (child) { if (child) node.appendChild(child); });
    return node;
  }

  // Only allow http(s) links from the data file.
  function safeUrl(url) {
    if (typeof url !== 'string' || !url.trim()) return '';
    return /^https?:\/\//i.test(url.trim()) ? url.trim() : '';
  }

  function storageGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }

  /* ---------- theme ---------- */

  var themeBtn = $('#theme-toggle');
  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function isDark() {
    var attr = root.getAttribute('data-theme');
    return attr ? attr === 'dark' : darkQuery.matches;
  }

  function syncThemeUi() {
    var dark = isDark();
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    // Browser UI colour: override the media-specific tags when the user picks a theme manually.
    if (root.getAttribute('data-theme')) {
      $$('meta[name="theme-color"]').forEach(function (m) {
        m.setAttribute('content', dark ? '#0c0a09' : '#fafaf9');
        m.removeAttribute('media');
      });
    }
  }

  function applyTheme(next) {
    root.setAttribute('data-theme', next);
    storageSet('theme', next);
    syncThemeUi();
  }

  var THEME_REVEAL_MS = 800; // how long the circle takes to cover the page

  themeBtn.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';

    // No View Transitions support, or the visitor prefers reduced motion: switch instantly.
    if (!doc.startViewTransition || reduceMotion.matches) {
      applyTheme(next);
      return;
    }

    // The new theme grows as a circle from the centre of the toggle button
    // until it covers the farthest corner of the screen.
    var rect = themeBtn.getBoundingClientRect();
    var x = rect.left + rect.width / 2;
    var y = rect.top + rect.height / 2;
    var radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    root.classList.add('theme-transition');
    var transition = doc.startViewTransition(function () { applyTheme(next); });

    transition.ready.then(function () {
      root.animate(
        { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + radius + 'px at ' + x + 'px ' + y + 'px)'] },
        { duration: THEME_REVEAL_MS, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(function () { /* transition was skipped; the theme is already applied */ });

    transition.finished.then(
      function () { root.classList.remove('theme-transition'); },
      function () { root.classList.remove('theme-transition'); }
    );
  });

  // Follow system changes while the user has not chosen manually.
  var onSystemChange = function () { syncThemeUi(); };
  if (darkQuery.addEventListener) darkQuery.addEventListener('change', onSystemChange);
  else if (darkQuery.addListener) darkQuery.addListener(onSystemChange);
  syncThemeUi();

  /* ---------- mobile menu ---------- */

  var header = $('.site-header');
  var menuBtn = $('#menu-toggle');
  var menu = $('#nav-menu');

  function setMenu(open, returnFocus) {
    header.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (!open && returnFocus) menuBtn.focus();
  }

  menuBtn.addEventListener('click', function () {
    setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  doc.addEventListener('click', function (e) {
    if (menuBtn.getAttribute('aria-expanded') === 'true' && !header.contains(e.target)) setMenu(false);
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });
  window.matchMedia('(min-width: 640px)').addEventListener('change', function (e) {
    if (e.matches) setMenu(false);
  });

  /* ---------- projects: render ---------- */

  // `const PROJECTS` in projects.js is a global binding but not a window property, so read it directly.
  var projects = (typeof PROJECTS !== 'undefined' && Array.isArray(PROJECTS)) ? PROJECTS : [];
  var grid = $('#project-grid');
  var filtersBox = $('#filters');
  var emptyState = $('#empty-state');
  var statusEl = $('#filter-status');
  var clearBtn = $('#clear-filter');
  var cards = []; // { project, li }

  function buildImage(project, width, height, lazy) {
    var img = el('img', {
      src: project.image,
      alt: project.imageAlt || project.title + ' screenshot',
      width: width,
      height: height,
      loading: lazy ? 'lazy' : false,
      decoding: 'async'
    });
    // Graceful placeholder if the file is missing or broken.
    img.addEventListener('error', function () {
      var fallback = el('div', {
        class: 'img-fallback',
        role: 'img',
        'aria-label': img.alt,
        text: (project.title || '?').charAt(0).toUpperCase()
      });
      if (img.parentNode) img.parentNode.replaceChild(fallback, img);
    }, { once: true });
    return img;
  }

  function buildTags(list) {
    return el('ul', { class: 'tags', 'aria-label': 'Technologies used' },
      (list || []).map(function (t) { return el('li', { text: t }); }));
  }

  function buildLink(label, url, ariaLabel, primary) {
    return el('a', {
      class: 'btn btn--sm ' + (primary ? 'btn--primary' : 'btn--ghost'),
      href: url,
      target: '_blank',
      rel: 'noopener noreferrer',
      'aria-label': ariaLabel,
      text: label
    });
  }

  function buildCard(project) {
    var live = safeUrl(project.liveUrl);
    var code = safeUrl(project.codeUrl);

    var media = el('div', { class: 'card__media' }, [
      project.featured ? el('span', { class: 'badge', text: 'Featured' }) : null,
      buildImage(project, 800, 500, true)
    ]);

    var openBtn = el('button', { class: 'card__open', type: 'button', 'aria-haspopup': 'dialog', text: project.title });

    var links = (live || code) ? el('div', { class: 'card__links' }, [
      live ? buildLink('Live', live, 'Live demo of ' + project.title + ' (opens in a new tab)', true) : null,
      code ? buildLink('Code', code, 'Source code of ' + project.title + ' (opens in a new tab)', false) : null
    ]) : null;

    var body = el('div', { class: 'card__body' }, [
      el('h3', {}, [openBtn]),
      el('p', { class: 'card__desc', text: project.description }),
      buildTags(project.tags),
      links
    ]);

    var li = el('li', { class: 'reveal' + (project.featured ? ' is-featured' : '') },
      [el('article', { class: 'card' }, [media, body])]);

    openBtn.addEventListener('click', function () { openModal(project, openBtn); });
    return li;
  }

  projects.forEach(function (project) {
    var li = buildCard(project);
    cards.push({ project: project, li: li });
    grid.appendChild(li);
  });

  /* ---------- projects: filters ---------- */

  var activeTag = null;
  var chips = [];

  function projectMatches(project) {
    return !activeTag || (project.tags || []).indexOf(activeTag) !== -1;
  }

  function uniqueTags() {
    var seen = {};
    projects.forEach(function (p) { (p.tags || []).forEach(function (t) { seen[t] = true; }); });
    return Object.keys(seen).sort(function (a, b) { return a.localeCompare(b); });
  }

  function buildChips() {
    var tags = uniqueTags();
    if (!tags.length) { filtersBox.hidden = true; return; }
    ['All'].concat(tags).forEach(function (tag) {
      var chip = el('button', { class: 'chip', type: 'button', 'aria-pressed': 'false', text: tag });
      chip.addEventListener('click', function () { setFilter(tag === 'All' ? null : tag); });
      chips.push({ tag: tag === 'All' ? null : tag, node: chip });
      filtersBox.appendChild(chip);
    });
  }

  function showCard(li) {
    clearTimeout(li._timer);
    if (li.hidden) {
      li.hidden = false;
      void li.offsetWidth; // force reflow so the transition runs
    }
    li.classList.remove('is-hiding');
  }

  function hideCard(li) {
    if (li.hidden) return;
    clearTimeout(li._timer);
    li.classList.add('is-hiding');
    li._timer = setTimeout(function () { li.hidden = true; }, reduceMotion.matches ? 0 : FILTER_MS);
  }

  function setFilter(tag) {
    activeTag = tag;
    chips.forEach(function (c) { c.node.setAttribute('aria-pressed', String(c.tag === tag)); });

    var visible = 0;
    cards.forEach(function (c) {
      if (projectMatches(c.project)) { visible++; showCard(c.li); } else { hideCard(c.li); }
    });

    emptyState.hidden = visible !== 0;
    grid.hidden = visible === 0;
    statusEl.textContent = visible === 0
      ? 'No projects found'
      : 'Showing ' + visible + (visible === 1 ? ' project' : ' projects') + (tag ? ' tagged ' + tag : '');
  }

  buildChips();
  clearBtn.addEventListener('click', function () {
    setFilter(null);
    var all = chips[0] && chips[0].node;
    if (all) all.focus();
  });

  // No projects at all: show the friendly empty state and drop the pointless button.
  if (!projects.length) {
    clearBtn.hidden = true;
    emptyState.hidden = false;
    grid.hidden = true;
  } else {
    setFilter(null);
    statusEl.textContent = '';
  }

  /* ---------- modal ---------- */

  var modal = $('#modal');
  var dialog = $('.modal__dialog', modal);
  var mediaBox = $('#modal-media');
  var titleEl = $('#modal-title');
  var tagsEl = $('#modal-tags');
  var textEl = $('#modal-text');
  var linksEl = $('#modal-links');
  var lastTrigger = null;
  var backgroundEls = $$('.site-header, main, .site-footer, .skip-link');

  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

  function setBackgroundInert(on) {
    backgroundEls.forEach(function (node) {
      if (on) node.setAttribute('inert', ''); else node.removeAttribute('inert');
    });
  }

  function openModal(project, trigger) {
    lastTrigger = trigger || null;

    mediaBox.textContent = '';
    mediaBox.appendChild(buildImage(project, 800, 500, false));
    titleEl.textContent = project.title;

    tagsEl.textContent = '';
    (project.tags || []).forEach(function (t) { tagsEl.appendChild(el('li', { text: t })); });

    textEl.textContent = '';
    String(project.longDescription || project.description || '')
      .split(/\n{2,}/)
      .forEach(function (para) { if (para.trim()) textEl.appendChild(el('p', { text: para.trim() })); });

    linksEl.textContent = '';
    var live = safeUrl(project.liveUrl);
    var code = safeUrl(project.codeUrl);
    if (live) linksEl.appendChild(buildLink('Live demo', live, 'Live demo of ' + project.title + ' (opens in a new tab)', true));
    if (code) linksEl.appendChild(buildLink('Source code', code, 'Source code of ' + project.title + ' (opens in a new tab)', !live));
    linksEl.hidden = !(live || code);

    var scrollbar = window.innerWidth - root.clientWidth;
    if (scrollbar > 0) doc.body.style.paddingRight = scrollbar + 'px';
    doc.body.classList.add('is-locked');

    modal.hidden = false;
    modal.classList.add('is-open');
    setBackgroundInert(true);
    dialog.scrollTop = 0;
    dialog.focus();
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.classList.remove('is-open');
    modal.hidden = true;
    setBackgroundInert(false);
    doc.body.classList.remove('is-locked');
    doc.body.style.paddingRight = '';
    if (lastTrigger && doc.contains(lastTrigger)) lastTrigger.focus();
    lastTrigger = null;
  }

  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) closeModal();
  });

  doc.addEventListener('keydown', function (e) {
    if (modal.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); closeModal(); return; }
    if (e.key !== 'Tab') return;

    // Focus trap: keep Tab / Shift+Tab inside the dialog.
    var items = $$(FOCUSABLE, dialog).filter(function (n) { return n.offsetParent !== null; });
    if (!items.length) { e.preventDefault(); dialog.focus(); return; }
    var first = items[0];
    var last = items[items.length - 1];
    var active = doc.activeElement;
    if (e.shiftKey && (active === first || active === dialog)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
    else if (!dialog.contains(active)) { e.preventDefault(); first.focus(); }
  });

  /* ---------- copy email + toast ---------- */

  var toast = $('#toast');
  var toastTimer;

  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('is-visible');
    toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 2600);
  }

  function legacyCopy(text) {
    var ta = el('textarea', { readonly: true, 'aria-hidden': 'true', tabindex: '-1' });
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
    doc.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = doc.execCommand('copy'); } catch (e) { ok = false; }
    doc.body.removeChild(ta);
    return ok;
  }

  var copyBtn = $('#copy-email');
  copyBtn.addEventListener('click', function () {
    var email = copyBtn.getAttribute('data-email');
    var done = function (ok) {
      showToast(ok ? 'Email copied to clipboard' : 'Could not copy. Email: ' + email);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(function () { done(true); }, function () { done(legacyCopy(email)); });
    } else {
      done(legacyCopy(email));
    }
  });

  /* ---------- reviews ---------- */

  var reviews = (typeof REVIEWS !== 'undefined' && Array.isArray(REVIEWS)) ? REVIEWS : [];
  var reviewsSection = $('#reviews');
  var reviewList = $('#review-list');
  var scoreBox = $('#reviews-score');

  // Static markup (no user data), so innerHTML is safe here.
  var STAR_PATH = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.2 1.2-6.6L2.5 9.5l6.6-.9z"/></svg>';

  function clampRating(value) {
    var n = Number(value);
    return isFinite(n) ? Math.min(5, Math.max(0, n)) : 0;
  }

  // Five grey stars with five gold stars on top, cropped to the rating percentage.
  function buildStars(rating) {
    var five = new Array(6).join(STAR_PATH);
    var wrap = el('span', { class: 'stars', role: 'img', 'aria-label': 'Rated ' + rating + ' out of 5' });
    var base = el('span', { class: 'stars__row', 'aria-hidden': 'true' });
    var fill = el('span', { class: 'stars__fill', 'aria-hidden': 'true' });
    var fillRow = el('span', { class: 'stars__row' });
    base.innerHTML = five;
    fillRow.innerHTML = five;
    fill.style.width = (rating / 5 * 100) + '%';
    fill.appendChild(fillRow);
    wrap.appendChild(base);
    wrap.appendChild(fill);
    return wrap;
  }

  function initials(name) {
    var parts = String(name || '?').trim().split(/\s+/);
    return ((parts[0] || '?').charAt(0) + (parts.length > 1 ? parts[parts.length - 1].charAt(0) : '')).toUpperCase();
  }

  function formatScore(n) { return (Math.round(n * 10) / 10).toFixed(1); }

  function buildReview(review) {
    var rating = clampRating(review.rating);
    var who = [review.role, review.company].filter(Boolean).join(' · ');

    var head = el('div', { class: 'review__top' }, [
      el('div', { class: 'review__rating' }, [
        buildStars(rating),
        el('span', { class: 'review__score', text: formatScore(rating) + '/5' })
      ]),
      review.placeholder ? el('span', { class: 'review__flag', text: 'Mock' }) : null
    ]);

    var quote = el('blockquote', { class: 'review__quote' }, [el('p', { text: review.quote })]);

    var meta = el('footer', { class: 'review__meta' }, [
      el('span', { class: 'review__avatar', 'aria-hidden': 'true', text: initials(review.name) }),
      el('div', {}, [
        el('p', { class: 'review__name', text: review.name }),
        who ? el('p', { class: 'review__who', text: who }) : null
      ])
    ]);

    var project = review.project
      ? el('p', { class: 'review__project' }, [el('span', { text: 'Project: ' }), el('strong', { text: review.project })])
      : null;

    return el('li', { class: 'reveal' }, [
      el('article', { class: 'review' }, [head, quote, project, meta])
    ]);
  }

  if (reviewsSection) {
    if (!reviews.length) {
      // Nothing to show: hide the section and its nav link.
      reviewsSection.hidden = true;
      var reviewsNavLink = $('.nav__links a[href="#reviews"]');
      if (reviewsNavLink && reviewsNavLink.parentNode) reviewsNavLink.parentNode.hidden = true;
    } else {
      reviews.forEach(function (r) { reviewList.appendChild(buildReview(r)); });

      var average = reviews.reduce(function (sum, r) { return sum + clampRating(r.rating); }, 0) / reviews.length;
      var allSamples = reviews.every(function (r) { return r.placeholder; });
      scoreBox.appendChild(el('span', { class: 'score__num', text: formatScore(average) }));
      scoreBox.appendChild(el('div', { class: 'score__detail' }, [
        buildStars(Math.round(average * 10) / 10),
        el('span', {
          class: 'score__label',
          text: 'Average of ' + reviews.length + (reviews.length === 1 ? ' review' : ' reviews') + (allSamples ? ' (mock data)' : '')
        })
      ]));
      scoreBox.hidden = false;
    }
  }

  /* ---------- scroll reveal + active nav link ---------- */

  var revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (n) { revealObs.observe(n); });
  } else {
    revealEls.forEach(function (n) { n.classList.add('is-visible'); });
  }

  if ('IntersectionObserver' in window) {
    var navLinks = $$('.nav__links a');
    // The hero is observed too (it has no nav link), so scrolling back to the top clears the highlight.
    var sections = navLinks
      .map(function (a) { return $(a.getAttribute('href')); })
      .filter(Boolean)
      .concat($('.hero') || []);
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          if (a.getAttribute('href') === '#' + entry.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { navObs.observe(s); });
  }

  /* ---------- scroll progress bar ---------- */

  var progressBar = $('#progress-bar');
  var progressTick = false;
  function updateProgress() {
    var max = root.scrollHeight - window.innerHeight;
    progressBar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ')';
    progressTick = false;
  }
  if (progressBar) {
    window.addEventListener('scroll', function () {
      if (!progressTick) { progressTick = true; requestAnimationFrame(updateProgress); }
    }, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
  }

  /* ---------- keep the "projects shown" stat in sync with the data ---------- */

  var statProjects = $('#stat-projects');
  if (statProjects && projects.length) statProjects.textContent = String(projects.length);

  /* ---------- footer year ---------- */

  var year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
