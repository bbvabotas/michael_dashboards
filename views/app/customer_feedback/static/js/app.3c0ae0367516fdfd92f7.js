webpackJsonp([1],Array(133).concat([
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(166)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(153),
  /* template */
  __webpack_require__(195),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0a0e8790",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_pages_App_Comparison_vue__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_pages_App_Comparison_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__main_pages_App_Comparison_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_pages_Customer_Feedback_vue__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_pages_Customer_Feedback_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__main_pages_Customer_Feedback_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main_pages_Mobile_Download_vue__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main_pages_Mobile_Download_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__main_pages_Mobile_Download_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'app',
    mounted() {
        let this_vm = this;

        //            let test_pic = 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'

        setTimeout(() => {
            __WEBPACK_IMPORTED_MODULE_3_axios___default.a.get('/getProfile').then(response => {
                //                    console.log(response.data)
                this_vm.images.profilePic = response.data;
            });
        }, 1000);

        //            this_vm.images.profilePic = test_pic
    },
    data() {
        return {
            images: {
                logoSrc: __webpack_require__(181),
                profilePic: ''
            },
            showAppComparison: true,
            showCustomerFeedback: false,
            showMobileDownload: false
        };
    },
    methods: {
        changePage(page) {
            this.showAppComparison = false;
            this.showCustomerFeedback = false;
            this.showMobileDownload = false;

            this[page] = true;
        },
        logout() {
            window.location = "/logout";
        }
    },
    components: {
        AppComparison: __WEBPACK_IMPORTED_MODULE_0__main_pages_App_Comparison_vue___default.a,
        CustomerFeedback: __WEBPACK_IMPORTED_MODULE_1__main_pages_Customer_Feedback_vue___default.a,
        MobileDownload: __WEBPACK_IMPORTED_MODULE_2__main_pages_Mobile_Download_vue___default.a
    }
});

/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_comparison_graph_vue__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_comparison_graph_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_comparison_graph_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    mounted() {
        this.activeGraph = 'competitors';
        this.getData();
    },
    //props: ['auth', 'authenticated'],
    data() {
        return {
            showLoading: true,
            highlightCompetitors: false,
            highlightBBVA: false,
            highlightNPS: false,
            activeGraph: 'competitors',
            graphData: []
        };
    },
    methods: {
        showCompetitors() {
            if (this.activeGraph != 'competitors') {
                this.activeGraph = 'competitors';
                this.getData();
            }
        },
        showBBVA() {
            if (this.activeGraph != 'BBVA') {
                this.activeGraph = 'BBVA';
                this.getData();
            }
        },
        showNPS() {
            if (this.activeGraph != 'NPS') {
                this.activeGraph = 'NPS';
                this.getData();
            }
        },
        getData() {
            let this_vm = this;
            let data_name = this.activeGraph;

            this.showLoading = true;
            this.highlightCompetitors = false;
            this.highlightBBVA = false;
            this.highlightNPS = false;

            if (data_name == 'competitors') {
                this.highlightCompetitors = true;
            } else if (data_name == 'BBVA') {
                this.highlightBBVA = true;
            } else if (data_name == 'NPS') {
                this.highlightNPS = true;
            }

            setTimeout(() => {

                if (data_name == 'competitors') {
                    this_vm.graphData = [{
                        title: 'Mobile App Rating VS competitors',
                        categories: ['BBVA US', 'BofA', 'WellsFargo', 'Frost', 'Chase', 'Regions'],
                        series: [{
                            name: 'Android',
                            type: 'line',
                            color: "#7cb5ec",
                            zIndex: 10,
                            data: [3.8, 4.0, 2.8, 4.5, 3.8, 4.2]
                        }, {
                            linkedTo: ':previous',
                            yAxis: 1,
                            name: 'Android Review Count',
                            type: 'column',
                            color: "#bcdaf5",
                            data: [28, 30, 18, 35, 28, 32]
                        }, {
                            name: 'iOS',
                            type: 'line',
                            zIndex: 10,
                            color: "black",
                            data: [2.8, 3.0, 1.8, 3.5, 2.8, 4.1]
                        }, {
                            linkedTo: ':previous',
                            yAxis: 1,
                            name: 'iOS Review Count',
                            type: 'column',
                            color: "gray",
                            data: [20, 20, 8, 25, 18, 22]
                        }]
                    }];
                } else if (data_name == 'BBVA') {
                    this_vm.graphData = [{
                        title: 'BBVA Mobile App Comparison',
                        categories: ['Argentina', 'Chile', 'Colombia', 'Mexico', 'Paraguay', 'Peru', 'Spain', 'Turkey', 'US', 'Venezuela'],
                        series: [{
                            name: 'Android',
                            type: 'line',
                            color: "#7cb5ec",
                            zIndex: 10,
                            data: [3.8, 4.0, 2.8, 4.5, 3.8, 4.2, 4.0, 3.2, 3.3, 4.5]
                        }, {
                            linkedTo: ':previous',
                            yAxis: 1,
                            name: 'Android Review Count',
                            type: 'column',
                            color: "#bcdaf5",
                            data: [28, 30, 18, 35, 28, 32, 80, 32, 33, 45]
                        }, {
                            name: 'iOS',
                            type: 'line',
                            zIndex: 10,
                            color: "black",
                            data: [2.8, 3.0, 1.8, 3.5, 2.8, 3.2, 3.0, 2.2, 2.3, 3.5]
                        }, {
                            linkedTo: ':previous',
                            yAxis: 1,
                            name: 'iOS Review Count',
                            type: 'column',
                            color: "gray",
                            data: [20, 20, 8, 25, 18, 22, 40, 32, 33, 45]
                        }]
                    }, {
                        title: 'BBVA Wallet App Comparison',
                        categories: ['Chile', 'Colombia', 'Mexico', 'Peru', 'Spain', 'Turkey', 'US'],
                        series: [{
                            name: 'Android',
                            type: 'line',
                            color: "#7cb5ec",
                            zIndex: 10,
                            data: [3.8, 4.0, 2.8, 4.5, 3.8, 4.2, 4.0]
                        }, {
                            linkedTo: ':previous',
                            yAxis: 1,
                            name: 'Android Review Count',
                            type: 'column',
                            color: "#bcdaf5",
                            data: [28, 30, 18, 35, 28, 32, 40]
                        }, {
                            name: 'iOS',
                            type: 'line',
                            zIndex: 10,
                            color: "black",
                            data: [2.8, 3.0, 1.8, 3.5, 2.8, 3.2, 3.0]
                        }, {
                            linkedTo: ':previous',
                            yAxis: 1,
                            name: 'iOS Review Count',
                            type: 'column',
                            color: "gray",
                            data: [20, 20, 8, 25, 18, 22, 20]
                        }]
                    }];
                } else if (data_name == 'NPS') {
                    this_vm.graphData = [{
                        title: 'BBVA Mobile NPS Comparison',
                        categories: ['Argentina', 'Chile', 'Colombia', 'Mexico', 'Paraguay', 'Peru', 'Spain', 'Turkey', 'US', 'Venezuela'],
                        series: [{
                            name: 'Android',
                            type: 'line',
                            color: "#7cb5ec",
                            zIndex: 10,
                            data: [3.8, 4.0, 2.8, 4.5, 3.8, 4.2, 4.0, 3.2, 3.3, 4.5]
                        }, {
                            linkedTo: ':previous',
                            yAxis: 1,
                            name: 'Android Review Count',
                            type: 'column',
                            color: "#bcdaf5",
                            data: [28, 30, 18, 35, 28, 32, 80, 32, 33, 45]
                        }, {
                            name: 'iOS',
                            type: 'line',
                            zIndex: 10,
                            color: "black",
                            data: [2.8, 3.0, 1.8, 3.5, 2.8, 3.2, 3.0, 2.2, 2.3, 3.5]
                        }, {
                            linkedTo: ':previous',
                            yAxis: 1,
                            name: 'iOS Review Count',
                            type: 'column',
                            color: "gray",
                            data: [20, 20, 8, 25, 18, 22, 40, 32, 33, 45]
                        }]
                    }, {
                        title: 'BBVA Wallet NPS Comparison',
                        categories: ['Chile', 'Colombia', 'Mexico', 'Peru', 'Spain', 'Turkey', 'US'],
                        series: [{
                            name: 'Android',
                            type: 'line',
                            color: "#7cb5ec",
                            zIndex: 10,
                            data: [3.8, 4.0, 2.8, 4.5, 3.8, 4.2, 4.0]
                        }, {
                            linkedTo: ':previous',
                            yAxis: 1,
                            name: 'Android Review Count',
                            type: 'column',
                            color: "#bcdaf5",
                            data: [28, 30, 18, 35, 28, 32, 40]
                        }, {
                            name: 'iOS',
                            type: 'line',
                            zIndex: 10,
                            color: "black",
                            data: [2.8, 3.0, 1.8, 3.5, 2.8, 3.2, 3.0]
                        }, {
                            linkedTo: ':previous',
                            yAxis: 1,
                            name: 'iOS Review Count',
                            type: 'column',
                            color: "gray",
                            data: [20, 20, 8, 25, 18, 22, 20]
                        }]
                    }];
                }

                this_vm.showLoading = false;
            }, 1000);
        }
    },
    components: {
        ComparisonGraph: __WEBPACK_IMPORTED_MODULE_0__components_comparison_graph_vue___default.a
    }
});

/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_daterangepicker__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_daterangepicker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_daterangepicker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_all_time_rating_vue__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_all_time_rating_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_all_time_rating_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_all_time_rating_trend_vue__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_all_time_rating_trend_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_all_time_rating_trend_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_word_frequency_graph_vue__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_word_frequency_graph_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_word_frequency_graph_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_reviews_android_vue__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_reviews_android_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_reviews_android_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_reviews_ios_vue__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_reviews_ios_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_reviews_ios_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//












