/* 공통 헤더·푸터 삽입 + 현재 페이지 메뉴 활성화 */
(function () {
  const currentFile = location.pathname.split('/').pop() || 'index.html';

  function loadFragment(selector, file, callback) {
    fetch(file)
      .then(r => r.text())
      .then(html => {
        document.querySelector(selector).innerHTML = html;
        if (callback) callback();
      })
      .catch(err => console.warn('Fragment load error:', file, err));
  }

  loadFragment('#header-placeholder', './header.html', function () {
    /* 현재 페이지 nav 항목 활성화 */
    document.querySelectorAll('#gs-nav ul li a').forEach(link => {
      const href = link.getAttribute('href').replace('./', '');
      if (href === currentFile || (currentFile === '' && href === 'index.html')) {
        link.closest('li').classList.add('current');
      }
    });

    /* 햄버거 메뉴 */
    const hamburger = document.getElementById('gs-hamburger');
    const nav = document.getElementById('gs-nav');
    if (hamburger && nav) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        nav.classList.toggle('open');
      });
    }
  });

  loadFragment('#footer-placeholder', './footer.html');
})();
