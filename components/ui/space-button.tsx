import { CalendarIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import Magnetic from "@/components/magnetic";

interface ButtonProps {
  children?: React.ReactNode;
  size?: string;
  href: string;
  classname?: string;
}

const Button = ({ children, size = "md", href, classname }: ButtonProps) => {
  return (
    <Magnetic>
      <Link
        href={href}
        className={`group relative text-purple-300 bg-purple-300/15 duration-200 hover:scale-95 z-10 ease-out
      ${
        size == "sm"
          ? "px-6 py-2 text-sm"
          : size == "md"
          ? "px-8 py-2 text-md"
          : "px-10 py-2 text-lg"
      }
      ${classname}
    `}
      >
        {/* Self closing divs for the corners implemented with translation animation */}
        <div className="absolute w-3 h-3 border-t border-l top-0 left-0 border-purple-300 group-hover:-translate-x-2 group-hover:-translate-y-1 transition" />
        <div className="absolute w-3 h-3 border-t border-r top-0 right-0 border-purple-300 group-hover:translate-x-2 group-hover:-translate-y-1 transition" />
        <div className="absolute w-3 h-3 border-b border-l bottom-0 left-0 border-purple-300 group-hover:-translate-x-2 group-hover:translate-y-1 transition" />
        <div className="absolute w-3 h-3 border-b border-r bottom-0 right-0 border-purple-300 group-hover:translate-x-2 group-hover:translate-y-1 transition" />

        <CalendarIcon className="scale-125 absolute rotate-45 right-0 opacity-0 group-hover:translate-x-10 group-hover:-translate-y-1 group-hover:opacity-100 group-hover:rotate-[60deg] transition duration-500" />

        {children}
      </Link>
    </Magnetic>
  );
};

export default Button;