/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            icons: {
                iconAndroid: __webpack_require__(179),
                iconIOS: __webpack_require__(180)
            },
            show_app_list: false,
            query: '',
            appList: [{ app: 'Argentina Mobile' }, { app: 'Chile Mobile' }, { app: 'Colombia Mobile' }, { app: 'Mexico Mobile' }, { app: 'Paraguay Mobile' }, { app: 'Peru Mobile' }, { app: 'Spain Mobile' }, { app: 'Turkey Mobile' }, { app: 'US Mobile' }, { app: 'Venezuela Mobile' }, { app: 'Chile Wallet' }, { app: 'Colombia Wallet' }, { app: 'Mexico Wallet' }, { app: 'Peru Wallet' }, { app: 'Spain Wallet' }, { app: 'Turkey Wallet' }, { app: 'US Wallet' }],
            appName: 'Argentina Mobile',
            showUI: false,
            androidData: {},
            iosData: {}
        };
    },
    //props: ['auth', 'authenticated'],
    mounted() {
        this.getData();
    },
    computed: {
        searchAppFilter: function () {
            return this.searchApps(this.query);
        }
    },
    methods: {
        toggleSearchAppList() {
            setTimeout(() => {
                this.show_app_list = !this.show_app_list;
            }, 200);
        },
        searchApps(value) {
            let search_regex = new RegExp(value, "i"),
                list = this.appList;

            return list.filter(function (item) {
                return item.app.match(search_regex);
            });
        },
        changeAppName(name) {
            this.appName = name;
            this.query = '';
        },
        dateRange() {
            let start = __WEBPACK_IMPORTED_MODULE_0_moment___default()().subtract(1, 'weeks').day(0),
                end = __WEBPACK_IMPORTED_MODULE_0_moment___default()().subtract(1, 'weeks').day(6);

            let this_vm = this;

            function displayDate(start, end) {
                __WEBPACK_IMPORTED_MODULE_1_jquery___default()("#date_range").html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY') + ' <span><i class="fa fa-chevron-down" style="float:right"></i></span>');
            }

            __WEBPACK_IMPORTED_MODULE_1_jquery___default()("#date_range").daterangepicker({
                opens: 'center',
                ranges: {
                    'Today': [__WEBPACK_IMPORTED_MODULE_0_moment___default()(), __WEBPACK_IMPORTED_MODULE_0_moment___default()()],
                    'Yesterday': [__WEBPACK_IMPORTED_MODULE_0_moment___default()().subtract(1, 'days'), __WEBPACK_IMPORTED_MODULE_0_moment___default()().subtract(1, 'days')],
                    'Last Week': [__WEBPACK_IMPORTED_MODULE_0_moment___default()().subtract(1, 'weeks').day(0), __WEBPACK_IMPORTED_MODULE_0_moment___default()().subtract(1, 'weeks').day(6)],
                    'Last Month': [__WEBPACK_IMPORTED_MODULE_0_moment___default()().subtract(1, 'month').startOf('month'), __WEBPACK_IMPORTED_MODULE_0_moment___default()().subtract(1, 'month').endOf('month')]
                },
                startDate: start,
                endDate: end,
                maxDate: __WEBPACK_IMPORTED_MODULE_0_moment___default()(),
                alwaysShowCalendars: true
            }, displayDate);

            //When the user clicks on Apply from the date range picker
            __WEBPACK_IMPORTED_MODULE_1_jquery___default()('#date_range').on('apply.daterangepicker', function (ev, picker) {
                //Display the date range in the date range picker
                displayDate(picker.startDate, picker.endDate);
            });

            displayDate(start, end);

            //this.getData()
        },
        getData() {
            let this_vm = this;

            this_vm.showUI = false;

            setTimeout(() => {
                this_vm.androidData = {
                    rating: 4.6,
                    star_count_5: 20,
                    star_count_4: 8,
                    star_count_3: 2,
                    star_count_2: 2,
                    star_count_1: 8,
                    total_rating: 156,
                    ratings_with_reviews: 22
                };
                this_vm.iosData = {
                    rating: 3.2,
                    star_count_5: 14,
                    star_count_4: 8,
                    star_count_3: 2,
                    star_count_2: 2,
                    star_count_1: 8,
                    total_rating: 156,
                    ratings_with_reviews: 22
                };

                this_vm.showUI = true;

                setTimeout(() => {
                    this_vm.dateRange();
                }, 1000);
            }, 500);
        }
    },
    components: {
        AllTimeRating: __WEBPACK_IMPORTED_MODULE_3__components_all_time_rating_vue___default.a,
        AllTimeRatingTrend: __WEBPACK_IMPORTED_MODULE_4__components_all_time_rating_trend_vue___default.a,
        WordFrequencyGraph: __WEBPACK_IMPORTED_MODULE_5__components_word_frequency_graph_vue___default.a,
        ReviewsAndroid: __WEBPACK_IMPORTED_MODULE_6__components_reviews_android_vue___default.a,
        ReviewsIos: __WEBPACK_IMPORTED_MODULE_7__components_reviews_ios_vue___default.a
    }
});

/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    mounted() {},
    //props: ['auth', 'authenticated'],
    data() {
        return {};
    },
    methods: {},
    components: {}
});

/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_highcharts__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_highcharts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_highcharts__);
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    },
    mounted() {
        this.calculateChart();
    },
    methods: {
        calculateChart() {

            //                let this_app = this,
            //                    bar_colors = {
            //                        star_1: '#ff8b5a', star_2: '#ffb234', star_3: '#ffd834', star_4: '#add633', star_5: '#9fc05a'
            //                    };


            setTimeout(() => {
                __WEBPACK_IMPORTED_MODULE_0_highcharts___default.a.chart('trend_graph', {
                    title: {
                        text: 'Android and iOS Rating Trend for past 10 weeks'
                        //text: ''
                    },
                    subtitle: {
                        text: 'ratings are with and without reviews'
                    },
                    tooltip: {
                        enabled: false
                    },
                    xAxis: {
                        plotBands: [{
                            from: 3.5,
                            to: 4.5,
                            color: 'rgba(124, 181, 236, .2)',
                            label: {
                                rotation: -90,
                                align: 'left',
                                y: 10,
                                x: 10,
                                textAlign: 'right',
                                style: {
                                    fontSize: '10px'
                                },
                                text: "Android update <br> Jun 26"
                            },
                            zIndex: 10
                        }, {
                            from: 5.5,
                            to: 6.5,
                            color: 'rgba(0, 0, 0, .2)',
                            label: {
                                rotation: 90,
                                align: 'right',
                                y: 10,
                                x: -10,
                                textAlign: 'left',
                                style: {
                                    fontSize: '10px'
                                },
                                text: "iOS update <br> Jul 15"
                            },
                            zIndex: 10
                        }],
                        categories: ['May 28 to Jun 3', 'Jun 4 to Jun 10', 'Jun 11 to Jun 17', 'Jun 18 to Jun 24', 'Jun 25 to Jul 1', 'Jul 2 to Jul 8', 'Jul 9 to Jul 15', 'Jul 16 to Jul 22', 'Jul 23 to Jul 29', 'Jul 30 to Aug 5']
                        //                                plotLines: [{
                        //                                    color: 'black',
                        //                                    dashStyle: 'Dash',
                        //                                    width: 2,
                        //                                    value: 5.25,
                        //                                    label: {
                        //                                        text: 'Release'
                        //                                    }
                        //                                }]
                    },
                    yAxis: [{
                        visible: true,
                        title: {
                            text: 'Rating Average'
                        },
                        min: 0,
                        max: 6
                    }, {
                        visible: true,
                        title: {
                            text: 'Rating Count'
                        },
                        opposite: true
                    }],
                    plotOptions: {
                        column: {
                            groupPadding: 0.1,
                            dataLabels: {
                                enabled: true,
                                formatter: function () {
                                    if (this.y > 0) {
                                        return this.y;
                                    }
                                },
                                inside: true,
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        },
                        line: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    legend: {
                        enabled: true
                    },
                    credits: { enabled: false },
                    series: [{
                        name: 'Android',
                        type: 'line',
                        color: "#bcdaf5",
                        zIndex: 10,
                        data: [2.8, 2.4, 3.2, 3.3, 3.8, 4.0, 2.8, 4.5, 3.8, 4.2]
                    }, {
                        linkedTo: ':previous',
                        yAxis: 1,
                        name: 'Android Rating Count',
                        type: 'column',
                        color: "#7cb5ec",
                        data: [20, 28, 30, 18, 135, 28, 32, 30, 54, 48]
                    }, {
                        name: 'iOS',
                        type: 'line',
                        zIndex: 10,
                        color: "gray",
                        data: [3.0, 2.0, 2.5, 1.8, 2.3, 3.2, 2.2, 3.9, 3.1, 3.1]
                    }, {
                        linkedTo: ':previous',
                        yAxis: 1,
                        name: 'iOS Rating Count',
                        type: 'column',
                        color: "black",
                        data: [40, 20, 20, 8, 25, 18, 22, 178, 42, 45]
                    }]
                });
            }, 500);
        }
    }
});

/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            images: {
                starImage: __webpack_require__(182)
            },
            star_rating_fill: {
                star_1: 0,
                star_2: 0,
                star_3: 0,
                star_4: 0,
                star_5: 0
            },
            all_time_rating: 0,
            total_rating_count: 0,
            ratings_with_reviews_count: 0,
            options: this.calculateChart()
        };
    },
    mounted() {
        this.calculateRatings();
    },
    props: ['rating_data'],
    methods: {
        convertNumberToHaveCommas(num) {
            let new_num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return new_num;
        },
        calculateRatings() {

            let rating_temp = this.rating_data.rating;

            this.star_rating_fill = {
                star_1: 0,
                star_2: 0,
                star_3: 0,
                star_4: 0,
                star_5: 0
            };

            for (let i = 1; i < 6; i++) {
                if (rating_temp > 1) {
                    this.star_rating_fill['star_' + i] = 100;
                    rating_temp--;
                } else {
                    this.star_rating_fill['star_' + i] = parseInt((rating_temp * 100).toFixed(0));
                    break;
                }
            }

            this.all_time_rating = this.rating_data.rating;
            this.total_rating_count = this.rating_data.total_rating;
            this.ratings_with_reviews_count = this.rating_data.ratings_with_reviews;
        },
        calculateChart() {

            let this_app = this,
                bar_colors = {
                star_1: '#ff8b5a', star_2: '#ffb234', star_3: '#ffd834', star_4: '#add633', star_5: '#9fc05a'
            };

            //                setTimeout(() => {
            //                    Highcharts.chart('trend_graph', {
            //                        chart: {
            //                            type: 'bar'  
            //                        },
            //                        title: {
            //                            text: ''
            //                        },
            //                        credits: {
            //                            enabled: false  
            //                        },
            //                        tooltip: {
            //                            enabled: false
            //                        },
            //                        xAxis: {
            //                            categories: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star']
            //                        },
            //                        yAxis: {
            //                            title: '',
            //                            labels: {
            //                                enabled: false
            //                            },
            //                            gridLineWidth: 0
            //                        },
            //                        plotOptions: {
            //                            bar: {
            //                                dataLabels: {
            //                                    enabled: true,
            //                                    formatter(){
            //                                        console.log(this_app.bar_colors);
            //                                        return this_app.convertNumberToHaveCommas(this.y);
            //                                    }
            //                                },
            //                                groupPadding: 0
            //                            }
            //                        },
            //                        legend: {
            //                            enabled: false  
            //                        },
            //                        series: [{
            //                            data: [{
            //                                name: '5 Stars',
            //                                y: 20,
            //                                color: bar_colors.star_5
            //                            },{
            //                                name: '4 Stars',
            //                                y: 8,
            //                                color: bar_colors.star_4
            //                            },{
            //                                name: '3 Stars',
            //                                y: 2,
            //                                color: bar_colors.star_3
            //                            },{
            //                                name: '2 Stars',
            //                                y: 2,
            //                                color: bar_colors.star_2
            //                            },{
            //                                name: '1 Stars',
            //                                y: 8,
            //                                color: bar_colors.star_1
            //                            }]
            //                        }]
            //                    });
            //                }, 500)

            return {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    enabled: false
                },
                xAxis: {
                    categories: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star']
                },
                yAxis: {
                    title: '',
                    labels: {
                        enabled: false
                    },
                    gridLineWidth: 0
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true,
                            formatter() {
                                console.log(this_app.bar_colors);
                                return this_app.convertNumberToHaveCommas(this.y);
                            }
                        },
                        groupPadding: 0
                    }
                },
                legend: {
                    enabled: false
                },
                series: [{
                    data: [{
                        name: '5 Stars',
                        y: this_app.rating_data.star_count_5,
                        color: bar_colors.star_5
                    }, {
                        name: '4 Stars',
                        y: this_app.rating_data.star_count_4,
                        color: bar_colors.star_4
                    }, {
                        name: '3 Stars',
                        y: this_app.rating_data.star_count_3,
                        color: bar_colors.star_3
                    }, {
                        name: '2 Stars',
                        y: this_app.rating_data.star_count_2,
                        color: bar_colors.star_2
                    }, {
                        name: '1 Stars',
                        y: this_app.rating_data.star_count_1,
                        color: bar_colors.star_1
                    }]
                }]
            };
        }
    }
});

