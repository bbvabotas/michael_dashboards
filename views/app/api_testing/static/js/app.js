let app = new Vue({
    el: '#app',
    data: {
        page: 'main',
        submit_error: '',
        show_dashboard: true, show_table: false,
        country: 'Mexico', environment: 'Test', username: '', password: '',
        selectedFunction: 'Adhoc',
        credentials_loading: false,
        submit_loading: false, show_functions: false,
        mappingData: [], functionList: [], adhocList: [], apiList: [],
        resultsApiDasboard: [], resultsOverall: [],
        progress_bar_width: 0,
        api_table_data: [],
        cancel_testing: true,
        data_count: 0, data_total_count: 0,
        sort_results_function_asc: 'gray', sort_results_function_desc: 'gray', sort_results_endpoint_asc: 'gray', sort_results_endpoint_desc: 'gray',
        sort_results_message_asc: 'gray', sort_results_message_desc: 'gray', sort_results_status_asc: 'gray', sort_results_status_desc: 'gray'
    },
    mounted(){
        this.getMappingData()
    },
    computed: {
        adhoc: function(){
            if(this.selectedFunction == 'Adhoc'){
                return true
            } else {
                return false
            }
        },
        haveApiList: function(){
            if(this.apiList.length > 0){
                return true
            } else {
                return false
            }
        },
        credentials_btn_disabled: function(){
            if(this.username == '' || this.password == '' || this.credentials_loading){
                return true
            } else {
                return false
            }
        },
        show_functions_from_username: function(){
            if(this.username != 'Select a Username'){
                return true
            } else {
                return false
            }
        },
        show_functions_if_credentials(){
            if(this.username == '' || this.password == ''){
                return false
            } else {
                return true
            }
        }
    },
    methods: {
        newData(new_data){
            let i = 0, results_api_temp = []

            this.api_table_data = []
            this.progress_bar_width = 0
            this.data_count = 0
            this.data_total_count = new_data.api_status.length

            let this_vm = this
            function addData(){
                if(!this_vm.cancel_testing){
                    if(this_vm.data_count < this_vm.data_total_count){
                        setTimeout(()=>{
                            
                            this_vm.api_table_data.push({
                                function: new_data.api_status[this_vm.data_count].function,
                                endpoint: new_data.api_status[this_vm.data_count].endpoint,
                                status: new_data.api_status[this_vm.data_count].status,
                                message: new_data.api_status[this_vm.data_count].message
                            })
    
                            this_vm.data_count++
    
                            this_vm.progress_bar_width = (this_vm.data_count / this_vm.data_total_count) * 100
                            // console.log('added data')


                            // console.log(this_vm.resultsApiDasboard[0].endpoints)
                            // console.log(new_data.api_status[this_vm.data_count-1].endpoint)

                            for(i = 0; i < this_vm.resultsApiDasboard[0].endpoints.length; i++){
                                if(this_vm.resultsApiDasboard[0].endpoints[i].endpoint == new_data.api_status[this_vm.data_count-1].endpoint){
                                    if(new_data.api_status[this_vm.data_count-1].status == 'success'){
                                        this_vm.resultsApiDasboard[0].endpoints[i].color = 'green'
                                    } else if(new_data.api_status[this_vm.data_count-1].status == 'fail') {
                                        this_vm.resultsApiDasboard[0].endpoints[i].color = 'red'
                                    }
                                }
                            }

                            this_vm.updateChart()

                            addData()
                            
                        },5000)
                    }
                }
                
            }

            addData()
        },
        getMappingData(){
            let this_vm = this
            
            axios.get('/api/get_testing_mapping')
            .then((response)=>{
                console.log(response)
                this_vm.mappingData = response.data.data
                
                this_vm.updateFunctionList()
                // this_vm.updateUsernames()
            })
            .catch((error)=>{
                console.log(error)
            })
        },
        updateFunctionList(){
            let i = 0, j = 0,
                can_add = true
            
            for(i = 0; i < this.mappingData.length; i++){
                can_add = true
                for(j = 0; j < this.functionList.length; j++){
                    if(this.mappingData[i].function == this.functionList[j].item){
                        can_add = false
                        break;
                    }
                }
                if(can_add){
                    this.functionList.push({
                        item: this.mappingData[i].function
                    })
                }
            }

            this.functionList.sort(function(a, b){
                if (a.item < b.item)
                    return -1;
                if (a.item > b.item)
                    return 1;
                return 0;
            })

            

            this.functionList.unshift({
                item: 'Adhoc'
            }, {
                item: 'All'
            })

            this.updateAdhocList()
        },
        updateApiList(){
            let i = 0,
                newFunction = this.selectedFunction
            
            this.apiList = []
            
            if(newFunction != 'Adhoc'){

                if(newFunction == 'All'){
                    for(i = 0; i < this.mappingData.length; i++){
                        this.apiList.push({
                            api_type: this.mappingData[i].api_type,
                            api_url: this.mappingData[i].api,
                            function: this.mappingData[i].function
                        })
                    }
                } else {
                    for(i = 0; i < this.mappingData.length; i++){
                        if(this.mappingData[i].function == newFunction){
                            this.apiList.push({
                                api_type: this.mappingData[i].api_type,
                                api_url: this.mappingData[i].api,
                                function: this.mappingData[i].function
                            })
                        }
                    }
                }
            }
        },
        updateAdhocList(){
            let i = 0
            
            this.adhocList = []
            
            for(i = 0; i < this.mappingData.length; i++){
                if(this.mappingData[i].api.match(/^\//i)){
                    this.adhocList.push({
                        api_url: this.mappingData[i].api
                    })
                }
            }
        },
        updateUsernames(){
            let i = 0
            
            this.usernames_all.push({
                name: 'Select a Username'
            })
            
            for(i = 0; i < username_mapping.length; i++){
                this.usernames_all.push({
                    name: username_mapping[i].name
                })
            }
        },
        updateChart(){
            let i = 0, validation_data = {
                pass: 0,
                fail: 0
            }

            for(i = 0; i < this.api_table_data.length; i++){
                if(this.api_table_data[i].status == 'success'){
                    validation_data.pass++
                } else if(this.api_table_data[i].status == 'fail'){
                    validation_data.fail++
                }
            }

            Highcharts.chart('validation_chart', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                colors: ["green", "red"],
                subtitle: {
                    text: 'Pass vs Fail'
                },
                xAxis: {
                    categories: ['Pass', 'Fail']
                },
                yAxis: {
                    visible: false
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                series: [{
                    name: 'pass or fail',
                    colorByPoint: true,
                    data: [validation_data.pass, validation_data.fail]
                }]
            });
        },
        confirmCredentials(){
            this.credentials_loading = true
            this.show_functions = false
            
            setTimeout(()=>{
                this.credentials_loading = false
                this.show_functions = true
            },2000)
        },
        sortResults(column){

            this.sort_results_function_asc = 'gray'
            this.sort_results_function_desc = 'gray'
            this.sort_results_endpoint_asc = 'gray'
            this.sort_results_endpoint_desc = 'gray'
            this.sort_results_message_asc = 'gray'
            this.sort_results_message_desc = 'gray'
            this.sort_results_status_asc = 'gray'
            this.sort_results_status_desc = 'gray'

            this[column] = 'blue'
        },
        submit(){
            let i = 0, j = 0, endpoint_list_temp = []

            this.submit_loading = true
            
            let submit_data = {  
                "country": this.country,
                "enviroment": this.environment,
                "username": this.username,
                "password": this.password,
                "function": this.selectedFunction
            }

            this.sort_results_function_asc = 'gray'
            this.sort_results_function_desc = 'gray'
            this.sort_results_endpoint_asc = 'gray'
            this.sort_results_endpoint_desc = 'gray'
            this.sort_results_message_asc = 'gray'
            this.sort_results_message_desc = 'gray'
            this.sort_results_status_asc = 'gray'
            this.sort_results_status_desc = 'gray'

            this.resultsApiDasboard = []

            console.log(this.apiList)
            // console.log(this.functionList)

            let temp_function_list = []
            //Get the functions that were selected from the user, this will work when the user selects a single function or "all"
            for(i = 0; i < this.apiList.length; i++){
                if(temp_function_list.indexOf(this.apiList[i].function) == -1){
                    temp_function_list.push(this.apiList[i].function)
                }
            }

            temp_function_list.sort()
            
            for(i = 0; i < temp_function_list.length; i++){
                endpoint_list_temp = []
                if(temp_function_list[i] != 'Adhoc' && temp_function_list[i] != 'All'){
                    for(j = 0; j < this.apiList.length; j++){
                        if(temp_function_list[i] == this.apiList[j].function){
                            endpoint_list_temp.push({
                                color: 'lightgray',
                                endpoint: this.apiList[j].api_url
                            })
                        }
                    }
    
                    this.resultsApiDasboard.push({
                        function: temp_function_list[i],
                        endpoints: endpoint_list_temp
                    })
                }
                
            }
            
            console.log('Sending:')
            console.log(submit_data)

            let dummy_data = {
                "api_status": [{
                    "function": "Product Details",
                    "endpoint": "/accounts/{account-id}?expand=customized-formats,holds",
                    "status": "success",
                    "message": "Account activated"
                },{
                    "function": "Product Details",
                    "endpoint": "/accounts/{account-id}?expand=related-contracts,participants,conditions",
                    "status": "success",
                    "message": "Account activated"
                },{
                    "function": "Product Details",
                    "endpoint": "/accounts/{account-id}?unmasked=true",
                    "status": "success",
                    "message": "Account activated"
                },{
                    "function": "Product Details",
                    "endpoint": "/cards/{card-id}?expand=payment-methods,blocks,rewards",
                    "status": "fail",
                    "message": `{
                        "version": 1,
                        "severity": "FATAL",
                        "http-status": 500,
                        "error-code": "serviceUnavailable",
                        "error-message": "Servicio no disponible",
                        "consumer-request-id": "e573542d-6fe5-4abc-a4d4-c9521aec97f5",
                        "system-error-code": "serviceUnavailable",
                        "system-error-description": "Servicio no disponible",
                        "system-error-cause": "Invalid transferId"
                      }
                      `
                },{
                    "function": "Product Details",
                    "endpoint": "/cards/{card-id}?expand=participants,related-contracts,conditions",
                    "status": "fail",
                    "message": `{
                        "version": 1,
                        "severity": "FATAL",
                        "http-status": 500,
                        "error-code": "serviceUnavailable",
                        "error-message": "Servicio no disponible",
                        "consumer-request-id": "e573542d-6fe5-4abc-a4d4-c9521aec97f5",
                        "system-error-code": "serviceUnavailable",
                        "system-error-description": "Servicio no disponible",
                        "system-error-cause": "Invalid transferId"
                      }`
                },{
                    "function": "Product Details",
                    "endpoint": "/cards/{card-id}?unmasked=true",
                    "status": "fail",
                    "message": `{
                        "version": 1,
                        "severity": "FATAL",
                        "http-status": 500,
                        "error-code": "serviceUnavailable",
                        "error-message": "Servicio no disponible",
                        "consumer-request-id": "e573542d-6fe5-4abc-a4d4-c9521aec97f5",
                        "system-error-code": "serviceUnavailable",
                        "system-error-description": "Servicio no disponible",
                        "system-error-cause": "Invalid transferId"
                      }`
                },{
                    "function": "Product Details",
                    "endpoint": "/deposits/{deposit-id}",
                    "status": "success",
                    "message": "Account activated"
                },{
                    "function": "Product Details",
                    "endpoint": "/deposits/{deposit-id}?expand=participants,related-contracts",
                    "status": "success",
                    "message": "Account activated"
                },{
                    "function": "Product Details",
                    "endpoint": "/deposits/{deposit-id}?unmasked=true",
                    "status": "success",
                    "message": "Account activated"
                },{
                    "function": "Product Details",
                    "endpoint": "/loans/{loan-id}",
                    "status": "success",
                    "message": "Account activated"
                },{
                    "function": "Product Details",
                    "endpoint": "/loans/{loan-id}?expand=commissions,participants,related-contracts",
                    "status": "success",
                    "message": "Account activated"
                },{
                    "function": "Product Details",
                    "endpoint": "/loan/{loan-id}?unmasked=true",
                    "status": "success",
                    "message": "Account activated"
                }]
            }

            setTimeout(()=>{
                this.submit_loading = false
                this.page = 'results'
                this.cancel_testing = false
                this.newData(dummy_data)
            },1000)

            // let this_vm = this
            // axios.post('/api/api_test_send_data', submit_data)
            // .then((response)=>{
            //     console.log(response)
            //     if(response.data.header.message == "SUCCESS"){
            //         // this_vm.submit_loading = false
            //         // this_vm.page = 'results'
            //         // this_vm.newData()
            //     } else if(response.data.header.message == "FAILURE"){
            //         this_vm.submit_error = response.data.header.errors[0]
            //     }
            // })
            // .catch((error)=>{
            //     console.log(error)
            // })
            
        },
        back(){
            this.page = 'main'
            this.cancel_testing = true
        },
        exportDataToCSV(){
            console.log("Exporting table...");
            let new_csv = Papa.unparse(this.api_table_data);
            //console.log(new_csv);
            this.downloadCSV(new_csv);
        },
        downloadCSV(csv) {
            
            let blob = new Blob([csv]),
                a = window.document.createElement("a");
            
            a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
            a.download = "GloMo_Validation_Results.csv";
            
            document.body.appendChild(a);
            
            a.click();
            
            document.body.removeChild(a);
        },
        showDashboard(){
            this.show_dashboard = true
            this.show_table = false
        },
        showTable(){
            this.show_dashboard = false
            this.show_table = true
        }
    }
})