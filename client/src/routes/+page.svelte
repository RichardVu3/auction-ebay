<script lang="ts">
	let auctions = $state([]);

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

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<ul>
	<!-- {#each auctions as auction (user.age)} -->
	<!-- 	<li> -->
	<!-- 		name: {user.name} -->
	<!-- 	</li> -->
	<!-- 	<li> -->
	<!-- 		age: {user.age} -->
	<!-- 	</li> -->
	<!-- 	<li> -->
	<!-- 		favorite food: {user.favorite_food} -->
	<!-- 	</li> -->
	<!-- {/each} -->
</ul>

<style>
</style>
