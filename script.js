document.addEventListener('DOMContentLoaded', () => {
    const productsList = document.getElementById('products');
    const descriptionButton = document.getElementById('description-button');
    const showCatButton = document.getElementById('show-cat-button');
    const searchInput = document.getElementById('search-input');
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.querySelector('.close');
    const catModal = document.getElementById('cat-modal'); // Получаем модальное окно для котика
    const catImage = document.getElementById('cat-image'); // Получаем изображение котика внутри модального окна
    const catModalClose = document.getElementById('cat-modal-close');

    // Массив URL изображений кошек (замените своими!)
    const catImageUrls = [
        'https://i.pinimg.com/originals/9c/fa/7d/9cfa7d4cb9937ac2a9ee5f9ed5a9cadf.jpg',
        'https://g4.sunlight.net/media/customers/avatars-processed/46/63/d4/4663d4df7728af6d574103ae69c8727665e0e099.jpg',
        'https://i.pinimg.com/736x/41/0f/6e/410f6e6187e47c3c5909a7e2681e1f78.jpg',
        'https://i.pinimg.com/736x/e7/c2/91/e7c2917e93505c99ac39f410ccf380f8.jpg',
        'https://i.pinimg.com/736x/51/b7/85/51b785d911540bf0569cd67e838d2f1b.jpg',
        'https://i.pinimg.com/736x/62/c6/02/62c6023b5c0aab02078841eadd4490e3.jpg'
    ];

    // Пример данных о продуктах
    let productsData = [
        { name: 'Паста карбонара', rating: 'люблю' },
        { name: 'Яблоко', rating: 'хорошо' },
        { name: 'Банан', rating: 'люблю' },
    { name: 'Апельсин', rating: 'хорошо' },
    { name: 'Клубника', rating: 'люблю' },
    { name: 'Виноград', rating: 'хорошо' },
    { name: 'Арбуз', rating: 'хорошо' },
    { name: 'Персик', rating: 'люблю' },
    { name: 'Манго', rating: 'ужасно' },
    { name: 'Ананас', rating: 'люблю' },
    { name: 'Киви', rating: 'хорошо' },
    { name: 'Гранат', rating: 'сойдет' },
    { name: 'Малина 💋', rating: 'люблю' },
    { name: 'Черника', rating: 'люблю' },
    { name: 'Ежевика', rating: 'люблю' },
    { name: 'Лимон', rating: 'хорошо' },
    { name: 'Грейпфрут', rating: 'сойдет' },
    { name: 'Слива', rating: 'хорошо' },
    { name: 'Авокадо', rating: 'люблю' },
    { name: 'Морковь', rating: 'люблю' },
    { name: 'Огурец', rating: 'хорошо' },
    { name: 'Помидор', rating: 'люблю' },
    { name: 'Брокколи', rating: 'ужасно' },
    { name: 'Шпинат', rating: 'ужасно' },
    { name: 'Перец', rating: 'ужасно' },
    { name: 'Капуста свежая', rating: 'хорошо' },
    { name: 'Капуста любая не свежая', rating: 'ужасно' },
    { name: 'Лук', rating: 'ужасно' },
    { name: 'Чеснок', rating: 'ужасно' },
    { name: 'Картофель', rating: 'люблю' },
    { name: 'Грибы', rating: 'люблю' },
    { name: 'Баклажан', rating: 'ужасно' },
    { name: 'Тыква', rating: 'ужасно' },
    { name: 'Редис', rating: 'ужасно' },
    { name: 'Свекла', rating: 'хорошо' },
    { name: 'Сельдерей', rating: 'ужасно' },
    { name: 'Горох свежий', rating: 'люблю' },
    { name: 'Горох консервированный', rating: 'ужасно' },
    { name: 'Кукуруза', rating: 'люблю' },
    { name: 'Кокос', rating: 'ужасно' },
    { name: 'Говядина', rating: 'люблю' },
    { name: 'Свинина', rating: 'люблю' },
    { name: 'Курица', rating: 'люблю' },
    { name: 'Индейка', rating: 'сойдет' },
    { name: 'Баранина', rating: 'сойдет' },
    { name: 'Бекон', rating: 'люблю' },
    { name: 'Ветчина', rating: 'люблю' },
    { name: 'Колбаса', rating: 'люблю' },
    { name: 'Сосиски', rating: 'люблю' },
    { name: 'Паштет', rating: 'люблю' },
    { name: 'Лосось', rating: 'люблю' },
    { name: 'Тунец', rating: 'люблю' },
    { name: 'Форель', rating: 'люблю' },
    { name: 'Семга', rating: 'люблю' },
    { name: 'Чай без добавок', rating: 'люблю' },
    { name: 'Чай с сахаром', rating: 'сойдет' },
    { name: 'Чай с имбирем/медом/и тд', rating: 'ужасно' },
    { name: 'Чай зеленый', rating: 'люблю' },
    { name: 'Чай черный', rating: 'хорошо' },
    { name: 'Чай молочный улун', rating: 'люблю' },
    { name: 'Чай с ягодами/фруктами', rating: 'сойдет' },
    { name: 'Эспрессо', rating: 'ужасно' },
    { name: 'Американо', rating: 'ужасно' },
    { name: 'Капучино', rating: 'люблю' },
    { name: 'Латте', rating: 'хорошо' },
    { name: 'Раф', rating: 'хорошо' },
    { name: 'Айс Кофе', rating: 'ужасно' },
    { name: 'Кока-Кола', rating: 'сойдет' },
  { name: 'Пепси', rating: 'сойдет' },
  { name: 'Спрайт', rating: 'люблю' },
  { name: 'Фанта', rating: 'ужасно' },
  { name: '7 Up', rating: 'люблю' },
  { name: 'Миринда', rating: 'ужасно' },
  { name: 'Доктор Пеппер', rating: 'ужасно' },
  { name: 'Маунтин Дью', rating: 'хорошо' },
  { name: 'Тархун', rating: 'ужасно' },
  { name: 'Дюшес', rating: 'хорошо' },
  { name: 'Лимонад', rating: 'люблю' },
  { name: 'Мохито', rating: 'люблю' },
  { name: 'Квас', rating: 'ужасно' },
  { name: 'Апельсиновый сок', rating: 'сойдет' },
    { name: 'Яблочный сок', rating: 'люблю' },
    { name: 'Томатный сок', rating: 'ужасно' },
    { name: 'Виноградный сок', rating: 'ужасно' },
    { name: 'Ананасовый сок', rating: 'ужасно' },
    { name: 'Гранатовый сок', rating: 'ужасно' },
    { name: 'Персиковый сок', rating: 'люблю' },
    { name: 'Мультифруктовый сок', rating: 'хорошо' },
    { name: 'Морковный сок', rating: 'ужасно' },
    { name: 'Вишневый сок', rating: 'сойдет' },
    { name: 'Вода газированная/со всякими привкусами', rating: 'сойдет' },
    { name: 'Пицца Маргарита', rating: 'люблю' },
    { name: 'Пицца Пепперони', rating: 'сойдет' },
    { name: 'Пицца Гавайская', rating: 'ужасно' },
    { name: 'Пицца Четыре сыра', rating: 'люблю' },
    { name: 'Пицца Мясная', rating: 'люблю' },
    { name: 'Пицца Вегетарианская', rating: 'ужасно' },
    { name: 'Пицца Карбонара', rating: 'люблю' },
    { name: 'Суп Борщ', rating: 'люблю' },
    { name: 'Суп Щи', rating: 'ужасно' },
    { name: 'Суп Куриный', rating: 'люблю' },
    { name: 'Суп Гороховый', rating: 'ужасно' },
    { name: 'Суп Рассольник', rating: 'ужасно' },
    { name: 'Суп Солянка', rating: 'ужасно' },
    { name: 'Суп Молочный', rating: 'люблю' },
    { name: 'Суп Сырный', rating: 'люблю' },
    { name: 'Каша Овсяная', rating: 'сойдет' },
    { name: 'Каша Рисовая', rating: 'люблю' },
    { name: 'Каша Манная', rating: 'люблю' },
    { name: 'Каша Гречневая', rating: 'люблю' },
    { name: 'Каша Пшенная', rating: 'люблю' },
    { name: 'Каша Перловая', rating: 'ужасно' },
    { name: 'Каша Геркулесовая', rating: 'ужасно' },
    { name: 'Мёд', rating: 'хорошо' },
    { name: 'Варенье', rating: 'люблю' },
    { name: 'Джем', rating: 'люблю' },
    { name: 'Яичница (не на масле, с жидким желтком)', rating: 'люблю' },
    { name: 'Омлет', rating: 'сойдет' },
    { name: 'Блины', rating: 'люблю' },
    { name: 'Сырники', rating: 'люблю' },
    { name: 'Йогурт', rating: 'хорошо' },
    { name: 'Хлопья с молоком', rating: 'люблю' },
    { name: 'Творог', rating: 'хорошо' },
    { name: 'Мюсли', rating: 'ужасно' },
    { name: 'Кефир', rating: 'хорошо' },
    { name: 'Сметана', rating: 'хорошо' },
    { name: 'Сыр', rating: 'люблю' },
    { name: 'Соус Чесночный', rating: 'ужасно' },
    { name: 'Соус Сырный', rating: 'люблю' },
    { name: 'Соус Терияки', rating: 'ужасно' },
    { name: 'Соус Горчичный', rating: 'ужасно' },
    { name: 'Соус Кетчуп', rating: 'сойдет' },
    { name: 'Соус Майонез', rating: 'сойдет' },
    { name: 'Изюм', rating: 'ужасно' },
    { name: 'Сухофрукты', rating: 'ужасно' },
    { name: 'Оливки', rating: 'ужасно' },
    { name: 'Маслины', rating: 'ужасно' },
    { name: 'Орехи', rating: 'люблю' },
    { name: 'Тортилья', rating: 'люблю' },
    { name: 'Лаваш', rating: 'люблю' },
    { name: 'Хлебцы', rating: 'сойдет' },
    { name: 'Кисель', rating: 'ужасно' },
    { name: 'Компот', rating: 'ужасно' },
    { name: 'Мидии', rating: 'люблю' },
    { name: 'Креветки', rating: 'люблю' },
    { name: 'Крабовые палочки', rating: 'хорошо' },
    { name: 'Икра', rating: 'сойдет' },
    { name: 'Сендвич-роллы', rating: 'ужасно' },
    { name: 'Сендвичи магазинные', rating: 'ужасно' },
    { name: 'Шаурма', rating: 'сойдет' },
    { name: 'Наггетсы', rating: 'люблю' }
    ];

    // Функция для создания элемента списка продуктов
    function createProductItem(product) {
        const li = document.createElement('li');
        const ratingClass = `label ${product.rating}`;
        li.innerHTML = `
            <span class="product-name">${product.name}</span>
            <span class="${ratingClass}">${product.rating}</span>
        `;
        return li;
    }

    // Функция для отображения списка продуктов
    function renderProductList(products) {
        productsList.innerHTML = '';
        products.forEach(product => {
            const productItem = createProductItem(product);
            productsList.appendChild(productItem);
        });
    }

    // Функция для добавления продукта (убрана модалка и упрощено добавление)
    function addProduct(name, rating) {
        productsData.push({ name: name, rating: rating });
        renderProductList(getFilteredProducts());
    }

    // Функция для открытия модального окна с описанием
    function openDescriptionModal() {
        modalBody.innerHTML = `
            <h3>Описание пометок</h3>
            <p><b>"люблю"</b> - Такое мы любим, такое мы едим тоннами. За эту вещь кошка вам все грехи простит, честно.</p>
            <p><b>"хорошо"</b> - Обычная вкусная еда, не что-то выдающееся, но кошка happy.</p>
            <p><b>"сойдет"</b> - Корчиться не будет (наверное) и на том спасибо, но не советую конечно.</p>
            <p><b>"ужасно"</b> - И этим ты собрался травить кошку??? Сейчас бы тебя.. да за жестокое обращение с животными... позорник.</p>
        `;
        modal.style.display = 'block';
    }

    // Функция для закрытия модального окна
    function closeModal() {
        modal.style.display = 'none';
        catModal.style.display = 'none'; // Скрываем модальное окно котика
    }

    // Функция для фильтрации продуктов по поисковому запросу
    function getFilteredProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        return productsData.filter(product => product.name.toLowerCase().includes(searchTerm));
    }

    // Функция для показа случайной картинки кошки в модальном окне
    function showRandomCat() {
        const randomIndex = Math.floor(Math.random() * catImageUrls.length);
        const imageUrl = catImageUrls[randomIndex];
        catImage.src = imageUrl; // Устанавливаем изображение в модальное окно
        catModal.style.display = 'block'; // Отображаем модальное окно
    }

    // Обработчики событий
    descriptionButton.addEventListener('click', openDescriptionModal);
    showCatButton.addEventListener('click', showRandomCat);
    modalClose.addEventListener('click', closeModal);
    catModalClose.addEventListener('click', closeModal); // Закрытие модального окна котика
    searchInput.addEventListener('input', () => {
        renderProductList(getFilteredProducts());
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', (event) => {
        if (event.target == modal || event.target == catModal) {
            closeModal();
        }
    });

    // Инициализация: отображаем список продуктов при загрузке страницы
    renderProductList(productsData);
});