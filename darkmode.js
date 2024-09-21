document.addEventListener('DOMContentLoaded', () => {
  const darkModeEnabled = localStorage.getItem('dark-mode') === 'true';
  const body = document.body;

  if (darkModeEnabled) {
      body.classList.add('dark-mode');
  } else {
      body.classList.remove('dark-mode');
  }

  const checkbox = document.getElementById('checkbox');
  const mobileCheckbox = document.getElementById('mobile-checkbox');

  checkbox.checked = darkModeEnabled;
  mobileCheckbox.checked = darkModeEnabled;

  checkbox.addEventListener('change', (event) => {
      if (event.target.checked) {
          body.classList.add('dark-mode');
          localStorage.setItem('dark-mode', 'true');
      } else {
          body.classList.remove('dark-mode');
          localStorage.setItem('dark-mode', 'false');
      }
  });

  mobileCheckbox.addEventListener('change', (event) => {
      if (event.target.checked) {
          body.classList.add('dark-mode');
          localStorage.setItem('dark-mode', 'true');
      } else {
          body.classList.remove('dark-mode');
          localStorage.setItem('dark-mode', 'false');
      }
  });
});
