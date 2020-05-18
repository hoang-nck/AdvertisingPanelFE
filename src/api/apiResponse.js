export default class ApiResponse {

  constructor(response) {
    this.response = {
      success: true,
      statusCode: 200,
      message: "",
      data: null,
      ...response
    }
  }

  setValue = (key, value) => {
    this.data[key] = value;
  }

  getData = () => {
    return this.response;
  }
}
