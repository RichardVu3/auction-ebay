import { useQuery, useQueryClient } from "@tanstack/react-query";

function useAuctions() {
  return useQuery({
    queryKey: ["auctions"],
    queryFn: async () => {
      const res = await fetch("/api/auction");
      if (!res.ok) {
        console.log("error");
      }
      const data = await res.json();
      console.log("auctions?", data);
      return data;
    },
  });
}

const AuctionsSummary = () => {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = useAuctions();

  console.log(data, status, error, isFetching);

  if (status === "pending") {
    return "Loading...";
  }

  if (status === "error") {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h1>Auctions</h1>
      {data.map((auction) => {
        return (
          <div key={auction._id} className="text-black">
            {auction.title}
          </div>
        );
      })}
    </div>
  );
};

const getAuctionsById = async (auctionId) => {
  const res = await fetch(`localhsot:8000/api/auction/${auctionId}`);
  return await res.json();
};
export default AuctionsSummary;
