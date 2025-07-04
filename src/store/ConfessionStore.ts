import { makeAutoObservable, runInAction } from 'mobx';
import { clearPersistedStore, makePersistable } from 'mobx-persist-store';
import { sinElements } from 'screens/confession-room/sin-mocks/index';
import { IRootStore } from './index';

class ConfessionsStore {
  private _rootStore: IRootStore;

  confessionProgress: Record<string, ConfessionProgress> = {};

  constructor(rootStore: IRootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);

    makePersistable(this, {
      name: 'ConfessionsStore',
      properties: ['confessionProgress'],
    }).then(async () => {
      console.log('ConfessionsStore recovered');
    });

    console.log('ConfessionsStore store constructor');
  }

  getConfessionProgress(machineName: string): ConfessionProgress | undefined {
    const confessionProgress = this.confessionProgress[machineName];

    return confessionProgress;
  }

  getCompletedTasks() {
    return Object.values(this.confessionProgress).reduce((prev, cur) => {
      return prev + cur.completedTasks;
    }, 0);
  }

  getTotalTasks() {
    return Object.values(this.confessionProgress).reduce((prev, cur) => {
      return prev + cur.totalTasks;
    }, 0);
  }

  getActiveConfessions() {
    return Object.entries(this.confessionProgress);
  }

  startConfessionRedemption(confession: { machineName: string }) {
    if (this.confessionProgress[confession.machineName]) {
      throw new Error('Confession progress already exists');
    }

    const sinElement = sinElements.find(
      x => x.machineName === confession.machineName,
    );

    if (!sinElement) {
      throw new Error('Sin element not found');
    }

    const progress: ConfessionProgress = {
      completedTasks: 0,
      totalTasks: sinElement.confessionTasks.length,
      machineName: confession.machineName,
      tasks: sinElement.confessionTasks.map(task => {
        let secondsLeft: number | null = null;
        if (
          task.taskType === 'reading-the-bible' ||
          task.taskType === 'practice-of-silence'
        ) {
          secondsLeft = task.payload.testDurationInSeconds;
        }
        return {
          isCompleted: false,
          secondsLeft,
          key: task.payload.key,
        };
      }),
    };

    runInAction(() => {
      this.confessionProgress[confession.machineName] = progress;
    });
  }

  saveSecondsLeft(data: {
    secondsLeft: number;
    machineName: string;
    taskKey: string;
  }) {
    const { secondsLeft, machineName, taskKey } = data;

    const taskProgress = this.confessionProgress[machineName].tasks.find(
      x => x.key === taskKey,
    );

    if (!taskProgress) {
      return;
    }

    runInAction(() => {
      taskProgress.secondsLeft = secondsLeft;
    });
  }

  updateConfessionProgress(data: { machineName: string; taskKey: string }) {
    const confessionProgress = this.confessionProgress[data.machineName];

    if (!confessionProgress) {
      throw new Error('Confession progress not found');
    }

    const task = confessionProgress.tasks.find(x => x.key === data.taskKey);

    if (!task) {
      throw new Error('Task not found');
    }

    task.isCompleted = true;
    confessionProgress.completedTasks += 1;

    if (confessionProgress.tasks.every(t => t.isCompleted)) {
      runInAction(() => {
        delete this.confessionProgress[data.machineName];
      });

      return {
        isFinal: true,
      };
    } else {
      runInAction(() => {
        this.confessionProgress[data.machineName] = confessionProgress;
      });

      return {
        isFinal: false,
      };
    }
  }

  clear() {
    clearPersistedStore(this);
    runInAction(() => {
      this.confessionProgress = {};
    });
  }
}

export default ConfessionsStore;
