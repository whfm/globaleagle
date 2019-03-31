<template>
    <div class="hubMain">
        <div style="margin-left: 50px">

        <div>
        <div class="input-group" style="width: 300px;">
            <input type="text" class="form-control first" placeholder="Enter Temperature" v-model="tempInput">
            <div class="input-group-prepend firstInput">
                <div class="input-group-text firstInput">ºC</div>
            </div>
            <p>&nbsp&nbsp&nbsp</p>
            <button type="button" class="btn btn-success" v-on:click="addTemp">Add</button>
        </div>
        <hr style="margin-top: 40px">

        <p><strong>Temperature List : </strong></p>
        </div>
            <br>
            <div class="d-flex flex-wrap">
            <div class="float-left">
                <div class="d-flex flex-wrap">
                <ul style="list-style: none;">
                <span>
                    <b>Current Temp:</b> {{ currentTemp }} ºC
                    <br><br>
                    
                    <li v-for="day in days">
                    Max {{ day.maxtempC }}ºC - Min {{day.mintempC}}ºC - {{day.date | formatDate}}          
                    </li>
                    <li v-for="day in daysAdded">
                    Temperature added: {{ day.maxtempC }}ºC - {{days[0].date | formatDate}}   
                    </li>
                </span>                
                </ul>
            </div>
            </div>
                <div class="float-right" style="margin-left: 50px">
                    <p><b>Important Values :</b></p>
                    <div class="input-group" style="width: 300px;">
                        <div class="input-group-prepend">
                            <div class="input-group-text secondInput">AVERAGE</div>
                        </div>
                    <input type="text" class="form-control second" v-model="average.toFixed(2)">                        
                    </div>
                    <div class="input-group" style="width: 300px; margin-top: 5px">
                        <div class="input-group-prepend">
                            <div class="input-group-text secondInput">MEDIAN</div>
                        </div>
                    <input type="text" class="form-control second" v-model="median.toFixed(2)">                        
                    </div>
                    <div class="input-group" style="width: 300px; margin-top: 5px">
                        <div class="input-group-prepend">
                            <div class="input-group-text secondInput">MAX</div>
                        </div>
                    <input type="text" class="form-control second" v-model="max">                        
                    </div>
                    <div class="input-group" style="width: 300px; margin-top: 5px">
                        <div class="input-group-prepend">
                            <div class="input-group-text secondInput">MIN</div>
                        </div>
                    <input type="text" class="form-control second" v-model="min">                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'
    import moment from 'moment'  
    
    export default{
        data:function(){
            return{
                place : '',
                days : '',
                currentTemp: '',
                average: 0,
                median: 0,
                max: "",
                min: "",
                tempInput: "",
                allTemps: [],
                daysAdded: []
            }
        },
        created:function(){
            let vm = this;
            Axios.get('http://api.worldweatheronline.com/premium/v1/weather.ashx?key=b2bc3231267b4f28816191904190103&q=Montreal&format=json&date_format=unix&num_of_days=8')
                .then(function(response){
                    vm.place = response.data.data;
                    vm.days = vm.place.weather;
                    vm.currentTemp = vm.place.current_condition[0].temp_C;
                    for (let i = 0; i < 8; i++) {
                        vm.allTemps.push(Number(vm.days[i].mintempC));
                        vm.allTemps.push(Number(vm.days[i].maxtempC));

                        vm.average += Number(vm.days[i].mintempC);
                        vm.average += Number(vm.days[i].maxtempC);
                        vm.average = vm.average / 16;
                        if (Number(vm.days[i].mintempC) < Number(vm.min)) {
                            vm.min = vm.days[i].mintempC;                            
                        }
                        if (Number(vm.days[i].maxtempC) >= Number(vm.max)) {
                            vm.max = vm.days[i].maxtempC;                            
                        }
                    }
                    vm.medCalc();
                });

        },
        filters: {
            formatDate:function(value) {
                if (value) {
                    return moment(String(value)).format('MMMM, DD, YYYY')
            }}
        }, 
        methods: {           
            addTemp: function () {
                this.allTemps.push(this.tempInput);
                if (Number(this.min) > Number(this.tempInput)) { this.min = Number(this.tempInput); }
                if (Number(this.max) < Number(this.tempInput)) { this.max = Number(this.tempInput); }
                if (Number(this.max) < Number(this.tempInput)) { this.max = Number(this.tempInput); }
                var sum = 0;
                for( var i = 0; i < this.allTemps.length; i++ ){
                    sum += parseInt(this.allTemps[i], 10);
                }
                var avg = sum/this.allTemps.length;
                this.average = avg;

                this.medCalc();

                let a = {  maxtempC: this.tempInput };
                this.daysAdded.push(a);
            },
            medCalc: function name(params) {
                var med = 0, numsLen = this.allTemps.length;
                this.allTemps.sort();
            
                if (numsLen % 2 === 0) {
                    med = (this.allTemps[numsLen / 2 - 1] + this.allTemps[numsLen / 2]) / 2;
                } else { med = this.allTemps[(numsLen - 1) / 2]; }
                this.median = med;
            }
        }       
    }
</script>

<style>

    .input-group-text.secondInput {
        background-color: rgb(123,204,101);    
    }

    .form-control.second {
        background-color: rgb(217,243,198);
    }

    .btn.btn-success {
        background-color: rgb(120,205,101);
    }

    .input-group-text.firstInput {
        height: 40px;
        background-color: rgb(124,181,234);
    }
    .form-control.first {
        height: 40px;
        background-color: rgb(232,243,247);
    }

    .hubMain{
        margin-top: 3%;
        margin-bottom: 2%;
    }

    li { background: white; }
    li:nth-child(even) { background: rgb(245,249,252); }

    body {
        color: rgb(246,246,246);
    }
    .col-left{
        float: left;
        width: 30%;
        text-align: center;
    }

    .col-left .col-left_city{
        margin-top: 2%;
        font-size: 23px;
    }

    .col-right{
        float: left;
        width: 70%;
    }

    .col-right_value{
        color:  #00ff99;
        font-size: 23px;
    }

    span.day_forecast{
        padding: 1%;
    }
    
    p, span { 
        color: black;
    }

    span.day_forecast .day_forecast_date{
        font-size: 17px;
        text-align: center;
        border-bottom: 2px solid  #ffcccc;
    }

</style>