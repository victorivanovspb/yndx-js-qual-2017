'use strict';

import React from 'react';

export default class Name extends React.Component {
    render() {
        return (
            <div className='form-group'>
                <label htmlFor='fio'>Фамилия Имя Отчество</label>
                <input name='fio' id='fio' className='form-control'/>
            </div>
        );
    }
}
