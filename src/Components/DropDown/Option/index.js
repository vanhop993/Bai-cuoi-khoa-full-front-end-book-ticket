import React from 'react'

export default function OptionSelect({content,value}) {
    return (
        <option value={value}>
            {content}
        </option>
    )
}
