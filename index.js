const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const directoryPathInput = path.join(__dirname, 'pdfs/input');
const directoryPathOutput = path.join(__dirname, 'pdfs/output');
const MAX_FILES_BY_BATCH = 2;

function readInputFiles(){
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPathInput,  (err, files) => {
            if(err){
                return console.log('Unable to scan directory: ' + err);
            } 
            resolve(files);
        });
    });
}

function doOCR(file){
    return new Promise((resolve, reject) => {                 
        console.time(`File ${file}`);        
        const command = `ocrmypdf -l 'por' --output-type pdf ${directoryPathInput}/${file}  ${directoryPathOutput}/${file}`;                    
        exec(command, (err,  stdout, stderr) => {                            
                console.timeEnd(`File ${file}`);
                if(err){          
                    reject(err);  
                    console.error(err)
                }          
                if(stdout){            
                    console.log(stdout)
                }          
                if(stderr){            
                    console.log(stderr)
                } 
                
                resolve();                 
            }); 
    });          
}

function convertBatch(files){  
     return new Promise((resolve, reject) => {         
        files.forEach(async (file) => {          
            await doOCR(file).then(() => {
                resolve();
            }).catch(() => {
                reject();
            });              
        });       
    });
}


async function convertPdfImageToPdfSearchable(){
    const files = await readInputFiles();    
    let i = 0;
    
    while(i < files.length){
        const filesProc = files.slice(i, i+MAX_FILES_BY_BATCH);       
        await convertBatch(filesProc);
        i += MAX_FILES_BY_BATCH;   
    }
    
}

convertPdfImageToPdfSearchable();

