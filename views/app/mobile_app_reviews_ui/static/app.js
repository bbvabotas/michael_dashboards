var i = 0, comments_data = [],
    start_date = moment().subtract(1, 'weeks').day(0).format('YYYY-MM-DD'),
    end_date = moment().subtract(1, 'weeks').day(6).format('YYYY-MM-DD'),
    collection = "mobile-android-argentina";

var app;


/*      Change data based on dropdown selection     */
				
$('select').on('change', function(){
//    console.log($(this).val())
    collection = 'mobile'
    $('select').each(function(){
        collection += '-' + $(this).val().toLowerCase()
    })
    
    start_date = moment().subtract(1, 'weeks').day(0).format('YYYY-MM-DD')
    end_date = moment().subtract(1, 'weeks').day(6).format('YYYY-MM-DD')
    
    $('#date_range').data('daterangepicker').setStartDate(start_date)
    $('#date_range').data('daterangepicker').setEndDate(end_date)
    
    app.getData();
});


/*      Date range picker       */

$('#date_range').daterangepicker({
    maxDate: moment().format('YYYY-MM-DD'),
    opens: 'left',
    locale: {
        format: 'YYYY-MM-DD'
    },
    startDate: moment().subtract(1, 'weeks').day(0).format('YYYY-MM-DD'),
    endDate: moment().subtract(1, 'weeks').day(6).format('YYYY-MM-DD')
}, function(start, end, label) {
    start_date = start.format('YYYY-MM-DD'), end_date = end.format('YYYY-MM-DD');

    app.getData();
    
});


/*      Clipboard       */

var clipboard = new Clipboard('#btn_copy');

clipboard.on('success', function(e) {
    app.show_copy_success = true
    setTimeout(()=>{
        app.show_copy_success = false
    }, 2000)
    e.clearSelection();
});

