import React from 'react'

export default function ContentItem({idContent , content, active}) {
    return (
        <div
            className={`contentTabItem tab-pane fade show ${active}`}
            id={`${idContent}`}
            role="tabpanel"
            aria-labelledby={`${idContent}-tab`}
          >
             {content}
        </div>
    )
}
