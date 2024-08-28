import React from 'react'

interface Props {
    message: string;
}

function ErrorMessage({message}: Props) {
  return (
    <p className='error'>
        {message}
    </p>
  )
}

export default ErrorMessage