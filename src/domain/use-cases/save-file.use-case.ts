import fs from 'fs';

export interface SaveFileUseCase {
    execute: (options: Options) => boolean;
}

export interface Options {
    fileContent: string;
    fileDestination?: string;
    fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
    constructor(
        /**
         * repository: StorageRepository as DI
         */
    ){}

    execute( { fileContent, fileDestination = 'outputs', fileName = 'table' }: Options ): boolean {

        try {
            //*Recursive: true allow us to create more subfolders if they are stablished
            fs.mkdirSync(fileDestination, { recursive: true });
            fs.writeFileSync(`${ fileDestination }/${ fileName }.txt`, fileContent);
            // console.log('File created!');
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }

    } 
}