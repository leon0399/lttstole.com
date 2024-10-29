import stolen from "@/data/stolen-stuff";
import StolenStuffTable from "./stolen-stuff-table";

export default async function Home() {
  // todo: filter data
  const filteredData = stolen;

  return (
    <div className="">
      <main className="">
        <StolenStuffTable data={filteredData} />
      </main>
    </div>
  );
}
