<template>
    <div class="hubMain">
        <div style="margin-left: 50px">

        <div>
        <div class="input-group" style="width: 300px;">
            <input type="text" class="form-control" placeholder="Enter Temperature" v-model="tempInput">
            <div class="input-group-prepend">
                <div class="input-group-text">ºC</div>
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
                <span class="" >
                    <b>Current Temp:</b> {{ currentTemp }} ºC
                    <br><br>
                    
                    <li v-for="day in days">
                    Max {{ day.maxtempC }}ºC - Min {{day.mintempC}}ºC - {{day.date | formatDate}}          
                    </li>
                </span>                
                </ul>
            </div>
            </div>
                <div class="float-right" style="margin-left: 50px">
                    <p><b>Important Values :</b></p>
                    <div class="input-group" style="width: 300px;">
                        <div class="input-group-prepend">
                            <div class="input-group-text">AVERAGE</div>
                        </div>
                    <input type="text" class="form-control" placeholder="Enter Temperature" v-model="average.toFixed(2)">                        
                    </div>
                    <div class="input-group" style="width: 300px; margin-top: 5px">
                        <div class="input-group-prepend">
                            <div class="input-group-text">MEDIAN</div>
                        </div>
                    <input type="text" class="form-control" placeholder="Enter Temperature" v-model="median.toFixed(2)">                        
                    </div>
                    <div class="input-group" style="width: 300px; margin-top: 5px">
                        <div class="input-group-prepend">
                            <div class="input-group-text">MAX</div>
                        </div>
                    <input type="text" class="form-control" placeholder="Enter Temperature" v-model="max">                        
                    </div>
                    <div class="input-group" style="width: 300px; margin-top: 5px">
                        <div class="input-group-prepend">
                            <div class="input-group-text">MIN</div>
                        </div>
                    <input type="text" class="form-control" placeholder="Enter Temperature" v-model="min">                        
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
                allTemps: []
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
                        if (vm.days[i].mintempC > vm.min) {
                            vm.min = vm.days[i].mintempC;
                            
                        }
                        if (vm.days[i].maxtempC > vm.max) {
                            vm.max = vm.days[i].maxtempC;
                        }
                    }
                    var med = 0, numsLen = vm.allTemps.length;
                    vm.allTemps.sort();
                
                    if (numsLen % 2 === 0) {
                        med = (vm.allTemps[numsLen / 2 - 1] + vm.allTemps[numsLen / 2]) / 2;
                    } else { med = vm.allTemps[(numsLen - 1) / 2]; }
                    vm.median = med;
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
                console.log(this.allTemps);
            },
        }       
    }
</script>

<style>

    .input-group-text {
        color: blue;    
    }

    .hubMain{
        margin-top: 3%;
        margin-bottom: 2%;
    }

    li { background: white; }
    li:nth-child(odd) { background: rgb(245,249,252); }

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

    span.day_forecast .day_forecast_date{
        font-size: 17px;
        text-align: center;
        border-bottom: 2px solid  #ffcccc;
    }

</style>