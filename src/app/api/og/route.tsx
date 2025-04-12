import config from "@/config";
import { ImageResponse } from "next/og";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const title: string | undefined = searchParams.has("title")
    ? searchParams.get("title")?.slice(0, 100)
    : "Hello World (:";

  return new ImageResponse(
    (
      <div
        tw="w-full h-full flex flex-col justify-center items-center"
        style={{
          background: "linear-gradient(to bottom right, #1a1a1a, #000000)",
        }}
      >
        {/* Content Container */}
        <div tw="flex flex-col items-center p-16">
          {/* Logo and Site Name */}
          <div tw="flex items-center mb-8">
            <img
              src={(config.metadata.openGraph?.images as any)[0].url}
              alt={`${config.siteName} Logo`}
              width={80}
              height={80}
              tw="rounded-xl shadow-lg"
            />
            <p tw="text-4xl font-bold ml-6 text-white/90">{config.siteName}</p>
          </div>

          {/* Title */}
          <h1
            tw="text-5xl font-bold text-center text-white/95 leading-tight"
            style={{
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom Gradient */}
        <div
          tw="absolute bottom-0 w-full h-32"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
};
