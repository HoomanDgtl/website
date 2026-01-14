import OFilter from "@/components/gpu-table/filter";

import { buttonVariantsSecondary } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import TryAkashForm from "@/components/ui/try-akash-form";
import { gpus } from "@/utils/api";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import clsx from "clsx";
import { ArrowRight, Info } from "lucide-react";
import React from "react";
import { Skeleton } from "../../ui/skeleton";
import AvailabilityBar from "./availability-bar";
import DesktopTableGpu from "./desktop-table-gpu";
import Filter, { defaultFilters, type Filters } from "./filter";
import GpusComingSoon from "./GpusComingSoon";
import Sort from "./sort";
export interface Gpus {
  availability: { total: number; available: number };
  models: Array<{
    vendor: string;
    model: string;
    ram: string;
    interface: string;
    availability: { total: number; available: number };
    providerAvailability: { total: number; available: number };
    price: {
      min: number;
      max: number;
      avg: number;
      med: number;
      weightedAverage: number;
    };
  }>;
  time?: number;
}

const GpuTable = ({
  initialData,
  subCom,
  counts,
}: {
  initialData?: any;
  subCom?: boolean;
  counts?: boolean;
}) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Table
        initialData={{
          data: initialData,
        }}
        subCom={subCom}
        counts={counts}
      />
    </QueryClientProvider>
  );
};

export default GpuTable;

const Table = ({
  initialData,
  subCom,
  counts,
}: {
  initialData?: {
    data: any;
  };
  subCom?: boolean;
  counts?: boolean;
}) => {
  const fetchInterval = 1000 * 60;

  const {
    data: result,
    isLoading,
    isInitialLoading,
  } = useQuery<
    {
      data: Gpus;
    },
    Error
  >({
    queryKey: ["GPU_TABLE"],
    queryFn: () => axios.get(gpus),
    refetchIntervalInBackground: true,

    refetchInterval: fetchInterval,
  });

  const data = result?.data;
  return (
    <Tables
      data={data}
      subCom={subCom}
      isLoading={isLoading || isInitialLoading}
      counts={counts}
    />
  );
};

const modelTexts: Record<string, string> = {
  rtx: "RTX ",
  gtx: "GTX ",
  ti: " Ti",
  ada: " Ada",
};

const formatText = (model: string) => {
  let formattedText = model;
  for (const key in modelTexts) {
    const regex = new RegExp(key, "gi");
    formattedText = formattedText.replace(regex, modelTexts[key]);
  }

  return formattedText;
};
export const modifyModel = (model: string) => {
  return model === "rtxa6000" ? "A6000" : formatText(model);
};

export const price = (price: number) => {
  if (!price) return "--";
  // Format with comma as decimal separator (European format)
  const formatted = price.toFixed(2).replace(".", ",");
  return `$${formatted}`;
};

export const normalizeGpuModel = (model: Gpus["models"][number]) => {
  const isB200 = model?.model?.toLowerCase() === "b200";

  if (!isB200) return model;

  const hardcodedPrice = 1.34;

  return {
    ...model,
    price: {
      ...model.price,
      min: hardcodedPrice,
      max: hardcodedPrice,
      avg: hardcodedPrice,
      med: hardcodedPrice,
      weightedAverage: hardcodedPrice,
    },
    providerAvailability: {
      total: model?.providerAvailability?.total ?? 1,
      available: 1,
    },
  };
};

