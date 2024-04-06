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
    if (this.shouldShow({setting: settings, currentURL})) {
      await this.display({notifications: notifications, setting: settings});
    }
  }

  shouldShow({setting, currentURL}) {
    if (setting.allowShow === 'all') {
      if (!setting.includedUrls.some(item => item === currentURL)) {
        return false;
      }
    }
    if (setting.allowShow === 'specific') {
      if (setting.excludedUrls.some(item => item === currentURL)) {
        return false;
      }
    }
    return true;
  }

  fadeInUp() {
    const container = document.querySelector('.Avava-SP__Wrapper');
    container.classList.add('fadeInUp');
  }

  fadeOut() {
    const container = document.querySelector('.Avava-SP__Wrapper');
    container.classList.add('fadeOut');
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
    await this.delay(setting.firstDelay * 1000);
    const toDisplayNotis = notifications.slice(0, setting.maxPopsDisplay);
    for (const item of toDisplayNotis) {
      render(<NotificationPopup {...item} setting={setting} onClose={this.remove} />, container);
      this.fadeInUp();
      await this.delay(setting.displayDuration * 1000);
      this.fadeOut();
      await this.delay(setting.popsInterval * 1000);
      this.remove();
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
