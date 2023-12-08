import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="hidden md:flex hover:opacity-70 transition items-center gap-x-2">
        <Image src="/logo.svg" alt="logo" width={30} height={30} />
        <p className="text-lg text-neutral-700 pb-1">Taskify</p>
      </div>
    </Link>
  );
};
export default Logo;
