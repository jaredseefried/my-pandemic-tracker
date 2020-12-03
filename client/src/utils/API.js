const axios = require("axios")


export default {
    
    getMarker: function() {
      return axios.get("/api/marker");
    }
}