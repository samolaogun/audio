'use strict';

import Source from './Source.js';

export default class Track {
    constructor(container) {
        this.totalTime = 0;
        this.pixelSecondRatio = 1;
        this.sources = [];

        this.element = document.createElement('div');
        this.element.classList.add('track');
        container.insertAdjacentElement('beforeend', this.element);

        this.element.addEventListener('drop', this._handleDrop);
    }
    
    async _handleDrop(e) {
        e.preventDefault();

        if (!e.dataTransfer) return;

        const [item, ] = e.dataTransfer.items;
        const entry = item.webkitGetAsEntry();
        
        const file = await new Promise((...handlers) => { entry.file(...handlers); });
        const { duration, name, type } = file;
        
        if (/^audio/.test(type))
            this.addSource(this._sourceFromFile(file), { duration, name });
    }
    
    _sourceFromFile() {
        const source = context.createBufferSource();

        source.buffer = await new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.addEventListener('load', () => context.decodeAudioData(fileReader.result, resolve, reject));
            fileReader.addEventListener('error', reject);
            
            fileReader.readAsArrayBuffer(file);
        });

        source.connect(context.destination);
        return source;
    }

    start() { this.sources.forEach(source => source.start()); }

    addSource({name}, {duration}) { 
        this.sources.push(new Source(this, { duration, name }));
        this.totalTime += duration;
    }
}