/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_highcharts__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_highcharts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_highcharts__);
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            second_graph: false
        };
    },
    props: ['graph_data'],
    mounted() {
        this.showGraph();
    },
    methods: {
        showGraph() {
            let this_vm = this;

            setTimeout(function () {
                __WEBPACK_IMPORTED_MODULE_0_highcharts___default.a.chart('comparison_graph', {
                    title: {
                        text: this_vm.graph_data[0].title
                    },
                    subtitle: {
                        text: '(all time)'
                    },
                    tooltip: {
                        enabled: false
                    },
                    xAxis: {
                        categories: this_vm.graph_data[0].categories

                    },
                    yAxis: [{
                        visible: true,
                        title: {
                            text: 'Rating Average'
                        },
                        min: 0,
                        max: 6
                    }, {
                        visible: true,
                        title: {
                            text: 'Rating Count'
                        },
                        opposite: true
                    }],
                    plotOptions: {
                        column: {
                            groupPadding: 0.1,
                            dataLabels: {
                                enabled: true,
                                formatter: function () {
                                    if (this.y > 0) {
                                        return this.y;
                                    }
                                },
                                inside: true,
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        },
                        line: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    legend: {
                        enabled: true
                    },
                    credits: { enabled: false },
                    series: this_vm.graph_data[0].series
                });

                if (this_vm.graph_data.length > 1) {
                    this_vm.second_graph = true;

                    setTimeout(() => {
                        __WEBPACK_IMPORTED_MODULE_0_highcharts___default.a.chart('comparison_graph_2', {
                            title: {
                                text: this_vm.graph_data[1].title
                            },
                            subtitle: {
                                text: '(all time)'
                            },
                            tooltip: {
                                enabled: false
                            },
                            xAxis: {
                                categories: this_vm.graph_data[1].categories

                            },
                            yAxis: [{
                                visible: true,
                                title: {
                                    text: 'Rating Average'
                                },
                                min: 0,
                                max: 6
                            }, {
                                visible: true,
                                title: {
                                    text: 'Rating Count'
                                },
                                opposite: true
                            }],
                            plotOptions: {
                                column: {
                                    groupPadding: 0.1,
                                    dataLabels: {
                                        enabled: true,
                                        formatter: function () {
                                            if (this.y > 0) {
                                                return this.y;
                                            }
                                        },
                                        inside: true,
                                        align: 'center',
                                        verticalAlign: 'bottom'
                                    }
                                },
                                line: {
                                    dataLabels: {
                                        enabled: true
                                    }
                                }
                            },
                            legend: {
                                enabled: true
                            },
                            credits: { enabled: false },
                            series: this_vm.graph_data[1].series
                        });
                    }, 500);
                }
            }, 500);
        }
    }
});

/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_highcharts__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_highcharts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_highcharts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_papaparse__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_papaparse___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_papaparse__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            query: '',
            reviewData: []
        };
    },
    mounted() {
        this.getReviews();
    },
    computed: {
        tableFilter: function () {
            //this.commentCount++;
            return this.findBy(this.query);
        }
    },
    methods: {
        getReviews() {

            setTimeout(() => {
                this.reviewData.push({
                    isDisabled: false,
                    date: '2017-06-03',
                    english_subject: "It's ok",
                    english: "Lately I can not have installed the application on the mobile, it detects me with virus, and advises me to uninstall, I thought it happened to my mobile, but a friend told me that it happens to her too, what can I do?",
                    spanish_subject: "Es bueno",
                    spanish: "Últimamente no puedo tener instala la aplicación en el móvil, me detecta con virus, y me aconseja desinstalar, pensaba que le pasaba a mi móvil, pero una amiga me dijo que a ella le pasa también, que puedo hacer?",
                    rating: 3
                }, {
                    isDisabled: false,
                    date: '2017-06-03',
                    english_subject: "good",
                    english: "' very good. .",
                    spanish_subject: "buena",
                    spanish: "' muy buena. .",
                    rating: 4
                }, {
                    isDisabled: false,
                    date: '2017-06-03',
                    english_subject: "access problem",
                    english: "I have a problem I do not know how to create the access key and I ask for my number and the password key to enter i entered i is told to create but it does not let me i in the end me a since it blocked the user i have to do?",
                    spanish_subject: "acceso problema",
                    spanish: "Tengo un problema nose como crear la clave de acceso y me la pide mi número targeta y la clave para poder entrar i entró i me dice crear pero no me deja i al final me a puesto que se me a bloqueado el a usuario que tengo que hacer?",
                    rating: 4
                }, {
                    isDisabled: false,
                    date: '2017-06-03',
                    english_subject: "BAD!",
                    english: "Can't connect to the app",
                    spanish_subject: "MALA!",
                    spanish: "No se puede conectar a la aplicación",
                    rating: 1
                }, {
                    isDisabled: false,
                    date: '2017-06-02',
                    english: "Excellent",
                    spanish: "Excelente",
                    rating: 5
                }, {
                    isDisabled: false,
                    date: '2017-06-02',
                    english: "Why does my app not let me login?",
                    spanish: "Por qué mi aplicación no me deja ingresar?",
                    rating: 1
                }, {
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "Multiple login errors",
                    spanish: "Varios errores de inicio de sesión",
                    rating: 1
                }, {
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "Until two months ago it was my most useful application. Then, I do not know why, the application is not opened sometimes and the operations I do are not going so fast. I would like to go back to the previous version.",
                    spanish: "Hasta hace dos meses era mi aplicación más útil. Luego, no se por qué, no se abre la aplicación a veces y no van tan rápidas las operaciones que hago. Me gustaría volver a la versión anterior.",
                    rating: 2
                }, {
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "It saves you time and is very reliable",
                    spanish: "Te ahorra tiempo y es muy confiable",
                    rating: 5
                }, {
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "Technical errors",
                    spanish: "Errores técnicos",
                    rating: 1
                }, {
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "The only thing missing from this application is a little hole to make money for everything else is great.",
                    spanish: "Lo único que le falta a esta aplicación es un agujerito para sacar dinero para todo lo demás es estupenda.",
                    rating: 5
                }, {
                    isDisabled: false,
                    date: '2017-06-03',
                    english: "Lately I can not have installed the application on the mobile, it detects me with virus, and advises me to uninstall, I thought it happened to my mobile, but a friend told me that it happens to her too, what can I do?",
                    spanish: "Últimamente no puedo tener instala la aplicación en el móvil, me detecta con virus, y me aconseja desinstalar, pensaba que le pasaba a mi móvil, pero una amiga me dijo que a ella le pasa también, que puedo hacer?",
                    rating: 3
                }, {
                    isDisabled: false,
                    date: '2017-06-03',
                    english: "' very good. .",
                    spanish: "' muy buena. .",
                    rating: 4
                }, {
                    isDisabled: false,
                    date: '2017-06-03',
                    english: "I have a problem I do not know how to create the access key and I ask for my number and the password key to enter i entered i is told to create but it does not let me i in the end me a since it blocked the user i have to do?",
                    spanish: "Tengo un problema nose como crear la clave de acceso y me la pide mi número targeta y la clave para poder entrar i entró i me dice crear pero no me deja i al final me a puesto que se me a bloqueado el a usuario que tengo que hacer?",
                    rating: 4
                }, {
                    isDisabled: false,
                    date: '2017-06-03',
                    english: "The app won't send me notifications",
                    spanish: "La aplicación no me enviará notificaciones",
                    rating: 1
                }, {
                    isDisabled: false,
                    date: '2017-06-02',
                    english: "Excellent",
                    spanish: "Excelente",
                    rating: 5
                }, {
                    isDisabled: false,
                    date: '2017-06-02',
                    english_subject: "fail",
                    english: "Constant crashes",
                    spanish_subject: "falla",
                    spanish: "Choques constantes",
                    rating: 1
                }, {
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "For a couple of days it has stopped working, connection error",
                    spanish: "Desde hace un par de días ha dejado de funcionar, error de conexión",
                    rating: 1
                }, {
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "Until two months ago it was my most useful application. Then, I do not know why, the application is not opened sometimes and the operations I do are not going so fast. I would like to go back to the previous version.",
                    spanish: "Hasta hace dos meses era mi aplicación más útil. Luego, no se por qué, no se abre la aplicación a veces y no van tan rápidas las operaciones que hago. Me gustaría volver a la versión anterior.",
                    rating: 2
                }, {
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "It saves you time and is very reliable",
                    spanish: "Te ahorra tiempo y es muy confiable",
                    rating: 5
                }, {
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "He asks me if I give it to him and he tells me that I have gone from trying",
                    spanish: "Me pide clavé se la doy y me dice que me he pasado de intentos",
                    rating: 1
                }, {
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "The only thing missing from this application is a little hole to make money for everything else is great.",
                    spanish: "Lo único que le falta a esta aplicación es un agujerito para sacar dinero para todo lo demás es estupenda.",
                    rating: 5
                });

                this.showReviews = true;

                this.breakdownChart();
                this.wordFrequency();
            }, 1000);
        },
        breakdownChart() {
            let bar_colors = {
                star_1: '#ff8b5a', star_2: '#ffb234', star_3: '#ffd834', star_4: '#add633', star_5: '#9fc05a'
            };

            __WEBPACK_IMPORTED_MODULE_0_highcharts___default.a.chart('android_breakdown_graph', {
                title: {
                    text: 'Android Ratings'
                },
                subtitle: {
                    text: 'android rating within date range'
                },
                xAxis: {
                    categories: ['Total Ratings', 'Rating with Reviews'],
                    labels: {
                        style: {
                            "color": "black",
                            "fontSize": "1.5em"
                        }
                    },
                    plotLines: [{
                        color: 'gray',
                        width: 3,
                        value: 0.5,
                        zIndex: 10
                    }]
                },
                yAxis: [{
                    title: {
                        text: 'Rating Average'
                    },
                    min: 0,
                    max: 6
                }, {
                    title: {
                        text: 'Rating Count'
                    },
                    opposite: true
                }],
                tooltip: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: true
                        },
                        groupPadding: 0.1,
                        pointPadding: 0.2
                    },
                    line: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                series: [{
                    name: '1 Star Rating',
                    yAxis: 1,
                    color: bar_colors.star_1,
                    type: 'column',
                    data: [10, 10]
                }, {
                    name: '2 Star Rating',
                    yAxis: 1,
                    color: bar_colors.star_2,
                    type: 'column',
                    data: [12, 0]
                }, {
                    name: '3 Star Rating',
                    yAxis: 1,
                    color: bar_colors.star_3,
                    type: 'column',
                    data: [3, 0]
                }, {
                    name: '4 Star Rating',
                    yAxis: 1,
                    color: bar_colors.star_4,
                    type: 'column',
                    data: [23, 2]
                }, {
                    name: '5 Star Rating',
                    yAxis: 1,
                    color: bar_colors.star_5,
                    type: 'column',
                    data: [63, 10]
                }, {
                    name: 'Rating Average',
                    yAxis: 0,
                    color: 'black',
                    type: 'line',
                    data: [4.6, 3.2]
                }]
            });
        },
        wordFrequency() {
            __WEBPACK_IMPORTED_MODULE_0_highcharts___default.a.chart('android_word_frequency', {
                title: {
                    text: 'Word Frequency'
                },
                subtitle: {
                    text: 'word frequency for ratings 1 - 2 with review count'
                },
                colors: ['black', 'orange', 'orange', 'orange', 'orange', 'orange'],
                tooltip: {
                    enabled: false
                },
                xAxis: {
                    categories: ['Total', 'install', 'key', 'blocked', 'connect', 'login']
                },
                yAxis: {
                    visible: false
                },
                plotOptions: {
                    column: {
                        groupPadding: 0.1,
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                                if (this.y > 0) {
                                    return this.y;
                                }
                            }
                        }
                    }
                },
                legend: {
                    enabled: false
                },
                credits: { enabled: false },
                series: [{
                    colorByPoint: true,
                    name: 'word frequency',
                    type: 'column',
                    data: [10, 8, 6, 3, 2, 2]
                }]
            });
        },
        findBy(value) {
            let search_regex = new RegExp(value, "i"),
                list = this.reviewData;

            return list.filter(function (item) {
                return item.english.match(search_regex);
            });
        },
        exportDataToCSV() {
            console.log("Exporting table...");
            let new_csv = __WEBPACK_IMPORTED_MODULE_1_papaparse___default.a.unparse(this.tableFilter);
            //console.log(new_csv);
            this.downloadCSV(new_csv);
        },
        downloadCSV(csv) {

            //let object_test = [{"test": "things"}];
            //let json_test = JSON.stringify(object_test);

            let blob = new Blob([csv]),
                a = window.document.createElement("a");

            a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
            a.download = "Android_Comments.csv";

            document.body.appendChild(a);

            a.click();

            document.body.removeChild(a);
        },
        sortColumn(column, direction) {
            let list = this.metrics;

            if (column == 'name') {
                if (direction == 'up') {
                    return list.sort(function (a, b) {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                    });
                } else if (direction == 'down') {
                    return list.sort(function (a, b) {
                        if (a.name > b.name) return -1;
                        if (a.name < b.name) return 1;
                        return 0;
                    });
                }
            } else {
                if (direction == 'up') {
                    return list.sort(function (a, b) {
                        return a[column] - b[column];
                    });
                } else if (direction == 'down') {
                    return list.sort(function (a, b) {
                        return b[column] - a[column];
                    });
                }
            }
        }
    }
});

