import React from "react";
import { FooterLinks, FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

export const Footer = () => {
  // FooterLink2.map((data) => console.log(data));

  return (
    <div className="bg-richblack-800 pt-20">
      <div className="w-9/12 mx-auto flex-col flex gap-8 pb-8">
        <div className="flex justify-between">
          <div>
            {FooterLinks.map((footerOne, index) => (
              <div key={index} className=" flex gap-20">
                <div className="flex flex-col gap-4">
                  <div className="text-2xl font-bold font-inter">
                    {footerOne.name}
                  </div>

                  <div className="flex flex-col gap-2">
                    <h1 className="text-[14px] font-semibold font-inter">
                      Company
                    </h1>
                    {footerOne.sections.Company.map((company, index) => (
                      <div
                        className="text-[16px] font-normal text-richblack-300"
                        key={index}
                      >
                        <Link to={company.url}>{company.name}</Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-[14px] font-semibold font-inter">
                      Resources
                    </h2>
                    {footerOne.sections.Resources.map((resource, index) => (
                      <div
                        className="text-[16px] font-normal text-richblack-300"
                        key={index}
                      >
                        <Link to={resource.url}>{resource.name}</Link>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-[14px] font-semibold font-inter">
                      Supports
                    </p>
                    {footerOne.sections.Support.map((Support, index) => (
                      <div
                        className="text-[16px] font-normal text-richblack-300"
                        key={index}
                      >
                        <Link to={Support.url}>{Support.name}</Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <p className="text-[14px] font-semibold font-inter">Plan</p>
                    {footerOne.sections.Plans.map((plan, index) => (
                      <div
                        className="text-[16px] font-normal text-richblack-300"
                        key={index}
                      >
                        <Link to={plan.url}>{plan.name}</Link>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-[14px] font-semibold font-inter">
                      Community
                    </p>
                    {footerOne.sections.Community.map((community, index) => (
                      <div
                        className="text-[16px] font-normal text-richblack-300"
                        key={index}
                      >
                        <Link to={community.url}>{community.name}</Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-l-1 border-richblack-300 pl-10">
            {FooterLink2.map((footerTwo, index) => (
              <div className="flex gap-20" key={index}>
                <div className="flex flex-col gap-2">
                  <p className="text-[14px] font-semibold font-inter">
                    Subjects
                  </p>
                  {footerTwo.sections.Subject.map((subject, index) => (
                    <div
                      className="text-[16px] font-normal text-richblack-300"
                      key={index}
                    >
                      <Link to={subject.link}>{subject.title}</Link>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-[14px] font-semibold font-inter">
                    Languages
                  </p>
                  {footerTwo.sections.Languages.map((language, index) => (
                    <div
                      className="text-[16px] font-normal text-richblack-300"
                      key={index}
                    >
                      <Link to="/">{language.title}</Link>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-[14px] font-semibold font-inter">
                    Career building
                  </p>
                  {footerTwo.sections.CareerBuilding.map((career, index) => (
                    <div
                      className="text-[16px] font-normal text-richblack-300"
                      key={index}
                    >
                      <Link to="/">{career.title}</Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t-1 border-richblack-300 mt-4 pt-4 flex justify-between">
          <div className="flex gap-4">
            <p className="text-[14px] text-richblack-300">Privacy Policy</p>
            <p className="text-[14px] text-richblack-300">Cookie Policy</p>
            <p className="text-[14px] text-richblack-300">Terms</p>
          </div>

          <div className="text-[14px] text-richblack-300">
             Made with ❤️ KhalidAlam © 2025 Edtech
          </div>
        </div>
      </div>
    </div>
  );
};
