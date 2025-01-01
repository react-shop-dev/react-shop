import { TranslationMessages } from 'react-shop-types';

const ukrainianMessages: TranslationMessages = {
  rs: {
    action: {
      accept: 'Прийняти',
      add: 'Добавити',
      back: 'Назад',
      cancel: 'Скасувати',
      checkout: 'Замовити',
      clear_input_value: 'Очистити значення',
      close: 'Закрити',
      confirm: 'Підтвердити',
      continue: 'Продовжити покупки',
      create: 'Створити',
      decline: 'Відхилити',
      decrease: 'Зменшити',
      delete: 'Видалити',
      deselect: 'Скасувати вибір',
      edit: 'Редагувати',
      increase: 'Збільшити',
      move_down: 'Перемістити вниз',
      move_up: 'Перемістити вверх',
      open: 'Відкрити',
      refresh: 'Оновити',
      remove: 'Видалити',
      save: 'Зберегти',
      search: 'Пошук',
      select: 'Вибрати',
      selectAll: 'Вибрати всі',
      sort: 'Сортувати',
      start: 'Почати покупки',
      switch: 'Переключитись до',
      unselect: 'Cкасувати',
      update: 'Оновити',
    },
    auth: {
      account: 'Мій кабінет',
      auth_check_error: 'Увійдіть, щоб продовжити',
      forgot_password: 'Забули пароль?',
      login: 'Логін',
      logout: 'Вийти',
      profile: 'Профіль',
      reset_password: 'Новий пароль',
      sign_in: 'Увійти',
      sign_up: 'Зареєструватися',
    },
    boolean: {
      yes: 'Так',
      no: 'Ні',
    },
    cart: {
      add: 'Добавити в корзину',
      added: 'Добавлено в корзину!',
      clear: 'Очистити корзину',
      confirm: 'Ви дійсно бажаєте очистити корзину?',
      empty: 'Ваша Корзина пуста',
      inside: 'В корзині',
      link: 'До Корзини',
      open: 'Відкрити корзину',
      remove: 'Видалити з корзини',
      title: 'Корзина',
    },
    checkout: {
      customer: 'Покупець',
      delivery: 'Доставка',
      shipping: 'Адреса доставки',
      link: 'Оформити замовлення',
      payment: 'Оплата',
      review: 'Огляд',
      title: 'Checkout',
    },
    field: {
      address: 'Адреса',
      cardNumber: 'Номер картки',
      city: 'Місто',
      company: 'Компанія',
      confirm_password: 'Підтвердіть пароль',
      country: 'Країна',
      email: 'Електронна адреса',
      expirationDate: 'Дійсна до',
      firstName: "Ім'я",
      fullName: "Прізвище / Ім'я",
      lastName: 'Прізвище',
      name: "Ім'я",
      password: 'Пароль',
      phone: 'Телефон',
      province: 'Область',
      postalCode: 'Код пошти',
      username: "Ім'я користувача",
    },
    message: {
      created: 'Елемент створено',
      data_provider_error: 'dataProvider помилка. Перевірте консоль на наявність помилок.',
      empty: 'Cписок порожній',
      error: 'Щось пішло не так',
      http_error: 'Помилка сервера',
      invalid_form: 'Форма недійсна. Перевірте помилки',
      item_doesnt_exist: 'Елемент не знайдено',
      not_found: 'Ви набрали невірну URL-адресу, або перейшли за хибним посиланням',
      unsaved_changes: 'Деякі ваші зміни не збережено. Ви впевнені, що хочете їх ігнорувати?',
      updated: '{element} оновлено',
    },
    navigation: {
      back: 'Назад',
      drawer: 'Відкрити бічне меню',
      no_results_found: 'Результатів не знайдено',
      show: 'Показати',
      next: 'Наступний',
      previous: 'Попередній',
    },
    product: {
      author: 'Автор',
      category: 'Категорія',
      description: 'Опис',
      discount: 'Знижка',
      image: 'Зображення',
      inStock: 'Є в наявності',
      outStock: 'Немає в наявності',
      unavailable: 'Немає в наявності',
      items: '{count, plural, =0 {Нема товарів} =1 {1 товар} other {# товари}}',
      name: 'Назва',
      payment: 'Оплата',
      price: 'Ціна',
      quantity: 'Кількість',
      rating: 'Рейтинг',
      total: 'Разом',
    },
    sort: {
      ASC: 'висхідний',
      DESC: 'спадання',
      default: 'За замовчуванням',
      hignToLow: 'Від дорогих до дешевих',
      lowToHigh: 'Від дешевих до дорогих',
      rating: 'За рейтингом',
      top: 'Топ продажів',
    },
    validation: {
      email: 'Хибний email',
      maxLength: 'Максимальна кількість символів {max}',
      maxValue: 'Значення може бути {max} або менше',
      minLength: 'Мінімальна кількість символів {min}',
      minValue: 'Мінімальне значення {min}',
      number: 'Повинна бути цифра',
      oneOf: 'Повинен бути одним з: %{options}',
      regex: 'Повинен відповідати певним форматом (регулярний вираз): {pattern}',
      required: "Обов'язково для заповнення",
      unique: 'Повинен бути унікальним',
    },
    view: {
      dark: 'Темна',
      grid: 'Сітка',
      light: 'Cвітла',
      list: 'Список',
      switch: 'Вибрати {mode} тема',
      title: 'Вигляд',
    },
  },
  pages: {
    home: 'Головна',
    contacts: 'Контакти',
    not_found: 'Не знайдено',
  },
};

export default ukrainianMessages;
