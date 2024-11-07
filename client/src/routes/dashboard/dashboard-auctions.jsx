import { useQuery, useQueryClient } from "@tanstack/react-query";

const AuctionsSummary = () => {
  const queryClient = useQueryClient();
  const userId = 1;
  const { status, data, error, isFetching } = useQuery({
    queryKey: ["auctions"],
    queryFn: async () => {
      const res = await fetch(`/api/user/${userId}/auctions`);
      if (!res.ok) {
        console.error(res.statusText);
      }
      const data = await res.json();

      return data;
    },
  });

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
