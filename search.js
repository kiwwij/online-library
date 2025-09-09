// ==== Хеш-таблиця для швидкого доступу ====
let bookHash = {};

// ==== Завантажуємо книги ====
async function loadBooks() {
  try {
    const res = await fetch('books.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Не вдалося завантажити books.json');
    const data = await res.json();
    data.forEach(book => bookHash[book.id] = book);
  } catch (err) {
    console.warn('⚠ Fetch не спрацював, використовуємо локальні дані:', err);
    if (window.BOOKS_DATA && window.BOOKS_DATA.length) {
      window.BOOKS_DATA.forEach(book => bookHash[book.id] = book);
    } else {
      console.error('Локальні дані відсутні');
      resultDiv.innerHTML = '❌ Помилка завантаження даних!';
      resultDiv.classList.add('active');
    }
  }
}

// ==== Елементи DOM ====
const searchBtn = document.getElementById('search-id-btn');
const searchInput = document.getElementById('search-id');
const resultDiv = document.getElementById('result-id');

// ==== Функція пошуку ====
function searchBook() {
  const id = searchInput.value.trim();
  resultDiv.innerHTML = '';
  resultDiv.classList.remove('active');

  if (!id) {
    resultDiv.innerHTML = '<p style="color:#b91c1c;">⚠ Введіть ID книги</p>';
    resultDiv.classList.add('active');
    return;
  }

  const book = bookHash[id];
  if (book) {
    resultDiv.innerHTML = `
      <div class="book-result">
        <img src="${book.image}" alt="${book.title}" class="book-result-img">
        <div class="book-result-info">
          <h3>${book.title}</h3>
          <p><strong>Автор:</strong> ${book.author}</p>
          <p><strong>Жанри:</strong> ${book.genres}</p>
          <p>${book.description}</p>
          <a href="books/book.html?id=${book.id}" class="book-link-btn">Перейти до книги</a>
        </div>
      </div>
    `;
  } else {
    resultDiv.innerHTML = '<p style="color:#b91c1c;">❌ Книга не знайдена</p>';
  }

  resultDiv.classList.add('active');
}

// ==== Події ====
searchBtn.addEventListener('click', searchBook);
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') searchBook();
});

// ==== Завантаження даних перед використанням пошуку ====
loadBooks();
