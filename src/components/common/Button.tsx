import { cn } from "@/lib/utils";
import type React from "react";
import { IButton } from "@/types/types";
import { Loader } from "lucide-react";

const Button: React.FC<IButton> = ({
  type = "button",
  className = "",
  children,
  loader,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "bg-primary cursor-pointer flex justify-center items-center text-center text-base sm:text-lg font-semibold px-8 disabled:bg-border disabled:text-placeholder disabled:cursor-not-allowed text-white w-full rounded-[12px] min-h-[50px] md:min-h-[60px]",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {loader ? <Loader className="size-4 animate-spin" /> : <>{children}</>}
    </button>
  );
};

export default Button;
