import React from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_components/_data/Lookup";

const LogoDesc = ({ onHandleInputChange, formData }) => {
  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoDescTitle}
        description={Lookup.LogoDescDesc}
      />

      <input
        defaultValue={formData?.desc}
        type="text"
        placeholder={Lookup.InputTitlePlaceholder}
        className="p-4 border rounded-lg mt-5 w-full "
        onChange={(e) => onHandleInputChange(e.target.value)}
      />
    </div>
  );
};

export default LogoDesc;
