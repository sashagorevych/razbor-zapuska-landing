/* ═══════════════════════════════════════════════════════════════
   ЧЕТЫРЕ ВЕРСИИ САЙТА. Переключение: ?a=1 … ?a=4. По умолчанию — 1.
   Версия 1 лежит в разметке статически, скрипт переписывает под 2–4.
   Тексты — из таблицы Саши, 16.09.2026.
   ═══════════════════════════════════════════════════════════════ */
(function(){
  var LOCK = '<span class="lock" aria-hidden="true">🔒</span>';
  var A = {
    '1': {
      badge: LOCK + 'Секретный видео-разбор',
      h1: 'Как мы сделали запуск на <span class="g">$300&nbsp;000</span>, когда рынок падал',
      lede: 'Полный разбор системы запусков, которая за два года вывела меня с нуля до собственной онлайн-школы на $2M+ — <b>без огромной аудитории и ежедневного контента</b>',
      cta: 'Забрать разбор'
    },
    '2': {
      badge: LOCK + 'Секретный видео-разбор',
      h1: 'Эта схема запуска принесла мне <span class="g">$300&nbsp;000</span>',
      lede: 'Забери секретный разбор <b>схемы запусков</b>, которая за 2 года вывела меня с нуля на $300K — <b>на небольшом блоге с 700–1&nbsp;000 охватов</b>',
      cta: 'Забрать разбор',
      hero: 'photo',
      ladder: false
    },
    '3': {
      badge: '<span class="lock" aria-hidden="true">🎬</span>Видео-гайд для экспертов и продюсеров',
      badgeGhost: true,
      h1: '<span class="pre big">Протокол запуска</span>Как вырасти с $3&nbsp;000 до <span class="g">$10&nbsp;000+</span> в инфобизнесе',
      lede: 'Я дам вам пошаговый протокол, чтобы вырасти в личном доходе с инфобизнеса до $10&nbsp;000+ — <b>без большой аудитории и регулярного ведения блога</b>',
      cta: 'Забрать протокол',
      ladder: false,
      plate: true,
      play: false
    },
    '4': {
      badge: LOCK + 'Закрытая видео-экскурсия',
      h1: 'Экскурсия в проект, который делает <span class="g">$300&nbsp;000</span> за запуск',
      lede: 'Проведу по всем комнатам: воронка, таблицы выручки, переписки с командой — <b>шесть рабочих документов</b>, по которым собран этот запуск — <b>без теории и без причёсанных кейсов</b>',
      cta: 'Пойти на экскурсию'
    }
  };
  var key = new URLSearchParams(location.search).get('a') || '1';
  if(!A[key]) key = '1';
  document.documentElement.setAttribute('data-angle', key);
  if(key === '1') return;
  var c = A[key];
  function set(id, html){ var e = document.getElementById(id); if(e) e.innerHTML = html; }
  set('a-kicker', c.badge);
  if(c.badgeGhost){ var B = document.getElementById('a-kicker'); if(B) B.classList.add('ghost'); }
  set('a-h1', c.h1);
  set('a-lede', c.lede);
  if(c.hero === 'photo'){ var T = document.querySelector('.tape'); if(T){ T.className = 'tape photo'; T.parentNode.classList.add('full');
    T.innerHTML = '<img src="img/hero-market@2x.jpg" width="2750" height="1536" fetchpriority="high" decoding="async" alt="Саша Горевич — разбор запуска на $300 000">'; } }
  if(c.plate){ var L2 = document.getElementById('a-lede'), S = document.querySelector('.hero-shot');
    if(L2 && S){ L2.className = 'lede-plate'; S.parentNode.insertBefore(L2, S.nextSibling); } }
  if(c.play === false){ var P = document.querySelector('.tape .play'); if(P) P.remove(); }
  if(c.ladder === false){ var L = document.getElementById('a-ladder'); if(L) L.remove(); }
  Array.prototype.forEach.call(document.querySelectorAll('.cta-label'), function(b){ b.textContent = c.cta; });
})();
