import clsx from "clsx";

const schedule = [
  {
    time: "10:00 AM",
    title: "Welcome to Akash Accelerate",
    speakers: ["Greg Osuri"],
  },
  {
    time: "10:15 AM",
    title: "Panel: Beyond Centralized Models",
    speakers: [
      "Casey Caruso, Jake Brukhman, Bidhan Roy, Benjamin Parr, Chad Fowler",
    ],
  },
  {
    time: "11:00 AM",
    title: "Guest Talk",
    speakers: ["Jason Badeaux"],
  },
  {
    time: "11:30 AM",
    title: "Fireside Chat: Energy Capacity in the Era of AI",
    speakers: ["Greg Osuri, Javier Villamizar"],
  },
  {
    time: "12:00 PM",
    title: "Showcase: The Future of the Cloud",
    speakers: [
      "Arel & Lex Avellino, Zack Abrams, Daniel Keller, Nirmal Krishnan",
    ],
    italicSpeakers: true,
    boldTitle: true,
  },
  {
    time: "01:00 - 01:45 AM",
    title: "Lunch Break",
  },
  {
    time: "1:45 PM",
    title: "Is DePIN Real?: Building and Scaling Decentralized Networks",
    speakers: [
      "Tommy Eastman, Haseeb Qureshi, Mahesh Ramakrishnan, Abhay Kumar",
    ],
  },
  {
    time: "2:15 PM",
    title: "Powering the Mind of Machines: Why America Must Decentralize AI",
    speakers: ["Greg Osuri"],
    italicSpeakers: true,
    boldTitle: true,
  },
  {
    time: "3:00 PM",
    title: "Showcase: The Rise of DeAI",
    speakers: ["Jiahao Sun, Manouk Vermaaten, Brayden Levangie"],
  },
  {
    time: "3:30 PM",
    title: "The Roadmap to a User-Owned AI Model",
    speakers: ["Ilia Polosukhin"],
    italicSpeakers: true,
  },
  {
    time: "4:00 PM",
    title: "Panel: Investing in Intelligence",
    speakers: ["Mark Palmer, Maja Vujinovic, Christian Lopez, Cheng Wang"],
  },
  {
    time: "5:00 PM",
    title: "Nous Research Presentation",
    speakers: ["Dillon Rolnick"],
  },
  {
    time: "5:30 PM",
    title: "Rooftop Happy Hour",
  },
];

const Schedule = () => {
  return (
    <div className="w-full border-t">
      {schedule.map((item, index) => (
        <div
          key={index}
          className="flex flex-col-reverse items-start justify-between gap-2  border-b py-4  md:flex-row"
        >
          <div className="flex-1">
            <div
              className={clsx(
                ` font-semibold  text-lg md:text-xl`,
                !item?.speakers && "font-instrument italic",
              )}
            >
              {item.title}
            </div>
            {item.speakers && (
              <div
                className={`mt-0.5 font-instrument text-lg font-extralight italic md:text-xl`}
              >
                {item.speakers}
              </div>
            )}
          </div>
          <div className=" font-jetBrainsMono text-base font-normal text-[#EAEAEA]">
            {item.time}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Schedule;
