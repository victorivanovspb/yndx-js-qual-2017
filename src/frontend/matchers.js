'use strict';

export function nameMatcher(name) {
    const nameTrimmed = name.trim();
    return nameTrimmed.match(/^[^\s]+[\s]+[^\s]+[\s]+[^\s]+$/);
}

export function emailMatcher(email) {
    const emailTrimmed = email.trim();
    return emailTrimmed.match(/^[A-Za-z0-9.,_%+-]+@(ya\.ru|(yandex\.(ru|ua|by|kz|com)))$/);
}

export function phoneMatcher(phone) {
    const phoneTrimmed  = phone.trim().replace(/\s/g, '');
    const res1 = phoneTrimmed.match(/^\+7\(\d{3}\)\d{3}[-]\d{2}[-]\d{2}$/);
    const res2 = (phoneCounter(phoneTrimmed) === false) ? null : true;
    return res1 && res2;
}

export function phoneCounter(phone) {
    let sum = 0;
    for (const c of phone.replace(/[^\d]/g, '')) {  // eslint-disable-line
        sum += parseInt(c, 10);
    }
    return sum <= 30;
}
