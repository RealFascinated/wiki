import { Link } from "next-view-transitions";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" aria-label="Home" className="flex items-center gap-2">
      <Image
        src="/favicon.ico"
        alt="Fascinated's Wiki"
        className="rounded-md"
        width={32}
        height={32}
      />
      <h1 className="font-bold">Fascinated's Wiki</h1>
    </Link>
  );
}
