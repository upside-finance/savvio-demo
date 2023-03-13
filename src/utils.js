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
