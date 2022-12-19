import { HomeOutlined, QuestionOutlined } from '@ant-design/icons'
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings'
import Backpack from '@mui/icons-material/Backpack'
import CardGiftcard from '@mui/icons-material/CardGiftcard'
import CardMembership from '@mui/icons-material/CardMembership'
import Messages from '@mui/icons-material/Forum'
import Group from '@mui/icons-material/Group'
import LocalAtm from '@mui/icons-material/LocalAtm'
import Receipt from '@mui/icons-material/Receipt'
import GroupsIcon from '@mui/icons-material/Groups';
import Segment from '@mui/icons-material/Segment'
import QuizIcon from '@mui/icons-material/Quiz'
import Summarize from '@mui/icons-material/Summarize'
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import MoneyIcon from '@mui/icons-material/Money';
import PaidIcon from '@mui/icons-material/Paid';
import apiUrl from '../Config/api'
import allPaths from '../Config/paths'

const bgColor = '#0adc00'
const googleClientId = '202056254581-atll6adadjh6hpum280usr41a6o7uvhc.apps.googleusercontent.com'

const drawerRoutes = [
    {
        title: 'Home',
        route: allPaths.HOME,
        icon: <HomeOutlined />
    },
    // {
    //     title: 'Segments',
    //     route: allPaths?.SEGMENTS,
    //     icon: <Segment />
    // },
    {
        title: 'Guests',
        route: allPaths.GUEST,
        icon: <Group />
    },
    // {
    //     title: 'Messages',
    //     route: allPaths.MESSAGES,
    //     icon: <Messages />
    // },
    {
        title: 'Subscription',
        route: allPaths.SUBSCRIPTION,
        icon: <CardMembership />
    },
    // {
    //     title: 'BU Users',
    //     route: allPaths.BU_USERS,
    //     icon: <UserOutlined />
    // },
    {
        title: 'Invoices',
        route: allPaths.INVOIICES,
        icon: <Receipt />
    },
    // {
    //     title: 'Group',
    //     route: allPaths.GROUP,
    //     icon: <GroupsIcon />
    // }

]

const drawerAdminRoutes = [
    {
        title: 'Segments',
        route: allPaths.ADMIN_SEGMENTS,
        icon: <Segment />
    },
    {
        title: 'Questions',
        route: allPaths.ADMIN_QUESTION,
        icon: <QuizIcon />
    },
    {
        title: 'Cards',
        route: allPaths.ADMIN_CARDS,
        icon: <CardGiftcard />
    },
    {
        title: 'Users',
        route: allPaths.USERS,
        icon: <Group />
    },
    {
        title: 'User Invoices',
        route: allPaths.USER_INVOICES,
        icon: <Receipt />
    },
    {
        title: 'Price Setting',
        route: allPaths.ADMIN_PRICE_SETTINGS,
        icon: <AdminPanelSettings />
    },
    {
        title: 'Messages List',
        route: allPaths.MESSAGES_LIST,
        icon: <Messages />
    },
    {
        title: 'Reports',
        route: allPaths.REPORT,
        isSubMenu: true,
        icon: <Summarize />,
        children: [
            {
                title: 'Message Report',
                route: allPaths.MESSAGE_REPORT,
                icon: <Messages />
            },
            {
                title: 'Financial Report',
                route: allPaths.FINANCIAL_REPORT,
                icon: <LocalAtm />
            },
            {
                title: 'Stock Report',
                route: allPaths.STOCK_REPORT,
                icon: <Backpack />
            },
            {
                title: 'Form Report',
                route: allPaths.QUESTION_FORM_REPORT,
                icon: <Backpack />
            },
            {
                title: 'Provision Report',
                route: allPaths.PROVISION_REPORTS,
                icon: <Backpack />
            },
        ]
    },
    {
        title: 'Ads',
        route: allPaths.ADMIN_ADVERTISEMENT,
        icon: <AdUnitsIcon />
    },
    {
        title: 'Postal Cards',
        route: allPaths.POSTAL_CARDS,
        icon: <CardGiftcard />
    },
    {
        title: 'Loyalty Cards',
        route: allPaths.LOYALTY_CARDS,
        icon: <CardGiftcard />
    },
    {
        title: 'Lottery',
        route: allPaths.ADMIN_LOTTERY,
        icon: <MoneyIcon />
    },
    {
        title: 'Gift Cards',
        route: allPaths.ADMIN_GIFT_CARDS,
        icon: <CardGiftcard />
    },
    {
        title: 'Cashback',
        route: allPaths.ADMIN_CASHBACK,
        icon: <PaidIcon />
    },
    {
        title: 'Groups',
        route: allPaths.ADMIN_GROUP,
        icon: <GroupsIcon />
    }
]

