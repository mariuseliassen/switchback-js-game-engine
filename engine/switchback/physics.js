/**
* ================
* == Switchback ==
* ================
* a Javascript Game Engine
* 
* Package: Switchback.Physics
* 
* Core game engine functionality
* 
* Copyright Exchange Media 2011
* http://gamedev.exchange.no/switchback/
*/


(function(window) {
    var Switchback = window.Switchback || Switchback;
    
    /**
     * Mouse control
     */
    Switchback.extend( { 
        physics : {
                
            /**
             * Initialize the mouse
             * 
             * @return void
             */
            init: function(param) {

				polygonA = [ 100 + x, 100, 200 + x, 100, 150 + x, 200 ];
				polygonB = [ 140 + x, 100, 350 + x, 100, 300 + x, 200 ];
    		},

    		/*
    		 * Creates a new World. This function creates a new World with the given size, no gravity and sleeping turned on. 
    		 */
    		newWorld : function( x1, y1, x2, y2 )
    		{
    			return {
    				'x1' : x1,
    				'y1' : y1,
    				'x2' : x2,
    				'y2' : y2,
    				'bodies' : []
    			};
    		},
    		
            _collide : function( polygonA, polygonB )
            {	    		
	    		var collision = true;

	    		var vectorsA = polygonToVectors( polygonA );
	    		var vectorsB = polygonToVectors( polygonB );
	    		
	    		var perpendicular;
	    		// loop over all vectors of both polygons
	    	    for( var vectorIndex = 0; vectorIndex < vectorsA.length + vectorsB.length; vectorIndex++ )
	    	    {
	    	        if( vectorIndex < vectorsA.length )
	    	        {
	    	            var vector = vectorsA[ vectorIndex ];
	    	        }
	    	        else
	    	        {
	    	        	var vector = vectorsB[ vectorIndex - vectorsA.length ];
	    	        }
	    	        
	    			vector = this._normalizeVector( vector );
	    			
	    			perpendicular = { 'x' : vector.y * -1,
	    					          'y' : vector.x
	    			};
	
	    			var projectionsA = this._projectPolygon( polygonA, perpendicular );
	    			var projectionsB = this._projectPolygon( polygonB, perpendicular );
	
	    			//console.log( projectionsA );
	    			//console.log( projectionsB );
	    			
	    			if( this._doProjectionsOverlap( projectionsA, projectionsB ) > 0 )
	    			{				
	    				collision = false;
	    			}
	    		}
	    	    
	    	    return collision;
            },
            
            polygonToVectors : function( polygon )
            {
            	var vectors = new Array();

            	var pointX1, pointY1, pointX2, pointY2, array_index = 0;
            	for( var i = 0; i < polygon.length; i++ )
            	{
            		if( i % 2 == 0 )
            		{
            			pointX1 = i;
            			pointY1 = i + 1;
            			pointX2 = (i + 2) % polygon.length;
            			pointY2 = (i + 3) % polygon.length;
            			
            			vectors[ array_index ] = { 'x' : polygon[ pointX2 ] - polygon[ pointX1 ],
            				                       'y' : polygon[ pointY2 ] - polygon[ pointY1 ]
            			                         };
            			array_index++;
            		}
            	}
            	return vectors;
            },
            
            _normalizeVector : function( vector )
            {
            	var length = Math.sqrt( Math.pow( vector.x, 2 ) + Math.pow( vector.y, 2 ) );
            	
            	return { 'x' : ( vector.x / length ),
            		     'y' : ( vector.y / length )
            	};
            },

            _projectPolygon : function( polygon, perpendicular )
            {
            	var projections = new Array();
            	
            	var pointX1, pointY1, array_index = 0;
            	for( var i = 0; i < polygon.length; i++ )
            	{
            		if( i % 2 == 0 )
            		{
            			pointX = i;
            			pointY = i + 1;
            			
            			projections[ array_index ] = polygon[ pointX ] * perpendicular.x + polygon[ pointY ] * perpendicular.y;
            			
            			array_index++;
            		}
            	}
            	
            	return projections;
            },

            _doProjectionsOverlap : function( projectionsA, projectionsB )
            {
            	var minA = 1000000000;
            	var maxA = -1000000000;
            	
            	for( var i = 0; i < projectionsA.length; i++ )
            	{
            		if( projectionsA[ i ] > maxA )
            		{
            			maxA = projectionsA[ i ];
            		}
            		
            		if( projectionsA[ i ] < minA )
            		{
            			minA = projectionsA[ i ];
            		}
            	}

            	var minB = 1000000000;
            	var maxB = -1000000000;
            	
            	for( var i = 0; i < projectionsB.length; i++ )
            	{
            		if( projectionsB[ i ] > maxB )
            		{
            			maxB = projectionsB[ i ];
            		}
            		
            		if( projectionsB[ i ] < minB )
            		{
            			minB = projectionsB[ i ];
            		}
            	}
            		
            	return this._intervalDistance( minA, maxA, minB, maxB);
            },

            intervalDistance : function( minA, maxA, minB, maxB) {
                if ( minA < minB ) {
                    return minB - maxA;
                } else {
                    return minA - maxB;
                }
            }
        }
    });
    
    Switchback.registerModule('physics');
    
    window.Switchback = Switchback;
})(window);