import LS from './LSRequest';
import { codes, countries } from "../../util/country";

const key = 'stats';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const getMapData = () => {
    const res = {};
    for (const code of codes) {
        res[code] = {
            name: countries[code],
            value: (Math.random() * Math.random() * 100).toFixed(0),
        }
    }
    return res;
}

const getData = async () => {
    return await LS.get(key, {
        activity: months.slice(0, 6).map(i => {
            return {
                name: i,
                media: Math.random() * 400,
                photos: Math.random() * 400,
                docs: Math.random() * 400,
            }
        }),
        available: [
            {
                title: "media",
                value: "85 GB",
                percent: 85,
            },
            {
                title: "docs",
                value: "25 GB",
                percent: 65,
            },
        ],
        visits: Array.from(Array(30).keys()).map(i => {
            return {
                name: i + 1,
                views: Math.random() * 400,
            }
        }),
        line: Array.from(months.keys()).map(i => {
            return {
                month: months[i],
                pv: Math.random() * 400,
                uv: Math.random() * 400,
            }
        }),
        map: getMapData(),
        space: [
            {
                "name": "Used",
                "uv": 85,
            },
            {
                "name": "Available",
                "uv": 15,
            },
        ],
        channels: [
            {
                Name: "Google",
                Views: "4200",
                Uniques: "3900",
                percent: 100,
            },
            {
                Name: "Github",
                Views: "1900",
                Uniques: "509",
                percent: 50,
            },
            {
                Name: "Producthunt",
                Views: "1500",
                Uniques: "986",
                percent: 23,
            },
            {
                Name: "Facebook",
                Views: "974",
                Uniques: "639",
                percent: 38,
            },
            {
                Name: "Twitter",
                Views: "179",
                Uniques: "57",
                percent: 67,
            },
        ],
        content: [
            {
                URL: "/",
                Views: "2500",
                Uniques: "2100",
                percent: 100,
            },
            {
                URL: "/blog/",
                Views: "376",
                Uniques: "139",
                percent: 83,
            },
            {
                URL: "/reserve/success",
                Views: "468",
                Uniques: "290",
                percent: 75,
            },
            {
                URL: "/product/product-details",
                Views: "298",
                Uniques: "176",
                percent: 64,
            },
            {
                URL: "/blog/digital-marketing",
                Views: "179",
                Uniques: "57",
                percent: 23,
            },
        ],
        views: [
            {
                value: "18.6K",
                name: "Unique Visitors",
                change: "18"
            },
            {
                value: "55.9K",
                name: "Total Pageviews",
                change: "25"
            },
            {
                value: "18.6K",
                name: "Unique Visitors",
                change: "18"
            },
            {
                value: "54%",
                name: "Bounce Rate",
                change: "-7"
            },
            {
                value: "2m 56s",
                name: "Visit Duration",
                change: "12"
            }
        ],
        visitors: [
            {
                "name": "Desktop",
                "uv": 25,
            },
            {
                "name": "Mobile",
                "uv": 52,
            },
            {
                "name": "Tablet",
                "uv": 21,
            },
            {
                "name": "Unknown",
                "uv": 2,
            },
        ],
    });
}

const getStats = async (key) => {
    return (await getData())[key];
}

export default { getStats };