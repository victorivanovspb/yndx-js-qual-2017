'use strict';

import { nameMatcher as nm, emailMatcher as em, phoneMatcher as pm } from './matchers';

describe('nameMatcher set', () => {
    {
        const name = 'AAA BBB CCC';
        test(`correct name "${name}" (3 words) is not null`, () => {
            expect(nm(name)).not.toBeNull();
        });
    } {
        const name = '  AAA BBB CCC ';
        test(`correct name "${name}" (3 words) is not null`, () => {
            expect(nm(name)).not.toBeNull();
        });
    } {
        const name = '老师 老师 老师';
        test(`correct name "${ name }" (3 words) is not null`, () => {
            expect(nm(name)).not.toBeNull();
        });
    } {
        const name = 'AAA BBB';
        test(`incorrect name "${ name }" (< 3 words) is null`, () => {
            expect(nm(name)).toBeNull();
        });
    } {
        const name = '111 222 333 444';
        test(`incorrect name "${ name }" (< 3 words) is null`, () => {
            expect(nm(name)).toBeNull();
        });
    }
});

describe('emailMatcher set', () => {
    test('correct email \'name@yandex.ru\' is not null', () => {
        let email = em('name@yandex.ru');
        expect(email).not.toBeNull();
    });
    test('correct email \'name@ya.ru\' is not null', () => {
        let email = em('name@ya.ru');
        expect(email).not.toBeNull();
    });
    test('incorrect email \'name@example.com\' is null', () => {
        let email = em('name@example.com');
        expect(email).toBeNull();
    });
});

describe('phoneMatcher set', () => {
    test('correct phone (digits sum < 30) is not null', () => {
        let phone = pm('+7(111)200-30-40');
        expect(phone).not.toBeNull();
    });
    test('correct phone (digits sum < 30) is not null', () => {
        let phone = pm('+7    (111)    200    -30-40');
        expect(phone).not.toBeNull();
    });
    test('incorrect phone (digits sum > 30) is null', () => {
        let phone = pm('+7(999)999-33-44');
        expect(phone).toBeNull();
    });
    test('incorrect phone (digits sum > 30) is null', () => {
        let phone = pm('8(111)200-30-40');
        expect(phone).toBeNull();
    });
});
