/**
 * Created by pratham.
 * */

// degree C  &#8451;
// epsilon  &#949;
// density Rho &#961;
// micro &#181;
    // theta &#952;
// var v1;
var sh_cold         , sh_hot            , d_cold , d_hot ;
var area_inner      , area_outer        , diameter_inner = .013  , diameter_outer = .016, length_of_tube, number_of_tubes, cross_area_inner, cross_area_outer ;
var flow_rate_cold  , flow_rate_hot; // Flow rate in litres per hour;
var velocity_cold   , velocity_hot      , mass_rate_hot         , mass_rate_cold;
var inlet_temp_cold , outlet_temp_cold  , inlet_temp_hot        , outlet_temp_hot;
var avg_temp_cold   , avg_temp_hot;
// id and variable (both same name)
var heat_transfer_from_hot, heat_transfer_to_cold, heat_loss_exchanger, efficiency_exchanger, log_temp_diff, inner_heat_coeff,  outer_heat_coeff;
var inlet_diff_temp, outlet_diff_temp;

// To be used for last two calculations
var inside_film_heat_transfer_coeff, thermal_conductivity, reynolds_number, prandtl_number, heat_transfer_factor, dynamic_viscosity ; // I guess cold.
var exp_overall_heat_coeff;

// Need to be done after taking values of sh_cold ;




area_inner = (Math.PI*Math.pow(diameter_inner,2))/4 ;
area_outer = (Math.PI*Math.pow(diameter_outer,2))/4 ;
length_of_tube = .5 ;
number_of_tubes = 24;
cross_area_inner = Math.PI*diameter_inner*length_of_tube;
cross_area_outer = Math.PI*diameter_outer*length_of_tube;



function roundoff4(rnum1){
    var rnum = rnum1;
    rnum = (Math.round(rnum*Math.pow(10,4)))/Math.pow(10,4);
    return rnum;
}

function properties(){


    sh_cold     = document.getElementById("sh_cold").value ;
    sh_hot      = document.getElementById("sh_hot").value ;
    d_cold      = document.getElementById("d_cold").value ;
    d_hot       = document.getElementById("d_hot").value ;
    dynamic_viscosity       = document.getElementById('dynamic_viscosity').value;
    thermal_conductivity    = document.getElementById('thermal_conductivity').value;


    //v1 = d_hot;
}





 function input_values() {
    flow_rate_cold      = document.getElementById("flow_rate_cold").value ;
    flow_rate_hot       = document.getElementById("flow_rate_hot").value ;
    inlet_temp_cold     = document.getElementById("inlet_temp_cold").value ;
    inlet_temp_hot      = document.getElementById("inlet_temp_hot").value ;
    outlet_temp_cold    = document.getElementById("outlet_temp_cold").value ;
    outlet_temp_hot     = document.getElementById("outlet_temp_hot").value ;

    // Calculate other parameters that use above variables.
    avg_temp_cold       = (parseInt(inlet_temp_cold)  + parseInt(outlet_temp_cold))/2;
    avg_temp_hot        = (parseInt(inlet_temp_hot)   + parseInt(outlet_temp_hot))/2 ;
    // Counter-flow Calculations
    inlet_diff_temp     = parseInt(inlet_temp_hot)    - parseInt(outlet_temp_cold) ;
    outlet_diff_temp    = parseInt(outlet_temp_hot)   - parseInt(inlet_temp_cold);
// Counter-flow calaculations...

}


// It works when all the code below hereafter is set inside comment.

