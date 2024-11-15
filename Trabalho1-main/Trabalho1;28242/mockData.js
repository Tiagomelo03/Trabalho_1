// mockData.js
export const mockData = {
    profile: {
        name: "Neymar Jr",
        number: 11,
        birth: { date: "1992-02-05", age: 32 },
        height: "175 cm",
        nationality: "Brazil",
        position: "Forward",
        photo: "" // Foto do jogador
    },
    team: {
        name: "Paris Saint-Germain",
        logo: "my-photo.jpg" // Logo do time
    },
    league: {
        name: "Ligue 1",
        logo: "my-photo.jpg" // Logo da liga
    },
    news: [
        {
            title: "PSG vence o jogo da temporada",
            description: "Paris Saint-Germain venceu o principal rival com uma virada histórica.",
            url: "https://www.example.com/noticia1",
            urlToImage: "my-photo.jpg" // Imagem da notícia
        },
        {
            title: "Neymar é o destaque da vitória",
            description: "O atacante Neymar foi o principal nome da vitória do PSG.",
            url: "https://www.example.com/noticia2",
            urlToImage: "my-photo.jpg" // Imagem da notícia
        }
    ]
};
