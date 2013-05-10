/**
* ================
* == Switchback ==
* ================
* a Javascript Game Engine
* 
* Package: Switchback.Mouse
* 
* Core game engine functionality
* 
* Copyright Exchange Media 2011
* http://gamedev.exchange.no/switchback/
*/


(function(window) {
    var Switchback = window.Switchback || Switchback;
    
    /**
     * Browser detection and handling
     */
    Switchback.extend({
       browser: {
           name: null,
           userAgent: null,
           
           /**
            * Check if the browser is IE
            * 
            * return boolean True if browser is Internet Explorer
            */
           isIE: function() {
               return (this.name.indexOf('Internet Explorer') > -1);
           },
           
           /**
            * Check if browser is Chrome
            * 
            * @return boolean Returns true if the browser is Chrome
            */
           isChrome: function() {
               return (this.userAgent.indexOf('Chrome') > -1);
           },
           
           /**
            * Initialize the browser detection
            * 
            * @return void
            */
           init: function(param) {
               this.name = window.navigator.appName;
               this.userAgent = window.navigator.userAgent;
               
           }
           
       } 
    });
    
    Switchback.registerModule('browser');
    
    window.Switchback = Switchback;
})(window);