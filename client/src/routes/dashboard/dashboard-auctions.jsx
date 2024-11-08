import { useQuery, useQueryClient } from "@tanstack/react-query";

const getUserAuctions = async (userId) => {
  const res = await fetch(`/api/user/${userId}/auctions`);
  return await res.json();
};

const AuctionCard = (props) => {
  const { auction } = props;
  return (
    <div className="m-2 border-2 border-slate-200">
      <span>
        <h2>{auction.title}</h2>
      </span>
      <div className="grid grid-cols-3 m-2">
        {/*Left Col*/}
        <div className="bg-gray-100 rounded-lg">
          <img src="https://i.ebayimg.com/images/g/Uw4AAOSwscxnGWRH/s-l500.jpg" />
        </div>

        {/*Middle Col*/}
        <div className="bg-sky-100">{auction.description}</div>

        {/*Right Col*/}
        <div className="bg-red-100">
          <button
            type="button"
            className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Edit Auction
          </button>

          <button
            type="button"
            className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Delete Auction
          </button>
        </div>
      </div>
    </div>
  );
};

const AuctionsSummary = () => {
  const queryClient = useQueryClient();
  const userId = 1;
  const { status, data, error, isFetching } = useQuery({
    queryKey: ["auctions"],
    queryFn: () => {
      return getUserAuctions(userId);
    },
  });

  if (status === "pending") {
    return "Loading...";
  }

  if (status === "error") {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <h1>Auctions</h1>
      {data.map((auction) => {
        return <AuctionCard key={auction._id} auction={auction} />;
      })}
    </>
  );
};

export default AuctionsSummary;
