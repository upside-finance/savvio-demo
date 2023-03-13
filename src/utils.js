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
