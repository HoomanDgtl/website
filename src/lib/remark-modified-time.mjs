import { execSync } from "child_process";

/**
 * Remark plugin that adds lastModified timestamp to frontmatter
 * Uses Git commit date (committer date in ISO 8601 format)
 */
export function remarkModifiedTime() {
  return function (tree, file) {
    try {
      const filepath = file.history[0];
      if (!filepath) {
        return;
      }

      // Get the last commit date for this file in ISO 8601 format
      const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`, {
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "ignore"], // Suppress stderr to avoid noise
      });

      const lastModified = result.toString().trim();
      
      if (lastModified) {
        // Ensure astro.frontmatter exists
        if (!file.data.astro) {
          file.data.astro = {};
        }
        if (!file.data.astro.frontmatter) {
          file.data.astro.frontmatter = {};
        }
        
        file.data.astro.frontmatter.lastModified = lastModified.toString();
      }
    } catch (error) {
      // Silently fail - file might not be in Git or Git might not be available
      // This is expected in some environments (CI/CD, new files, etc.)
    }
  };
}
