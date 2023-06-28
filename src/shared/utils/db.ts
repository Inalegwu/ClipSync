import PouchDB from "pouchdb";

const db = new PouchDB("clipboards", {});

export default db;