app = new Vue({
    el: '#app',
    data: {
        show_loading: true,
        show_copy_success: false,
        review_num: 0,
        star_one_count: 0,
        star_two_count: 0,
        selected_country: '',
        selected_reviews: [],
        review_of_the_week: {
            english_subject: '',
            english_body: '',
            translated_subject: '',
            translated_body: '',
            rating: 0
        },
        appbot_graph_data: {
            star_5: {
                count: 0,
                width: 0
            },
            star_4: {
                count: 0,
                width: 0
            },
            star_3: {
                count: 0,
                width: 0
            },
            star_2: {
                count: 0,
                width: 0
            },
            star_1: {
                count: 0,
                width: 0
            }
        },
        star_rating_fill: {
            star_1: 0,
            star_2: 0,
            star_3: 0,
            star_4: 0,
            star_5: 0
        },
        appbot_review_count: 0,
        appbot_review_avg: 0,
        email_sent_confirm: '',
        email_platform: 'Android',
        email_country: '',
        email_start_date: '',
        email_end_date: ''
    },
    mounted(){
        this.getData();
    },
    methods: {
        getData(){
            var this_vm = this;
            
            
            //Show the loading bar
            this.show_loading = true;
            
            //Blank out the review of the week
            this.review_of_the_week = {
                english_subject: '',
                english_body: '',
                translated_subject: '',
                translated_body: '',
                rating: 0
            }
            
            //console.log(start_date + ' to ' + end_date + ' for ' + collection)
            //https://botas-mlab-appreviews.herokuapp.com/api/get_wallet_data
            axios.get('http://ec2-34-224-93-84.compute-1.amazonaws.com:8080/api/get_mobile_data?start_date=' + start_date + '&end_date=' + end_date + '&current_collection=' + collection)
            .then(function (response) {
                
                /*
                
                    Update the title of the email
                
                */
                
                //Change the country to the one selected
                this_vm.email_country = emailCountries[collection]

                //Change the platform to the one selected
                if(collection.match('android')){
                    this_vm.email_platform = 'Android'
                } else {
                    this_vm.email_platform = 'iOS'
                }

                //Change the start and end dates
                this_vm.email_start_date = moment(start_date).format('MMM-DD')
                this_vm.email_end_date = moment(end_date).format('MMM-DD')


                /*
                
                    Update the data
                
                */

                this_vm.selected_reviews = response.data.reviews
                this_vm.review_num = response.data.reviews.length
                this_vm.selected_country = collection.split('-')[2]
                this_vm.show_loading = false
                
                setTimeout(function(){
                    this_vm.showAppbotGraph(response.data.reviews)
                    this_vm.showGraph(response.data.trend)
                    this_vm.showNegativeReviews(response.data.reviews)
                }, 1000)
                
                
            })
            .catch(function (error) {
                console.log(error);
            });
            
        },
        reviewOfTheWeek(review){
            this.review_of_the_week.english_subject = review.english_subject
            this.review_of_the_week.english_body = review.english_body
            this.review_of_the_week.translated_subject = review.translated_subject
            this.review_of_the_week.translated_body = review.translated_body
            this.review_of_the_week.rating = review.rating
        },
        showAppbotGraph(data){
            console.log(data)
            let i = 0, this_vm = this
            
            //Blank out appbot graph data
            this.appbot_graph_data = {
                star_5: {
                    count: 0,
                    width: 0
                },
                star_4: {
                    count: 0,
                    width: 0
                },
                star_3: {
                    count: 0,
                    width: 0
                },
                star_2: {
                    count: 0,
                    width: 0
                },
                star_1: {
                    count: 0,
                    width: 0
                }
            }
            
            //Review Count
            
            this.appbot_review_count = data.length
            
            //Review Avg Rating
            
            let temp_rating = 0
            
            if(data.length > 0){
                for(i = 0; i < data.length; i++){
                    temp_rating += data[i].rating   
                }
                temp_rating = (temp_rating / data.length).toFixed(1)
            }
            
            this.appbot_review_avg = temp_rating
            
            //Graph
            
            let total_temp = data.length
            
            if(data.length > 0){
                for(i = 0; i < data.length; i++){
                    this_vm.appbot_graph_data['star_' + data[i].rating].count++
                }

                for(i = 1; i <= 5; i++){
                    this_vm.appbot_graph_data['star_' + i].width = (this_vm.appbot_graph_data['star_' + i].count / total_temp) * 100
                }
            }
            
            
            //Star width
                
            this.star_rating_fill = {
                star_1: 0,
                star_2: 0,
                star_3: 0,
                star_4: 0,
                star_5: 0
            }
            
            let rating_temp = parseFloat(temp_rating)

            for(let i = 1; i < 6; i++){
                if(rating_temp > 1){
                    this.star_rating_fill['star_' + i] = 100
                    rating_temp--;
                } else {
                    this.star_rating_fill['star_' + i] = parseInt((rating_temp * 100).toFixed(0))
                    break;
                }
            }
            
        },
        showGraph(data){
            //console.log(data);
            
            var i = 0, j = 0,
                chart_data = {
                    categories: [],
                    data: [],
                    review_counts: []
                }
            
            for(i = 0; i < data.length; i++){
                if(collection in data[i]){
                    //console.log(data[i][collection])
                    
                    for(j = 0; j < data[i][collection].length; j++){
                        chart_data.categories.push(
                            moment(data[i][collection][j].date_range.from).format('MMM-DD') + '<br>to<br>' + moment(data[i][collection][j].date_range.to).format('MMM-DD')
                        )
                        if(data[i][collection][j].review_average_rating === null){
                            chart_data.data.push(0)
                        } else {
                            chart_data.data.push(data[i][collection][j].review_average_rating)
                        }
                        
                        chart_data.review_counts.push(data[i][collection][j].review_count)
                    }
                    
                    
                    break;
                }
            }
            
            Highcharts.chart('ratings_over_time_chart', {
//                chart: {
//                    type: 'line'  
//                },
                title: {
                    text: 'Average Review Rating Trend For Last 7 Weeks'
                },
//                subtitle: {
//                    text: 'avg: '
//                },
                xAxis: {
                    categories: chart_data.categories,
                    labels: {
                        //rotation: -80,
//                        formatter: function(){
//                            return (this.value) + '<br> reviews: ';
//                        }
                    }
                },
                yAxis: [{
                    visible: true,
                    title: {
                        text: 'Average Review Rating'
                    },
                    //tickInterval: 2,
                    min: 0,
                    max: 6
                },{
                    visible: true,
                    title: {
                        text: 'Number of reviews',
                        style: {
                            "color": "#7cb5ec"
                        }
                    },
                    opposite: true,
                    //tickInterval: 2
//                    min: 0,
//                    max: 4
                }],
                tooltip: {
                    enabled: false
                },
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
//                            formatter: function(){
//                                if(this.y === null){
//                                    return 0
//                                } else {
//                                    return this.y
//                                }
//                            }
                        },
                        color: "black",
                        shadow: true
                    },
                    column: {
                        dataLabels: {
                            enabled: true,
                            formatter: function(){
                                if(this.y > 0){
                                    return this.y
                                }
                            },
                            inside: true,
                            verticalAlign: 'bottom'
                        },
                        color: "#7cb5ec"
                        //borderWidth: 0,
                        //shadow: true
                    }
                },
                series: [{
                    type: 'line',
                    yAxis: 0,
                    zIndex: 10,
                    data: chart_data.data
                },{
                    type: 'column',
                    yAxis: 1,
                    data: chart_data.review_counts
                }]
            });
        },
        showNegativeReviews(data){
            var this_vm = this;
            var i = 0, j = 0, k = 0;
            var search_words = [
                "update", "app", "bank", "deposit", "error", "account", "fund", "transactions", "logon", "login", "budget", "money", "security",
                "crash", "password", "card", "bbva", "mobile", "version", "support", "register", "data", "transfer", "enter", "access", "key",
                "check", "experience", "charge", "receipt", "load", "service", "photo", "fix", "activate", "text", "link", "cell", "code",
                "install", "pay", "stuck", "token", "registration", "telephone", "payment", "payroll", "slow", "withdraw", "identity", "verify",
                "verification", "authentication", "authenticate", "unstable", "bad", "sign", "open", "visa", "direct", "unavailable", "confirmation"
            ];
            
            var excluded_words = [
                "1", "2",
                "15",
                "s", "t", 
                "101", "a", "able", "after", "all", "am", "any", "apparently", "are", "asterisks", "be", "better", "but", "cannot", "do",
                "even", "ever", "generated", "handle", "have", "having", "idea", "into", "late", "leading", "let", "like", "longer", "make", "me",
                "means", "more", "my", "no", "not", "now", "or", "personal", "placeholders", "recommend", "same", "should", "since", "than", "that",
                "the", "their", "they're", "there", "them", "they", "this", "to", "trailing", "use", "with", "without", "won", "worst", "worthless",
                "years"
            ]
            
            //Combine the one and two star reviews to do the word search
            var star_one_reviews = '',
                star_two_reviews = '';
            
            var star_one_frequency = [], star_two_frequency = [], can_add = true
            
                        
            var star_one_total = 0,
                star_two_total = 0
            
            for(i = 0; i < data.length; i++){
                if(parseInt(data[i].rating) == 1){
                    star_one_total++
                    
                    for(j = 0; j < search_words.length; j++){
                        if(data[i].english_body.toLowerCase().match(search_words[j])){
                            
                            can_add = true;
                            
                            for(k = 0; k < star_one_frequency.length; k++){
                                if(star_one_frequency[k].word == search_words[j]){
                                    can_add = false;
                                    star_one_frequency[k].count++
                                }
                            }
                            
                            if(can_add){
                                star_one_frequency.push({
                                    word: search_words[j],
                                    count: 1
                                })
                            }
                        }
                    }
                    
                } else if(parseInt(data[i].rating) == 2){
                    star_two_total++
                    
                    for(j = 0; j < search_words.length; j++){
                        if(data[i].english_body.toLowerCase().match(search_words[j])){
                            
                            can_add = true;
                            
                            for(k = 0; k < star_two_frequency.length; k++){
                                if(star_two_frequency[k].word == search_words[j]){
                                    can_add = false;
                                    star_two_frequency[k].count++
                                }
                            }
                            
                            if(can_add){
                                star_two_frequency.push({
                                    word: search_words[j],
                                    count: 1
                                })
                            }
                        }
                    }
                }
            }
            
            this.star_one_count = star_one_total;
            this.star_two_count = star_two_total;
            
            star_one_frequency.sort(function(a,b){
                return b.count - a.count
            })
            star_two_frequency.sort(function(a,b){
                return b.count - a.count
            })
            
//            console.log(data);
//            console.log(star_one_frequency)
//            console.log(star_two_frequency)
            
            
			function displayWordFrequencyTables(star_one_frequency, star_one_total, star_two_frequency, star_two_total){
				
                var star_1_data = {
                        categories: [],
                        data: []
                    },
                    star_2_data = {
                        categories: [],
                        data: []
                    }
                
                if(star_one_total > 0){
                    star_1_data.categories.push('Total')
                    star_1_data.data.push(star_one_total)
                }
                if(star_two_total > 0){
                    star_2_data.categories.push('Total')
                    star_2_data.data.push(star_two_total)
                }
                
                for(i = 0; i < 5; i++){
                    if(star_one_frequency[i] != undefined){
                        star_1_data.categories.push(star_one_frequency[i].word)
                        star_1_data.data.push(star_one_frequency[i].count)
                    } else {
                        star_1_data.categories.push('')
                        star_1_data.data.push(0)
                    }
                    
                    if(star_two_frequency[i] != undefined){
                        star_2_data.categories.push(star_two_frequency[i].word)
                        star_2_data.data.push(star_two_frequency[i].count)
                    } else {
                        star_2_data.categories.push('')
                        star_2_data.data.push(0)
                    }
                }
                
                
				var red_colors = ['#595959', '#ff8b5a', '#ff8b5a', '#ff8b5a', '#ff8b5a', '#ff8b5a'],
					orange_colors = ['#595959', '#ffb234', '#ffb234', '#ffb234', '#ffb234', '#ffb234'];
				Highcharts.chart('one_star_frequency', {
					chart: {
						type: 'bar'
					},
					colors: red_colors,
					title: {
						text: ''
					},
					xAxis: {
						categories: star_1_data.categories,
						lineWidth: 0,
						tickWidth: 0,
						labels: {
							formatter: function(){
								if(this.value == 'Total'){
									return '<b>' + this.value + '</b>';
								} else {
									return this.value;
								}
							}
						}
					},
					yAxis: {
						max: star_1_data.data[0] + 1,
						visible: false
					},
					tooltip: {enabled: false},legend: {enabled: false},credits: {enabled: false},
					plotOptions: {
						bar: {
							dataLabels: {
								enabled: true,
                                formatter: function(){
                                    if(this.y > 0){
                                        return this.y;
                                    }
                                }
							},
							colorByPoint: true,
							groupPadding: 0.1
						}
					},
					series: [{
						name: 'words',
						data: star_1_data.data
					}]
				});
				Highcharts.chart('two_star_frequency', {
					chart: {
						type: 'bar'
					},
					colors: orange_colors,
					title: {
						text: ''
					},
					xAxis: {
						categories: star_2_data.categories,
						lineWidth: 0,
						tickWidth: 0,
						labels: {
							formatter: function(){
								if(this.value == 'Total'){
									return '<b>' + this.value + '</b>';
								} else {
									return this.value;
								}
							}
						}
					},
					yAxis: {
						max: star_2_data.data[0] + 1,
						visible: false
					},
					tooltip: {enabled: false},legend: {enabled: false},credits: {enabled: false},
					plotOptions: {
						bar: {
							dataLabels: {
								enabled: true,
                                
                                formatter: function(){
                                    if(this.y > 0){
                                        return this.y;
                                    }
                                }
							},
							colorByPoint: true,
							groupPadding: 0.1
						}
					},
					series: [{
						name: 'words',
						data: star_2_data.data
					}]
				});          
			}
            
            displayWordFrequencyTables(star_one_frequency, star_one_total, star_two_frequency, star_two_total)
        }
    }
})