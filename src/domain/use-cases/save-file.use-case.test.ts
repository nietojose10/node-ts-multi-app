import { afterEach, describe, expect, jest, test} from '@jest/globals';
import { SaveFile } from './save-file.use-case';
import fs from 'fs';

describe('SaveFileUseCase', () => { 

    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name'
    };
    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;
    const mainFolder = 'custom-outputs';
    afterEach(() => {
        // const outputFolderExists = fs.existsSync('outputs');
        // if ( outputFolderExists ) fs.rmSync('outputs', {recursive: true});

        // const customOutputFolderExists = fs.existsSync(mainFolder);
        // if ( customOutputFolderExists ) fs.rmSync(mainFolder, {recursive: true});

    });

    test('should save file with default values', () => { 
        
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'test content'
        }

        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath); //This may be a false positive 
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
        
        expect( result ).toBeTruthy();
        expect( fileExists).toBe( true );
        expect( fileContent ).toBe( options.fileContent );

    });

    test('should save file with custom values', () => { 

        const saveFile = new SaveFile(); 

        const result = saveFile.execute(customOptions);
        const fileExists = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8' });

        expect( result ).toBeTruthy();
        expect( fileExists ).toBe( true );
        expect( fileContent ).toBe( customOptions.fileContent );

    });

    test('should return false if directory could not be created', () => { 

        const saveFile = new SaveFile();

        //*What this line says is that is going to spy on the fs(File system variable), precisely
        //*The method mkdirSync, if we do not add the function .mockImplementation()
        //*This would add a spy to check if the function mkdirSync has been called.
        //*When we add the function mockImplementation means that we want to override the functionality
        //*of mkdirSync
        const mkdirSpy = jest.spyOn( fs, 'mkdirSync' ).mockImplementation(
            () => { throw new Error('This is a custom error message from testing'); }
        )

        const result = saveFile.execute(customOptions);

        expect( result ).toBe(false);

        mkdirSpy.mockRestore();

    });

    test('should return false if file could not be created', () => { 

        const saveFile = new SaveFile();

        const writeFileSpy = jest.spyOn( fs, 'writeFileSync' ).mockImplementation(
            () => { throw new Error('This is a custom writing error message from testing'); }
        )

        const result = saveFile.execute({ fileContent: 'Hola' });

        expect( result ).toBe( false );

        writeFileSpy.mockRestore();

    });

});