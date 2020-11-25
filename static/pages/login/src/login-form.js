import React, { useState, SyntheticEvent } from 'react';
import UrlUtil from './util';

export const LoginForm = () => {
	const [form, setForm] = useState({
		username: '',
		password: ''
	})

	const handleSubmit = () => {
		console.log(form)
		console.log(UrlUtil.getParam('state'))
		form.state = UrlUtil.getParam('state');

        const xhr = new XMLHttpRequest()

        xhr.open('POST', '/api/login');
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify(form));

	}

	const handleInputChange = (event) => {
		setForm({
			...form,
			[event.target.name]: event.target.value
		})
	}
	return <div>
		<ul>
			<li>
				<label htmlFor="username">username</label>
				<input 
					id="username"
					name="username"
					value={form.username}
					onChange={handleInputChange}
					type="text"/>
			</li>
			<li>
				<label htmlFor="password">password</label>
				<input 
					id="password"
					name="password"
					value={form.password}
					onChange={handleInputChange}
					type="password"/>
			</li>
			<li>
				<button onClick={handleSubmit}>log in</button>
			</li>
		</ul>
	</div>
}