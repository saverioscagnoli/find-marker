import { existsSync } from "fs";
import { dirname, join } from "path";

interface FindMarkerOptions {
  /**
   * Whether to search recursively for the marker file.
   * @default false
   */
  recursive?: boolean;

  /**
   * The name of the marker file.
   * @default ".marker"
   */
  file?: string;
}

type FindMarkerSubOptions = Omit<FindMarkerOptions, "recursive">;

function findMarkerNormal(opts: FindMarkerSubOptions): string | null {
  let dir = __dirname;
  let marker = join(dir, opts.file!);

  while (!existsSync(marker)) {
    let parent = dirname(dir);

    if (parent === dir) return null;

    dir = parent;
    marker = join(dir, opts.file!);
  }

  return dir;
}

function findMarkerRecursive(
  opts: FindMarkerSubOptions,
  dir?: string
): string | null {
  dir = dir ?? __dirname;
  let parent = dirname(dir);

  if (parent === dir) return null;

  let marker = join(dir, opts.file!);
  if (existsSync(marker)) return dir;

  return findMarkerRecursive(opts, parent);
}

/**
 * Finds the folder containing the marker file in the current working tree.
 * @param opts The options for finding the marker file.
 * @returns The folder path containing the marker file, or null if it could not be found.
 */
function findMarker(opts: FindMarkerOptions = {}): string | null {
  opts.file = opts.file ?? ".marker";
  opts.recursive = opts.recursive ?? false;

  if (opts.recursive) return findMarkerRecursive(opts);
  else return findMarkerNormal(opts);
}

export { findMarker, type FindMarkerOptions };
