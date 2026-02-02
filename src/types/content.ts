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
