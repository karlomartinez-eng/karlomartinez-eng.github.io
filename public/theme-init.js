// Runs before first paint so the page never flashes the wrong theme.
// Day = 6:00-17:59 local time, night otherwise.
(function () {
  try {
    var h = new Date().getHours();
    document.documentElement.setAttribute('data-theme', h >= 6 && h < 18 ? 'light' : 'dark');
  } catch (e) {}
})();
