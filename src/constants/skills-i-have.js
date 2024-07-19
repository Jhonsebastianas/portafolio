import moment from "moment";

const yearsWorkAsBackendDeveloper = moment().diff(new Date(2017, 7, 20), 'years');
const yearsWorkAsFrontendDeveloper = moment().diff(new Date(2017, 12, 20), 'years');

const yearsDevelopingSoftSkills = moment().diff(new Date(2015, 1, 1), 'years');
const yearsDevelopingVideoDesignSkills = moment().diff(new Date(2022, 1, 1), 'years');


const abilities = [
    {
        title: 'Backend developer',
        subtitle: `More than ${yearsWorkAsBackendDeveloper} years`,
        icon: 'uil-server-network-alt',
        skills: [
            {
                name: 'Java',
            },
            {
                name: 'Nest.js',
            },
            {
                name: 'Node.js',
            },
            {
                name: 'Express.js',
            },
            {
                name: 'Oracle',
            },
            {
                name: 'Mongodb',
            },
            {
                name: 'RabbitMQ',
            },
        ],
    },
    {
        title: 'Frontend developer',
        subtitle: `More than ${yearsWorkAsFrontendDeveloper} years`,
        icon: 'uil-brackets-curly',
        skills: [
            {
                name: 'JavaScript',
            },
            {
                name: 'React.js',
            },
            {
                name: 'Angular',
            },
            {
                name: 'CSS',
            },
            {
                name: 'Styled component',
            },
        ],
    },
    {
        title: 'Automation developer',
        subtitle: 'More than 2 years',
        icon: 'uil-robot',
        skills: [
            {
                name: 'Automation testing',
            },
            {
                name: 'Katalon Studio',
            },
            {
                name: 'Puppeteer',
            },
            {
                name: 'Selenium',
            },
        ]
    },
    {
        title: 'Internet of things developer',
        subtitle: 'More than 1 years',
        icon: 'uil-intercom-alt',
        skills: [
            {
                name: 'Python',
            },
            {
                name: 'Raspberry pi',
            },
            {
                name: 'C++',
            },
            {
                name: 'Arduino',
            },
        ],
    },
    {
        title: 'Soft skills',
        subtitle: `More than ${yearsDevelopingSoftSkills} years`,
        icon: 'uil-heart-medical',
        skills: [
            {
                name: 'Teamwork',
            },
            {
                name: 'Leadership',
            },
            {
                name: 'Teach',
            },
            {
                name: 'Conflict resolution',
            },
            {
                name: 'Assertive communication',
            },
        ],
    },
    {
        title: 'Video and design',
        subtitle: `More than ${yearsDevelopingVideoDesignSkills} years`,
        icon: 'uil-th-slash',
        skills: [
            {
                name: 'Canva',
            },
            {
                name: 'Adobe Illustrator',
            },
            {
                name: 'DaVinci Resolve',
            },
        ],
    },
]
export default abilities