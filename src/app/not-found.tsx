import Image from "next/image";
import { ReactElement } from "react";

/**
 * The not found page.
 *
 * @return the page jsx
 */
const NotFoundPage = (): ReactElement => (
  <main className="w-full pt-[25vh] min-h-screen flex justify-center select-none pointer-events-none">
    <div className="h-fit flex gap-5 sm:gap-10 items-center transition-all transform-gpu">
      {/* Image */}
      <div className="relative w-24 h-24 xs:w-20 xs:h-20 sm:w-44 sm:h-44">
        <Image
          src="/media/mike.png"
          alt="Mike Wazowski"
          fill
          draggable={false}
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-3xl font-bold">Wrong Door!</h1>
        <p className="max-w-72 sm:text-lg opacity-75">
          The documentation page you were looking for could not be found.
        </p>
      </div>
    </div>
  </main>
);
export default NotFoundPage;
