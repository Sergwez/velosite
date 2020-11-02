<template>
  <v-sheet>
    <v-container class="my-5">
      <v-card-title>
        Интернет-магазин VELOSITE это:
      </v-card-title>
      <v-row>
        <v-col
        cols="12"
        xl="3"
        lg="6"
        md="6"
        sm="6"
        xs="12"
        >
          <v-card  >
            <v-card-title>
              Большой ассортимент
            </v-card-title>
            <v-sheet min-height="140">
              <v-card-text>
                Более 900 велосипедов от более чем 40 производителей. А наши ценовые решения удовлетворят, как любителей, так и профессионалов
              </v-card-text>
            </v-sheet>
            <v-row
            justify="end"
            class="ma-0 pa-0">
              <v-btn
              color="primary"
              class="mb-4
              mr-2">
                <router-link
                color="white"
                to="/catalog"
                tag="span"
                style="cursor:pointer" >
                  Перейти в каталог
                </router-link>
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
        <v-col
        cols="12"
        xl="3"
        lg="6"
        md="6"
        sm="6"
        xs="12"
        >
          <v-card>
            <v-card-title>
              Бесплатная доставка
            </v-card-title>
            <v-sheet min-height="140">
              <v-card-text>
                Закажите на сумму от 3 000 рублей и мы доставим Ваш велосипед бесплатно!
              </v-card-text>
            </v-sheet>
            <v-row
            justify="end"
            class="ma-0 pa-0">
              <v-btn
              color="primary"
              class="mb-4 mr-2">
                <router-link
                color="white"
                to="/delivery"
                tag="span"
                style="cursor:pointer" >
                  Подробнее о доставке
                </router-link>
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
        <v-col
        cols="12"
        xl="3"
        lg="6"
        md="6"
        sm="6"
        xs="12"
        >
          <v-card>
            <v-card-title>
              Скидки каждую неделю
            </v-card-title>
            <v-sheet min-height="140">
              <v-card-text>
                Каждую неделю мы делаем скидки на несколько велосипедов, полный список вы можете посмотреть перейдя по ссылке ниже
              </v-card-text>
            </v-sheet>
            <v-row
            justify="end"
            class="ma-0 pa-0">
              <v-btn
              color="primary"
              class="mb-4 mr-2">
                <router-link
                color="white"
                to="/catalog?discount=true"
                tag="span"
                style="cursor:pointer" >
                  Товары со скидкой
                </router-link>
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
        <v-col
        cols="12"
        xl="3"
        lg="6"
        md="6"
        sm="6"
        xs="12"
        >
          <v-card>
            <v-card-title>
              Помощь в подборе
            </v-card-title>
            <v-sheet min-height="140">
              <v-card-text>
                Не знаете какую модель велосипеда приобрести? Мы поможем Вам! Просто закажите бесплатную консультацию
              </v-card-text>
            </v-sheet>
            <v-row
            justify="end"
            class="ma-0 pa-0"
            >
              <v-btn
              color="primary"
              class="mb-4 mr-2"
              v-on:click="consultation = !consultation">
                Заказ консультации
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
    v-model="consultation"
    width="500"
    >
      <v-card>
        <v-card-title class="headline primary white--text">
          Заказ консультации
        </v-card-title>
        <v-card-text class="py-6">
          Для бесплатной консультации заполните поля ниже
        </v-card-text>
        <v-form
        v-model="valid"
        ref="form"
        lazy-validation>
          <v-text-field
          class="px-5 py-3"
          v-on:input="sendForm=false"
          v-model="name"
          :rules="nameRules"
          label="Ваше имя"
          required>
          </v-text-field>
          <v-text-field
          class="px-5 py-3"
          v-on:input="sendForm=false"
          v-model="phone"
          v-on:click="phone == '' ? phone = '+7' : phone == phone"
          :rules="phoneRules"
          label="Ваш телефон"
          required
          >
          </v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
            v-if="sendForm==false"
            class="mt-10 pa-5"
            color="primary"
            large
            v-on:click="validate()"
            >
              Заказать консультацию
            </v-btn>
            <v-btn
            v-else
            class="mt-10 pa-5"
            color="success"
            large ><v-icon
            >mdi-check</v-icon>
              Отправлено
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>
<script>
export default {
  data(){
    return{
      consultation:false,
      valid:false,
      sendForm:false,
      name:'',
      phone:'',
      phoneRules: [
        v => !!v || 'Поле "Телефон" не должно быть пустым',
        v => /^(\+7)/.test(v) || 'Поле "Телефон" должно начинаться с "+7"',
        v => /^(\+7)([\D]*[0-9]{1}[\D]*){10}$/.test(v) || 'Поле "Телефон" должно содержать 11 цифр',
        v => /^(\+7)([^A-Fa-f]*[0-9]{1}[^A-Fa-f]*)$/.test(v) || 'Поле "Телефон" не должно содержать буквы',
      ],
      nameRules: [
        v => !!v || 'Поле "Имя" не должно быть пустым',
        v => /^[a-z, а-яё, A-Z, А-ЯЁ]+$/.test(v) || 'Поле "Имя" может содержать только буквы',
      ],
    }
  },
  methods:{
    validate () {
      if(this.$refs.form.validate()){
        this.sendForm=true
      }
    },
  },
}
</script>
