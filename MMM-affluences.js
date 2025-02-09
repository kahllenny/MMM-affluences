Module.register("MMM-affluences", {

  // those are the default values, you can override them in the config
  defaults: {
    token: "",
    forecastCount: 0,
    grayscale: false,
    lang: "en",
    dataTitleOverride: false,
    dataTitleOverrideString: ""
  },

  /**
   * Apply the default styles.
   */
  getStyles() {
    return ["affluences.css"];
  },

  /**
   * Pseudo-constructor for our module. Initialize stuff here.
   */
  start() {
    Log.info("Starting module: " + this.name);
    this.loadAffluencesScript();
  },

  //lodes the affluences api script
  loadAffluencesScript() {
    Log.info("Loading Affluences API script...");
    let script = document.createElement("script");
    script.src = "https://webapi.affluences.com/js/webapi_latest.min.js";
    script.charset = "UTF-8";
    script.onload = () => {
        Log.info("Affluences API script loaded successfully.");
        this.updateDom();
    };
    document.body.appendChild(script);
  },
    
  getDom() {
    const wrapper = document.createElement("div");

    // Create the Affluences Counter div
    let counterDiv = document.createElement("div");
    counterDiv.className = "affluences-counter";
    counterDiv.setAttribute("data-token", this.config.token);
    counterDiv.setAttribute("forecasts-count", this.config.forecastCount);
    counterDiv.setAttribute("grayscale", this.config.grayscale);
    counterDiv.setAttribute("lang", this.config.lang);
    if (this.config.dataTitleOverride) {
      counterDiv.setAttribute("data-title-override", this.config.dataTitleOverrideString);
    }

    wrapper.appendChild(counterDiv);

    return wrapper;
  }

})
