import config from "@/config";
import { ImageResponse } from "next/og";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const title: string | undefined = searchParams.has("title")
    ? searchParams.get("title")?.slice(0, 100)
    : "Hello World (:";

  return new ImageResponse(
    (
      <div tw="w-full h-full flex flex-col justify-center items-center bg-black/95 text-white">
        {/* Logo */}
        <img
          src={(config.metadata.openGraph?.images as any)[0].url}
          alt={`${config.siteName} Logo`}
          width={96}
          height={96}
        />

        {/* Title */}
        <h1 tw="text-5xl font-bold">{title}</h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
};
