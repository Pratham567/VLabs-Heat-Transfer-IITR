/**
 * Created by pratham on 02/08/17.
 */

var diameter_inner_inner = .015, diameter_outer_inner = .019, diameter_inner_outer = .0653;
var surface_area_inner, surface_area_outer, area_inner_tube;
var number_of_fins = 41, length_tube = 1, diameter_orifice = .025, area_orifice = .00049, diameter_fin = .05, width_fin = .002, area_fins;
var gravity = 9.81, coeff_discharge = 0.64, air_head_over_orifice, manometer_diff, d_water, d_air;

var molecular_weight_air, pressure_air, gas_constant = 8.314;
var mass_rate_air, mass_rate_water, velocity_water, heat_transfer_from_hot, heat_transfer_to_air, avg_heat_transfer, log_mean_temp_diff_p,log_mean_temp_diff_c;
var inner_overall_heat_transfer_coeff_c, outside_heat_transfer_coeff_c, inner_overall_heat_transfer_coeff_p, outside_heat_transfer_coeff_p;
var  inlet_temp_air, inlet_temp_water, outlet_temp_air, outlet_temp_water, flow_rate_water, flow_rate_air;
var overall_heat_transfer_coeff_theo;
var capacity, c_max, c_min, effectiveness;
//var sh_water = 4184 , sh_air = 1004.16;
var sh_water = 1 , sh_air = .24; // in Kcal per Kg
var inner_heat_transfer_coeff_theo, outer_heat_transfer_coeff_theo, reynolds_number, prandtl_number;
var dynamic_viscosity, thermal_conductivity;
var T1_p, T2_p, T1_c, T2_c;


area_fins          = 41*Math.PI*diameter_fin*width_fin;
surface_area_inner = Math.PI*diameter_inner_inner*length_tube;
surface_area_outer = Math.PI*diameter_inner_inner*length_tube + area_fins  ;       // Incomplete : Add area of fins.
area_inner_tube    = (Math.PI*diameter_inner_inner*diameter_inner_inner)/4;

molecular_weight_air    = .029;
pressure_air            = 100000;

function roundoff4(rnum1){
    var rnum = rnum1;
    rnum = (Math.round(rnum*Math.pow(10,4)))/Math.pow(10,4);
    return rnum;
}

function properties(){


    sh_air          = document.getElementById("sh_cold").value ;
    sh_water        = document.getElementById("sh_hot").value ;
    d_water         = document.getElementById("d_hot").value ;
    dynamic_viscosity       = document.getElementById('dynamic_viscosity').value;
    thermal_conductivity    = document.getElementById('thermal_conductivity').value;



}


function input_values() {

    flow_rate_water    = document.getElementById('flow_rate_water').value;
    manometer_diff     = document.getElementById('manometer_diff').value;
    inlet_temp_water   = document.getElementById('inlet_temp_water').value;
    outlet_temp_water  = document.getElementById('outlet_temp_water').value;
    inlet_temp_air     = document.getElementById('inlet_temp_air').value;
    outlet_temp_air    = document.getElementById('outlet_temp_air').value;

}

