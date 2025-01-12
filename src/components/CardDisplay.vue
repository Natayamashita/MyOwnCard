<template>
    <header>
    </header>
    <main class="w-full justify-items-center">
        <menu class="bg-slate-200 max-w-lg border-2 border-black" style="min-width: 300px">
            <h1 class="bg-gray-400">
                Cards
            </h1>
            <div class="w-full p-4">
                <div class="flex justify-around flex-col bg-zinc-700 p-2" v-for="card_component of array_cards" :key="card_component.value">
                    <h1>
                        {{ card_component.title }}
                    </h1>
                    <h3>
                        {{ card_component.description }}
                    </h3>
                    <section class="flex flex-row self-center">
                        <div v-for="image of card_component.images" :key="image">
                            <img :src="image" class="h-96 w-auto">
                        </div>
                    </section>
                    <block>
                        {{ card_component.features[0] }}
                    </block>
                </div>
            </div>
            <div class="flex">
                <arrow class="bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="arrow"><path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z"/></svg>
                </arrow>
                <section class="grow bg-black card-image-parent flex w-full">
                    <div class="gallery-cell grow" style="display:block;">1</div>
                    <div class="gallery-cell hidden" style="">2</div>
                    <div class="gallery-cell hidden" style="">3</div>
                </section>
                <arrow class="bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="arrow"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg>
                </arrow>
            </div>
        </menu>
    </main>
</template>

<script>
export default {

    mounted() {
        this.loadCards();
    },
    data() {
        return {
            array_cards: []
        }
    },
    methods: {
        async loadCards() {
            try {
                let { cards } = await fetch('http://localhost:3000/findCards', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }).then(response => response.json());

                let cards_images = cards.map(el => {
                    return el.images.map(image => "data:image/png;base64," + image);
                });

                cards.forEach((card, index) => {
                    card.images = cards_images[index]; // Atribuindo as imagens modificadas
                });

                this.array_cards = cards;
            } catch (err) {
                console.log(err);
            }
        },

        async manageCardImageView() {
            const card_image_parent = document.getElementById(`card-image-parent`).children;
            console.log(card_image_parent)
        }
    }
}
</script>

<style>
    main {
        color: white;
        font-size: 0.875rem;
    }
    .arrow:hover {
        cursor: pointer; 
    }
    .arrow:active {
        background-color: gray;
        transition: 0.3s;
    }
</style>