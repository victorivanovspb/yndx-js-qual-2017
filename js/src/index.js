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
    constructor($origin, $result, getData) {
        this.$origin = $origin;
        this.$result = $result;
        this.getData = getData;

        this.responseStatus = "";
        this.requestSended = false;

        this.resultContainer = {
            states: ["success", "error", "progress"],
            clearState: (function() {
                for (let state of this.resultContainer.states) {
                    this.$result
                        .removeClass(state)
                        .text("");
                }
            }).bind(this),
            addState: (function(state, message) {
                this.resultContainer.clearState();
                this.$result
                    .addClass(state)
                    .text(message);
            }).bind(this)
        };

        this.submitButton = {
            $btn: this.$origin.find("#submitButton"),
            disable: (function() {
                this.submitButton.$btn.attr("disabled", "true");
            }).bind(this),
            enable: (function() {
                this.submitButton.$btn.removeAttr("disabled");
            }).bind(this),
        };
        this.submitButton.enable();
    }

    _submitReq() {
        return new Promise((resolve, reject) => {
            this.submitButton.disable();
            let data = this.getData();
            $.ajax({
                type: "GET",
                url: this.$origin.attr("action"),
                dataType: "json",
                data: data,
                success: resolve,
                error: reject,
                cache: false
            });
        });
    }

    _parseResponse(response) {
        let message = "";
        switch(response["status"]) {
            case "progress":
                this.submitButton.disable();
                setTimeout(
                    this.sendRequest.bind(this),
                    parseInt(response["timeout"], 10)
                );
                break;

            case "success":
                this.submitButton.enable();
                message = "Success";
                break;

            case "error":
                this.submitButton.enable();
                message = response["reason"];
                break;

            default:
                this.submitButton.enable();
                this.responseStatus = "";
                message = "";
                break;
        }
        this.resultContainer
            .addState(this.responseStatus, message);
    }

    /**
     * Отправить AJAX-запрос.
     */
    sendRequest() {
        this._submitReq()
            .then((response) => {
                this._parseResponse(response);
            })
            .catch((reject) => {
                console.error(reject);
                this.submitButton.enable();
            });
    }
}

/**
 * Основной класс MyForm.
 */
class MyForm {
    constructor(formId, resultId) {
        this.$origin = $(formId);
        this.$result = $(resultId);
        this.inputs = {
            list: ["fio", "email", "phone"],
            setErrorClass: (function(inputs=this.inputs.list) {
                for (let item of inputs) {
                    this.$origin
                        .find("input#" + item)
                        .addClass("error");
                }
            }).bind(this),
            clearErrorClass: (function(inputs=this.inputs.list) {
                for (let item of inputs) {
                    this.$origin
                        .find("input#" + item)
                        .removeClass("error");
                }
            }).bind(this)
        };
        this.sender = new Sender(this.$origin, this.$result, this.getData.bind(this));
        this.validator = new Validator()
        //.addRegexp("fio", /^[A-Za-zА-ЯЁа-яё]+[\s]+[A-Za-zА-ЯЁа-яё]+[\s]+[A-Za-zА-ЯЁа-яё]+$/)
            .addRegexp("fio", /^[^\s]+[\s]+[^\s]+[\s]+[^\s]+$/)
            .addRegexp("email", /^[A-Za-z0-9.,_%+-]+@(ya\.ru|(yandex\.(ru|ua|by|kz|com)))$/)
            .addRegexp("phone", /^\+7\(\d{3}\)\d{3}[-]\d{2}[-]\d{2}$/,
                function(str) { return str.trim().replace(/\s/g, '') },
                function(str) {
                    let sum = 0;
                    for (let c of str.replace(/[^\d]/g, '')) {
                        sum += parseInt(c, 10);
                    }
                    return sum <= 30;
                });
    }

    /**
     * Запустить валидацию всех полей формы id=myForm (с исп. класса Validator).
     * @returns {{isValid: boolean, errorFields: Array}} - возвращается объект с признаком результата валидации (isValid)
     * и массивом названий полей, которые не прошли валидацию (errorFields).
     */
    validate() {
        let result = {
            isValid: false,
            errorFields: []
        };
        for (let item of this.inputs.list) {
            let $sel = this.$origin.find("input[name=" + item + "]");
            if (this.validator.validate($sel.val(), item) === null) {
                result.errorFields.push(item);
            }
        }
        result.isValid = (result.errorFields.length === 0);
        return result;
    }

    /**
     * Метод submit выполняет валидацию полей и отправку ajax-запроса, если валидация пройдена.
     * Вызывается по клику на кнопку отправить.
     */
    submit() {
        this.sender.resultContainer.clearState();
        let answer = this.validate();
        this.inputs.clearErrorClass();
        this.inputs.setErrorClass(answer.errorFields);
        if (answer.isValid) {
            this.sender.sendRequest();
        }
    }

    /**
     * @returns {result} - возвращает объект с данными формы, где имена свойств совпадают с именами инпутов.
     */
    getData() {
        let result = {};
        for (let item of this.inputs.list) {
            result[item] = this.$origin
                .find("input#" + item)
                .val();
        }
        return result;
    }

    /**
     * @param data - Метод setData принимает объект с данными формы и устанавливает их инпутам формы.
     * Поля кроме phone, fio, email игнорируются.
     */
    setData(data) {
        for (let item of this.inputs.list) {
            if (item in data) {
                this.$origin
                    .find("input[name=" + item + "]")
                    .val(data[item]);
            }
        }
    }
}

$(document).ready(function() {
    let myForm = window.MyForm = new MyForm("#myForm", "#resultContainer");
    myForm.$origin
        .find("button#submitButton")
        .click(myForm.submit.bind(myForm));

    /*
    let sample = {
        "fio" : "AAA BBB CCC",
        "email" : "aaa-bbb-ccc@yandex.ru",
        "phone" : "+7 (111) 111-22-33",
        "spec" : "Some field"
    };
    myForm.setData(sample);
    */
});