import { useStorage } from "@/utils/store";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AktFeatures from "./aktfeatures";
import BuyingAkt from "./buying-akt-section";
import FaqSection from "./faq-section";
import TokenMetricsSection from "./token-metrics-section";

interface SectionProps {
  aktFeaturesSection: any;
  buyingAKTSection: any;
  faqsSection: any;
  url: string;
}

const Sections = ({
  url,
  aktFeaturesSection,
  buyingAKTSection,
  faqsSection,
}: SectionProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Query
        aktFeaturesSection={aktFeaturesSection}
        buyingAKTSection={buyingAKTSection}
        faqsSection={faqsSection}
        url={url}
      />
    </QueryClientProvider>
  );
};

const Query = ({
  aktFeaturesSection,
  buyingAKTSection,
  faqsSection,
  url,
}: SectionProps) => {
  const token = useStorage((state: any) => state?.token);
  const setToken = useStorage((state: any) => state?.setToken);

  const [enabled, setEnabled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  const fetchInterval = 1000 * 60 * 20; // 20 minutes

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tokenMetrics"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/akash-network?tickers=true&market_data=true",
      );
      return response.json();
    },
    refetchInterval: fetchInterval,
    keepPreviousData: true,
    retry: true,
    enabled: enabled,
    initialData: token,
  });

  useEffect(() => {
    if (data?.time !== token?.time && data) {
      setToken({
        ...data,
        time: new Date().getTime(),
      });
    }

    if (token === null) {
      setToken({ time: 0 });
    }
  }, [data]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const shouldFetch = !token || currentTime - token?.time > fetchInterval;
    setEnabled(shouldFetch);
  }, [currentTime, token]);

  return (
    <>
      <TokenMetricsSection
        data={data}
        isLoading={isLoading}
        isError={isError}
      />
      <div className="border-b" />

      <AktFeatures aktFeaturesSection={aktFeaturesSection} url={url} />
      <div className="border-b" />

      <BuyingAkt buyingAKTSection={buyingAKTSection} />
      <div className="border-b" />

      <FaqSection data={data} isLoading={isLoading} isError={isError} />
    </>
  );
};

export default Sections;
