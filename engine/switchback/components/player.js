/**
* ================
* == Switchback ==
* ================
* a Javascript Game Engine
* 
* Package: Switchback.Components
* 
* Components game engine functionality
* 
* Copyright Exchange Media 2011
* http://gamedev.exchange.no/switchback/
*/

(function(window) {
	var Switchback = window.Switchback || Switchback;

	var playerComponent = Switchback.component('player', {

		gridSize: 32,
        grid_x : 32,
        grid_y : 32,
        act_x : 32,
        act_y : 32,
        speed : 4,
        
		init : function(param) {
		    
		}
	});

	window.Switchback = Switchback;
})(window);