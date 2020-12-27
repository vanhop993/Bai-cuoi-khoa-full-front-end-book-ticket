import React, { useState } from 'react'

export default function FromSearch({placeholder, handleSubmit}) {
    const [errorSearch, setErrorSearch] = useState("");
    return (
        <div className='mb-3 w-100'>
            <form className='d-flex' onSubmit={(e) => {e.preventDefault()}}>
                <div className="form-group mb-0 w-100">
                    <input type="text" className='form-control' placeholder={placeholder} onChange={(e)=> handleSubmit(e)}/>
                </div>
            </form>
            <div className="text-danger">{errorSearch}</div>
        </div>
    )
}