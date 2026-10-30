/* ═══════════════════════════════════════════════════════════════
   ЧЕТЫРЕ ВЕРСИИ САЙТА. Переключение: ?a=1 … ?a=4. По умолчанию — 1.
   Версия 1 лежит в разметке статически, скрипт переписывает под 2–4.
   Тексты — из таблицы Саши, 16.09.2026.
   ═══════════════════════════════════════════════════════════════ */
(function(){
  var LOCK = '<span class="lock" aria-hidden="true">🔒</span>';
  var A = {
    '1': {
      badge: LOCK + 'Секретний відео-розбір',
      h1: 'Як ми зробили запуск на <span class="g">$300&nbsp;000</span>, коли ринок падав',
      lede: 'Повний розбір системи запусків, яка за два роки вивела мене з нуля до власної онлайн-школи на $2M+ — <b>без великої аудиторії та щоденного контенту</b>',
      cta: 'Забрати розбір'
    },
    '2': {
      badge: LOCK + 'Секретний відео-розбір',
      h1: 'Ця схема запуску принесла мені <span class="g">$300&nbsp;000</span>',
      lede: 'Забери секретний розбір <b>схеми запусків</b>, яка за 2 роки вивела мене з нуля на $300K — <b>на невеликому блозі з 700–1&nbsp;000 охоплень</b>',
      cta: 'Забрати розбір',
      hero: 'photo',
      ladder: false
    },
    '3': {
      badge: '<span class="lock" aria-hidden="true">🎬</span>Відео-гайд для експертів і продюсерів',
      badgeGhost: true,
      h1: '<span class="pre big">Протокол запуску</span>Як вирости з $3&nbsp;000 до <span class="g">$10&nbsp;000+</span> в інфобізнесі',
      lede: 'Я дам вам покроковий протокол, щоб вирости в особистому доході з інфобізнесу до $10&nbsp;000+ — <b>без великої аудиторії та регулярного ведення блогу</b>',
      cta: 'Забрати протокол',
      ladder: false,
      plate: true,
      play: false
    },
    '4': {
      badge: LOCK + 'Закрита відео-екскурсія',
      h1: 'Екскурсія в проєкт, який робить <span class="g">$300&nbsp;000</span> за запуск',
      lede: 'Проведу по всіх кімнатах: воронка, таблиці виручки, листування з командою — <b>шість робочих документів</b>, за якими зібраний цей запуск — <b>без теорії та без причесаних кейсів</b>',
      cta: 'Піти на екскурсію'
    }
  };
  var key = window.ANGLE || new URLSearchParams(location.search).get('a') || '1';
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
    T.innerHTML = '<img src="/img/hero-market-2x.webp" width="2750" height="1536" fetchpriority="high" decoding="async" alt="Саша Горевич — розбір запуску на $300 000">'; } }
  if(c.plate){ var L2 = document.getElementById('a-lede'), S = document.querySelector('.hero-shot');
    if(L2 && S){ L2.className = 'lede-plate'; S.parentNode.insertBefore(L2, S.nextSibling); } }
  if(c.play === false){ var P = document.querySelector('.tape .play'); if(P) P.remove(); }
  if(c.ladder === false){ var L = document.getElementById('a-ladder'); if(L) L.remove(); }
  Array.prototype.forEach.call(document.querySelectorAll('.cta-label'), function(b){ b.textContent = c.cta; });
})();
