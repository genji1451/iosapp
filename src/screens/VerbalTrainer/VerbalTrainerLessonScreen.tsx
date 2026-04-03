import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { spacing, radii, shadows } from '../../theme';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Card, ProgressBar, ActivityIndicator, useTheme } from 'react-native-paper';
import { BackHeader } from '../../components/ui/BackHeader';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, 'VerbalTrainerLesson'>;

// ВАЖНО: Ниже представлена структура данных для 10 уроков по 20 заданию в каждом.
// Вам необходимо заполнить ее реальными данными:
// - Заменить аудио-заглушки на реальные файлы.
// - Прописать правильные варианты ответов и правильный ответ.
export const lessonData = [
  // Урок 1
  [
    { id: 1, audio: require('../../../assets/audio/1.wav'), options: ['сам', 'бал', 'мать', 'бак'], correctAnswer: 'сам' },
    { id: 2, audio: require('../../../assets/audio/2.wav'), options: ['корь', 'топь', 'ром', 'роль'], correctAnswer: 'корь' },
    { id: 3, audio: require('../../../assets/audio/3.wav'), options: ['куш', 'бум', 'сушь', 'зуд'], correctAnswer: 'куш' },
    { id: 4, audio: require('../../../assets/audio/4.wav'), options: ['пан', 'пар', 'вал', 'лай'], correctAnswer: 'пан' },
    { id: 5, audio: require('../../../assets/audio/5.wav'), options: ['мел', 'шеф', 'чей', 'тень'], correctAnswer: 'мел' },
    { id: 6, audio: require('../../../assets/audio/6.wav'), options: ['нос', 'ход', 'новь', 'ком'], correctAnswer: 'нос' },
    { id: 7, audio: require('../../../assets/audio/7.wav'), options: ['бить', 'вить', 'пить', 'хит'], correctAnswer: 'бить' },
    { id: 8, audio: require('../../../assets/audio/8.wav'), options: ['як', 'пять', 'хан', 'дать'], correctAnswer: 'як' },
    { id: 9, audio: require('../../../assets/audio/9.wav'), options: ['сом', 'рожь', 'бот', 'мёд'], correctAnswer: 'сом' },
    { id: 10, audio: require('../../../assets/audio/10.wav'), options: ['высь', 'быль', 'бык', 'мышь'], correctAnswer: 'высь' },
    { id: 11, audio: require('../../../assets/audio/11.wav'), options: ['шар', 'рак', 'бас', 'сад'], correctAnswer: 'шар' },
    { id: 12, audio: require('../../../assets/audio/12.wav'), options: ['дичь', 'линь', 'гид', 'низ'], correctAnswer: 'дичь' },
    { id: 13, audio: require('../../../assets/audio/13.wav'), options: ['тут', 'дуб', 'зуб', 'шум'], correctAnswer: 'тут' },
    { id: 14, audio: require('../../../assets/audio/14.wav'), options: ['вол', 'кол', 'дом', 'кок'], correctAnswer: 'вол' },
    { id: 15, audio: require('../../../assets/audio/15.wav'), options: ['рябь', 'гад', 'яд', 'чад'], correctAnswer: 'рябь' },
    { id: 16, audio: require('../../../assets/audio/16.wav'), options: ['дух', 'куб', 'шут', 'тур'], correctAnswer: 'дух' },
    { id: 17, audio: require('../../../assets/audio/17.wav'), options: ['век', 'сеть', 'сев', 'мель'], correctAnswer: 'век' },
    { id: 18, audio: require('../../../assets/audio/18.wav'), options: ['миф', 'лис', 'киль', 'вид'], correctAnswer: 'миф' },
    { id: 19, audio: require('../../../assets/audio/19.wav'), options: ['боб', 'моль', 'дочь', 'вонь'], correctAnswer: 'боб' },
    { id: 20, audio: require('../../../assets/audio/20.wav'), options: ['царь', 'раб', 'лань', 'пай'], correctAnswer: 'царь' },
  ],
  // Урок 2
  [
    { id: 1, audio: require('../../../assets/audio/21.wav'), options: ['бал', 'мать', 'бак', 'шаль'], correctAnswer: 'бал' },
    { id: 2, audio: require('../../../assets/audio/22.wav'), options: ['топь', 'ром', 'роль', 'мох'], correctAnswer: 'топь' },
    { id: 3, audio: require('../../../assets/audio/23.wav'), options: ['бум', 'сушь', 'зуд', 'дурь'], correctAnswer: 'бум' },
    { id: 4, audio: require('../../../assets/audio/24.wav'), options: ['пар', 'вал', 'лай', 'так'], correctAnswer: 'пар' },
    { id: 5, audio: require('../../../assets/audio/25.wav'), options: ['шеф', 'чей', 'тень', 'медь'], correctAnswer: 'шеф' },
    { id: 6, audio: require('../../../assets/audio/26.wav'), options: ['ход', 'новь', 'ком', 'лов'], correctAnswer: 'ход' },
    { id: 7, audio: require('../../../assets/audio/27.wav'), options: ['вить', 'пить', 'хит', 'кий'], correctAnswer: 'вить' },
    { id: 8, audio: require('../../../assets/audio/28.wav'), options: ['пять', 'хан', 'дать', 'яр'], correctAnswer: 'пять' },
    { id: 9, audio: require('../../../assets/audio/29.wav'), options: ['рожь', 'бот', 'мёд', 'ток'], correctAnswer: 'рожь' },
    { id: 10, audio: require('../../../assets/audio/30.wav'), options: ['быль', 'бык', 'мышь', 'жир'], correctAnswer: 'быль' },
    { id: 11, audio: require('../../../assets/audio/31.wav'), options: ['рак', 'бас', 'сад', 'газ'], correctAnswer: 'рак' },
    { id: 12, audio: require('../../../assets/audio/32.wav'), options: ['линь', 'гид', 'низ', 'рис'], correctAnswer: 'линь' },
    { id: 13, audio: require('../../../assets/audio/33.wav'), options: ['дуб', 'зуб', 'шум', 'суть'], correctAnswer: 'дуб' },
    { id: 14, audio: require('../../../assets/audio/34.wav'), options: ['кол', 'дом', 'кок', 'сор'], correctAnswer: 'кол' },
    { id: 15, audio: require('../../../assets/audio/35.wav'), options: ['гад', 'яд', 'чад', 'мат'], correctAnswer: 'гад' },
    { id: 16, audio: require('../../../assets/audio/36.wav'), options: ['куб', 'шут', 'тур', 'бур'], correctAnswer: 'куб' },
    { id: 17, audio: require('../../../assets/audio/37.wav'), options: ['сеть', 'сев', 'мель', 'сей'], correctAnswer: 'сеть' },
    { id: 18, audio: require('../../../assets/audio/38.wav'), options: ['лис', 'киль', 'вид', 'тип'], correctAnswer: 'лис' },
    { id: 19, audio: require('../../../assets/audio/39.wav'), options: ['моль', 'дочь', 'вонь', 'ноль'], correctAnswer: 'моль' },
    { id: 20, audio: require('../../../assets/audio/40.wav'), options: ['раб', 'лань', 'пай', 'паж'], correctAnswer: 'раб' },
  ],
  // Урок 3
  [
    { id: 1, audio: require('../../../assets/audio/41.wav'), options: ['мать', 'шаль', 'бал', 'бак'], correctAnswer: 'мать' },
    { id: 2, audio: require('../../../assets/audio/42.wav'), options: ['ром', 'мох', 'топь', 'роль'], correctAnswer: 'ром' },
    { id: 3, audio: require('../../../assets/audio/43.wav'), options: ['сушь', 'дурь', 'бум', 'зуд'], correctAnswer: 'сушь' },
    { id: 4, audio: require('../../../assets/audio/44.wav'), options: ['вал', 'так', 'пар', 'лай'], correctAnswer: 'вал' },
    { id: 5, audio: require('../../../assets/audio/45.wav'), options: ['чей', 'медь', 'шеф', 'тень'], correctAnswer: 'чей' },
    { id: 6, audio: require('../../../assets/audio/46.wav'), options: ['новь', 'лов', 'ход', 'ком'], correctAnswer: 'новь' },
    { id: 7, audio: require('../../../assets/audio/47.wav'), options: ['пить', 'кий', 'вить', 'хит'], correctAnswer: 'пить' },
    { id: 8, audio: require('../../../assets/audio/48.wav'), options: ['хан', 'яр', 'пять', 'дать'], correctAnswer: 'хан' },
    { id: 9, audio: require('../../../assets/audio/49.wav'), options: ['бот', 'ток', 'рожь', 'мёд'], correctAnswer: 'бот' },
    { id: 10, audio: require('../../../assets/audio/50.wav'), options: ['бык', 'жир', 'быль', 'мышь'], correctAnswer: 'бык' },
    { id: 11, audio: require('../../../assets/audio/51.wav'), options: ['бас', 'газ', 'рак', 'сад'], correctAnswer: 'бас' },
    { id: 12, audio: require('../../../assets/audio/52.wav'), options: ['гид', 'рис', 'линь', 'низ'], correctAnswer: 'гид' },
    { id: 13, audio: require('../../../assets/audio/53.wav'), options: ['зуб', 'суть', 'дуб', 'шум'], correctAnswer: 'зуб' },
    { id: 14, audio: require('../../../assets/audio/54.wav'), options: ['дом', 'сор', 'кол', 'кок'], correctAnswer: 'дом' },
    { id: 15, audio: require('../../../assets/audio/55.wav'), options: ['яд', 'мат', 'гад', 'чад'], correctAnswer: 'яд' },
    { id: 16, audio: require('../../../assets/audio/56.wav'), options: ['шут', 'бур', 'куб', 'тур'], correctAnswer: 'шут' },
    { id: 17, audio: require('../../../assets/audio/57.wav'), options: ['сев', 'сей', 'сеть', 'мель'], correctAnswer: 'сев' },
    { id: 18, audio: require('../../../assets/audio/58.wav'), options: ['киль', 'тип', 'лис', 'вид'], correctAnswer: 'киль' },
    { id: 19, audio: require('../../../assets/audio/59.wav'), options: ['дочь', 'ноль', 'моль', 'вонь'], correctAnswer: 'дочь' },
    { id: 20, audio: require('../../../assets/audio/60.wav'), options: ['лань', 'паж', 'раб', 'пай'], correctAnswer: 'лань' },
  ],
  // Урок 4
  [
    { id: 1, audio: require('../../../assets/audio/61.wav'), options: ['бак', 'бал', 'шаль', 'мать'], correctAnswer: 'бак' },
    { id: 2, audio: require('../../../assets/audio/62.wav'), options: ['роль', 'топь', 'мох', 'ром'], correctAnswer: 'роль' },
    { id: 3, audio: require('../../../assets/audio/63.wav'), options: ['зуд', 'бум', 'дурь', 'сушь'], correctAnswer: 'зуд' },
    { id: 4, audio: require('../../../assets/audio/64.wav'), options: ['лай', 'пар', 'так', 'вал'], correctAnswer: 'лай' },
    { id: 5, audio: require('../../../assets/audio/65.wav'), options: ['тень', 'шеф', 'медь', 'чей'], correctAnswer: 'тень' },
    { id: 6, audio: require('../../../assets/audio/66.wav'), options: ['ком', 'ход', 'лов', 'новь'], correctAnswer: 'ком' },
    { id: 7, audio: require('../../../assets/audio/67.wav'), options: ['хит', 'вить', 'кий', 'пить'], correctAnswer: 'хит' },
    { id: 8, audio: require('../../../assets/audio/68.wav'), options: ['дать', 'пять', 'яр', 'хан'], correctAnswer: 'дать' },
    { id: 9, audio: require('../../../assets/audio/69.wav'), options: ['мёд', 'рожь', 'ток', 'бот'], correctAnswer: 'мёд' },
    { id: 10, audio: require('../../../assets/audio/70.wav'), options: ['мышь', 'быль', 'жир', 'бык'], correctAnswer: 'мышь' },
    { id: 11, audio: require('../../../assets/audio/71.wav'), options: ['сад', 'рак', 'газ', 'бас'], correctAnswer: 'сад' },
    { id: 12, audio: require('../../../assets/audio/72.wav'), options: ['низ', 'линь', 'рис', 'гид'], correctAnswer: 'низ' },
    { id: 13, audio: require('../../../assets/audio/73.wav'), options: ['шум', 'дуб', 'суть', 'зуб'], correctAnswer: 'шум' },
    { id: 14, audio: require('../../../assets/audio/74.wav'), options: ['кок', 'кол', 'сор', 'дом'], correctAnswer: 'кок' },
    { id: 15, audio: require('../../../assets/audio/75.wav'), options: ['чад', 'гад', 'мат', 'яд'], correctAnswer: 'чад' },
    { id: 16, audio: require('../../../assets/audio/76.wav'), options: ['тур', 'куб', 'бур', 'шут'], correctAnswer: 'тур' },
    { id: 17, audio: require('../../../assets/audio/77.wav'), options: ['мель', 'сеть', 'сей', 'сев'], correctAnswer: 'мель' },
    { id: 18, audio: require('../../../assets/audio/78.wav'), options: ['вид', 'лис', 'тип', 'киль'], correctAnswer: 'вид' },
    { id: 19, audio: require('../../../assets/audio/79.wav'), options: ['вонь', 'моль', 'ноль', 'дочь'], correctAnswer: 'вонь' },
    { id: 20, audio: require('../../../assets/audio/80.wav'), options: ['пай', 'раб', 'паж', 'лань'], correctAnswer: 'пай' },
  ],
  // Урок 5
  [
    { id: 1, audio: require('../../../assets/audio/81.wav'), options: ['бар', 'бак', 'бал', 'мать'], correctAnswer: 'бар' },
    { id: 2, audio: require('../../../assets/audio/82.wav'), options: ['гол', 'роль', 'топь', 'ром'], correctAnswer: 'гол' },
    { id: 3, audio: require('../../../assets/audio/83.wav'), options: ['лунь', 'зуд', 'бум', 'сушь'], correctAnswer: 'лунь' },
    { id: 4, audio: require('../../../assets/audio/84.wav'), options: ['гарь', 'лай', 'пар', 'вал'], correctAnswer: 'гарь' },
    { id: 5, audio: require('../../../assets/audio/85.wav'), options: ['цепь', 'тень', 'шеф', 'чей'], correctAnswer: 'цепь' },
    { id: 6, audio: require('../../../assets/audio/86.wav'), options: ['том', 'ком', 'ход', 'новь'], correctAnswer: 'том' },
    { id: 7, audio: require('../../../assets/audio/87.wav'), options: ['миг', 'хит', 'вить', 'пить'], correctAnswer: 'миг' },
    { id: 8, audio: require('../../../assets/audio/88.wav'), options: ['мять', 'дать', 'пять', 'хан'], correctAnswer: 'мять' },
    { id: 9, audio: require('../../../assets/audio/89.wav'), options: ['лёд', 'мёд', 'рожь', 'бот'], correctAnswer: 'лёд' },
    { id: 10, audio: require('../../../assets/audio/90.wav'), options: ['шип', 'мышь', 'быль', 'бык'], correctAnswer: 'шип' },
    { id: 11, audio: require('../../../assets/audio/91.wav'), options: ['раз', 'сад', 'рак', 'бас'], correctAnswer: 'раз' },
    { id: 12, audio: require('../../../assets/audio/92.wav'), options: ['тиш', 'низ', 'линь', 'гид'], correctAnswer: 'тиш' },
    { id: 13, audio: require('../../../assets/audio/93.wav'), options: ['кум', 'шум', 'дуб', 'зуб'], correctAnswer: 'кум' },
    { id: 14, audio: require('../../../assets/audio/94.wav'), options: ['голь', 'кок', 'кол', 'дом'], correctAnswer: 'голь' },
    { id: 15, audio: require('../../../assets/audio/95.wav'), options: ['хам', 'чад', 'гад', 'яд'], correctAnswer: 'хам' },
    { id: 16, audio: require('../../../assets/audio/96.wav'), options: ['жуть', 'тур', 'куб', 'шут'], correctAnswer: 'жуть' },
    { id: 17, audio: require('../../../assets/audio/97.wav'), options: ['печь', 'мель', 'сеть', 'сев'], correctAnswer: 'печь' },
    { id: 18, audio: require('../../../assets/audio/98.wav'), options: ['тик', 'вид', 'лис', 'киль'], correctAnswer: 'тик' },
    { id: 19, audio: require('../../../assets/audio/99.wav'), options: ['вот', 'вонь', 'моль', 'дочь'], correctAnswer: 'вот' },
    { id: 20, audio: require('../../../assets/audio/100.wav'), options: ['лаз', 'пай', 'раб', 'лань'], correctAnswer: 'лаз' },
  ],
  // Урок 6
  [
    { id: 1, audio: require('../../../assets/audio/101.wav'), options: ['шаль', 'мать', 'бак', 'бал'], correctAnswer: 'шаль' },
    { id: 2, audio: require('../../../assets/audio/102.wav'), options: ['мох', 'ром', 'роль', 'топь'], correctAnswer: 'мох' },
    { id: 3, audio: require('../../../assets/audio/103.wav'), options: ['дурь', 'сушь', 'зуд', 'бум'], correctAnswer: 'дурь' },
    { id: 4, audio: require('../../../assets/audio/104.wav'), options: ['так', 'вал', 'лай', 'пар'], correctAnswer: 'так' },
    { id: 5, audio: require('../../../assets/audio/105.wav'), options: ['медь', 'чей', 'тень', 'шеф'], correctAnswer: 'медь' },
    { id: 6, audio: require('../../../assets/audio/106.wav'), options: ['лов', 'новь', 'ком', 'ход'], correctAnswer: 'лов' },
    { id: 7, audio: require('../../../assets/audio/107.wav'), options: ['кий', 'пить', 'хит', 'вить'], correctAnswer: 'кий' },
    { id: 8, audio: require('../../../assets/audio/108.wav'), options: ['яр', 'хан', 'дать', 'пять'], correctAnswer: 'яр' },
    { id: 9, audio: require('../../../assets/audio/109.wav'), options: ['ток', 'бот', 'мёд', 'рожь'], correctAnswer: 'ток' },
    { id: 10, audio: require('../../../assets/audio/110.wav'), options: ['жир', 'бык', 'мышь', 'быль'], correctAnswer: 'жир' },
    { id: 11, audio: require('../../../assets/audio/111.wav'), options: ['газ', 'бас', 'сад', 'рак'], correctAnswer: 'газ' },
    { id: 12, audio: require('../../../assets/audio/112.wav'), options: ['рис', 'гид', 'низ', 'линь'], correctAnswer: 'рис' },
    { id: 13, audio: require('../../../assets/audio/113.wav'), options: ['суть', 'зуб', 'шум', 'дуб'], correctAnswer: 'суть' },
    { id: 14, audio: require('../../../assets/audio/114.wav'), options: ['сор', 'дом', 'кок', 'кол'], correctAnswer: 'сор' },
    { id: 15, audio: require('../../../assets/audio/115.wav'), options: ['мат', 'яд', 'чад', 'гад'], correctAnswer: 'мат' },
    { id: 16, audio: require('../../../assets/audio/116.wav'), options: ['бур', 'шут', 'тур', 'куб'], correctAnswer: 'бур' },
    { id: 17, audio: require('../../../assets/audio/117.wav'), options: ['сей', 'сев', 'мель', 'сеть'], correctAnswer: 'сей' },
    { id: 18, audio: require('../../../assets/audio/118.wav'), options: ['тип', 'киль', 'вид', 'лис'], correctAnswer: 'тип' },
    { id: 19, audio: require('../../../assets/audio/119.wav'), options: ['ноль', 'дочь', 'вонь', 'моль'], correctAnswer: 'ноль' },
    { id: 20, audio: require('../../../assets/audio/120.wav'), options: ['паж', 'лань', 'пай', 'раб'], correctAnswer: 'паж' },
  ],
  // Урок 7
  [
    { id: 1, audio: require('../../../assets/audio/121.wav'), options: ['включать', 'начать', 'включить', 'гулять'], correctAnswer: 'включать' },
    { id: 2, audio: require('../../../assets/audio/122.wav'), options: ['дом', 'бык', 'цепь', 'дверь'], correctAnswer: 'дом' },
    { id: 3, audio: require('../../../assets/audio/123.wav'), options: ['серьёзный', 'недалёкий', 'высокий', 'похожий'], correctAnswer: 'серьёзный' },
    { id: 4, audio: require('../../../assets/audio/124.wav'), options: ['берег', 'февраль', 'шофёр', 'схема'], correctAnswer: 'берег' },
    { id: 5, audio: require('../../../assets/audio/125.wav'), options: ['революция', 'отсюда', 'обязательно', 'сегодня'], correctAnswer: 'революция' },
    { id: 6, audio: require('../../../assets/audio/126.wav'), options: ['тихий', 'общий', 'светлый', 'мелкий'], correctAnswer: 'тихий' },
    { id: 7, audio: require('../../../assets/audio/127.wav'), options: ['брать', 'здесь', 'вдруг', 'снять'], correctAnswer: 'брать' },
    { id: 8, audio: require('../../../assets/audio/128.wav'), options: ['сфера', 'лагерь', 'помощь', 'бизнес'], correctAnswer: 'сфера' },
    { id: 9, audio: require('../../../assets/audio/129.wav'), options: ['генерал', 'движение', 'зеркало', 'позиция'], correctAnswer: 'генерал' },
    { id: 10, audio: require('../../../assets/audio/130.wav'), options: ['широкий', 'французский', 'приехать', 'юридический'], correctAnswer: 'широкий' },
    { id: 11, audio: require('../../../assets/audio/131.wav'), options: ['даже', 'бегать', 'хитрый', 'чётко'], correctAnswer: 'даже' },
    { id: 12, audio: require('../../../assets/audio/132.wav'), options: ['вид', 'шум', 'гость', 'фонд'], correctAnswer: 'вид' },
    { id: 13, audio: require('../../../assets/audio/133.wav'), options: ['поэтому', 'составлять', 'погибнуть', 'правильно'], correctAnswer: 'поэтому' },
    { id: 14, audio: require('../../../assets/audio/134.wav'), options: ['модель', 'музей', 'дядя', 'любовь'], correctAnswer: 'модель' },
    { id: 15, audio: require('../../../assets/audio/135.wav'), options: ['успеть', 'вперёд', 'это', 'писать'], correctAnswer: 'успеть' },
    { id: 16, audio: require('../../../assets/audio/136.wav'), options: ['намёки', 'химия', 'отёки', 'упрёки'], correctAnswer: 'намёки' },
    { id: 17, audio: require('../../../assets/audio/137.wav'), options: ['где', 'темп', 'лист', 'жесть'], correctAnswer: 'где' },
    { id: 18, audio: require('../../../assets/audio/138.wav'), options: ['мощный', 'плохой', 'южный', 'долгий'], correctAnswer: 'мощный' },
    { id: 19, audio: require('../../../assets/audio/139.wav'), options: ['хозяин', 'называть', 'значение', 'девушка'], correctAnswer: 'хозяин' },
    { id: 20, audio: require('../../../assets/audio/140.wav'), options: ['уметь', 'июль', 'иметь', 'тащить'], correctAnswer: 'уметь' },
  ],
  // Урок 8
  [
    { id: 1, audio: require('../../../assets/audio/141.wav'), options: ['гулять', 'включить', 'начать', 'включать'], correctAnswer: 'гулять' },
    { id: 2, audio: require('../../../assets/audio/142.wav'), options: ['дверь', 'цепь', 'бык', 'дом'], correctAnswer: 'дверь' },
    { id: 3, audio: require('../../../assets/audio/143.wav'), options: ['похожий', 'высокий', 'недалёкий', 'серьёзный'], correctAnswer: 'похожий' },
    { id: 4, audio: require('../../../assets/audio/144.wav'), options: ['схема', 'шофёр', 'февраль', 'берег'], correctAnswer: 'схема' },
    { id: 5, audio: require('../../../assets/audio/145.wav'), options: ['сегодня', 'обязательно', 'отсюда', 'революция'], correctAnswer: 'сегодня' },
    { id: 6, audio: require('../../../assets/audio/146.wav'), options: ['мелкий', 'светлый', 'общий', 'тихий'], correctAnswer: 'мелкий' },
    { id: 7, audio: require('../../../assets/audio/147.wav'), options: ['снять', 'вдруг', 'здесь', 'брать'], correctAnswer: 'снять' },
    { id: 8, audio: require('../../../assets/audio/148.wav'), options: ['бизнес', 'помощь', 'лагерь', 'сфера'], correctAnswer: 'бизнес' },
    { id: 9, audio: require('../../../assets/audio/149.wav'), options: ['позиция', 'зеркало', 'движение', 'генерал'], correctAnswer: 'позиция' },
    { id: 10, audio: require('../../../assets/audio/150.wav'), options: ['юридический', 'приехать', 'французский', 'широкий'], correctAnswer: 'юридический' },
    { id: 11, audio: require('../../../assets/audio/151.wav'), options: ['чётко', 'хитрый', 'бегать', 'даже'], correctAnswer: 'чётко' },
    { id: 12, audio: require('../../../assets/audio/152.wav'), options: ['фонд', 'гость', 'шум', 'вид'], correctAnswer: 'фонд' },
    { id: 13, audio: require('../../../assets/audio/153.wav'), options: ['правильно', 'погибнуть', 'составлять', 'поэтому'], correctAnswer: 'правильно' },
    { id: 14, audio: require('../../../assets/audio/154.wav'), options: ['любовь', 'дядя', 'музей', 'модель'], correctAnswer: 'любовь' },
    { id: 15, audio: require('../../../assets/audio/155.wav'), options: ['писать', 'это', 'вперёд', 'успеть'], correctAnswer: 'писать' },
    { id: 16, audio: require('../../../assets/audio/156.wav'), options: ['упрёки', 'отёки', 'химия', 'намёки'], correctAnswer: 'упрёки' },
    { id: 17, audio: require('../../../assets/audio/157.wav'), options: ['жесть', 'лист', 'темп', 'где'], correctAnswer: 'жесть' },
    { id: 18, audio: require('../../../assets/audio/158.wav'), options: ['долгий', 'южный', 'плохой', 'мощный'], correctAnswer: 'долгий' },
    { id: 19, audio: require('../../../assets/audio/159.wav'), options: ['девушка', 'значение', 'называть', 'хозяин'], correctAnswer: 'девушка' },
    { id: 20, audio: require('../../../assets/audio/160.wav'), options: ['тащить', 'иметь', 'июль', 'уметь'], correctAnswer: 'тащить' },
  ],
  // Урок 9
  [
    { id: 1, audio: require('../../../assets/audio/161.wav'), options: ['начать', 'гулять', 'включать', 'включить'], correctAnswer: 'начать' },
    { id: 2, audio: require('../../../assets/audio/162.wav'), options: ['бык', 'дверь', 'дом', 'цепь'], correctAnswer: 'бык' },
    { id: 3, audio: require('../../../assets/audio/163.wav'), options: ['недалёкий', 'похожий', 'серьёзный', 'высокий'], correctAnswer: 'недалёкий' },
    { id: 4, audio: require('../../../assets/audio/164.wav'), options: ['февраль', 'схема', 'берег', 'шофёр'], correctAnswer: 'февраль' },
    { id: 5, audio: require('../../../assets/audio/165.wav'), options: ['отсюда', 'сегодня', 'революция', 'обязательно'], correctAnswer: 'отсюда' },
    { id: 6, audio: require('../../../assets/audio/166.wav'), options: ['общий', 'мелкий', 'тихий', 'светлый'], correctAnswer: 'общий' },
    { id: 7, audio: require('../../../assets/audio/167.wav'), options: ['здесь', 'снять', 'брать', 'вдруг'], correctAnswer: 'здесь' },
    { id: 8, audio: require('../../../assets/audio/168.wav'), options: ['лагерь', 'бизнес', 'сфера', 'помощь'], correctAnswer: 'лагерь' },
    { id: 9, audio: require('../../../assets/audio/169.wav'), options: ['движение', 'позиция', 'генерал', 'зеркало'], correctAnswer: 'движение' },
    { id: 10, audio: require('../../../assets/audio/170.wav'), options: ['французский', 'юридический', 'широкий', 'приехать'], correctAnswer: 'французский' },
    { id: 11, audio: require('../../../assets/audio/171.wav'), options: ['чётко', 'хитрый', 'даже', 'бегать'], correctAnswer: 'чётко' },
    { id: 12, audio: require('../../../assets/audio/172.wav'), options: ['шум', 'фонд', 'вид', 'гость'], correctAnswer: 'шум' },
    { id: 13, audio: require('../../../assets/audio/173.wav'), options: ['составлять', 'правильно', 'поэтому', 'погибнуть'], correctAnswer: 'составлять' },
    { id: 14, audio: require('../../../assets/audio/174.wav'), options: ['музей', 'любовь', 'модель', 'дядя'], correctAnswer: 'музей' },
    { id: 15, audio: require('../../../assets/audio/175.wav'), options: ['вперёд', 'писать', 'успеть', 'это'], correctAnswer: 'вперёд' },
    { id: 16, audio: require('../../../assets/audio/176.wav'), options: ['химия', 'упрёки', 'намёки', 'отёки'], correctAnswer: 'химия' },
    { id: 17, audio: require('../../../assets/audio/177.wav'), options: ['темп', 'жесть', 'где', 'лист'], correctAnswer: 'темп' },
    { id: 18, audio: require('../../../assets/audio/178.wav'), options: ['плохой', 'долгий', 'мощный', 'южный'], correctAnswer: 'плохой' },
    { id: 19, audio: require('../../../assets/audio/179.wav'), options: ['называть', 'девушка', 'хозяин', 'значение'], correctAnswer: 'называть' },
    { id: 20, audio: require('../../../assets/audio/180.wav'), options: ['июль', 'тащить', 'уметь', 'иметь'], correctAnswer: 'июль' },
  ],
  // Урок 10
  [
    { id: 1, audio: require('../../../assets/audio/181.wav'), options: ['включить', 'включать', 'гулять', 'начать'], correctAnswer: 'включить' },
    { id: 2, audio: require('../../../assets/audio/182.wav'), options: ['цепь', 'дом', 'дверь', 'бык'], correctAnswer: 'цепь' },
    { id: 3, audio: require('../../../assets/audio/183.wav'), options: ['высокий', 'серьёзный', 'похожий', 'недалёкий'], correctAnswer: 'высокий' },
    { id: 4, audio: require('../../../assets/audio/184.wav'), options: ['шофёр', 'берег', 'схема', 'февраль'], correctAnswer: 'шофёр' },
    { id: 5, audio: require('../../../assets/audio/185.wav'), options: ['обязательно', 'революция', 'сегодня', 'отсюда'], correctAnswer: 'обязательно' },
    { id: 6, audio: require('../../../assets/audio/186.wav'), options: ['светлый', 'тихий', 'мелкий', 'общий'], correctAnswer: 'светлый' },
    { id: 7, audio: require('../../../assets/audio/187.wav'), options: ['вдруг', 'брать', 'снять', 'здесь'], correctAnswer: 'вдруг' },
    { id: 8, audio: require('../../../assets/audio/188.wav'), options: ['помощь', 'сфера', 'бизнес', 'лагерь'], correctAnswer: 'помощь' },
    { id: 9, audio: require('../../../assets/audio/189.wav'), options: ['зеркало', 'генерал', 'позиция', 'движение'], correctAnswer: 'зеркало' },
    { id: 10, audio: require('../../../assets/audio/190.wav'), options: ['приехать', 'широкий', 'юридический', 'французский'], correctAnswer: 'приехать' },
    { id: 11, audio: require('../../../assets/audio/191.wav'), options: ['хитрый', 'даже', 'чётко', 'бегать'], correctAnswer: 'хитрый' },
    { id: 12, audio: require('../../../assets/audio/192.wav'), options: ['гость', 'вид', 'фонд', 'шум'], correctAnswer: 'гость' },
    { id: 13, audio: require('../../../assets/audio/193.wav'), options: ['погибнуть', 'поэтому', 'правильно', 'составлять'], correctAnswer: 'погибнуть' },
    { id: 14, audio: require('../../../assets/audio/194.wav'), options: ['дядя', 'модель', 'любовь', 'музей'], correctAnswer: 'дядя' },
    { id: 15, audio: require('../../../assets/audio/195.wav'), options: ['это', 'успеть', 'писать', 'вперёд'], correctAnswer: 'это' },
    { id: 16, audio: require('../../../assets/audio/196.wav'), options: ['отёки', 'намёки', 'упрёки', 'химия'], correctAnswer: 'отёки' },
    { id: 17, audio: require('../../../assets/audio/197.wav'), options: ['лист', 'где', 'жесть', 'темп'], correctAnswer: 'лист' },
    { id: 18, audio: require('../../../assets/audio/198.wav'), options: ['южный', 'мощный', 'долгий', 'плохой'], correctAnswer: 'южный' },
    { id: 19, audio: require('../../../assets/audio/199.wav'), options: ['значение', 'хозяин', 'девушка', 'называть'], correctAnswer: 'значение' },
    { id: 20, audio: require('../../../assets/audio/200.wav'), options: ['иметь', 'уметь', 'тащить', 'июль'], correctAnswer: 'иметь' },
  ],
];

