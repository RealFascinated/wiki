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
          background: "#000000",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23090909' fill-opacity='0.95'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "40px 40px"
        }}
      >
        {/* Blue Circle Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at center, rgba(0, 50, 150, 0.24) 0%, transparent 65%)",
            pointerEvents: "none"
          }}
        />
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
