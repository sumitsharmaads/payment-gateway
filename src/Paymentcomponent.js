import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
 
class Paymentcomponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {complete: false,cartValue:'2000',info:null};
    this.onToken = this.onToken.bind(this);
  }

 onToken (token,addresses){
    console.log(token.id);
    fetch('http://localhost:5000/charge' ,{
      method: 'POST',
      body: JSON.stringify({token,addresses}),
    }).then(response => {
      response.json().then(data => {
        console.log('this is status');
        this.setState({complete:data})
      });
    });
  }
 

  render() {
    if (this.state.complete) return <h1>Payment complete</h1>;

    return (
      <StripeCheckout
        token={this.onToken}
        billingAddress
        amount = {this.state.cartValue}
        stripeKey="pk_test_XGG6M3eZxuVNwF3feIdd5j1K"
      />
    )
  }
}

export default Paymentcomponent;
