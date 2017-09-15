/**
 * Created by pratham on 29/7/17.
 */

var diameter_inner_inner = .0095, diameter_outer_inner = 0.0127, diameter_inner_outer = .028, diameter_outer_outer = 0.034, area_inner_tube, area_outer_tube, length_of_tube = 1.6;
var outer_surface_area_inner;
var sh_cold         , sh_hot            , d_cold , d_hot ;
var inlet_temp_cold , outlet_temp_cold  , inlet_temp_hot        , outlet_temp_hot, avg_temp_cold   , avg_temp_hot;
var velocity_cold   , velocity_hot      , mass_rate_hot         , mass_rate_cold;
var flow_rate_cold  , flow_rate_hot; // Flow rate in litres per hour;
var dynamic_viscosity, thermal_conductivity;

// id and variable (both same name)
var heat_transfer_from_hot, heat_transfer_to_cold, heat_loss_exchanger, efficiency_exchanger, log_temp_diff_c, log_temp_diff_p, overall_heat_transfer_coeff_c,overall_heat_transfer_coeff_p, theo_overall_heat_transfer_coeff, theo_inside_film_heat_coeff, theo_outside_film_heat_coeff ;
var capacity, c_max, c_min;
var effectiveness_exchanger, number_transfer_unit_c, number_transfer_unit_p;

area_inner_tube = (Math.PI*Math.pow(diameter_inner_inner,2))/4 ;
area_outer_tube = (Math.PI*(Math.pow(diameter_inner_outer,2)-Math.pow(diameter_outer_inner)))/4 ;
var T1_p, T2_p, T1_c, T2_c;


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



}


function input_values() {
    flow_rate_cold      = document.getElementById("flow_rate_cold").value ;
    flow_rate_hot       = document.getElementById("flow_rate_hot").value ;
    inlet_temp_cold     = document.getElementById("inlet_temp_cold").value ;
    inlet_temp_hot      = document.getElementById("inlet_temp_hot").value ;
    outlet_temp_cold    = document.getElementById("outlet_temp_cold").value ;
    outlet_temp_hot     = document.getElementById("outlet_temp_hot").value ;

    // Calculate other parameters that use above variables.
    avg_temp_cold       = (inlet_temp_cold  + outlet_temp_cold)/2;
    avg_temp_hot        = (inlet_temp_hot   + outlet_temp_hot)/2 ;


}

