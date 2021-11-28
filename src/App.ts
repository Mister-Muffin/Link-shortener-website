import Vue from "vue";
import LinkArea from "./components/LinkArea.vue";

let linksData = [] as { short: string; target: string; new: boolean }[];

const host = process.env.NODE_ENV === 'production' ? "" : "https://mr-pine.de/"

export default Vue.extend({
    name: "App",

    components: {
        LinkArea,
    },

    methods: {
        async asyncStart() {
            const res = await fetch(host + "links/api/get");
            const rawlinksData = (await res.json()) as {
                short_uri: string;
                destination_url: string;
            }[];
            rawlinksData.forEach((element) => {
                linksData = [
                    {
                        short: element.short_uri,
                        target: element.destination_url,
                        new: false,
                    },
                ].concat(linksData);
            });
            linksData = [{ short: "", target: "", new: true }].concat(linksData);
            this.links = linksData
            console.log(linksData);
        },
        async addLink(data: { short: string, target: string }) {
            if (this.links.find(element => element.short == data.short)) return
            console.log(data);
            const res = await fetch(host + "links/api/add", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (res.status == 200) {
                linksData.splice(
                    0,
                    1,
                    ...[
                        { short: "", target: "", new: true },
                        { short: data.short, target: data.target, new: false },
                    ]
                );
                this.links = linksData
            }
        },
        async deleteLink(short: string) {
            const res = await fetch(host + "links/api/delete", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({short: short})
            })
            if (res.status == 200) {
                linksData.splice(
                    linksData.findIndex(element => element.short == short),
                    1,
                );
                this.links = linksData
            }
        },
        async editLink(data: {short: string, target: string, oldShort: string}){
            const res = await fetch(host + "links/api/edit", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            console.log(res.status)
        }
    },

    created() {
        this.asyncStart()
    },

    data: () => ({
        links: linksData,
    }),
});