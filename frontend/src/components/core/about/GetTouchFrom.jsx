import React, { useState } from "react";
import { countryCode } from "../../../data/countrycode";

const GetTouchFrom = ({ heading, description }) => {
  const [message, setMessage] = useState({
    firstName: "",
    LastName: "",
    email: "",
    phone: "",
    countryCode: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-3xl font-bold font-inter">{heading}</h2>

        <p className="text-[16px] text-richblack-300 font-inter">
          {description}
        </p>
      </div>

      <div>
        <form className="flex flex-col gap-4">
          <div className="flex gap-2 justify-between">

            <div className="flex flex-col gap-2 w-[50%]">
              <label className="block mb-2 text-sm font-medium text-white font-inter" htmlFor="firstName">First Name </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter Your First Name"
                className="flex-1 bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-600 focus:outline-none w-full"
                value={message.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col gap-2 w-[50%]">
              <label className="block mb-2 text-sm font-medium text-white" htmlFor="LastName">Last Name </label>
              <input
                type="text"
                id="LastName"
                name="LastName"
                className="flex-1 bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-600 focus:outline-none w-full"
                placeholder="Enter Your Last Name"
                value={message.LastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="block mb-2 text-sm font-medium text-white" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              value={message.email}
              className="flex-1 bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-600 focus:outline-none w-full"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-white"
            >
              Phone Number
            </label>

            <div className="flex gap-2">
              {/* Country Code Dropdown */}
              <select
                name="countryCode"
                value={message.countryCode}
                onChange={handleChange}
                className="bg-slate-800 w-[20%] text-white px-3 py-2 rounded-md border border-slate-600 focus:outline-none"
              >
                {countryCode.map((code, index) => (
                  <option className="flex gap-2 capitalize" key={index} value={code.code}>
                    <p className="text-[16px] font-inter">{code.code}</p>
                    <p className="text-[16px] font-inter">{code.country}</p>
                  </option>
                ))}
              </select>

              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Your Phone Number"
                value={message.phone}
                onChange={handleChange}
                required
                className="flex-1 bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-white">Message</label>
            <textarea
              type="text"
              id="message"
              className="flex-1 bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-600 focus:outline-none w-full"
              name="message"
              rows={4}
              placeholder="Your Message"
              value={message.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="px-2 bg-amber-400 py-2 mt-4 rounded-xl text-richblack-5 text-[16px] font-inter">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default GetTouchFrom;
