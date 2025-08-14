import { Link } from "react-router-dom";

type BottomNavbarIconProps = {
  Icon: React.ElementType;
  to?: string;
  onClick?: () => void;
};

export default function BottomNavbarIcon({
  Icon,
  to,
  onClick,
}: BottomNavbarIconProps) {
  return (
    <Link
      to={to || "/"}
      className={`rounded-full cursor-pointer p-[12px]`}
      onClick={onClick}
    >
      <Icon size={20} />
    </Link>
  );
}
