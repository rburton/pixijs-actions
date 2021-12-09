import * as PIXI from 'pixi.js';
import TargetedAction from './TargetedAction';
import Interpolation from '../Interpolation';
import Interpolations from '../Interpolations';

export default class ScaleTo extends TargetedAction {
	interpolation: Interpolation;
	startX: number;
	startY: number;
	x: number;
	y: number;
	
	constructor(
		target: PIXI.DisplayObject,
		x: number, 
		y: number, 
		seconds: number, 
		interpolation: Interpolation = Interpolations.linear)
	{
		super(target, seconds);
		this.interpolation = interpolation;
		this.x = x;
		this.y = y;
	}
	
	tick(delta: number): boolean {
		if (this.time === 0) {
			this.startX = this.target.scale.x;
			this.startY = this.target.scale.y;
		}
		
		this.time += delta;
		
		const factor: number = this.interpolation(this.timeDistance);
		this.target.scale.set(
			this.startX + (this.x - this.startX) * factor,
			this.startY + (this.y - this.startY) * factor,
		);
		return this.timeDistance >= 1;
	}
	
	reset() {
		super.reset();
		this.time = 0;
		return this;
	}
};