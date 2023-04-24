import PouchDB from "pouchdb";

const db = new PouchDB("localhost:5984/clipboards", {});

db.info()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

export default db;
