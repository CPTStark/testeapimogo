const btnFetchApi = document.getElementById('fetch-api');

let isLoading = false

function loading() {
    const loaderModal = document.getElementById('loader')

    if(isLoading) {
        loaderModal.classList.remove('hidden')
    } else {
        loaderModal.classList.add('hidden')
    }
}

async function fetchRelatorioPagamentos(url, token) {
    try {
        isLoading = true
        loading()

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        })

        if(!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();

        dataModalReport(JSON.parse(`${data}`))

    } catch (err) {
        throw new Error(`Erro ao buscar relatório de pagamentos ${err}`)
    } finally {
        isLoading = false
        loading()
    }
}

btnFetchApi.addEventListener('click', () => {
    const urlValue = document.getElementById('url-input').value;
    let tokenValue = document.getElementById('token-input').value;
    tokenValue = `Token ${tokenValue}`

    fetchRelatorioPagamentos(urlValue, tokenValue)
})

function dataModalReport(data) {
    const main = document.querySelector('main');

    const rows = data.map(item => `
        <div class="table-row">
            <div class="text-elipses">${item.Cartao || ""}</div>
            <div class="text-elipses">${item.Data || ""}</div>
            <div class="text-elipses">${item.Hora || ""}</div>
            <div class="text-elipses">${item.ItensPagos || ""}</div>
            <div class="text-elipses">${item.Mesa || ""}</div>
            <div class="text-elipses">${item.Nome || ""}</div>
            <div class="text-elipses">${item.NumeroPedido || ""}</div>
            <div class="text-elipses">${item.Pedido || ""}</div>
            <div class="text-elipses">${item.TaxaServico || ""}</div>
            <div class="text-elipses">${item.TipoPagamento || ""}</div>
            <div class="text-elipses">${item.Usuario || ""}</div>
            <div class="text-elipses">${item.Valor || ""}</div>
            <div class="text-elipses">${item.ValorTotal || ""}</div>
            <div class="text-elipses">${item.Caixa || ""}</div>
        </div>
    `).join('');

    const report = `
        <div class="table">
            <div>
                <div class="header-table">
                    <div class="text-elipses">Cartão</div>
                    <div class="text-elipses">Data</div>
                    <div class="text-elipses">Hora</div>
                    <div class="text-elipses">Itens Pagos</div>
                    <div class="text-elipses">Mesa</div>
                    <div class="text-elipses">Nome</div>
                    <div class="text-elipses">Número do Pedido</div>
                    <div class="text-elipses">Pedido</div>
                    <div class="text-elipses">Taxa de serviço</div>
                    <div class="text-elipses">Tipo de pagamento</div>
                    <div class="text-elipses">Usuário</div>
                    <div class="text-elipses">Valor</div>
                    <div class="text-elipses">Valor Total</div>
                    <div class="text-elipses">Caixa</div>
                </div>
            </div>
            <div class="table-body">
                ${rows}
            </div>
        </div>
    `;

    main.innerHTML = report;
}
