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
                    <td v-for="card of card_component.cards" :key="card">
                        {{ card }}
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
        data() {
            return {
                array_cards: [
                    {
                        cards: [1, 2, 3]
                    }, 
                    {
                        cards: [4, 5, 6]
                    }
                ]
            }
        },
        computed: {
            // Computa as fileiras com 6 itens cada
        }
    }
</script>