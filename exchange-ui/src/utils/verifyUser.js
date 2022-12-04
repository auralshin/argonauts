import crypto from "crypto-browserify";
import { soliditySha3 } from "web3-utils";

export default function verifyUser(
  tree,
  hashMap,
  userData,
  selectedUserIndexInData,
  salt
) {
  const saltInDB = soliditySha3({
    type: "string",
    value: salt,
  });

  console.log({ tree });
  console.log({ hashMap });
  console.log({ userData });
  console.log({ selectedUserIndexInData });
  console.log({ salt });

  const selectedUserData = userData[selectedUserIndexInData];
  console.log({ selectedUserData });
  const selectedUserTreeNode = userDataToLeaf(selectedUserData, saltInDB);
  console.log({ hash: selectedUserTreeNode.hash });

  console.log({ hashMapVal: hashMap });

  const suit = hashMap.findIndex((v) => v.hash === selectedUserTreeNode.hash);

  const selectedUserIndexInTree = hashMap[suit].index;

  console.log({ selectedUserIndexInTree });

  if (!selectedUserIndexInTree || selectedUserData === undefined) {
    return { proofResults: false, sisterNodes: [] };
  }

  console.log(`selectedUserIndexInTree: ${selectedUserIndexInTree}`);
  console.log(`selectedUserIndexInData: ${selectedUserIndexInData}`);

  const gProof = getProof(tree, selectedUserIndexInTree);
  console.log("gProof: ", gProof);

  const proofResults = verifyProof(
    selectedUserTreeNode,
    selectedUserIndexInData,
    10,
    tree[1],
    gProof
  );

  console.log(`Verification Proof: ${proofResults}`);
  return { proofResults, sisterNodes: gProof };
}

function log2(n) {
  return Math.log2(n);
}

function getNextPowerOf2(x) {
  if (x > 1) {
    return 2 * getNextPowerOf2(Math.floor((x + 1) / 2));
  } else {
    return 1;
  }
}

function hashed(x) {
  return crypto.createHash("sha256").update(x).digest("base64");
}

export function userDataToLeaf(user, saltInDB) {
  console.log({ hash: hashed(saltInDB + user.uuid) });
  return { hash: hashed(saltInDB + user.uuid), balance: user.balance };
}

function combineTreeNodes(l, r) {
  console.log({ l });
  console.log({ r });
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

function getProof(tree, indexInTree) {
  const branchLength = log2(tree.length) - 1;
  // const indexInTree = Math.floor((index + tree.length) / 2);
  // index_in_tree = index + len(tree); // 2

  const proof = [];
  for (let i = 0; i < branchLength; i++) {
    const node = tree[Math.floor(indexInTree / 2 ** i) ^ 1];
    // return [tree[(index_in_tree // 2**i) ^ 1] for i in range(branch_length)]

    proof.push(node);
  }
  return proof;
}

function verifyProof(leaf, index, userTableSize, root, proof) {
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
  return leaf.balance === root.balance && leaf.hash === root.hash;
}
