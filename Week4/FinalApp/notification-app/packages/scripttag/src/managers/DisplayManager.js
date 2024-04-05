import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
    this.currentURL = '';
  }
  async initialize({notifications, settings, currentURL}) {
    this.notifications = notifications;
    this.settings = settings;
    this.currentURL = currentURL;
    this.insertContainer();
    // Your display logic here
    if (settings.allowShow === 'all') {
      if (settings.includedUrls.some(item => item === currentURL)) {
        await this.display({notifications: notifications, setting: settings});
      }
    }
    if (settings.allowShow === 'specific') {
      if (!settings.excludedUrls.some(item => item === currentURL)) {
        await this.display({notifications: notifications, setting: settings});
      }
    }
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    container.innerHTML = '';
  }

  remove() {
    const container = document.querySelector('#Avada-SalePop');
    render(null, container);
  }

  delay = ms => new Promise(res => setTimeout(res, ms));

  async display({notifications, setting}) {
    // # Wait for inital delay
    // # For each notifications
    // # Display
    // # Delay duration
    // # Fade out
    // # Delay gap time
    const container = document.querySelector('#Avada-SalePop');
    let displayedCount = 0;
    await this.delay(setting.firstDelay * 1000);
    for (const item of notifications) {
      if (displayedCount >= setting.maxPopsDisplay) {
        break;
      }
      render(<NotificationPopup {...item} setting={setting} onClose={this.remove} />, container);
      await this.delay(setting.displayDuration * 1000);
      this.fadeOut();
      await this.delay(setting.popsInterval * 1000);
      this.remove();
      displayedCount++;
    }
  }

  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = `Avada-SalePop`;
    popupEl.classList.add('Avada-SalePop__OuterWrapper');
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }
    return popupEl;
  }
}
