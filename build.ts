import { copyFile, mkdir, cp } from "fs/promises";
import { join } from "path";

const outDir = join(import.meta.dir, "dist");
await mkdir(outDir, {
  recursive: true,
});

await copyFile(
  join(import.meta.dir, "default.htm"),
  join(outDir, "default.htm")
);

// Copy the contents of the img and js folders to the outDir.
await Promise.all(["img", "js", "css"].map(async (dir) => {
  await cp(join(import.meta.dir, dir), join(outDir, dir), {
    recursive: true,
  });
}));

Bun.build({
  entrypoints: ["src/default.ts"],
  target: "browser",
  outdir: outDir,
});
