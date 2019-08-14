QUnit.module("class Validator: /index.js");
QUnit.test("Тестирование регулярного выражения (при item=\"fio\") в классе Validator: /index.js", function(assert) {
    let item = "fio";
    let regexp = /^[^\s]+[\s]+[^\s]+[\s]+[^\s]+$/;
    let validator = new Validator()
        .addRegexp(item, regexp);

    assert.equal(
        validator.validate("Раз Два Три", item),
        "Раз Два Три",
        "Корректная строка кириллицей в три слова (\"Раз Два Три\").");

    assert.equal(
        validator.validate("   Раз Два Три   ", item),
        "Раз Два Три",
        "Корректная строка кириллицей в три слова с пробелами по краям (\"   Раз Два Три   \").");

    assert.equal(
        validator.validate("one two 3333", item),
        "one two 3333",
        "Корректная строка латиницей и цифрами в три слова (\"one two 3333\").");

    assert.equal(
        validator.validate("老师 老师 老师", item),
        "老师 老师 老师",
        "Корректная строка иероглифами в три лова с пробелами по краям (\"老师 老师 老师\").");

    assert.notOk(
        validator.validate("111 222 333 444", item),
        "Проверка некорректной строки в четыре слова (\"111 222 333 444\").");
});

QUnit.test("Тестирование регулярного выражения (при item=\"email\") в классе Validator: /index.js", function(assert) {
    let item = "email";
    let regexp = /^[A-Za-z0-9.,_%+-]+@(ya\.ru|(yandex\.(ru|ua|by|kz|com)))$/;
    let validator = new Validator()
        .addRegexp(item, regexp);

    assert.equal(
        validator.validate("name@yandex.ru", item),
        "name@yandex.ru",
        "Корректный адрес (\"name@yandex.ru\").");

    assert.equal(
        validator.validate("name@yandex.ru", item),
        "name@yandex.ru",
        "Корректный адрес в доменной зоне ya.ru (\"name@ya.ru\").");

    assert.notOk(
        validator.validate("name@example.com", item),
        "Проверка адреса в некорректной доменной зоне example.com (\"name@example.com\").");

    assert.notOk(
        validator.validate("name@ya.com", item),
        "Проверка адреса в некорректной доменной зоне ya.com (\"name@ya.com\").");
});

QUnit.test("Тестирование регулярного выражения (при item=\"phone\") в классе Validator: /index.js", function(assert) {
    let item = "phone";
    let regexp = /^\+7\(\d{3}\)\d{3}[-]\d{2}[-]\d{2}$/;
    let validator = new Validator()
        .addRegexp(item, regexp,
            function(str) { return str.trim().replace(/\s/g, '') },
            function(str) {
                let sum = 0;
                for (let c of str.replace(/[^\d]/g, '')) {
                    sum += parseInt(c, 10);
                }
                return sum <= 30;
            });

    assert.equal(
        validator.validate("+7(111)200-30-40", item),
        "+7(111)200-30-40",
        "Правильный номер телефона \"+7(111)200-30-40\" с суммой цифр <30.");

    assert.equal(
        validator.validate("+7    (111)    200    -30-40", item),
        "+7(111)200-30-40",
        "Правильный номер телефона \"+7    (111)    200    -30-40\" с пробелами и суммой цифр <30.");

    assert.notOk(
        validator.validate("+7(999)999-33-44", item),
        "Проверка номера телефона \"+7(999)999-33-44\"с суммой цифр >30.");

    assert.notOk(
        validator.validate("+7(111)20-030-40", item),
        "Проверка номера телефона \"+7(111)20-030-40\" в неправильном формате и суммой цифр <30.");

    assert.notOk(
        validator.validate("8(111)200-30-40", item),
        "Проверка номера телефона \"8(111)200-30-40\" в неправильном формате c 8 вместо +7 и суммой цифр <30.");
});

QUnit.module("DOM: /index.html");
/**
 * Перед выполнением тестов: загрузка файла index.html производится в файле tests.html
 */
QUnit.test("Тестирование DOM-структуры: index.html", function(assert) {
    let $form = $("#qunit-fixture").find("form");
    let $result =  $("#qunit-fixture").find("#resultContainer");

    assert.equal($form.attr("id"), "myForm", "Существует форма с id=myFrom");
    assert.equal($form.find("input#fio").attr("id"), "fio", "Существует инпут с id=fio");
    assert.equal($form.find("input#email").attr("id"), "email", "Существует инпут с id=email");
    assert.equal($form.find("input#phone").attr("id"), "phone", "Существует инпут с id=phone");
    assert.ok($result, "Существует div#resultContainer");
});

/*
QUnit.module("class Sender: /index.js");
QUnit.test("Тестирование класса Sender: /index.js", function(assert) {
    //assert.equal("", "", "");
});

QUnit.module("class MyForm: /index.js");
QUnit.test("Тестирование класса MyForm: /index.js", function(assert) {
    //assert.equal("", "", "");
});
*/
