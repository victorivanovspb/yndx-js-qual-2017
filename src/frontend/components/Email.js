'use strict';

import React from 'react';

export default class Email extends React.Component {
    render() {
        return (
            <div className='form-group'>
                <label htmlFor='email'>Электронный адрес</label>
                <input name='email' id='email' className='form-control'/>
            </div>
        );
    }
}