function calculations() {




    velocity_cold           = flow_rate_cold/((3600*1000)*area_inner_tube);
    velocity_cold   =   roundoff4(velocity_cold);

    velocity_hot           = flow_rate_hot/((3600*1000)*area_outer_tube);
    velocity_hot   =   roundoff4(velocity_hot);

    mass_rate_hot           = (flow_rate_hot*d_hot)/(3600*1000);       // flow_rate is in lph
    mass_rate_hot   =   roundoff4(mass_rate_hot);

    mass_rate_cold          = (flow_rate_cold*d_cold)/(3600*1000);
    mass_rate_cold  =   roundoff4(mass_rate_cold);

    heat_transfer_from_hot  = mass_rate_hot*sh_hot*(inlet_temp_hot-outlet_temp_hot);
    heat_transfer_from_hot  =   roundoff4(heat_transfer_from_hot);

    heat_transfer_to_cold   = mass_rate_cold*sh_cold*(outlet_temp_cold-inlet_temp_cold);
    heat_transfer_to_cold   =   roundoff4(heat_transfer_to_cold);

    heat_loss_exchanger     = heat_transfer_from_hot - heat_transfer_to_cold;
    heat_loss_exchanger     =   roundoff4(heat_loss_exchanger);

    efficiency_exchanger    = (heat_transfer_to_cold/heat_transfer_from_hot)*100;
    efficiency_exchanger    =   roundoff4(efficiency_exchanger);

    // Counter-flow Calculations
    T1_c     = inlet_temp_hot    - outlet_temp_cold ;
    T2_c    = outlet_temp_hot   - inlet_temp_cold;
    log_temp_diff_c           = (T1_c - T2_c)/Math.log((T1_c/T2_c));
    log_temp_diff_c   =   roundoff4(log_temp_diff_c);

    // Parallel-flow calaculations...
    T1_p = inlet_temp_hot - inlet_temp_cold;
    T2_p = outlet_temp_hot - outlet_temp_cold;
    log_temp_diff_p           = (T1_p - T2_p)/Math.log((T1_p/T2_p));
    log_temp_diff_p   =   roundoff4(log_temp_diff_p);

    outer_surface_area_inner = Math.PI*diameter_outer_inner*length_of_tube;

    // Counter_flow
    overall_heat_transfer_coeff_c = (heat_transfer_to_cold)*(outer_surface_area_inner*log_temp_diff_c);

    // Parallel_flow
    overall_heat_transfer_coeff_p = (heat_transfer_to_cold)*(outer_surface_area_inner*log_temp_diff_p);


   /* // density and velocity of hot taken because these calculations are for inner tube in which hot fluid flows
    reynolds_number = (d_hot*velocity_hot*diameter_inner)/dynamic_viscosity ;
    reynolds_number =   roundoff4(reynolds_number)

    document.getElementById("reynolds_number").value  = reynolds_number;
    // specific heat is taken of hot in prandtl number
    prandtl_number = (sh_hot*dynamic_viscosity)/thermal_conductivity;
    document.getElementById("prandtl_number").value  = prandtl_number;
*/
// Sieder-Tate Equation. to find inside and outside film heat transfer coeff
    // Value of heat transfer factor from figure or from eagle and farguson eqn.



// inside and outeside
        theo_inside_film_heat_coeff = (4280*(.00488*avg_temp_hot -1)*Math.pow(velocity_hot,.8))/(Math.pow(diameter_inner_inner,.2));
        theo_outside_film_heat_coeff = (4280*(.00488*avg_temp_hot -1)*Math.pow(velocity_cold,.8))/(Math.pow(diameter_outer_inner,.2));
    // Doubts.....which fluid flows inside and which outside?

theo_overall_heat_transfer_coeff = Math.pow((Math.pow(outside_film_heat_coeff,-1) + (diameter_outer_inner*Math.pow((diameter_inner_inner*inside_film_heat_coeff),-1))),-1);



        /*inside_film_heat_coeff      = (thermal_conductivity*heat_transfer_factor*(Math.pow(prandtl_number,(1/3))))/diameter_inner_inner;
    inside_film_heat_coeff      =   roundoff4(inside_film_heat_coeff);

    outside_film_heat_coeff    = (heat_transfer_to_cold + heat_transfer_from_hot )/(2*(number_of_tubes*cross_area_outer*log_temp_diff));
    outside_film_heat_coeff    =   roundoff4(outside_film_heat_coeff);
*/


    c_min = mass_rate_hot*sh_hot;
    c_max = mass_rate_cold*sh_cold;
    capacity = c_min/c_max;

    number_transfer_unit_c = (overall_heat_transfer_coeff_c*outer_surface_area_inner)/c_min;
    number_transfer_unit_p = (overall_heat_transfer_coeff_p*outer_surface_area_inner)/c_min;



    document.getElementById("velocity_cold").value          = velocity_cold;
    document.getElementById("velocity_hot").value          = velocity_hot;
    document.getElementById("mass_rate_hot").value          = mass_rate_hot;
    document.getElementById("heat_transfer_from_hot").value = heat_transfer_from_hot;
    document.getElementById("mass_rate_cold").value         = mass_rate_cold;
    document.getElementById("heat_transfer_to_cold").value  = heat_transfer_to_cold;
    document.getElementById("heat_loss_exchanger").value    = heat_loss_exchanger;
    document.getElementById("efficiency_exchanger").value   = efficiency_exchanger;
    document.getElementById("log_temp_diff_p").value          = log_temp_diff_p;
    document.getElementById("log_temp_diff_c").value          = log_temp_diff_c;
    document.getElementById("outer_surface_area_inner").value = outer_surface_area_inner;
    document.getElementById("overall_heat_transfer_coeff_c").value     = overall_heat_transfer_coeff_c;// this is inner overall
    document.getElementById("overall_heat_transfer_coeff_p").value     = overall_heat_transfer_coeff_p;// this is inner overall
    document.getElementById("theo_inside_film_heat_coeff").value     = theo_inside_film_heat_coeff;// this is inner overall
    document.getElementById("theo_outside_film_heat_coeff").value     = theo_outside_film_heat_coeff;// this is inner overall
    document.getElementById("theo_overall_heat_transfer_coeff").value     = theo_overall_heat_transfer_coeff;// this is inner overall
    document.getElementById("capacity").value     = capacity;// this is inner overall
    document.getElementById("number_transfer_unit_c").value     = number_transfer_unit_c;// this is inner overall
    document.getElementById("number_transfer_unit_p").value     = number_transfer_unit_p;// this is inner overall




}



// Theoretical overall heat transfer coefficient