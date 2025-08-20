import { Link, useLocation } from "react-router-dom";

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
  const location = useLocation();

  return (
    <Link
      to={to || location.pathname}
      className={`rounded-full cursor-pointer p-[12px]`}
      onClick={onClick}
    >
      <Icon size={20} />
    </Link>
  );
}
