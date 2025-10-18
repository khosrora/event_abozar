import React from "react";

const DescriptionEditor = ({ text }: { text: string }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: text }}
      style={{ fontFamily: "Vazirmatn, sans-serif" }}
    />
  );
};

export default DescriptionEditor;
