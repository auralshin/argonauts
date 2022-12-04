import crypto from "crypto";
import sha256 from "crypto-js/sha256";
import { createHash } from "crypto";
import agroGenData from "./agroGenData";

import { allData } from "./agroData.json";
import { TreeNode, UserData } from "./allInterfaces";

class MerkleNode {
	left: MerkleNode | null;
	right: MerkleNode | null;
	hashValue: string;
	balance: number;
	constructor(
		hashValue: string,
		balance: number,
		left: MerkleNode | null = null,
		right: MerkleNode | null = null
	) {
		this.hashValue = hashValue;
		this.balance = balance;
		this.left = left;
		this.right = right;
	}
}

const getHash = (data: string): string => {
	return createHash("sha256").update(data.toString()).digest("base64");
};

const EMPTY_LEAF: TreeNode = {
	hash: "0b00",
	balance: 0,
};

function hashed(x: any) {
	return crypto.createHash("sha256").update(x).digest("base64");
}

function log2(n: number) {
	return Math.log2(n);
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

function getRoot(tree: TreeNode[]) {
	return tree[1];
}

function getProof(tree: TreeNode[], indexInTree: number): TreeNode[] {
	const branchLength = log2(tree.length) - 1;
	// const indexInTree = Math.floor((index + tree.length) / 2);
	// index_in_tree = index + len(tree); // 2

	const proof: TreeNode[] = [];
	for (let i = 0; i < branchLength; i++) {
		const node = tree[Math.floor(indexInTree / 2 ** i) ^ 1];
		// return [tree[(index_in_tree // 2**i) ^ 1] for i in range(branch_length)]

		proof.push(node);
	}
	return proof;
}

function verifyProof(
	leaf: TreeNode,
	index: number,
	userTableSize: number,
	root: TreeNode,
	proof: any
) {
	const branchLength = log2(getNextPowerOf2(userTableSize));
	console.log(getNextPowerOf2(userTableSize));
	console.log(userTableSize);
	console.log(branchLength);

	for (let i = 0; i < branchLength; i++) {
		if (index & (2 ** i)) {
			console.log(proof[i]);
			leaf = combineTreeNodes(proof[i], leaf);
		} else {
			console.log(proof[i]);
			leaf = combineTreeNodes(leaf, proof[i]);
		}
	}
	console.log("*******************");
	console.log(leaf);
	console.log(root);
	return leaf.balance == root.balance && leaf.hash == root.hash;
}

function createHashMap(tree: TreeNode[]): Record<string, number> {
	const requiredHashMap: Record<string, number> = {};
	for (let i = 1; i < tree.length; i++) {
		const element = tree[i];
		requiredHashMap[element.hash] = i;
	}
	return requiredHashMap;
}

function testThis() {
	console.log(`Length of user data: ${allData.length}`);
	const tree = buildMerkleSumTree(allData);

	const sum = allData.reduce((sum, val) => (sum = sum + val.balance), 0);
	console.log(`Length of tree: ${tree.length}`);
	console.log(`Sum of balances: ${sum}`);
	const root = getRoot(tree);
	console.log("Root: ", root);
	const hashMap = createHashMap(tree);

	const randomUserData: UserData = {
		uuid: "e4404355ce",
		salt: "9846e907",
		balance: 192,
	};
	const randomUserTreeNode = userDataToLeaf(randomUserData);
	const randomUserIndexInTree = hashMap[randomUserTreeNode.hash];
	const randomUserIndexInData = allData.findIndex(
		(v) => v.uuid == randomUserData.uuid
	);

	console.log(`randomUserIndexInTree: ${randomUserIndexInTree}`);
	console.log(`randomUserIndexInData: ${randomUserIndexInData}`);

	const gProof = getProof(tree, randomUserIndexInTree);
	console.log("gProof: ", gProof);

	const proofResults = verifyProof(
		randomUserTreeNode,
		randomUserIndexInData,
		allData.length,
		root,
		gProof
	);

	console.log(`Verification Proof: ${proofResults}`);
}

testThis();
