QUnit.test("Тестирование класса Validator: /index.js", function(assert) {
    let validator = new Validator();
    let item = "fio";
    let regexp = /^[^\s]+[\s]+[^\s]+[\s]+[^\s]+$/;
    validator.addRegexp(item, regexp);
    assert.equal(
        validator.validate("Раз Два Три", item),
        "Раз Два Три",
        "Корректная строка кириллицей в три слова (\"Раз Два Три\").");

    assert.equal(
        validator.validate("   Раз Два Три   ", item),
        "Раз Два Три",
        "Корректная строка кириллицей в три слова с пробелами по краям.");

    assert.equal(
        validator.validate("one two 3333", item),
        "one two 3333",
        "Корректная строка кириллицей в три слова с пробелами по краям.");


    //.addRegexp("email", /^[A-Za-z0-9.,_%+-]+@(ya\.ru|(yandex\.(ru|ua|by|kz|com)))$/)
   //assert.equal("новая строка с результатом", "новая строка с результатом", "eq.");
});


QUnit.test("Тестирование класса Sender: /index.js", function(assert) {
    assert.equal("", "", "");
});

QUnit.test("Тестирование класса MyForm: /index.js", function(assert) {
    assert.equal("", "", "");
});