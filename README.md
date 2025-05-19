# Я-СЛЫШУ - Приложение для тренировки слуха

Мобильное приложение для тренировки слуха и словарного запаса, разработанное с использованием Expo (React Native).

## Технологии

- Expo
- React Navigation (Stack + Bottom Tabs)
- React Native
- TypeScript

## Установка

1. Убедитесь, что у вас установлен Node.js и npm
2. Установите Expo CLI глобально:
   ```bash
   npm install -g expo-cli
   ```
3. Клонируйте репозиторий
4. Установите зависимости:
   ```bash
   npm install
   ```
5. Запустите приложение:
   ```bash
   npm start
   ```

## Структура проекта

```
src/
  ├── assets/         # Изображения, звуки и другие ресурсы
  ├── components/     # Переиспользуемые компоненты
  ├── navigation/     # Настройки навигации
  ├── screens/        # Экраны приложения
  └── theme/          # Темы и стили
```

## Экраны

- SplashScreen: Экран загрузки
- AuthScreen: Экран авторизации
- PaymentScreen: Экран оплаты
- ModeSelectScreen: Выбор режима тренировки
- LessonSelectScreen: Выбор урока
- LessonScreen: Экран урока
- TestScreen: Экран тестирования

## Разработка

Приложение разработано с учетом лучших практик React Native и следует принципам Material Design. 