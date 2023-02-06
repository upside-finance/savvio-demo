import moment from "moment/moment";
import React from "react";
import Moment from "react-moment";

import winners from "../assets/transactions.json";

export default function winnerHistory() {
  return (
    <>
      {/* Longer format for standard screens */}
      <table className=" w-full hidden md:table text-white mt-12 mb-4 mx-auto text-left">
        <thead>
          <tr>
            <th className="text-gray-900 px-5 md:text-sm lg:text-lg font-normal text-lemon-light pr-10">
              Transaction ID
            </th>
            <th className="text-gray-900 px-5 md:text-sm lg:text-lg font-normal text-lemon-light pr-10">
              Date/Time
            </th>
            <th className="text-gray-900 px-5 md:text-sm lg:text-lg font-normal text-lemon-light pr-10">
              Winner
            </th>
            <th className="text-gray-900 px-5 md:text-sm lg:text-lg font-normal text-lemon-light pr-10">
              Prize ID
            </th>
          </tr>
        </thead>
        <tbody>
          {winners.map((winner) => (
            <>
              <div className="md:h-1 lg:h-1" />
              <tr>
                {/* first 4 and last 4 characters of TxID */}

                <td>
                  <div className="bg-gradient-to-b from-[#16162F] to-[#0e0e1a]">
                    <div className="p-5 md:text-sm lg:text-lg ">
                      {winner.transaction_id.substring(0, 4)}...
                      {winner.transaction_id.substring(
                        winner.transaction_id.length - 4
                      )}
                    </div>
                  </div>
                </td>

                <td>
                  <div className="bg-gradient-to-b from-[#16162F] to-[#0e0e1a]">
                    <div className="p-5 md:text-sm lg:text-lg ">
                      {<Moment unix date={winner.timestamp} />}
                    </div>
                  </div>
                </td>
                {/* first 4 and last 4 characters of account address */}
                <td>
                  <div className="bg-gradient-to-b from-[#16162F] to-[#0e0e1a]">
                    <div className="p-5 md:text-sm lg:text-lg ">
                      {winner.account.substring(0, 4)}...
                      {winner.account.substring(winner.account.length - 4)}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="bg-gradient-to-b from-[#16162F] to-[#0e0e1a]">
                    <div className="p-5 md:text-sm lg:text-lg ">
                      {winner.prize_id}
                    </div>
                  </div>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>

      {/* Shorter format for smaller screens */}
      <table className="w-full md:hidden text-white mt-8 mb-4 text-left text-sm">
        <thead>
          <tr>
            <th className="font-md text-violet-light">Tx ID</th>
            <th className="font-md text-violet-light">Date</th>
            <th className="font-md text-violet-light">Winner</th>
            <th className="font-md text-violet-light">Prizes</th>
          </tr>
        </thead>
        <tbody>
          <div className="h-3" />
          {winners.map((winner) => (
            <>
              <tr>
                {/* first 4 and last 4 characters of TxID */}
                <td>
                  <div className="bg-gradient-to-b from-[#16162F] to-[#0e0e1a]">
                    <div className="p-2">
                      {winner.transaction_id.substring(0, 4)}...
                    </div>
                  </div>
                </td>
                <td>
                  <div className="bg-gradient-to-b from-[#16162F] to-[#0e0e1a]">
                    <div className="p-2">
                      {
                        <Moment
                          unix
                          date={winner.timestamp}
                          format="DD MMM 'YY"
                        />
                      }
                    </div>
                  </div>
                </td>
                {/* first 4 and last 4 characters of account address */}
                <td>
                  <div className="bg-gradient-to-b from-[#16162F] to-[#0e0e1a] ">
                    <div className="p-2">
                      {winner.account.substring(0, 4)}...
                    </div>
                  </div>
                </td>
                <td>
                  <div className="bg-gradient-to-b from-[#16162F] to-[#0e0e1a]">
                    <div className="p-2">
                      {winner.prize_id.substring(0, 4)}...
                    </div>
                  </div>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}
