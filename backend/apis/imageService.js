const fs = require("fs");
const path = require("path");

async function getImageByName(imageName) {
  const imagePath = path.join(__dirname, "../../public/assets/", imageName);
  return new Promise((resolve, reject) => {
    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (err) {
        return reject(new Error(`Image '${imageName}' not found.`));
      }

      const publicPath = `public/assets/${imageName}`;
      resolve({ url: publicPath });
    });
  });
}

module.exports = { getImageByName };
