document.querySelectorAll(".projects").forEach(projects => {
	const postId = projects.dataset.postId;
	const ratings = projects.querySelectorAll(".post-rating");
	const likeRating = ratings[0];

	ratings.forEach(rating => {
		const button = rating.querySelector(".post-rating-button");
		const count = rating.querySelector(".post-rating-count");

		button.addEventListener("click", async () => {
			const isSelected = rating.classList.contains("post-rating-selected");

			if (isSelected) {
				count.textContent = Math.max(0, Number(count.textContent) - 1);
				rating.classList.remove("post-rating-selected");
			} else {
				count.textContent = Number(count.textContent) + 1;

				ratings.forEach(rating => {
					if (rating.classList.contains("post-rating-selected")) {
						const count = rating.querySelector(".post-rating-count");
						count.textContent = Math.max(0, Number(count.textContent) - 1);
						rating.classList.remove("post-rating-selected");
					}
				});

				rating.classList.add("post-rating-selected");
			}

			const likeOrDislike = likeRating === rating ? "like" : "dislike";
			const response = await fetch(`/posts/${postId}/${likeOrDislike}`, {
				method: 'POST'
			});
			const body = await response.json();
		});
	});
});

