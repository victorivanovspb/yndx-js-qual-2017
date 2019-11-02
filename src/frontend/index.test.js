'use strict';

import { nameMatcher as nm, emailMatcher as em, phoneMatcher as pm } from './matchers';

describe('nameMatcher set', () => {
    test('correct name (3 words) with nameMatcher is not null', () => {
        let name = nm('AAA BBB CCC');
        expect(name).not.toBeNull();
    });
    test('incorrect name (< 3 words) with nameMatcher is null', () => {
        let name = nm('AAA BBB');
        expect(name).toBeNull();
    });
});

describe('emailMatcher set', () => {
    test('correct email \'name@yandex.ru\' with emailMatcher is not null', () => {
        let email = em('name@yandex.ru');
        expect(email).not.toBeNull();
    });
    test('correct email \'name@ya.ru\' with emailMatcher is not null', () => {
        let email = em('name@ya.ru');
        expect(email).not.toBeNull();
    });
    test('incorrect email \'name@example.com\' with emailMatcher is null', () => {
        let email = em('name@example.com');
        expect(email).toBeNull();
    });
});

describe('phoneMatcher set', () => {
    test('correct phone (digits sum < 30) with phoneMatcher is not null', () => {
        let phone = pm('+7(111)200-30-40');
        expect(phone).not.toBeNull();
    });
    test('correct phone (digits sum < 30) with phoneMatcher is not null', () => {
        let phone = pm('+7    (111)    200    -30-40');
        expect(phone).not.toBeNull();
    });
    test('incorrect phone (digits sum > 30) with phoneMatcher is null', () => {
        let phone = pm('+7(999)999-33-44');
        expect(phone).toBeNull();
    });
    test('incorrect phone (digits sum > 30) with phoneMatcher is null', () => {
        let phone = pm('8(111)200-30-40');
        expect(phone).toBeNull();
    });
});

