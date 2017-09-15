/**
 * Created by pratham on 02/08/17.
 */

var diameter = 0.038, length_tube = .5;
var voltage, current, a, b, c, d, e, f, g, heat_transfer_coeff, t_avg_surface, t_air;
var heat_flow, surface_area ;








function roundoff4(rnum1){
    var rnum = rnum1;
    rnum = (Math.round(rnum*Math.pow(10,4)))/Math.pow(10,4);
    return rnum;
}

function calculations(){


    length_tube = document.getElementById("length_tube").value ;
    diameter = document.getElementById("diameter").value ;
    voltage = document.getElementById("voltage").value ;
    current = document.getElementById("voltage").value ;
    a = document.getElementById("T1").value ;
    b = document.getElementById("T2").value ;
    c = document.getElementById("T3").value ;
    d = document.getElementById("T4").value ;
    e = document.getElementById("T5").value ;
    f = document.getElementById("T6").value ;
    g = document.getElementById("T7").value ;
    t_air = document.getElementById("T_air").value ;

    surface_area = Math.PI*diameter*length_tube;
    heat_flow = voltage*current;
    t_avg_surface = (parseInt(a) + parseInt(b) + parseInt(c) + parseInt(d) + parseInt(e) + parseInt(f) + parseInt(g))/7 ;
    heat_transfer_coeff = (heat_flow)/(surface_area*(t_avg_surface-t_air));

    document.getElementById("surface_area").value          = surface_area;
    document.getElementById("T_avg_surface").value          = t_avg_surface;
    document.getElementById("heat_flow").value          = heat_flow;
    document.getElementById("heat_transfer_coeff").value          = heat_transfer_coeff;


}


/*

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


    /!* // density and velocity of hot taken because these calculations are for inner tube in which hot fluid flows
     reynolds_number = (d_hot*velocity_hot*diameter_inner)/dynamic_viscosity ;
     reynolds_number =   roundoff4(reynolds_number)

     document.getElementById("reynolds_number").value  = reynolds_number;
     // specific heat is taken of hot in prandtl number
     prandtl_number = (sh_hot*dynamic_viscosity)/thermal_conductivity;
     document.getElementById("prandtl_number").value  = prandtl_number;
 *!/
// Sieder-Tate Equation. to find inside and outside film heat transfer coeff
    // Value of heat transfer factor from figure or from eagle and farguson eqn.



// inside and outeside
    inside_film_heat_coeff = (4280*(.00488*avg_temp_hot -1)*Math.pow(velocity_hot,.8))/(Math.pow(,.2));
    outside_film_heat_coeff = (4280*(.00488*avg_temp_hot -1)*Math.pow(velocity_hot,.8))/(Math.pow(,.2));
    // Doubts.....which fluid flows inside and which outside?

    theo_overall_heat_transfer_coeff = Math.pow((Math.pow(outside_film_heat_coeff,-1) + (diameter_outer_inner*Math.pow((diameter_inner_inner*inside_film_heat_coeff),-1))),-1);



    /!*inside_film_heat_coeff      = (thermal_conductivity*heat_transfer_factor*(Math.pow(prandtl_number,(1/3))))/diameter_inner_inner;
inside_film_heat_coeff      =   roundoff4(inside_film_heat_coeff);

outside_film_heat_coeff    = (heat_transfer_to_cold + heat_transfer_from_hot )/(2*(number_of_tubes*cross_area_outer*log_temp_diff));
outside_film_heat_coeff    =   roundoff4(outside_film_heat_coeff);
*!/


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
    document.getElementById("inside_film_heat_coeff").value     = inside_film_heat_coeff;// this is inner overall
    document.getElementById("outside_film_heat_coeff").value     = outside_film_heat_coeff;// this is inner overall
    document.getElementById("theo_overall_heat_transfer_coeff").value     = theo_overall_heat_transfer_coeff;// this is inner overall




}























*/

