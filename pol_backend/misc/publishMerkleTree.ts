import { Web3Storage } from "web3.storage";
import { IndexHashMap, TreeNode } from "./allInterfaces";

function getAccessToken() {
	// If you're just testing, you can paste in a token
	// and uncomment the following line:
	// return 'paste-your-token-here'

	// In a real app, it's better to read an access token from an
	// environement variable or other configuration that's kept outside of
	// your code base. For this to work, you need to set the
	// WEB3STORAGE_TOKEN environment variable before you run your code.
	return process.env.WEB3STORAGE_TOKEN;
}

function makeStorageClient() {
	return new Web3Storage({ token: getAccessToken() });
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

export default async function publishMerkleTree(
	tree: TreeNode[],
	saltAndHashMap: IndexHashMap[]
) {
	try {
		const files = makeFileObjects({ tree, hashMap: saltAndHashMap });
		const cidString = await storeWithProgress(files);
		console.log(`CID of the tree is ${cidString}`);
	} catch (error: any) {
		console.error(error);
	}
}
