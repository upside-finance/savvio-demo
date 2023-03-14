import { Buffer } from "buffer";

export const numOfDP = (numStr) =>
  numStr.includes(".") ? numStr.split(".")[1].length : 0;

export const truncateAddress = (address) => {
  if (!address) return;
  return `${address.slice(0, 6)}...${address.slice(-5)}`;
};

export const calcNewTickets = (
  currentTickets,
  balance,
  lastUpdateSecs,
  nowSecs,
  stakingEndSecs
) =>
  currentTickets +
  balance * (Math.min(nowSecs, stakingEndSecs) - lastUpdateSecs);

const getPureHexString = (hexStr) => hexStr.replace("0x", "");

export const convertHexStringtoString = (hexStr) =>
  Buffer.from(getPureHexString(hexStr), "hex").toString("utf8");

export const createResourceType = (accountAddr, moduleName, structName) =>
  `${accountAddr}::${moduleName}::${structName}`;
