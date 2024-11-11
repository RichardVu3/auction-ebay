import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { auctionQueryOptions } from "../../../utils/queryOptions";
import { z } from "zod";
import { Group, Box, Flex, Text, Button, Container } from "@mantine/core";
import { CardsCarousel } from "../../../components/carousel";
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

  return (
    <Container>
      <Flex
        mih={50}
        bg="rgba(0, 0, 0, .3)"
        gap="md"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        <CardsCarousel />
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </Flex>
    </Container>
  );
}
