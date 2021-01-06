class Quiz {
  constructor(options) {
    this.formDOM = document.querySelector(`#${options.nameForm}`);
    const radioS = Array.from(this.formDOM?.querySelectorAll(`[name=${options.nameInputRadio}]`));
    this.radioS = this.cloneRadios(radioS);
    this.deleteRadios(radioS);
    this.fieldsRadio = this.createFieldsRadio(this.formDOM, this.radioS);
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

  createFieldsRadio(formDOM, radiosDom) {
    const arrFields = [];
    let clickCounter = 0;

    const mouseOverFieldRadio = (e) => {
      const fieldRadio = e.target.offsetParent;
      fieldRadio.classList.add('hover');
    }

    const mouseOutFieldRadio = (e) => {
      const fieldRadio = e.target.offsetParent;
      fieldRadio.classList.remove('hover');
    }

    for (let i = 0; i < radiosDom.length; i++) {
      const fieldRadio = document.createElement('div');
      const value = radiosDom[i].value;

      fieldRadio.classList.add('fieldRadio');
      fieldRadio.innerHTML = `
        <div class="fieldRadio__text">${value}</div>
        <div class="fieldRadio__voting"></div>
        <div class="fieldRadio__statistics"></div>
      `;
      fieldRadio.setAttribute('data-obj', value);
      fieldRadio.addEventListener('click', (e) => {
        clickCounter++;
        if (clickCounter === 1) {
          fieldRadio.classList.remove('hover');
          // fieldRadio.classList.add('active');
          arrFields.forEach(item => {
            item.removeEventListener('mouseover', mouseOverFieldRadio);
            item.removeEventListener('mouseout', mouseOutFieldRadio);
          });
          this.getStatistics().then((statistics) => {
            statistics[value] = statistics[value] + 1;
            this.statistics = Object.assign({}, statistics);
            const sum = Object.keys(statistics).reduce((sum, current) => statistics[current] + sum, 0);
            arrFields.forEach((item, i) => {
              item.classList.add('active');
              const itemValue = item.getAttribute('data-obj');
              const percent = Math.round((statistics[itemValue] / sum) * 100);
              item.querySelector('.fieldRadio__statistics').innerHTML = `${statistics[itemValue]} чел, ${percent} %`;
            });
            fieldRadio.classList.add('click');
          });
        }
      });

      fieldRadio.addEventListener('mouseover', mouseOverFieldRadio);
      fieldRadio.addEventListener('mouseout', mouseOutFieldRadio);
      arrFields.push(fieldRadio);
      formDOM.append(fieldRadio);
    }
    return arrFields.slice();
  }

  getStatistics() { // тут получение данных из бд
    return new Promise((res, rej) => {
      try {
        res({
            "Интроверт": 3,
            "Экстраверт": 4,
            "Не знаю": 20
        });
      } catch (e) {
        rej(e);
      }
    });
  }
}

const newQuiz = new Quiz({
  nameForm: 'whoAreYouForm',
  nameInputRadio: 'whoAreYou'
});

const selectElems = document.querySelectorAll('select');
const instances = M.FormSelect.init(selectElems, {});