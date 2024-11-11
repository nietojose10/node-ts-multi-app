import {describe, expect, jest, test} from '@jest/globals';
// process.argv = ['node', 'app.ts', '-b', '10'];
// import './app';
import { ServerApp } from './presentation/server-app';

//!When there is an error related to parseSync when we are using Yarg
//!It means we have passed the parameters needed when we are importing the package "Yarg"
//!We have to pass the parameters needed before we import the package Yarg
describe('Test App.ts', () => { 

    test('should call Server.run with values', async() => { 

        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;
        process.argv = ['node', 'app.ts', '-b', '10', '-l', '5', '-s', '-n', 'test-file', '-d', 'test-destination'];
        
        await import('./app');

        expect( serverRunMock ).toHaveBeenCalledWith({
            base: 10,
            limit: 5,
            showTable: true,
            fileName: 'test-file',
            fileDestination: 'test-destination'
        });

    });

});