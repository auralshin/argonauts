export interface UserData {
  uuid: string;
  salt: string;
  balance: number;
}

export interface TreeNode {
  hash: string;
  balance: number;
}

export interface SaltHashMapping {
  hash: string;
  salt: string;
}

export interface IndexHashMap {
  hash: string;
  index: number;
}
