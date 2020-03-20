class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;

  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;

  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let currentVampire = this;
    let generation = 0;

    while (currentVampire.creator) {
      generation++;
      currentVampire = currentVampire.creator;
    }

    return generation;

  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;

  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let currentVampire = this;
    let comparingVampire = vampire;

    while (currentVampire.isMoreSeniorThan(comparingVampire)) {
      comparingVampire = comparingVampire.creator;
      if (currentVampire === comparingVampire) {
        return currentVampire;
      }
    }

    while (comparingVampire.isMoreSeniorThan(currentVampire)) {
      currentVampire = currentVampire.creator;
      if (comparingVampire === currentVampire) {
        return comparingVampire;
      }
    }

    while (currentVampire !== comparingVampire) {
      comparingVampire = comparingVampire.creator;
      currentVampire = currentVampire.creator;
      if (currentVampire === comparingVampire) {
        return currentVampire;
      }

    }

    return currentVampire;
  }
}

module.exports = Vampire;

