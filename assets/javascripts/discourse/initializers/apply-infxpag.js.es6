import { withPluginApi } from "discourse/lib/plugin-api";

function initializeInfxPag(api) {

  api.modifyClass('component:discovery-topics-list', {
    
    pageNum: 0,
    _init: function() {
      this.addObserver("pageNum", this.goToPage);
    }.on("init"),

    actions: {
      loadMore() { 
        // override default method to prevent the ajax loading when hitting the bottom of the page.
        return false;
      },

      goToPage() {
        var url = new URL(window.location.href);
        this.model.set('more_topics_url',url.href);

        // remove all topics:
        this.model.set('topics',[]);

        // load next page of data
        this.get("model")
          .loadMore()
          .then(hasMoreResults => {
            Ember.run.schedule("afterRender", () => this.saveScrollPosition());
            if (!hasMoreResults) {
              this.get("eyeline").flushRest();
            } else if ($(window).height() >= $(document).height()) {
              this.send("loadMore");
            }
          });
      }

    }

  });


}

export default {
  name: "apply-infxpag",

  initialize() {
    withPluginApi("0.8.7", initializeInfxPag);
  }
};



