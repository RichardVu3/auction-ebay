<script lang="ts">
	interface Auction {
		_id: string;
		title: string;
		category: string;
		starting_price: number;
		auction_id: string;
		start_time: string;
		end_time: string;
	}
	let auctions: [Auction] | [] = $state([]);

	$effect(() => {
		async function getAuctions() {
			const url = 'http://localhost:8000/api/auction/';
			const res = await fetch(url);
			const data = await res.json();
			auctions = data;
		}
		getAuctions();
	});
</script>

<ul>
	{#each auctions as auction (auction._id)}
		<li>
			title: {auction.title}
		</li>
		<li>
			starting price: ${auction.starting_price}
		</li>
		<li>
			starting time: {auction.start_time}
		</li>
	{/each}
</ul>

<style>
</style>
