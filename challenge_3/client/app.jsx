class Checkout extends React.Component {

  // set up states that will change when forms are input and submitted
  constructor(props) {
    super(props);

    this.state = {
      form: 'checkout',
      userData: {
        name: '',
        email: '', 
        password: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        zip: '',
        phoneNum: '',
        ccNum: '',
        exp: '',
        cvv: '',
        zipCode: ''
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

    let userDataCopy = this.state.userData;
    console.log('key and value is here--->', key, value);
    userDataCopy[key] = value; 

    this.setState({userData: userDataCopy}, () => {console.log(this.state.userData)});
  }

  // this should change the form state, bound to next button click 
  handleNextClick() {
    if (this.state.form === 'checkout') {
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

  // function to take user to homepage upon click of Purchase button
  submitPurchase() {
    alert('Start looking forward to your new purchase!');
    this.setState({
      form: 'checkout',
      userData: {
        name: '',
        email: '', 
        password: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        zip: '',
        phoneNum: '',
        ccNum: '',
        exp: '',
        cvv: '',
        zipCode: ''
      }
    });
  }

  render() {
    if (this.state.form === 'checkout') {
      return (
        <div>
          <h3> Let's get you your impulse buys!</h3>
          <button id="checkout" onClick={this.handleNextClick.bind(this)}> Checkout </button>
        </div>
      );

    } else if (this.state.form === 'userInfo') {
      return (
        <div>
          <h3> First, we need your information. </h3>
          <form>
            <label> Name </label>
            <input type="text" id="name" onChange={this.handleFormChange.bind(this)}></input> <br></br>
            <label> Email </label>
            <input type="text" id="email" onChange={this.handleFormChange.bind(this)}></input> <br></br>
            <label> Password </label>
            <input type="text" id="password" onChange={this.handleFormChange.bind(this)}></input> <br></br>
            <button id="nextBtn" onClick={this.handleNextClick.bind(this)}> Next </button>
          </form>
        </div>
      );

    } else if (this.state.form === 'address') {
      return (
        <div>
          <h3> Second, we need your mailing information. </h3>
          <form>
            <label> Line 1 </label>
            <input type="text" id="line1" onChange={this.handleFormChange.bind(this)}></input> <br></br>
            <label> Line 2 </label>
            <input type="text" id="line2" onChange={this.handleFormChange.bind(this)}></input> <br></br>
            <label> City </label>
            <input type="text" id="city" onChange={this.handleFormChange.bind(this)}></input> <br></br>
            <label> State </label>
            <input type="text" id="state" onChange={this.handleFormChange.bind(this)}></input> <br></br>
            <label> Zip Code </label>
            <input type="text" id="zip" onChange={this.handleFormChange.bind(this)}></input> <br></br>
            <label> Phone Number </label>
            <input type="number" id="phoneNum" onChange={this.handleFormChange.bind(this)}></input> <br></br>
            <button id="nextBtn" onClick={this.handleNextClick.bind(this)}> Next </button>
          </form>
        </div>        
      );
    } else if (this.state.form === 'creditCard') {
      return (
        <div>
          <h3> Finally, we need your credit card information. </h3>
          <form>
            <label> Credit Card Number </label>
            <input id="ccn" type="tel" pattern="[0-9\s]{13,19}" maxLength="19" placeholder="xxxx xxxx xxxx xxxx" onChange={this.handleFormChange.bind(this)}></input> <br></br>
            <label> Expiration </label>
            <input type="text" id="exp" placeholder="xx/xx" onChange={this.handleFormChange.bind(this)}></input> <br></br>
            <label> CVV </label>
            <input type="text" id="cvv" onChange={this.handleFormChange.bind(this)}></input> <br></br>
            <label> Billing Zip Code </label>
            <input type="number" id="zipCode" onChange={this.handleFormChange.bind(this)}></input> <br></br>
            <button id="nextBtn" onClick={this.handleNextClick.bind(this)}> Next </button>
          </form>
        </div>          
      );
    } else if (this.state.form === 'reviewPurchase') {
      return (
        <div>
          <h3> Let's review your information. </h3>
          <div>
             <p>Name: {this.state.userData.name}</p>
             <p>Email: {this.state.userData.email}</p>
             <p>Password: *this is hidden for security purposes* </p>
             <p>Address: {this.state.userData.line1}</p>
             <p>{this.state.userData.line2}</p>
             <p>City: {this.state.userData.city}</p>
             <p>State: {this.state.userData.state}</p>
             <p>Zip Code: {this.state.userData.zip}</p>
             <p>Phone Number: {this.state.userData.phoneNum}</p>
             <p>Credit Card Number: *this is hidden for security purposes*</p>
             <p>Expiration Date: {this.state.userData.exp}</p>
             <p>CVV: {this.state.userData.cvv}</p>
             <p>Billing Zip Code: {this.state.userData.zipCode}</p> 
          </div>
          <button id="purchase" onClick={this.submitPurchase.bind(this)}> Purchase </button>
        </div>          
      );
    }
  }
}

ReactDOM.render(<Checkout />, document.getElementById('app'));