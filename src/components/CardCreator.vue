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
                    <h3 class="text-left ml-2 default_padding attribute_title">
                        Title:
                    </h3>
                    <form>
                        <textarea v-model="card_title" name="title" id="card_title" rows="3" cols="30" class=" w-full resize-none outline-none leading-none h-16 px-2 text-ls" maxlength="200"></textarea>
                    </form>
                    <span id="nullTitle" style="display:none">
                        Fill the field title.
                    </span>
                </div>
                <div class="flex flex-col self-center bg-slate-300">
                    <h3 class="text-left ml-2 default_padding attribute_title">
                        Description:
                    </h3>
                    <form>
                        <textarea v-model="card_description" id="card_description" rows="5" name="description" cols="60" class="resize-none outline-none w-full leading-none h-16 px-2 text-ls" maxlength="450"></textarea>
                    </form>
                    <span id="nullDescription" style="display:none">
                        Fill the field description.
                    </span>
                </div>
                <div class="flex flex-col self-center bg-slate-300">
                    <h3 class="text-left ml-2 default_padding attribute_title">
                        Images:
                    </h3>
                    <label for="image_input" class="custom-file-upload">
                        Insert your image card
                    </label>
                    <input class="flex bg-slate-100 justify-center p-4" id="image_input" type="file" ref="imageInput" @change="handleFileChange" accept="image/*"/>
                </div>
                <div class="grid-cols-6 grid justify-items-center gap-4 w-full">
                    <div v-for="item in imagesUrl" :key="item.id" class="p-0">
                        <img :src="item" style="width: 100px; height: 100px"/>
                    </div>
                </div>
                <div class="flex flex-col self-center bg-slate-300">
                    <h3 class="text-left ml-2 default_padding attribute_title">
                        Features:
                    </h3>
                    <button class="bg-slate-400 default_padding" @click="addNewFeature">
                        <div class="flex-row flex w-full" style="color: black">
                            <img style="width:25px; height:25px; margin-right: 5px;" src="../assets/icons8-add-50.png"/>
                            <p class=" self-end">Add new feature</p>
                        </div>
                    </button>
                </div>
            </main>
            <div class="grid-cols-2 grid gap-2 p-4 no-hover" id="parentFeatures">
            </div>
            <span id="mensagemErro" style="display: none;">Please, fill all features informations.</span>
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
                const parent = document.getElementById("parentFeatures");
                input.classList.add('input_class');
                input2.classList.add('input_class');
                parent.appendChild(input2);
                parent.appendChild(input);
            },
            async handleFileChange(event) {
                const file = event.target.files[0]; // Pega o primeiro arquivo selecionado
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        console.log(e.target.result)
                        this.imagesUrl.push(e.target.result); // Armazena a URL da imagem para exibição
                    };
                    reader.readAsDataURL(file);
                }
                if(this.imagesUrl.length === 11) {
                    const image_input = document.getElementById('image_input');
                    image_input.disabled = true;
                }
            },
            async create_card() {
                let features = [];
                let card_title = this.card_title;
                let card_description = this.card_description;
                const parent = document.getElementById("parentFeatures");
                const mensagemErro = document.getElementById('mensagemErro');
                const inputs = parent.querySelectorAll('input');
                const nullTitle = document.getElementById('nullTitle');
                const nullDescription = document.getElementById('nullDescription');

                mensagemErro.style.display = 'none';
                nullTitle.style.display = 'none';
                nullDescription.style.display = 'none';

                for(let i = 0; i < inputs.length; i++) {
                    if(inputs[i].value.trim() === '') {
                        mensagemErro.style.display = 'block';
                        return; 
                    } else {
                        features.push(inputs[i].value)
                    }
                }

                if(card_title.trim() === '') {
                    nullTitle.style.display = 'block';

                    return;
                } else if(card_description.trim() === '') {
                    nullDescription.style.display = 'block';
                    return;
                }
                
                try {
                    console.log(inputs,'inputs')
                    const formData = new FormData();
                    console.log(this.imagesUrl[0],'IMAGES')
                    for(let i = 0; i < this.imagesUrl.length; i++) {
                        formData.append(`images[${i}]`, this.imagesUrl[i])
                    }
                    if(this.imagesUrl.length === 0) {
                        formData.append(`images[0]`,null);
                    }
                    console.log(card_title,'card_title')	
                    console.log(card_description,'card_description')
                    formData.append(`title`,card_title);
                    formData.append(`description`,card_description);
                    formData.append(`features`,features);
                    const data = new URLSearchParams(formData);
                    const response = await fetch("http://localhost:3000/createCard", {
                        method: "POST",
                        headers: {
                            "Content-type": `application/x-www-form-urlencoded`
                        },
                        body: data
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
                    console.log(error)
                }
            }
        },
        data() {
            return {
                imagesUrl: [],
                card_description: '',
                card_title: '',
            };
        }
    }
</script>

<style>
    textarea {
        padding-top: 0; /* Remove o padding superior */
        margin-top: 0; /* Remove a margem superior */
        color: black;
        white-space: pre-wrap; /* Garante que o texto não seja quebrado inesperadamente */
    }
    img,video {
        width: 100px;
        height: 100px;
    }
    input[type="file"] {
        display: none;
    }
    span {
        color: red
    }
    .main_content {
        color: black;
        display: block;
    }
    .input_class { 
        font-size: 0.875rem;
        padding: 4px 8px;
    }
    *:focus {
        outline: none;
    }
    .default_padding {
        padding: 6px
    }
    .custom-file-upload {
        border: 1px solid #ccc;
        display: inline-block;
        background-color: white;
        padding: 6px 12px;
        cursor: pointer;
    }
    .attribute_title {
        color: black
    }
</style>