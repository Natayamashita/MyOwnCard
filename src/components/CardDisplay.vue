<template>
    <header>
    </header>
    <main class="w-full justify-items-center">
        <menu class="bg-slate-200 max-w-lg border-2 border-black" style="min-width: 300px">
            <h1 class="bg-gray-400">
                Cards
            </h1>
            <table class="w-full">
                <tr class="flex justify-around" v-for="card_component of array_cards" :key="card_component.value">
                    <td>
                        {{ card_component }}
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
                    const { cards } = await fetch('http://localhost:3000/findCards', {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }).then(response => response.json());
                    console.log(cards[0])
                    this.array_cards = cards;
                } catch(err) {
                    console.log(err);
                }
            }
        },
    }
</script>