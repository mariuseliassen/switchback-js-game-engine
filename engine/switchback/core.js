/**
* ================
* == Switchback ==
* ================
* a Javascript Game Engine
* 
* Package: Switchback.Core
* 
* Core game engine functionality
* 
* Copyright Exchange Media 2011
* http://gamedev.exchange.no/switchback/
*/

(function(window) {
    var tick, tickID;
    // Create main Object
    var Switchback = {
        
        consoleLog: false,
        gameObject: null,

        /*
         * Add initialize functionality
         * 
         * @param game The game object
         * @param param Parameters
         */
        init: function(game, param) {           

        	if (typeof(param) != "object") param = {}; // Default the param object
        	            
            this.gameObject = game;
            
            if (param.consoleLog == true) this.consoleLog = true;
            
            // Initialize the modules
            this.initializeModules(param); 

            // Load
            Switchback.load();
            
            if (this.consoleLog) console.log('Switchback.Core initialized');
            
            return this;
        },
        
        // List of modules
        _modules: {},
        
        /**
         * Function to register a module
         * 
         * @param (string) module The module name
         */
        registerModule: function(module) {
            if (!this._modules[module]) {
                this._modules[module] = module;
            }
            
            return this._modules;
        },
        
        /**
         * Function to initialize the different modules
         * 
         * @param (object) param The parameters
         */
        initializeModules: function(param) {
            var mp;
            
            for (module in this._modules) {
                // Reset module params
                mp = {};
                
                // Have we disabled the module in config?
                if (param[module]) {
                    // Set module params
                    mp = param[module];
                    if (param[module].disabled && param[module].disabled == true) {
                        continue;
                    }
                }
                
                var m = Switchback.get(module);
                if (m.init) {
                    // Send module params to module init function
                    m.init(mp);
                }
            }
        },

        /**
         * Function to log a message
         * 
         * @param message The message to log to console
         * 
         * @return void
         */
        log: function( message, warn ) {
            if (console) {
            	if( warn ) {
            		console.warn( message );
            	} else {
            		console.log(message);
            	}
            } 
        },
                
        /**
         * Function prototypes
         */
        load : function() {
        	this.trigger('load');
        },
        
        /**
         * Function prototypes
         */
        update : function(dt) {
        	this.trigger('update', dt);
        },
        
        /**
         * Function prototypes
         */
        draw : function(dt) {
        	this.trigger('draw', dt);
        },

        // 
        get: function(e) {
            if (this[e]) return this[e];
            
            return {};
        },

        // Callback functions
        keypressed : function( keysDown ) {
            this.trigger('keypressed', keysDown);
        },
        
        _binds: {},
        _bindsHash: {},
        
        // This is just for the bind fallback
        getId: function() {
            return 'SWITCHBACK_CORE';
        },
        
        bind: function(event, fn, scope) {
            if (!this._binds[event]) this._binds[event] = [];
            var scope = scope || this, b = this._binds[event];
            
            if (typeof(scope) == 'object') {
                b[scope.getId()] = (function() {
                    fn.apply(scope, arguments);
                });
            }
            
            return scope;
        },
        
        unbind: function(event, scope) {
            if (!this._binds[event]) this._binds[event] = [];
            var scope = scope || this, sid = scope.getId(), b = this._binds[event];
            
            if (b[sid]) {
                delete b[sid]; 
            }
            
            return scope;
        },
        
        trigger: function(event, data) {       
            if (this._binds[event]) {
                for (fn in this._binds[event]) {
                    //console.log(this._binds[event][fn].toString());
                    this._binds[event][fn].call(this, data);
                }
            }

            return this;
        }
    };
    
    /*
     * Function to extend the Switchback namespace
     * PK: why not just setting it with Switchback.mynewobject = {};
     */
    Switchback.extend = function(e, o) {
        if (arguments.length == 1) {
            o = e;
            e = this;
        }
        var t = e, k;
        
        if(!o) return t;
        
        for(k in o) {
            if(t === o[k]) continue;
            t[k] = o[k];
        }
        
        return t;
    };

    // Make it global by assigning it to window
    window.Switchback = Switchback;
})(window);

