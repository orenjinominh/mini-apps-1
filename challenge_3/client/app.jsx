class Checkout extends React.Component {

  // set up states that will change when forms are input and submitted
  constructor(props) {
    super(props);

    this.state = {
      form: 'checkout',
      userData: {
        key: '',
        value: ''
      }
    };

    // state changes when form value changes and 'next' button clicked 
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  // this should change userData state, bound to form change event 
  handleFormChange(event) {
    let key = event.target.id;
    let value = event.target.value; 

    let userDataCopy = {...this.state.userData};
    userDataCopy[key] = value; 
    this.setState({userDataCopy});

    // this.setState({
    //   userData: {...this.state.userData,key,value}
    // })
  }

  // this should change the form state, bound to next button click 
  handleNextClick() {
    if (this.state.form === 'checkout') {
      this.enterData();
      this.setState({
        form: 'userInfo'
      });
    } else if (this.state.form === 'userInfo') {
      this.enterData();
      this.setState({
        form: 'address'
      });

    } else if (this.state.form === 'address') {
      this.enterData();
      this.setState({
        form: 'creditCard'
      });
    } else if (this.state.form === 'creditCard') {
      this.enterData();
      this.setState({
        form: 'reviewPurchase'
      });
    }
  }

  // helper ajax function to post to database with click on "next"
  enterData() {

  }

  // function to take user to homepage (and save data to db?) with ajax call
  submitPurchase() {
    // remove purchase button 
    // reset state to normal 
  }

  render() {






  }





}



ReactDOM.render(<Checkout />, document.getElementById('app'));