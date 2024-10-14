import React from 'react'
import { Button } from './ui/button'
import { LoaderCircle } from 'lucide-react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    isPending: boolean;
    disabled: boolean;
}

const CustomButton = (props: Props) => {
    const { children, isPending, disabled, ...attributes } = props
    return (
        <Button disabled={disabled} type='submit' {...attributes} >
            {isPending && <LoaderCircle size={15} className="mr-2 animate-spin" />}
            {children}
        </Button>
    )
}

export default CustomButton