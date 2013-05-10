/**
 * ================ == Switchback == ================ a Javascript Game Engine
 * 
 * Package: Switchback.Components
 * 
 * Components game engine functionality
 * 
 * Copyright Exchange Media 2011 http://gamedev.exchange.no/switchback/
 */

(function(window)
{
	var Switchback = window.Switchback || Switchback;

	var mapComponent = Switchback.component('map', {
		map : 
		[
		 	[ 0, 0, 0, 0, 0, 0, 0 ],
    		[ 0, 1, 2, 2, 2, 3, 0 ],
    		[ 0, 8, 0, 0, 0, 4, 0 ],
    		[ 0, 8, 0, 0, 0, 4, 0 ],
    		[ 0, 8, 0, 0, 0, 4, 0 ],
    		[ 0, 7, 6, 6, 6, 5, 0 ],
		 	[ 0, 0, 0, 0, 0, 0, 0 ],
		],
		tileQuads : [],
		sprite : '',
		smallTileSize : 32,

		init : function(param) {

			this.sprite = Switchback.graphics.newImage('images/tiles/Tilesets/008-Snowfield01.png');

			this.tileQuads[0] = Switchback.graphics.newQuad(0, 0, this.smallTileSize, this.smallTileSize);
			this.tileQuads[1] = Switchback.graphics.newQuad(0 * this.smallTileSize, 6 * this.smallTileSize, this.smallTileSize, this.smallTileSize);
			this.tileQuads[2] = Switchback.graphics.newQuad(1 * this.smallTileSize, 6 * this.smallTileSize, this.smallTileSize, this.smallTileSize);
			this.tileQuads[3] = Switchback.graphics.newQuad(2 * this.smallTileSize, 6 * this.smallTileSize, this.smallTileSize, this.smallTileSize);
			this.tileQuads[4] = Switchback.graphics.newQuad(2 * this.smallTileSize, 7 * this.smallTileSize, this.smallTileSize, this.smallTileSize);
			this.tileQuads[5] = Switchback.graphics.newQuad(2 * this.smallTileSize, 8 * this.smallTileSize, this.smallTileSize, this.smallTileSize);
			this.tileQuads[6] = Switchback.graphics.newQuad(1 * this.smallTileSize, 8 * this.smallTileSize, this.smallTileSize, this.smallTileSize);
			this.tileQuads[7] = Switchback.graphics.newQuad(0 * this.smallTileSize, 8 * this.smallTileSize, this.smallTileSize, this.smallTileSize);
			this.tileQuads[8] = Switchback.graphics.newQuad(0 * this.smallTileSize, 7 * this.smallTileSize, this.smallTileSize, this.smallTileSize);
		}
	});

	window.Switchback = Switchback;
})(window);