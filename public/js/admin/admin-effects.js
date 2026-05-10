document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('tbody tr').forEach((row, i) => {
      row.style.opacity = '0';
      row.style.transform = 'translateY(12px)';
      setTimeout(() => {
        row.style.transition = 'all 0.4s ease-out';
        row.style.opacity = '1';
        row.style.transform = 'translateY(0)';
      }, i * 60);
    });
  });