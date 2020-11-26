import fs from "fs";

export const getComments = (id) => {
  try {
    return JSON.parse(fs.readFileSync(`${__dirname}/data/${id}.json`, "utf8"));
  } catch (e) {
    return [];
  }
};

export const putComment = (id, commentObject) => {
  try {
    const content = getComments(id);
    content.push(commentObject);
    fs.writeFileSync(
      `${__dirname}/data/${id}.json`,
      JSON.stringify(content),
      "utf8"
    );
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
