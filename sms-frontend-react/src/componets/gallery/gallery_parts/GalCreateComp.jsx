import { useState } from 'react';
import { CreateGal } from '../../api/CreateDisplayAPIComp';

export function GalCreateForm() {	

	const [name, setName] = useState('');
	return (
		
		<form className='toggle-box bg-color-bg' onSubmit={(e) => {
			
			e.preventDefault();
			CreateGal(name)
			setName('')
			e.target.value = '';
			}}> 
			<div className='row'>
				<div className='col-12'>
					<label className='P-N' htmlFor="id_create_gallery">Create New Gallery:</label>
					<input 
						className='form-control' 
						value={ name } 
						type="text" 
						name="create_gallery" 
						maxLength="255" 
						required={ true }
						id="id_create_gallery"
						onChange={e => setName(e.target.value)} 
					/>
				</div>
			</div>
		

			<button className="mt-4 btn-cust" type="submit">
				Create
			</button>

		</form>
	)
}