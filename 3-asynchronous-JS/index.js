//jshint esversion:6
//jshint esversion:8

const fs = require("fs");
const superagent = require("superagent");

//BELOW: How to promisify Node.js readFile() & writeFile() methods:-

const readFilePro = file => { //Fist step is to create a function that returns a promse
  return new Promise((resolve, reject) => { //The Promise Constructor takes in an 'Exectutor function' which is called AS SOON as the Promise is created
    fs.readFile(file, "utf-8", (err, data) => { //The 'Executor function' is where we do the asynchronous work
      if (err) reject("File could not be found!");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => { //NB: You can call these arguments whatever you like, but'resolve' & 'reject' are standard names!
    fs.writeFile(file, data, err => {
      if (err) reject("Could not write file!");
      resolve("Success"); //There's no data to return here. Promises don't always have to return a meaningful value
    });
  });
};

const getDogPic = async () => { //The 'async' marks function as an Asynchronous function
  try {
    const data = await readFilePro(`${__dirname}/starter/dog.txt`); //The 'await' will stop code from running until Promise is resolved. If Promise is fulfilled, then value of 'await' expression is the resolved value of Promise. We then save this in 'data' variable
    console.log(`Breed: ${data}`);

    const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);  //We're saving this promise into a variable
    console.log(res.body.message);

    const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);  //We're saving this promise into a variable
    console.log(res.body.message);

    const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);  //We're saving this promise into a variable
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map(el => el.body.message);
    console.log(imgs);

    await writeFilePro(`${__dirname}/starter/dog-img.txt`, imgs.join("\n")); //This promise doesn't resolve any meaningful value, no need to store it in variable!
    console.log("Random dog image saved to file!");
  } catch (err) {
    console.log(err.message);
    throw err;  //This marks the entire Async Function as rejected
  }
  return "2: READY!";
};

/*
console.log("1: I will get dog pics!");
getDogPic()
.then(x => {  //The 'then()' method gives us access to what is returned from Async Function
  console.log(x);
  console.log("3: Done getting dog pics!");
}) //You must call the function to make it work!
.catch(err => {
  console.log("ERROR");
});
*/

(async () => {  //This is an Javascript IIFE
  try {
    console.log("1: I will get dog pics!");
    const x = await getDogPic();  //We are awaiting value from first promise. Returned value from 'getDogPic()' is stored in variable x.
    console.log(x);

    console.log("3: Done getting dog pics!");
  } catch(err) {  //You must still write out 'err' even if you don't need to use it!
    console.log("ERROR");
  }
})();

/*
readFilePro(`${__dirname}/starter/dog.txt`).then(data => {
  console.log(`Breed: ${data}`);

  return superagent
  .get(`https://dog.ceo/api/breed/${data}/images/random`);
}).then(res => {
    console.log(res.body.message);
    return writeFilePro(`${__dirname}/starter/dog-img.txt`, res.body.message);
  })
  .then(() => {
    console.log("Random dog image saved to file!");
  })
  .catch(err => {  //You only need one single 'catch' handler for all the chained 'then' handlers
    console.log(err.message);
  });
  */
