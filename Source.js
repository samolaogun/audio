'use strict';

export default class Source {
    constructor(track, { duration, name }) {
        this.track = track;
        this.offset = track.offset;
        
        this.name = name;
        this.duration = duration;
        this.time = track.totalTime;

        this.element = document.createElement('div');
        this.element.classList.add('track__source');
        this.element.style.width = `${duration}px`;
        track.element.insertAdjacentElement('beforeend', this.element);
        
        this.element.addEventListener('drag', this._handleDrag);
    }
    
    async _handleDrag () {
    
    }

    start() {
        this.sourceNode.start(this.offset);
    }
}
