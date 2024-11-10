import { createFileRoute } from "@tanstack/react-router";
import { auctionsQueryOptions } from "../../utils/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import AuctionCard from "../../components/auction-card";
import { Container, Flex, Stack } from "@mantine/core";
export const Route = createFileRoute("/dashboard/auctions")({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(auctionsQueryOptions);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const auctionsQuery = useSuspenseQuery(auctionsQueryOptions);
  const auctions = auctionsQuery.data;
  return (
    <Container>
      <Stack align="stretch" justify="flex-start" gap="md">
        {auctions.map((auction) => {
          return <AuctionCard key={auction._id} auction={auction} />;
        })}
      </Stack>
    </Container>
  );
}
