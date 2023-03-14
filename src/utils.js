/* global BigInt */
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

export const toAU = (amt, decimals) => BigInt(Math.floor(amt * 10 ** decimals));
export const toSU = (amt, decimals) => handleFormat(amt, decimals, decimals);

const handleFormat = function (amt, decimals, splitValue) {
  const lpad = function (str, padChar, nChars) {
    const padding = padChar.repeat(Math.max(nChars - str.length, 0));
    return padding + str;
  };

  const rdrop = function (str, char) {
    while (str[str.length - 1] === char) {
      str = str.slice(0, str.length - 1);
    }
    return str;
  };

  const ldrop = function (str, char) {
    while (str[0] === char) {
      str = str.slice(1);
    }
    return str;
  };

  if (splitValue === void 0) {
    splitValue = 6;
  }
  if (!(Number.isInteger(decimals) && 0 <= decimals)) {
    throw Error(
      "Expected decimals to be a nonnegative integer, but got ".concat(
        decimals,
        "."
      )
    );
  }
  if (!(Number.isInteger(splitValue) && 0 <= splitValue)) {
    throw Error(
      "Expected split value to be a nonnegative integer, but got ".concat(
        decimals,
        "."
      )
    );
  }

  var amtStr = amt.toString();
  var splitAt = Math.max(amtStr.length - splitValue, 0);
  var lPredropped = amtStr.slice(0, splitAt);
  var l = ldrop(lPredropped, "0") || "0";
  if (decimals === 0) {
    return l;
  }
  var rPre = lpad(amtStr.slice(splitAt), "0", splitValue);
  var rSliced = rPre.slice(0, decimals);
  var r = rdrop(rSliced, "0");
  return r ? "".concat(l, ".").concat(r) : l;
};
