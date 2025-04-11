/**
 * Metadata for documentation content.
 */
type DocsContentMetadata = MDXMetadata & {
  /**
   * The title of this content.
   */
  title: string;

  /**
   * The date this content was updated.
   */
  updated: string;

  /**
   * The summary of this content.
   */
  summary: string;

  /**
   * The order of this content.
   */
  order: number;
};

/**
 * Metadata for an MDX file.
 */
type MDXMetadata = {
  /**
   * The slug of the file, defined once read.
   */
  slug?: string | undefined;

  /**
   * The extension of the file, defined once read.
   */
  extension?: string | undefined;

  /**
   * The metadata of the file.
   */
  metadata: {
    [key: string]: string;
  };

  /**
   * The content of the file.
   */
  content: string;
};
