var i = 0

let start_date = moment().subtract(1, 'weeks').day(0).format('YYYY-MM-DD'),
    end_date = moment().subtract(1, 'weeks').day(6).format('YYYY-MM-DD'),
    android_collection = 'mobile-android-argentina',
    ios_collection = 'mobile-ios-argentina'

let start = moment().subtract(1, 'weeks').day(0),
    end = moment().subtract(1, 'weeks').day(6);

var app;

/*      Date range picker       */

$('#date_range').daterangepicker({
    opens: 'center',
    locale: {
        format: 'YYYY-MM-DD'
    },
    ranges: {
       'Today': [moment(), moment()],
       'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
       'Last Week': [moment().subtract(1, 'weeks').day(0), moment().subtract(1, 'weeks').day(6)],
       'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    startDate: start,
    endDate: end,
    minDate: moment('2017-09-01'),
    maxDate: moment(),
    alwaysShowCalendars: true
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
        english_words: [ "password", "insecure", "secure", "login", "fingerprint", "pin", "authenticate", "trust", "sign", "signature", "otp", "private"],
        spanish_words: [ "acceder", "inseguro", "seguro", "acceso", "contraseña", "clave", "huella", "autenticar", "confianza", "firmar", "firma", "privacidad"],
        show_loading: true,
        show_copy_success: false,
        show_app_list: false,
        query: '',
        android_query: '',
        ios_query: '',
        appList: [
            {app:'Argentina Mobile'},{app:'Colombia Mobile'},{app:'Mexico Mobile'},{app:'Paraguay Mobile'},
            {app:'Peru Mobile'},{app:'Spain Mobile'},{app:'US Mobile'},{app:'Venezuela Mobile'}
        ],
        appName: 'Argentina Mobile',
        selected_country: '',
        androidSortColorDateDesc: 'gray',
        androidSortColorDateAsc: 'blue',
        androidSortColorRatingDesc: 'gray',
        androidSortColorRatingAsc: 'gray',
        android_app_reviews: [],
        android_total_reviews: 0,
        android_english_word: '',
        android_spanish_word: '',
        android_english_warning_message: '',
        android_spanish_warning_message: '',
        iosSortColorDateDesc: 'gray',
        iosSortColorDateAsc: 'blue',
        iosSortColorRatingDesc: 'gray',
        iosSortColorRatingAsc: 'gray',
        ios_app_reviews: [],
        ios_total_reviews: 0,
        ios_english_word: '',
        ios_spanish_word: '',
        ios_english_warning_message: '',
        ios_spanish_warning_message: ''
    },
    mounted(){
        this.getData(start_date, end_date, android_collection);
    },
    computed: {
        searchAppFilter: function () {
            return this.searchApps(this.query)
        },
        androidTableFilter: function () {
            return this.androidFindBy(this.android_query)
        },
        iosTableFilter: function () {
            return this.iosFindBy(this.ios_query)
        }
    },
    methods: {
        getData(){
            let this_vm = this;
            
            this_vm.show_loading = true
            
            //Convert the name into DB friendly names
            let android_db = this.appName.toLowerCase()
            android_db = android_db.split(' ')
            android_collection = 'mobile-android-' + android_db[0]
            
            let ios_db = this.appName.toLowerCase()
            ios_db = ios_db.split(' ')
            ios_collection = 'mobile-ios-' + ios_db[0]
            
            //Get Android data
            axios.get('http://ec2-34-224-93-84.compute-1.amazonaws.com:8080/api/get_mobile_data?start_date=' + start_date + '&end_date=' + end_date + '&current_collection=' + android_collection)
            .then(function (response) {
                console.log(response)
                this_vm.android_app_reviews = response.data.reviews
                this_vm.android_total_reviews = response.data.reviews.length
                
                this_vm.show_loading = false
                
                this_vm.androidEnglishWordFrequencyGraphs()
                this_vm.androidSpanishWordFrequencyGraphs()
                
                let da = '', db = ''
            
                this_vm.android_app_reviews.sort(function(a,b){
                    da = new Date(a.date).getTime();
                    db = new Date(b.date).getTime();

                    return db < da ? -1 : db > da ? 1 : 0
                })
                
                //Get IOS data
                axios.get('http://ec2-34-224-93-84.compute-1.amazonaws.com:8080/api/get_mobile_data?start_date=' + start_date + '&end_date=' + end_date + '&current_collection=' + ios_collection)
                .then(function (response) {
                    console.log(response)
                    this_vm.ios_app_reviews = response.data.reviews
                    this_vm.ios_total_reviews = response.data.reviews.length

                    this_vm.iosEnglishWordFrequencyGraphs()
                    this_vm.iosSpanishWordFrequencyGraphs()

                    let da = '', db = ''

                    this_vm.ios_app_reviews.sort(function(a,b){
                        da = new Date(a.date).getTime();
                        db = new Date(b.date).getTime();

                        return db < da ? -1 : db > da ? 1 : 0
                    })

                })
                .catch(function (error) {
                    console.log(error);
                });
                
            })
            .catch(function (error) {
                console.log(error);
            });
            
        },
        toggleSearchAppList(){
            setTimeout(()=>{
                this.show_app_list = !this.show_app_list  
            }, 200)
        },
        searchApps(value){
            let search_regex = new RegExp(value, "i"),
                list = this.appList;

            return list.filter(function (item) {
                return item.app.match(search_regex);                                                
            });
        },
        changeAppName(name){
            this.appName = name
            this.query = ''
            this.getData()
        },
        androidFindBy(value){
            let search_regex = new RegExp(value, "i"),
                list = this.android_app_reviews

            return list.filter(function (item) {
                if(item.translated_body.match(search_regex) || item.english_body.match(search_regex)){
                    return item;    
                }                                       
            });
        },
        androidSortColumn(column, direction){
            let list = this.android_app_reviews;
            
            this.androidSortColorDateDesc = 'gray'
            this.androidSortColorDateAsc = 'gray'
            this.androidSortColorRatingDesc = 'gray'
            this.androidSortColorRatingAsc = 'gray'

            if(column == 'date'){
                if(direction == 'up'){
                    
                    this.androidSortColorDateDesc = 'blue'
                    
                    let da = '', db = ''
            
                    return list.sort(function(a,b){
                        da = new Date(a.date).getTime();
                        db = new Date(b.date).getTime();

                        return da < db ? -1 : da > db ? 1 : 0
                    })
                } else if(direction == 'down'){
                    
                    this.androidSortColorDateAsc = 'blue'
                    
                    let da = '', db = ''
                    
                    return list.sort(function(a,b){
                        da = new Date(a.date).getTime();
                        db = new Date(b.date).getTime();

                        return db < da ? -1 : db > da ? 1 : 0
                    })
                    
                }                                        
            } else if(column == 'rating'){
                if(direction == 'up'){
                    
                    this.androidSortColorRatingDesc = 'blue'
                    
                    return list.sort(function(a,b){
                        return a.rating - b.rating;
                    }); 
                } else if(direction == 'down'){
                    
                    this.androidSortColorRatingAsc = 'blue'
                    
                    return list.sort(function(a,b){
                        return b.rating - a.rating;
                    }); 
                }

            }                               
        },
        androidExportDataToCSV(){
            console.log("Exporting table...");
            let i = 0, temp_data = this.androidTableFilter, new_data = []
            
            for(i = 0; i < temp_data.length; i++){
                new_data.push({
                    "Date": temp_data[i].date,
                    "Rating": temp_data[i].rating,
                    "English Subject": temp_data[i].english_subject,
                    "English Body": temp_data[i].english_body,
                    "Spanish Subject": temp_data[i].translated_subject,
                    "Spanish Body": temp_data[i].translated_body
                })
            }
            
            let new_csv = Papa.unparse(new_data);
            //console.log(new_csv);
            this.downloadCSV(new_csv, 'Android');
        },
        androidEnglishWordFrequencyGraphs(){
            //android_app_reviews
            
            let i = 0, j = 0, k = 0, can_add = false
                english_matches = []

            //For each of the english reviews
            for(i = 0; i < this.android_app_reviews.length; i++){
                
                //For each of the english words to search for
                for(j = 0; j < this.english_words.length; j++){
                    
                    //If this review has this english word
                    if(this.android_app_reviews[i].english_body.toLowerCase().match(this.english_words[j].toLowerCase())){
                    
                        can_add = true;

                        //Check to see if we already found this word
                        for(k = 0; k < english_matches.length; k++){
                            if(english_matches[k].word == this.english_words[j]){
                                can_add = false;
                                english_matches[k].count++
                            }
                        }

                        //If we can add this as a new word, then add it
                        if(can_add){
                            english_matches.push({
                                word: this.english_words[j],
                                count: 1
                            })
                        }

                    }
                }
            }
            
            english_matches.sort(function(a,b){
                return b.count - a.count
            })
            
            let highcharts_english_data = {
                categories: [],
                data: []
            },
                total_word_count = 7
            
//            if(english_matches.length > 0){
//                highcharts_english_data.data.push(english_matches.length)
//            }
            
            for(i = 0; i < total_word_count; i++){
                if(english_matches[i] != undefined){
                    highcharts_english_data.categories.push(english_matches[i].word)
                    highcharts_english_data.data.push(english_matches[i].count)
                } else {
                    highcharts_english_data.categories.push('')
                    highcharts_english_data.data.push(0)
                }
            }
            
            setTimeout(()=>{
                Highcharts.chart('android_word_frequency_english', {
                    title: {
                        text: 'English Word Frequency' 
                    },
                    subtitle: {
                        text: 'top 7 english words found with app review count'  
                    },
                    colors: ['#7cb5ec'],
                    tooltip: {
                        formatter: function(){
                            return '<strong>' + this.x + '</strong> was found in ' + this.y + ' review(s)'
                        }
                    },
                    xAxis: {
                        categories: highcharts_english_data.categories
                    },
                    yAxis: {
                        visible: false
                    },
                    plotOptions: {
                        column: {
                            groupPadding: 0.1,
                            dataLabels: {
                                enabled: true,
                                formatter: function(){
                                    if(this.y > 0){
                                        return this.y
                                    }
                                }
                            }
                        }
                    },
                    legend: {enabled: false},credits: {enabled:false},
                    series: [{
                        colorByPoint: true,
                        name: 'word frequency',
                        type: 'column',
                        data: highcharts_english_data.data
                    }]
                });
            },1000)
        },
        androidSpanishWordFrequencyGraphs(){
            //android_app_reviews
            
            let i = 0, j = 0, k = 0, can_add = false
                spanish_matches = []
            
            //For each of the spanish reviews
            for(i = 0; i < this.android_app_reviews.length; i++){
                
                //For each of the spanish words to search for
                for(j = 0; j < this.spanish_words.length; j++){
                    
                    //If this review has this spanish word
                    if(this.android_app_reviews[i].translated_body.toLowerCase().match(this.spanish_words[j].toLowerCase())){
                    
                        can_add = true;

                        //Check to see if we already found this word
                        for(k = 0; k < spanish_matches.length; k++){
                            if(spanish_matches[k].word == this.spanish_words[j]){
                                can_add = false;
                                spanish_matches[k].count++
                            }
                        }

                        //If we can add this as a new word, then add it
                        if(can_add){
                            spanish_matches.push({
                                word: this.spanish_words[j],
                                count: 1
                            })
                        }

                    }
                }
            }
            
            spanish_matches.sort(function(a,b){
                return b.count - a.count
            })
            
            let highcharts_spanish_data = {
                categories: [],
                data: []
            },
                total_word_count = 7
//            if(spanish_matches.length > 0){
//                highcharts_spanish_data.data.push(spanish_matches.length)
//            }
            
            for(i = 0; i < total_word_count; i++){
                
                if(spanish_matches[i] != undefined){
                    highcharts_spanish_data.categories.push(spanish_matches[i].word)
                    highcharts_spanish_data.data.push(spanish_matches[i].count)
                } else {
                    highcharts_spanish_data.categories.push('')
                    highcharts_spanish_data.data.push(0)
                }
            }
            
            setTimeout(()=>{
                Highcharts.chart('android_word_frequency_spanish', {
                    title: {
                        text: 'Spanish Word Frequency' 
                    },
                    subtitle: {
                        text: 'top 7 spanish words found with app review count'  
                    },
                    colors: ['#7cb5ec'],
                    tooltip: {
                        formatter: function(){
                            return '<strong>' + this.x + '</strong> was found in ' + this.y + ' review(s)'
                        }
                    },
                    xAxis: {
                        categories: highcharts_spanish_data.categories
                    },
                    yAxis: {
                        visible: false
                    },
                    plotOptions: {
                        column: {
                            groupPadding: 0.1,
                            dataLabels: {
                                enabled: true,
                                formatter: function(){
                                    if(this.y > 0){
                                        return this.y
                                    }
                                }
                            }
                        }
                    },
                    legend: {enabled: false},credits: {enabled:false},
                    series: [{
                        colorByPoint: true,
                        name: 'word frequency',
                        type: 'column',
                        data: highcharts_spanish_data.data
                    }]
                });
            },1000)
        },
        androidAddEnglishWord(){
            let word_temp = this.android_english_word.toLowerCase()
            
            this.android_english_warning_message = ''
            
            if(word_temp != ''){
                if(this.english_words.indexOf(word_temp) == -1){
                    this.english_words.push(word_temp)
                    this.androidEnglishWordFrequencyGraphs()
                } else {
                    this.android_english_warning_message = 'word already added'
                }
            }
            
        },
        androidAddSpanishWord(){
            let word_temp = this.android_spanish_word.toLowerCase()
            
            this.android_spanish_warning_message = ''
            
            if(word_temp != ''){
                if(this.spanish_words.indexOf(word_temp) == -1){
                    this.spanish_words.push(word_temp)
                    this.androidSpanishWordFrequencyGraphs()
                } else {
                    this.android_spanish_warning_message = 'word already added'
                }
            }
            
        },
        iosFindBy(value){
            let search_regex = new RegExp(value, "i"),
                list = this.ios_app_reviews

            return list.filter(function (item) {
                if(item.translated_body.match(search_regex) || item.english_body.match(search_regex)){
                    return item;    
                }                                       
            });
        },
        iosSortColumn(column, direction){
            let list = this.ios_app_reviews;
            
            this.iosSortColorDateDesc = 'gray'
            this.iosSortColorDateAsc = 'gray'
            this.iosSortColorRatingDesc = 'gray'
            this.iosSortColorRatingAsc = 'gray'

            if(column == 'date'){
                if(direction == 'up'){
                    
                    this.iosSortColorDateDesc = 'blue'
                    
                    let da = '', db = ''
            
                    return list.sort(function(a,b){
                        da = new Date(a.date).getTime();
                        db = new Date(b.date).getTime();

                        return da < db ? -1 : da > db ? 1 : 0
                    })
                } else if(direction == 'down'){
                    
                    this.iosSortColorDateAsc = 'blue'
                    
                    let da = '', db = ''
                    
                    return list.sort(function(a,b){
                        da = new Date(a.date).getTime();
                        db = new Date(b.date).getTime();

                        return db < da ? -1 : db > da ? 1 : 0
                    })
                    
                }                                        
            } else if(column == 'rating'){
                if(direction == 'up'){
                    
                    this.iosSortColorRatingDesc = 'blue'
                    
                    return list.sort(function(a,b){
                        return a.rating - b.rating;
                    }); 
                } else if(direction == 'down'){
                    
                    this.iosSortColorRatingAsc = 'blue'
                    
                    return list.sort(function(a,b){
                        return b.rating - a.rating;
                    }); 
                }

            }                               
        },
        iosExportDataToCSV(){
            console.log("Exporting table...");
            let i = 0, temp_data = this.iosTableFilter, new_data = []
            
            for(i = 0; i < temp_data.length; i++){
                new_data.push({
                    "Date": temp_data[i].date,
                    "Rating": temp_data[i].rating,
                    "English Subject": temp_data[i].english_subject,
                    "English Body": temp_data[i].english_body,
                    "Spanish Subject": temp_data[i].translated_subject,
                    "Spanish Body": temp_data[i].translated_body
                })
            }
            
            let new_csv = Papa.unparse(new_data);
            //console.log(new_csv);
            this.downloadCSV(new_csv, 'iOS');
        },
        iosEnglishWordFrequencyGraphs(){
            //ios_app_reviews
            
            let i = 0, j = 0, k = 0, can_add = false
                english_matches = []

            //For each of the english reviews
            for(i = 0; i < this.ios_app_reviews.length; i++){
                
                //For each of the english words to search for
                for(j = 0; j < this.english_words.length; j++){
                    
                    //If this review has this english word
                    if(this.ios_app_reviews[i].english_body.toLowerCase().match(this.english_words[j].toLowerCase())){
                    
                        can_add = true;

                        //Check to see if we already found this word
                        for(k = 0; k < english_matches.length; k++){
                            if(english_matches[k].word == this.english_words[j]){
                                can_add = false;
                                english_matches[k].count++
                            }
                        }

                        //If we can add this as a new word, then add it
                        if(can_add){
                            english_matches.push({
                                word: this.english_words[j],
                                count: 1
                            })
                        }

                    }
                }
            }
            
            english_matches.sort(function(a,b){
                return b.count - a.count
            })
            
            let highcharts_english_data = {
                categories: [],
                data: []
            },
                total_word_count = 7
            
//            if(english_matches.length > 0){
//                highcharts_english_data.data.push(english_matches.length)
//            }
            
            for(i = 0; i < total_word_count; i++){
                if(english_matches[i] != undefined){
                    highcharts_english_data.categories.push(english_matches[i].word)
                    highcharts_english_data.data.push(english_matches[i].count)
                } else {
                    highcharts_english_data.categories.push('')
                    highcharts_english_data.data.push(0)
                }
            }
            
            setTimeout(()=>{
                Highcharts.chart('ios_word_frequency_english', {
                    title: {
                        text: 'English Word Frequency' 
                    },
                    subtitle: {
                        text: 'top 7 english words found with app review count'  
                    },
                    colors: ['#7cb5ec'],
                    tooltip: {
                        enabled: false
                    },
                    xAxis: {
                        categories: highcharts_english_data.categories
                    },
                    yAxis: {
                        visible: false
                    },
                    plotOptions: {
                        column: {
                            groupPadding: 0.1,
                            dataLabels: {
                                enabled: true,
                                formatter: function(){
                                    if(this.y > 0){
                                        return this.y
                                    }
                                }
                            }
                        }
                    },
                    legend: {enabled: false},credits: {enabled:false},
                    series: [{
                        colorByPoint: true,
                        name: 'word frequency',
                        type: 'column',
                        data: highcharts_english_data.data
                    }]
                });
            },1000)
        },
        iosSpanishWordFrequencyGraphs(){
            //ios_app_reviews
            
            let i = 0, j = 0, k = 0, can_add = false
                spanish_matches = []
            
            //For each of the spanish reviews
            for(i = 0; i < this.ios_app_reviews.length; i++){
                
                //For each of the spanish words to search for
                for(j = 0; j < this.spanish_words.length; j++){
                    
                    //If this review has this spanish word
                    if(this.ios_app_reviews[i].translated_body.toLowerCase().match(this.spanish_words[j].toLowerCase())){
                    
                        can_add = true;

                        //Check to see if we already found this word
                        for(k = 0; k < spanish_matches.length; k++){
                            if(spanish_matches[k].word == this.spanish_words[j]){
                                can_add = false;
                                spanish_matches[k].count++
                            }
                        }

                        //If we can add this as a new word, then add it
                        if(can_add){
                            spanish_matches.push({
                                word: this.spanish_words[j],
                                count: 1
                            })
                        }

                    }
                }
            }
            
            spanish_matches.sort(function(a,b){
                return b.count - a.count
            })
            
            let highcharts_spanish_data = {
                categories: [],
                data: []
            },
                total_word_count = 7
//            if(spanish_matches.length > 0){
//                highcharts_spanish_data.data.push(spanish_matches.length)
//            }
            
            for(i = 0; i < total_word_count; i++){
                
                if(spanish_matches[i] != undefined){
                    highcharts_spanish_data.categories.push(spanish_matches[i].word)
                    highcharts_spanish_data.data.push(spanish_matches[i].count)
                } else {
                    highcharts_spanish_data.categories.push('')
                    highcharts_spanish_data.data.push(0)
                }
            }
            
            setTimeout(()=>{
                Highcharts.chart('ios_word_frequency_spanish', {
                    title: {
                        text: 'Spanish Word Frequency' 
                    },
                    subtitle: {
                        text: 'top 7 spanish words found with app review count'  
                    },
                    colors: ['#7cb5ec'],
                    tooltip: {
                        enabled: false
                    },
                    xAxis: {
                        categories: highcharts_spanish_data.categories
                    },
                    yAxis: {
                        visible: false
                    },
                    plotOptions: {
                        column: {
                            groupPadding: 0.1,
                            dataLabels: {
                                enabled: true,
                                formatter: function(){
                                    if(this.y > 0){
                                        return this.y
                                    }
                                }
                            }
                        }
                    },
                    legend: {enabled: false},credits: {enabled:false},
                    series: [{
                        colorByPoint: true,
                        name: 'word frequency',
                        type: 'column',
                        data: highcharts_spanish_data.data
                    }]
                });
            },1000)
        },
        iosAddEnglishWord(){
            let word_temp = this.ios_english_word.toLowerCase()
            
            this.ios_english_warning_message = ''
            
            if(word_temp != ''){
                if(this.english_words.indexOf(word_temp) == -1){
                    this.english_words.push(word_temp)
                    this.iosEnglishWordFrequencyGraphs()
                } else {
                    this.ios_english_warning_message = 'word already added'
                }
            }
            
        },
        iosAddSpanishWord(){
            let word_temp = this.ios_spanish_word.toLowerCase()
            
            this.ios_spanish_warning_message = ''
            
            if(word_temp != ''){
                if(this.spanish_words.indexOf(word_temp) == -1){
                    this.spanish_words.push(word_temp)
                    this.iosSpanishWordFrequencyGraphs()
                } else {
                    this.ios_spanish_warning_message = 'word already added'
                }
            }
            
        },
        downloadCSV(csv, platform) {
            let blob = new Blob([csv]),
                a = window.document.createElement("a");

            a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
            a.download = "Security_Words_" + platform + ".csv";

            document.body.appendChild(a);

            a.click();

            document.body.removeChild(a);
        },
    }
})