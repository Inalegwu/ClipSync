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

/***
 *
 *
 * make the remote sync db location a config option so that
 * syncing can be done in the renderer process and in that way,
 * the user can manage whether they are syncing or not
 *
 *
 */

export default db;
