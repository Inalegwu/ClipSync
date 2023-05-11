import PouchDB from "pouchdb";

/**
 *
 * INSTANTIATE THE POUCHDB DATABASE
 * TO CLIPBOARDS. the clipboard name will be native to the app
 * the sync url, will be setup to the default remote DB
 *
 * users that want to use the self-hosted option , can always
 * replace it with their remote couch db url ...
 *
 *
 */

const db = new PouchDB("clipboards", {});

export default db;
