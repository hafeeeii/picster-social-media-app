import React from 'react'
import {
    Tooltip as PrimeTooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

type Props = {
    children: React.ReactNode;
    content: string;
}

const Tooltip = (props: Props) => {
    const { children, content } = props
    return (
        <TooltipProvider>
  <PrimeTooltip>
    <TooltipTrigger>{children}</TooltipTrigger>
    <TooltipContent>
      <p>{content}</p>
    </TooltipContent>
  </PrimeTooltip>
</TooltipProvider>
    )
}

export default Tooltip