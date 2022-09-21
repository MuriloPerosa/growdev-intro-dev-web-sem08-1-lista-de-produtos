interface Produto {
    id: number;
    nome: string;
    preco: number;
    prime: boolean;
}

const form  = document.getElementById('infos-prod') as HTMLFormElement;
const tBody = document.getElementById('tbody') as HTMLElement;
const divError = document.getElementById('msg-erro') as HTMLDivElement;

const saveProduct = (event: Event):void => {
    event.preventDefault();
    
    divError.innerHTML = "";

    const name: string   = form.nome.value;
    const price: number  = Number(form.price.value);
    const prime: boolean = form.prime.checked;

    const errors: string[] = [];

    if (!name || name.length < 2) {
        errors.push("<p>Nome inválido.</p>");
    }

    if (!price || price <= 0) {
        errors.push("<p>Preço inválido.</p>");
    }

    // recuperar produtos do LocalStorage
    const produtos: Produto[] = getProdutos();

    if (produtos.findIndex((produto: Produto) => produto.nome === name) >= 0) {
        errors.push("<p>Já existe um produto cadastro com este mesmo nome.</p>");
    }

    if (errors.length > 0) {
        divError.innerHTML = errors.join(" ");
        return;
    }

    // salvar itens no array
    produtos.push({
        id: generateId(produtos),
        nome: name,
        preco: price,
        prime: prime,
    });

   
    // atualizar a lista de produtos no LocalStorage
    updateLocalStorage(produtos);

    // preencher a tabela
    fillTable();

    // mensagem de sucesso
    alert("Produto salvo com sucesso!");
    
    // limpar formulário
    form.reset();
}

const updateLocalStorage = (produtos: Produto[]):void => {
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

const getProdutos = (): Produto[] => {
    const produtos: Produto[] = JSON.parse(localStorage.getItem('produtos') || "[]");
    return produtos;
}

const fillTable = (): void => {
    const produtos: Produto[] = getProdutos();

    tBody.innerHTML = "";

    for (const produto of produtos) {
        tBody.innerHTML += `
            <tr>
                <th>${produto.id}</th>
                <td>${produto.nome}</td>
                <td>R$ ${produto.preco}</td>
                <td>${produto.prime ? "SIM" : "NÃO"}</td>
                <td>
                    <img type="button" width="30" src="./img/delet.svg"
                    onclick="removeProduct(${produto.id})"
                    />
                </td>
            </tr>
        `;
    }
}

const removeProduct = (id: number) : void => {
    const produtos: Produto[] = getProdutos();

    const productIndex = produtos.findIndex((produto: Produto) => produto.id === id);

    if (productIndex < 0) {
        return;
    }

    produtos.splice(productIndex, 1);

    updateLocalStorage(produtos);

    alert("Produto removido com sucesso!");

    fillTable();
}

const generateId = (produtos: Produto[]) : number => {
    let nextId = produtos.length + 1;

    let index = produtos.findIndex((produto: Produto) => produto.id === nextId);

    while (index >= 0) {
        nextId++;
        index = produtos.findIndex((produto: Produto) => produto.id === nextId);
    }

    return nextId;
}

form?.addEventListener('submit', saveProduct);
document.addEventListener("DOMContentLoaded", fillTable);


const usuario = [
    {
        id: 0,
        nome: 'Murilo',
        recados: [],
    },
    {
        id: 1,
        nome: 'Larissa',
        recados: [],
    }
];

'usuarios' => usuarios 



const usuario = [
    {
        id: 0,
        nome: 'Murilo',
    },
    {
        id: 1,
        nome: 'Larissa',
    }
];

'usuarios' => usuarios 
'recados-0' = []

localStorage.getItem(getChave())

function getChave(usuario) {
    return `recados-${usuario.id}`;
}