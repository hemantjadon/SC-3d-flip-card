/*
@license
Copyright (c) 2016 Hemant Jadon. All rights reserved.
*/

'use strict';

class SCFlipCard extends HTMLElement{

	static get SIDES (){
		return {
			FRONT : 1,
			BACK : 2
		};
	}

	flip(){
		const scale = (750 + 10) / 750;	// (prespective - push_back)/perspective
		const sideOne = [
			{ transform : `translateZ(-10px) rotateY(0deg) scale(${scale})` },
			{ transform : `translateZ(50px) rotateY(0deg) scale(${scale})`, offset: 0.15 },
			{ transform : `translateZ(50px) rotateY(180deg) scale(${scale})`, offset : 0.65},			
			{ transform : `translateZ(-10px) rotateY(180deg) scale(${scale})` },									
		];

		const sideTwo = [
			{ transform : `translateZ(-10px) rotateY(180deg) scale(${scale})` },
			{ transform : `translateZ(50px) rotateY(180deg) scale(${scale})`, offset : 0.15 },
			{ transform : `translateZ(50px) rotateY(360deg) scale(${scale})`, offset : 0.65 },
			{ transform : `translateZ(-10px) rotateY(360deg) scale(${scale})` },									
		];

		const timing = {
			duration : 1000,
			iteration : 1,
			easing : 'ease-in-out',
			fill : 'forwards'
		}

		switch (this._side) {
			case SCFlipCard.SIDES.FRONT:
				this._front.animate(sideOne,timing);
				this._back.animate(sideTwo,timing);
				this._front.inert = true;
				this._back.inert = false;
				break;

			case SCFlipCard.SIDES.BACK:
				this._front.animate(sideTwo,timing);
				this._back.animate(sideOne,timing);
				this._front.inert = false;
				this._back.inert = true;
				break;

			default :
				throw new Error("Unknown Side");
		}

		this._side = (this._side === SCFlipCard.SIDES.FRONT) ? 
					SCFlipCard.SIDES.BACK : 
					SCFlipCard.SIDES.FRONT;
	}

	attachedCallback(){
		this._side = SCFlipCard.SIDES.FRONT;
		this._front = this.querySelector('.front');
		this._back = this.querySelector('.back');
		this._buttons = this.querySelectorAll('button');

		Array.from(this._buttons)
		 		.forEach(b => {
					 b.addEventListener('click', _ => this.flip());
				 });

		this._front.setAttribute('inert','false');
		this._front.setAttribute('inert','true');
	}

	detachedCallback(){
		Array.from(this._buttons)
				.forEach(b => {
					b.removeEventListener('click', _ => this.flip());
				});
	}

}

document.registerElement('sc-flip-card',SCFlipCard);