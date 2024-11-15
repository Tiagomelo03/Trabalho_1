const useMockData = false;  // Alterar para 'false' para usar dados reais

const mockData = {
    response: [
        {
            player: {
                id: 1,
                name: "Neymar Jr",
                photo: "images/bunito.png",  // URL de imagem fictícia
                nationality: "Brazil",
                position: "Attacker"
    
            }
        },
        {
            player: {
                id: 2,
                name: "Lionel Messi",
                photo: "images/bunito.png",
                nationality: "Argentina",
                position: "Attacker"

            }
        },
        {
            player: {
                id: 3,
                name: "Cristiano Ronaldo",
                photo: "images/bunito.png",
                nationality: "Portugal",
                position: "Attacker"
                
            

            }
        },
        // Adicione outros jogadores conforme necessário
    ]
};

// Carregar a lista de jogadores ao carregar o documento
document.addEventListener('DOMContentLoaded', function() {
    const playerName = new URLSearchParams(window.location.search).get('search');
    const playerList = document.getElementById('player-list');
    const resultsCount = document.getElementById('results-count');
    playerList.innerHTML = ''; // Limpa a lista antes de mostrar novos resultados

    function displayPlayers(data) {
        const players = data.response;
        resultsCount.textContent = `RESULTADOS DE PESQUISA - ${players.length} RESULTADOS`;
        if (players.length > 0) {
            players.forEach(player => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                     <div class="lista-quadrado">
                    <img src="${player.player.photo}" alt="Foto de ${player.player.name}" class="jogadorlista">
                    <span class="player-name">${player.player.name}</span>
                   <img src="${getFlagUrl(player.player.nationality)}" alt="Bandeira de ${player.player.nationality}" class="bandeiralista">
                    <span class="player-posicao">${player.player.position}</span>
                   </div>


                `;
                listItem.style.cursor = 'pointer';
                listItem.addEventListener('click', () => {
                    window.location.href = `perfil.html?id=${player.player.id}`;
                });
                playerList.appendChild(listItem);
            });
        } else {
            const noResultsItem = document.createElement('li');
            noResultsItem.textContent = 'Nenhum jogador encontrado.';
            playerList.appendChild(noResultsItem);
        }
    }

    if (useMockData) {
        displayPlayers(mockData); // Usa os dados fictícios
    } else if (playerName) {
        // Fetch de dados reais da API
        fetch(`https://v3.football.api-sports.io/players/profiles?search=${playerName}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': 'df4cf89e8cf7bf7666b7805ee74d24a6' // Sua chave de API
            }
        })
        


        .then(response => response.json())
        .then(data => displayPlayers(data))
        .catch(error => {
            console.error('Erro ao buscar jogadores:', error);
            const errorItem = document.createElement('li');
            errorItem.textContent = 'Erro ao buscar jogadores. Tente novamente mais tarde.';
            playerList.appendChild(errorItem);
        });
    } else {
        const errorItem = document.createElement('li');
        errorItem.textContent = 'Nenhum nome de jogador fornecido.';
        playerList.appendChild(errorItem);
    }
});

function getFlagUrl(nationality) {
    const countryCodes = {
        "Brazil": "br",
        "France": "fr",
        "Germany": "de",
        "Portugal": "pt",
        "Spain": "es",
        "Italy": "it",
        "England": "gb",
        "Argentina": "ar",
        "Netherlands": "nl",
        "Belgium": "be",
        "Mexico": "mx",
        "United States": "us",
        "Canada": "ca",
        "Japan": "jp",
        "South Korea": "kr",
        "Russia": "ru",
        "Australia": "au",
        "Sweden": "se",
        "Norway": "no",
        "Denmark": "dk",
        "Switzerland": "ch",
        "China": "cn",
        "India": "in",
        "Saudi Arabia": "sa",
        "Egypt": "eg",
        "Uruguay": "uy",
        "Chile": "cl",
        "Colombia": "co",
        "Peru": "pe",
        "Turkey": "tr",
        "Croatia": "hr",
        "Poland": "pl",
        "Greece": "gr",
        "New Zealand": "nz",
        "South Africa": "za",
        "Qatar": "qa",
        "Nigeria": "ng",
        "Ghana": "gh",
        "Morocco": "ma",
        "Algeria": "dz",
        "Venezuela": "ve",
        "Paraguay": "py",
        "Bolivia": "bo",
        "Ecuador": "ec",
        "Austria": "at",
        "Czech Republic": "cz",
        "Finland": "fi",
        "Iceland": "is",
        "Ireland": "ie",
        "Ukraine": "ua",
        "Romania": "ro",
        "Hungary": "hu",
        "Slovakia": "sk",
        "Slovenia": "si",
        "Serbia": "rs",
        "Bulgaria": "bg",
        "Estonia": "ee",
        "Latvia": "lv",
        "Lithuania": "lt",
        "Luxembourg": "lu",
        "Thailand": "th",
        "Vietnam": "vn",
        "Malaysia": "my",
        "Indonesia": "id",
        "Philippines": "ph",
        "Singapore": "sg",
        "Pakistan": "pk",
        "Bangladesh": "bd",
        "United Arab Emirates": "ae",
        "Kuwait": "kw",
        "Oman": "om",
        "Jordan": "jo",
        "Lebanon": "lb",
        "Iraq": "iq",
        "Iran": "ir"

    };
    const code = countryCodes[nationality];
    return code ? `https://media.api-sports.io/flags/${code}.svg` : '';
}
