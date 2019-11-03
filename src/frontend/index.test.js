'use strict';

import { nameMatcher as nm, emailMatcher as em, phoneMatcher as pm } from './matchers';

describe('nameMatcher set', () => {
    const testName = (name, description, fn, ...props) => {
        test(`"${ name }" ${ description }`, () => {
            const f = (acc, item) => acc[item];
            props.reduce(f, expect(fn(name)))();
            /* let exp = expect(fn(name));
            for (let i = 0; i < props.length; i += 1) {
               exp = exp[props[i]];
            }
            exp(); */
        });
    };
    /* {
        const name = 'AAA BBB CCC';
        test(`correct name "${name}" (3 words) is not null`, () => {
            expect(nm(name)).not.toBeNull();
        });
    } */
    testName('AAA BBB CCC', 'correct name (3 words) is not null', nm, 'not', 'toBeNull');
    testName('老师 老师 老师', 'correct name (3 words) is not null', nm, 'not', 'toBeNull');
    testName('AAA BBB', 'incorrect name (2 words) is null', nm,'toBeNull');
    testName('111 222 333 444', 'incorrect name (> 4 words) is null', nm,'toBeNull');
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
