/* eslint-disable react/prop-types */

import axios from "axios";
// import axios from "axios";
import { useState } from "react";
import { PowerIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
} from "@material-tailwind/react";

const DeviceCard = ({ data }) => {
    const [isToggled, setIsToggled] = useState(data.value_string === 'ON');
  
    const handleToggleChange = async () => {
      setIsToggled(!isToggled);
      try {
        const response = await axios.put(`https://blue-violet-bighorn-sheep-boot.cyclic.app/device/${data.id}`, {
          value: !isToggled ? 'ON' : 'OFF',
        });
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response);
        }
      }
    };
  
    return (
      <div className="dark:bg-gray-800 rounded px-8 py-6 flex items-center m-2">
        <div>
          <Card className="w-full max-w-[26rem] shadow-lg pb-4">
            <CardHeader floated={false} color="blue-gray">
              {/* ... (other card content) */}
              <PowerIcon
                className={`bg-gray-100 border-2 rounded-full ${
                  isToggled
                    ? '!absolute top-4 left-4 h-10 w-10 text-purple-400 p-2'
                    : '!absolute top-4 left-4 h-10 w-10 text-yellow-900 p-2 border-purple-black '
                }`}
              />
              <div className="inline-flex items-center !absolute top-4 right-4">
                <div className="relative inline-block h-4 w-8 cursor-pointer rounded-full">
                  <input
                    id={data.id}
                    type="checkbox"
                    className="peer absolute h-4 w-8 cursor-pointer appearance-none rounded-full bg-blue-gray-100 transition-colors duration-300 checked:bg-pink-500 peer-checked:border-pink-500 peer-checked:before:bg-pink-500"
                    onChange={handleToggleChange}
                    checked={isToggled}
                  />
                  <label
                    htmlFor={data.id}
                    className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-pink-500 peer-checked:before:bg-pink-500"
                  >
                    <div
                      className="top-2/4 left-2/4 inline-block -translate-x-2/4 -translate-y-2/4 rounded-full p-5"
                      data-ripple-dark="true"
                    ></div>
                  </label>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  };
  
export default DeviceCard