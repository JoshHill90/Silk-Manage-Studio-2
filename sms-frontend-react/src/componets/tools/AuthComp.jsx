
import { loginAPI } from "../api/LoginAPIComp";
import { useState } from 'react';
export function LoginWindow() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	return (
		<div className="container">
			<div className="row form-fit">
				<div className="col-12">
					<h1 className="H1-N">Login to access your content</h1>
				</div>
				<hr className="HR"/>
				<div className="col-12">
					<form id="loginForm"onSubmit={(e) => {
						e.preventDefault();


						const LoginInfo = {
							'Username':  username ,
							'Password': password
						}
						loginAPI(LoginInfo);
						}}>

						<div className='row'>
							
							<div className='col-12 mt-4'>
								<label className="P-L" htmlFor="id_username_login">Username</label>
								<input 
								className='form-control' 
								value={ username }
								type="text" 
								name="username" 
								required 
								id="id_username_login" 
								onChange={e => setUsername(e.target.value)} 
								/>
							</div>

							<div className='col-12 mt-4'>
								<label className="P-L" htmlFor="id_password_login">Password</label>
								<input 
									className='form-control'
									value={ password } 
									type="password" 
									required name="password" 
									id="id_password_login"
									onChange={e => setPassword(e.target.value)} 
								/>
							</div>
						</div>  

						<button className="btn-cust mt-4" id="loginBtn">
							<span className="btn-cust-content">
								Login
							</span>
						</button>


					</form>
				</div>

			</div>
		</div>
	)
}