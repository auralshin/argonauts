import crypto from "crypto";
import userDataWithSalt from "./userDataWithSalt.json";
import { IndexHashMap, TreeNode, UserData } from "./allInterfaces";

export default function userDataVerification(
	tree: TreeNode[],
	hashMap: IndexHashMap[],
	userData: UserData[],
	selectedUserIndexInData: number
) {
	const selectedUserData = userData[selectedUserIndexInData];
	const selectedUserTreeNode = userDataToLeaf(selectedUserData);
	const selectedUserIndexInTree = hashMap[selectedUserTreeNode.hash];

	console.log(`selectedUserIndexInTree: ${selectedUserIndexInTree}`);
	console.log(`selectedUserIndexInData: ${selectedUserIndexInData}`);

	const gProof = getProof(tree, selectedUserIndexInTree);
	console.log("gProof: ", gProof);

	const proofResults = verifyProof(
		selectedUserIndexInTree,
		selectedUserIndexInData,
		userData.length,
		tree[1],
		gProof
	);

	console.log(`Verification Proof: ${proofResults}`);
	return proofResults;
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

function hashed(x: any) {
	return crypto.createHash("sha256").update(x).digest("base64");
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