/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_highcharts__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_highcharts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_highcharts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_papaparse__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_papaparse___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_papaparse__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            query: '',
            reviewData: []
        };
    },
    mounted() {
        this.getReviews();
    },
    computed: {
        tableFilter: function () {
            //this.commentCount++;
            return this.findBy(this.query);
        }
    },
    methods: {
        getReviews() {

            setTimeout(() => {
                this.reviewData.push({
                    isDisabled: false,
                    date: '2017-06-03',
                    english_subject: "It's ok",
                    english: "Lately I can not have installed the application on the mobile, it detects me with virus, and advises me to uninstall, I thought it happened to my mobile, but a friend told me that it happens to her too, what can I do?",
                    spanish_subject: "Es bueno",
                    spanish: "Últimamente no puedo tener instala la aplicación en el móvil, me detecta con virus, y me aconseja desinstalar, pensaba que le pasaba a mi móvil, pero una amiga me dijo que a ella le pasa también, que puedo hacer?",
                    rating: 3
                }, {
                    isDisabled: false,
                    date: '2017-06-03',
                    english_subject: "good",
                    english: "' very good. .",
                    spanish_subject: "buena",
                    spanish: "' muy buena. .",
                    rating: 4
                }, {
                    isDisabled: false,
                    date: '2017-06-03',
                    english_subject: "access problem",
                    english: "I have a problem I do not know how to create the access key and I ask for my number and the password key to enter i entered i is told to create but it does not let me i in the end me a since it blocked the user i have to do?",
                    spanish_subject: "acceso problema",
                    spanish: "Tengo un problema nose como crear la clave de acceso y me la pide mi número targeta y la clave para poder entrar i entró i me dice crear pero no me deja i al final me a puesto que se me a bloqueado el a usuario que tengo que hacer?",
                    rating: 4
                }, {
                    isDisabled: false,
                    date: '2017-06-03',
                    english_subject: "BAD!",
                    english: "Can't connect to the app",
                    spanish_subject: "MALA!",
                    spanish: "No se puede conectar a la aplicación",
                    rating: 1
                }, {
                    isDisabled: false,
                    date: '2017-06-02',
                    english: "Excellent",
                    spanish: "Excelente",
                    rating: 5
                }, {
                    isDisabled: false,
                    date: '2017-06-02',
                    english: "Why does my app not let me login?",
                    spanish: "Por qué mi aplicación no me deja ingresar?",
                    rating: 1
                }, {
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "Multiple login errors",
                    spanish: "Varios errores de inicio de sesión",
                    rating: 1
                }, {
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "Until two months ago it was my most useful application. Then, I do not know why, the application is not opened sometimes and the operations I do are not going so fast. I would like to go back to the previous version.",
                    spanish: "Hasta hace dos meses era mi aplicación más útil. Luego, no se por qué, no se abre la aplicación a veces y no van tan rápidas las operaciones que hago. Me gustaría volver a la versión anterior.",
                    rating: 2
                }, {
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "It saves you time and is very reliable",
                    spanish: "Te ahorra tiempo y es muy confiable",
                    rating: 5
                }, {
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "Technical errors",
                    spanish: "Errores técnicos",
                    rating: 1
                }, {
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "The only thing missing from this application is a little hole to make money for everything else is great.",
                    spanish: "Lo único que le falta a esta aplicación es un agujerito para sacar dinero para todo lo demás es estupenda.",
                    rating: 5
                }, {
                    isDisabled: false,
                    date: '2017-06-03',
                    english: "Lately I can not have installed the application on the mobile, it detects me with virus, and advises me to uninstall, I thought it happened to my mobile, but a friend told me that it happens to her too, what can I do?",
                    spanish: "Últimamente no puedo tener instala la aplicación en el móvil, me detecta con virus, y me aconseja desinstalar, pensaba que le pasaba a mi móvil, pero una amiga me dijo que a ella le pasa también, que puedo hacer?",
                    rating: 3
                }, {
                    isDisabled: false,
                    date: '2017-06-03',
                    english: "' very good. .",
                    spanish: "' muy buena. .",
                    rating: 4
                }, {
                    isDisabled: false,
                    date: '2017-06-03',
                    english: "I have a problem I do not know how to create the access key and I ask for my number and the password key to enter i entered i is told to create but it does not let me i in the end me a since it blocked the user i have to do?",
                    spanish: "Tengo un problema nose como crear la clave de acceso y me la pide mi número targeta y la clave para poder entrar i entró i me dice crear pero no me deja i al final me a puesto que se me a bloqueado el a usuario que tengo que hacer?",
                    rating: 4
                }, {
                    isDisabled: false,
                    date: '2017-06-03',
                    english: "The app won't send me notifications",
                    spanish: "La aplicación no me enviará notificaciones",
                    rating: 1
                }, {
                    isDisabled: false,
                    date: '2017-06-02',
                    english: "Excellent",
                    spanish: "Excelente",
                    rating: 5
                }, {
                    isDisabled: false,
                    date: '2017-06-02',
                    english_subject: "fail",
                    english: "Constant crashes",
                    spanish_subject: "falla",
                    spanish: "Choques constantes",
                    rating: 1
                }, {
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "For a couple of days it has stopped working, connection error",
                    spanish: "Desde hace un par de días ha dejado de funcionar, error de conexión",
                    rating: 1
                }, {
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "Until two months ago it was my most useful application. Then, I do not know why, the application is not opened sometimes and the operations I do are not going so fast. I would like to go back to the previous version.",
                    spanish: "Hasta hace dos meses era mi aplicación más útil. Luego, no se por qué, no se abre la aplicación a veces y no van tan rápidas las operaciones que hago. Me gustaría volver a la versión anterior.",
                    rating: 2
                }, {
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "It saves you time and is very reliable",
                    spanish: "Te ahorra tiempo y es muy confiable",
                    rating: 5
                }, {
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "He asks me if I give it to him and he tells me that I have gone from trying",
                    spanish: "Me pide clavé se la doy y me dice que me he pasado de intentos",
                    rating: 1
                }, {
                    isDisabled: false,
                    date: '2017-06-01',
                    english: "The only thing missing from this application is a little hole to make money for everything else is great.",
                    spanish: "Lo único que le falta a esta aplicación es un agujerito para sacar dinero para todo lo demás es estupenda.",
                    rating: 5
                });

                this.showReviews = true;

                this.breakdownChart();
                this.wordFrequency();
            }, 1000);
        },
        breakdownChart() {
            let bar_colors = {
                star_1: '#ff8b5a', star_2: '#ffb234', star_3: '#ffd834', star_4: '#add633', star_5: '#9fc05a'
            };

            __WEBPACK_IMPORTED_MODULE_0_highcharts___default.a.chart('ios_breakdown_graph', {
                title: {
                    text: 'iOS Ratings'
                },
                subtitle: {
                    text: 'ios rating within date range'
                },
                xAxis: {
                    categories: ['Total Ratings', 'Rating with Reviews'],
                    labels: {
                        style: {
                            "color": "black",
                            "fontSize": "1.5em"
                        }
                    },
                    plotLines: [{
                        color: 'gray',
                        width: 3,
                        value: 0.5,
                        zIndex: 10
                    }]
                },
                yAxis: [{
                    title: {
                        text: 'Rating Average'
                    },
                    min: 0,
                    max: 6
                }, {
                    title: {
                        text: 'Rating Count'
                    },
                    opposite: true
                }],
                tooltip: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: true
                        },
                        groupPadding: 0.1,
                        pointPadding: 0.2
                    },
                    line: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                series: [{
                    name: '1 Star Rating',
                    yAxis: 1,
                    color: bar_colors.star_1,
                    type: 'column',
                    data: [10, 10]
                }, {
                    name: '2 Star Rating',
                    yAxis: 1,
                    color: bar_colors.star_2,
                    type: 'column',
                    data: [12, 0]
                }, {
                    name: '3 Star Rating',
                    yAxis: 1,
                    color: bar_colors.star_3,
                    type: 'column',
                    data: [3, 0]
                }, {
                    name: '4 Star Rating',
                    yAxis: 1,
                    color: bar_colors.star_4,
                    type: 'column',
                    data: [23, 2]
                }, {
                    name: '5 Star Rating',
                    yAxis: 1,
                    color: bar_colors.star_5,
                    type: 'column',
                    data: [63, 10]
                }, {
                    name: 'Rating Average',
                    yAxis: 0,
                    color: 'black',
                    type: 'line',
                    data: [4.6, 3.2]
                }]
            });
        },
        wordFrequency() {
            __WEBPACK_IMPORTED_MODULE_0_highcharts___default.a.chart('ios_word_frequency', {
                title: {
                    text: 'Word Frequency'
                },
                subtitle: {
                    text: 'word frequency for ratings 1 - 2 with review count'
                },
                colors: ['black', 'orange', 'orange', 'orange', 'orange', 'orange'],
                tooltip: {
                    enabled: false
                },
                xAxis: {
                    categories: ['Total', 'install', 'key', 'blocked', 'connect', 'login']
                },
                yAxis: {
                    visible: false
                },
                plotOptions: {
                    column: {
                        groupPadding: 0.1,
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                                if (this.y > 0) {
                                    return this.y;
                                }
                            }
                        }
                    }
                },
                legend: {
                    enabled: false
                },
                credits: { enabled: false },
                series: [{
                    colorByPoint: true,
                    name: 'word frequency',
                    type: 'column',
                    data: [10, 8, 6, 3, 2, 2]
                }]
            });
        },
        findBy(value) {
            let search_regex = new RegExp(value, "i"),
                list = this.reviewData;

            return list.filter(function (item) {
                return item.english.match(search_regex);
            });
        },
        exportDataToCSV() {
            console.log("Exporting table...");
            let new_csv = __WEBPACK_IMPORTED_MODULE_1_papaparse___default.a.unparse(this.tableFilter);
            //console.log(new_csv);
            this.downloadCSV(new_csv);
        },
        downloadCSV(csv) {

            //let object_test = [{"test": "things"}];
            //let json_test = JSON.stringify(object_test);

            let blob = new Blob([csv]),
                a = window.document.createElement("a");

            a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
            a.download = "iOS_Comments.csv";

            document.body.appendChild(a);

            a.click();

            document.body.removeChild(a);
        },
        sortColumn(column, direction) {
            let list = this.metrics;

            if (column == 'name') {
                if (direction == 'up') {
                    return list.sort(function (a, b) {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                    });
                } else if (direction == 'down') {
                    return list.sort(function (a, b) {
                        if (a.name > b.name) return -1;
                        if (a.name < b.name) return 1;
                        return 0;
                    });
                }
            } else {
                if (direction == 'up') {
                    return list.sort(function (a, b) {
                        return a[column] - b[column];
                    });
                } else if (direction == 'down') {
                    return list.sort(function (a, b) {
                        return b[column] - a[column];
                    });
                }
            }
        }
    }
});

