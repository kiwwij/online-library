document.addEventListener('DOMContentLoaded', () => {
  const booksContainer = document.getElementById('books-list');
  const filterCountry = document.getElementById('filter-country');
  const filterGenre = document.getElementById('filter-genre');
  const sortSelect = document.getElementById('sort-books');

  let booksData = [];

  // Функція відображення книг
  function displayBooks(books) {
    booksContainer.innerHTML = '';

    if (books.length === 0) {
      booksContainer.innerHTML = '<p class="no-books">Немає книг за цими фільтрами</p>';
      return;
    }

    books.forEach(book => {
      const bookCard = document.createElement('div');
      bookCard.classList.add('book-card');

      const shortDescription = book.description.length > 75 
        ? book.description.substring(0, 75) + '...' 
        : book.description;

      bookCard.innerHTML = `
        <img src="${book.image}" alt="${book.title}" class="book-image">
        <div class="book-info">
          <h3 class="book-title">${book.title}</h3>
          <p class="book-author"><strong>Автор:</strong> ${book.author}</p>
          <p class="book-genres"><strong>Жанри:</strong> ${book.genres}</p>
          <p class="book-country"><strong>Країна:</strong> ${book.country}</p>
          <p class="book-description">${shortDescription}</p>
          <a href="books/book.html?id=${book.id}" class="btn">Детальніше</a>
        </div>
      `;
      booksContainer.appendChild(bookCard);
    });
  }

  // Фільтрація + сортування
  function filterAndSortBooks() {
    const countryValue = filterCountry.value;
    const genreValue = filterGenre.value;
    const sortValue = sortSelect.value;

    let filteredBooks = booksData.filter(book => {
      const countryMatch = countryValue === 'all' || book.country === countryValue;
      const genreMatch = genreValue === 'all' || book.genres.includes(genreValue);
      return countryMatch && genreMatch;
    });

    const collator = new Intl.Collator('uk', { sensitivity: 'base' });

    filteredBooks.sort((a, b) => {
      switch (sortValue) {
        case 'title-asc': return collator.compare(a.title, b.title);
        case 'title-desc': return collator.compare(b.title, a.title);
        case 'author-asc': return collator.compare(a.author, b.author);
        case 'author-desc': return collator.compare(b.author, a.author);
        default: return 0;
      }
    });

    displayBooks(filteredBooks);
  }

  // ===== Основна логіка завантаження =====
  fetch('books.json')
    .then(response => response.json())
    .then(data => {
      booksData = data;
      displayBooks(booksData);
    })
    .catch(error => {
      console.warn('Не вдалося завантажити books.json, використовую локальні дані', error);
      booksData = window.BOOKS_DATA || [];
      displayBooks(booksData);
    });

  // Слухачі змін
  filterCountry.addEventListener('change', filterAndSortBooks);
  filterGenre.addEventListener('change', filterAndSortBooks);
  sortSelect.addEventListener('change', filterAndSortBooks);
});
