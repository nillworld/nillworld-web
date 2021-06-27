import * as CryptoJS from "crypto-js";

class Block {
  static calculateBlockHash = (index: number, previousHash: string, data: string, timestamp: number): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";

  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(0, "00003749378097", "", "Hello", 123456);

let blockChain: Block[] = [genesisBlock];

const getBlockChain = (): Block[] => blockChain;

const getLatestBlock = (): Block => blockChain[blockChain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimeStamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, data, newTimeStamp);
  const newBlock: Block = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
  addBlock(newBlock);
  return newBlock;
};

const getHashforBlock = (aBlock: Block): string => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.data, aBlock.timestamp);

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockChain.push(candidateBlock);
  }
};

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockChain);

export {};

// 이건 block chain의 일부분.

// TS는 예측가능한 함수인자, 함수 리턴 타입, static 등의 기능이 있어 개발할 때 편함
// let blockChain: Block[] = [genesisBlock]; 처럼 배열같은 걸로 block이 아닌 것을 push 못하게 할 수 있음
// 읽기 편하고 혼란스럽지 않기에 TS 씀.
// React, Redux, Graph QL, node js(express)로 일 할 때 TS로 작업하면 편함.
