'use strict';

const {
  Neuron,
  Layer,
  Network,
  Trainer,
  Architect
} = require('synaptic');
const mnist = require('mnist');


let instance;

class NumberClassifier {
  constructor(trainedBrain) {
    if (!instance) {
      instance = this;
      if (trainedBrain) {
        this.network = Network.fromJSON(trainedBrain);
      } else {
        this.network = new Architect.Perceptron(28 * 28, 16, 10);
      }
      this.trainer = new Trainer(this.network);
    }

    return instance;
  }

  generateSet(trainLength) {
    return mnist.set(trainLength);
  }

  trainWithSet(set, options = {}) {
    return this.trainer.train(set, options);
  }

  predict(input) {
    const output = this.network.activate(input);
    const max = output.reduce((max, activation) => Math.max(max, activation), 0);
    return {
      output,
      guess: output.indexOf(max)
    };
  }

  getTrainedNetwork() {
    return this.network.toJSON();
  }
}

module.exports = NumberClassifier;
