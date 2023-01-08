
import { Flipside } from "../../libs/@flipsidecrypto/sdk"
export const flipSide = {
    data: function () {
        return {
            apiLoding: false,
            colors: ['rgba(21,91,255,0.8)', 'rgba(255,71,87,0.8)', '#4CD7D0', '#F9D030', '#A16AE8', '#A1A9FE', '#F6D4D2', '#F41F4E']
        }
    },
    methods: {
        async sendFlipSideApi() {
            try {
                // 1.validate request
                const ak = process.env.VUE_APP_AK;
                if (!this.queryName || !this.namespace || !ak) {
                    console.log("no namespace or query or ak provided !");
                    return;
                }
                // 2. cehck if result already exist
                const _query = this.$store.getters[`${this.namespace}/getQueries`][this.queryName];
                if (_query.result) return;
                // 3.send api.
                this.apiLoding = true;
                const flipside = new Flipside(ak);

                const response = await flipside.query.run({
                    sql: _query.sql,
                    cached: true,
                    ttlMinutes: 30,
                });
                if(response.error) {
                    console.log(this.queryName);
                }
                // 3.save resutl
                this.$store.commit(`${this.namespace}/setQueryResult`, {
                    query: this.queryName,
                    result: response
                });
            } catch (e) {
                console.log(e.response || e);
                console.log("--------");
                console.log(this.queryName);
            } finally {
                this.apiLoding = false;
            }
        },
        sortHandler(a, b) {
            if (this.sort.type === "asc") {
                return a[this.sort.by] - b[this.sort.by];
            } else {
                return b[this.sort.by] - a[this.sort.by];
            }
        },
        sortDateHandler(a, b) {
            if (this.sortDate.type === "asc") {
                return new Date(a[this.sortDate.by]) - new Date(b[this.sortDate.by]);
            } else {
                return new Date(b[this.sortDate.by]) - new Date(a[this.sortDate.by]);
            }
        },
        groupByHandler(by, data) {
            const _data = data.reduce((group, item) => {
                const _by = item[by]
                group[_by] = group[_by] ?? [];
                group[_by].push(item);
                return group;
            }, {});
            return _data;
        },
        sumInGroupHandler(groupBy, sumOver, data) {
            const _data = data.reduce((group, item) => {
                const _by = item[groupBy]
                group[_by] = group[_by] ?? {}
                let old = group[_by] && typeof group[_by] === 'number' ? group[_by] : 0;
                let val = Number(item[sumOver]) + Number(old);
                group[_by] = val
                return group;
            }, {});
            return _data;
        },
        capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        colorGenerator() {
            let _colors = [];
            let i = 0;
            while (i < this.chartColors) {
                _colors.push(this.colors[i]);
                i++;
            }
            return _colors;
        }

    },
    computed: {
        query() {
            return this.$store.getters[`${this.namespace}/getQueries`][this.queryName] || {};
        },
        updatedAt() {
            let _date = this.$store.getters[`${this.namespace}/getQueries`][this.queryName]?.result?.runStats?.endedAt;
            if (_date) return this.$options.filters.formatDate(_date);
            else return "---"
        }
    }
}