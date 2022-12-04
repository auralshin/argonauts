import crypto from "crypto";
import {
	IndexHashMap,
	SaltHashMapping,
	TreeNode,
	UserData,
} from "./allInterfaces";
import userDataWithSalt from "./userDataWithSalt.json";

const EMPTY_LEAF: TreeNode = {
	hash: "0b00",
	balance: 0,
};

function hashed(x: any) {
	return crypto.createHash("sha256").update(x).digest("base64");
}

function getNextPowerOf2(x: number): number {
	if (x > 1) {
		return 2 * getNextPowerOf2(Math.floor((x + 1) / 2));
	} else {
		return 1;
	}
}

function userDataToLeaf(user: UserData): TreeNode {
	return { hash: hashed(user.salt + user.uuid), balance: user.balance };
}

function combineTreeNodes(l: TreeNode, r: TreeNode): TreeNode {
	if (l.balance >= 0 && r.balance >= 0) {
		const newNodeHash = hashed(
			l.hash + l.balance.toString(32) + r.hash + r.balance.toString(32)
		);
		return {
			hash: newNodeHash,
			balance: l.balance + r.balance,
		};
	}
}

function buildMerkleSumTree(userDataList: UserData[]) {
	const treeSize = getNextPowerOf2(userDataList.length);

	const tree: TreeNode[] = [
		...new Array(treeSize).fill(null),
		...userDataList.map(userDataToLeaf),
		...new Array(
			treeSize - userDataList.length > 0
				? treeSize - userDataList.length
				: 0
		).fill(EMPTY_LEAF),
	];

	// console.log(tree);

	for (let i = treeSize - 1; i > 0; i--) {
		tree[i] = combineTreeNodes(tree[i * 2], tree[i * 2 + 1]);
	}

	return tree;
}

function saltAndHashMapping(userData: UserData[]) {
	const saltAndHashMap: SaltHashMapping[] = [];
	for (let i = 0; i < userData.length; i++) {
		const data = userData[i];
		const userLeaf = userDataToLeaf({
			balance: data.balance,
			salt: data.salt,
			uuid: data.uuid,
		});
		saltAndHashMap.push({
			hash: userLeaf.hash,
			salt: data.salt,
		});
	}
	return saltAndHashMap;
}

function createHashMap(tree: TreeNode[]): IndexHashMap[] {
	const requiredHashMap: IndexHashMap[] = [];
	for (let i = 1; i < tree.length; i++) {
		const element = tree[i];
		requiredHashMap.push({
			hash: element.hash,
			index: i,
		});
	}
	return requiredHashMap;
}

merkleTreeGen();

export default function merkleTreeGen() {
	const userData = userDataWithSalt;
	const tree = buildMerkleSumTree(userData);
	const hashMap = createHashMap(tree);
	const saltAndHashMap = saltAndHashMapping(userData);

	console.log(tree);
	console.log("**********");
	console.log(saltAndHashMap);

	return {
		tree,
		hashMap,
		saltAndHashMap,
	};
}
