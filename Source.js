'use strict';

export default class Source {
    constructor(track, source, { duration, name }) {
        this.track = track;
        this.source = source;
        this.name = name;
        this.duration = duration;
        
        this.offset = track.offset;
        this.time = track.totalTime;

        this.element = document.createElement('div');
        this.element.classList.add('track__source');
        this.element.style.width = `${duration}px`;
        track.element.insertAdjacentElement('beforeend', this.element);
        
        this.element.addEventListener('drag', this._handleDrag);
    }
    
    async _handleDrag (e) {}

    start() { this.track.start(this.offset); }
}
