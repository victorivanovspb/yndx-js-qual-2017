'use strict';

import React from 'react';
import Name from './Name';
import Email from './Email';
import Phone from './Phone';
import Submit from './Submit';

export default class App extends React.Component {
    render() {
        return (
            <form id='myForm' action='json/'>
                <Name />
                <Email />
                <Phone />
                <Submit />
            </form>
        );
    }
}
