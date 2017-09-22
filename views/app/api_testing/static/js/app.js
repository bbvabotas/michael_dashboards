let app = new Vue({
    el: '#app',
    data: {
        page: 'main',
        username: '',
        usernames_all: [],
        password: '',
        selectedFunction: 'Adhoc',
        credentials_loading: false,
        submit_loading: false,
        show_functions: false,
        mappingData: [],
        functionList: [{
            item: 'Adhoc'
        }, {
            item: 'All'
        }],
        adhocList: [],
        apiList: [],
        resultsOverall: []
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
        getMappingData(){
            
            
            let this_vm = this
            
            axios.get('/api/get_testing_mapping')
            .then((response)=>{
                console.log(response)
                this_vm.mappingData = response.data.data
                
                this_vm.updateFunctionList()
                this_vm.updateUsernames()
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
        confirmCredentials(){
            this.credentials_loading = true
            this.show_functions = false
            
            setTimeout(()=>{
                this.credentials_loading = false
                this.show_functions = true
            },2000)
        },
        submit(){
            this.submit_loading = true
            
            let submit_data = {  
                "country":"Mexico",
                "enviroment":"Test",
                "username":"5538815345",
                "password":"147258",
                "function":"accounts"
            }
            
            setTimeout(()=>{
                this.submit_loading = false
                this.page = 'results'
            },2000)
            
//            axios.post('/api/get_testing_mapping')
//            .then((response)=>{
//                console.log(response)
//            })
//            .catch((error)=>{
//                console.log(error)
//            })
            
        },
        back(){
            this.page = 'main'
        },
        exportDataToCSV(){
            console.log('export to csv')
        }
    }
})