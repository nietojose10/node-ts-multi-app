import { yarg } from "./config/plugins/args.plugin";
import { ServerApp } from './presentation/server-app';

// console.log(process.argv);

// console.log(yarg.b);

//!remember that in our app's root we cannot execute asynchronous code so all the code that we execute is synchronous
//!but we can execute async code using this method IIFE(inmediately invoked function expression)
(async() => {
    await main();
    // console.log('Fin de programa');
})();

async function main(){
    const { b:base, l:limit, s:showTable, n:fileName, d:fileDestination } = yarg;

    ServerApp.run({ base, limit, showTable, fileName, fileDestination });
}