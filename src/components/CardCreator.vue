<template>
    <div class="bg-slate-800 items-center flex flex-col text-black font-mono">
        <div class="w-2/4 m-1">
            <header class="bg-slate-300">
                <h1 class="default_padding">
                    Insert your new card informations
                </h1>
            </header>
            <main class="main_content grid grid-cols-1 gap-1">
                <div class="flex flex-col self-center bg-slate-300 border-y-2 border-black">
                    <h3 class="text-left ml-2 default_padding">
                        Title:
                    </h3>
                    <form>
                        <textarea name="title" id="card_title" rows="3" cols="60" class=" w-full resize-none outline-none leading-none h-16 px-2 text-xs" maxlength="200"></textarea>
                    </form>
                </div>
                <div class="flex flex-col self-center bg-slate-300">
                    <h3 class="text-left ml-2 default_padding">
                        Description:
                    </h3>
                    <form>
                        <textarea id="card_description" rows="5" name="description" cols="60" class="resize-none outline-none w-full leading-none h-16 px-2 text-xs" maxlength="450"></textarea>
                    </form>
                </div>
                <div class="flex flex-col self-center bg-slate-300">
                    <h3 class="text-left ml-2 default_padding">
                        Images:
                    </h3>
                    <input class="flex bg-slate-100 justify-center p-2" id="image_input" type="file" ref="imageInput" @change="handleFileChange" accept="image/*"/>
                </div>
                <div class="grid-cols-6 grid justify-items-center gap-4 w-full">
                    <div v-for="item in imagesUrl" :key="item.id" class="p-0">
                        <img :src="item" style="width: 100px; height: 100px"/>
                    </div>
                </div>
                <div class="flex flex-col self-center bg-slate-300">
                    <h3 class="text-left ml-2 default_padding">
                        Features:
                    </h3>
                    <button class="bg-slate-400 default_padding" @click="addNewFeature">
                        <div class="flex-row flex w-full">
                            <svg style="width:50px; height:50px">
                            </svg>
                            Add new feature
                        </div>
                    </button>
                </div>
            </main>
            <div class="grid-cols-2 grid gap-2 p-4 no-hover" id="parentFeatures">
                
            </div>
            <button class="bg-slate-950 w-full text-white default_padding" @click="create_card">
                Create
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            async addNewFeature() {
                const input = document.createElement("input");
                const input2 = document.createElement("input");
                input.classList.add('input_class');
                input2.classList.add('input_class');
                const parent = document.getElementById("parentFeatures");
                parent.appendChild(input2);
                parent.appendChild(input);
                const feature_position = (parent.children.length /2);
                console.log(feature_position);
                // this.features.push();
            },
            async handleFileChange(event) {
                const file = event.target.files[0]; // Pega o primeiro arquivo selecionado
                console.log(event.target.files[0])
                if (file) {
                    const reader = new FileReader();
                    
                    reader.onload = (e) => {
                        this.imagesUrl.push(e.target.result); // Armazena a URL da imagem para exibição
                    };

                    // Lê o arquivo como uma URL de dados
                    reader.readAsDataURL(file);
                }
            },
            async create_card() {
                let card_title = document.getElementById('card_title').value;
                let card_description = document.getElementById('card_description').value;
                console.log(card_title)
                console.log(card_description) 
                try {
                    const request = new Request("http://localhost:3000/createCard", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                    },
                        body: JSON.stringify({ title: card_title, description: card_description })
                    });

                    const response = await fetch(request);

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
        },
        data() {
                return {
                    imagesUrl: [],
                    features: []
            };
        }
    }
</script>

<style>
    textarea {
        padding-top: 0; /* Remove o padding superior */
        margin-top: 0; /* Remove a margem superior */
        white-space: pre-wrap; /* Garante que o texto não seja quebrado inesperadamente */
    }
    img,video {
        width: 100px;
        height: 100px;
    }
    .main_content {
        display: block;
    }
    .input_class { 
        padding: 4px 8px;
    }
    *:focus {
        outline: none;
    }
    .default_padding {
        padding: 6px
    }
</style>