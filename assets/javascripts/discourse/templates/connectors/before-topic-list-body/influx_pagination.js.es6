export default {

  actions: {
    goToPage() {
      // FIXME: this seems hacky to have to know it's exactly 3 levels up.
      //        How do we target it better?

      // bubble it up to where we have clean access to the model
      this.get('parentView').get('parentView').get('parentView').send('goToPage');
    }
  }

}