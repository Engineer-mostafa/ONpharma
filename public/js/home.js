
//small promis
const status = "connected";
const promis = new Promise((resolve, reject) => {
    if (status === "connected")
        resolve("Ok Continue");
    else
        reject("Try Again");
});



promis
    .then(statu => {
        console.log(statu);
    })
    .catch(statu => {
        console.log(statu);
    })