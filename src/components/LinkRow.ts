import Vue from 'vue'

export default Vue.extend({
  name: 'LinkRow',

  props: [
    'short',
    'target',
    'isNew'
  ],

  methods: {
    submitLink() {
      if (this.isNew) {
        this.$emit("addLink", { short: this.shortUrl, target: this.targetUrl })
        this.shortUrl = ''
        this.targetUrl = ''
      } else {
        this.$emit("editLink", {short: this.shortUrl, target: this.targetUrl, oldShort: this.short})
      }
    },
    deleteLink() {
      this.$emit("deleteLink", this.shortUrl)
    },
    copyToClipboard() {
      navigator.clipboard.writeText(`${process.env.VUE_APP_ROOT_URL}` + this.shortUrl);
      this.copied = true
      setTimeout(() => this.copied = false, 3000)
  }
  },

  data() {
    return {
      shortUrl: this.short,
      targetUrl: this.target,
      copied: false
    }
  }
})
