interface SortData {
    title: string;
    value: string;
    direction: string;
}

const sortData: Array<SortData> = [
    { title: 'Release date', value: 'release_date', direction: 'ascending' },
    { title: 'Release date', value: 'release_date', direction: 'descending' },
    { title: 'Title', value: 'title', direction: 'ascending' },
    { title: 'Title', value: 'title', direction: 'descending' },
];

export default sortData;
