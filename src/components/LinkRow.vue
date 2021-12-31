<template>
  <v-container>
    <v-sheet elevation="2" rounded :class="isNew ? 'mb-6':'mb-0'">
      <div class="pa-2">
        <v-row class="pa-3" align="center">
          <v-text-field
            label="Shortened URL"
            outlined
            prefix="schweininchen.de/"
            hide-details="true"
            v-model="shortUrl"
            @click:append="copyToClipboard()"
          >
          <v-icon slot="append" @click="copyToClipboard()" :color="copied ? 'green' : undefined">{{copied ? 'mdi-clipboard-check-multiple-outline' : 'mdi-content-copy'}}</v-icon>
          </v-text-field>
          <span class="px-2" />
          <v-text-field
            label="Target URL"
            outlined
            hide-details="true"
            :value="isNew ? 'https://' : target"
            v-model="targetUrl"
          >
          </v-text-field>
          <span class="px-2" />
          <v-btn outlined large height="56" @click="submitLink()">
            <span v-if="isNew">Add<v-icon> mdi-plus </v-icon></span>
            <span v-else>Update <v-icon> mdi-publish </v-icon></span>
          </v-btn>
          <span v-if="!isNew" class="px-2" />
          <v-btn v-if="!isNew" outlined color="red" large height="56" @click="deleteLink()">
            Delete
            <v-icon> mdi-delete </v-icon>
          </v-btn>
        </v-row>
      </div>
    </v-sheet>
    <v-divider/>
  </v-container>
</template>

<script src="./LinkRow.ts"></script>
