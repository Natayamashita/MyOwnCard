<template>
    <header>
    </header>
    <main class="w-full justify-items-center">
        <menu class="bg-slate-200 max-w-lg border-2 border-black" style="min-width: 300px">
            <h1 class="bg-gray-400">
                Cards
            </h1>
            <table class="w-full">
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Images</th>
                    <th>Features</th>
                </tr>
                <tr class="flex justify-around" v-for="card_component of array_cards" :key="card_component.value">
                    <td>
                        {{ card_component.title }}
                    </td>
                    <td>
                        {{ card_component.description }}
                    </td>
                    <td v-for="image of card_component.images" :key="image">
                        <img :src="image">
                    </td>
                    <td>
                        {{ card_component.features[0] }}
                    </td>
                </tr>
            </table>
        </menu>
    </main>
</template>

<script>
// import cardData from '../services/managers/CardManager';
// console.log(cardData)
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

                console.log(cards_images);
                cards.forEach((card, index) => {
                    card.images = cards_images[index]; // Atribuindo as imagens modificadas
                });

                this.array_cards = cards;
                console.log(this.array_cards, 'TESTE');
            } catch (err) {
                console.log(err);
            }
        }
    }
}
</script>