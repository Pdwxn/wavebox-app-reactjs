import Search from "./Search";
import Logo from "./Logo";

interface Props {
  children: any;
}

const Navbar = ({ children }: Props) => {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
};

export default Navbar;