const TOTAL_TASKS = 20;

function shuffleArray(array: string[]): string[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function VerbalTrainerLessonScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { lessonId } = route.params;
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const soundRef = useRef<Audio.Sound | undefined>(undefined);
  const [isLoadingSound, setIsLoadingSound] = useState(false);
  const [isProgressLoaded, setIsProgressLoaded] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const didPromptRef = useRef(false);
  // Если урок загружен как "completed", мы временно отключаем автосохранение,
  // чтобы оно не перезаписало completed=false до выбора пользователя.
  const skipAutoSaveRef = useRef(false);

  const lessonTasks = lessonData[lessonId - 1]; // Получаем задания для текущего урока
  const currentTask = lessonTasks[currentTaskIndex];
  const progressKey = `@verbalTrainerProgress_${lessonId}`;

  useEffect(() => {
    soundRef.current = sound;
  }, [sound]);

  // Чтобы алерт "пройти ещё раз" не показывался повторно на каждом фокусе
  useEffect(() => {
    didPromptRef.current = false;
  }, [lessonId]);

  // Загрузка прогресса при фокусировке на экране
  useFocusEffect(
    useCallback(() => {
      const loadProgress = async () => {
        // Чтобы UI не успевал отрисоваться со "старым" currentTaskIndex (например, TOTAL_TASKS)
        // и показать пустой экран, показываем лоадер до получения progress из AsyncStorage.
        setIsProgressLoaded(false);
        setShuffledOptions([]);
        try {
          const savedProgress = await AsyncStorage.getItem(progressKey);
          if (savedProgress !== null) {
            const progress = JSON.parse(savedProgress);
            // Если урок был завершен — предлагаем пройти ещё раз
            if (progress.completed || progress.score === TOTAL_TASKS) {
              skipAutoSaveRef.current = true;
              // Важно: текущий UI завязан на currentTaskIndex.
              // При completed=true мы сохраняем currentTaskIndex = TOTAL_TASKS,
              // но индекс должен быть валидным для lessonTasks (иначе currentTask === undefined и экран выглядит "пустым").
              const safeIndex = Math.max(0, Math.min(TOTAL_TASKS - 1, Number(progress.currentTaskIndex ?? 0)));
              setCurrentTaskIndex(safeIndex);
              setScore(typeof progress.score === 'number' ? progress.score : 0);

              if (!didPromptRef.current) {
                didPromptRef.current = true;
                Alert.alert(
                  'Урок уже пройден',
                  'Пройти ещё раз?',
                  [
                    {
                      text: 'Посмотреть результат',
                      onPress: () => {
                        didPromptRef.current = false;
                        navigation.navigate('VerbalTrainerLessonResult', {
                          score: progress.score,
                          lessonId: lessonId,
                        });
                      },
                    },
                    {
                      text: 'Пройти ещё раз',
                      style: 'destructive',
                      onPress: async () => {
                        await AsyncStorage.removeItem(progressKey);
                        skipAutoSaveRef.current = false;
                        setCurrentTaskIndex(0);
                        setScore(0);
                        didPromptRef.current = false;
                      },
                    },
                  ]
                );
              }

              return;
            }
            // Иначе загружаем сохраненный прогресс
            skipAutoSaveRef.current = false;
            setCurrentTaskIndex(progress.currentTaskIndex);
            setScore(progress.score);
          } else {
            // Если прогресса нет, сбрасываем состояние
            skipAutoSaveRef.current = false;
            setCurrentTaskIndex(0);
            setScore(0);
          }
        } catch (error) {
          console.error('Failed to load progress', error);
          // В случае ошибки тоже сбрасываем состояние
          setCurrentTaskIndex(0);
          setScore(0);
        } finally {
          setIsProgressLoaded(true);
        }
      };

      loadProgress();

      return () => {
        const s = soundRef.current;
        if (s) {
          s.unloadAsync();
          soundRef.current = undefined;
        }
        setSound(undefined);
      };
    }, [lessonId, navigation])
  );

  // Сохранение прогресса при изменении задания или счета
  useEffect(() => {
     if (!isProgressLoaded || currentTaskIndex === TOTAL_TASKS) return; // Не сохраняем, пока не загрузили начальный прогресс или урок завершен
     if (skipAutoSaveRef.current) return; // Не перезаписываем completed:false при показе повторного выбора

    const saveProgress = async () => {
      try {
        const progress = {
          currentTaskIndex: currentTaskIndex,
          score: score,
          completed: false, // Урок еще не завершен
        };
        await AsyncStorage.setItem(progressKey, JSON.stringify(progress));
        console.log('Progress saved', progress);
      } catch (error) {
        console.error('Failed to save progress', error);
      }
    };

    saveProgress();

  }, [currentTaskIndex, score, lessonId, isProgressLoaded]);

  useEffect(() => {
    if (currentTask && currentTask.options) {
      setShuffledOptions(shuffleArray(currentTask.options));
    }
  }, [currentTaskIndex, lessonId, isProgressLoaded]);

  async function playSound() {
    if (sound) {
       await sound.unloadAsync();
       setSound(undefined);
    }

    setIsLoadingSound(true);
    console.log('Loading Sound');
    try {
       const { sound } = await Audio.Sound.createAsync(
         currentTask.audio
       );
       setSound(sound);
       console.log('Playing Sound');
       await sound.playAsync();
    } catch (error) {
       console.error('Error playing sound:', error);
       Alert.alert('Ошибка', 'Не удалось загрузить или воспроизвести аудио.');
    } finally {
       setIsLoadingSound(false);
    }
  }

  const handleAnswer = (selectedAnswer: string) => {
    const isCorrect = selectedAnswer === currentTask.correctAnswer;
    const nextScore = isCorrect ? score + 1 : score;

    // Если это не последний вопрос — просто идём дальше
    if (currentTaskIndex < lessonTasks.length - 1) {
      if (isCorrect) setScore(nextScore);
      setCurrentTaskIndex(currentTaskIndex + 1);
      return;
    }

    // Урок завершен — важно выставить currentTaskIndex = TOTAL_TASKS,
    // чтобы автосохранение не перезаписало completed:false.
    setScore(nextScore);
    setCurrentTaskIndex(TOTAL_TASKS);

    const saveCompletion = async () => {
      try {
        const progress = {
          currentTaskIndex: TOTAL_TASKS,
          score: nextScore,
          completed: true,
        };
        await AsyncStorage.setItem(progressKey, JSON.stringify(progress));
      } catch (error) {
        console.error('Failed to save completion status', error);
      }
    };

    saveCompletion();

    // Переходим к экрану результатов с учетом последнего ответа
    navigation.navigate('VerbalTrainerLessonResult', {
      score: nextScore,
      lessonId: lessonId,
    });
  };

  if (!isProgressLoaded) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text variant="bodyLarge" style={{ marginTop: spacing.md, color: theme.colors.onSurface }}>
          Загрузка прогресса...
        </Text>
      </View>
    );
  }

  const stepProgress = (currentTaskIndex + 1) / lessonTasks.length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <BackHeader
        title={`Урок ${lessonId}`}
        subtitle={`Задание ${currentTaskIndex + 1} из ${lessonTasks.length}`}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.progressWrap}>
        <ProgressBar progress={stepProgress} color={theme.colors.primary} style={styles.progressBar} />
      </View>

      <View style={styles.content}>
        <Card style={[styles.playCard, shadows.card]} mode="elevated">
          <Card.Content style={styles.playInner}>
            <Text variant="titleMedium" style={{ marginBottom: spacing.sm, textAlign: 'center' }}>
              Прослушайте фрагмент
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center', marginBottom: spacing.md }}>
              Нажмите «Воспроизвести», затем выберите вариант
            </Text>
            <Button
              mode="contained"
              icon="play-circle"
              onPress={playSound}
              loading={isLoadingSound}
              disabled={isLoadingSound}
              style={styles.playBtn}
              contentStyle={styles.playBtnContent}
            >
              Воспроизвести
            </Button>
          </Card.Content>
        </Card>

        <View style={styles.optionsContainer}>
          {shuffledOptions.map((option, index) => (
            <Card
              key={`${option}-${index}`}
              style={styles.optionCard}
              mode="outlined"
              onPress={() => handleAnswer(option)}
            >
              <Card.Content style={styles.optionContent}>
                <Text variant="titleMedium" style={{ textAlign: 'center', color: theme.colors.onSurface }}>
                  {option}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressWrap: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  progressBar: {
    height: 8,
    borderRadius: radii.sm,
  },
  content: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'flex-start',
  },
  playCard: {
    borderRadius: radii.lg,
    marginBottom: spacing.lg,
  },
  playInner: {
    alignItems: 'stretch',
  },
  playBtn: {
    borderRadius: radii.md,
  },
  playBtnContent: {
    paddingVertical: spacing.sm,
  },
  optionsContainer: {
    width: '100%',
    gap: spacing.sm,
  },
  optionCard: {
    borderRadius: radii.md,
  },
  optionContent: {
    paddingVertical: spacing.xs,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 