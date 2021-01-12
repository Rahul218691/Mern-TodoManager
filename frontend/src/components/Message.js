import React from 'react'

const Message = ({children,type}) =>{
    return (
        <div className={`alert alert-${type}`} role="alert">
            {children}
        </div>
    )
}

export default Message