function calculations() {
    air_head_over_orifice = (manometer_diff*density_water)/density_air;
    d_air           = (molecular_weight_air*pressure_air)/(gas_constant*(inlet_temp_air + parseFloat(273)));
    flow_rate_air   = coeff_discharge*area_orifice*3600*(Math.pow(2*gravity*air_head_over_orifice,.5)); //(LPH)
    mass_rate_air   = flow_rate_air*d_air;  //(KgPH)
    mass_rate_water = flow_rate_water*density_water; // per hour
    heat_transfer_from_hot  = mass_rate_water*sh_water*(inlet_temp_water - outlet_temp_water);
    heat_transfer_to_air    = mass_rate_air*sh_air*(outlet_temp_air- inlet_temp_air);
    avg_heat_transfer       = (parseFloat(heat_transfer_from_hot) + parseFloat(heat_transfer_to_air))/2;

    T1_c    = parseFloat(inlet_temp_water)  - parseFloat(outlet_temp_air) ;
    T2_c    = parseFloat(outlet_temp_water) - parseFloat(inlet_temp_air);
    T1_p    = parseFloat(inlet_temp_water)  - parseFloat(inlet_temp_air);
    T2_p    = parseFloat(outlet_temp_water) - parseFloat(outlet_temp_air);
    log_mean_temp_diff_p      = (parseFloat(T1_p) -parseFloat(T2_p))/Math.log(T1_p/T2_p);
    log_mean_temp_diff_c      = (parseFloat(T1_c) -parseFloat(T2_c))/Math.log(T1_c/T2_c);
    inner_overall_heat_transfer_coeff_c   = (avg_heat_transfer)/(surface_area_outer*log_mean_temp_diff_c);
    outside_heat_transfer_coeff_c         = (avg_heat_transfer)/(surface_area_inner*log_mean_temp_diff_c);
    inner_overall_heat_transfer_coeff_p   = (avg_heat_transfer)/(surface_area_outer*log_mean_temp_diff_p);
    outside_heat_transfer_coeff_p         = (avg_heat_transfer)/(surface_area_inner*log_mean_temp_diff_p);

    c_min = mass_rate_water*sh_water;
    c_max = mass_rate_air*sh_air;
    capacity = c_min/c_max;


    velocity_water      = flow_rate_water/((3600*1000)*area_inner_tube);
    reynolds_number     = (d_water*velocity_water*diameter_inner_inner)/dynamic_viscosity ;
    prandtl_number      = (sh_water*dynamic_viscosity)/thermal_conductivity ;

    inner_heat_transfer_coeff_theo      =  (0.023*Math.pow(reynolds_number,0.8)*Math.pow(prandtl_number,0.3)*thermal_conductivity)/diameter_inner_inner;
    outer_heat_transfer_coeff_theo      =  (0.023*Math.pow(reynolds_number,0.8)*Math.pow(prandtl_number,0.4)*thermal_conductivity)/(diameter_inner_outer-diameter_outer_inner);
    overall_heat_transfer_coeff_theo    = Math.pow(parseFloat(math.pow(inner_heat_transfer_coeff_theo,-1) + parseFloat((diameter_inner_inner*Math.log(diameter_outer_inner/diameter_inner_inner))/(2*thermal_conductivity)) + parseFloat((diameter_outer_inner)/(diameter_inner_inner*outer_heat_transfer_coeff_theo))),-1);

    /*
    if (condition) {
        block of code to be executed if the condition is true
    } else {
        block of code to be executed if the condition is false
    }
    */


    document.getElementById("d_air").value                  = d_air;
    document.getElementById("flow_rate_air").value          = flow_rate_air;
    document.getElementById("mass_rate_air").value          = mass_rate_air;
    document.getElementById("mass_rate_water").value        = mass_rate_water;
    document.getElementById("heat_transfer_from_hot").value = heat_transfer_from_hot;
    document.getElementById("heat_transfer_to_air").value   = heat_transfer_to_air;
    document.getElementById("avg_heat_transfer").value      = avg_heat_transfer;
    document.getElementById("log_mean_temp_diff_c").value   = log_mean_temp_diff_c;
    document.getElementById("log_mean_temp_diff_p").value   = log_mean_temp_diff_p;
    document.getElementById("surface_area_inner").value     = surface_area_inner;
    document.getElementById("surface_area_outer").value     = surface_area_outer;
    document.getElementById("inner_overall_heat_transfer_coeff_c").value    = inner_overall_heat_transfer_coeff_c;
    document.getElementById("inner_overall_heat_transfer_coeff_p").value    = inner_overall_heat_transfer_coeff_p;
    document.getElementById("outside_heat_transfer_coeff_c").value          = outside_heat_transfer_coeff_c;
    document.getElementById("outside_heat_transfer_coeff_p").value          = outside_heat_transfer_coeff_p;
    document.getElementById("capacity").value               = capacity;
    document.getElementById("reynolds_number").value        = reynolds_number;
    document.getElementById("prandtl_number").value         = prandtl_number;
    document.getElementById("inner_heat_transfer_coeff_theo").value         = inner_heat_transfer_coeff_theo;
    document.getElementById("outer_heat_transfer_coeff_theo").value         = outer_heat_transfer_coeff_theo;
    document.getElementById("overall_heat_transfer_coeff_theo").value       = overall_heat_transfer_coeff_theo;

}