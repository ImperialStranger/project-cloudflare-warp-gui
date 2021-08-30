const fs = require('fs');

function checkFileExist(file, data){
    try {
        fs.existsSync(file)
    } catch (error) {
        // throw error;
        fs.writeFileSync(file, data);
    }
}

checkFileExist('mode.pdnr', 'warp-cli set-mode dot');
checkFileExist('output.pdnr', '')