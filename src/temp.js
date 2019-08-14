'use strict';

class SubmitButton {
    constructor($form, id) {
        this.$btn = $form.find(`#${id}`);
        this.enable();
    }

    disable() {
        this.$btn.attr('disabled', 'true');
    }

    enable() {
        this.$btn.removeAttr('disabled');
    }
}

class ResultContainer {
    constructor($form, id) {
        this.$res = $form.find(`#${id}`);
    }

    clearState() {
        this.$res
            .removeClass()
            .text('');
    }

    addState(state, message) {
        this.clearState();
        this.$res
            .addClass(state)
            .text(message);
    }
}

class FormInput {
    constructor($form, id) {
        this.$input = $form.find(`#${id}`);
        this.preps = [];
        this.checks = [];
        this.id = id;
    }

    get name() {
        return this.id;
    }

    get data() {
        return this.$input.val();
    }

    set data(value) {
        this.$input.val(value);
    }

    addPrepare(func) {
        this.preps.push(func);
        return this;
    }

    addChecker(func) {
        this.checks.push(func);
        return this;
    }

    prepare() {

    }

    check() {
        let str = this.$input.val();
        this.preps.forEach((prep) => {
            str = prep(str);
            return str;
        });

        let errors = 0;
        this.checks.forEach((check1) => {
            if (!check1(str)) {
                errors += 1;
            }
        });

        if (errors > 0) {
            this.$input.addClass('error');
            return false;
        }
        this.$input.removeClass('error');
        return true;
    }
}

/**
 * Основной класс.
 */
class Form {
    constructor(formId, resultId) {
        this.$form = $(`#${formId}`);
        this.inputs = [];

        let fio = new FormInput(this.$form, 'fio');
        fio.addPrepare((str) => { return str.trim(); });
        fio.addChecker((str) => {
            let result = str.match(/^[^\s]+[\s]+[^\s]+[\s]+[^\s]+$/);
            return (result !== null);
        });
        this.inputs.push(fio);

        let email = new FormInput(this.$form, 'email');
        email.addPrepare((str) => { return str.trim(); });
        email.addChecker((str) => {
            let result = str.match(/^[A-Za-z0-9.,_%+-]+@(ya\.ru|(yandex\.(ru|ua|by|kz|com)))$/);
            return (result !== null);
        });
        this.inputs.push(email);

        let phone = new FormInput(this.$form, 'phone');
        phone.addPrepare((str) => { return str.trim().replace(/\s/g, ''); });
        phone.addChecker((str) => {
            let result = str.match(/^\+7\(\d{3}\)\d{3}[-]\d{2}[-]\d{2}$/);
            return (result !== null);
        });
        phone.addChecker((str) => {
            let sum = 0;
            for (let c of str.replace(/[^\d]/g, '')) {
                sum += parseInt(c, 10);
            }
            return sum <= 30;
        });
        this.inputs.push(phone);

        this.resultContainer = new ResultContainer($(document), resultId);
        this.submitButton = new SubmitButton(this.$form, 'submitButton');
    }

/**
 * Запустить валидацию всех полей формы id=myForm (с исп. класса Validator).
 * @returns {{isValid: boolean, errorFields: Array}} - возвращается объект с признаком результата валидации (isValid)
 * и массивом названий полей, которые не прошли валидацию (errorFields).
 */
    validate() {
        let errors = [];
        this.inputs.forEach((input) => {
            if (!input.check()) {
                errors.push(input.name);
            }
        });
        return {
            isValid: (errors.length === 0),
            errorFields: errors
        };
    }

    /**
     * Метод submit выполняет валидацию полей и отправку ajax-запроса, если валидация пройдена.
     * Вызывается по клику на кнопку отправить.
     */
    submit() {
        let answer = this.validate();
        if (answer.isValid) {
            this._sendRequest();
        }
    }

/**
 * @returns {result} - возвращает объект с данными формы, где имена свойств совпадают с именами инпутов.
 */
    getData() {
        let result = {};
        this.inputs.forEach((input) => {
            result[input.name] = input.data;
        });
        return result;
    }

/**
 * @param data - Метод setData принимает объект с данными формы и устанавливает их инпутам формы.
 * Поля кроме phone, fio, email игнорируются.
 */
    setData({fio, email, phone}) {
        this.inputs.forEach((input) => {
            switch (input.name) {
                case 'fio':
                    input.data = fio;
                    break;
                case 'email':
                    input.data = email;
                    break;
                case 'phone':
                    input.data = phone;
                    break;
            }
        });
    }
/**
 * Выполняется обработка AJAX-запросов, а также взаимодействие с DOM-элементом id=resultContainer.
 * @param response
 * @private
 */
    _parseResponse(response) {
        let message = '';
        let state = response['status'];
        switch(state) {
            case 'progress':
                this.submitButton.disable();
                setTimeout(
                    this._sendRequest.bind(this),
                    parseInt(response['timeout'], 10)
                );
                break;

            case 'success':
                this.submitButton.enable();
                message = 'Success';
                break;

            case 'error':
                this.submitButton.enable();
                message = response['reason'];
                break;

            default:
                this.submitButton.enable();
                state = '';
                message = '';
                break;
        }
        this.resultContainer
            .addState(state, message);
    }
/**
 * Отправить AJAX-запрос.
 */
    _sendRequest() {
        let promise = new Promise((resolve, reject) => {
            this.submitButton.disable();
            let data = this.getData();
            $.ajax({
                type: "GET",
                url: this.$form.attr("action"),
                dataType: "json",
                data: data,
                success: resolve,
                error: reject,
                cache: false
            });
        });

        promise.then((response) => {
                this._parseResponse(response);
            })
            .catch((reject) => {
                console.error(reject);
                this.submitButton.enable();
            });
    }
}

$(document).ready(function() {
    window['MyForm'] = new Form('myForm', 'resultContainer');
    MyForm.$form
        .find('button#submitButton')
        .click(MyForm.submit.bind(MyForm));

    MyForm.setData({
        fio : 'AAA BBB CCC',
        email : 'aaa-bbb-ccc@yandex.ru',
        phone : '+7 (111) 111-22-33',
        spec : 'Some field'
    });
});
