import React from 'react'

interface ErrorMassageProps {
    error: string
}

export function ErrorMassage({error}: ErrorMassageProps){
    return(
        <p className='error'>{ error }</p>
    )
}