<template>
    <div class="bg-slate-800 items-center flex flex-col text-black font-mono">
        <div class="w-2/4 m-1">
            <header class="bg-slate-300">
                <h1>
                    Insert your new card informations
                </h1>
            </header>
            <main class="main_content grid grid-cols-1 grid-rows-3 gap-1">
                <div class="flex flex-col self-center bg-slate-300 border-y-2 border-black">
                    <h3 class="text-left ml-2">
                        Title:
                    </h3>
                    <form>
                        <textarea id="card_title" name="title" rows="3" cols="60" class=" w-full resize-none outline-none leading-none h-16 px-2 text-xs" maxlength="200">
                        </textarea>
                    </form>
                </div>
                <div class="flex flex-col self-center bg-slate-300">
                    <h3 class="text-left ml-2">
                        Description:
                    </h3>
                    <form>
                        <textarea id="card_description" rows="5" name="description" cols="60" class="resize-none outline-none w-full leading-none h-16 px-2 text-xs" maxlength="450">
                        </textarea>
                    </form>
                </div>
                <div class="flex flex-col self-center bg-slate-300">
                    <h3 class="text-left ml-2">
                        Images:
                    </h3>
                    <button class="flex bg-slate-100 justify-center p-2">
                        <img src="../assets/AddImageIcon.png" class="w-8">
                    </button>
                </div>
                <div class="flex flex-col self-center bg-slate-300">
                    <h3 class="text-left ml-2">
                        Features:
                    </h3>
                    <button class="bg-slate-400">
                        Add new feature
                    </button>
                </div>
            </main>
            <button class="bg-slate-950 w-full text-white" @click="create_card">
                Create
            </button>
        </div>
    </div>
</template>

<script>
    // import cardManager from "../services/managers/CardManager"
    // const manager = new cardManager();
    export default {
        methods: {
            async create_card() {
                let card_title = document.getElementById('card_title').value;
                let card_description = document.getElementById('card_description').value;
                console.log(card_title)
                console.log(card_description) 
                try {
                    const response = await fetch("http://localhost:3030/card", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                    },
                        body: JSON.stringify({ card_title, card_description }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        alert(`Item salvo: ${JSON.stringify(data)}`);
                    } else {
                        const errorData = await response.json();
                        alert(`Erro: ${errorData.error}`);
                    }
                } catch (error) {
                    alert("Erro ao enviar os dados.");
                }
                // manager.post_card({card_title,card_description})
            }
        }
    }
</script>

<style>
    .main_content{
        display: block;
    }
</style>