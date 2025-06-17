import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/radix-tabs";
import Schedule from "./Schedule";
import SpeakersContent from "./Speakers";

const AccTabs = () => {
  return (
    <Tabs className="mt-7 flex flex-col items-center justify-center gap-12">
      <TabsList className="h-auto rounded-md bg-[#262626] p-1">
        <TabsTrigger
          value="schedule"
          className="px-8 text-xl transition-none focus-visible:!ring-0 focus-visible:!ring-offset-0  data-[state=active]:rounded data-[state=active]:border data-[state=active]:!border-[#4F4F4F] data-[state=active]:bg-[#2F2F2F]"
        >
          Schedule
        </TabsTrigger>
        <TabsTrigger
          value="speakers"
          className="px-8 text-xl transition-none focus-visible:!ring-0 focus-visible:!ring-offset-0  data-[state=active]:rounded data-[state=active]:border data-[state=active]:!border-[#4F4F4F] data-[state=active]:bg-[#2F2F2F]"
        >
          Speakers
        </TabsTrigger>
      </TabsList>
      <TabsContent value="schedule" className="w-full ">
        <Schedule />
      </TabsContent>
      <TabsContent value="speakers">
        <SpeakersContent />
      </TabsContent>
    </Tabs>
  );
};

export default AccTabs;
