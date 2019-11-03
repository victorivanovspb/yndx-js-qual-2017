'use strict';

import { nameMatcher as nm, emailMatcher as em, phoneMatcher as pm } from './matchers';

const testWrapper = (value, description, fn, ...props) => {
    test(`"${ value }" ${ description }`, () => {
        props.reduce((acc, item) => acc[item], expect(fn( value )))();
    });
};

describe('nameMatcher set', () => {
    const testName = (name, description, ...props) => testWrapper(name, description, nm, ...props);
    const validNames = ['AAA BBB CCC', '老师 老师 老师', 'Фамилия Имя Отчество'];
    for (let i in validNames) {
        testName(validNames[i], 'correct name (3 words) is not null', 'not', 'toBeNull');
    }
    testName('AAA BBB', 'incorrect name (2 words) is null','toBeNull');
    testName('111 222 333 444', 'incorrect name (> 4 words) is null','toBeNull');
});

describe('emailMatcher set', () => {
    const testEmail = (email, description, ...props) => testWrapper(email, description, em, ...props);
    const validDomains = ['ya.ru', 'yandex.ru', 'yandex.ua', 'yandex.by', 'yandex.kz', 'yandex.com'];
    for (let i in validDomains) {
        testEmail(`name@${ validDomains[i] }`, 'correct email is not null', 'not', 'toBeNull');
    }
    testEmail('name@example.com', 'incorrect email is null', 'toBeNull');
});

describe('phoneMatcher set', () => {
    const testPhone = (phone, description, ...props) => testWrapper(phone, description, pm, ...props);
    const validPhones = ['+7(111)200-30-40', '+7    (111)    200    -30-40'];
    for (let i in validPhones) {
        testPhone(`${ validPhones[i] }`, 'correct phone (digits sum < 30) is not null', 'not', 'toBeNull');
    }
    const invalidPhones = ['+7(999)999-33-44', '8(111)200-30-40'];
    for (let i in invalidPhones) {
        testPhone(`${ invalidPhones[i] }`, 'incorrect phone (digits sum >= 30) is null', 'toBeNull');
    }
});
