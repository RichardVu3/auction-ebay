import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { auctionQueryOptions } from "../../../utils/queryOptions";
import { z } from "zod";
export const Route = createFileRoute("/dashboard/auctions/$auctionId")({
  params: {},
  loader: (opts) => {
    opts.context.queryClient.ensureQueryData(
      auctionQueryOptions(opts.params.auctionId),
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const auctionQuery = useSuspenseQuery(auctionQueryOptions(params.auctionId));
  const auction = auctionQuery.data[0];
  console.log(auction, "???");

  return <>{auction.title}</>;
}
