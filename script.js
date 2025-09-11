document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Пошук (fetch + локальні дані) ---------- */
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const resultsContainer = document.querySelector('.search-results');

  if (searchInput && searchButton && resultsContainer) {
    async function searchBooks() {
      const query = searchInput.value.trim().toLowerCase();
      if (!query) {
        resultsContainer.innerHTML = '';
        resultsContainer.classList.remove('show-shadow');
        return;
      }

      let data = [];

      try {
        // === Основна спроба через fetch ===
        const res = await fetch('books.json', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        data = await res.json();
      } catch (err) {
        // === Якщо fetch не працює — використовуємо локальні дані ===
        console.warn('⚠ Fetch не спрацював, використовую локальні дані:', err);
        if (window.BOOKS_DATA && window.BOOKS_DATA.length) {
          data = window.BOOKS_DATA;
        } else {
          console.error('❌ Локальні дані відсутні');
          resultsContainer.innerHTML = '<div class="search-result-item">Помилка завантаження</div>';
          resultsContainer.classList.add('show-shadow');
          return;
        }
      }

      // === Фільтрація книг ===
      const results = data.filter(b =>
        [b.title, b.author, b.genres, b.description]
          .filter(Boolean)
          .some(f => f.toLowerCase().includes(query))
      );

      // === Відображення результатів ===
      if (results.length) {
        resultsContainer.innerHTML = results.map(b => `
          <div class="search-result-item">
            <a href="books/book.html?id=${b.id}">${b.title}</a>
          </div>
        `).join('');
      } else {
        resultsContainer.innerHTML = '<div class="search-result-item">ㅤНічого не знайдено 😢</div>';
      }

      resultsContainer.classList.add('show-shadow');
    }

    // Клік по кнопці пошуку
    searchButton.addEventListener('click', searchBooks);

    // Натискання Enter у полі пошуку
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') searchBooks();
    });
  }

  /* ---------- Слайдер банера (якщо є слайди) ---------- */
  const slides = document.querySelectorAll('.banner-slide');
  if (slides && slides.length) {
    let current = 0;
    const intervalTime = 5000;
    const animTime = 1000;

    function initSlides() {
      slides.forEach((slide, i) => {
        slide.style.transition = `transform ${animTime}ms ease`;
        slide.style.transform = i === 0 ? 'translateX(0)' : 'translateX(100%)';
      });
    }

    function nextSlide() {
      const currentSlide = slides[current];
      const nextIndex = (current + 1) % slides.length;
      const nextSlideEl = slides[nextIndex];

      currentSlide.style.transform = 'translateX(-100%)';
      nextSlideEl.style.transform = 'translateX(0)';

      setTimeout(() => {
        currentSlide.style.transition = 'none';
        currentSlide.style.transform = 'translateX(100%)';
        void currentSlide.offsetWidth; // reset
        currentSlide.style.transition = `transform ${animTime}ms ease`;
      }, animTime);

      current = nextIndex;
    }

    initSlides();
    setInterval(nextSlide, intervalTime);
  }

  /* ---------- Модалка підтримки (якщо є) ---------- */
  const supportBtn = document.querySelector('.support-btn');
  const modal = document.getElementById('supportModal');
  const closeModalBtn = document.getElementById('closeModal');

  if (supportBtn && modal && closeModalBtn) {
    supportBtn.addEventListener('click', () => modal.style.display = 'flex');
    closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  /* ---------- Авторизація: перемикання форм ---------- */
  const showRegister = document.getElementById('showRegister');
  const showLogin = document.getElementById('showLogin');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (showRegister && showLogin && loginForm && registerForm) {
    showRegister.addEventListener('click', () => {
      loginForm.style.transform = 'translateX(-100%)';
      registerForm.style.transform = 'translateX(0)';
    });
    showLogin.addEventListener('click', () => {
      loginForm.style.transform = 'translateX(0)';
      registerForm.style.transform = 'translateX(100%)';
    });
  }

  /* ---------- Гамбургер меню ---------- */
  const burger = document.getElementById('hamburgerMenu');
  const mobileMenu = document.getElementById('mobileMenu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobileMenu.classList.toggle('active');
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        burger.classList.remove('open');
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        mobileMenu.classList.remove('active');
        burger.classList.remove('open');
      }
    });
  }

});
