import { MouseEvent } from "react";

import { Chip, ChipProps } from "components/Form/Chip/Chip";

export const renderChipDefault = (props: ChipProps) => {
  const { onClick, onMouseDown, ...rest } = props;

  // Create a wrapper for the onClick handler
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    // Prevent default behavior and stop propagation
    e.preventDefault();
    e.stopPropagation();

    // Call the original onClick if provided
    onClick?.(e);
  };

  // Create a wrapper for the onMouseDown handler
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    // Prevent default behavior and stop propagation
    e.preventDefault();
    e.stopPropagation();

    // Call the original onMouseDown if provided
    onMouseDown?.(e);
  };

  return (
    <Chip
      mode="mono"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      {...rest}
    />
  );
};
