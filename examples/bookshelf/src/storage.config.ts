import { createStorage } from 'unstorage';
import netlifyBlobsDriver from 'unstorage/drivers/netlify-blobs';

/**
 * @see https://unstorage.unjs.io/drivers/netlify
 */

declare module 'unstorage/drivers/netlify-blobs' {
  interface NetlifyNamedStoreOptions {
    siteID?: string;
    token?: string;
  }
}

const blobName = process.env.NETLIFY_BLOB || 'users';

export const storage = createStorage({
  driver: netlifyBlobsDriver({
    name: blobName,
    deployScoped: false,
    siteID: process.env.NETLIFY_SITE_ID,
    token: process.env.NETLIFY_TOKEN,
  }),
});
