import {beforeEach, describe, expect, jest, test} from '@jest/globals';
// import { yarg } from './args.plugin';
//!When there is an error related to "parseSync" when we are using Yarg
//!It means we have passed the parameters needed when we are importing the package "Yarg"
const runCommand = async( args: string[] ) => {

    process.argv = [ ...process.argv, ...args ];

    // console.log(process.argv);

    const { yarg } = await import('./args.plugin');

    return yarg;
}

describe('Test args.plugin,ts', () => { 

    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });

    test('should return default values', async() => { 
        
        //*Remember always send the "base" because is mandatory send it otherwise 
        //*it will throw an error 
        const argv = await runCommand(['-b','5']);

        expect(argv).toEqual( expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs',
          })
        )

    });

    test('should return configuration with custom values', async() => { 
         
        const argv = await runCommand(['-b','5','-l','20','-n','custom-name','-d','custom-destination']);

        // console.log(argv);
        expect(argv).toEqual( expect.objectContaining({
            b: expect.any( Number ),
            l: expect.any( Number ),
            s: expect.any( Boolean ),
            n: expect.any( String ),
            d: expect.any( String ),
          })
        )

    });
});