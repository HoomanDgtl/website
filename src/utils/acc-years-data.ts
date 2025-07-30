export type AccYear = {
  year: number;
  title?: string;

  live: string;
  upcoming?: boolean;
  sessions: {
    title: string;
    description: string;
    speakers: {
      name: string;
    }[];
  }[];
  images?: string[];
};

export const accYearsData: AccYear[] = [
  {
    year: 2024,

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

    live: "https://www.youtube.com/embed/wiVrlo7XJA0",
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
    images: [
      "/images/accelerate/2025/1.png",
      "/images/accelerate/2025/2.png",
      "/images/accelerate/2025/3.png",
      "/images/accelerate/2025/4.png",
      "/images/accelerate/2025/5.png",
      "/images/accelerate/2025/6.png",
      "/images/accelerate/2025/7.png",
      "/images/accelerate/2025/8.png",
      "/images/accelerate/2025/9.png",
      "/images/accelerate/2025/10.png",
      "/images/accelerate/2025/11.png",
      "/images/accelerate/2025/12.png",
      "/images/accelerate/2025/13.png",
      "/images/accelerate/2025/14.png",
      "/images/accelerate/2025/15.png",
      "/images/accelerate/2025/16.png",
    ],
  },
  {
    year: 2026,
    title: "Akash Accelerate 2025",

    upcoming: true,
    live: "https://www.youtube.com/embed/wiVrlo7XJA0",
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
