export interface FilmData {
    id: number;
    title: string;
    tagline: string;
    vote_average: number;
    vote_count: number;
    release_date: string;
    poster_path: string;
    overview: string;
    budget: number;
    revenue: number;
    genres: Array<string>;
    runtime: number;
}

const filmsData: Array<FilmData> = [
    {
        id: 181808,
        title: 'Star Wars: The Last Jedi',
        tagline: 'The Saga Continues',
        vote_average: 7.1,
        vote_count: 4732,
        release_date: '2017-12-13',
        poster_path:
            'https://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg',
        overview:
            'Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.',
        budget: 200000000,
        revenue: 1325937250,
        genres: ['Fantasy', 'Adventure', 'Science Fiction'],
        runtime: 152,
    },
    {
        id: 284054,
        title: 'Black Panther',
        tagline: 'Long live the king',
        vote_average: 7.3,
        vote_count: 3788,
        release_date: '2018-02-13',
        poster_path:
            'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
        overview:
            "King T'Challa returns home from America to the reclusive, technologically advanced African nation of Wakanda to serve as his country's new leader. However, T'Challa soon finds that he is challenged for the throne by factions within his own country as well as without.  Using powers reserved to Wakandan kings, T'Challa assumes the Black Panther mantel to join with girlfriend Nakia, the queen-mother, his princess-kid sister,  members of the Dora Milaje (the Wakandan \"special forces\"), and an American secret agent, to prevent Wakanda from being dragged into a world war.",
        budget: 200000000,
        revenue: 1245257672,
        genres: ['Action', 'Adventure', 'Fantasy', 'Science Fiction'],
        runtime: 134,
    },
    {
        id: 354912,
        title: 'Coco',
        tagline: 'The celebration of a lifetime',
        vote_average: 7.8,
        vote_count: 3619,
        release_date: '2017-10-27',
        poster_path:
            'https://image.tmdb.org/t/p/w500/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg',
        overview:
            "Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguel's family history.",
        budget: 175000000,
        revenue: 700920729,
        genres: ['Adventure', 'Comedy', 'Family', 'Animation'],
        runtime: 105,
    },
    {
        id: 333339,
        title: 'Ready Player One',
        tagline: 'A better reality awaits.',
        vote_average: 8.1,
        vote_count: 617,
        release_date: '2018-03-28',
        poster_path:
            'https://image.tmdb.org/t/p/w500/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg',
        overview:
            'When the creator of a popular video game system dies, a virtual contest is created to compete for his fortune.',
        budget: 175000000,
        revenue: 0,
        genres: ['Adventure', 'Science Fiction', 'Action'],
        runtime: 140,
    },
    {
        id: 338970,
        title: 'Tomb Raider',
        tagline: 'Her legend begins',
        vote_average: 6.2,
        vote_count: 817,
        release_date: '2018-03-08',
        poster_path:
            'https://image.tmdb.org/t/p/w500/ePyN2nX9t8SOl70eRW47Q29zUFO.jpg',
        overview:
            'Lara Croft, the fiercely independent daughter of a missing adventurer, must push herself beyond her limits when she finds herself on the island where her father disappeared.',
        budget: 94000000,
        revenue: 126025000,
        genres: ['Action', 'Adventure'],
        runtime: 118,
    },
    {
        id: 284053,
        title: 'Thor: Ragnarok',
        tagline: 'No Hammer. No Problem.',
        vote_average: 7.4,
        vote_count: 5349,
        release_date: '2017-10-25',
        poster_path:
            'https://image.tmdb.org/t/p/w500/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg',
        overview:
            'Thor is imprisoned on the other side of the universe and finds himself in a race against time to get back to Asgard to stop Ragnarok, the prophecy of destruction to his homeworld and the end of Asgardian civilization, at the hands of an all-powerful new threat, the ruthless Hela.',
        budget: 180000000,
        revenue: 854229371,
        genres: ['Action', 'Adventure', 'Fantasy'],
        runtime: 130,
    },
    {
        id: 321612,
        title: 'Beauty and the Beast',
        tagline: 'Be our guest.',
        vote_average: 6.8,
        vote_count: 7861,
        release_date: '2017-03-16',
        poster_path:
            'https://image.tmdb.org/t/p/w500/tWqifoYuwLETmmasnGHO7xBjEtt.jpg',
        overview:
            "A live-action adaptation of Disney's version of the classic tale of a cursed prince and a beautiful young woman who helps him break the spell.",
        budget: 160000000,
        revenue: 1263521126,
        genres: ['Family', 'Fantasy', 'Romance'],
        runtime: 129,
    },
    {
        id: 399055,
        title: 'The Shape of Water',
        tagline: 'A Fairy Tale for Troubled Times',
        vote_average: 7.3,
        vote_count: 3200,
        release_date: '2017-12-01',
        poster_path:
            'https://image.tmdb.org/t/p/w500/k4FwHlMhuRR5BISY2Gm2QZHlH5Q.jpg',
        overview:
            'An other-worldly story, set against the backdrop of Cold War era America circa 1962, where a mute janitor working at a lab falls in love with an amphibious man being held captive there and devises a plan to help him escape.',
        budget: 19500000,
        revenue: 185545281,
        genres: ['Drama', 'Fantasy', 'Romance'],
        runtime: 123,
    },
    {
        id: 141052,
        title: 'Justice League',
        tagline: '',
        vote_average: 6.4,
        vote_count: 3960,
        release_date: '2017-11-15',
        poster_path:
            'https://image.tmdb.org/t/p/w500/eifGNCSDuxJeS1loAXil5bIGgvC.jpg',
        overview:
            "Fuelled by his restored faith in humanity and inspired by Superman's selfless act, Bruce Wayne and Diana Prince assemble a team of metahumans consisting of Barry Allen, Arthur Curry and Victor Stone to face the catastrophic threat of Steppenwolf and the Parademons who are on the hunt for three Mother Boxes on Earth.",
        budget: 500000000,
        revenue: 655894816,
        genres: ['Action', 'Adventure', 'Fantasy', 'Science Fiction'],
        runtime: 120,
    },
    {
        id: 268896,
        title: 'Pacific Rim: Uprising',
        tagline: 'Rise Up',
        vote_average: 6,
        vote_count: 318,
        release_date: '2018-03-21',
        poster_path:
            'https://image.tmdb.org/t/p/w500/v5HlmJK9bdeHxN2QhaFP1ivjX3U.jpg',
        overview:
            'It has been ten years since The Battle of the Breach and the oceans are still, but restless. Vindicated by the victory at the Breach, the Jaeger program has evolved into the most powerful global defense force in human history. The PPDC now calls upon the best and brightest to rise up and become the next generation of heroes when the Kaiju threat returns.',
        budget: 150000000,
        revenue: 150613316,
        genres: ['Action', 'Fantasy', 'Science Fiction', 'Adventure'],
        runtime: 111,
    },
    {
        id: 335984,
        title: 'Blade Runner 2049',
        tagline: "There's still a page left.",
        vote_average: 7.3,
        vote_count: 3955,
        release_date: '2017-10-04',
        poster_path:
            'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
        overview:
            "Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos. K's discovery leads him on a quest to find Rick Deckard, a former LAPD blade runner who has been missing for 30 years.",
        budget: 150000000,
        revenue: 259239658,
        genres: ['Mystery', 'Science Fiction', 'Thriller'],
        runtime: 163,
    },
    {
        id: 337170,
        title: 'American Made',
        tagline: 'Based on a True Lie',
        vote_average: 6.6,
        vote_count: 1218,
        release_date: '2017-08-17',
        poster_path:
            'https://image.tmdb.org/t/p/w500/23ILgoPSO5ShKcTZOuiTVfqFAUB.jpg',
        overview:
            'The true story of pilot Barry Seal, who transported contraband for the CIA and the Medellin cartel in the 1980s.',
        budget: 50000000,
        revenue: 133511855,
        genres: ['Action', 'Comedy', 'Crime', 'History'],
        runtime: 115,
    },
];

export default filmsData;
