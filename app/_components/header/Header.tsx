import Logo from "@/app/_components/logo/Logo";
import Navigation from "@/app/_components/navigation/Navigation";

const Header: React.FC = () => {
  return (
    <header className="border-b px-8 py-5">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
