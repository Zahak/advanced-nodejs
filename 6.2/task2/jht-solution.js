const fs = require('fs');
const path = require('path');

const rotateLog = (directory) => {
  const interval = new Date();
  interval.setDate(interval.getDate() - 7);

  fs.readdir(directory, (error, files) => {
    files.forEach((file) => {
      fs.stat(path.join(directory, file), (error, stats) => {
        if (stats.mtime < interval) {
          fs.unlink(path.join(directory, file), (error) => {
            if (error) {
              throw error;
            }
          });
          // console.log(`Delete: ${file} - ${stats.mtime}`);
        }
        /*else {
          console.log(`Keep: ${file} - ${stats.mtime}`);
        }*/
      });
    });
  });
};

rotateLog(path.join(__dirname, 'files'));
