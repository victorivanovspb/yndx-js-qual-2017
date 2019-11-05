'use strict';

/*eslint-disable no-unused-vars*/
import React from 'react';
import Name from './Name';
import Email from './Email';
import Phone from './Phone';
import Submit from './Submit';
/*eslint-enable no-unused-vars*/

export default class App extends React.Component {
    render() {
        return (
            <form id='myForm' action='request/'>
                <Name />
                <Email />
                <Phone />
                <Submit />
            </form>
        );
    }
}
