<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>mr-pine.de link shortener</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/Mister-Muffin/Link-shortener-website"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <link-area :links="links" @addLink="addLink" @deleteLink="deleteLink" @editLink="editLink" />
    </v-main>
  </v-app>
</template>

<script src="./App.ts"></script>
