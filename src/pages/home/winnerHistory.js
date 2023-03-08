import moment from "moment/moment";
import React, { useState } from "react";
import Moment from "react-moment";
import { useWindowWidth } from "@react-hook/window-size";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

import winners from "../../assets/transactions.json";

export default function WinnerHistory() {
  const width = useWindowWidth();

  const [listLength, setListLength] = useState(4);
  const [listHeight, setListHeight] = useState("1rem");

  return (
    <>
      {width >= 640 ? (
        /* Longer format for standard screens */
        <table className=" w-full hidden md:table text-gray-dark mt-12 mb-4 mx-auto text-left">
          <thead>
            <tr>
              <th className="text-green-aqua px-5 md:text-sm lg:text-lg font-medium  pr-10">
                Transaction ID
              </th>
              <th className="text-green-aqua px-5 md:text-sm lg:text-lg font-medium  pr-10">
                Date/Time
              </th>
              <th className="text-green-aqua px-5 md:text-sm lg:text-lg font-medium  pr-10">
                Winner
              </th>
              <th className="text-green-aqua px-5 md:text-sm lg:text-lg font-medium  pr-10">
                Prize ID
              </th>
            </tr>
          </thead>

          <tbody>
            {
              //winners.slice(0, listLength).map((winner) =>
              winners.map((winner) => (
                <>
                  <div className="md:h-1 lg:h-1" />
                  <tr className="border-dashed border-b-2">
                    {/* first 4 and last 4 characters of TxID */}
                    <td>
                      <div className="p-5 md:text-sm lg:text-lg ">
                        {winner.transaction_id.substring(0, 4)}...
                        {winner.transaction_id.substring(
                          winner.transaction_id.length - 4
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="p-5 md:text-sm lg:text-lg ">
                        {<Moment unix date={winner.timestamp} />}
                      </div>
                    </td>
                    {/* first 4 and last 4 characters of account address */}
                    <td>
                      <div className="p-5 md:text-sm lg:text-lg ">
                        {winner.account.substring(0, 4)}...
                        {winner.account.substring(winner.account.length - 4)}
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="p-5 md:text-sm lg:text-lg ">
                          {winner.prize_id}
                        </div>
                      </div>
                    </td>
                  </tr>
                </>
              ))
            }
          </tbody>
        </table>
      ) : (
        /* Shorter format for smaller screens */

        <table className="w-full md:hidden text-gray-dark mt-8 mb-4 text-left text-sm">
          <thead>
            <tr>
              <th className=" font-md text-green-aqua">Tx ID</th>
              <th className="font-md text-green-aqua">Date</th>
              <th className="font-md text-green-aqua">Winner</th>
              <th className="font-md text-green-aqua">Prizes</th>
            </tr>
          </thead>
          <tbody>
            <div className="h-3" />
            {winners.map((winner) => (
              <>
                <tr>
                  {/* first 4 and last 4 characters of TxID */}
                  <td>
                    <div className="p-2">
                      {winner.transaction_id.substring(0, 4)}...
                    </div>
                  </td>
                  <td>
                    <div className="p-2">
                      {
                        <Moment
                          unix
                          date={winner.timestamp}
                          format="DD MMM 'YY"
                        />
                      }
                    </div>
                  </td>
                  {/* first 4 and last 4 characters of account address */}
                  <td>
                    <div className="p-2">
                      {winner.account.substring(0, 4)}...
                    </div>
                  </td>
                  <td>
                    <div className="p-2">
                      {winner.prize_id.substring(0, 4)}...
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      )}
      <button
        onClick={() => setListLength(listLength <= 4 ? winners.length - 1 : 4)}
        className="flex justify-between items-center mx-auto mt-8 button-aqua py-1 px-2"
      >
        View All{" "}
        {listLength <= 4 ? (
          <IoChevronDown className="ml-4" />
        ) : (
          <IoChevronUp className="ml-4" />
        )}
      </button>
    </>
  );
}
