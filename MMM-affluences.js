Module.register("MMM-affluences", {

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
    getStyles: function () {
      return ["affluences.css"];
    },
  
    start: function () {
        Log.info("Starting module: " + this.name);
        this.affluencesLoaded = false;
        this.loadAffluencesScript();
    },
  
    loadAffluencesScript: function () {
        if (document.querySelector('script[src="https://webapi.affluences.com/js/webapi_latest.min.js"]')) {
            Log.info("Affluences API script already loaded.");
            this.affluencesLoaded = true;
            this.updateDom();
            return;
        }
  
        Log.info("Loading Affluences API script...");
        let script = document.createElement("script");
        script.src = "https://webapi.affluences.com/js/webapi_latest.min.js";
        script.charset = "UTF-8";
        script.onload = () => {
            Log.info("Affluences API script loaded successfully.");
            this.affluencesLoaded = true;
            this.updateDom();
        };
        document.body.appendChild(script);
    },
  
    getDom: function () {
        let wrapper = document.createElement("div");
        wrapper.id = "affluences-wrapper"; // Unique ID for styling and debugging
        wrapper.style.minHeight = "100px"; // Ensure it stays visible
  
        if (!this.affluencesLoaded) {
            wrapper.innerHTML = "<div>Loading visitor counter...</div>";
            return wrapper;
        }
    // Create the Affluences Counter div
    let counterDiv = document.createElement("div");
    counterDiv.className = "affluences-counter";
    counterDiv.setAttribute("data-token", this.config.token);
    counterDiv.setAttribute("forecasts-count", this.config.forecastsCount);
    counterDiv.setAttribute("grayscale", this.config.grayscale);
    counterDiv.setAttribute("lang", this.config.lang);
    if (this.config.dataTitleOverride) {
      counterDiv.setAttribute("data-title-override", this.config.dataTitleOverrideString);
    }

    wrapper.appendChild(counterDiv);

    setTimeout(() => {
        if (window.Affluences && typeof window.Affluences.initialize === "function") {
            Log.info("Initializing Affluences counter...");
            window.Affluences.initialize();
        } else {
            Log.error("Affluences API did not load properly.");
        }
    }, 2000); // Give some time to ensure the script is ready

    return wrapper;
  }

})
