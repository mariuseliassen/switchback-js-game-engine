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
    
    /**
     * Component functionality
     */
    Switchback.extend({
        component: function(name, c, extended) {
            var component = {}, sbc = Switchback.get('components');
            
            // Exists?
            if (typeof(extended) == 'undefined') {
                if (sbc._list[name]) {
                    component = sbc._list[name];
                }
            } else {
                if (sbc._list[extended]) {
                    component = sbc._list[extended];
                }
            }
            // Extend the component
            if (typeof(c) != 'undefined') {
                Switchback.extend(component, c);
            }
            
            if (component.entityName && component.entityName != null) {
                return component;
            }
            
            Switchback.extend(component, {
                _name: name,
                // This holds the entity the component is attached to
                entityName: null,
                registerEntity: function(name) {
                    this.entityName = name;
                    return this;
                },
                getEntity: function() {
                    return (this.entityName != null) ? Switchback.entity(this.entityName) : null;
                },
                getId: function() {
                    return this.getEntity()._name + '_' + this._name;
                },
                extend: function(o) {
                    return Switchback.extend(this, o);
                },
                clone: function() {
                    var prop,
                        clone = {};
                        
                    for(prop in this) {
                        clone[prop] = this[prop];
                    }

                    return clone;
                },
                bind: function(event, fn) {
                    return Switchback.bind(event, fn, this);
                },
                unbind: function(event) {
                    return Switchback.unbind(event, this);
                }
            });
            
            // Default functionality
            if (!component.update) {
                component.extend({update: function(gameTime) {}});
            }
            if (!component.init) {
                component.extend({init: function(param, e) {}});
            }
            if (!component.draw) {
                component.extend({draw: function(gameTime) {}});
            }
            
            sbc.register(name, component);

            return component;
        },
        
        components: {
            _list: {},
            _handlers: {},
            
            init: function(param) {
                
            },
            
            create: function(o) {
                var c = {};
                
                Switchback.extend(c, o);
                
                return c;
            },
            
            get: function(name) {
                // Return the component or just a new object with a init function for fallback support
                return (this._list[name]) ? this._list[name].clone() : {init: function() {}};
            },
            
            register: function(name, component) {
                this._list[name] = component;
                
                return true;
            },
            
            /**
             * Function to check if a component exists
             */
            isRegistered: function(name) {
                return (this._list[name]) ? true : false;
            }
        }
    });
    
    Switchback.registerModule('components');
    
    window.Switchback = Switchback;
})(window);