
import { getGitLastModified } from "./git-lastmod";
import { readdirSync, statSync, readFileSync } from "fs";
import { join } from "path";


// Cache for the lastmod map to avoid rebuilding it multiple times
let lastmodMapCache: Map<string, Date> | null = null;

/**
 * Maps content collection entries to their URL paths and lastmod dates
 * @returns A Map of URL paths to Date objects representing lastmod
 */
export async function getLastmodMap(): Promise<Map<string, Date>> {
  // Return cached map if available
  if (lastmodMapCache) {
    return lastmodMapCache;
  }

  const lastmodMap = new Map<string, Date>();

  // Try to import astro:content - it may not be available in all contexts
  let getCollection: any;
  try {
    const contentModule = await import("astro:content");
    getCollection = contentModule.getCollection;
  } catch (error) {
    // astro:content not available in this context (e.g., sitemap serialize)
    // We'll only use Git for regular pages
    console.warn("astro:content not available, skipping content collections");
    getCollection = null;
  }

  // Helper function to get lastmod date from entry data
  // Uses Git for reliable last modified dates, with fallback to frontmatter dates
  const getLastmodFromEntry = (entry: any, collectionName: string): Date | null => {
    // First, try to get lastModified from Git (most reliable)
    try {
      // Get the file path from the entry
      // Entry.id is the file path relative to the content collection directory
      // For blog posts, entry.id is typically "slug/index" or just "slug"
      const contentPath = entry.id || entry.slug;
      if (contentPath) {
        // Normalize the path - remove trailing "/index" if present, then add it back
        // This handles both "slug" and "slug/index" formats
        const normalizedPath = contentPath.replace(/\/index$/, "");
        
        // Try common patterns for content collection file paths
        const possiblePaths = [
          `src/content/${collectionName}/${normalizedPath}/index.md`,
          `src/content/${collectionName}/${normalizedPath}/index.mdx`,
          `src/content/${collectionName}/${contentPath}.md`,
          `src/content/${collectionName}/${contentPath}.mdx`,
          `src/content/${collectionName}/${normalizedPath}.md`,
          `src/content/${collectionName}/${normalizedPath}.mdx`,
        ];
        
        for (const path of possiblePaths) {
          const gitLastMod = getGitLastModified(path);
          if (gitLastMod) {
            return gitLastMod;
          }
        }
      }
    } catch (error) {
      // If Git lookup fails, continue to fallback options
    }

    // Fallback to existing data fields (this ensures we always return a date if available)
    const data = entry.data;
    // Use updatedDate if available, otherwise pubDate
    if (data.updatedDate) {
      return data.updatedDate instanceof Date ? data.updatedDate : new Date(data.updatedDate);
    }
    if (data.pubDate) {
      return data.pubDate instanceof Date ? data.pubDate : new Date(data.pubDate);
    }
    // For roadmap entries, check for updated or created dates
    if (data.updated) {
      return data.updated instanceof Date ? data.updated : new Date(data.updated);
    }
    if (data.created) {
      return data.created instanceof Date ? data.created : new Date(data.created);
    }
    return null;
  };

  // Blog collection: /blog/{slug}/ and /case-studies/{slug}/
  // Case studies are also Blog posts but accessed via /case-studies/ route
  if (getCollection) {
    try {
      const blogEntries = await getCollection("Blog");
      for (const entry of blogEntries) {
        const lastmod = getLastmodFromEntry(entry, "Blog");
        // Always set lastmod if we have it (even if it's just pubDate fallback)
        // This ensures blog posts get lastmod dates
        if (lastmod) {
          // Regular blog posts
          lastmodMap.set(`/blog/${entry.slug}/`, lastmod);
          
          // Case studies are also blog posts but have a different route
          const isCaseStudy = (entry.data as any).categories?.some(
            (category: string) => category.toLowerCase() === "case studies"
          );
          if (isCaseStudy) {
            lastmodMap.set(`/case-studies/${entry.slug}/`, lastmod);
          }
        }
      }
    } catch (error) {
      console.warn("Could not load Blog collection:", error);
    }

    // Docs collection: /docs/{slug}/
    // Now we can get lastModified from remarkPluginFrontmatter
    try {
      const docsEntries = await getCollection("Docs");
      for (const entry of docsEntries) {
        const lastmod = getLastmodFromEntry(entry, "Docs");
        if (lastmod) {
          lastmodMap.set(`/docs/${entry.slug}/`, lastmod);
        }
      }
    } catch (error) {
      console.warn("Could not load Docs collection:", error);
    }

    // Community_Page collection: /community/{slug}/
    try {
      const communityEntries = await getCollection("Community_Page");
      for (const entry of communityEntries) {
        const lastmod = getLastmodFromEntry(entry, "Community_Page");
        if (lastmod) {
          lastmodMap.set(`/community/${entry.slug}/`, lastmod);
        }
      }
    } catch (error) {
      console.warn("Could not load Community_Page collection:", error);
    }

    // Development_Page collection: /development/{slug}/
    try {
      const developmentEntries = await getCollection("Development_Page");
      for (const entry of developmentEntries) {
        const lastmod = getLastmodFromEntry(entry, "Development_Page");
        if (lastmod) {
          lastmodMap.set(`/development/${entry.slug}/`, lastmod);
        }
      }
    } catch (error) {
      console.warn("Could not load Development_Page collection:", error);
    }

    // About_Page collection: /about/{slug}/
    try {
      const aboutEntries = await getCollection("About_Page");
      for (const entry of aboutEntries) {
        const lastmod = getLastmodFromEntry(entry, "About_Page");
        if (lastmod) {
          lastmodMap.set(`/about/${entry.slug}/`, lastmod);
        }
      }
    } catch (error) {
      console.warn("Could not load About_Page collection:", error);
    }

    // Development_Current_Groups_Page collection: /current-groups/{slug}/
    try {
      const currentGroupsEntries = await getCollection("Development_Current_Groups_Page");
      for (const entry of currentGroupsEntries) {
        const lastmod = getLastmodFromEntry(entry, "Development_Current_Groups_Page");
        if (lastmod) {
          lastmodMap.set(`/current-groups/${entry.slug}/`, lastmod);
        }
      }
    } catch (error) {
      console.warn("Could not load Development_Current_Groups_Page collection:", error);
    }

    // aeps (roadmap) collection: /roadmap/{slug}/
    // Note: The slug is split, so we use the first part
    try {
      const roadmapEntries = await getCollection("aeps");
      for (const entry of roadmapEntries) {
        const lastmod = getLastmodFromEntry(entry, "aeps");
        if (lastmod && entry.slug) {
          // The roadmap slug is split, so we use the first part
          const slugPart = entry.slug.split("/")[0];
          lastmodMap.set(`/roadmap/${slugPart}/`, lastmod);
        }
      }
    } catch (error) {
      console.warn("Could not load aeps collection:", error);
    }

    // Ecosystem_Page collection
    // Note: Ecosystem_Page entries are used in listing pages, not individual pages
    // So we skip them as they don't have individual routes
    // If individual pages are added in the future, uncomment and adjust the URL pattern below
    // try {
    //   const ecosystemEntries = await getCollection("Ecosystem_Page");
    //   for (const entry of ecosystemEntries) {
    //     const lastmod = getLastmodFromEntry(entry);
    //     if (lastmod) {
    //       lastmodMap.set(`/ecosystem/deployed-on-akash/${entry.slug}/`, lastmod);
    //     }
    //   }
    // } catch (error) {
    //   console.warn("Could not load Ecosystem_Page collection:", error);
    // }

    // Community_Contributions_Page and Community_Akash_Events_Page
    // These are typically used in listing pages, not individual pages
    // So we skip them unless they have individual pages
  } else {
    // If astro:content is not available, use file system to find blog posts
    // This happens in sitemap serialize context
    try {
      const blogDir = "src/content/Blog";
      const blogEntries = readdirSync(blogDir, { withFileTypes: true });
      
      for (const entry of blogEntries) {
        if (entry.isDirectory()) {
          const slug = entry.name;
          // Try to find index.md or index.mdx in the directory
          const possibleFiles = [
            join(blogDir, slug, "index.md"),
            join(blogDir, slug, "index.mdx"),
          ];
          
          for (const filePath of possibleFiles) {
            try {
              if (statSync(filePath).isFile()) {
                let lastmod: Date | null = null;
                
                // First, try Git
                const gitLastMod = getGitLastModified(filePath);
                if (gitLastMod) {
                  lastmod = gitLastMod;
                } else {
                  // Fallback: parse frontmatter to get pubDate or updatedDate
                  try {
                    const content = readFileSync(filePath, "utf-8");
                    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
                    if (frontmatterMatch) {
                      const frontmatter = frontmatterMatch[1];
                      // Try to extract updatedDate first, then pubDate
                      const updatedDateMatch = frontmatter.match(/updatedDate:\s*["']?([^"'\n]+)["']?/);
                      const pubDateMatch = frontmatter.match(/pubDate:\s*["']?([^"'\n]+)["']?/);
                      
                      if (updatedDateMatch) {
                        lastmod = new Date(updatedDateMatch[1]);
                      } else if (pubDateMatch) {
                        lastmod = new Date(pubDateMatch[1]);
                      }
                    }
                  } catch {
                    // If parsing fails, continue without lastmod
                  }
                }
                
                if (lastmod && !isNaN(lastmod.getTime())) {
                  lastmodMap.set(`/blog/${slug}/`, lastmod);
                  
                  // Check if it's a case study by reading the file (basic check)
                  try {
                    const content = readFileSync(filePath, "utf-8");
                    if (content.includes("Case Studies") || content.includes("case studies")) {
                      lastmodMap.set(`/case-studies/${slug}/`, lastmod);
                    }
                  } catch {
                    // If we can't read the file, skip case study check
                  }
                }
                break; // Found the file, no need to check other extensions
              }
            } catch {
              // File doesn't exist, try next
              continue;
            }
          }
        }
      }
    } catch (error) {
      console.warn("Could not load Blog collection via filesystem:", error);
    }
  }

  // Regular Astro pages (non-content collection pages)
  // Map file paths to URL paths and get Git last modified dates
  try {
    const regularPages: Array<{ filePath: string; urlPath: string }> = [
      // About pages
      { filePath: "src/pages/about/network-capacity.astro", urlPath: "/about/network-capacity/" },
      { filePath: "src/pages/about/providers.astro", urlPath: "/about/providers/" },
      
      // Root and main pages
      { filePath: "src/pages/index.astro", urlPath: "/" },
      { filePath: "src/pages/token.astro", urlPath: "/token/" },
      { filePath: "src/pages/deploy.astro", urlPath: "/deploy/" },
      { filePath: "src/pages/providers.astro", urlPath: "/providers/" },
      { filePath: "src/pages/economics.astro", urlPath: "/economics/" },
      { filePath: "src/pages/privacy.astro", urlPath: "/privacy/" },
      { filePath: "src/pages/support.astro", urlPath: "/support/" },
      { filePath: "src/pages/whitepaper.astro", urlPath: "/whitepaper/" },
      
      // Event pages
      { filePath: "src/pages/akash-accelerate-2024.astro", urlPath: "/akash-accelerate-2024/" },
      { filePath: "src/pages/akash-accelerate-2025.astro", urlPath: "/akash-accelerate-2025/" },
      { filePath: "src/pages/akash-accelerate-2025-livestream.astro", urlPath: "/akash-accelerate-2025-livestream/" },
      { filePath: "src/pages/akash-accelerate-2025-livestream-confirm.astro", urlPath: "/akash-accelerate-2025-livestream-confirm/" },
      { filePath: "src/pages/neurips.astro", urlPath: "/neurips/" },
      { filePath: "src/pages/meetingconfirmation.astro", urlPath: "/meetingconfirmation/" },
      
      // GPU pages
      { filePath: "src/pages/gpus-on-demand.astro", urlPath: "/gpus-on-demand/" },
      { filePath: "src/pages/nvidia-blackwell-gpus.astro", urlPath: "/nvidia-blackwell-gpus/" },
      { filePath: "src/pages/internalgpucounts.astro", urlPath: "/internalgpucounts/" },
      
      // Brand pages
      { filePath: "src/pages/brand/resources.astro", urlPath: "/brand/resources/" },
      { filePath: "src/pages/brand/insights.astro", urlPath: "/brand/insights/" },
      
      // Community pages
      { filePath: "src/pages/community/welcome.astro", urlPath: "/community/welcome/" },
      { filePath: "src/pages/community/akash-insiders.astro", urlPath: "/community/akash-insiders/" },
      { filePath: "src/pages/community/student-ambassadors.astro", urlPath: "/community/student-ambassadors/" },
      { filePath: "src/pages/community/events/index.astro", urlPath: "/community/events/" },
      { filePath: "src/pages/community/events/archived.astro", urlPath: "/community/events/archived/" },
      
      // Docs pages
      { filePath: "src/pages/docs/index.astro", urlPath: "/docs/" },
      { filePath: "src/pages/docs/index-new.astro", urlPath: "/docs/index-new/" },
      { filePath: "src/pages/docs/index-old.astro", urlPath: "/docs/index-old/" },
      { filePath: "src/pages/docs/api-documentation/getting-started.astro", urlPath: "/docs/api-documentation/getting-started/" },
      { filePath: "src/pages/docs/developers/getting-started.astro", urlPath: "/docs/developers/getting-started/" },
      { filePath: "src/pages/docs/node-operators/getting-started.astro", urlPath: "/docs/node-operators/getting-started/" },
      { filePath: "src/pages/docs/providers/getting-started.astro", urlPath: "/docs/providers/getting-started/" },
      
      // Ecosystem pages
      { filePath: "src/pages/ecosystem/akash-tools/index.astro", urlPath: "/ecosystem/akash-tools/" },
      { filePath: "src/pages/ecosystem/deployed-on-akash/index.astro", urlPath: "/ecosystem/deployed-on-akash/" },
      { filePath: "src/pages/ecosystem/deployed-on-akash/showcase.astro", urlPath: "/ecosystem/deployed-on-akash/showcase/" },
      
      // Pricing pages
      { filePath: "src/pages/pricing/gpus.astro", urlPath: "/pricing/gpus/" },
      { filePath: "src/pages/pricing/provider-calculator.astro", urlPath: "/pricing/provider-calculator/" },
      { filePath: "src/pages/pricing/usage-calculator.astro", urlPath: "/pricing/usage-calculator/" },
    ];

    for (const { filePath, urlPath } of regularPages) {
      const lastmod = getGitLastModified(filePath);
      if (lastmod) {
        lastmodMap.set(urlPath, lastmod);
      }
    }
  } catch (error) {
    console.warn("Could not load regular Astro pages:", error);
  }

  // Cache the result
  lastmodMapCache = lastmodMap;
  return lastmodMap;
}

/**
 * Synchronous version that returns the cached map or null
 * Use this in serialize function if the map has been built
 */
export function getLastmodMapSync(): Map<string, Date> | null {
  return lastmodMapCache;
}
