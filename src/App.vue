<template>
  <div class="main__flex-container">
    <div class="flex__list">
        <ul v-for="list in lists" :id="`ul_${list.id}`"> 
          <div class="checkbox-flex">
            <div class="list__image" :class="chosenList === list.id ? 'open' : '' " @click="chooseList(list.id)"></div>
            <div :id="`list__checkbox${list.id}`" class="my-checkbox" :class="list.checked ? 'dot' : 'none'" @click="checkList(list.id)"></div>
            <p class="list__text"> list {{ list.id }}</p>
          </div>
          <li v-for="elem in list.elements" :hidden="chosenList !== list.id" :id="`ul_${list.id}_li_${elem.id}`">
            <div class="item__flex-container">
              <span class="item__elements">
                <input :id="`list${list.id}_elem${elem.id}`" type="checkbox" :checked="elem.checked" @click="elem.checked = !elem.checked"/> 
                <label :for="`list${list.id}_elem${elem.id}`">item {{ elem.id }}</label>
              </span>
              <span class="item__elements">
                <span class="options__flex-container">
                  <input class="input__number" :id="`number_list${list.id}_elem${elem.id}`" min="0" max="99" type="number" @change="elem.number=+$event.target.value" :value="elem.number"/>
                  <input class="item__square" :id="`color_list${list.id}_elem${elem.id}`" type="color" :style="`border: 0px solid ${elem.color};`" :value="elem.color" @change="elem.color=$event.target.value"/>
                </span>
              </span>
            </div>
          </li>
        </ul>
    </div>
    <div class="flex__list">
      <div v-for="list in lists" class="list__elements">
        <div class="list__flex-container">
          <div class="list__title">
            <div class="title__flex">
              <p class="list__text">list {{ list.id }}</p>
              <button v-if="chosenList === list.id" class="list__button" @click="sorted = !sorted"> {{ sorted !== true ? 'Сортировать' :  'Перемешать'}}</button>
            </div>
          </div>
          <div class="list__body" v-if="chosenList === list.id">
            <div v-if="sorted">
               <div class="body__flex">
                  <div v-for="elem in list.elements" :key="elem.id" class="color-line">
                    <div v-if="elem.checked" class="color__flex-container">
                      <div class="item__square" v-for="i in elem.number" :key="i" :style="`background-color: ${elem.color}`" @click="--elem.number">
                      </div>
                    </div>
                  </div>
               </div> 
            </div>
            <div v-else>
              <div class="color-line">
                <div class="color__flex-container">
                  <div class="item__square" v-for="elem in unsorted"  :style="`background-color: ${elem}`" @click="deleteItem(elem)"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        chosenList: 0, // Переменная, фиксирующая, какой из list мы спортим
        sorted: false, // Переменная, фиксирующая, отсортировано ли состояние
        lists: [
          {
            id: 1,
            checked: false,
            elements: [
              {
                id: 1,
                number: 20, 
                checked: false,
                color: '#FF0000'
              },
              {
                id: 2,
                number: 2,
                checked: false,
                color: '#008000'
              },
              {
                id: 3,
                number: 6,
                checked: false,
                color: '#FFFF00'
              },
              {
                id: 4,
                number: 9,
                checked: false,
                color: '#0000FF'
              }
            ]
          },
          {
            id: 2, 
            checked: false,
            elements: [
              {
                id: 1,
                number: 5,
                checked: false,
                color: '#FF0000'
              },
              {
                id: 2,
                number: 8,
                checked: false,
                color: '#008000'
              },
              {
                id: 3,
                number: 3,
                checked: false,
                color: '#FFFF00'
              },
              {
                id: 4,
                number: 6,
                checked: false,
                color: '#0000FF'
              }
            ]
          },
          {
            id: 3,             
            checked: false,
            elements: [
              {
                id: 1,
                number: 7,
                checked: false,
                color: '#FF0000'
              },
              {
                id: 2,
                number: 4,
                checked: false,
                color: '#008000'
              },
              {
                id: 3,
                number: 2,
                checked: false,
                color: '#FFFF00'
              },
              {
                id: 4,
                number: 1,
                checked: false,
                color: '#0000FF'
              }
            ]
          },
          {
            id: 4,            
            checked: false,
            elements: [
              {
                id: 1,
                number: 6,
                checked: false,
                color: '#FF0000'
              },
              {
                id: 2,
                number: 6,
                checked: false,
                color: '#008000'
              },
              {
                id: 3,
                number: 3,
                checked: false,
                color: '#FFFF00'
              },
              {
                id: 4,
                number: 9,
                checked: false,
                color: '#0000FF'
              }
            ]
          },
          {
            id: 5, 
            checked: false,
            elements: [
              {
                id: 1,
                number: 2,
                checked: false,
                color: '#FF0000'
              },
              {
                id: 2,
                number: 7,
                checked: false,
                color: '#008000'
              },
              {
                id: 3,
                number: 10,
                checked: false,
                color: '#FFFF00'
              },
              {
                id: 4,
                number: 5,
                checked: false,
                color: '#0000FF'
              }
            ]
          }
        ] // Массив list'ов с item'ами, можно перенести его во vuex, если, например, его нужно на разных страницах использовать (поставил ограничение на количество квадратиков (максимум 99, можно поставить больше; минимум 0))
      }
    },
    methods: {
      chooseList(id) {
        if (this.chosenList !== id) { // Если кликаем по другой вкладке списка list, которая еще не выбрана
          if (this.chosenList != 0 && this.lists[this.chosenList-1].checked === true) { // Если закрываем list, который был с точкой - убираем точку (обязательно проверяем, чтобы был выбран какой-то из list)
            this.checkList(this.chosenList);
          }
          this.chosenList = id; 
        } else { // Кликаем по той же вкладке -> закроем ее
          this.chosenList = 0;
        }
        this.sorted = false; // По умолчанию у нас всегда первым показывается неотсортированный список квадратиков
      },
      checkList(id) { // Кликаем по чекбоксу list
        if (id !== this.chosenList) { // Если кликаем по чекбоксу, который не открыт, то не делаем выбор/снятие выбора с элементов
          return;
        }
        let flag = 0;
        const maxFlag = this.lists[id-1].elements.length;
        for (let i = 0; i < this.lists[id-1].elements.length; i++) { 
          if (this.lists[id-1].elements[i].checked === true) { // Посчитаем, сколько флажков item'ов выделено
            ++flag;
          }
        }
        if (this.lists[id-1].checked === true) { // Если чекбокс был точкой - убираем точку
          this.lists[id-1].checked = false;
        } else {
          if (flag === 0) { // Ничего из item не выделено
              for (let i = 0; i < this.lists[id-1].elements.length; i++) {
                this.lists[id-1].elements[i].checked = true;
              }
          } else if (flag === maxFlag) { // Выделены все item
              for (let i = 0; i < this.lists[id-1].elements.length; i++) {
                this.lists[id-1].elements[i].checked = false;
              }
          } else {
            if (this.lists[id-1].checked === false) { // Выделены не все
              this.lists[id-1].checked = true;
            } 
          }
        }
      },
      deleteItem(color) {
        for (let i = 0; i < this.lists[this.chosenList-1].elements.length; i++) {
          if (this.lists[this.chosenList-1].elements[i].color === color) {
            return --this.lists[this.chosenList-1].elements[i].number;
          }
        }
      }
    },
    computed: {
      unsorted() {
        if (this.chosenList !== 0) {
          const colors = [];
          for (let i = 0; i < this.lists[this.chosenList-1].elements.length; i++) {
            if (this.lists[this.chosenList-1].elements[i].checked === true) {
              const arr = Array(this.lists[this.chosenList-1].elements[i].number).fill(this.lists[this.chosenList-1].elements[i].color);
              colors.push(...arr);
            }
          }
          colors.sort(() => Math.random() - 0.5);
          return colors;
        }
      }

    }   
  }
