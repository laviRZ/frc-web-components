import { Webbit, html, css } from '@webbitjs/webbit';
import { containerStyles } from '../styles';
import * as CurvedArrow from '../curved-arrow';

/** 
 * Copyright (c) 2017-2018 FIRST
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of FIRST nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY FIRST AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY NONINFRINGEMENT AND FITNESS FOR A PARTICULAR 
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL FIRST OR CONTRIBUTORS BE LIABLE FOR 
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

function clamp(value, min, max) {
  return Math.min(max, Math.max(value, min));
}

function generateX(width) {
  const halfW = width / 2;
  const lineA = `
    <line 
      x1="${-halfW}"
      y1="${-halfW}"
      x2="${halfW}"
      y2="${halfW}"
    />
  `;

  const lineB = `
    <line 
      x1="${-halfW}"
      y1="${halfW}"
      x2="${halfW}"
      y2="${-halfW}"
    />
  `;

  return `<g class="x">${lineA} ${lineB}</g>`;
}

class MecanumDrivebase extends Webbit {

  static get dashboardConfig() {
    return {
      displayName: 'Mecanum Drivebase',
      category: 'Robot & Field Info',
      description: 'Component used to display wheel speeds and robot trajectory information for differential drivebases.',
      documentationLink: 'https://frc-web-components.github.io/components/mecanum-drivebase/',
      slots: [],
      minSize: { width: 220, height: 180 },
    };
  }

  static get styles() {
    return [
      containerStyles,
      css`
        :host {
          width: 400px;
          height: 300px;
          padding: 0 10px;
        }

        .diff-drive-container {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }

        svg {
          overflow: overlay;
          flex: 1;
          height: 100%;
        }

        svg .x {
            stroke: rgb(50,50,255);
            stroke-width: 2;
        }

        svg .arrow line, svg .arrow path {
            stroke: rgb(50,50,255);
            stroke-width: 2;
            fill: none;
        }

        svg .arrow polygon {
            stroke: rgb(50,50,255);
            fill: rgb(50,50,255);
        }

        svg .drivetrain {
            fill: none;
            stroke: black;
        }

        .bar {
            position: relative;
            height: calc(100% - 30px);
            width: 20px;
            border-radius: 3px;
            margin: 15px 0;
            background: #DDD;
        }

        .speed-pair {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }

        .speed {
            display: flex;
            height: 48%;
            flex-direction: row;
            align-items: center;
            margin-left: 30px;
        }

        table-axis {
            width: 10px;
            height: calc(100% - 35px);
        }

        .foreground {
            position: absolute;
            top: 0;
            width: 20px;
            background: lightblue;
            border-radius: 3px;
        }
      `
    ];
  }

  static get properties() {
    return {
      ...super.properties,
      frontLeftMotorSpeed: { 
        type: Number, 
        attribute: 'fl-motor-speed',
        get() {
          return clamp(this._frontLeftMotorSpeed, -1, 1);
        } 
      },
      frontRightMotorSpeed: { 
        type: Number, 
        attribute: 'fr-motor-speed',
        get() {
          return clamp(this._frontRightMotorSpeed, -1, 1);
        } 
      },
      rearLeftMotorSpeed: { 
        type: Number, 
        attribute: 'rl-motor-speed',
        get() {
          return clamp(this._rearLeftMotorSpeed, -1, 1);
        } 
      },
      rearRightMotorSpeed: { 
        type: Number, 
        attribute: 'rr-motor-speed',
        get() {
          return clamp(this._rearRightMotorSpeed, -1, 1);
        } 
      }
    };
  }

  constructor() {
    super();
    this.frontLeftMotorSpeed = 0;
    this.frontRightMotorSpeed = 0;
    this.rearLeftMotorSpeed = 0;
    this.rearRightMotorSpeed = 0;
  }

  drawMotionVector(fl, fr, rl, rr) {

    const svgNode = this.shadowRoot.getElementById('svg');
    const rect = svgNode.getBoundingClientRect();

    const wheelWidth = rect.width * .13;
    const padding = 20;
    const verticalPadding = 20;

    const FRAME_WIDTH = rect.width - (wheelWidth + padding) * 2;
    const FRAME_HEIGHT = rect.height - verticalPadding * 2;

    const vectorRadius = Math.min(FRAME_WIDTH, FRAME_HEIGHT) / 2 - 16;
    const direction = {
        x: (fl - fr - rl + rr) / 4,
        y: (fl + fr + rl + rr) / 4
    };
    const moment = (-fl + fr - rl + rr) / 4;
    const directionMagnitude = Math.hypot(direction.x, direction.y);
    const directionAngle = Math.atan2(direction.y, direction.x);

    // Barely moving, draw an X
    if (Math.abs(moment) <= 0.01 && directionMagnitude <= 0.01) {
      return generateX(rect.width * .2);
    }

    let rightMomentArrow = '';
    let leftMomentArrow = '';
    let directionArrow = '';

    if (Math.abs(moment) > 0.01) {
      // Only draw the moment vectors if the moment is significant enough
      rightMomentArrow = CurvedArrow.createPolar(0, vectorRadius, -moment * Math.PI, 0, 8);
      leftMomentArrow = CurvedArrow.createPolar(Math.PI, vectorRadius, -moment * Math.PI, 0, 8);
    }
    if (directionMagnitude > 0.01) {
        // Only draw the direction vector if it'd be long enough
        directionArrow = CurvedArrow.createStraight(directionMagnitude * vectorRadius, -directionAngle, 0, 8);
    }

    return `<g class="arrow">${rightMomentArrow} ${leftMomentArrow} ${directionArrow}</g>`;
  }

  drawDrivetrain() {

    const svgNode = this.shadowRoot.getElementById('svg');
    const rect = svgNode.getBoundingClientRect();

    const wheelWidth = rect.width * .13;
    const wheelRadius = Math.min(rect.width * .13, rect.height * .15);
    const padding = 20;
    const verticalPadding = 20;
    
    const base = `
      <rect 
        width="calc(100% - ${(wheelWidth + padding) * 2}px)" 
        height="calc(100% - ${verticalPadding * 2}px)"
        x="${wheelWidth + padding}" 
        y="20px" 
      />
    `;

    const tlWheel = `
      <rect 
        width="${wheelWidth}px" 
        height="${wheelRadius * 2}" 
        x="${padding}px" 
        y="${verticalPadding}px" 
      />
    `;

    const trWheel = `
      <rect 
        width="${wheelWidth}px" 
        height="${wheelRadius * 2}" 
        x="calc(100% - ${wheelWidth + padding}px)" 
        y="${verticalPadding}px" 
      />
    `;

    const blWheel = `
      <rect 
        width="${wheelWidth}px" 
        height="${wheelRadius * 2}" 
        x="${padding}px"
        y="calc(100% - ${wheelRadius * 2 + verticalPadding}px)"
      />
    `;

    const brWheel = `
      <rect 
        width="${wheelWidth}px" 
        height="${wheelRadius * 2}" 
        x="calc(100% - ${wheelWidth + padding}px)" 
        y="calc(100% - ${wheelRadius * 2 + verticalPadding}px)"
      />
    `;

    return base + tlWheel + trWheel + blWheel + brWheel;
  }

  getFlForegroundStyle(){
    return this.getForegroundStyle(this.frontLeftMotorSpeed);
  };

  getFrForegroundStyle() {
      return this.getForegroundStyle(this.frontRightMotorSpeed);
  };

  getRlForegroundStyle() {
      return this.getForegroundStyle(this.rearLeftMotorSpeed);
  };

  getRrForegroundStyle() {
      return this.getForegroundStyle(this.rearRightMotorSpeed);
  };

  getForegroundStyle(value) {
    const min = -1;
    const max = 1;
    const val = clamp(value, min, max);

    if (val > 0) {
      return `
        height: ${Math.abs(val) / (max - min) * 100}%;
        top: auto;
        bottom: 50%;
      `;
    }
    else {
      return `
        height: ${Math.abs(val) / (max - min) * 100}%;
        top: 50%;
        bottom: auto;
      `;
    }
  }

  firstUpdated() {
    super.firstUpdated();
    let drawing = this.drawMotionVector(0, 0, 0, 0);
    this.shadowRoot.getElementById('drivetrain').innerHTML = this.drawDrivetrain();
    this.shadowRoot.getElementById('forceVector').innerHTML = drawing;
  }

  resized() {
    let drawing = this.drawMotionVector(
      this.frontLeftMotorSpeed, 
      this.frontRightMotorSpeed,
      this.rearLeftMotorSpeed,
      this.rearRightMotorSpeed
    );
    this.shadowRoot.getElementById('forceVector').innerHTML = drawing;
    const svgNode = this.shadowRoot.getElementById('svg');
    const rect = svgNode.getBoundingClientRect();
    this.shadowRoot.getElementById('forceVector').style.transform = `translate(${rect.width * .5}px, ${rect.height * .5}px)`;
    this.shadowRoot.getElementById('drivetrain').innerHTML = this.drawDrivetrain();
  }

  updated(changedProps) {
    super.updated(changedProps);
    let drawing = this.drawMotionVector(
      this.frontLeftMotorSpeed, 
      this.frontRightMotorSpeed,
      this.rearLeftMotorSpeed,
      this.rearRightMotorSpeed
    );
    this.shadowRoot.getElementById('forceVector').innerHTML = drawing;
  }

  render() {
    return html`
      <div class="diff-drive-container">
        <div class="speed-pair">
          <div class="speed">
            <table-axis ticks="5" vertical .range="${[1, -1]}"></table-axis>
            <div class="bar">
              <div class="foreground" style="${this.getFlForegroundStyle()}"></div>
            </div>
          </div>
          <div class="speed">
            <table-axis ticks="5" vertical .range="${[1, -1]}"></table-axis>
            <div class="bar">
                <div class="foreground" style="${this.getRlForegroundStyle()}"></div>
            </div>
          </div>
        </div>
        <svg id="svg">
          <g id="forceVector"></g>
          <g id="drivetrain" class="drivetrain"></g>
        </svg>
        <div class="speed-pair">
          <div class="speed">
            <table-axis ticks="5" vertical .range="${[1, -1]}"></table-axis>
            <div class="bar">
              <div class="foreground" style="${this.getFrForegroundStyle()}"></div>
            </div>
          </div>
          <div class="speed">
            <table-axis ticks="5" vertical .range="${[1, -1]}"></table-axis>
            <div class="bar">
              <div class="foreground" style="${this.getRrForegroundStyle()}"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

webbitRegistry.define('frc-mecanum-drivebase', MecanumDrivebase);