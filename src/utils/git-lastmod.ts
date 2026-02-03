import { execSync } from "child_process";
import { resolve } from "path";

/**
 * Gets the last modified date from Git for a given file path
 * @param filePath - Relative or absolute path to the file
 * @returns Date object representing the last commit date, or null if unavailable
 */
export function getGitLastModified(filePath: string): Date | null {
  try {
    // Resolve to absolute path if relative
    const absolutePath = resolve(filePath);
    
    // Get the last commit date for this file in ISO 8601 format
    const result = execSync(`git log -1 --pretty="format:%cI" "${absolutePath}"`, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "ignore"], // Suppress stderr to avoid noise
      cwd: process.cwd(), // Ensure we're in the project root
    });

    const lastModified = result.toString().trim();
    
    if (lastModified) {
      return new Date(lastModified);
    }
    
    return null;
  } catch (error) {
    // Silently fail - file might not be in Git or Git might not be available
    // This is expected in some environments (CI/CD, new files, etc.)
    return null;
  }
}

/**
 * Gets the last modified date from Git for multiple file paths
 * @param filePaths - Array of relative or absolute paths to files
 * @returns Map of file paths to Date objects
 */
export function getGitLastModifiedBatch(filePaths: string[]): Map<string, Date> {
  const resultMap = new Map<string, Date>();
  
  for (const filePath of filePaths) {
    const lastMod = getGitLastModified(filePath);
    if (lastMod) {
      resultMap.set(filePath, lastMod);
    }
  }
  
  return resultMap;
}
