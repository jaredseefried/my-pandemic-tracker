import axios from 'axios'


export default {

  getData: function () {
    return axios({
      method: 'GET',
      url: 'https://covid-19-tracking.p.rapidapi.com/v1',
      headers: {
        'x-rapidapi-key': 'aa4bbfbbc6msh943bc8aba837399p1827ebjsnde6bed3202fa',
        'x-rapidapi-host': 'covid-19-tracking.p.rapidapi.com'
      }
    })
  },

  getMarker: function () {
    return axios.get("/api/markers");
  }
}