/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_highcharts__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_highcharts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_highcharts__);
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            //                id_test: 'word_frequency'
        };
    },
    props: ['word_frequency_id'],
    mounted() {
        this.calculateChart();
    },
    methods: {
        calculateChart() {
            let chart_id = this.word_frequency_id;

            if (chart_id == 'review_rating_comparison') {
                __WEBPACK_IMPORTED_MODULE_0_highcharts___default.a.chart(chart_id, {
                    title: {
                        text: 'Combined Review Rating Count Breakdown for past 5 weeks'
                    },
                    subtitle: {
                        text: 'Jul 2 - Aug 5'
                    },
                    tooltip: {
                        enabled: false
                    },
                    xAxis: {
                        categories: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars']
                    },
                    yAxis: {
                        visible: true,
                        title: {
                            text: ''
                        }
                    },
                    plotOptions: {
                        column: {
                            groupPadding: 0.1,
                            dataLabels: {
                                enabled: true,
                                formatter: function () {
                                    if (this.y > 0) {
                                        return this.y;
                                    }
                                }
                            }
                        }
                    },
                    legend: {
                        enabled: true
                    },
                    credits: { enabled: false },
                    series: [{
                        name: 'Android',
                        type: 'column',
                        //                            color: "#bcdaf5",
                        data: [52, 14, 2, 13, 228]
                    }, {
                        name: 'iOS',
                        type: 'column',
                        //                            color: "gray",
                        data: [90, 12, 8, 22, 118]
                    }]
                });
            } else if (chart_id == 'wf_performance_issues') {
                __WEBPACK_IMPORTED_MODULE_0_highcharts___default.a.chart(chart_id, {
                    title: {
                        text: 'Performance Issues Trend for past 5 weeks'
                    },
                    subtitle: {
                        text: 'number of reviews that mention performance issues'
                    },
                    tooltip: {
                        enabled: false
                    },
                    xAxis: {
                        //                            categories: ['Jul 30 to Aug 5', 'Jul 30 to Aug 5', 'Jul 16 to Jul 22', 'Jul 9 to Jul 15', 'Jul 2 to Jul 8']
                        categories: ['Last week', 'Last two weeks', 'Last three weeks', 'Last four weeks', 'Last five weeks']
                    },
                    yAxis: {
                        visible: true,
                        title: {
                            text: ''
                        }
                    },
                    plotOptions: {
                        bar: {
                            groupPadding: 0.1,
                            dataLabels: {
                                enabled: true
                                //                                    formatter: function(){
                                //                                        if(this.y > 0){
                                //                                            return this.y
                                //                                        }
                                //                                    }
                            }
                        }
                    },
                    legend: {
                        enabled: true
                    },
                    credits: { enabled: false },
                    series: [{
                        name: 'Android',
                        type: 'bar',
                        //                            color: "#bcdaf5",
                        data: [1, 4, 2, 2, 2]
                    }, {
                        name: 'iOS',
                        type: 'bar',
                        //                            color: "gray",
                        data: [0, 2, 8, 2, 1]
                    }]
                });
            } else {
                __WEBPACK_IMPORTED_MODULE_0_highcharts___default.a.chart(chart_id, {
                    title: {
                        text: 'Technical Issues Trend for past 5 weeks'
                    },
                    subtitle: {
                        text: 'number of reviews that mention technical issues'
                    },
                    tooltip: {
                        enabled: false
                    },
                    xAxis: {
                        //                            categories: ['Jul 30 to Aug 5', 'Jul 30 to Aug 5', 'Jul 16 to Jul 22', 'Jul 9 to Jul 15', 'Jul 2 to Jul 8']
                        categories: ['Last week', 'Last two weeks', 'Last three weeks', 'Last four weeks', 'Last five weeks']
                    },
                    yAxis: {
                        visible: true,
                        title: {
                            text: ''
                        }
                    },
                    plotOptions: {
                        bar: {
                            groupPadding: 0.1,
                            dataLabels: {
                                enabled: true
                                //                                    formatter: function(){
                                //                                        if(this.y > 0){
                                //                                            return this.y
                                //                                        }
                                //                                    }
                            }
                        }
                    },
                    legend: {
                        enabled: true
                    },
                    credits: { enabled: false },
                    series: [{
                        name: 'Android',
                        type: 'bar',
                        //                            color: "#bcdaf5",
                        data: [8, 14, 20, 32, 28]
                    }, {
                        name: 'iOS',
                        type: 'bar',
                        //                            color: "gray",
                        data: [5, 12, 28, 22, 18]
                    }]
                });
            }
        }
    }
});

/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bootstrap_vue__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_highcharts__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_highcharts_highstock__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_highcharts_highstock___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_highcharts_highstock__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_highcharts_modules_map__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_highcharts_modules_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_highcharts_modules_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_highcharts_more__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_highcharts_more___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_highcharts_more__);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.


//import router from './router'








__WEBPACK_IMPORTED_MODULE_6_highcharts_more___default()(__WEBPACK_IMPORTED_MODULE_4_highcharts_highstock___default.a);
__WEBPACK_IMPORTED_MODULE_5_highcharts_modules_map___default()(__WEBPACK_IMPORTED_MODULE_4_highcharts_highstock___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_3_vue_highcharts__["a" /* default */], { Highcharts: __WEBPACK_IMPORTED_MODULE_4_highcharts_highstock___default.a });

__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_2_bootstrap_vue__["a" /* default */]);

__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  //  router,
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});

