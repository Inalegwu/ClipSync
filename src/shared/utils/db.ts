import PouchDB from "pouchdb";

const db = new PouchDB("clipboard", {});

export default db;
