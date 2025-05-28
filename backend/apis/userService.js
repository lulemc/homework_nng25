const fs = require("fs");
const path = require("path");

function getUserProfile(id) {
  return new Promise((resolve, reject) => {
    const usersPath = path.join(__dirname, "../users.json");

    fs.readFile(usersPath, "utf8", (err, data) => {
      if (err) {
        return reject(new Error("Could not read users.json file."));
      }

      try {
        const users = JSON.parse(data);
        const user = users.find((u) => u.id === id);

        if (!user) {
          return reject(new Error(`User with ID ${id} not found.`));
        }

        const cleanedUser = {
          ...user,
          picture: user.picture.replace(/^public\//, "/"),
        };

        resolve(cleanedUser);
      } catch (parseError) {
        reject(new Error("Error parsing users.json."));
      }
    });
  });
}

module.exports = {
  getUserProfile,
};
