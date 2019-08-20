'use strict';

import React from 'react';

export default class App extends React.Component {
    render() {
        return (
            <form id='myForm' action='json/'>
                <div className='form-group'>
                    <label htmlFor='fio'>Фамилия Имя Отчество</label>
                    <input name='fio' id='fio' className='form-control'/>
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Электронный адрес</label>
                    <input name='email' id='email' className='form-control'/>
                </div>
                <div className='form-group'>
                    <label htmlFor='phone'>Телефон</label>
                    <input name='phone' id='phone' className='form-control'/>
                </div>
                <button id='submitButton' type='button' className='btn btn-primary'>Отправить</button>
            </form>
        );
    }
}