function calculations() {

    velocity_cold           = flow_rate_cold/((3600*1000)*number_of_tubes*area_inner);
    //velocity_cold           = flow_rate_cold/((3600*1000)*number_of_tubes*area_inner);
    velocity_cold   =   roundoff4(velocity_cold);
    // Why area_inner is taken in case of cold water flow.

    velocity_hot           = flow_rate_hot/((3600*1000)*number_of_tubes*area_inner);
    velocity_hot   =   roundoff4(velocity_hot)

    mass_rate_hot           = (flow_rate_hot*d_cold)/(3600*1000);
    mass_rate_hot   =   roundoff4(mass_rate_hot);

    heat_transfer_from_hot  = mass_rate_hot*sh_hot*(inlet_temp_hot-outlet_temp_hot);
    heat_transfer_from_hot  =   roundoff4(heat_transfer_from_hot);

    mass_rate_cold          = (flow_rate_cold*d_cold)/(3600*1000);
    mass_rate_cold  =   roundoff4(mass_rate_cold);

    heat_transfer_to_cold   = mass_rate_cold*sh_cold*(outlet_temp_cold-inlet_temp_cold);
    heat_transfer_to_cold   =   roundoff4(heat_transfer_to_cold);

    heat_loss_exchanger     = heat_transfer_from_hot - heat_transfer_to_cold;
    heat_loss_exchanger     =   roundoff4(heat_loss_exchanger);

    efficiency_exchanger    = (heat_transfer_to_cold/heat_transfer_from_hot)*100;
    efficiency_exchanger    =   roundoff4(efficiency_exchanger);

    log_temp_diff           = (outlet_diff_temp - inlet_diff_temp)/Math.log((outlet_diff_temp/inlet_diff_temp));
    log_temp_diff   =   roundoff4(log_temp_diff);

    exp_overall_heat_coeff = (heat_transfer_to_cold)/(area_outer*number_of_tubes*log_temp_diff);
    exp_overall_heat_coeff  =   roundoff4(exp_overall_heat_coeff);


    // multiply by no of tubes.

    // viscosity of fluid in inside fluid.(HOT)
    // density and velocity of hot taken because these calculations are for inner tube in which hot fluid flows
    reynolds_number = (d_hot*velocity_hot*diameter_inner)/dynamic_viscosity ;
    reynolds_number =   roundoff4(reynolds_number)

    document.getElementById("reynolds_number").value  = reynolds_number;
    // specific heat is taken of hot in prandtl number
    prandtl_number = (sh_hot*dynamic_viscosity)/thermal_conductivity;
    document.getElementById("prandtl_number").value  = prandtl_number;



    // velocity_cold = document.getElementById("").value;
    document.getElementById("velocity_cold").value          = velocity_cold;
    document.getElementById("mass_rate_hot").value          = mass_rate_hot;
    document.getElementById("heat_transfer_from_hot").value = heat_transfer_from_hot;
    document.getElementById("mass_rate_cold").value         = mass_rate_cold;
    document.getElementById("heat_transfer_to_cold").value  = heat_transfer_to_cold;
    document.getElementById("heat_loss_exchanger").value    = heat_loss_exchanger;
    document.getElementById("efficiency_exchanger").value   = efficiency_exchanger;
    document.getElementById("log_temp_diff").value          = log_temp_diff;
    document.getElementById("area_outer").value             = area_outer;
    document.getElementById("exp_overall_heat_coeff").value     = exp_overall_heat_coeff;// this is inner overall





}


function calculations1(){


    heat_transfer_factor = document.getElementById("heat_transfer_factor").value; // Input by user.
    // Need Prandtl and thermal_conductivity;
    thermal_conductivity    = document.getElementById('thermal_conductivity').value;
    prandtl_number          = document.getElementById("prandtl_number").value;
    exp_overall_heat_coeff      = document.getElementById("exp_overall_heat_coeff").value;

    //Seider-tate equations
    inner_heat_coeff = (thermal_conductivity*heat_transfer_factor*(Math.pow(prandtl_number,(1/3))))/diameter_inner;

//    inside_film_heat_transfer_coeff =  (thermal_conductivity*heat_transfer_factor*(Math.pow(prandtl_number,(1/3))))/diameter_inner;
    // document.getElementById("inside_film_heat_transfer_coeff").value    = inside_film_heat_transfer_coeff;
    outer_heat_coeff             = Math.pow((Math.pow(exp_overall_heat_coeff,-1)- (diameter_outer*Math.pow((diameter_inner*inner_heat_coeff),-1))),-1);
    document.getElementById("inner_heat_coeff").value     = inner_heat_coeff;
    document.getElementById("outer_heat_coeff").value     = outer_heat_coeff;


}


// Doubts....
// In Calculation of Velocity cold why area_inner is taken if it flows in outer tube.
// Density of cold is used in calculating mass_rate_hot.
// In clculation of Qh hot is not used (density).
// Calculation of re cold is used in place of hot.
// In inside_film_heat_transfer_coeff by Eagle and Farguson eqn, temp?? Avg hot or what??
