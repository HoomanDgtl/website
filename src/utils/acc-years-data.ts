export type AccYear = {
  year: number;
  title?: string;
  images: string[];
  live: string;
  sessions: {
    title: string;
    description: string;
    speakers: {
      name: string;
    }[];
  }[];
};

export const accYearsData: AccYear[] = [
  {
    year: 2024,
    images: [
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
    ],
    live: "https://www.youtube.com/embed/60mmj3bNzB0",
    sessions: [
      {
        title: "Session 1",
        description: "Description 1",
        speakers: [
          {
            name: "Speaker 1",
          },
          {
            name: "Speaker 2",
          },
        ],
      },
    ],
  },
  {
    year: 2025,
    title: "Akash Accelerate 2025",
    images: [
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
    ],
    live: "https://www.youtube.com/embed/60mmj3bNzB0",
    sessions: [
      {
        title: "Session 1",
        description: "Description 1",
        speakers: [
          {
            name: "Speaker 1",
          },
          {
            name: "Speaker 2",
          },
        ],
      },
    ],
  },
  {
    year: 2026,
    title: "Akash Accelerate 2025",
    images: [
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
    ],
    live: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    sessions: [
      {
        title: "Session 1",
        description: "Description 1",
        speakers: [
          {
            name: "Speaker 1",
          },
          {
            name: "Speaker 2",
          },
        ],
      },
    ],
  },
];
