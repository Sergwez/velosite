<template>
  <v-container class="brown lighten-5" >
    <v-row  >
      <v-col
      cols="12"
      xl="2"
      lg="3"
      md="4"
      sm="6"
      xs="12">
        <v-card
        class="px-2 pa-0"
        flat
        tile
        color='brown lighten-5 brown--text'
        >
        <router-link
        to="/"
        color="white--text"
        tag="h1"
        style="cursor:pointer"
        >  VELOSITE</router-link>
      </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col
      cols="12"
      xl="2"
      lg="3"
      md="4"
      sm="6"
      xs="12" >
        <v-row justify="end">
          <v-card
          class="px-2 pa-0"
          flat
          tile
          color="brown lighten-5"
          >
            <v-card-title class="py-0 my-0">
              <v-icon class="mr-1">mdi-phone</v-icon>
              8 800 800 80 80
            </v-card-title>
            <v-card-text class="py-0 my-0">
              Круглосуточно и без выходных
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
