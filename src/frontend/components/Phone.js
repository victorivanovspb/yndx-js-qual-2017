'use strict';

import React from 'react';

export default class Phone extends React.Component {
    render() {
        return (
            <div className='form-group'>
                <label htmlFor='phone'>Телефон</label>
                <input name='phone' id='phone' className='form-control'/>
            </div>
        );
    }
}
