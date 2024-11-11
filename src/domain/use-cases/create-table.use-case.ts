
export interface CreateTableUseCase {
    execute: ( options: CreateTableOptions ) => string;
}

export interface CreateTableOptions {
    base: number;
    limit?: number;
}

//*When we are working with Vanilla JS, we usually use factory functions. 
export class CreateTable implements CreateTableUseCase {
    //!Remember that the constructor is the first method that is gonna be called when
    //!we create an instance of the class.
    constructor(
        /**
         * *DI - Dependency Injection
         * *The advange of use this depencies like this is that we can use this dependencies in our execute
         * *method very easy
         */
    ){}

    execute({ base, limit = 10 }: CreateTableOptions ){
        /**
         * * This method sometimes is called run or execute
         * *and here is where we are gonna execute the use case
         */
        let contentFile = '';
        for (let i = 1; i <= limit; i++ ){
            contentFile += `${ base } x ${ i } = ${ base * i }`;

            if ( i < limit ) contentFile +='\n';
        }
        return contentFile;
    }

}