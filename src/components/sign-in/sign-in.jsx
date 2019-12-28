import React from 'react';
import './sign-in.scss';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import {signInWithGoogle} from '../../firebase/firebase.utils';

class SignIn extends React.Component{

	constructor(props){
		super(props);

		this.state = {

			email:'',
			password:''
		}
	}

	handelSubmit = event =>{

		event.preventDefault()
		this.setState({ password:'',email:'' })
	}

	onChange = e => {
		const {name,value} = e.target;
		this.setState({ [name]:value });
	}

	render(){
		return(

			<div className="sign-in">
				<h2>I already have an account</h2>
				<span>Sign in with your email and password</span>

				<form onSubmit={this.handelSubmit}>
					<FormInput
						type="email"
						name="email"
						onChange={this.onChange}
						value={this.state.email}
						label="email"
						required
					/>
					<FormInput
						type="password"
						name="password"
						onChange={this.onChange}
						value={this.state.password}
						label="password"
						required
					/>

					<div className="buttons">
						<CustomButton type="submit" value="Submit Form">SIGN IN</CustomButton>
						<CustomButton onClick={signInWithGoogle} value="Submit Form" isGoogleSignIn>SIGN IN WITH GOOGLE</CustomButton>
					</div>

				</form>
			</div>
			);
	}

}


export default SignIn;