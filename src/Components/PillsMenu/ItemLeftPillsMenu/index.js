import React from "react";

export default function ItemLeftPillsMenu({ active, idItem, content }) {
  return (
    <a
      className={`nav-link w-100 menu-content-item gach-duoi-item ${active}`}
      id={`${idItem}-tab`}
      data-toggle="pill"
      href={`#${idItem}-menu`}
      role="tab"
      aria-controls={`${idItem}`}
      aria-selected="true"
    >
      <div className="d-flex align-items-center">{content}</div>
    </a>
  );
}
