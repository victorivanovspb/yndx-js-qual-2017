/**
 * Клиентская логика
 */
class Validator {
    constructor() {}
    }
}

/**
 * Выполняется обработка AJAX-запросов, а также взаимодействие с DOM-элементом id=resultContainer.
 */
class Sender {
    constructor() {}
}

/**
 * Основной класс MyForm.
 */
class MyForm {
    constructor(formId, resultId) {
        this.$origin = $(formId);
        this.$result = $(resultId);
    }
    validate() {}
    submit() {}
    getData() {}
    setData(data) {}
}

$(document).ready(function() {
    let myForm = window.MyForm = new MyForm("#myForm", "#resultContainer");
    myForm.$origin
        .find("button#submitButton")
        .click(myForm.submit.bind(myForm));

    let sample = {
        "fio" : "AAA BBB CCC",
        "email" : "aaa-bbb-ccc@yandex.ru",
        "phone" : "+7 (111) 111-22-33",
        "spec" : "Some field"
    };
    myForm.setData(sample);
});