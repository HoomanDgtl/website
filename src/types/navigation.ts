/**
 * Navigation item types used throughout the application
 */

/**
 * Base navigation item interface
 * Used for docs, community, development, and about page navigation
 */
export interface NavItem {
  label: string;
  link?: string;
  subItems?: NavItem[];
  enabled?: boolean;
  weight?: number;
  type?: string;
}

/**
 * Navigation item with guaranteed subItems (for nested navigation)
 */
export interface NavItemWithSubItems extends NavItem {
  subItems: NavItem[];
}

/**
 * Sequence item for docs navigation structure
 * Used in docs sequence configuration
 */
export interface SequenceItem {
  label: string;
  type?: "Header";
  subItems?: SequenceItem[];
}

/**
 * Breadcrumb item for navigation breadcrumbs
 */
export interface BreadcrumbItem {
  label: string;
  link: string;
}

/**
 * Previous and next page navigation result
 */
export interface PrevNextPages {
  prevPage: NavItem | null;
  nextPage: NavItem | null;
}
