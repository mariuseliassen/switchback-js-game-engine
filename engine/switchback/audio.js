/**
* ================
* == Switchback ==
* ================
* a Javascript Game Engine
* 
* Package: Switchback.Audio
* 
* Audio game engine functionality
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
       audio: {

           // If set to true we use dom getElementById to play items, else use javascript memory.
           _useDOM: false,
           // Objects containing the playable audio files
           _audioFiles: {},
           // A running id number
           _id: 0,
           // The meta types
           _metaTypeMap: {
               mp3: 'audio/mpeg',
               ogg: 'audio/ogg',
               wav: 'audio/wav'
           },
           
           /**
            * Function to load a audio file
            * 
            * @param file The path to the audio file
            * 
            * @return boolean Returns the success of the load/support
            */
           load: function(name, file) {
               var ext = file.substr(file.length - 3);

               if (this.isSupported(ext)) {
                   this._id++
                   
                   var audioEl = document.createElement('audio');
                   audioEl.id = 'switchbackAudioElement' + this._id;
                   audioEl.src = file;
                   audioEl.type = this.getMetaType(ext);
                   //audioEl.controls = "controls";
                   // Run the load method to preload into memory
                   audioEl.load();
                   
                   if (this._useDOM) {
                       // Add to body
                       document.getElementsByTagName('body')[0].appendChild(audioEl);
                       
                       // Add the reference
                       this._audioFiles[name] = 'switchbackAudioElement' + this._id;
                   } else {
                       this._audioFiles[name] = audioEl;
                   }
                   
                   
                   
                   return true;
               } else {
                   // Not supported
                   return false;
               }
           },
           
           play: function(name) {
               if (this._audioFiles[name]) {
                   var audio = (this._useDOM) ? document.getElementById(this._audioFiles[name]) : this._audioFiles[name];
                   if (audio && audio.play) {
                       audio.play();
                   }
               }
           },
           
           /**
            * Returns the meta type for the extension
            * 
            * @param ext the file extension
            * 
            * @return string Metatype
            */
           getMetaType: function(ext) {
               return (this._metaTypeMap[ext]) ? this._metaTypeMap[ext] : 'audio/unknown';
           },
           
           /**
            * Checks wheter or not a fileextension is supported in this browser
            * 
            * @param ext The file extension
            * 
            * @return boolean True if supported, false if not
            */
           isSupported: function(ext) {
               // Just return true for now.
               return true;
           },
           
           /**
            * Initialize the audio component
            * 
            * @return void
            */
           init: function(param) {
               if (param.useDOM != undefined) {
                   this._useDOM = param.useDOM;
               }

               // Loop over and load every audio file
               if (param.files) {
                   for (name in param.files) {
                       this.load(name, param.files[name]);
                   }
               }
           }
           
       } 
    });
    
    Switchback.registerModule('audio');
    
    window.Switchback = Switchback;
})(window);