import { Web3Storage } from "web3.storage";
import { web3StorageKey } from "../configs/config";
import { IndexHashMap, TreeNode } from "./types/types";

function makeStorageClient() {
  return new Web3Storage({ token: web3StorageKey });
}

function makeFileObjects(object: Object) {
  // You can create File objects from a Blob of binary data
  // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
  // Here we're just storing a JSON object, but you can store images,
  // audio, or whatever you want!
  const blob = new Blob([JSON.stringify(object)], {
    type: "application/json",
  });

  const files = [new File([blob], "tree.json")];
  return files;
}

async function storeWithProgress(files: File[]) {
  try {
    // show the root cid as soon as it's ready
    const onRootCidReady = (cid: string) => {
      console.log("uploading files with cid:", cid);
    };

    // when each chunk is stored, update the percentage complete and display
    const totalSize = files.map((f) => f.size).reduce((a, b) => a + b, 0);
    let uploaded = 0;

    const onStoredChunk = (size: number) => {
      uploaded += size;
      const pct = 100 * (uploaded / totalSize);
      console.log(`Uploading... ${pct.toFixed(2)}% complete`);
    };

    // makeStorageClient returns an authorized web3.storage client instance
    const client = makeStorageClient();

    // client.put will invoke our callbacks during the upload
    // and return the root cid when the upload completes
    return client.put(files, { onRootCidReady, onStoredChunk });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function publishMerkleTree(
  tree: TreeNode[],
  saltAndHashMap: IndexHashMap[]
) {
  try {
    const files = makeFileObjects({ tree, hashMap: saltAndHashMap });
    console.log({ tree, hashMap: saltAndHashMap, files });
    const cidString = await storeWithProgress(files);
    console.log(`CID of the tree is ${cidString}`);
    return { cidString };
  } catch (error: any) {
    console.error(error);
    return { cidString: null };
  }
}

export async function retrieveFiles(cid: string) {
  const client = makeStorageClient();
  const res = await client.get(cid);
  console.log(`Got a response! [${res?.status}] ${res?.statusText}`);
  if (!res?.ok) {
    throw new Error(
      `failed to get ${cid} - [${res?.status}] ${res?.statusText}`
    );
  }

  // unpack File objects from the response
  const files = await res?.files();

  if (files[0].name === "tree.json") {
    const treeRes = await client.get(files[0].cid);

    const rawStringData = await treeRes?.text();
    const regex = /({"tree")/g;
    const rawData = rawStringData?.search(regex);
    const slicedString = rawStringData?.slice(rawData) || "";
    const jsonData = JSON.parse(slicedString);

    return jsonData;
  }
}
