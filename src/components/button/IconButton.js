import React from 'react'

export default function IconButton(props) {
    return (
        <button
            {...props}
            className="middle size-6 text-2xl none center flex items-center justify-center rounded-lg font-bold uppercase text-black disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >{props.children}
        </button>
    )
}
