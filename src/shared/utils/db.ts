import PouchDB from "pouchdb";

/**
 *
 * INSTANTIATE THE POUCHDB DATABASE
 * TO CLIPBOARDS. THIS IN ITSELF IF APPLICATION SPECIFIC
 * BUT IN THE FUTURE,THE DB NAME WILL BE THE REMOTE SERVER
 * FOR SYNCING ACROSS THE NETWORK
 *
 */

const db = new PouchDB("clipboards", {});

const remoteDb = "http://localhost:5986/clipboards";

export default db;
