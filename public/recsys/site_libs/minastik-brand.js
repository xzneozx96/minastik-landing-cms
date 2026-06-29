(function () {
  var KEY = 'mnk-theme';
  var DEFAULT = 'light';

  function getTheme() {
    return localStorage.getItem(KEY) || DEFAULT;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    document.body.classList.remove('quarto-light', 'quarto-dark');
    document.body.classList.add(theme === 'dark' ? 'quarto-dark' : 'quarto-light');
    var btn = document.getElementById('mnk-theme-toggle');
    if (btn) {
      btn.innerHTML = theme === 'dark'
      ? '<i class="bi bi-sun"></i>'
      : '<i class="bi bi-moon"></i>';
      btn.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      btn.setAttribute('aria-label', btn.title);
    }
  }

  function addToggle() {
    var tools = document.querySelector('.quarto-navbar-tools');
    if (!tools || document.getElementById('mnk-theme-toggle')) return;
    var btn = document.createElement('button');
    btn.id = 'mnk-theme-toggle';
    var theme = getTheme();
    btn.innerHTML = theme === 'dark'
      ? '<i class="bi bi-sun"></i>'
      : '<i class="bi bi-moon"></i>';
    btn.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    btn.setAttribute('aria-label', btn.title);
    btn.addEventListener('click', function () {
      var next = getTheme() === 'dark' ? 'light' : 'dark';
      localStorage.setItem(KEY, next);
      applyTheme(next);
    });
    tools.insertBefore(btn, tools.firstChild);
  }

  // Apply immediately (before paint) to prevent flash
  document.documentElement.setAttribute('data-bs-theme', getTheme());

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      applyTheme(getTheme());
      addToggle();
    });
  } else {
    applyTheme(getTheme());
    addToggle();
  }
})();
