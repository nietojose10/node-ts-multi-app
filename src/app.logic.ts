// const message:string = 'Hola mundo!';
// console.log(message);
import fs from 'fs';
import { yarg } from './config/plugins/args.plugin';

console.log(yarg);
let contentFile: string = '';
const { b:base, l:limit, s:showTable } = yarg;
const title = `
==================================
    Tabla del ${ base }
==================================
`;
contentFile += title;
for (let i = 0; i <= limit; i++ ){
    contentFile += `${ base } x ${ i } = ${ base * i }\n`;
}

if ( showTable ) console.log(contentFile);

const outputPath = `outputs/folder1/folder2`;
//*Recursive: true allow us to create more subfolders if they are stablished
fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${ outputPath }/tabla-${base}.txt`, contentFile);
console.log('File created!');
