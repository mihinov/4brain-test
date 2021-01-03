class Quiz {
  constructor(options) {
    console.log(options.nameForm);
    this.formDOM = document.querySelector(`#${options.nameForm}`);
    const radioS = Array.from(this.formDOM?.querySelectorAll(`[name=${options.nameInputRadio}]`));
    this.radioS = this.cloneRadios(radioS);
    this.deleteRadios(radioS);
  }

  cloneRadios(radiosDom) {
    return radiosDom.map(item => {
      const newItem = item.cloneNode(true);
      return item.cloneNode(true);
    })
  }

  deleteRadios(radiosDom) {
    for (let i = radiosDom.length - 1; i > -1; i--) {
      radiosDom[i].remove();
      radiosDom.splice(i, 1);
    }
  }

  createFields(radiosDom) {
    
  }
}

const newQuiz = new Quiz({
  nameForm: 'whoAreYouForm',
  nameInputRadio: 'whoAreYou'
});