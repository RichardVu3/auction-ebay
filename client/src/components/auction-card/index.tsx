import { Card, Image, Text, Badge, Button, Group, Flex } from "@mantine/core";
import { Auction } from "../../utils/auctions";
export default function AuctionCard({ auction }: { auction: Auction }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Image
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
        height={160}
        alt="Norway"
      />
      <Text size="sm" c="dimmed">
        {auction.description}
      </Text>
      <Button color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
  );
}