/***/ }),
/* 164 */,
/* 165 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 166 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 167 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 168 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 169 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 170 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 171 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 172 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 173 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 174 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 175 */,
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 11,
	"./af.js": 11,
	"./ar": 18,
	"./ar-dz": 12,
	"./ar-dz.js": 12,
	"./ar-kw": 13,
	"./ar-kw.js": 13,
	"./ar-ly": 14,
	"./ar-ly.js": 14,
	"./ar-ma": 15,
	"./ar-ma.js": 15,
	"./ar-sa": 16,
	"./ar-sa.js": 16,
	"./ar-tn": 17,
	"./ar-tn.js": 17,
	"./ar.js": 18,
	"./az": 19,
	"./az.js": 19,
	"./be": 20,
	"./be.js": 20,
	"./bg": 21,
	"./bg.js": 21,
	"./bn": 22,
	"./bn.js": 22,
	"./bo": 23,
	"./bo.js": 23,
	"./br": 24,
	"./br.js": 24,
	"./bs": 25,
	"./bs.js": 25,
	"./ca": 26,
	"./ca.js": 26,
	"./cs": 27,
	"./cs.js": 27,
	"./cv": 28,
	"./cv.js": 28,
	"./cy": 29,
	"./cy.js": 29,
	"./da": 30,
	"./da.js": 30,
	"./de": 33,
	"./de-at": 31,
	"./de-at.js": 31,
	"./de-ch": 32,
	"./de-ch.js": 32,
	"./de.js": 33,
	"./dv": 34,
	"./dv.js": 34,
	"./el": 35,
	"./el.js": 35,
	"./en-au": 36,
	"./en-au.js": 36,
	"./en-ca": 37,
	"./en-ca.js": 37,
	"./en-gb": 38,
	"./en-gb.js": 38,
	"./en-ie": 39,
	"./en-ie.js": 39,
	"./en-nz": 40,
	"./en-nz.js": 40,
	"./eo": 41,
	"./eo.js": 41,
	"./es": 43,
	"./es-do": 42,
	"./es-do.js": 42,
	"./es.js": 43,
	"./et": 44,
	"./et.js": 44,
	"./eu": 45,
	"./eu.js": 45,
	"./fa": 46,
	"./fa.js": 46,
	"./fi": 47,
	"./fi.js": 47,
	"./fo": 48,
	"./fo.js": 48,
	"./fr": 51,
	"./fr-ca": 49,
	"./fr-ca.js": 49,
	"./fr-ch": 50,
	"./fr-ch.js": 50,
	"./fr.js": 51,
	"./fy": 52,
	"./fy.js": 52,
	"./gd": 53,
	"./gd.js": 53,
	"./gl": 54,
	"./gl.js": 54,
	"./gom-latn": 55,
	"./gom-latn.js": 55,
	"./he": 56,
	"./he.js": 56,
	"./hi": 57,
	"./hi.js": 57,
	"./hr": 58,
	"./hr.js": 58,
	"./hu": 59,
	"./hu.js": 59,
	"./hy-am": 60,
	"./hy-am.js": 60,
	"./id": 61,
	"./id.js": 61,
	"./is": 62,
	"./is.js": 62,
	"./it": 63,
	"./it.js": 63,
	"./ja": 64,
	"./ja.js": 64,
	"./jv": 65,
	"./jv.js": 65,
	"./ka": 66,
	"./ka.js": 66,
	"./kk": 67,
	"./kk.js": 67,
	"./km": 68,
	"./km.js": 68,
	"./kn": 69,
	"./kn.js": 69,
	"./ko": 70,
	"./ko.js": 70,
	"./ky": 71,
	"./ky.js": 71,
	"./lb": 72,
	"./lb.js": 72,
	"./lo": 73,
	"./lo.js": 73,
	"./lt": 74,
	"./lt.js": 74,
	"./lv": 75,
	"./lv.js": 75,
	"./me": 76,
	"./me.js": 76,
	"./mi": 77,
	"./mi.js": 77,
	"./mk": 78,
	"./mk.js": 78,
	"./ml": 79,
	"./ml.js": 79,
	"./mr": 80,
	"./mr.js": 80,
	"./ms": 82,
	"./ms-my": 81,
	"./ms-my.js": 81,
	"./ms.js": 82,
	"./my": 83,
	"./my.js": 83,
	"./nb": 84,
	"./nb.js": 84,
	"./ne": 85,
	"./ne.js": 85,
	"./nl": 87,
	"./nl-be": 86,
	"./nl-be.js": 86,
	"./nl.js": 87,
	"./nn": 88,
	"./nn.js": 88,
	"./pa-in": 89,
	"./pa-in.js": 89,
	"./pl": 90,
	"./pl.js": 90,
	"./pt": 92,
	"./pt-br": 91,
	"./pt-br.js": 91,
	"./pt.js": 92,
	"./ro": 93,
	"./ro.js": 93,
	"./ru": 94,
	"./ru.js": 94,
	"./sd": 95,
	"./sd.js": 95,
	"./se": 96,
	"./se.js": 96,
	"./si": 97,
	"./si.js": 97,
	"./sk": 98,
	"./sk.js": 98,
	"./sl": 99,
	"./sl.js": 99,
	"./sq": 100,
	"./sq.js": 100,
	"./sr": 102,
	"./sr-cyrl": 101,
	"./sr-cyrl.js": 101,
	"./sr.js": 102,
	"./ss": 103,
	"./ss.js": 103,
	"./sv": 104,
	"./sv.js": 104,
	"./sw": 105,
	"./sw.js": 105,
	"./ta": 106,
	"./ta.js": 106,
	"./te": 107,
	"./te.js": 107,
	"./tet": 108,
	"./tet.js": 108,
	"./th": 109,
	"./th.js": 109,
	"./tl-ph": 110,
	"./tl-ph.js": 110,
	"./tlh": 111,
	"./tlh.js": 111,
	"./tr": 112,
	"./tr.js": 112,
	"./tzl": 113,
	"./tzl.js": 113,
	"./tzm": 115,
	"./tzm-latn": 114,
	"./tzm-latn.js": 114,
	"./tzm.js": 115,
	"./uk": 116,
	"./uk.js": 116,
	"./ur": 117,
	"./ur.js": 117,
	"./uz": 119,
	"./uz-latn": 118,
	"./uz-latn.js": 118,
	"./uz.js": 119,
	"./vi": 120,
	"./vi.js": 120,
	"./x-pseudo": 121,
	"./x-pseudo.js": 121,
	"./yo": 122,
	"./yo.js": 122,
	"./zh-cn": 123,
	"./zh-cn.js": 123,
	"./zh-hk": 124,
	"./zh-hk.js": 124,
	"./zh-tw": 125,
	"./zh-tw.js": 125
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 176;

/***/ }),
/* 177 */,
/* 178 */,
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "customer_feedback/static/img/icon_android.3130985.png";

/***/ }),
/* 180 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNTAwcHgiIGhlaWdodD0iNTAwcHgiIHZpZXdCb3g9IjAgMCA1MDAgNTAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MDAgNTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGZpbGw9IiM1MjUyNTIiIGQ9Ik03NS4yODMsMjYyLjU0OWMyLjA3LTM2Ljg3MywxMi41MjktNzUuMzQ2LDQ3Ljk0LTEwMi4xODJjMjcuOTA1LTIxLjE1LDU4LjYxMy0yNi43NjIsOTIuMjMzLTE0LjQxMg0KCQljNDUuNjkxLDE2Ljc4MiwzMS4yMzcsMTYuNjAxLDc2LjMwOS0wLjIwMWM0Ny4zMTEtMTcuNjQxLDkzLjkyNi0wLjQ3MywxMTYuNzk0LDI2Ljc3MWM0LjczNSw1LjYzNiw2LjY0NCw4LjU4NS0xLjE3OCwxNC4yOTUNCgkJYy01Ni40NzIsNDEuMjQ1LTUwLjk1NiwxMjUuMzEyLDEwLjI3OSwxNTkuNDhjNi43MzUsMy43NTMsOC41MjksNi4yNDYsNS40NjYsMTQuMDgzYy0xMi43MzgsMzIuNjA1LTMwLjMyMSw2MS45ODEtNTQuOTI0LDg2LjkyNQ0KCQljLTE2LjU0NCwxNi43NjktMzYuMTQ2LDIyLjA2Ni01OC43NTMsMTMuNzk5Yy00LjIwOC0xLjUzOC04LjUyOS0yLjc5OS0xMi42MDQtNC42MjRjLTI1LjQ2OS0xMS4zODktNTAuODg2LTEwLjgxNy03Ni4yLDAuMzI4DQoJCWMtOC41MzgsMy43Ni0xNy40MTMsNi40MzItMjYuNDM1LDguMzcxYy0xNC4wNjksMy4wMjEtMjUuODAyLTMuMjk4LTM2LjE2Ny0xMS42MTljLTIwLjc4NC0xNi42OTUtMzUuMjY3LTM4LjYxMy00OC4zNTgtNjEuNDMxDQoJCUM4OS4yMTYsMzU2LjQ1OCw3NS4yNDUsMzA1LjI4NCw3NS4yODMsMjYyLjU0OXoiLz4NCgk8cGF0aCBmaWxsPSIjNTI1MjUyIiBkPSJNMzM2Ljg4NCw0Ni4wNThjLTAuNjUsMzguMTAyLTMwLjIyOSw3Ny4yNTctNjQuOTk4LDg2LjA2MmMtMjAuMzMsNS4xNDYtMjQuNDksMS4zMjktMjAuNzEyLTE5LjAwOA0KCQljNy4zODQtMzkuNzY0LDM4LjY5LTcwLjU4Niw3OS41OTgtNzguNzA4YzQuODA1LTAuOTU2LDYuNTM2LDAuMTMzLDYuMTMxLDQuOTM2QzMzNi43MjMsNDEuNTY1LDMzNi44NzgsNDMuODE2LDMzNi44ODQsNDYuMDU4eiIvPg0KPC9nPg0KPC9zdmc+DQo="

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "customer_feedback/static/img/logo.edd427a.png";

/***/ }),
/* 182 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 183 */,
/* 184 */,
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(172)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(154),
  /* template */
  __webpack_require__(201),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7039eb46",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(170)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(155),
  /* template */
  __webpack_require__(199),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6043a05c",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(167)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(156),
  /* template */
  __webpack_require__(196),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0bc7159b",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(173)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(157),
  /* template */
  __webpack_require__(202),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-87d33320",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(171)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(158),
  /* template */
  __webpack_require__(200),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6675eee0",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(165)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(159),
  /* template */
  __webpack_require__(194),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-08b986aa",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(168)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(160),
  /* template */
  __webpack_require__(197),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-4124112c",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(169)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(161),
  /* template */
  __webpack_require__(198),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-44b1e36c",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(174)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(162),
  /* template */
  __webpack_require__(203),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-a1f0ab0a",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 194 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._m(0), _vm._v(" "), (_vm.second_graph) ? _c('div', [_c('div', {
    attrs: {
      "id": "comparison_graph_2"
    }
  })]) : _vm._e()])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    attrs: {
      "id": "comparison_graph"
    }
  })])
}]}

