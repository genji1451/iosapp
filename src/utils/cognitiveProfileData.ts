export type CognitiveDomain = 'memory' | 'attention' | 'executive' | 'language';

export type CognitiveQuestion = {
  id: number;
  domain: CognitiveDomain;
  text: string;
  options: string[];
  correctAnswer: string;
};

export const cognitiveQuestions: CognitiveQuestion[] = [
  { id: 1, domain: 'memory', text: 'Запомните слова: ЛЕС, ЧАСЫ, КНИГА. Какого слова не было?', options: ['ЛЕС', 'ЧАСЫ', 'МОРЕ', 'КНИГА'], correctAnswer: 'МОРЕ' },
  { id: 2, domain: 'attention', text: 'Выберите число, которое идет после 17.', options: ['16', '18', '19', '20'], correctAnswer: '18' },
  { id: 3, domain: 'executive', text: 'Что нужно сделать сначала при выполнении сложной задачи?', options: ['Сразу начать', 'Составить план', 'Отложить', 'Спросить у всех'], correctAnswer: 'Составить план' },
  { id: 4, domain: 'language', text: 'Выберите синоним слова "быстрый".', options: ['медленный', 'скорый', 'тихий', 'долгий'], correctAnswer: 'скорый' },
  { id: 5, domain: 'memory', text: 'Какое слово было первым: ЛЕС, ЧАСЫ, КНИГА?', options: ['ЛЕС', 'ЧАСЫ', 'КНИГА', 'Невозможно сказать'], correctAnswer: 'ЛЕС' },
  { id: 6, domain: 'attention', text: 'Найдите лишнее число: 2, 4, 6, 9, 8.', options: ['2', '6', '9', '8'], correctAnswer: '9' },
  { id: 7, domain: 'executive', text: 'Если правило изменилось, что лучше сделать?', options: ['Продолжать по-старому', 'Переключиться на новое правило', 'Остановиться', 'Пропустить шаг'], correctAnswer: 'Переключиться на новое правило' },
  { id: 8, domain: 'language', text: 'Выберите слово, противоположное "высокий".', options: ['длинный', 'низкий', 'узкий', 'глубокий'], correctAnswer: 'низкий' },
  { id: 9, domain: 'memory', text: 'Выберите пару, которую легче запомнить по смыслу.', options: ['стол - окно', 'врач - больница', 'ночь - карандаш', 'лист - камень'], correctAnswer: 'врач - больница' },
  { id: 10, domain: 'attention', text: 'Сколько букв в слове "мама"?', options: ['2', '3', '4', '5'], correctAnswer: '4' },
  { id: 11, domain: 'executive', text: 'Что лучше помогает не забыть важную встречу?', options: ['Надеяться на память', 'Поставить напоминание', 'Игнорировать', 'Перенести без причины'], correctAnswer: 'Поставить напоминание' },
  { id: 12, domain: 'language', text: 'Какое предложение грамматически верное?', options: ['Я вчера идем домой', 'Мы читали книгу', 'Она будут писать', 'Ты былы дома'], correctAnswer: 'Мы читали книгу' },
  { id: 13, domain: 'memory', text: 'Что помогает лучше запоминать новую информацию?', options: ['Повторение', 'Случайный просмотр', 'Многозадачность', 'Шум'], correctAnswer: 'Повторение' },
  { id: 14, domain: 'attention', text: 'Выберите число между 30 и 32.', options: ['29', '31', '33', '34'], correctAnswer: '31' },
  { id: 15, domain: 'executive', text: 'Если вы заметили ошибку, что лучше сделать?', options: ['Игнорировать', 'Исправить и продолжить', 'Остановиться навсегда', 'Обвинить других'], correctAnswer: 'Исправить и продолжить' },
  { id: 16, domain: 'language', text: 'Выберите лишнее слово.', options: ['яблоко', 'груша', 'слива', 'стул'], correctAnswer: 'стул' },
  { id: 17, domain: 'memory', text: 'Что обычно сложнее: узнавание или воспроизведение без подсказки?', options: ['Узнавание', 'Воспроизведение без подсказки', 'Одинаково', 'Зависит только от возраста'], correctAnswer: 'Воспроизведение без подсказки' },
  { id: 18, domain: 'attention', text: 'Выберите правильную последовательность.', options: ['Пн, Ср, Вт', 'Вт, Ср, Чт', 'Чт, Вт, Ср', 'Сб, Пт, Вс'], correctAnswer: 'Вт, Ср, Чт' },
  { id: 19, domain: 'executive', text: 'Как лучше подойти к большой цели?', options: ['Делить на шаги', 'Ждать вдохновения', 'Делать все сразу', 'Отказаться'], correctAnswer: 'Делить на шаги' },
  { id: 20, domain: 'language', text: 'Закончите фразу: "Собака ...".', options: ['летает', 'лает', 'пишет', 'рисует'], correctAnswer: 'лает' },
];

export const domainTitles: Record<CognitiveDomain, string> = {
  memory: 'Память',
  attention: 'Внимание',
  executive: 'Исполнительные функции',
  language: 'Речь и язык',
};
