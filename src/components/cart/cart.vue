<template >
    <v-sheet>
      <v-row class="mx-6">
        <v-col cols="12"
        xl="6"
        lg="6"
        md="12"
        sm="12"
        xs="12"
        v-if="USER_CART.length>0">
          <v-card class="ma-3" >
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Название товара
                    </th>
                    <th class="text-left">
                      Количество
                    </th>
                    <th class="text-left">
                      Сумма
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                  v-for="product of productInCart"
                  :key="product._id">
                    <td>
                      <router-link
                      class="text-decoration-none"
                      :to="'/catalog/product?id='+product._id"
                      color="white--text"
                      tag="a"
                      style="cursor:pointer"
                      >{{product.model}}</router-link>
                    </td>
                    <td>
                      <v-btn icon v-on:click="changeCountProducts(-1, product._id)"><v-icon>mdi-minus</v-icon></v-btn>
                      {{USER_CART.filter(i => i.id == product._id)[0].count}}
                      <v-btn icon v-on:click="changeCountProducts(1, product._id)"><v-icon>mdi-plus</v-icon></v-btn>
                    </td>
                    <td>{{product.price | correctPrice}}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-row>
              <v-col>
                <v-card>
                  <h1  class="float-right pa-5">Итого {{totalPrice | correctPrice}}</h1>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12"
        xl="6"
        lg="6"
        md="12"
        sm="12"
        xs="12"
        v-if="USER_CART.length>0"
        >
          <v-card class="ma-3">
            <v-form v-model="valid" ref="form" lazy-validation>
              <h1 class='pa-5'>Оформление заказа</h1>
              <v-row cols="12"
              xl="3"
              lg="3"
              md="6"
              sm="6"
              xs="6"
              >
                <v-col class="px-10">
                  <v-row>
                    <v-col>
                      <v-card-title >Номер телефона</v-card-title>
                    </v-col>
                    <v-col>
                      <v-text-field
                      v-if="phone !=undefined"
                      v-model="phone"
                      :rules="phoneRules"
                      v-on:click="phone == '' ? phone = '+7' : phone == phone"
                      label="+7 900 000 00 00"
                      required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-card-title height="60">Ваше Имя</v-card-title>
                    </v-col>
                    <v-col>
                      <v-text-field
                      v-model="name"
                      :rules="nameRules"
                      label="Имя"
                      required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-card-title height="60">Электронная почта</v-card-title>
                    </v-col>
                    <v-col>
                      <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-card-title height="60">Населенный пункт</v-card-title>
                    </v-col>
                    <v-col>
                      <v-text-field
                      v-model="city"
                      :rules="cityRules"
                      label="г. Москва"
                      required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row >
                    <v-col>
                      <v-card-subtitle>Нажимая кнопку "Отправить заказ", вы принимаете условия "Публичной оферты"</v-card-subtitle>
                    </v-col>
                    <v-col class="justify-end d-flex" >
                      <v-hover v-slot:default="{ hover }" >
                        <v-btn
                        :elevation="hover ? 6 : 2"
                        v-on:click="validate()"
                        x-large
                        color="primary white--text"
                        >
                        Отправить заказ
                      </v-btn>
                    </v-hover>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
      <v-col  v-else>
        <v-card>
          <v-alert
          class="mt-2"
          border="left"
          color="deep-orange darken-1 white--text"
          >
          Корзина пуста!
          <router-link
          class="text-decoration-underline"
          to="/catalog/"
          color="white--text"
          tag="span"
          style="cursor:pointer"
          >Перейти в каталог</router-link>
        </v-alert>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog
  v-model="dialog"
  width="500"
  >
  <v-card>
    <v-card-title class="headline primary white--text">
      Ваш заказ отправлен!
    </v-card-title>
    <v-card-text class="py-6">
      Менеджер свяжется с Вами в течении 10-15 минут для уточнения деталей заказа
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
      color="primary"
      text
      @click="dialog = false"
      >
      Закрыть
    </v-btn>
  </v-card-actions>
</v-card>
</v-dialog>
</v-sheet>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data(){
    return{
      dialog: false,
      valid: false,
      phone: '',
      phoneRules: [
        v => !!v || 'Поле "Телефон" не должно быть пустым',
        v => /^(\+7)/.test(v) || 'Поле "Телефон" должно начинаться с "+7"',
        v => /^(\+7)([\D]*[0-9]{1}[\D]*){10}$/.test(v) || 'Поле "Телефон" должно содержать 11 цифр',
        v => /^(\+7)([^A-Fa-f]*[0-9]{1}[^A-Fa-f]*)$/.test(v) || 'Поле "Телефон" не должно содержать буквы',
      ],
      name: '',
      nameRules: [
        v => !!v || 'Поле "Имя" не должно быть пустым',
        v => /^[a-z, а-яё, A-Z, А-ЯЁ]+$/.test(v) || 'Поле "Имя" может содержать только буквы',
      ],
      email: '',
      emailRules: [
        v => !!v || 'Поле E-mail не должно быть пустым',
        v => /.+@.+/.test(v) || 'Поле "E-mail" заполнено не корректно',
      ],
      city: '',
      cityRules: [
        v => !!v || 'Поле "Населенный пункт" не должно быть пустым',
      ],
    }
  },
  methods:{
    ...mapActions(['FETCH_PRODUCTS', 'CREATE_CART']),
    getId(){
    },
    //Изменение количиства оджной позиции.
    changeCountProducts(count, productId){
      let userCart = []
      userCart = this.USER_CART
      console.log(userCart)
      let index = userCart.findIndex(elem => elem.id == productId)
      userCart[index].count = userCart[index].count + count
      if(userCart[index].count <= 0){
        userCart.splice(index, 1)
      }
      console.log(userCart[index])
      this.CREATE_CART(userCart)
      this.USER_CART
    },
    //Валидация при нажатии на кнопку "отправить заказ"
    validate () {
      if(this.$refs.form.validate()){
        this.dialog = true
      }
    },
  },
  filters:{
    correctPrice: function (num) {
      if(num){
        return Number(num).toLocaleString('ru', {style: 'currency', currency: 'RUB', minimumFractionDigits: '0'})
      }
    },
  },
  computed:{
    ...mapGetters(['ALL_PRODUCTS', 'USER_CART']),
    //Массив позиций в корзине
    productInCart(){
      let cartProduct = []
      for(let productId of this.USER_CART){
        let filterProduct
        filterProduct = this.ALL_PRODUCTS.filter(product => product._id == productId.id)[0]
        cartProduct.push(filterProduct)
      }
      return cartProduct
    },
    //Итоговая сумма
    totalPrice(){
      let total = 0
      this.productInCart.map(product => total = total + Number(product.price * this.USER_CART.filter(elem => elem.id == product._id)[0].count))
      return total
    }
  },
  async mounted(){
    this.FETCH_PRODUCTS()
  },
}
</script>
