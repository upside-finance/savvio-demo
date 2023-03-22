import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useWindowWidth } from "@react-hook/window-size";

import { fetchWinnerHistory } from "../../api";

export default function WinnerHistory() {
  const width = useWindowWidth();
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    (async function () {
      const winnerData = (await fetchWinnerHistory()).reverse();
      setWinners(winnerData);
    })();
  }, []);

  return (
    <>
      {width >= 640 ? (
        /* Longer format for standard screens */
        <table className=" w-full hidden md:table text-gray-dark mt-12 mb-4 mx-auto text-left">
          <thead>
            <tr>
              <th className="text-green-aqua px-5 md:text-sm lg:text-lg font-medium  pr-10">
                Game ID
              </th>
              <th className="text-green-aqua px-5 md:text-sm lg:text-lg font-medium  pr-10">
                Date/Time
              </th>
              <th className="text-green-aqua px-5 md:text-sm lg:text-lg font-medium  pr-10">
                Winner
              </th>
              <th className="text-green-aqua px-5 md:text-sm lg:text-lg font-medium  pr-10">
                NFT
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
                        {winner?.game_id}
                      </div>
                    </td>
                    <td>
                      <div className="p-5 md:text-sm lg:text-lg ">
                        {<Moment unix date={winner?.["selection_sec"]} />}
                      </div>
                    </td>
                    {/* first 4 and last 4 characters of account address */}
                    <td>
                      <div className="p-5 md:text-sm lg:text-lg ">
                        {winner?.["winner"]?.substring(0, 6)}...
                        {winner?.["winner"]?.substring(
                          winner?.["winner"].length - 4
                        )}
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="p-5 md:text-sm lg:text-lg ">
                          {winner?.["token_id"]?.["token_data_id"]?.["name"]}
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
                    <div className="p-2">{winner?.game_id}</div>
                  </td>
                  <td>
                    <div className="p-2">
                      {
                        <Moment
                          unix
                          date={winner?.["selection_sec"]}
                          format="DD MMM 'YY"
                        />
                      }
                    </div>
                  </td>
                  {/* first 4 and last 4 characters of account address */}
                  <td>
                    <div className="p-2">
                      {winner?.["winner"]?.substring(0, 6)}
                    </div>
                  </td>
                  <td>
                    <div className="p-2">
                      {winner?.["token_id"]?.["token_data_id"]?.["name"]}
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
