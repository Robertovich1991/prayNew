import { action, makeObservable, observable, runInAction } from 'mobx';
import Spinner from 'components/Spinner';
import React, { lazy } from 'react';
import { generateUuid } from 'helpers/utils';

class ModalStore {
  modals: { modal: JSX.Element; uid: string }[] = []; // Не обозреваема переменная для производительности
  spinner: {
    isShow: boolean;
    message?: string;
    timeout?: number;
  } = {
    isShow: false,
  };
  changes: number = 0;

  constructor() {
    makeObservable(this, {
      spinner: observable,
      changes: observable,
      open: action,
      close: action,
    });
  }

  open(modal: JSX.Element) {
    const uid = generateUuid();
    this.modals = [...this.modals, { modal, uid }];
    runInAction(() => {
      this.changes++;
    });
  }

  close(uid?: string) {
    if (uid) {
      this.modals = [...this.modals.filter(x => x.uid !== uid)];
    } else {
      this.modals = [...this.modals.slice(0, this.modals.length - 2)];
    }
    runInAction(() => {
      this.changes++;
    });
  }

  showSpinner(reason: string) {
    this.modals = [...this.modals, { modal: <Spinner />, uid: reason }];
    runInAction(() => {
      this.changes++;
    });
  }

  clearSpinner(reason: string) {
    this.modals = [...this.modals.filter(modal => modal.uid != reason)];
    runInAction(() => {
      this.changes++;
    });
  }
}

export default ModalStore;
