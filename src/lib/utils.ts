import { docsParams } from "@/app/(api)/api/og/utils";
import { Metadata } from "next";

interface Meta {
  title: string;
  category: string;
  description: string;
  date: string;
}

export const docsMetadata = (meta: Meta): Metadata => {
  const ogImage =
    "/api/og?" +
    docsParams.toSearchString({
      title: meta.title,
      category: meta.category,
      description: meta.description,
    });

  return {
    ...meta,
    openGraph: {
      images: [{ url: ogImage, width: 1200, height: 600 }],
    },
    twitter: {
      card: "summary_large_image",
      images: [{ url: ogImage, width: 1200, height: 600 }],
    },
  };
};

export function formatDate(dateString: string) {
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
