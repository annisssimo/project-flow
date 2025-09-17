import { ReactNode } from "react";

interface MotionDivProps {
  children: ReactNode;
  initial?: any;
  animate?: any;
  transition?: any;
  className?: string;
  variants?: any;
}

export function motionDiv({ children, className, ...props }: MotionDivProps) {
  return <div className={className}>{children}</div>;
}

export const motion = {
  div: motionDiv,
};