</script>

<style>
  .main__flex-container { 
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  .flex__list {
    border: 2px solid black;
    width: 30%;
  }

  ul {
    list-style-type: none;
  }

  .checkbox-flex {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
  }

  .list__image {
    background-image: url('@/img/list.png');
    background-size: cover;
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-right: 5px;
  }
  .open {
    transform: rotate(90deg);
  }

  .list__text {
    margin-left: 5px;
  }
  .list__button {
    border-radius: 5px;
    border: 2px solid rgb(34, 140, 240);
    background: transparent;
    color: #fff;
    background: rgb(34, 140, 240);
  }
  .list__button:hover {
    opacity: 0.7;
  }
  .list__button:active{
    opacity: 1;
  }

  .my-checkbox {
    width: 20px;
    height: 20px;
    margin: 2px;
  }
  .none {
    background-image: url('@/img/nonchecked.png');
    background-size: cover;
  }
  .dot {
    background-image: url('@/img/checked-dot.png');
    background-size: cover;
  }

  .item__flex-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1vh 4vw 1vh 2vw;
  }
  .item__elements {
    width: 30%;
  }

  .options__flex-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .input__number {
    width: 50%;
  }
  .item__square {
    width: 15px;
    height: 15px;
    margin: 2px 2px;
  }

  input[type="color"] {
    padding: 0;
  }
  input[type="color" i]::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  .list__elements {
    margin: 2vh 2vw;
    border: 1px solid black;
    height: auto;
  }
  .list__flex-container {
    display: flex;
    flex-direction: column;
  }
  .list__title {
    margin: 2px;
  }
  .list__body {
    margin: 2px;
  }
  .title__flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .body__flex {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .color-line {
    width: 100%;
    height: 100%;
    margin-bottom: 5px;
  }
  .color__flex-container {
    display: flex;
    flex-direction: row;
    justify-content: start;
    flex-wrap: wrap;
  }

</style>
