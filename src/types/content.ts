import type { CollectionEntry } from "astro:content";

export type RoadmapEntry = CollectionEntry<"aeps">;
export type EventCardData = CollectionEntry<"Community_Akash_Events_Page">["data"];

export interface WhyChooseCard {
  title: string;
  description: string;
  icon: string;
}

export interface ReadyToDeployCard {
  title: string;
  description: string;

}

/**
 * Roadmap quarters type
 */
export type RoadmapQuarters = {
  Q1: RoadmapEntry[];
  Q2: RoadmapEntry[];
  Q3: RoadmapEntry[];
  Q4: RoadmapEntry[];
};