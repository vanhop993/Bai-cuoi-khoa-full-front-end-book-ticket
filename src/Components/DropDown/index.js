import React from "react";

export default function DropDown({ title, name, content, handleChange }) {
  return (
    <div className="form-group m-0 mr-2" style={{ width: "20%" }}>
      <select
        name={name}
        id=""
        className="form-control"
        onChange={(e) => handleChange(e)}
      >
        <option value="">{title}</option>
        {content}
      </select>
    </div>
  );
}
