interface SortData {
    title: string;
    value: string;
    direction: string;
}

const sortData: Array<SortData> = [
    { title: 'Release date', value: 'release_date', direction: 'asc' },
    { title: 'Release date', value: 'release_date', direction: 'desc' },
    { title: 'Vote', value: 'vote_average', direction: 'asc' },
    { title: 'Vote', value: 'vote_average', direction: 'desc' },
];

export default sortData;