const segmentForm = [
    [
        {
            name: 'message1',
            label: 'Message 1',
            required: true,
            draft: true
        },
        {
            name: 'date1',
            label: 'Date 1',
            required: true
        },
        {
            name: 'card1',
            label: 'Card 1',
            required: true
        },
        {
            name: 'fullCardUrl1',
            label: 'Full Card 1 Preview'
        },
        {
            name: 'sendingDate1',
            label: 'Sending Date 1'
        },
        {
            name: 'sendingType1',
            label: 'Sending Type',
            required: true
        },
        {
            name: 'whatsapp1',
            label: 'Whatsapp',
            required: true
        },
        {
            name: 'postalCard1',
            label: 'Postal Card',
            required: true
        },
        {
            name: 'hour1',
            label: 'Hour',
            required: true
        },
        {
            name: 'absolute1',
            label: 'Absolute Date',
            required: false
        }
    ],
    [
        {
            name: 'message2',
            label: 'Message 2',
            required: false,
            draft: true
        },
        {
            name: 'date2',
            label: 'Date 2',
            required: false
        },
        {
            name: 'card2',
            label: 'Card 2',
            required: false
        },
        {
            name: 'fullCardUrl2',
            label: 'Full Card 2 Preview'
        },
        {
            name: 'sendingDate2',
            label: 'Sending Date 2'
        },
        {
            name: 'sendingType2',
            label: 'Sending Type',
            required: true
        },
        {
            name: 'whatsapp2',
            label: 'Whatsapp',
            required: false
        },
        {
            name: 'postalCard2',
            label: 'Postal Card',
            required: false
        },
        {
            name: 'hour2',
            label: 'Hour',
            required: false
        },
        {
            name: 'absolute2',
            label: 'Absolute Date',
            required: false
        }
    ],
    [
        {
            name: 'message3',
            label: 'Message 3',
            required: false,
            draft: true
        },
        {
            name: 'date3',
            label: 'Date 3',
            required: false
        },
        {
            name: 'card3',
            label: 'Card 3',
            required: false
        },
        {
            name: 'fullCardUrl3',
            label: 'Full Card 3 Preview'
        },
        {
            name: 'sendingDate3',
            label: 'Sending Date 3'
        },
        {
            name: 'sendingType3',
            label: 'Sending Type',
            required: true
        },
        {
            name: 'whatsapp3',
            label: 'Whatsapp',
            required: false
        },
        {
            name: 'postalCard3',
            label: 'Postal Card',
            required: false
        },
        {
            name: 'hour3',
            label: 'Hour',
            required: false
        },
        {
            name: 'absolute3',
            label: 'Absolute Date',
            required: false
        }
    ],
    [
        {
            name: 'message4',
            label: 'Message 4',
            required: false,
            draft: true
        },
        {
            name: 'date4',
            label: 'Date 4',
            required: false
        },
        {
            name: 'card4',
            label: 'Card 4',
            required: false
        },
        {
            name: 'fullCardUrl4',
            label: 'Full Card 4 Preview'
        },
        {
            name: 'sendingDate4',
            label: 'Sending Date 4'
        },
        {
            name: 'sendingType4',
            label: 'Sending Type',
            required: true
        },
        {
            name: 'whatsapp4',
            label: 'Whatsapp',
            required: false
        },
        {
            name: 'postalCard4',
            label: 'Postal Card',
            required: false
        },
        {
            name: 'hour4',
            label: 'Hour',
            required: false
        },
        {
            name: 'absolute4',
            label: 'Absolute Date',
            required: false
        }
    ],
    [
        {
            name: 'message5',
            label: 'Message 5',
            required: false,
            draft: true
        },
        {
            name: 'date5',
            label: 'Date 5',
            required: false
        },
        {
            name: 'card5',
            label: 'Card 5',
            required: false
        },
        {
            name: 'fullCardUrl5',
            label: 'Full Card 5 Preview'
        },
        {
            name: 'sendingDate5',
            label: 'Sending Date 5'
        },
        {
            name: 'sendingType5',
            label: 'Sending Type',
            required: true
        },
        {
            name: 'whatsapp5',
            label: 'Whatsapp',
            required: false
        },
        {
            name: 'postalCard5',
            label: 'Postal Card',
            required: false
        },
        {
            name: 'hour5',
            label: 'Hour',
            required: false
        },
        {
            name: 'absolute5',
            label: 'Absolute Date',
            required: false
        }
    ]
]

const zeroString = '00'

var timeArray = [zeroString, ...Array.from(Array(96).keys()).map(v => String((v + 1) * 15))]

const constraints = {
    facingMode: { exact: 'environment' }
}


export {
    bgColor,
    drawerRoutes,
    googleClientId,
    allPaths,
    drawerAdminRoutes,
    segmentForm,
    apiUrl,
    timeArray,
    constraints
}