/***/ }),
/* 195 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('link', {
    attrs: {
      "rel": "stylesheet",
      "href": "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    }
  }), _vm._v(" "), _c('link', {
    attrs: {
      "rel": "stylesheet",
      "href": "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    }
  }), _vm._v(" "), _c('div', [_c('ul', {
    staticClass: "nav_main"
  }, [_c('li', [_c('div', [_c('img', {
    attrs: {
      "src": _vm.images.logoSrc
    }
  })])]), _vm._v(" "), _c('li', [_c('div', {
    class: {
      active_page: _vm.showAppComparison
    },
    on: {
      "click": function($event) {
        _vm.changePage('showAppComparison')
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-globe fa-2x"
  }), _c('br'), _vm._v("App Comparison")])]), _vm._v(" "), _c('li', [_c('div', {
    class: {
      active_page: _vm.showCustomerFeedback
    },
    on: {
      "click": function($event) {
        _vm.changePage('showCustomerFeedback')
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-comments-o fa-2x"
  }), _c('br'), _vm._v("Customer Feedback")])]), _vm._v(" "), _c('li', [_c('div', {
    class: {
      active_page: _vm.showMobileDownload
    },
    on: {
      "click": function($event) {
        _vm.changePage('showMobileDownload')
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-mobile fa-2x"
  }), _c('br'), _vm._v("Mobile Download")])]), _vm._v(" "), _c('li', {
    staticStyle: {
      "float": "right"
    }
  }, [_c('div', {
    on: {
      "click": _vm.logout
    }
  }, [_c('i', [_c('img', {
    staticStyle: {
      "border-radius": "50%"
    },
    attrs: {
      "src": _vm.images.profilePic
    }
  })]), _c('br'), _vm._v("Logout")])])])]), _vm._v(" "), (_vm.showAppComparison) ? _c('div', [_c('app-comparison')], 1) : _vm._e(), _vm._v(" "), (_vm.showCustomerFeedback) ? _c('div', [_c('customer-feedback')], 1) : _vm._e(), _vm._v(" "), (_vm.showMobileDownload) ? _c('div', [_c('mobile-download')], 1) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 196 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-12"
  }, [_c('h3', [_vm._v("Mobile Download")])])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "coming_soon"
  }, [_vm._v("\n                COMING SOON\n            ")])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', [_vm._v("\n                Download the mobile version of the App Comparison / Customer Feedback dashboard from this page so that you can see the dashboard anytime and anywhere on your phone\n            ")])])])])
}]}

/***/ }),
/* 197 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-6"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-6"
  }, [_c('div', {
    staticClass: "comments_search"
  }, [_vm._v("Search Comments: "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.query),
      expression: "query"
    }],
    staticStyle: {
      "width": "200px"
    },
    attrs: {
      "type": "text",
      "name": "query"
    },
    domProps: {
      "value": (_vm.query)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.query = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "col-sm-6"
  }, [_c('div', {
    staticStyle: {
      "text-align": "right"
    }
  }, [_c('i', {
    staticClass: "fa fa-download fa-2x export_button",
    attrs: {
      "title": "Download to CSV"
    },
    on: {
      "click": function($event) {
        _vm.exportDataToCSV()
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-12"
  }, [_c('div', [_c('table', {
    staticClass: "table table-striped",
    staticStyle: {
      "width": "100%",
      "border-bottom": "1px solid #e6e6e6"
    }
  }, [_c('thead', [_c('tr', [_vm._m(0), _vm._v(" "), _c('th', {
    staticClass: "table_comment",
    staticStyle: {
      "text-align": "center"
    }
  }, [_c('div', [_vm._v("\n                                                Comment ( " + _vm._s(_vm.tableFilter.length) + " showing)\n                                            ")]), _vm._v(" "), _vm._m(1)]), _vm._v(" "), _vm._m(2), _vm._v(" "), _vm._m(3)])]), _vm._v(" "), _c('tbody', _vm._l((_vm.tableFilter), function(item) {
    return _c('tr', {
      key: item.id
    }, [_c('td', {
      staticClass: "table_date"
    }, [_vm._v(_vm._s(item.date))]), _vm._v(" "), _c('td', {
      staticClass: "table_comment"
    }, [_vm._m(4, true), _vm._v(" "), _c('div', [_vm._v("\n                                                " + _vm._s(item.english) + "\n                                            ")]), _c('br'), _vm._v(" "), _vm._m(5, true), _vm._v(" "), _c('div', [_vm._v("\n                                                " + _vm._s(item.spanish) + "\n                                            ")])]), _vm._v(" "), _c('td', {
      staticClass: "table_rating"
    }, [_vm._v("\n                                            " + _vm._s(item.rating) + "\n                                        ")]), _vm._v(" "), _vm._m(6, true)])
  }))])])])])]), _vm._v(" "), _vm._m(7)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('th', {
    staticClass: "table_date"
  }, [_c('div', [_vm._v("\n                                                Date    \n                                            ")]), _vm._v(" "), _c('div', [_c('span', [_c('i', {
    staticClass: "fa fa-arrow-circle-o-down"
  })]), _vm._v(" "), _c('span', [_c('i', {
    staticClass: "fa fa-arrow-circle-o-up"
  })])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "font-weight": "normal",
      "font-style": "italic"
    }
  }, [_vm._v("\n                                                current avg: 2.3 - predicted avg: 0 "), _c('span', [_c('i', {
    staticClass: "fa fa-question-circle-o"
  })])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('th', {
    staticClass: "table_rating"
  }, [_c('div', [_vm._v("\n                                                Rating\n                                            ")]), _vm._v(" "), _c('div', [_c('span', [_c('i', {
    staticClass: "fa fa-arrow-circle-o-down"
  })]), _vm._v(" "), _c('span', [_c('i', {
    staticClass: "fa fa-arrow-circle-o-up"
  })])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('th', {
    staticClass: "table_disable"
  }, [_c('div', [_vm._v("\n                                                Disable\n                                            ")]), _vm._v(" "), _c('div', [_c('span', [_c('i', {
    staticClass: "fa fa-question-circle-o"
  })])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('strong', [_vm._v("English Comment")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('strong', [_vm._v("Spanish Comment")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('td', {
    staticClass: "table_disable"
  }, [_c('input', {
    attrs: {
      "type": "checkbox"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-sm-6"
  }, [_c('div', [_c('div', {
    staticStyle: {
      "height": "250px"
    },
    attrs: {
      "id": "android_breakdown_graph"
    }
  })]), _vm._v(" "), _c('div', [_c('div', [_c('div', {
    staticClass: "word_frequency_graph"
  }, [_c('div', {
    staticStyle: {
      "height": "250px"
    },
    attrs: {
      "id": "android_word_frequency"
    }
  })])]), _vm._v(" "), _c('div', [_c('div', {
    staticClass: "edit_word_wrapper"
  }, [_c('div', {
    staticClass: "highlight_words"
  }, [_c('div', [_c('input', {
    attrs: {
      "type": "checkbox"
    }
  }), _vm._v(" Highlight word frequency in reviews    \n                                ")])]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-default"
  }, [_vm._v("Edit Words")])]), _vm._v(" "), _c('div', {
    staticClass: "custom_word_wrapper"
  }, [_c('div', [_vm._v("Add custom word to search for:")]), _vm._v(" "), _c('div', [_c('input', {
    attrs: {
      "type": "text"
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "btn btn-default"
  }, [_vm._v("Add")])])])])])])
}]}

/***/ }),
/* 198 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-6"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-6"
  }, [_c('div', {
    staticClass: "comments_search"
  }, [_vm._v("Search Comments: "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.query),
      expression: "query"
    }],
    staticStyle: {
      "width": "200px"
    },
    attrs: {
      "type": "text",
      "name": "query"
    },
    domProps: {
      "value": (_vm.query)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.query = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "col-sm-6"
  }, [_c('div', {
    staticStyle: {
      "text-align": "right"
    }
  }, [_c('i', {
    staticClass: "fa fa-download fa-2x export_button",
    attrs: {
      "title": "Download to CSV"
    },
    on: {
      "click": function($event) {
        _vm.exportDataToCSV()
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-12"
  }, [_c('div', [_c('table', {
    staticClass: "table table-striped",
    staticStyle: {
      "width": "100%",
      "border-bottom": "1px solid #e6e6e6"
    }
  }, [_c('thead', [_c('tr', [_c('th', {
    staticClass: "table_date"
  }, [_vm._v("Date")]), _vm._v(" "), _c('th', {
    staticClass: "table_comment",
    staticStyle: {
      "text-align": "center"
    }
  }, [_vm._v("Comment ( " + _vm._s(_vm.tableFilter.length) + " showing)")]), _vm._v(" "), _c('th', {
    staticClass: "table_rating"
  }, [_vm._v("Rating")])])]), _vm._v(" "), _c('tbody', _vm._l((_vm.tableFilter), function(item) {
    return _c('tr', {
      key: item.id
    }, [_c('td', {
      staticClass: "table_date"
    }, [_vm._v(_vm._s(item.date))]), _vm._v(" "), _c('td', {
      staticClass: "table_comment"
    }, [_vm._m(0, true), _vm._v(" "), _c('div', [_vm._v("\n                                                " + _vm._s(item.english) + "\n                                            ")]), _c('br'), _vm._v(" "), _vm._m(1, true), _vm._v(" "), _c('div', [_vm._v("\n                                                " + _vm._s(item.spanish) + "\n                                            ")])]), _vm._v(" "), _c('td', {
      staticClass: "table_rating"
    }, [_vm._v("\n                                            " + _vm._s(item.rating) + "\n                                        ")])])
  }))])])])])]), _vm._v(" "), _vm._m(2)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('strong', [_vm._v("English Comment")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('strong', [_vm._v("Spanish Comment")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-sm-6"
  }, [_c('div', [_c('div', {
    staticStyle: {
      "height": "250px"
    },
    attrs: {
      "id": "ios_breakdown_graph"
    }
  })]), _vm._v(" "), _c('div', [_c('div', [_c('div', {
    staticClass: "word_frequency_graph"
  }, [_c('div', {
    staticStyle: {
      "height": "250px"
    },
    attrs: {
      "id": "ios_word_frequency"
    }
  })])]), _vm._v(" "), _c('div', [_c('div', {
    staticClass: "edit_word_wrapper"
  }, [_c('div', {
    staticClass: "highlight_words"
  }, [_c('div', [_c('input', {
    attrs: {
      "type": "checkbox"
    }
  }), _vm._v(" Highlight word frequency in reviews    \n                                ")])]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-default"
  }, [_vm._v("Edit Words")])]), _vm._v(" "), _c('div', {
    staticClass: "custom_word_wrapper"
  }, [_c('div', [_vm._v("Add custom word to search for:")]), _vm._v(" "), _c('div', [_c('input', {
    attrs: {
      "type": "text"
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "btn btn-default"
  }, [_vm._v("Add")])])])])])])
}]}

/***/ }),
/* 199 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', [_c('link', {
    attrs: {
      "rel": "stylesheet",
      "type": "text/css",
      "href": "//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css"
    }
  }), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('br'), _c('br'), _vm._v(" "), _c('div', [_c('div', {
    staticStyle: {
      "position": "relative"
    }
  }, [_vm._v("\n                App Search: "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.query),
      expression: "query"
    }],
    staticStyle: {
      "width": "200px"
    },
    attrs: {
      "type": "text",
      "name": "query"
    },
    domProps: {
      "value": (_vm.query)
    },
    on: {
      "focus": _vm.toggleSearchAppList,
      "blur": _vm.toggleSearchAppList,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.query = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.show_app_list) ? _c('div', {
    staticClass: "search_app"
  }, _vm._l((_vm.searchAppFilter), function(item) {
    return _c('ul', [_c('li', {
      on: {
        "click": function($event) {
          _vm.changeAppName(item.app)
        }
      }
    }, [_vm._v(_vm._s(item.app))])])
  })) : _vm._e()]), _vm._v(" "), _c('h2', [_vm._v(_vm._s(_vm.appName))])]), _vm._v(" "), (!_vm.showUI) ? _c('div', {
    staticStyle: {
      "margin": "60px 0"
    }
  }, [_c('i', {
    staticClass: "fa fa-spinner fa-3x fa-pulse fa-fw"
  })]) : _vm._e(), _vm._v(" "), (_vm.showUI) ? _c('div', [_vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-6"
  }, [_c('div', {
    staticClass: "rating_border"
  }, [_c('div', {
    staticStyle: {
      "font-size": "2em"
    }
  }, [_c('img', {
    staticClass: "icon_size",
    attrs: {
      "src": _vm.icons.iconAndroid
    }
  }), _vm._v(" Android\n                        ")]), _vm._v(" "), _c('div', [_c('all-time-rating', {
    attrs: {
      "rating_data": _vm.androidData
    }
  })], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "col-sm-6"
  }, [_c('div', {
    staticClass: "rating_border"
  }, [_c('div', {
    staticStyle: {
      "font-size": "2em"
    }
  }, [_c('img', {
    staticClass: "icon_size",
    attrs: {
      "src": _vm.icons.iconIOS
    }
  }), _vm._v(" iOS\n                        ")]), _vm._v(" "), _c('div', [_c('all-time-rating', {
    attrs: {
      "rating_data": _vm.iosData
    }
  })], 1)])])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-12"
  }, [_c('all-time-rating-trend')], 1)]), _vm._v(" "), _vm._m(2), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-3"
  }, [_c('word-frequency-graph', {
    staticClass: "word_frequency_graph",
    attrs: {
      "word_frequency_id": "wf_tech_issues"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "col-sm-6"
  }, [_c('word-frequency-graph', {
    staticClass: "word_frequency_graph",
    attrs: {
      "word_frequency_id": "review_rating_comparison"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "col-sm-3"
  }, [_c('word-frequency-graph', {
    staticClass: "word_frequency_graph",
    attrs: {
      "word_frequency_id": "wf_performance_issues"
    }
  })], 1)]), _vm._v(" "), _vm._m(3), _vm._v(" "), _vm._m(4), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-12",
    staticStyle: {
      "font-size": "2em"
    }
  }, [_c('img', {
    staticClass: "icon_size",
    attrs: {
      "src": _vm.icons.iconAndroid
    }
  }), _vm._v(" Android\n                ")])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-12"
  }, [_c('reviews-android', {
    staticClass: "review_table"
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-12",
    staticStyle: {
      "font-size": "2em"
    }
  }, [_c('img', {
    staticClass: "icon_size",
    attrs: {
      "src": _vm.icons.iconIOS
    }
  }), _vm._v(" iOS\n                ")])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-12"
  }, [_c('reviews-ios', {
    staticClass: "review_table"
  })], 1)])]) : _vm._e()])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('h3', [_vm._v("Customer Feedback")]), _vm._v(" "), _c('div', [_c('i', [_vm._v("currently using dummy data. Implementation of actual data coming soon.  Still a work in progress")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-12"
  }, [_c('hr'), _vm._v(" "), _c('h3', [_c('strong', [_vm._v("All Time Ratings")])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-12"
  }, [_c('hr'), _vm._v(" "), _c('h3', [_c('strong', [_vm._v("Review Analysis")])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-12"
  }, [_c('hr'), _vm._v(" "), _c('h3', [_c('strong', [_vm._v("Reviews")])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-12"
  }, [_c('div', [_c('strong', [_vm._v("Date Range:")])]), _vm._v(" "), _c('div', {
    staticClass: "date_range_wrapper",
    attrs: {
      "id": "date_range"
    }
  })])])
}]}

/***/ }),
/* 200 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-3",
    staticStyle: {
      "text-align": "center"
    }
  }, [_c('div', {
    staticStyle: {
      "font-size": "5em"
    }
  }, [_vm._v("\n                    " + _vm._s(_vm.all_time_rating) + "\n                ")]), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin": "10px 0"
    }
  }, [_c('span', {
    staticClass: "star_image_wrapper"
  }, [_c('div', {
    staticClass: "star_image_background",
    style: ({
      width: _vm.star_rating_fill.star_1 + '%'
    })
  }, [_c('img', {
    staticClass: "star_image",
    attrs: {
      "src": _vm.images.starImage
    }
  })])]), _vm._v(" "), _c('span', {
    staticClass: "star_image_wrapper"
  }, [_c('div', {
    staticClass: "star_image_background",
    style: ({
      width: _vm.star_rating_fill.star_2 + '%'
    })
  }, [_c('img', {
    staticClass: "star_image",
    attrs: {
      "src": _vm.images.starImage
    }
  })])]), _vm._v(" "), _c('span', {
    staticClass: "star_image_wrapper"
  }, [_c('div', {
    staticClass: "star_image_background",
    style: ({
      width: _vm.star_rating_fill.star_3 + '%'
    })
  }, [_c('img', {
    staticClass: "star_image",
    attrs: {
      "src": _vm.images.starImage
    }
  })])]), _vm._v(" "), _c('span', {
    staticClass: "star_image_wrapper"
  }, [_c('div', {
    staticClass: "star_image_background",
    style: ({
      width: _vm.star_rating_fill.star_4 + '%'
    })
  }, [_c('img', {
    staticClass: "star_image",
    attrs: {
      "src": _vm.images.starImage
    }
  })])]), _vm._v(" "), _c('span', {
    staticClass: "star_image_wrapper"
  }, [_c('div', {
    staticClass: "star_image_background",
    style: ({
      width: _vm.star_rating_fill.star_5 + '%'
    })
  }, [_c('img', {
    staticClass: "star_image",
    attrs: {
      "src": _vm.images.starImage
    }
  })])])])]), _vm._v(" "), _c('div', {
    staticClass: "col-sm-6"
  }, [_c('highcharts', {
    staticStyle: {
      "height": "150px",
      "width": "100%"
    },
    attrs: {
      "options": _vm.options
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "col-sm-3",
    staticStyle: {
      "text-align": "left"
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-12"
  }, [_c('div', {
    staticStyle: {
      "font-size": "1em"
    }
  }, [_vm._v("Total ratings")]), _vm._v(" "), _c('div', {
    staticStyle: {
      "font-size": "1.3em"
    }
  }, [_c('strong', [_vm._v(_vm._s(_vm.total_rating_count))])])])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-12"
  }, [_c('div', {
    staticStyle: {
      "font-size": "1em"
    }
  }, [_vm._v("Ratings with reviews")]), _vm._v(" "), _c('div', {
    staticStyle: {
      "font-size": "1.3em"
    }
  }, [_c('strong', [_vm._v(_vm._s(_vm.ratings_with_reviews_count))])])])])])])])
},staticRenderFns: []}

/***/ }),
/* 201 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', [_vm._m(0), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin": "60px 0"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-2"
  }, [_c('ul', {
    staticClass: "app_compare"
  }, [_c('li', {
    class: {
      active_comparison: _vm.highlightCompetitors
    },
    on: {
      "click": _vm.showCompetitors
    }
  }, [_vm._v("Competitor App Ratings")]), _vm._v(" "), _c('li', {
    class: {
      active_comparison: _vm.highlightBBVA
    },
    on: {
      "click": _vm.showBBVA
    }
  }, [_vm._v("BBVA App Ratings")]), _vm._v(" "), _c('li', {
    class: {
      active_comparison: _vm.highlightNPS
    },
    on: {
      "click": _vm.showNPS
    }
  }, [_vm._v("NPS")])])]), _vm._v(" "), _c('div', {
    staticClass: "col-sm-10"
  }, [(_vm.showLoading) ? _c('div', [_vm._v("\n                    loading data...\n                ")]) : _vm._e(), _vm._v(" "), (!_vm.showLoading) ? _c('div', [_c('comparison-graph', {
    staticClass: "graph",
    attrs: {
      "graph_data": _vm.graphData
    }
  })], 1) : _vm._e()])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-12"
  }, [_c('h3', [_vm._v("App Comparison")]), _vm._v(" "), _c('div', [_c('i', [_vm._v("currently using dummy data. Implementation of actual data coming soon.  Still a work in progress")])])])])
}]}

/***/ }),
/* 202 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticStyle: {
      "height": "350px"
    },
    attrs: {
      "id": "trend_graph"
    }
  })])])
}]}

/***/ }),
/* 203 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticStyle: {
      "height": "350px"
    },
    attrs: {
      "id": _vm.word_frequency_id
    }
  })])])
},staticRenderFns: []}

/***/ })
]),[163]);
//# sourceMappingURL=app.3c0ae0367516fdfd92f7.js.map