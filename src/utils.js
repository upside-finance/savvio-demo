export const numOfDP = (numStr) =>
  numStr.includes(".") ? numStr.split(".")[1].length : 0;
