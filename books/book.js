document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const bookId = parseInt(params.get('id'), 10);

  const titleEl = document.getElementById('book-title');
  const authorEl = document.getElementById('book-author');
  const genresEl = document.getElementById('book-genres');
  const descriptionEl = document.getElementById('book-description');
  const imageEl = document.getElementById('book-image');

  if (!bookId) {
    alert('Книга не знайдена!');
    window.location.href = '../all_books.html';
    return;
  }

  // Функція, яка намагається завантажити JSON, а якщо не вдасться — використовує локальні дані
  async function getBooks() {
    try {
      const res = await fetch('../books.json', { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('⚠ Fetch не спрацював, використовую локальні дані:', err);
      return window.BOOKS_DATA || [];
    }
  }

  const books = await getBooks();
  const book = books.find(b => b.id === bookId);

  if (!book) {
    alert('Книга не знайдена!');
    window.location.href = '../all_books.html';
    return;
  }

  // Заповнюємо сторінку
  titleEl.textContent = book.title;
  authorEl.textContent = book.author;
  genresEl.textContent = book.genres;
  descriptionEl.textContent = book.description;
  imageEl.src = `../${book.image}`;
  imageEl.alt = book.title;
});