export const Tables = ({
  data,
  pathName,
  subCom,
  isLoading,
  counts,
}: {
  data?: Gpus;
  pathName?: any;
  subCom?: boolean;
  isLoading?: boolean;
  counts?: boolean;
}) => {
  const [filteredData, setFilteredData] = React.useState<Gpus["models"]>([]);
  const [filters, setFilters] = React.useState<Filters>(defaultFilters);

  // Wrapper to always keep B200 at top
  const setFilteredDataWithB200First = React.useCallback(
    (newData: Gpus["models"] | ((prev: Gpus["models"]) => Gpus["models"])) => {
      setFilteredData((prev) => {
        const dataToProcess =
          typeof newData === "function" ? newData(prev) : newData;
        const b200Models = dataToProcess.filter(
          (model) => model?.model?.toLowerCase() === "b200",
        );
        const otherModels = dataToProcess.filter(
          (model) => model?.model?.toLowerCase() !== "b200",
        );
        return [...b200Models, ...otherModels];
      });
    },
    [],
  );
  const totalGpus =
    filteredData?.length > 0
      ? filteredData?.reduce(
          (prev, curr) => prev + (curr?.availability?.total ?? 0),
          0,
        )
      : 0;

  const totalAvailableGpus =
    filteredData?.length > 0
      ? filteredData?.reduce(
          (prev, curr) => prev + (curr?.availability?.available ?? 0),
          0,
        )
      : 0;

  const normalizedData = React.useMemo(() => {
    const normalized =
      filteredData?.map((model) => normalizeGpuModel(model)) ?? [];
    // Hardcode B200 at the top - separate B200 from others
    const b200Models = normalized.filter(
      (model) => model?.model?.toLowerCase() === "b200",
    );
    const otherModels = normalized.filter(
      (model) => model?.model?.toLowerCase() !== "b200",
    );
    // Always return B200 first, then others
    return [...b200Models, ...otherModels];
  }, [filteredData]);

  return (
    <section
      className={clsx(
        "mx-auto flex w-full flex-col gap-0 md:gap-4",
        subCom ? "" : "md:container",
      )}
    >
      <div className="hidden flex-row gap-16 xl:flex">
        <div className="flex w-[289px] flex-shrink-0 flex-col gap-[70px]">
          <div className="flex flex-col gap-[18px]">
            <h1 className="text-[40px] font-semibold leading-[48px] ">
              GPU Pricing
            </h1>
            <p className="leading-[24px] ">
              Real-time availability for high-demand compute. Transparent hourly
              pricing with no hidden fees.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-lg font-semibold leading-[28px] !text-foreground">
              Looking for NVIDIA B200s, Bulk Orders, or Custom Configurations?
            </h2>
            <TryAkashForm
              type="customButton"
              linkText="Get a Custom Quote"
              className="h-9 w-full rounded-lg bg-[#171717] px-4 py-2 text-sm font-medium text-[#fafafa] hover:bg-[#171717]/90"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5">
          <div className="flex items-center justify-between">
            {isLoading ? (
              <div className="h-9 w-[185px] rounded-full border  bg-transparent" />
            ) : (
              <div className="inline-flex items-center gap-1 rounded-full border bg-transparent px-[14px] py-1.5  font-medium  text-para">
                GPU Utilization:
                {totalGpus > 0
                  ? Math.round(
                      ((totalGpus - totalAvailableGpus) / totalGpus) * 100,
                    )
                  : 0}
                %
              </div>
            )}
            <Filter
              filters={filters}
              setFilters={setFilters}
              setFilteredData={setFilteredDataWithB200First}
              res={data}
            />
          </div>

          <div className="h-px w-full bg-[#e4e4e7]" />
          <DesktopTableGpu
            subCom={subCom || false}
            isLoading={isLoading || false}
            filteredData={normalizedData}
            counts={counts}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 xl:hidden">
        {counts && (
          <p className="text-sm text-[#7E868C] md:text-base">
            Total Available GPUs
          </p>
        )}
        <div className="my-2 flex justify-between">
          {counts && (
            <Card className="px-2 py-1">
              <span className="font-bold text-[#09090B] dark:text-[#EDEDED]">
                {totalAvailableGpus || 0}{" "}
              </span>
              <span className="text-sm text-[#71717A]">
                (of {totalGpus || 0})
              </span>
            </Card>
          )}
          <div className="flex gap-1">
            <OFilter
              filters={filters}
              setFilters={setFilters}
              setFilteredData={setFilteredDataWithB200First}
              res={data}
            />
            <Sort
              setFilteredData={setFilteredDataWithB200First}
              res={data}
              filters={filters}
            />
          </div>
        </div>
        <div className=" md:hidden ">
          <GpusComingSoon />
        </div>
      </div>
      <div className="hidden md:block xl:hidden">
        <DesktopTableGpu
          subCom={subCom || false}
          isLoading={isLoading || false}
          filteredData={normalizedData}
          counts={counts}
        />
      </div>
      <div
        className={clsx(
          "flex w-full flex-col gap-4",
          subCom ? "lg:hidden" : "md:hidden",
        )}
      >
        {/* //most availability at top */}

        {isLoading
          ? new Array(10).fill(0).map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-5  rounded-xl border bg-background2  p-3 shadow-sm"
              >
                <div className="flex  items-center gap-3 p-2 ">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <div className="h-px w-full bg-defaultBorder"></div>
                <div className=" flex  flex-col gap-2">
                  <div className="flex items-center justify-between gap-1">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
                <div className="h-px w-full bg-defaultBorder"></div>
                <div className="flex flex-col items-start gap-1 ">
                  <div className="rounded-x-md relative min-w-[170px]  rounded-md border px-2 py-1 text-sm font-medium md:min-w-[100px] md:text-xs">
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <div className="rounded-x-md relative min-w-[170px]  rounded-md border px-2 py-1 text-sm font-medium md:min-w-[100px] md:text-xs">
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              </div>
            ))
          : normalizedData?.map((model, index) => {
              const isB200 = model?.model?.toLowerCase() === "b200";

              return (
                <Card className="my-2 flex w-full flex-col p-6" key={index}>
                  <div className="flex items-center gap-3 ">
                    <div className="rounded-md border p-[14px_10px]">
                      <img
                        src="/logos/nvidia.png"
                        alt="nvidia"
                        className="h-4 w-6"
                      />
                    </div>
                    <div className="">
                      <p className="text-xl font-semibold capitalize text-foreground">
                        {modifyModel(model?.model)}
                      </p>
                      <p className="text-sm font-medium text-[#71717A] dark:text-[#E4E4EB]">
                        {model?.ram} {model?.interface}
                      </p>
                    </div>
                  </div>

                  <AvailabilityBar
                    available={model?.availability?.available}
                    total={model?.availability?.total}
                    className="my-0 border-y py-5"
                    counts={counts}
                  />

                  <div className="flex flex-col justify-center gap-3 border-b pb-6 pt-2">
                    <div className="flex justify-between border-b pb-1.5 text-lg">
                      <span className="text-lg font-semibold md:text-base">
                        Average price:
                      </span>
                      <span className="font-semibold">
                        {price(model?.price?.weightedAverage)}/hr
                      </span>
                    </div>
                    <HoverCard openDelay={50} closeDelay={50}>
                      <HoverCardTrigger className="flex w-full items-center justify-between pt-1.5">
                        <div className="flex items-center gap-2 rounded-full border border-defaultBorder bg-[#F6F6F6] px-3 py-1 text-sm font-semibold text-[#475467] dark:border-defaultBorder dark:bg-background">
                          <span className="text-foreground">
                            min {price(model?.price?.min)}
                          </span>
                          <span className="text-[#98A2B3]">-</span>
                          <span className="text-foreground">
                            max {price(model?.price?.max)}
                          </span>
                        </div>
                        <Info size={14} className="text-[#71717A]" />
                      </HoverCardTrigger>
                      <HoverCardContent align="center" className="w-72">
                        <div className="flex flex-col gap-3">
                          <h2 className="text-sm font-medium text-black dark:text-white">
                            {model?.providerAvailability?.available || 0}{" "}
                            {model?.providerAvailability?.available > 1
                              ? "providers"
                              : "provider"}{" "}
                            offering this model:
                          </h2>
                          <div className="rounded-xl bg-[#101828] px-4 py-3 text-white shadow-md dark:bg-background2">
                            <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-2">
                              <p className="text-base font-semibold">
                                Avg price:
                              </p>
                              <div className="text-base font-bold">
                                {price(model?.price?.weightedAverage)}/h
                              </div>
                            </div>
                            <div className="mt-2 flex items-center justify-between gap-2 text-sm text-[#D0D5DD]">
                              <span>min {price(model?.price?.min)}</span>
                              <span>-</span>
                              <span>max {price(model?.price?.max)}</span>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  <div className="flex flex-col justify-center gap-3 pt-6">
                    <a
                      id={`${model?.model}-(gpu-rent)`}
                      href={`https://console.akash.network/rent-gpu?vendor=${model?.vendor}&gpu=${model?.model}&interface=${model?.interface}&vram=${model?.ram}`}
                      target="_blank"
                      className={clsx(
                        buttonVariantsSecondary({
                          variant: "primary",
                          size: "sm",
                        }),
                        "inline-flex !h-auto w-full justify-center gap-1.5 rounded-md border py-[13px] text-sm font-medium",
                      )}
                    >
                      <span>{isB200 ? "Get Access" : "Rent"}</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <TryAkashForm
                      type="customButton"
                      linkText="Request More"
                      className={clsx(
                        buttonVariantsSecondary({
                          variant: "secondary",
                          size: "sm",
                        }),
                        "inline-flex !h-auto w-full justify-center gap-1.5 rounded-md border py-3.5 text-sm font-medium",
                      )}
                    />
                  </div>
                </Card>
              );
            })}
      </div>
    </section>
  );
};
