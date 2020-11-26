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
    commentObject.key = 1;
    if( content.length > 0 && content[content.length-1].key)
      commentObject.key = content[content.length-1].key + 1;
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

export const deleteComment = (id, condition) => {
  try {
    let content = getComments(id);
    content = content.filter( data => {
      for(let attr in condition)
        if(data[attr] !== condition[attr])
          return true;
      return false;
    })
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
}