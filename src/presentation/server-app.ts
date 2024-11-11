import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';

export interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    fileName: string;
    fileDestination: string;
}

export class ServerApp {

    //*As this method is static remember there is no need to create an instance to execute this method
    static run( { base, limit, showTable, fileName, fileDestination }: RunOptions ) {
        console.log('Server running...');
        
        //*In CreateTable we could inject some dependencies as parameters in case we would have.
        const table = new CreateTable().execute({ base, limit });
        const wasCreated = new SaveFile()
        .execute({ 
            fileContent: table,
            fileDestination: fileDestination,
            fileName: fileName
        });

        if ( showTable ) console.log(table);

        ( wasCreated )
            ?   console.log('File created!')
            :   console.error('File not created');
    }
}