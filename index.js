/**
 * Выполняется механизм валидации передаваемых строк.
 * Предварительно загружаются (метод addRegexp) проверочные регулярные выражения и вспомогательные функции.
 */
class Validator {
    constructor() {
        this.regs = [];
    }

    /**
     * Выполняется загрузка регулярного выражения для проверки и вспомогательных функций.
     * @param item - идентификатор, по которому запрашивается соотв. набор регулярного выражения и функций.
     * @param regexp - регулярное выражение.
     * @param prepareFunc - функция для предварительной подготовки сторки перед сравнением с рег. выражением.
     *      Реализована функция по умолчанию, выполняющая обрезку пустых символов по краям строки.
     * @param afterFunc - функция для выполнения окончательной проверки после сравнения с рег. выражением.
     *      Реализована функция по умолчанию, возвращающая подвтерждение проверки, если строка не равна null.
     * @returns {Validator} - ссылка на объект Validator.
     */
    addRegexp(item, regexp, prepareFunc=function(str) { return str.trim(); }, afterFunc=function(str) { return str !== null; }) {
        this.regs[item] = {
            regexp: regexp,
            prepare: prepareFunc,
            after: afterFunc
        };
        return this;
    }

    /**
     * @param data - данные, передаваемые для валидации
     * @param item - идентификатор, по которому запрашивается соотв. набор регулярного выражения и функций.
     * @returns {result/null} - строка, прошедшая валидацию, либо null.
     */
    validate(data, item) {
        let result = null;
        let regexp = this.regs[item].regexp;
        if (regexp !== undefined) {
            try {
                result = this.regs[item]
                    .prepare(data)
                    .match(regexp);
                if (result !== null && this.regs[item].after(result[0]) === false) {
                    result = null;
                }
            } catch (e) {
                console.log("Validator throws exception: " + e.message);
                result = null;
            }
        }
        return result !== null ? result[0] : null;
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