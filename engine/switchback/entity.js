/**
* ================
* == Switchback ==
* ================
* a Javascript Game Engine
* 
* Package: Switchback.Entity
* 
* Entity game engine functionality
* 
* Copyright Exchange Media 2011
* http://gamedev.exchange.no/switchback/
*/


(function(window) {
    var Switchback = window.Switchback || Switchback;
    
    /**
     * Entity functionality
     */
    Switchback.extend({
       entity: function(name, components) {
           var entity = {}, ec = Switchback.get('entityCore'), name, components = components || null;

           // Return cached object
           if (ec._names[name] && ec._list[ec._names[name]]) {
               return ec._list[ec._names[name]];
           }
           // Generate new id
           var eid = ec.gid();

           // Reset cache (if any)
           ec._list[eid] = null;
           ec._list[eid] = entity;
           ec._names[name] = eid;
           
           // Extend with id and name
           Switchback.extend(entity, { 
               _id: eid, 
               _name: name
           });
       
           // Extend basic methods of a entity
           Switchback.extend(entity, this.entityCore.defaultEntity.clone());

           // Add components if any
           if (components != null && (components.length || typeof(components) == 'object')) {
               entity.addComponent(components);   
           }
           
           // Return the entity
           return entity;
       },
           
       /**
        * EntityCore contains the core functionality of entities
        */
       entityCore: {
           // List of entities
           _list: {},
           // The running id of an entity
           _id: 1,
           // Name map for entities
           _names: {},
           
           /**
            * Function to generate a new id
            */
           gid: function() {
               return this._id++;
           },

           /**
            * Initialize the module
            */
           init: function(param) {
               
           },
           
           /**
            * This is a default entity object with basic functionality like adding components and retriving them.
            */
           defaultEntity: {
               // List of components to the entity
               _components: {},
               
               _x: 0,
               _y: 0,
               
               getId: function() {
                   return this._name;
               },
               
               bind: function(event, fn) {
                   return Switchback.bind(event, fn, this);
               },
               unbind: function(event) {
                   return Switchback.unbind(event, this);
               },
               
               /**
                * Initialize function to bind draw and update components
                */
               init: function() {

               },
               
               coords: function(x,y) {
                   this._x = x;
                   this._y = y;
                   
                   return this;
               },
               
               getX: function() {
                   return this._x;
               },
               
               getY: function() {
                   return this._y;
               },
               
               /**
                * Function to clone an entity
                */
               clone: function() {
                   var components = this._components,
                       comp,
                       prop,
                       clone = {};
                       
                   for(prop in this) {
                       clone[prop] = this[prop];
                   }
                   
                   clone._components = {};
                   
                   for(comp in components) {
                       clone.addComponent(comp);
                   }

                   return clone;
               },
               
               /**
                * Returns the components of an entity
                */
               getComponents: function() {
                   return this._components;  
               },
               
               /**
                * Returns a component
                */
               getComponent: function(name) {
                   return (this._components[name]) ? this._components[name] : null;
               },
               
               /**
                * Checks if a component exists on the entity
                */
               hasComponent: function(name) {
                   return (this._components[name]) ? true : false;
               },
               
               /**
                * Add an component to an entity
                */
               addComponent: function(c) {
                   var components = Switchback.get('components');
                   if (typeof(c) == 'object') {
                       for (k in c) {
                           // Check to see if component exists before we add it
                           if (components.isRegistered(k)) {
                               // Get the component and apply the parameters
                               this._components[k] = components.get(k).registerEntity(this._name);
                               this._components[k].init(c[k]);
                           }
                       }
                   }
               }
           }
           
       }
    });
    
    Switchback.registerModule('entityCore');
    
    window.Switchback = Switchback;
})(window);