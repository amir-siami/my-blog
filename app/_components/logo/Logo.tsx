import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="items-center gap-4 z-10 md:flex hidden">
      <Image src="/icon.png" height={60} width={60} alt="The dashboard logo" />
      <span className="text-xl font-semibold text-primary-100">
        The Blog Page
      </span>
    </Link>
  );
};

export default Logo;
