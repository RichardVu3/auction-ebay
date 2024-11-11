import { createFileRoute } from "@tanstack/react-router";
import { auctionsQueryOptions } from "../../../utils/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
export const Route = createFileRoute("/dashboard/auctions/")({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(auctionsQueryOptions);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const auctionsQuery = useSuspenseQuery(auctionsQueryOptions);
  const auctions = auctionsQuery.data;
  return "auction list";
}
