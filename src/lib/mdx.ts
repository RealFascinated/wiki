import config from "@/config";
import * as fs from "node:fs";
import { Stats } from "node:fs";
import os from "node:os";
import path from "node:path";
import { cache } from "react";
import "server-only";
import simpleGit from "simple-git";

/**
 * The regex to match for metadata.
 */
const METADATA_REGEX: RegExp = /---\s*([\s\S]*?)\s*---/;

/**
 * Check if the DOCS_DIR is a Git URL.
 */
const isGitUrl = (url: string): boolean => {
  return /^https?:\/\/|git@|\.git$/.test(url);
};

/**
 * The directory docs are stored in.
 */
const DOCS_DIR: string = isGitUrl(config.contentSource)
  ? config.contentSource
  : path.join(config.contentSource.replace("{process}", process.cwd()));

const LAST_UPDATE_FILE = path.join(
  os.tmpdir(),
  "docs_cache",
  "last_update.json"
);
const CACHE_DURATION_MS: number = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Clone the Git repository if DOCS_DIR is a URL, else use the local directory.
 * If it's a Git URL, clone it to a cache directory and reuse it.
 */
const getDocsDirectory = cache(async (): Promise<string> => {
  if (isGitUrl(DOCS_DIR)) {
    const repoHash: string = Buffer.from(DOCS_DIR).toString("base64"); // Create a unique identifier based on the repo URL
    const cacheDir: string = path.join(os.tmpdir(), "docs_cache", repoHash);

    // Pull the latest changes from the repo if we don't have it
    if (!fs.existsSync(cacheDir) || fs.readdirSync(cacheDir).length < 1) {
      console.log("Cloning initial docs content from Git...");
      try {
        await simpleGit().clone(DOCS_DIR, cacheDir, { "--depth": 1 });
        storeUpdatedRepoTime();
      } catch (error) {
        // Simply ignore this error. When cloning the repo for
        // the first time, it'll sometimes error saying the dir
        // is already created.
      }
    } else if (shouldUpdateRepo()) {
      // Pull the latest changes from Git
      console.log("Pulling docs content from Git...");
      await simpleGit(cacheDir)
        .reset(["--hard"]) // Reset any local changes
        .pull(); // Pull latest changes
      storeUpdatedRepoTime();
    }
    return cacheDir;
  }
  return DOCS_DIR;
});

const shouldUpdateRepo = (): boolean => {
  if (!fs.existsSync(LAST_UPDATE_FILE)) {
    return true;
  }
  return (
    Date.now() -
      JSON.parse(fs.readFileSync(LAST_UPDATE_FILE, "utf-8")).lastUpdate >
    CACHE_DURATION_MS
  );
};

const storeUpdatedRepoTime = () =>
  fs.writeFileSync(
    LAST_UPDATE_FILE,
    JSON.stringify({ lastUpdate: Date.now() }),
    "utf-8"
  );

/**
 * Get the content to display in the docs.
 */
export const getDocsContent = async (): Promise<DocsContentMetadata[]> => {
  const docsDir: string = await getDocsDirectory();
  const content: DocsContentMetadata[] = [];
  for (const directory of getRecursiveDirectories(docsDir)) {
    content.push(...getMetadata<DocsContentMetadata>(docsDir, directory));
  }
  return content.sort((a: DocsContentMetadata, b: DocsContentMetadata) => {
    const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  });
};

/**
 * Get the metadata of mdx
 * files in the given directory.
 *
 * @param parent the parent directory to search
 * @param directory the directory to search
 */
const getMetadata = <T extends MDXMetadata>(
  parent: string,
  directory: string
): T[] => {
  const files: string[] = fs
    .readdirSync(directory)
    .filter((file: string): boolean => {
      const extension: string = path.extname(file); // The file extension
      return extension === ".md" || extension === ".mdx";
    }); // Read the MDX files
  const metadata: T[] = [];
  for (let i = files.length - 1; i >= 0; i--) {
    const file: string = files[i];
    const filePath: string = path.join(directory, file); // The path of the file
    const fileMetadata: T | undefined = parseMetadata<T>(
      fs.readFileSync(filePath, "utf-8")
    );
    if (!fileMetadata) {
      continue;
    }
    metadata.push({
      slug: filePath
        .replace(parent, "")
        .replace(/\\/g, "/") // Normalize the path
        .replace(/\.mdx?$/, "")
        .substring(1),
      extension: path.extname(file),
      ...fileMetadata,
    });
  }
  return metadata;
};

/**
 * Parse the metadata from
 * the given content.
 *
 * @param content the content to parse
 * @returns the metadata and content
 * @template T the type of metadata
 */
const parseMetadata = <T extends MDXMetadata>(
  content: string
): T | undefined => {
  const extracted = METADATA_REGEX.exec(content);
  const metadataBlock: string | undefined =
    extracted && extracted.length > 1 ? extracted[1] : undefined; // Get the block of metadata
  if (!metadataBlock) {
    return undefined;
  }
  content = content.replace(METADATA_REGEX, "").trim(); // Remove the metadata block from the content
  const metadata: Partial<{
    [key: string]: string;
  }> = {}; // The metadata to return

  // Parse the metadata block as a key-value pair
  metadataBlock
    .trim() // Trim any leading or trailing whitespace
    .split("\n") // Get each line
    .forEach((line: string): void => {
      const split: string[] = line.split(": "); // Split the metadata by the colon
      let value: string = split[1].trim(); // The value of the metadata
      value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
      metadata[split[0].trim()] = value; // Add the metadata to the object
    });

  // Return the metadata and content. The initial
  // slug is empty, and is defined later on.
  return { ...metadata, content } as T;
};

/**
 * Get directories recursively
 * in the given directory.
 *
 * @param directory the directory to search
 * @return the directories
 */
const getRecursiveDirectories = (directory: string): string[] => {
  const directories: string[] = [directory]; // The directories to return
  for (const sub of fs.readdirSync(directory)) {
    const subDirPath: string = path.join(directory, sub); // The sub dir path
    const stats: Stats = fs.statSync(subDirPath); // Get file stats
    if (stats.isDirectory()) {
      directories.push(...getRecursiveDirectories(subDirPath)); // Recursively get directories
    }
  }
  return directories;
};
