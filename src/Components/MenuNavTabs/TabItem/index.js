import React from 'react'

export default function TabItem({idContent, tab , active}) {
    return (
        <li className="nav-item danhSachPhimTagLi">
        <a
          className={`danhSachPhimTagA ${active}`}
          id={`${idContent}-tab`}
          data-toggle="tab"
          href={`#${idContent}`}
          role="tab"
          aria-controls={`${idContent}`}
          aria-selected="true"
        >
          {tab}
          </a>
      </li>
    )
}
