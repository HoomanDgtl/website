import { ArrowUpCircle } from "lucide-react";

const BuyingAkt = ({ buyingAKTSection }: any) => {
  return (
    <div className="py-[40px] md:pb-[80px] md:pt-[80px]">
      <div>
        <h2 className="text-2xl font-semibold  md:text-2lg ">
          {buyingAKTSection.title}
        </h2>
        <p className="mt-4 text-base font-normal md:text-lg ">
          {buyingAKTSection.description}
        </p>
      </div>

      <div className="mt-4">
        {buyingAKTSection.table.map(
          (
            table: {
              row: {
                title: string;
                link?: string;
              }[];
            },
            i: number,
          ) => {
            const colsArray = table.row;

            if (i === 0) {
              return (
                <div
                  key={i}
                  className="flex w-full justify-between border-b  py-[20px] text-base font-semibold  md:text-lg  lg:text-2xl"
                >
                  {colsArray.map((col) => (
                    <div className="flex w-full justify-start">{col.title}</div>
                  ))}
                </div>
              );
            } else {
              return (
                <div
                  key={i}
                  className={`flex w-full justify-between  border-b  py-[16px] `}
                >
                  {colsArray.map((col, i) => (
                    <a
                      href={col.link ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-full cursor-pointer items-center justify-start gap-x-2 "
                    >
                      {col && (
                        <ArrowUpCircle className="w-4 rotate-45 group-hover:text-primary" />
                      )}

                      <p className="text-xs font-medium leading-[15px] text-foreground group-hover:text-primary md:text-base md:leading-[28px] lg:text-xl">
                        {col.title}
                      </p>
                    </a>
                  ))}
                </div>
              );
            }
          },
        )}
      </div>
    </div>
  );
};

export default BuyingAkt;
