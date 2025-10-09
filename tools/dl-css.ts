import { file } from "bun";
import { JSDOM } from "jsdom";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

const wsdotUrl = "https://wsdot.wa.gov/";

interface WriteResult {
  outFilePath: string;
  byteCount: number;
}

/**
 * Downloads an HTML page from a given URL and writes it to a file.
 * The file path is determined by the URL's pathname.
 * If the directory does not already exist, it will be created.
 * @param url - The URL of the HTML page to download.
 * @returns - A promise that resolves with an object containing the file path and the number of bytes written.
 */
async function writeCssToFile(url: URL): Promise<WriteResult> {
  url.search = "";
  const rel = url.pathname;
  const outFilePath = join("css", rel);
  const outFile = file(outFilePath);

  if (await outFile.exists()) {
    console.warn(`File already exists: ${outFilePath}`);
    return {
      outFilePath,
      byteCount: 0,
    };
  }

  console.log(`Downloading ${url}`);
  const res = await fetch(url);

  console.log(`Writing ${outFilePath}`);
  const htmlString = await res.text();
  // Create the directory if it does not already exist.
  const outDirPath = dirname(outFilePath);

  /**
   * This will be the directory path if it did not already exit,
   * or undefined if it did not.
   */
  const mkDirResult = await mkdir(outDirPath, { recursive: true });

  if (mkDirResult) {
    console.log(`Created directory ${outDirPath}`);
  }
  const byteCount = await outFile.write(htmlString);
  return {
    outFilePath,
    byteCount,
  };
}

/**
 * Downloads all WSDOT-hosted CSS stylesheets linked from an HTML page and
 * writes them to files on disk. The file paths are determined by the
 * stylesheet URLs' pathnames.
 * If the directory does not already exist, it will be created.
 * @param htmlPath - The path to the HTML file.
 * @returns - A promise that resolves with an array of objects containing the file paths and the number of bytes written for each CSS file.
 */
async function dumpCss(htmlPath: string): Promise<WriteResult[]> {
  const dom = new JSDOM(await file(htmlPath).arrayBuffer(), {
    contentType: "text/html",
    url: wsdotUrl,
  });

  /**
   * links to WSDOT-hosted stylesheets.
   */
  const cssLinks = dom.window.document.querySelectorAll<HTMLLinkElement>(
    `link[rel=stylesheet][href^='${wsdotUrl}']`
  );

  const promises: ReturnType<typeof writeCssToFile>[] = [];

  for (const cssLink of cssLinks) {
    const url = new URL(cssLink.href);
    const cssPromise = writeCssToFile(url);
    promises.push(cssPromise);
  }

  return await Promise.all(promises);
}

await Promise.all(
  ["default.htm", "default-safety.htm"].map((html) => dumpCss(html))
);
