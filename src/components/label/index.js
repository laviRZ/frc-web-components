import { html } from '@webbitjs/webbit';
import Container from '../container';

class Label extends Container {

  static get metadata() {
    return {
      displayName: 'Label',
      category: 'General',
      //description: 'Component for displaying data from a 3-axis accelerometer.',
      documentationLink: 'https://frc-web-components.github.io/components/label/'
    };
  }

  static get styles() {
    return [
      super.styles,
    ]
  }

  static get properties() {
    return {
      ...super.properties,
      text: { type: String, primary: true },
    };
  }

  constructor() {
    super();
    this.display = 'inline';
    this.text = '';
    this.fontSize = 'inherit';
    this.fontFamily = 'inherit';
    this.fontWeight = 'inherit';
    this.textAlign = 'inherit';
    this.margin = '0';
    this.padding = '0';
  }

  render() {
    return html`${this.text}`;
  }
}

webbitRegistry.define('frc-label', Label);