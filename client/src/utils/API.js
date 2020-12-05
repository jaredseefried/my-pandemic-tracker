import axios from 'axios'


export default {
 
    getMarker: function() {
      return axios.get("/api/markers");
    }
}