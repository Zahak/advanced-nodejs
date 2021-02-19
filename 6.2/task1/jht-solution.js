const fs = require('fs');
const path = require('path');

const correctFile = (source, target) => {
  if (source == '') {
    throw new Error('No filename');
  }

  fs.readFile(source, (error, data) => {
    if (error) {
      throw error;
    }

    const correctedData = data.slice(0, data.length / 2);
    fs.writeFile(target, correctedData, (error) => {
      if (error) {
        throw error;
      }
    });
  });
};

const getFiles = (source, target) => {
  // Create 'corrected-files' folder first.
  fs.readdir(source, (error, files) => {
    if (error) {
      throw error;
    }

    files.forEach((fileName) => {
      correctFile(path.join(source, fileName), path.join(target, fileName));
      console.log(`Completed ${fileName}`);
    });
  });
};

getFiles(path.join(__dirname, 'files'), path.join(__dirname, 'corrected-files'));
