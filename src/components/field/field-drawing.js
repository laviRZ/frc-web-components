import { Webbit, html, svg, css } from '@webbitjs/webbit';

class FieldDrawing extends Webbit {

  static get properties() {
    return {
      draw: { 
        type: Function,
        converter: (value) => {
          return new Function(value);
        }
      },
      unit: { type: String }
    };
  }

  constructor() {
    super();
    this.draw = () => {};
    this.unit = '';
  }

  renderDrawing(args) {
    this.draw.bind(args)();
  }
}

webbitRegistry.define('frc-field-drawing', FieldDrawing);