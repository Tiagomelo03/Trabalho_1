
const useMockData = false;  // Altere para 'false' para usar dados reais

const mockData = {
    profile: {
        name: "Neymar Jr",
        number: 11,
        birth: { date: "1992-02-05", age: 32 },
        height: "175 cm",
        nationality: "Brazil",
        position: "Forward",
        photo:"images/bunito.png" // Aqui você coloca o caminho da sua foto
    },
    team: {
        name: "Paris Saint-Germain",
        logo: "images/1075.png" // Aqui você coloca o caminho da sua foto para o logo do time
    },
    league: {
        name: "Ligue 1",
        logo: "images/bunito.png",
    },
    news: [
        {
            title: "PSG vence o jogo da temporada",
            description: "Paris Saint-Germain venceu o principal rival com uma virada histórica mas depois o pexie caiu e afundou uam ghirsoria naubd yeye ehdhdn ehend quadnahu duusbd.",
            url: "https://www.example.com/noticia1",
            urlToImage: "images/bunito.png" // Aqui você coloca o caminho da sua foto para a imagem da notícia
        },
        {
            title: "Neymar é o destaque da vitória",
            description: "O atacante Neymar foi o principal nome da vitória do PSG.",
            url: "https://www.example.com/noticia2",
            urlToImage: "images/bunito.png" // Aqui você coloca o caminho da sua foto para a imagem da notícia
        },
        {
            title: "Neymar é o destaque da vitória",
            description: "O atacante Neymar foi o principal nome da vitória do PSG.",
            url: "https://www.example.com/noticia2",
            urlToImage: "images/bunito.png" // Aqui você coloca o caminho da sua foto para a imagem da notícia
        },
        {
            title: "Neymar é o destaque da vitória",
            description: "O atacante Neymar foi o principal nome da vitória do PSG.",
            url: "https://www.example.com/noticia2",
            urlToImage: "images/bunito.png" // Aqui você coloca o caminho da sua foto para a imagem da notícia
        }
        
    ]
};

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const playerId = urlParams.get('id');
    console.log("Player ID:", playerId);

    if (!playerId) {
        alert('ID do jogador não encontrado.');
        return;
    }

    try {
        // Se useMockData for true, usará mockData em vez de fazer requisições
        let profileData, teamsData, leagueData, newsData;

        if (useMockData) {
            profileData = { response: [{ player: mockData.profile }] };
            teamsData = { response: [{ team: mockData.team }] };
            leagueData = { response: [{ league: mockData.league }] };
            newsData = { articles: mockData.news };
        } else {
            // Fetch player profile
            const profileResponse = await fetch(`https://v3.football.api-sports.io/players/profiles?player=${playerId}`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'v3.football.api-sports.io',
                    'x-rapidapi-key': 'df4cf89e8cf7bf7666b7805ee74d24a6'
                }
            });

            if (!profileResponse.ok) {
                throw new Error(`Erro na requisição: ${profileResponse.status}`);
            }

            profileData = await profileResponse.json();

            // Fetch player teams
            const teamsResponse = await fetch(`https://v3.football.api-sports.io/players/teams?player=${playerId}`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'v3.football.api-sports.io',
                    'x-rapidapi-key': 'df4cf89e8cf7bf7666b7805ee74d24a6'
                }
            });

            if (!teamsResponse.ok) {
                throw new Error(`Erro na requisição: ${teamsResponse.status}`);
            }

            teamsData = await teamsResponse.json();

            // Fetch league information
            const leagueResponse = await fetch(`https://v3.football.api-sports.io/leagues?team=${teamsData.response[0].team.id}`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'v3.football.api-sports.io',
                    'x-rapidapi-key': 'df4cf89e8cf7bf7666b7805ee74d24a6'
                }
            });

            if (!leagueResponse.ok) {
                throw new Error(`Erro na requisição: ${leagueResponse.status}`);
            }

            leagueData = await leagueResponse.json();

            // Fetch news
            const newsResponse = await fetch(`https://newsapi.org/v2/everything?q=${teamsData.response[0].team.name}+futebol&apiKey=c6f0288867354f7d98e25bb13dafe667&language=pt`);
            if (!newsResponse.ok) {
                throw new Error(`Erro na requisição de notícias: ${newsResponse.status}`);
            }

            newsData = await newsResponse.json();
        }

        // Exibe os dados do jogador
        const player = profileData.response[0].player;
        const playerProfileDiv = document.getElementById('player-profile');
        playerProfileDiv.innerHTML = `
            <div class="profile-quadrado">
        <h4 class="playername"> #${player.number} ${player.name}</h4>
        <img src="${player.photo}" alt="Foto do Jogador" class="player-photo">
        <p class="player-birth"> Nasc./Idade:<strong> ${player.birth.date} (${player.age})</strong></p>
        <p class="player-height"> Altura:<strong> ${player.height}</strong></p>
        <p class="player-nationality">
            Nacionalidade:
            <img src="${getFlagUrl(player.nationality)}" alt="Bandeira" class="flag-icon"> <strong>
            ${player.nationality}</strong>
        </p>
        <p class="player-position">Posição:<strong> ${player.position}</strong></p>
        <div class="barra-lateral"></div>
        <div class="bottom-bar"></div>
    </div>
            
        `;

        // Exibe os dados do time
        const team = teamsData.response[0].team;
        playerProfileDiv.innerHTML += `
           <div class="clube-quadrado">
            <p class="Equipa"><strong> ${team.name} </strong></p>
            <img src="${team.logo}" alt="Logo da Equipe" class="foto-equipa">
            </div>
        `;

        // Exibe os dados da liga
        const league = leagueData.response[0].league;
        playerProfileDiv.innerHTML += `
            <p class="liga"><strong> ${league.name}</strong></p>
            <img src="${league.logo}" alt="Logo da Liga" class="foto-liga">
        `;

        // Exibe as notícias
        const newsDiv = document.getElementById('team-news');
        newsDiv.innerHTML = '<h3 class="notitulo">Notícias Relacionadas:</h3>';

        const newsContainer = newsDiv.querySelector('.news-container');
        const limitedNews = newsData.articles.slice(0, 3); // Pega os primeiros 3 artigos
        newsData.articles.forEach(article => {
            newsDiv.innerHTML += `
                <div class="news-item">
                    <h4><a href="${article.url}" target="_blank">${article.title}</a></h4>
                    <p>${article.description}</p>
                    <img src="${article.urlToImage}" alt="Imagem da notícia" class="foto-noticia">
                </div>
            `;
        });

    } catch (error) {
        console.error('Erro ao buscar informações:', error);
        alert('Erro ao buscar informações. Tente novamente mais tarde.');
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